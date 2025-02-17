import { useNavigate } from "react-router-dom";
import { Credit } from "@/src/core/types/credit.types";

export const creditAction = () => {
  const navigate = useNavigate();

  const calculateMonthlyPayment = (credit: Credit) => {
    const monthlyRate = credit.institution?.minRate
      ? credit.institution.minRate / 12 / 100
      : 0;

    const monthlyPayment = credit.institution
      ? (credit.amount * monthlyRate * Math.pow(1 + monthlyRate, credit.term)) /
        (Math.pow(1 + monthlyRate, credit.term) - 1)
      : 0;

    return isNaN(monthlyPayment) ? 0 : monthlyPayment;
  };

  const handleCreditAction = (credit: Credit) => {
    if (credit.status === "DOCUMENTS_SUBMITTED") {
      window.open(
        `mailto:${
          credit.institution?.email || ""
        }?subject=Consulta sobre crédito ${credit.id}`
      );
    } else {
      navigate(`/creditos/detalles/${credit.id}`);
    }
  };

  return {
    calculateMonthlyPayment,
    handleCreditAction,
  };
};
