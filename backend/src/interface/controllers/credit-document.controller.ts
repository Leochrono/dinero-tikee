import {
  Controller,
  Post,
  Get,
  Delete,
  Param,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  Body,
  HttpCode,
  HttpStatus,
  Logger,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { CreditDocumentService } from '../../application/credit/services/credit-document.service';
import { VerifyDocumentDto } from '../../application/credit/dto/credit-document.dto';
import { DocumentType } from '../../domain/entities/credit-document.entity';
import { RateLimit } from '../../infrastructure/guards/rate-limit.decorator';

@Controller('credits/:creditId/documents')
@UseGuards(JwtAuthGuard)
export class CreditDocumentController {
  private readonly logger = new Logger(CreditDocumentController.name);

  constructor(private creditDocumentService: CreditDocumentService) {}

  @Post('upload')
@HttpCode(HttpStatus.OK)
@UseInterceptors(FileInterceptor('file', {
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  }
}))
async uploadDocument(
  @Param('creditId') creditId: string,
  @Body('documentType') documentType: DocumentType,
  @UploadedFile(
    new ParseFilePipe({
      validators: [
        new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }),
        new FileTypeValidator({ fileType: /(jpg|jpeg|png|pdf)$/ }),
      ],
    }),
  ) file: Express.Multer.File,
) {
  this.logger.log(`Iniciando carga de documento - CreditId: ${creditId}, DocumentType: ${documentType}`);

  try {
    if (!file || !file.buffer) {
      throw new BadRequestException('No se proporcionó un archivo válido');
    }

    this.logger.debug('Archivo recibido:', {
      filename: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
      hasBuffer: !!file.buffer
    });

    const document = await this.creditDocumentService.uploadDocument(
      creditId,
      file,
      documentType
    );

    return {
      success: true,
      data: document
    };
  } catch (error) {
    this.logger.error('Error al cargar documento:', {
      error: error.message,
      stack: error.stack,
      creditId,
      documentType,
      fileName: file?.originalname,
      fileType: file?.mimetype
    });

    throw new BadRequestException(error.message);
  }
}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getDocuments(@Param('creditId') creditId: string) {
    try {
      const documents = await this.creditDocumentService.getDocuments(creditId);
      return {
        success: true,
        data: documents,
      };
    } catch (error) {
      this.logger.error(`Error al obtener documentos: ${error.message}`);
      throw new BadRequestException('Error al obtener los documentos');
    }
  }

  @Get(':documentId')
  @HttpCode(HttpStatus.OK)
  async getDocument(
    @Param('creditId') creditId: string,
    @Param('documentId') documentId: string,
  ) {
    try {
      const document = await this.creditDocumentService.getDocument(documentId);
      return {
        success: true,
        data: document,
      };
    } catch (error) {
      this.logger.error(`Error al obtener documento: ${error.message}`);
      throw new BadRequestException('Error al obtener el documento');
    }
  }

  @Delete(':documentId')
  @HttpCode(HttpStatus.OK)
  @RateLimit(5, 60, 300) // 5 intentos por minuto, bloqueo de 5 minutos
  async deleteDocument(
    @Param('creditId') creditId: string,
    @Param('documentId') documentId: string,
  ) {
    try {
      await this.creditDocumentService.deleteDocument(documentId);
      return {
        success: true,
        message: 'Documento eliminado exitosamente',
      };
    } catch (error) {
      this.logger.error(`Error al eliminar documento: ${error.message}`);
      throw new BadRequestException('Error al eliminar el documento');
    }
  }

  @Post(':documentId/verify')
  @HttpCode(HttpStatus.OK)
  async verifyDocument(
    @Param('creditId') creditId: string,
    @Param('documentId') documentId: string,
    @Body() verifyData: VerifyDocumentDto,
  ) {
    try {
      const document = await this.creditDocumentService.verifyDocument(
        documentId,
        verifyData,
      );

      return {
        success: true,
        data: document,
        message: verifyData.verified
          ? 'Documento verificado exitosamente'
          : 'Documento marcado como no verificado',
      };
    } catch (error) {
      this.logger.error(`Error al verificar documento: ${error.message}`);
      throw new BadRequestException('Error al verificar el documento');
    }
  }
}
