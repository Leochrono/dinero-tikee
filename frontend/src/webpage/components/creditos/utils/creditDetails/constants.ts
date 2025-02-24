import { DocumentType, DocumentRequirement } from '@/src/core/types/documents.types';

export const DOCUMENT_REQUIREMENTS: DocumentRequirement[] = [
  {
    id: DocumentType.ID,
    type: DocumentType.ID,
    name: "Documento de identidad",
    label: "Documento de identidad",
    description: "Sube una copia de tu documento de identidad",
    accept: ".jpg,.jpeg,.png,.pdf",
    maxSize: 5 * 1024 * 1024,
  },
  {
    id: DocumentType.PAYROLL,
    type: DocumentType.PAYROLL,
    name: "Roles de pago",
    label: "Roles de pago",
    description: "Sube tus últimos 3 roles de pago",
    accept: ".jpg,.jpeg,.png,.pdf",
    maxSize: 5 * 1024 * 1024,
  },
  {
    id: DocumentType.SERVICES,
    type: DocumentType.SERVICES,
    name: "Factura Servicios Básicos",
    label: "Factura Servicios Básicos",
    description: "Sube una factura de servicios básicos reciente",
    accept: ".jpg,.jpeg,.png,.pdf",
    maxSize: 5 * 1024 * 1024,
  },
];

export const CREDIT_STATUS = {
  PENDING: 'PENDING',
  DOCUMENTS_SUBMITTED: 'DOCUMENTS_SUBMITTED',
  UNDER_REVIEW: 'UNDER_REVIEW',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED'
} as const;