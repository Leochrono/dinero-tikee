import {
  IsEnum,
  IsNotEmpty,
  IsString,
  IsNumber,
  IsOptional,
  IsBoolean,
  IsDate,
} from 'class-validator';
import {
  DocumentType,
  FileType,
} from '../../../domain/entities/credit-document.entity';
import { Type } from 'class-transformer';

export class UploadDocumentDto {
  @IsEnum(DocumentType)
  @IsNotEmpty({ message: 'El tipo de documento es requerido' })
  documentType: DocumentType;

  @IsString()
  @IsNotEmpty({ message: 'El nombre del archivo es requerido' })
  fileName: string;

  @IsNumber()
  @IsNotEmpty({ message: 'El tamaño del archivo es requerido' })
  fileSize: number;

  @IsEnum(FileType)
  @IsNotEmpty({ message: 'El tipo de archivo es requerido' })
  fileType: FileType;

  @IsOptional()
  metadata?: {
    originalName: string;
    mimeType: string;
    dimensions?: {
      width: number;
      height: number;
    };
    hash?: string;
    verificationDetails?: {
      verifiedAt: Date;
      verifiedBy: string;
      comments: string;
    };
  };
}

export class DocumentResponseDto {
  id: string;
  documentType: DocumentType;
  fileName: string;
  fileUrl: string;
  fileType: FileType;
  isVerified: boolean;
  createdAt: Date;
  metadata: {
    originalName: string;
    mimeType: string;
    dimensions?: {
      original?: {
        width: number;
        height: number;
      };
      resized?: {
        width: number;
        height: number;
      };
    };
    hash?: string;
    verificationDetails?: {
      verifiedAt: Date;
      verifiedBy: string;
      comments: string;
    };
  };
}

export class VerifyDocumentDto {
  @IsBoolean()
  @IsNotEmpty({ message: 'El estado de verificación es requerido' })
  verified: boolean;

  @IsString()
  @IsOptional()
  comments?: string;
}

// DTO para respuestas de verificación
export interface VerifyDocumentResponseDto extends DocumentResponseDto {
  verificationDetails: {
    verifiedAt: Date;
    verifiedBy: string;
    comments?: string;
  };
}
