import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useCredit } from "@/src/core/hooks/api/use-credit";
import { routesWebpage } from "@/components/contants/routes";

export const useCreditInstitutionSelection = () => {
  const navigate = useNavigate();
  const { updateCredit } = useCredit();
  const [isLoading, setIsLoading] = useState(false);

  const handleInstitutionSelect = useCallback(
    async (institutionId: string) => {
      try {
        setIsLoading(true);

        const storedCreditId = localStorage.getItem("currentCreditId");
        if (!storedCreditId) {
          throw new Error("No hay un crédito activo");
        }

        if (!institutionId) {
          throw new Error("No se ha seleccionado una institución");
        }
        localStorage.setItem("selectedInstitutionId", institutionId);
        const updateResponse = await updateCredit(storedCreditId, {
          institutionId,
          status: "INSTITUTION_SELECTED",
        });

        if (!updateResponse.success) {
          throw new Error(
            updateResponse.error || "Error al actualizar el crédito"
          );
        }
        navigate(routesWebpage.creditoDetails);
      } catch (error: any) {
        console.error("Error en selección de institución:", error);
        toast.error(error.message);
        localStorage.removeItem("selectedInstitutionId");
      } finally {
        setIsLoading(false);
      }
    },
    [updateCredit, navigate]
  );

  return {
    handleInstitutionSelect,
    isLoading,
  };
};
