import { validations } from "@/src/utils/validations";
import { RegisterFormData, FormErrors } from "@/src/core/types/registerTypes";

export const useRegisterValidations = (setErrors: React.Dispatch<React.SetStateAction<FormErrors>>) => {
  const validateField = (
    name: string, 
    value: string, 
    formData: RegisterFormData
  ): string => {
    let formattedValue = value;

    switch (name) {
      case "nombres":
      case "apellidos":
        formattedValue = validations.formatName(value);
        const nameError = validations.validateName(formattedValue);
        setErrors(prev => ({ 
          ...prev, 
          [name]: nameError || undefined 
        }));
        break;

      case "cedula":
        formattedValue = validations.formatCedula(value);
        if (formattedValue.length === 10) {
          const isValid = validations.validateCedula(formattedValue);
          setErrors(prev => ({ 
            ...prev, 
            cedula: isValid ? undefined : "Cédula inválida" 
          }));
        }
        break;

      case "telefono":
        formattedValue = validations.formatPhone(value);
        if (formattedValue.length === 10) {
          const isValid = validations.validatePhone(formattedValue);
          setErrors(prev => ({ 
            ...prev, 
            telefono: isValid ? undefined : "Número de teléfono inválido" 
          }));
        }
        break;

      case "email":
        const isValidEmail = validations.validateEmail(value);
        setErrors(prev => ({ 
          ...prev, 
          email: isValidEmail ? undefined : "Correo electrónico inválido" 
        }));
        break;

      case "password":
        const strength = validations.validatePasswordStrength(value);
        const passwordError = strength.strength < 3 
          ? `Contraseña ${strength.messages}` 
          : undefined;

        setErrors(prev => ({ 
          ...prev, 
          password: passwordError,
          confirmPassword: value !== formData.confirmPassword 
            ? "Las contraseñas no coinciden" 
            : undefined
        }));
        break;

      case "confirmPassword":
        setErrors(prev => ({ 
          ...prev, 
          confirmPassword: value !== formData.password 
            ? "Las contraseñas no coinciden" 
            : undefined 
        }));
        break;
    }

    return formattedValue;
  };

  return { validateField };
};