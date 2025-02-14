import { 
  Injectable, 
  NotFoundException, 
  Logger, 
  OnModuleInit, 
  BadRequestException 
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InstitutionEntity, InstitutionType } from '../../../domain/entities/institution.entity';
import { institutionsData } from '../../../infrastructure/data/institutions.data';
import { v4 as uuidv4 } from 'uuid';
import { FilterInstitutionsDto } from '../dto/institution.dto';

@Injectable()
export class InstitutionService implements OnModuleInit {
  private readonly logger = new Logger(InstitutionService.name);

  constructor(
    @InjectRepository(InstitutionEntity)
    private institutionRepository: Repository<InstitutionEntity>
  ) {}

  async onModuleInit() {
    try {
      const count = await this.institutionRepository.count();
      this.logger.log(`Instituciones existentes: ${count}`);
      
      if (count === 0) {
        const institutions = institutionsData.instituciones.map(inst => ({
          id: inst.id || uuidv4(),
          name: inst.name,
          type: inst.type as InstitutionType,
          logo: inst.logo,
          minRate: inst.minRate,
          maxRate: inst.maxRate,
          products: inst.products,
          credits: []
        }));

        await this.institutionRepository.save(institutions);
        this.logger.log(`Se inicializaron ${institutions.length} instituciones`);
      }

      // Verificar datos inicializados
      const allInstitutions = await this.institutionRepository.find();
      this.logger.debug('Datos de instituciones:', 
        allInstitutions.map(inst => ({
          name: inst.name,
          type: inst.type,
          minAmount: inst.products.personalLoan.minAmount,
          maxAmount: inst.products.personalLoan.maxAmount,
          minTerm: inst.products.personalLoan.minTerm,
          maxTerm: inst.products.personalLoan.maxTerm
        }))
      );
    } catch (error) {
      this.logger.error('Error durante la inicialización de instituciones:', error);
      throw new BadRequestException('No se pudieron inicializar las instituciones');
    }
  }

  async filterInstitutions(params: FilterInstitutionsDto): Promise<InstitutionEntity[]> {
    try {
      this.logger.log('Iniciando filtrado con parámetros:', params);
  
      // Primero obtener todas las instituciones
      const query = this.institutionRepository.createQueryBuilder('institution');
  
      // Seleccionar campos necesarios
      query.select([
        'institution.id',
        'institution.name',
        'institution.type',
        'institution.logo',
        'institution.minRate',
        'institution.maxRate',
        'institution.products'
      ]);
  
      // Filtrar por tipo si se especifica
      if (params.type) {
        query.andWhere('institution.type = :type', { type: params.type });
      }
  
      // Obtener las instituciones
      const institutions = await query.getMany();
  
      // Filtrar en memoria con logs detallados
      const filteredInstitutions = institutions.filter(institution => {
        const personalLoan = institution.products.personalLoan;
  
        // Verificar monto con logging específico
        const meetsAmount = 
          personalLoan.minAmount <= params.amount && 
          personalLoan.maxAmount >= params.amount;
  
        // Log detallado para el rango problemático
        if (params.amount >= 1000 && params.amount < 2000) {
          this.logger.debug(`Verificando institución ${institution.name}:`, {
            requestedAmount: params.amount,
            institutionMinAmount: personalLoan.minAmount,
            institutionMaxAmount: personalLoan.maxAmount,
            meetsAmount
          });
        }
  
        // Verificar plazo
        const meetsTerm = 
          personalLoan.minTerm <= params.term && 
          personalLoan.maxTerm >= params.term;
  
        // Verificar ubicación - convertir a minúsculas para comparación
        const normalizedLocation = params.location?.toLowerCase();
        const meetsLocation = !params.location || 
          personalLoan.locations.includes(normalizedLocation);
  
        // Log completo de la evaluación
        this.logger.debug(`Evaluación completa ${institution.name}:`, {
          meetsAmount,
          meetsTerm,
          meetsLocation,
          location: params.location,
          availableLocations: personalLoan.locations
        });
  
        return meetsAmount && meetsTerm && meetsLocation;
      });
  
      // Log del resultado final
      this.logger.log(`Instituciones encontradas: ${filteredInstitutions.length}`);
      if (filteredInstitutions.length > 0) {
        this.logger.debug('Instituciones que cumplen los criterios:', 
          filteredInstitutions.map(inst => ({
            name: inst.name,
            minAmount: inst.products.personalLoan.minAmount,
            maxAmount: inst.products.personalLoan.maxAmount,
            locations: inst.products.personalLoan.locations
          }))
        );
      }
  
      return filteredInstitutions;
  
    } catch (error) {
      this.logger.error('Error en filterInstitutions:', error);
      throw new BadRequestException(`Error al filtrar instituciones: ${error.message}`);
    }
  }

  async findBestRates(
    amount: number, 
    term: number, 
    rateFilter?: 'min' | 'max'
  ): Promise<InstitutionEntity[]> {
    try {
      if (amount <= 0 || term <= 0) {
        throw new BadRequestException('Monto y plazo deben ser mayores que cero');
      }
  
      const query = this.institutionRepository.createQueryBuilder('institution');
  
      query.select([
        'institution.id',
        'institution.name',
        'institution.type',
        'institution.logo',
        'institution.minRate',
        'institution.maxRate',
        'institution.products'
      ]);
  
      // Filtrar por monto y plazo usando JSON_EXTRACT
      const whereClause = `
        CAST(JSON_EXTRACT(institution.products, '$.personalLoan.minAmount') AS DECIMAL) <= :amount
        AND CAST(JSON_EXTRACT(institution.products, '$.personalLoan.maxAmount') AS DECIMAL) >= :amount
        AND CAST(JSON_EXTRACT(institution.products, '$.personalLoan.minTerm') AS DECIMAL) <= :term
        AND CAST(JSON_EXTRACT(institution.products, '$.personalLoan.maxTerm') AS DECIMAL) >= :term
      `;
      query.where(whereClause, { amount, term });
  
      // Log de la consulta SQL
      this.logger.debug('Query SQL:', query.getSql());
      this.logger.debug('Parámetros:', { amount, term, rateFilter });
  
      const institutions = await query.getMany();
  
      // Verificación adicional en memoria
      const verifiedInstitutions = institutions.filter(inst => {
        const loan = inst.products.personalLoan;
        return (
          loan.minAmount <= amount &&
          loan.maxAmount >= amount &&
          loan.minTerm <= term &&
          loan.maxTerm >= term
        );
      });
  
      // Ordenar por tasa
      if (rateFilter === 'min') {
        verifiedInstitutions.sort((a, b) => a.minRate - b.minRate);
      } else if (rateFilter === 'max') {
        verifiedInstitutions.sort((a, b) => b.maxRate - a.maxRate);
      }
  
      return verifiedInstitutions;
  
    } catch (error) {
      this.logger.error('Error al buscar mejores tasas:', error);
      throw error instanceof BadRequestException 
        ? error 
        : new BadRequestException('Error al buscar las mejores tasas');
    }
  }

  async getAll(): Promise<InstitutionEntity[]> {
    try {
      const query = this.institutionRepository.createQueryBuilder('institution')
        .select([
          'institution.id',
          'institution.name',
          'institution.type',
          'institution.logo',
          'institution.minRate',
          'institution.maxRate',
          'institution.products'
        ])
        .orderBy('institution.name', 'ASC');

      const institutions = await query.getMany();
      this.logger.log(`Obtenidas ${institutions.length} instituciones`);
      return institutions;
    } catch (error) {
      this.logger.error('Error al obtener instituciones:', error);
      throw new BadRequestException('No se pudieron obtener las instituciones');
    }
  }

  async findOne(id: string): Promise<InstitutionEntity> {
    try {
      const institution = await this.institutionRepository.createQueryBuilder('institution')
        .select([
          'institution.id',
          'institution.name',
          'institution.type',
          'institution.logo',
          'institution.minRate',
          'institution.maxRate',
          'institution.products'
        ])
        .where('institution.id = :id', { id })
        .getOne();
      
      if (!institution) {
        throw new NotFoundException(`Institución con ID ${id} no encontrada`);
      }
      
      return institution;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      this.logger.error(`Error al buscar institución con ID ${id}:`, error);
      throw new BadRequestException('Error al buscar la institución');
    }
  }
}