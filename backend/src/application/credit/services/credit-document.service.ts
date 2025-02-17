import {
  Injectable,
  Logger,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as path from 'path';
import * as fs from 'fs/promises';
import * as crypto from 'crypto';
import * as sharp from 'sharp';
import {
  CreditDocumentEntity,
  DocumentType,
  FileType,
} from '../../../domain/entities/credit-document.entity';
import { CreditEntity } from '../../../domain/entities/credit.entity';
import {
  UploadDocumentDto,
  DocumentResponseDto,
  VerifyDocumentDto,
} from '../dto/credit-document.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CreditDocumentService {
  private readonly logger = new Logger(CreditDocumentService.name);
  private readonly UPLOAD_DIR = path.join(process.cwd(), 'uploads');
  private readonly ALLOWED_MIME_TYPES = [
    'application/pdf',
    'image/jpeg',
    'image/png',
  ];
  private readonly MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

  constructor(
    @InjectRepository(CreditDocumentEntity)
    private documentRepository: Repository<CreditDocumentEntity>,
    @InjectRepository(CreditEntity)
    private creditRepository: Repository<CreditEntity>,
    private configService: ConfigService,
  ) {
    this.ensureUploadDirectoryExists();
  }

  private async ensureUploadDirectoryExists() {
    try {
      await fs.access(this.UPLOAD_DIR);
      this.logger.log('Upload directory exists');
    } catch {
      try {
        await fs.mkdir(this.UPLOAD_DIR, { recursive: true });
        this.logger.log('Created upload directory');
      } catch (error) {
        this.logger.error('Error creating upload directory:', error);
        throw new Error('Could not create upload directory');
      }
    }
  }

  private validateFile(file: Express.Multer.File) {
    this.logger.debug('Validating file:', {
      originalname: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
    });

    if (!file) {
      throw new BadRequestException('No se proporcionó ningún archivo');
    }

    if (!this.ALLOWED_MIME_TYPES.includes(file.mimetype)) {
      throw new BadRequestException(
        `Tipo de archivo no permitido. Tipos permitidos: ${this.ALLOWED_MIME_TYPES.join(', ')}`,
      );
    }

    if (file.size > this.MAX_FILE_SIZE) {
      throw new BadRequestException(
        `El archivo excede el tamaño máximo permitido (${this.MAX_FILE_SIZE / 1024 / 1024}MB)`,
      );
    }

    const ext = path.extname(file.originalname).toLowerCase();
    if (!['.pdf', '.jpg', '.jpeg', '.png'].includes(ext)) {
      throw new BadRequestException(
        `Extensión de archivo no permitida: ${ext}`,
      );
    }
  }

  private async processImage(file: Express.Multer.File) {
    try {
      if (!file || !file.buffer) {
        this.logger.error(
          'No se proporcionó un archivo válido o el buffer está vacío',
        );
        return null;
      }

      if (!file.mimetype.startsWith('image/')) {
        this.logger.debug('El archivo no es una imagen');
        return null;
      }

      this.logger.debug('Iniciando procesamiento de imagen', {
        originalName: file.originalname,
        mimeType: file.mimetype,
        size: file.buffer.length,
      });

      // Crear instancia de Sharp con el buffer
      let image = sharp(file.buffer);

      try {
        const metadata = await image.metadata();

        this.logger.debug('Metadata de imagen obtenida:', metadata);

        if (!metadata.width || !metadata.height) {
          throw new Error(
            'No se pudieron obtener las dimensiones de la imagen',
          );
        }

        // Comprimir la imagen si es muy grande
        if (metadata.width > 2000) {
          const newHeight = Math.round(
            (2000 * metadata.height) / metadata.width,
          );

          this.logger.debug('Redimensionando imagen:', {
            originalWidth: metadata.width,
            originalHeight: metadata.height,
            newWidth: 2000,
            newHeight: newHeight,
          });

          const resizedBuffer = await image
            .resize(2000, newHeight, {
              fit: 'inside',
              withoutEnlargement: true,
            })
            .jpeg({
              quality: 80,
              progressive: true,
              force: false,
            })
            .toBuffer();

          return {
            buffer: resizedBuffer,
            dimensions: {
              original: {
                width: metadata.width,
                height: metadata.height,
              },
              resized: {
                width: 2000,
                height: newHeight,
              },
            },
            format: 'jpeg',
            quality: 80,
          };
        }

        // Si la imagen no necesita ser redimensionada, solo optimizarla
        const optimizedBuffer = await image
          .jpeg({
            quality: 85,
            progressive: true,
            force: false,
          })
          .toBuffer();

        return {
          buffer: optimizedBuffer,
          dimensions: {
            width: metadata.width,
            height: metadata.height,
          },
          format: metadata.format,
          quality: 85,
        };
      } catch (error) {
        this.logger.error('Error procesando metadata de imagen:', error);
        throw new Error(`Error procesando metadata: ${error.message}`);
      }
    } catch (error) {
      this.logger.error('Error en el procesamiento de imagen:', error);
      throw new BadRequestException(
        `Error procesando la imagen: ${error.message}`,
      );
    }
  }

  private async saveFile(
    buffer: Buffer,
    filename: string,
    creditId: string,
    documentType: DocumentType,
  ): Promise<string> {
    try {
      const credit = await this.creditRepository.findOne({
        where: { id: creditId },
        relations: ['user'],
      });

      if (!credit || !credit.user) {
        throw new NotFoundException('Crédito o usuario no encontrado');
      }

      // Sanitizar nombre de usuario para el directorio
      const userFolder = `${credit.user.id}-${credit.user.nombres.replace(/[^a-z0-9]/gi, '_').toLowerCase()}`;

      // Construir rutas
      const relativePath = path
        .join('credits', userFolder, creditId, documentType, filename)
        .replace(/\\/g, '/');

      const absolutePath = path.join(this.UPLOAD_DIR, relativePath);
      const dir = path.dirname(absolutePath);

      this.logger.debug('Paths construidos:', {
        relativePath,
        absolutePath,
        directory: dir,
      });

      // Crear directorio si no existe
      await fs.mkdir(dir, { recursive: true });

      // Guardar archivo
      await fs.writeFile(absolutePath, buffer);

      this.logger.debug('Archivo guardado exitosamente:', {
        path: relativePath,
        size: buffer.length,
      });

      return relativePath;
    } catch (error) {
      this.logger.error('Error guardando archivo:', error);
      throw new Error(`Error al guardar el archivo: ${error.message}`);
    }
  }

  async uploadDocument(
    creditId: string,
    file: Express.Multer.File,
    documentType: DocumentType,
  ): Promise<DocumentResponseDto> {
    this.logger.log(`Iniciando upload para crédito ${creditId}`);

    try {
      // Validación inicial del archivo
      if (!file || !file.buffer) {
        throw new BadRequestException('No se proporcionó un archivo válido');
      }

      // Validación específica de tipo de archivo
      if (
        !['image/jpeg', 'image/png', 'application/pdf'].includes(file.mimetype)
      ) {
        throw new BadRequestException(
          'Solo se permiten archivos JPG, PNG y PDF',
        );
      }

      const credit = await this.creditRepository.findOne({
        where: { id: creditId },
        relations: ['documents'],
      });

      if (!credit) {
        throw new NotFoundException('Crédito no encontrado');
      }

      this.validateFile(file);

      let fileBuffer: Buffer;
      let imageMetadata: any = null;

      // Procesamiento específico para imágenes
      if (file.mimetype.startsWith('image/')) {
        try {
          const processedImage = await this.processImage(file);
          if (processedImage) {
            fileBuffer = processedImage.buffer;
            imageMetadata = processedImage;
            this.logger.debug('Imagen procesada exitosamente', {
              originalSize: file.size,
              processedSize: processedImage.buffer.length,
            });
          } else {
            fileBuffer = file.buffer;
          }
        } catch (error) {
          this.logger.error('Error procesando imagen:', error);
          throw new BadRequestException(
            `Error procesando imagen: ${error.message}`,
          );
        }
      } else if (file.mimetype === 'application/pdf') {
        // Para PDFs, usar el buffer original
        fileBuffer = file.buffer;
        this.logger.debug('Archivo PDF recibido', {
          size: file.size,
          name: file.originalname,
        });
      }

      // Generar nombre único para el archivo
      const fileExtension = path.extname(file.originalname).toLowerCase();
      const randomId = crypto.randomBytes(4).toString('hex');
      const fileName = `${documentType}-${Date.now()}-${randomId}${fileExtension}`;

      // Guardar el archivo
      const fileUrl = await this.saveFile(
        fileBuffer,
        fileName,
        creditId,
        documentType,
      );

      // Crear el documento en la base de datos
      const document = this.documentRepository.create({
        credit: { id: creditId },
        documentType,
        fileName,
        fileSize: fileBuffer.length,
        fileType: file.mimetype as FileType,
        fileUrl,
        isVerified: false,
        metadata: {
          originalName: file.originalname,
          mimeType: file.mimetype,
          dimensions: imageMetadata?.dimensions
            ? {
                original: imageMetadata.dimensions.original,
                resized: imageMetadata.dimensions.resized,
              }
            : undefined,
          hash: crypto.createHash('md5').update(fileBuffer).digest('hex'),
          processedAt: new Date(),
          processingDetails: imageMetadata
            ? {
                format: imageMetadata.format,
                quality: imageMetadata.quality,
                wasResized: !!imageMetadata.dimensions?.resized,
              }
            : undefined,
        },
      });

      const savedDocument = await this.documentRepository.save(document);
      const baseUrl =
        this.configService.get('APP_URL') || 'http://localhost:3000';
      const publicUrl = `${baseUrl}/uploads/${fileUrl}`;

      this.logger.log(`Documento guardado exitosamente:`, {
        id: savedDocument.id,
        type: documentType,
        fileName: fileName,
        size: fileBuffer.length,
      });

      return {
        id: savedDocument.id,
        documentType: savedDocument.documentType,
        fileName: savedDocument.fileName,
        fileUrl: publicUrl,
        fileType: savedDocument.fileType,
        isVerified: savedDocument.isVerified,
        createdAt: savedDocument.createdAt,
        metadata: savedDocument.metadata,
      };
    } catch (error) {
      this.logger.error('Error en uploadDocument:', {
        error: error.message,
        stack: error.stack,
        creditId,
        fileName: file?.originalname,
        fileType: file?.mimetype,
      });

      if (
        error instanceof BadRequestException ||
        error instanceof NotFoundException
      ) {
        throw error;
      }

      throw new BadRequestException(
        `Error al procesar el documento: ${error.message}`,
      );
    }
  }

  async getDocuments(creditId: string): Promise<DocumentResponseDto[]> {
    try {
      const documents = await this.documentRepository.find({
        where: { credit: { id: creditId } },
        order: { createdAt: 'DESC' },
      });

      const baseUrl =
        this.configService.get('APP_URL') || 'http://localhost:3000';

      return documents.map((document) => ({
        id: document.id,
        documentType: document.documentType,
        fileName: document.fileName,
        fileUrl: `${baseUrl}/uploads/${document.fileUrl}`,
        fileType: document.fileType,
        isVerified: document.isVerified,
        createdAt: document.createdAt,
        metadata: document.metadata,
      }));
    } catch (error) {
      this.logger.error('Error obteniendo documentos:', error);
      throw new BadRequestException('Error al obtener los documentos');
    }
  }

  async getDocument(documentId: string): Promise<DocumentResponseDto> {
    try {
      const document = await this.documentRepository.findOne({
        where: { id: documentId },
      });

      if (!document) {
        throw new NotFoundException('Documento no encontrado');
      }

      const baseUrl =
        this.configService.get('APP_URL') || 'http://localhost:3000';

      return {
        id: document.id,
        documentType: document.documentType,
        fileName: document.fileName,
        fileUrl: `${baseUrl}/uploads/${document.fileUrl}`,
        fileType: document.fileType,
        isVerified: document.isVerified,
        createdAt: document.createdAt,
        metadata: document.metadata,
      };
    } catch (error) {
      this.logger.error('Error obteniendo documento:', error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Error al obtener el documento');
    }
  }

  async deleteDocument(documentId: string): Promise<void> {
    try {
      const document = await this.documentRepository.findOne({
        where: { id: documentId },
      });

      if (!document) {
        throw new NotFoundException('Documento no encontrado');
      }

      // Eliminar archivo físico
      const filePath = path.join(process.cwd(), 'uploads', document.fileUrl);
      await fs.unlink(filePath);

      // Eliminar registro de la base de datos
      await this.documentRepository.remove(document);

      this.logger.log(`Documento eliminado exitosamente: ${documentId}`);
    } catch (error) {
      this.logger.error('Error eliminando documento:', error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Error al eliminar el documento');
    }
  }

  async verifyDocument(
    documentId: string,
    verifyData: VerifyDocumentDto,
  ): Promise<DocumentResponseDto> {
    try {
      const document = await this.documentRepository.findOne({
        where: { id: documentId },
      });

      if (!document) {
        throw new NotFoundException('Documento no encontrado');
      }

      document.isVerified = verifyData.verified;
      document.verificationDate = new Date();
      document.metadata = {
        ...document.metadata,
        verificationDetails: {
          verifiedAt: new Date(),
          verifiedBy: 'system',
          comments: verifyData.comments || '',
        },
      };

      await this.documentRepository.save(document);

      const baseUrl =
        this.configService.get('APP_URL') || 'http://localhost:3000';

      return {
        id: document.id,
        documentType: document.documentType,
        fileName: document.fileName,
        fileUrl: `${baseUrl}/uploads/${document.fileUrl}`,
        fileType: document.fileType,
        isVerified: document.isVerified,
        createdAt: document.createdAt,
        metadata: document.metadata,
      };
    } catch (error) {
      this.logger.error('Error verificando documento:', error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Error al verificar el documento');
    }
  }
}
