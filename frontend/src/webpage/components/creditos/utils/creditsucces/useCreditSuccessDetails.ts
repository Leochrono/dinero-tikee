import { useState, useEffect } from "react";
import { useCredit } from "@/src/core/hooks/api/use-credit";

interface CreditInfo {
  amount: number;
  institution: {
    name: string;
  };
  email: string;
}

export const useCreditSuccessDetails = () => {
  const [creditInfo, setCreditInfo] = useState<CreditInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { getDetails } = useCredit();

  useEffect(() => {
    const fetchCreditInfo = async () => {
      const creditId = localStorage.getItem("currentCreditId");
      const creditFormData = localStorage.getItem("creditFormData");

      if (!creditId) {
        setError("No se encontró información del crédito");
        setLoading(false);
        return;
      }

      try {
        const response = await getDetails(creditId);
        const formData = creditFormData ? JSON.parse(creditFormData) : null;

        if (response.success && response.data) {
          setCreditInfo({
            amount: response.data.amount,
            institution: {
              name: response.data.institution?.name || "Institución",
            },
            email: formData?.email || "correo no disponible",
          });
        } else {
          setError("No se pudo obtener la información del crédito");
        }
      } catch (error: any) {
        console.error("Error obteniendo información del crédito:", error);
        setError(error.message || "Error al cargar la información");
      } finally {
        setLoading(false);
      }
    };

    fetchCreditInfo();
  }, [getDetails]);

  const clearLocalStorageData = () => {
    localStorage.removeItem("currentCreditId");
    localStorage.removeItem("selectedInstitutionId");
    localStorage.removeItem("creditFormData");
  };

  return {
    creditInfo,
    loading,
    error,
    clearLocalStorageData,
  };
};
