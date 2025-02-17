import axiosInstance from "../config/axios.config";
import { ApiResponse } from "../types/auth.types";
import {
  CreateCreditDTO,
  CreditDocument,
  CreditResponse,
  DocumentResponseDto,
  VerifyDocumentDto,
  DocumentType,
} from "../types/credit.types";
import { handleError } from "../utils/error-handler";

export const creditService = {
  create: async (
    creditData: CreateCreditDTO
  ): Promise<ApiResponse<CreditResponse>> => {
    try {
      if (
        !creditData.amount ||
        !creditData.term ||
        !creditData.income ||
        !creditData.location ||
        !creditData.email ||
        !creditData.document
      ) {
        throw new Error("Todos los campos son requeridos");
      }

      const response = await axiosInstance.post("/credits", creditData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response?.data) {
        throw new Error("No se recibió respuesta del servidor");
      }

      return {
        success: true,
        data: response.data,
      };
    } catch (error: any) {
      console.error("Error en create:", error);
      if (error.response?.status === 401) {
        throw new Error("Sesión expirada, por favor inicie sesión nuevamente");
      }
      throw new Error(
        error.response?.data?.message ||
          error.message ||
          "Error al crear el crédito"
      );
    }
  },

  update: async (
    creditId: string,
    updateData: { institutionId?: string; status?: string }
  ): Promise<ApiResponse<CreditResponse>> => {
    try {
      if (!creditId) {
        throw new Error("ID de crédito requerido");
      }
      if (!updateData.status && !updateData.institutionId) {
        throw new Error("Se requiere status o institutionId para actualizar");
      }

      const response = await axiosInstance.post(
        `/credits/${creditId}/status`,
        {
          status: updateData.status,
          institutionId: updateData.institutionId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          timeout: 10000,
        }
      );

      if (!response?.data?.success) {
        throw new Error(
          response?.data?.error || "Error al actualizar el crédito"
        );
      }

      return response.data;
    } catch (error: any) {
      console.error("Error detallado en update:", {
        message: error.message,
        responseData: error.response?.data,
        status: error.response?.status,
        error: error,
      });

      if (error.response?.status === 401) {
        throw new Error("Sesión expirada, por favor inicie sesión nuevamente");
      }

      throw new Error(
        error.response?.data?.message ||
          error.message ||
          "Error al actualizar el crédito"
      );
    }
  },

  updateStatus: async (
    creditId: string,
    status: string
  ): Promise<ApiResponse<CreditResponse>> => {
    try {
      if (!creditId) {
        throw new Error("ID de crédito requerido");
      }

      const response = await axiosInstance.post(`/credits/${creditId}/status`, {
        status: status,
      });

      if (!response?.data?.success) {
        throw new Error(
          response?.data?.error || "Error al actualizar el estado"
        );
      }

      return response.data;
    } catch (error: any) {
      console.error("Error detallado en updateStatus:", error);
      throw new Error(error.message || "Error al actualizar el crédito");
    }
  },

  getDetails: async (
    creditId: string
  ): Promise<ApiResponse<CreditResponse>> => {
    try {
      if (!creditId) {
        throw new Error("ID de crédito requerido");
      }

      const response = await axiosInstance.get(`/credits/${creditId}/details`);

      if (!response?.data?.success) {
        throw new Error(response?.data?.error || "Error al obtener detalles");
      }

      return response.data;
    } catch (error: any) {
      console.error("Error en getDetails:", error);
      throw new Error(handleError(error));
    }
  },

  search: async (params: {
    amount: number;
    term: number;
    income: number;
    type?: "bank" | "cooperative";
  }): Promise<ApiResponse<CreditResponse[]>> => {
    try {
      if (!params.amount || !params.term || !params.income) {
        throw new Error("Monto, plazo e ingresos son requeridos");
      }

      const response = await axiosInstance.get("/credits/search", {
        params,
        headers: {
          Accept: "application/json",
        },
      });

      if (!response?.data?.success) {
        throw new Error(response?.data?.error || "Error en la búsqueda");
      }

      return response.data;
    } catch (error: any) {
      console.error("Error en search:", error);
      throw new Error(handleError(error));
    }
  },

  getUserCredits: async (): Promise<ApiResponse<CreditResponse[]>> => {
    try {
      const response = await axiosInstance.get("/credits/user-credits");

      if (!response?.data?.success) {
        throw new Error(response?.data?.error || "Error al obtener créditos");
      }

      return response.data;
    } catch (error: any) {
      console.error("Error en getUserCredits:", error);
      throw new Error(handleError(error));
    }
  },

  uploadDocument: async (
    creditId: string,
    documentType: DocumentType,
    file: File,
    onProgress?: (progress: number) => void
  ): Promise<ApiResponse<DocumentResponseDto>> => {
    try {
      if (!creditId || !documentType || !file) {
        throw new Error("Todos los campos son requeridos");
      }

      const formData = new FormData();
      formData.append("file", file);
      formData.append("documentType", documentType);

      const response = await axiosInstance.post(
        `/credits/${creditId}/documents/upload`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: (progressEvent) => {
            if (onProgress && progressEvent.total) {
              const progress = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              onProgress(Math.min(progress, 100));
            }
          },
        }
      );

      if (!response?.data?.success) {
        throw new Error(response?.data?.error || "Error al subir documento");
      }

      return response.data;
    } catch (error: any) {
      console.error("Error en uploadDocument:", error);
      throw new Error(handleError(error));
    }
  },

  getDocuments: async (
    creditId: string
  ): Promise<ApiResponse<CreditDocument[]>> => {
    try {
      if (!creditId) {
        throw new Error("ID de crédito requerido");
      }

      const response = await axiosInstance.get(
        `/credits/${creditId}/documents`
      );

      if (!response?.data?.success) {
        throw new Error(response?.data?.error || "Error al obtener documentos");
      }

      return response.data;
    } catch (error: any) {
      console.error("Error en getDocuments:", error);
      throw new Error(handleError(error));
    }
  },

  verifyDocument: async (
    creditId: string,
    documentId: string,
    verifyData: VerifyDocumentDto
  ): Promise<ApiResponse<DocumentResponseDto>> => {
    try {
      if (!creditId || !documentId) {
        throw new Error("ID de crédito y documento requeridos");
      }

      const response = await axiosInstance.post(
        `/credits/${creditId}/documents/${documentId}/verify`,
        verifyData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response?.data?.success) {
        throw new Error(
          response?.data?.error || "Error al verificar documento"
        );
      }

      return response.data;
    } catch (error: any) {
      console.error("Error en verifyDocument:", error);
      throw new Error(handleError(error));
    }
  },

  uploadCreditFiles: async (
    creditId: string,
    formData: FormData,
    onProgress?: (progress: number) => void
  ): Promise<ApiResponse<DocumentResponseDto>> => {
    try {
      if (!creditId || !formData) {
        throw new Error("ID de crédito y archivos son requeridos");
      }
      const file = formData.get("file") as File;
      const documentType = formData.get("documentType");

      if (!file || !documentType) {
        throw new Error("Archivo y tipo de documento son requeridos");
      }
      const newFormData = new FormData();
      newFormData.append("file", file, file.name);
      newFormData.append("documentType", documentType.toString());
      const response = await axiosInstance.post(
        `/credits/${creditId}/documents/upload`,
        newFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            if (onProgress && progressEvent.total) {
              const progress = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              onProgress(Math.min(progress, 100));
            }
          },
          timeout: 30000,
          validateStatus: (status) => status < 500,
        }
      );

      if (!response?.data?.success) {
        throw new Error(response?.data?.message || "Error al subir el archivo");
      }

      return response.data;
    } catch (error: any) {
      console.error("Error en uploadCreditFiles:", error);
      throw new Error(error.response?.data?.message || error.message);
    }
  },
};
