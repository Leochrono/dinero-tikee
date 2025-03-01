import axiosInstance from "../config/axios.config";
import { ApiResponse } from "../types/auth.types";
import {
  Institution,
  InstitutionType,
  InstitutionFilters,
} from "../types/institutions.types";

const LIMITS = {
  AMOUNT: { MIN: 500, MAX: 100000 },
  TERM: { MIN: 3, MAX: 72 },
};

class InstitutionServiceError extends Error {
  constructor(message: string, public code?: string) {
    super(message);
    this.name = "InstitutionServiceError";
  }
}

export const institutionService = {
  filterInstitutions: async (
    params: InstitutionFilters
  ): Promise<ApiResponse<Institution[]>> => {
    try {
      if (params.amount !== undefined) {
        if (
          params.amount < LIMITS.AMOUNT.MIN ||
          params.amount > LIMITS.AMOUNT.MAX
        ) {
          throw new InstitutionServiceError(
            `El monto debe estar entre $${LIMITS.AMOUNT.MIN} y $${LIMITS.AMOUNT.MAX}`,
            "INVALID_AMOUNT"
          );
        }
      }

      if (params.term !== undefined) {
        if (params.term < LIMITS.TERM.MIN || params.term > LIMITS.TERM.MAX) {
          throw new InstitutionServiceError(
            `El plazo debe estar entre ${LIMITS.TERM.MIN} y ${LIMITS.TERM.MAX} meses`,
            "INVALID_TERM"
          );
        }
      }
      const queryParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value.toString());
        }
      });

      const url = `/institutions/search?${queryParams.toString()}`;

      const response = await axiosInstance.get(url, {
        timeout: 10000,
        headers: {
          Accept: "application/json",
          "Cache-Control": "no-cache",
        },
      });

      if (!response?.data) {
        throw new InstitutionServiceError(
          "No se recibió respuesta del servidor",
          "NO_RESPONSE"
        );
      }

      if (!response.data.success) {
        throw new InstitutionServiceError(
          response.data.error || "Error al filtrar instituciones",
          "API_ERROR"
        );
      }

      const institutions = response.data.data || [];

      return {
        success: true,
        data: institutions,
      };
    } catch (error: any) {
      console.error("Service - Error en filterInstitutions:", {
        name: error.name,
        message: error.message,
        code: error.code,
        response: error.response?.data,
        status: error.response?.status,
      });

      if (error instanceof InstitutionServiceError) {
        throw error;
      }

      throw new InstitutionServiceError(
        error.response?.data?.message ||
          error.response?.data?.error ||
          error.message ||
          "Error al filtrar instituciones",
        "UNKNOWN_ERROR"
      );
    }
  },

  findBestRates: async (
    amount: number,
    term: number,
    rateFilter?: "min" | "max"
  ): Promise<ApiResponse<Institution[]>> => {
    try {
      if (amount < LIMITS.AMOUNT.MIN || amount > LIMITS.AMOUNT.MAX) {
        throw new InstitutionServiceError(
          `El monto debe estar entre $${LIMITS.AMOUNT.MIN} y $${LIMITS.AMOUNT.MAX}`,
          "INVALID_AMOUNT"
        );
      }

      if (term < LIMITS.TERM.MIN || term > LIMITS.TERM.MAX) {
        throw new InstitutionServiceError(
          `El plazo debe estar entre ${LIMITS.TERM.MIN} y ${LIMITS.TERM.MAX} meses`,
          "INVALID_TERM"
        );
      }

      const queryParams = new URLSearchParams({
        amount: amount.toString(),
        term: term.toString(),
        ...(rateFilter && { rateFilter }),
      });

      const url = `/institutions/best-rates?${queryParams}`;

      const response = await axiosInstance.get(url, {
        timeout: 10000,
        headers: {
          Accept: "application/json",
          "Cache-Control": "no-cache",
        },
      });

      if (!response?.data) {
        throw new InstitutionServiceError(
          "No se recibió respuesta del servidor",
          "NO_RESPONSE"
        );
      }

      if (!response.data.success) {
        throw new InstitutionServiceError(
          response.data.error || "Error al obtener mejores tasas",
          "API_ERROR"
        );
      }

      const institutions = response.data.data || [];

      return {
        success: true,
        data: institutions,
      };
    } catch (error: any) {
      console.error("Service - Error en findBestRates:", {
        name: error.name,
        message: error.message,
        code: error.code,
        response: error.response?.data,
        status: error.response?.status,
      });

      if (error instanceof InstitutionServiceError) {
        throw error;
      }

      throw new InstitutionServiceError(
        error.response?.data?.message ||
          error.response?.data?.error ||
          error.message ||
          "Error al obtener mejores tasas",
        "UNKNOWN_ERROR"
      );
    }
  },
  getOne: async (id: string): Promise<ApiResponse<Institution>> => {
    try {
      if (!id) {
        throw new Error("ID de institución requerido");
      }

      const response = await axiosInstance.get<ApiResponse<Institution>>(
        `/institutions/${id}`
      );

      return response.data;
    } catch (error: any) {
      console.error("Service - Error en getOne:", {
        id,
        error: error.message,
        response: error.response?.data,
      });
      throw new Error(error.response?.data?.message || error.message);
    }
  },
};
