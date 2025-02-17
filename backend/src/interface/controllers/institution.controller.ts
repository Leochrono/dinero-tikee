import {
  Controller,
  Get,
  Param,
  Query,
  HttpCode,
  HttpStatus,
  Logger,
  BadRequestException,
  UseGuards,
  ParseEnumPipe,
  ValidationPipe,
  UsePipes,
  NotFoundException,
} from '@nestjs/common';
import { InstitutionService } from '../../application/institution/services/institution.service';
import { InstitutionType } from '../../domain/entities/institution.entity';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

import { RateLimit } from '../../infrastructure/guards/rate-limit.decorator';
import { FilterInstitutionsDto } from 'src/application/institution/dto/institution.dto';

@Controller('institutions')
@UseGuards(JwtAuthGuard)
export class InstitutionController {
  private readonly logger = new Logger(InstitutionController.name);

  constructor(private readonly institutionService: InstitutionService) {}

  @Get('search')
  @HttpCode(HttpStatus.OK)
  @RateLimit(100, 60) // 100 requests per minute
  @UsePipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  )
  async filterInstitutions(
    @Query('type', new ParseEnumPipe(InstitutionType, { optional: true }))
    type?: InstitutionType,
    @Query('rateFilter') rateFilter?: 'min' | 'max',
    @Query('amount', new ValidationPipe({ transform: true })) amount?: number,
    @Query('term', new ValidationPipe({ transform: true })) term?: number,
  ) {
    try {
      // Validar los rangos de los parámetros
      if (amount !== undefined && (amount < 500 || amount > 100000)) {
        throw new BadRequestException(
          'El monto debe estar entre $500 y $100,000',
        );
      }

      if (term !== undefined && (term < 3 || term > 72)) {
        throw new BadRequestException('El plazo debe estar entre 3 y 72 meses');
      }

      // Construir el DTO de filtrado
      const filterDto: FilterInstitutionsDto = {
        type,
        rateFilter,
        amount,
        term,
      };

      const institutions =
        await this.institutionService.filterInstitutions(filterDto);

      return {
        success: true,
        data: institutions,
        count: institutions.length,
        filters: filterDto,
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }

      throw new BadRequestException(
        error.message || 'No se pudieron filtrar las instituciones',
      );
    }
  }

  @Get('best-rates')
  @HttpCode(HttpStatus.OK)
  @RateLimit(100, 60)
  @UsePipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  )
  async findBestRates(
    @Query('amount', new ValidationPipe({ transform: true })) amount: number,
    @Query('term', new ValidationPipe({ transform: true })) term: number,
    @Query('rateFilter') rateFilter?: 'min' | 'max',
  ) {
    try {
      // Validar los rangos
      if (amount < 500 || amount > 100000) {
        throw new BadRequestException(
          'El monto debe estar entre $500 y $100,000',
        );
      }

      if (term < 3 || term > 72) {
        throw new BadRequestException('El plazo debe estar entre 3 y 72 meses');
      }

      const institutions = await this.institutionService.findBestRates(
        amount,
        term,
        rateFilter,
      );

      return {
        success: true,
        data: institutions,
        filters: { amount, term, rateFilter },
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }

      throw new BadRequestException(
        error.message || 'No se pudieron encontrar las mejores tasas',
      );
    }
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @RateLimit(200, 60)
  async findOne(@Param('id') id: string) {
    try {
      const institution = await this.institutionService.findOne(id);

      if (!institution) {
        throw new NotFoundException(`Institución con ID ${id} no encontrada`);
      }

      return {
        success: true,
        data: institution,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new BadRequestException(
        error.message || 'No se pudo obtener la institución',
      );
    }
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @RateLimit(100, 60)
  async getAll() {
    try {
      const institutions = await this.institutionService.getAll();
      return {
        success: true,
        data: institutions,
        count: institutions.length,
      };
    } catch (error) {
      throw new BadRequestException(
        error.message || 'No se pudieron obtener las instituciones',
      );
    }
  }
}
