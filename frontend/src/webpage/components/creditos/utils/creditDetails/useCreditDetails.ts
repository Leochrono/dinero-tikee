import { useState, useEffect, useCallback } from "react";
import { toast } from "react-hot-toast";
import { useGlobalAuth } from "@/src/core/context/authContext";
import { useInstitution } from "@/src/core/hooks/api/use-institution";
import { useCredit } from "@/src/core/hooks/api/use-credit";
import { CreditFormData, Institution } from "@/src/core/types/types";
import { CREDIT_STATUS } from "./constants";
import { useFileUpload } from "./useFileUpload";

interface UseCreditDetailsParams {
  initialFormData: CreditFormData;
  institutionId: string;
  creditId: string;
  onApply: () => void;
  requirements: Array<{
    id: string;
    accept: string;
    maxSize: number;
  }>;
}

export const useCreditDetails = ({
  initialFormData,
  institutionId,
  creditId,
  onApply,
  requirements,
}: UseCreditDetailsParams) => {
  const { isAuthenticated } = useGlobalAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [institution, setInstitution] = useState<Institution | null>(null);
  const [loadingError, setLoadingError] = useState<string | null>(null);

  const {
    uploadCreditFiles,
    updateStatus,
    loading: creditLoading,
  } = useCredit();

  const { getInstitution, loading: institutionLoading } = useInstitution();

  const fileUploadHook = useFileUpload({ requirements });

  useEffect(() => {
    let mounted = true;
    const storedId = localStorage.getItem("selectedInstitutionId");
    const finalId = storedId || institutionId;

    if (!finalId) {
      setLoadingError("No se encontró ID de institución");
      return;
    }

    const loadInstitution = async () => {
      try {
        const fetchedInstitution = await getInstitution(finalId);
        if (mounted && fetchedInstitution) {
          setInstitution(fetchedInstitution);
          setLoadingError(null);
        }
      } catch (error: any) {
        if (mounted) {
          const errorMessage =
            error.message || "Error al cargar los datos de la institución";
          setLoadingError(errorMessage);
          toast.error(errorMessage);
        }
      }
    };

    loadInstitution();
    return () => {
      mounted = false;
    };
  }, [institutionId, getInstitution]);

  const handleApplyClick = useCallback(async () => {
    if (!isAuthenticated) {
      toast.error("Debes iniciar sesión para continuar");
      return;
    }

    const currentCreditId = creditId || localStorage.getItem("currentCreditId");
    if (!currentCreditId) {
      toast.error("No se encontró el ID del crédito");
      return;
    }

    if (isSubmitting) return;

    try {
      setIsSubmitting(true);

      const files = Object.entries(fileUploadHook.uploadedFiles)
        .filter(([_, fileData]) => fileData?.file)
        .map(([key, fileData]) => {
          const formData = new FormData();
          formData.append("documentType", key);
          formData.append("file", fileData!.file);
          return { key, formData };
        });

      for (const { key, formData } of files) {
        const response = await uploadCreditFiles(currentCreditId, formData);
        if (!response.success) {
          throw new Error(`Error al subir el archivo ${key}`);
        }
      }

      const updateResponse = await updateStatus(
        currentCreditId,
        CREDIT_STATUS.DOCUMENTS_SUBMITTED
      );

      if (updateResponse.success) {
        toast.success("Documentos subidos exitosamente");
        onApply();
      }
    } catch (error: any) {
      toast.error(error.message || "Error al procesar la solicitud");
    } finally {
      setIsSubmitting(false);
    }
  }, [
    isAuthenticated,
    creditId,
    fileUploadHook.uploadedFiles,
    uploadCreditFiles,
    updateStatus,
    onApply,
    isSubmitting,
  ]);

  return {
    institution,
    isSubmitting,
    loadingError,
    institutionLoading,
    creditLoading,
    handleApplyClick,
    ...fileUploadHook,
  };
};
