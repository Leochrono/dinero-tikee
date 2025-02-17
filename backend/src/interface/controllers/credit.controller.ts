import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { CreditService } from '../../application/credit/services/credit.service';
import {
  CreateCreditDto,
  CreditResponseDto,
  SearchCreditDto,
  ApiCreditResponse,
} from '../../application/credit/dto/credit.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { CreditDocumentService } from '../../application/credit/services/credit-document.service';
@Controller('credits')
export class CreditController {
  constructor(
    private readonly creditService: CreditService,
    private readonly creditDocumentService: CreditDocumentService,
  ) {}
  // Rutas públicas
  @Get('search')
  async search(@Query() searchParams: SearchCreditDto) {
    return this.creditService.search(searchParams);
  }
  @Get('compare')
  async compareCredits(
    @Query('amount') amount: number,
    @Query('term') term: number,
    @Query('income') income: number,
    @Query('institutionType') type?: 'bank' | 'cooperative',
  ) {
    return this.creditService.search({
      amount,
      term,
      income,
      type,
    });
  }
  // Rutas protegidas que requieren autenticación
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Request() req,
    @Body() createCreditDto: CreateCreditDto,
  ): Promise<CreditResponseDto> {
    const creditData = {
      ...createCreditDto,
      userId: req.user.id,
    };
    return this.creditService.create(creditData);
  }
  @UseGuards(JwtAuthGuard)
  @Get('user-credits')
  async findAll(@Request() req): Promise<CreditResponseDto[]> {
    return this.creditService.findAll(req.user.id);
  }
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(
    @Request() req,
    @Param('id') id: string,
  ): Promise<CreditResponseDto> {
    return this.creditService.findOne(id, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/status')
  async updateStatus(
    @Param('id') id: string,
    @Body('status') status: string,
    @Body('institutionId') institutionId?: string,
  ): Promise<ApiCreditResponse> {
    try {
      const updatedCredit = await this.creditService.updateStatus(
        id,
        status,
        institutionId,
      );
      return {
        success: true,
        data: updatedCredit,
        message: 'Crédito actualizado exitosamente',
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Error al actualizar el crédito',
      };
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id/details')
  async getCreditDetails(@Param('id') id: string, @Request() req) {
    try {
      const credit = await this.creditService.findOne(id, req.user.id);
      const documents = await this.creditDocumentService.getDocuments(id);
      return {
        success: true,
        data: {
          ...credit,
          documents,
        },
      };
    } catch (error) {
      return {
        success: false,
        error: 'Error al obtener los detalles del crédito',
      };
    }
  }
}
