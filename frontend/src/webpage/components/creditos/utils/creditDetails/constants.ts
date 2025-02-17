export const DOCUMENT_REQUIREMENTS = [
  {
    id: "id",
    name: "Documento de identidad",
    accept: ".jpg,.jpeg,.png,.pdf",
    maxSize: 5 * 1024 * 1024, // 5MB
  },
  {
    id: "payroll",
    name: "Roles de pago",
    accept: ".jpg,.jpeg,.png,.pdf",
    maxSize: 5 * 1024 * 1024,
  },
  {
    id: "services",
    name: "Factura Servicios Básicos",
    accept: ".jpg,.jpeg,.png,.pdf",
    maxSize: 5 * 1024 * 1024,
  },
];

export const CREDIT_STATUS = {
  DOCUMENTS_SUBMITTED: "DOCUMENTS_SUBMITTED",
};
