import { useState, useEffect } from "react";
import { CreditFormData, FormErrors } from "@/components/creditos/utils/types";
import { userService } from "@/src/core/services/user.service";
import { validateDocument } from "@/components/creditos/utils/validations";

export const useCreditFormLogic = (initialData?: CreditFormData) => {
  const defaultInitialData: CreditFormData = {
    amount: 1000,
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

  // Efecto para buscar el correo cuando se ingresa una cédula válida
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
        }
      } catch (error) {
        if (isSubscribed) {
          setFormData((prev) => ({ ...prev, email: "" }));
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

  // Validación del formulario
  const validateForm = () => {
    const errors: FormErrors = {};
    if (!formData.document) errors.document = "Campo requerido";
    if (!formData.email) errors.email = "Campo requerido";
    if (!formData.location) errors.location = "Campo requerido";
    if (!formData.termsAccepted)
      errors.termsAccepted = "Debes aceptar los términos y condiciones";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  return {
    formData,
    setFormData,
    formErrors,
    isSubmitted,
    setIsSubmitted,
    validateForm,
  };
};
