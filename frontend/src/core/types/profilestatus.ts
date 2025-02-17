import { UserCredit } from "./credit.types";

export const creditStatusConfig = {
  APPROVED: {
    color: "#4CAF50", 
    text: "Aprobado",
    order: 1,
  },
  UNDER_REVIEW: {
    color: "#FFC107", 
    text: "En Revisión",
    order: 2,
  },
  DOCUMENTS_SUBMITTED: {
    color: "#2196F3", 
    text: "Documentos Enviados",
    order: 3,
  },
  REJECTED: {
    color: "#F44336", 
    text: "Rechazado",
    order: 4,
  },
  PENDING: {
    color: "#9E9E9E", 
    text: "Pendiente",
    order: 5,
  },
};

export interface GroupedCredits {
  APPROVED: UserCredit[];
  UNDER_REVIEW: UserCredit[];
  DOCUMENTS_SUBMITTED: UserCredit[];
  REJECTED: UserCredit[];
  PENDING: UserCredit[];
}
