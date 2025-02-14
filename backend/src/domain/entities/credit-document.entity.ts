import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
    Index,
  } from 'typeorm';
  import { CreditEntity } from './credit.entity';
  
  export enum DocumentType {
    ID = 'id',
    PAYROLL = 'payroll',
    SERVICES = 'services',
  }
  
  export enum FileType {
    PDF = 'application/pdf',
    JPEG = 'image/jpeg',
    PNG = 'image/png',
  }
  
  // Definimos una interfaz para el metadata
  interface DocumentMetadata {
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
    processedAt?: Date;
    processingDetails?: {
      format?: string;
      quality?: number;
      wasResized?: boolean;
    };
    verificationDetails?: {
      verifiedAt: Date;
      verifiedBy: string;
      comments: string; // Ahora es obligatorio
    };
  }
  
  @Entity('credit_documents')
  @Index(['credit', 'documentType'])
  export class CreditDocumentEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @ManyToOne(() => CreditEntity, (credit) => credit.documents)
    credit: CreditEntity;
  
    @Column({
      type: 'enum',
      enum: DocumentType,
      nullable: false,
    })
    documentType: DocumentType;
  
    @Column({
      type: 'enum',
      enum: FileType,
      nullable: false,
    })
    fileType: FileType;
  
    @Column()
    fileName: string;
  
    @Column()
    fileSize: number;
  
    @Column()
    fileUrl: string;
  
    @Column({ nullable: true })
    fileKey: string;
  
    @Column({ default: false })
    isVerified: boolean;
  
    @Column({ nullable: true })
    verifiedBy: string;
  
    @Column({ nullable: true })
    verificationDate: Date;
  
    @Column({ type: 'json', nullable: true })
    metadata: DocumentMetadata;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  }

