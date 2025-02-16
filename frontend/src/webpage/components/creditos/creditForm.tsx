import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalAuth } from "@/src/core/context/authContext";
import { CreditFormData, FormErrors } from "@/components/creditos/utils/types";
import { useCredit } from "@/src/core/hooks/api/use-credit";
import { toast } from "react-hot-toast";
import { AUTH_TOKENS } from "@/src/core/constants/auth.constants";
import { CreateCreditDTO } from "@/src/core/types/credit.types";
import CreditFormSliders from "./tools/CreditFormSliders";
import CreditFormFields from "./tools/CreditFormFields";
import CreditFormTerms from "./tools/CreditFormTerms";
import CreditFormSubmit from "./tools/CreditFormSubmit";
import LoginModal from "../login/components/pages/loginModal";
import {
  FormContainer,
  SliderGroup,
  FormFields,
} from "./styles/creditFormConst";
import { userService } from "@/src/core/services/user.service";
import { routesWebpage } from "../contants/routes";

interface CreditFormProps {
  onSubmit: (data: CreditFormData) => void;
  initialData?: CreditFormData;
}

interface ValidFields {
  email: boolean;
  document: boolean;
  location: boolean;
}

const CreditForm = ({ onSubmit, initialData }: CreditFormProps) => {
  const navigate = useNavigate();
  const defaultInitialData: CreditFormData = {
    amount: 2000,  // Cambiado de 1000 a 2000
    term: 6,
    income: 500,
    location: "",
    email: "",
    document: "",
    termsAccepted: false,
  };

  const [formData, setFormData] = useState<CreditFormData>(
    initialData || defaultInitialData
  );
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [pendingFormData, setPendingFormData] = useState<CreditFormData | null>(
    null
  );
  const [validFields, setValidFields] = useState<ValidFields>({
    email: false,
    document: false,
    location: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const { createCredit } = useCredit();
  const { isAuthenticated, checkAuth } = useGlobalAuth();

  const validateDocument = (document: string): boolean => {
    if (!document) return false;
    const length = document.length;
    return length >= 8 && length <= 10 && /^\d+$/.test(document);
  };

  useEffect(() => {
    let isSubscribed = true;

    const fetchEmailByDocument = async () => {
      if (!validateDocument(formData.document)) return;

      try {
        const response = await userService.findByDocument(formData.document);
        if (!isSubscribed || !response?.success) return;

        const email = response.data?.email;
        if (email) {
          setFormData((prev) => ({ ...prev, email }));
          setValidFields((prev) => ({ ...prev, email: true }));
        }
      } catch (error) {
        if (isSubscribed) {
          setFormData((prev) => ({ ...prev, email: "" }));
          setValidFields((prev) => ({ ...prev, email: false }));
        }
      }
    };

    const timeoutId = setTimeout(() => {
      fetchEmailByDocument();
    }, 500);

    return () => {
      isSubscribed = false;
      clearTimeout(timeoutId);
    };
  }, [formData.document]);

  useEffect(() => {
    if (isAuthenticated && pendingFormData) {
      const processFormImmediately = async () => {
        try {
          await new Promise((resolve) => setTimeout(resolve, 1500));
          setIsLoading(true);

          const tokens = localStorage.getItem(AUTH_TOKENS);
          const userData = tokens ? JSON.parse(tokens) : null;

          if (!tokens || !userData?.accessToken) {
            throw new Error("No se encontraron tokens de autenticación");
          }

          await submitCredit(pendingFormData);
          setPendingFormData(null);
          setShowLoginModal(false);
        } catch (error) {
          console.error(
            "Error procesando formulario después del login:",
            error
          );
          toast.error("Error al procesar la solicitud");
          setPendingFormData(null);
        } finally {
          setIsLoading(false);
        }
      };

      processFormImmediately();
    }
  }, [isAuthenticated, pendingFormData, checkAuth]);

  const handleSliderChange =
    (field: keyof CreditFormData) => (_: Event, value: number | number[]) => {
      const newFormData = {
        ...formData,
        [field]: value,
      };
      setFormData(newFormData);
    };

  const handleFieldChange =
    (field: keyof CreditFormData) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      let value = event.target.value;
      if (field === "document") {
        value = value.replace(/[^0-9]/g, "").slice(0, 10);
      }

      const newFormData = {
        ...formData,
        [field]: value,
      };
      setFormData(newFormData);
    };

  const submitCredit = async (data: CreditFormData) => {
    try {
      const tokens = localStorage.getItem(AUTH_TOKENS);
      const userData = tokens ? JSON.parse(tokens) : null;

      if (!tokens || !userData?.accessToken) {
        throw new Error("Debe iniciar sesión para continuar");
      }

      console.log("Datos del formulario:", data); // Para debugging

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
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitted(true);

    if (!validateForm()) {
      return;
    }

    try {
      setIsLoading(true);

      if (!isAuthenticated) {
        setPendingFormData(formData);
        setShowLoginModal(true);
        return;
      }

      await submitCredit(formData);
    } catch (error) {
      console.error("Error en el envío del formulario:", error);
      toast.error("Error al procesar el formulario");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginSuccess = async () => {
    if (pendingFormData) {
      try {
        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 2000));

        const tokens = localStorage.getItem(AUTH_TOKENS);
        const userData = tokens ? JSON.parse(tokens) : null;

        if (!tokens || !userData?.accessToken) {
          throw new Error("No se encontraron tokens de autenticación válidos");
        }

        const forceCheck = await checkAuth();
        if (!forceCheck) {
          throw new Error("No se pudo verificar la autenticación");
        }

        await submitCredit(pendingFormData);
        setPendingFormData(null);
        setShowLoginModal(false);
      } catch (error) {
        console.error("Error procesando formulario después del login:", error);
        toast.error("Error al procesar la solicitud");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const validateForm = () => {
    const errors: FormErrors = {};

    if (!formData.document) {
      errors.document = "Campo requerido";
    } else if (!validateDocument(formData.document)) {
      errors.document = "Cédula inválida (debe tener entre 8 y 10 dígitos)";
    }

    if (!formData.email) {
      errors.email = "Campo requerido";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Correo electrónico inválido";
    }

    if (!formData.location) {
      errors.location = "Campo requerido";
    }

    if (!formData.termsAccepted) {
      errors.termsAccepted = "Debes aceptar los términos y condiciones";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <FormContainer>
          <SliderGroup>
            <CreditFormSliders
              formData={formData}
              formErrors={formErrors}
              handleSliderChange={handleSliderChange}
            />
          </SliderGroup>
          <FormFields>
            <CreditFormFields
              formData={formData}
              formErrors={formErrors}
              handleFieldChange={handleFieldChange}
              isSubmitted={isSubmitted}
              validFields={validFields}
            />
            <CreditFormTerms
              formData={formData}
              formErrors={formErrors}
              setFormData={setFormData}
            />
            <CreditFormSubmit
              isLoading={isLoading}
              termsAccepted={formData.termsAccepted}
            />
          </FormFields>
        </FormContainer>
      </form>

      <LoginModal
        open={showLoginModal}
        onClose={() => {
          setShowLoginModal(false);
          setPendingFormData(null);
        }}
        onLoginSuccess={handleLoginSuccess}
      />
    </>
  );
};

export default CreditForm;
