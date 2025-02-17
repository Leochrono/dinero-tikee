import axios from "axios";
import { Tokens } from "../types/auth.types";
import { AUTH_TOKENS, API_URL } from "../constants/auth.constants";

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "Cache-Control": "no-cache",
    "X-Requested-With": "XMLHttpRequest",
  },
  timeout: 30000,
});

axiosInstance.interceptors.request.use(
  (config: any) => {
    const tokens = localStorage.getItem(AUTH_TOKENS);
    const authTokens: Tokens | null = tokens ? JSON.parse(tokens) : null;
    if (authTokens?.accessToken) {
      config.headers.Authorization = `Bearer ${authTokens.accessToken}`;
    }
    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    } else {
      config.headers["Content-Type"] = "application/json";
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.code === "ECONNABORTED" && !originalRequest._retry) {
      originalRequest._retry = true;
      return axiosInstance(originalRequest);
    }

    if (error.response?.status === 429) {
      const retryAfter = error.response.headers["retry-after"] || 2;
      await new Promise((resolve) => setTimeout(resolve, retryAfter * 1000));
      return axiosInstance(originalRequest);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      localStorage.removeItem(AUTH_TOKENS);
      if (!window.location.pathname.includes("/login")) {
        window.location.href = "/login";
      }
    }

    if (!error.response) {
      if (error.code === "ECONNABORTED") {
        error.message =
          "La solicitud está tomando demasiado tiempo. Por favor, inténtalo de nuevo.";
      } else {
        error.message =
          "Error de conexión. Por favor, verifica tu conexión a internet.";
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
