import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { creditService } from "../../services/credit.service";
import { useGlobalAuth } from "@/src/core/context/authContext";
import { routesWebpage } from "@/components/contants/routes";
import { toast } from "react-hot-toast";
import { 
  CreateCreditDTO, 
  CreditHookReturn, 
  CreditResponse, 
  DocumentType,
  DocumentResponseDto 
} from "../../types/credit.types";
import { ApiResponse } from "../../types/auth.types";

export const useCredit = (
  _userEmail: string = "",
  _userDocument: string = ""
): CreditHookReturn => {
  const navigate = useNavigate();
  const { isAuthenticated } = useGlobalAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [creditId, setCreditId] = useState<string>("");
  const [status, setStatus] = useState<string>("PENDING");
  const [selectedInstitutionId, setSelectedInstitutionId] = useState<string>("");
  const [currentFormData, setCurrentFormData] = useState<CreateCreditDTO | null>(null);

  // Primero definimos updateCredit ya que otras funciones la utilizan
  const updateCredit = useCallback(
    async (
      creditId: string,
      updateData: { institutionId?: string; status?: string }
    ): Promise<ApiResponse<CreditResponse>> => {
      if (!isAuthenticated) {
        throw new Error("Debe iniciar sesión para continuar");
      }
      if (!creditId) {
        throw new Error("ID del crédito no proporcionado");
      }

      try {
        console.log('Iniciando actualización del crédito:', {
          creditId,
          updateData
        });

        setLoading(true);
        const response = await creditService.update(creditId, updateData);

        if (!response?.success) {
          console.error('Error en la respuesta:', response);
          throw new Error(response?.error || "Error al actualizar el crédito");
        }

        toast.success("Crédito actualizado exitosamente");
        return response;
      } catch (error: any) {
        console.error('Error completo en updateCredit:', error);
        const errorMessage = error.response?.data?.message || error.message;
        toast.error(errorMessage);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [isAuthenticated]
  );

  const createCredit = useCallback(
    async (creditData: CreateCreditDTO): Promise<ApiResponse<CreditResponse>> => {
      if (!isAuthenticated) {
        throw new Error("Debe iniciar sesión para continuar");
      }

      try {
        setLoading(true);

        setCurrentFormData(creditData);
        localStorage.setItem('creditFormData', JSON.stringify(creditData));

        const response = await creditService.create(creditData);

        if (!response?.success || !response?.data) {
          console.error('Error en la respuesta:', response);
          throw new Error("Error al crear el crédito");
        }

        return response;
      } catch (error: any) {
        console.error('Error en createCredit:', error);
        const errorMessage = error.response?.data?.message || error.message;
        setError(errorMessage);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [isAuthenticated]
  );

  const uploadDocument = useCallback(
    async (
      creditId: string,
      documentType: DocumentType,
      file: File,
      onProgress?: (progress: number) => void
    ): Promise<DocumentResponseDto> => {
      if (!isAuthenticated) {
        throw new Error("USER_NOT_AUTHENTICATED");
      }
      try {
        setLoading(true);
        const response = await creditService.uploadDocument(
          creditId,
          documentType,
          file,
          onProgress
        );
        if (!response?.success || !response?.data) {
          throw new Error("Error al subir el documento");
        }
        toast.success("Documento subido exitosamente");
        return response.data;
      } catch (error: any) {
        toast.error(error.message);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [isAuthenticated]
  );

  const searchCredits = useCallback(
    async (params: {
      amount: number;
      term: number;
      income: number;
      type?: "bank" | "cooperative";
    }): Promise<ApiResponse<CreditResponse[]>> => {
      try {
        setLoading(true);
        const response = await creditService.search(params);
        if (!response?.success) {
          throw new Error("Error en la búsqueda de créditos");
        }
        return response;
      } catch (error: any) {
        setError(error.message);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const getDetails = useCallback(
    async (creditId: string): Promise<ApiResponse<CreditResponse>> => {
      if (!isAuthenticated) {
        throw new Error("USER_NOT_AUTHENTICATED");
      }
      try {
        setLoading(true);
        const response = await creditService.getDetails(creditId);
        if (!response?.success) {
          throw new Error("Error al obtener detalles del crédito");
        }
        return response;
      } catch (error: any) {
        setError(error.message);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [isAuthenticated]
  );

  const handleFormSubmit = useCallback(
    async (creditData: CreateCreditDTO) => {
      try {
        setLoading(true);
        if (!isAuthenticated) {
          localStorage.setItem('creditFormData', JSON.stringify(creditData));
          setCurrentFormData(creditData);
          navigate(routesWebpage.login, {
            state: { from: routesWebpage.creditoForm }
          });
          return;
        }

        const response = await createCredit(creditData);

        if (response.success && response.data) {
          const newCreditId = response.data.id;
          setCreditId(newCreditId);
          setStatus("PENDING");
          setCurrentFormData(creditData);
          localStorage.setItem("currentCreditId", newCreditId);
          localStorage.setItem('creditFormData', JSON.stringify(creditData));
          
          toast.success("Solicitud creada exitosamente");
          navigate(routesWebpage.creditoResults);
        }
      } catch (error: any) {
        console.error('Error en handleFormSubmit:', error);
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    },
    [createCredit, navigate, isAuthenticated]
  );

  const handleOptionSelect = useCallback(
    async (institutionId: string) => {
      try {
        setLoading(true);

        const storedCreditId = localStorage.getItem('currentCreditId');
        if (!storedCreditId) {
          throw new Error("No hay un crédito activo");
        }

        // Guardar datos antes de la actualización
        const selectedInstitution = institutionId;
        localStorage.setItem('selectedInstitutionId', selectedInstitution);

        const response = await updateCredit(storedCreditId, {
          institutionId: selectedInstitution,
          status: "INSTITUTION_SELECTED"
        });

        if (response.success) {
          setSelectedInstitutionId(selectedInstitution);
          setStatus("INSTITUTION_SELECTED");
          setCreditId(storedCreditId);

          // Pequeño delay antes de navegar
          await new Promise(resolve => setTimeout(resolve, 200));
          navigate(routesWebpage.creditoDetails);
        }
      } catch (error: any) {
        console.error('Error en handleOptionSelect:', error);
        toast.error(error.message);
        // Limpiar datos si hay error
        localStorage.removeItem('selectedInstitutionId');
      } finally {
        setLoading(false);
      }
    },
    [updateCredit, navigate]
  );

  const handleBack = useCallback(() => {
    const currentPath = window.location.pathname;
    if (currentPath === routesWebpage.creditoResults) {
      navigate(routesWebpage.creditoForm);
    } else if (currentPath === routesWebpage.creditoDetails) {
      navigate(routesWebpage.creditoResults);
    }
  }, [navigate]);

  const handleApply = useCallback(async () => {
    try {
      setLoading(true);
      if (creditId) {
        const response = await updateCredit(creditId, { status: 'DOCUMENTS_SUBMITTED' });
        if (response.success) {
          setStatus('DOCUMENTS_SUBMITTED');
          navigate(routesWebpage.creditoSuccess);
          toast.success('Solicitud enviada exitosamente');
        }
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }, [creditId, updateCredit, navigate]);

  const handleNewSearch = useCallback(() => {
    setCreditId("");
    setStatus("PENDING");
    setSelectedInstitutionId("");
    setCurrentFormData(null);
    setError(null);
    localStorage.removeItem('currentCreditId');
    localStorage.removeItem('creditFormData');
    navigate(routesWebpage.creditoForm);
  }, [navigate]);

  const uploadCreditFiles = useCallback(
    async (
      creditId: string,
      formData: FormData,
      onProgress?: (progress: number) => void
    ): Promise<ApiResponse<DocumentResponseDto>> => {
      if (!isAuthenticated) {
        throw new Error("USER_NOT_AUTHENTICATED");
      }
      try {
        setLoading(true);
        const response = await creditService.uploadCreditFiles(
          creditId,
          formData,
          onProgress
        );
        if (!response?.success) {
          throw new Error("Error al subir los archivos");
        }
        toast.success("Archivos subidos exitosamente");
        return response;
      } catch (error: any) {
        toast.error(error.message);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [isAuthenticated]
  );

  const updateStatus = useCallback(
    async (creditId: string, status: string): Promise<ApiResponse<CreditResponse>> => {
      if (!isAuthenticated) {
        throw new Error("USER_NOT_AUTHENTICATED");
      }
      try {
        setLoading(true);
        const response = await creditService.updateStatus(creditId, status);
        if (!response?.success) {
          throw new Error("Error al actualizar el estado");
        }
        return response;
      } catch (error: any) {
        setError(error.message);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [isAuthenticated]
  );

  const loadStoredFormData = useCallback(() => {
    const storedData = localStorage.getItem('creditFormData');
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        setCurrentFormData(parsedData);
      } catch (e) {
        console.error('Error al cargar datos del formulario:', e);
      }
    }
  }, []);

  if (!currentFormData) {
    loadStoredFormData();
  }

  return {
    loading,
    error,
    creditId,
    status,
    createCredit,
    uploadDocument,
    uploadCreditFiles,
    updateStatus,
    searchCredits,
    getDetails,
    updateCredit,
    setError,
    contextValue: {
      formData: currentFormData || {
        email: _userEmail,
        document: _userDocument,
        ...JSON.parse(localStorage.getItem('creditFormData') || '{}')
      },
      loading,
      error,
      creditId,
      onSubmit: handleFormSubmit,
      onSelect: handleOptionSelect,
      onBack: handleBack,
      onApply: handleApply,
      onNewSearch: handleNewSearch,
      selectedInstitutionId
    }
  };
};