import { UserCredit } from "./credit.types";

export const creditStatusConfig = {
    APPROVED: {
      color: "#4CAF50", // Verde
      text: "Aprobado",
      order: 1
    },
    UNDER_REVIEW: {
      color: "#FFC107", // Amarillo
      text: "En Revisión",
      order: 2
    },
    DOCUMENTS_SUBMITTED: {
      color: "#2196F3", // Azul
      text: "Documentos Enviados",
      order: 3
    },
    REJECTED: {
      color: "#F44336", // Rojo
      text: "Rechazado",
      order: 4
    },
    PENDING: {
      color: "#9E9E9E", // Gris
      text: "Pendiente",
      order: 5
    }
  };

  export interface GroupedCredits {
    APPROVED: UserCredit[];
    UNDER_REVIEW: UserCredit[];
    DOCUMENTS_SUBMITTED: UserCredit[];
    REJECTED: UserCredit[];
    PENDING: UserCredit[];
  }