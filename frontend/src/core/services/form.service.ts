import axiosInstance from "../config/axios.config";
import { CreditFormData } from "@/src/core/types/types";
import { handleError } from "../utils/error-handler";

export const formService = {
  validatePreApproval: async (data: CreditFormData) => {
    try {
      const response = await axiosInstance.post("/credits/validate", data);
      return response.data;
    } catch (error) {
      throw new Error(handleError(error));
    }
  },

  submitCreditForm: async (data: CreditFormData) => {
    try {
      const response = await axiosInstance.post("/credits/apply", data);
      return response.data;
    } catch (error) {
      throw new Error(handleError(error));
    }
  },
};
