export const handleError = (error: any): string => {
  if (error.response) {
    const { status, data } = error.response;

    if (status === 401) {
      return "Sesión expirada, por favor inicie sesión nuevamente";
    }

    if (status === 404) {
      return "El recurso solicitado no fue encontrado";
    }

    if (data?.message) {
      return data.message;
    }

    if (data?.error) {
      return data.error;
    }

    return `Error ${status}: ${data?.message || "Error en la solicitud"}`;
  }

  if (error.request) {
    return "Error de conexión con el servidor";
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Error inesperado";
};
