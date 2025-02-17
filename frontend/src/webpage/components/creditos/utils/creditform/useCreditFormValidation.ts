import { useState } from "react";
import { CreditFormData, FormErrors } from "@/src/core/types/types";

export const useCreditFormValidation = () => {
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateDocument = (document: string): boolean => {
    if (!document) return false;
    const length = document.length;
    return length >= 8 && length <= 10 && /^\d+$/.test(document);
  };

  const validateForm = (formData: CreditFormData): boolean => {
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

  const resetSubmission = () => {
    setIsSubmitted(false);
    setFormErrors({});
  };

  return {
    formErrors,
    isSubmitted,
    setIsSubmitted,
    validateForm,
    validateDocument,
    setFormErrors,
    resetSubmission,
  };
};
