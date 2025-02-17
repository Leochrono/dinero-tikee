import {
  Injectable,
  NotFoundException,
  Logger,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreditEntity } from '../../../domain/entities/credit.entity';
import {
  CreateCreditDto,
  CreditResponseDto,
  SearchCreditDto,
} from '../dto/credit.dto';
import { InstitutionEntity } from '../../../domain/entities/institution.entity';

Injectable();
export class CreditService {
  private readonly logger = new Logger(CreditService.name);

  constructor(
    @InjectRepository(CreditEntity)
    private readonly creditRepository: Repository<CreditEntity>,
    @InjectRepository(InstitutionEntity)
    private readonly institutionRepository: Repository<InstitutionEntity>,
  ) {}

  async create(
    createCreditDto: CreateCreditDto & { userId: string },
  ): Promise<CreditResponseDto> {
    try {
      this.logger.log(`Creating credit for user: ${createCreditDto.userId}`);

      const credit = this.creditRepository.create({
        ...createCreditDto,
        status: 'PENDING',
        user: { id: createCreditDto.userId },
      });

      const savedCredit = await this.creditRepository.save(credit);
      this.logger.log(`Credit saved initially with ID: ${savedCredit.id}`);

      // Verificar y esperar a que el crédito esté completamente guardado
      const verifiedCredit = await this.ensureCreditExists(savedCredit.id);

      return this.mapToResponseDto(verifiedCredit);
    } catch (error) {
      this.logger.error(`Error creating credit: ${error.message}`, error.stack);
      throw new BadRequestException('Error al crear el crédito');
    }
  }

  async findAll(userId: string): Promise<CreditResponseDto[]> {
    try {
      this.logger.log(`Finding all credits for user: ${userId}`);

      const credits = await this.creditRepository.find({
        where: { user: { id: userId } },
        relations: ['institution'],
        order: { createdAt: 'DESC' },
      });

      return credits.map((credit) => this.mapToResponseDto(credit));
    } catch (error) {
      this.logger.error(`Error finding credits: ${error.message}`);
      throw new BadRequestException('Error al obtener los créditos');
    }
  }

  async findOne(id: string, userId: string): Promise<CreditResponseDto> {
    try {
      this.logger.log(`Finding credit ${id} for user ${userId}`);

      const credit = await this.creditRepository.findOne({
        where: {
          id,
          user: { id: userId },
        },
        relations: ['institution'],
      });

      if (!credit) {
        throw new NotFoundException('Crédito no encontrado');
      }

      return this.mapToResponseDto(credit);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      this.logger.error(`Error finding credit: ${error.message}`);
      throw new BadRequestException('Error al obtener el crédito');
    }
  }

  async search(searchParams: SearchCreditDto) {
    try {
      this.logger.log('Searching credits with params:', searchParams);

      const queryBuilder = this.creditRepository
        .createQueryBuilder('credit')
        .leftJoinAndSelect('credit.institution', 'institution');

      if (searchParams.amount) {
        queryBuilder.andWhere('credit.amount <= :amount', {
          amount: searchParams.amount,
        });
      }
      if (searchParams.term) {
        queryBuilder.andWhere('credit.term <= :term', {
          term: searchParams.term,
        });
      }
      if (searchParams.type) {
        queryBuilder.andWhere('institution.type = :type', {
          type: searchParams.type,
        });
      }

      const credits = await queryBuilder.getMany();
      return credits.map((credit) => this.mapToResponseDto(credit));
    } catch (error) {
      this.logger.error(`Error searching credits: ${error.message}`);
      throw new BadRequestException('Error al buscar créditos');
    }
  }

  async updateStatus(
    id: string,
    status: string,
    institutionId?: string,
  ): Promise<CreditResponseDto> {
    try {
      const credit = await this.creditRepository.findOne({
        where: { id },
        relations: ['institution'],
      });

      if (!credit) {
        throw new NotFoundException('Crédito no encontrado');
      }

      // Actualizar estado
      credit.status = status;

      // Actualizar institución si se proporciona
      if (institutionId) {
        const institution = await this.institutionRepository.findOne({
          where: { id: institutionId },
        });

        if (!institution) {
          throw new NotFoundException('Institución no encontrada');
        }

        credit.institution = institution;
      }

      // Guardar los cambios
      const updatedCredit = await this.creditRepository.save(credit);

      // Cargar el crédito actualizado con todas las relaciones
      const finalCredit = await this.creditRepository.findOne({
        where: { id: updatedCredit.id },
        relations: ['institution'],
      });

      if (!finalCredit) {
        throw new NotFoundException('Error al cargar el crédito actualizado');
      }

      // Mapear a DTO de respuesta
      return this.mapToResponseDto(finalCredit);
    } catch (error) {
      this.logger.error(`Error updating credit status: ${error.message}`);
      throw new BadRequestException(
        error.message || 'Error al actualizar el estado del crédito',
      );
    }
  }

  async getDetails(id: string): Promise<CreditResponseDto> {
    try {
      this.logger.log(`Getting details for credit: ${id}`);

      const credit = await this.ensureCreditExists(id);
      return this.mapToResponseDto(credit);
    } catch (error) {
      this.logger.error(`Error getting credit details: ${error.message}`);
      throw error;
    }
  }

  private async ensureCreditExists(
    creditId: string,
    maxAttempts = 5,
  ): Promise<CreditEntity> {
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        this.logger.debug(
          `Attempt ${attempt}/${maxAttempts} to verify credit ${creditId}`,
        );

        const credit = await this.creditRepository.findOne({
          where: { id: creditId },
          relations: ['institution', 'user'],
        });

        if (credit) {
          this.logger.debug(`Credit ${creditId} found successfully`);
          return credit;
        }

        if (attempt < maxAttempts) {
          const delay = 1000 * attempt; // Incrementar el delay con cada intento
          this.logger.debug(`Waiting ${delay}ms before next attempt`);
          await new Promise((resolve) => setTimeout(resolve, delay));
        }
      } catch (error) {
        this.logger.error(`Error on attempt ${attempt}: ${error.message}`);
        if (attempt === maxAttempts) throw error;
      }
    }

    throw new NotFoundException(
      `No se pudo verificar el crédito ${creditId} después de ${maxAttempts} intentos`,
    );
  }

  private mapToResponseDto(credit: CreditEntity): CreditResponseDto {
    const { monthlyPayment, totalPayment } = this.calculatePayments(
      credit.amount,
      credit.institution?.minRate || 0,
      credit.term,
    );

    return {
      id: credit.id,
      amount: credit.amount,
      term: credit.term,
      income: credit.income,
      status: credit.status,
      createdAt: credit.createdAt,
      monthlyPayment,
      totalPayment,
      institution: credit.institution
        ? {
            id: credit.institution.id,
            name: credit.institution.name,
            type: credit.institution.type,
            logo: credit.institution.logo,
            minRate: credit.institution.minRate,
          }
        : null,
    };
  }

  private calculatePayments(amount: number, rate: number, term: number) {
    try {
      const monthlyRate = rate / 12 / 100;
      const monthlyPayment =
        (amount * monthlyRate * Math.pow(1 + monthlyRate, term)) /
        (Math.pow(1 + monthlyRate, term) - 1);
      const totalPayment = monthlyPayment * term;
      return {
        monthlyPayment: isNaN(monthlyPayment) ? 0 : monthlyPayment,
        totalPayment: isNaN(totalPayment) ? 0 : totalPayment,
      };
    } catch (error) {
      this.logger.error(`Error calculando pagos: ${error.message}`);
      return { monthlyPayment: 0, totalPayment: 0 };
    }
  }

  async findAllByUser(userId: string): Promise<CreditEntity[]> {
    try {
      this.logger.log(`Finding all credits for user ${userId}`);
      return await this.creditRepository.find({
        where: { user: { id: userId } },
        order: { createdAt: 'DESC' },
      });
    } catch (error) {
      this.logger.error(`Error finding user credits: ${error.message}`);
      throw new BadRequestException(
        'Error al obtener los créditos del usuario',
      );
    }
  }
}
