import { useState, useCallback } from "react";
import { formService } from "../../services/form.service";
import { toast } from "react-hot-toast";
import { CreditFormData, CreditResponse } from "../../types/credit.types";
import { ApiResponse } from "../../types/auth.types";


interface CreditFormState {
  loading: boolean;
  error: string | null;
  preApprovalData: any | null;
}

export const useCreditForm = () => {
  const [state, setState] = useState<CreditFormState>({
    loading: false,
    error: null,
    preApprovalData: null,
  });

  const updateState = useCallback((newState: Partial<CreditFormState>) => {
    setState((prev) => ({ ...prev, ...newState }));
  }, []);

  const validatePreApproval = useCallback(
    async (data: CreditFormData): Promise<ApiResponse<any>> => {
      try {
        updateState({ loading: true, error: null });
        const response = await formService.validatePreApproval(data);

        if (!response.success) {
          throw new Error(response.error || "Error al validar pre-aprobación");
        }

        updateState({ preApprovalData: response.data });
        return response;
      } catch (error: any) {
        const errorMessage = error.message || "Error al validar pre-aprobación";
        updateState({ error: errorMessage });
        toast.error(errorMessage);
        throw error;
      } finally {
        updateState({ loading: false });
      }
    },
    []
  );

  const submitForm = useCallback(
    async (data: CreditFormData): Promise<ApiResponse<CreditResponse>> => {
      try {
        updateState({ loading: true, error: null });
        const response = await formService.submitCreditForm(data);

        if (!response.success) {
          throw new Error(response.error || "Error al enviar el formulario");
        }

        toast.success("Formulario enviado exitosamente");
        return response;
      } catch (error: any) {
        const errorMessage = error.message || "Error al enviar el formulario";
        updateState({ error: errorMessage });
        toast.error(errorMessage);
        throw error;
      } finally {
        updateState({ loading: false });
      }
    },
    []
  );

  const resetForm = useCallback(() => {
    updateState({
      error: null,
      preApprovalData: null,
    });
  }, []);

  return {
    // Estado
    loading: state.loading,
    error: state.error,
    preApprovalData: state.preApprovalData,

    // Métodos
    validatePreApproval,
    submitForm,
    resetForm,

    // Utilidades
    setError: (error: string | null) => updateState({ error }),
  };
};
