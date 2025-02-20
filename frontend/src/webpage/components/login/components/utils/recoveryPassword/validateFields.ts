import { RecoveryType, RecoverFormData } from "./useRecovery";

export const validateFields = (
  recoveryType: RecoveryType | "",
  formData: RecoverFormData
): boolean => {
  switch (recoveryType) {
    case "password":
      return !!formData.email;
    case "unlock":
      return !!formData.email && !!formData.cedula && /^\d{10}$/.test(formData.cedula);
    default:
      return false;
  }
};