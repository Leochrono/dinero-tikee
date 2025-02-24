import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalAuth } from "@/src/core/context/authContext";
import { CreditFormData } from "@/src/core/types/types";
import LoginModal from "@/components/login/components/pages/loginModal";
import CreditFormSliders from "@/webpage/components/creditos/utils/creditform/CreditFormSliders";
import CreditFormFields from "@/webpage/components/creditos/utils/creditform/CreditFormFields";
import CreditFormTerms from "@/webpage/components/creditos/utils/creditform/CreditFormTerms";
import CreditFormSubmit from "@/webpage/components/creditos/utils/creditform/CreditFormSubmit";
import {
  FormContainer,
  SliderGroup,
  FormFields,
} from "@/webpage/components/creditos/styles/creditFormConst";
import { useCreditFormValidation } from "@/webpage/components/creditos/utils/creditform/useCreditFormValidation";
import { useDocumentEmailLookup } from "@/webpage/components/creditos/utils/creditform/useDocumentEmailLookup";
import { useCreditFormSubmission } from "@/webpage/components/creditos/utils/creditform/useCreditFormSubmission";

interface CreditFormProps {
  onSubmit: (data: CreditFormData) => void;
  initialData?: CreditFormData;
}

const CreditForm = ({ onSubmit, initialData }: CreditFormProps) => {
  const { user } = useGlobalAuth();

  const defaultInitialData: CreditFormData = {
    amount: 2000,
    term: 6,
    income: 500,
    location: "",
    email: "",
    document: "",
    termsAccepted: false,
  };
  const prepareInitialData = useCallback(() => {
    const baseData = initialData || defaultInitialData;
    return {
      ...baseData,
      email: user?.email || baseData.email,
      document: user?.cedula || baseData.document,
    };
  }, [initialData, user]);

  const [formData, setFormData] = useState<CreditFormData>(
    prepareInitialData()
  );
  const {
    formErrors,
    isSubmitted,
    setIsSubmitted,
    validateForm,
    setFormErrors,
  } = useCreditFormValidation();

  const { validFields } = useDocumentEmailLookup({
    document: formData.document,
    setFormData,
  });

  const {
    isLoading,
    showLoginModal,
    handleSubmit: handleCreditSubmit,
    handleLoginSuccess,
    setShowLoginModal,
    setPendingFormData,
  } = useCreditFormSubmission();
  
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

  // Nueva función para manejar la entrada manual en los sliders
  const handleInputChange = 
  (field: keyof CreditFormData) =>
  (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = parseFloat(event.target.value);
    
    // Si no es un número válido, usar 0 o el valor mínimo
    if (isNaN(value)) {
      if (field === 'amount') value = 2000;
      else if (field === 'term') value = 6;
      else if (field === 'income') value = 500;
    }
    
    // Aplicar límites min/max
    if (field === 'amount') {
      if (value < 2000) value = 2000;
      if (value > 30000) value = 30000;
    } else if (field === 'term') {
      if (value < 6) value = 6;
      if (value > 64) value = 64;
      // No redondear al paso de 6, permitir cualquier valor intermedio
    } else if (field === 'income') {
      if (value < 500) value = 500;
      if (value > 10000) value = 10000;
    }

    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitted(true);

    const success = await handleCreditSubmit(formData, () =>
      validateForm(formData)
    );
    if (success) {
      onSubmit(formData);
    }
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
              handleInputChange={handleInputChange}
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