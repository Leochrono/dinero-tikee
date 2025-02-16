import { RecoveryType, RecoverFormData } from "./useRecovery";

export const validateFields = (
  recoveryType: RecoveryType | "", 
  formData: RecoverFormData
): boolean => {
  switch (recoveryType) {
    case "password":
      return !!formData.email;
    case "user":
      return !!formData.cedula;
    case "both":
      return !!formData.email && !!formData.cedula;
    default:
      return false;
  }
};