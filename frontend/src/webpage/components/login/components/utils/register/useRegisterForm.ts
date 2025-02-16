import { useState } from "react";
import { RegisterFormData, FormErrors } from "@/src/core/types/registerTypes";
import { useRegisterValidations } from "./useRegisterValidations";
import { useRegisterSubmit } from "./useRegisterSubmit";

export const useRegisterForm = () => {
  const [formData, setFormData] = useState<RegisterFormData>({
    nombres: "",
    apellidos: "",
    cedula: "",
    email: "",
    telefono: "",
    direccion: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { validateField } = useRegisterValidations(setErrors);
  const { handleSubmit, isLoading } = useRegisterSubmit(formData, setErrors);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const validatedValue = validateField(name, value, formData);

    setFormData(prev => ({
      ...prev,
      [name]: validatedValue
    }));
  };

  const togglePasswordVisibility = (field: 'password' | 'confirmPassword') => {
    if (field === 'password') {
      setShowPassword(!showPassword);
    } else {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    if (e.currentTarget.id === "confirmPassword") {
      e.preventDefault();
      // Puedes usar un toast aquí si lo necesitas
    }
  };

  return {
    formData,
    errors,
    showPassword,
    showConfirmPassword,
    handleChange,
    handleSubmit,
    handlePaste,
    togglePasswordVisibility,
    isLoading,
  };
};