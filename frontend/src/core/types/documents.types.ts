// src/core/types/documents.types.ts

export enum DocumentType {
    ID = 'id',
    PAYROLL = 'payroll',
    SERVICES = 'services'
   }
   
   export interface FileData {
    file: File;
    type: 'image' | 'pdf';
    previewUrl?: string;
   }
   
   export interface DocumentRequirement {
    id: DocumentType;
    type: DocumentType;
    name: string;
    label: string;
    description: string;
    accept: string;
    maxSize: number;
   }
   
   export interface UploadProgress {
    [key: string]: number;
   }
   
   export interface UploadedFiles {
    [key: string]: FileData | null;
   }
   
   export interface DocumentResponseDto {
    id: string;
    documentType: DocumentType;
    fileName: string;
    fileUrl: string;
    fileType: string;
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
   
   export interface FileUploadResult {
    success: boolean;
    fileName?: string;
    error?: string;
   }
   
   export interface DocumentValidationOptions {
    maxSize: number;
    allowedTypes: string[];
   }
   
   export const CREDIT_DOCUMENT_STATUS = {
    PENDING: 'PENDING',
    SUBMITTED: 'SUBMITTED',
    VERIFIED: 'VERIFIED',
    REJECTED: 'REJECTED'
   } as const;
   
   export type CreditDocumentStatus = typeof CREDIT_DOCUMENT_STATUS[keyof typeof CREDIT_DOCUMENT_STATUS];