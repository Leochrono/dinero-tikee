import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useCredit } from "@/src/core/hooks/api/use-credit";
import { toast } from "react-hot-toast";
import { AUTH_TOKENS } from "@/src/core/constants/auth.constants";
import { CreditFormData } from "@/src/core/types/types";
import { CreateCreditDTO } from "@/src/core/types/credit.types";
import { routesWebpage } from "@/components/contants/routes";
import { useGlobalAuth } from "@/src/core/context/authContext";

export const useCreditFormSubmission = () => {
  const navigate = useNavigate();
  const { createCredit } = useCredit();
  const { checkAuth } = useGlobalAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [pendingFormData, setPendingFormData] = useState<CreditFormData | null>(
    null
  );

  const submitCredit = useCallback(
    async (data: CreditFormData) => {
      try {
        const tokens = localStorage.getItem(AUTH_TOKENS);
        const userData = tokens ? JSON.parse(tokens) : null;

        if (!tokens || !userData?.accessToken) {
          throw new Error("Debe iniciar sesión para continuar");
        }

        const creditDataForBackend: CreateCreditDTO = {
          amount: data.amount,
          term: data.term,
          income: data.income,
          location: data.location,
          email: data.email,
          document: data.document,
          termsAccepted: data.termsAccepted,
          status: "PENDING",
        };

        const response = await createCredit(creditDataForBackend);

        if (!response?.success || !response?.data?.id) {
          throw new Error("Error al procesar la solicitud de crédito");
        }

        localStorage.setItem("currentCreditId", response.data.id);
        toast.success("Solicitud de crédito procesada correctamente");
        navigate(routesWebpage.creditoResults);
        return response.data;
      } catch (error: any) {
        console.error("Error completo:", error);

        const errorMessage = error.message || "Error al procesar la solicitud";

        if (errorMessage.includes("sesión") || errorMessage.includes("auth")) {
          setPendingFormData(data);
          setShowLoginModal(true);
        } else {
          toast.error(errorMessage);
        }

        throw error;
      }
    },
    [createCredit, navigate]
  );

  const handleSubmit = useCallback(
    async (formData: CreditFormData, validateForm: () => boolean) => {
      if (!validateForm()) {
        return false;
      }

      try {
        setIsLoading(true);

        if (!localStorage.getItem(AUTH_TOKENS)) {
          setPendingFormData(formData);
          setShowLoginModal(true);
          return false;
        }

        await submitCredit(formData);
        return true;
      } catch (error) {
        console.error("Error en el envío del formulario:", error);
        toast.error("Error al procesar el formulario");
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [submitCredit]
  );

  const handleLoginSuccess = useCallback(async () => {
    if (pendingFormData) {
      try {
        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 2000));

        const tokens = localStorage.getItem(AUTH_TOKENS);
        if (!tokens) {
          throw new Error("No se encontraron tokens de autenticación válidos");
        }

        const forceCheck = await checkAuth();
        if (!forceCheck) {
          throw new Error("No se pudo verificar la autenticación");
        }

        await submitCredit(pendingFormData);
        setPendingFormData(null);
        setShowLoginModal(false);
        return true;
      } catch (error) {
        console.error("Error procesando formulario después del login:", error);
        toast.error("Error al procesar la solicitud");
        return false;
      } finally {
        setIsLoading(false);
      }
    }
    return false;
  }, [pendingFormData, submitCredit, checkAuth]);

  return {
    isLoading,
    showLoginModal,
    pendingFormData,
    submitCredit,
    handleSubmit,
    handleLoginSuccess,
    setShowLoginModal,
    setPendingFormData,
  };
};
