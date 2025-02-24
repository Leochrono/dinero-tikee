import { useState, useRef, useCallback, useEffect } from "react";
import { creditService } from "@/src/core/services/credit.service";
import { creditDocumentService } from "@/src/core/services/credit-document.service";
import { toast } from "react-hot-toast";
import { CreditFormData } from "@/src/core/types/types";
import {
  DocumentType,
  DocumentRequirement,
  FileData,
  UploadProgress,
  UploadedFiles,
} from "@/src/core/types/documents.types";

interface UseCreditDetailsProps {
  initialFormData: CreditFormData;
  institutionId: string;
  creditId: string;
  onApply: () => void;
  requirements: DocumentRequirement[];
}

export const useCreditDetails = ({
  initialFormData,
  institutionId,
  creditId,
  onApply,
  requirements,
}: UseCreditDetailsProps) => {
  const [institution, setInstitution] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadingError, setLoadingError] = useState<string | null>(null);
  const [institutionLoading, setInstitutionLoading] = useState(false);
  const [creditLoading, setCreditLoading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFiles>({});
  const [uploadProgress, setUploadProgress] = useState<UploadProgress>({});
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [currentDocType, setCurrentDocType] = useState<DocumentType | null>(
    null
  );

  const loadInstitutionDetails = useCallback(async () => {
    try {
      setInstitutionLoading(true);
      const response = await creditService.getDetails(creditId);

      if (response.success && response.data) {
        setInstitution(response.data.institution);

        // Cargar documentos existentes
        const docsResponse = await creditDocumentService.getDocuments(creditId);
        if (docsResponse.success && docsResponse.data) {
          const filesData: UploadedFiles = {};
          docsResponse.data.forEach((doc) => {
            filesData[doc.documentType] = {
              file: new File([], doc.fileName, { type: doc.fileType }),
              type: doc.fileType.startsWith("image/") ? "image" : "pdf",
              previewUrl: doc.fileUrl,
            };
          });
          setUploadedFiles(filesData);
        }
      }
    } catch (error: any) {
      setLoadingError(error.message || "Error al cargar los detalles");
      toast.error(error.message || "Error al cargar los detalles");
    } finally {
      setInstitutionLoading(false);
    }
  }, [creditId]);

  useEffect(() => {
    if (institutionId && creditId) {
      loadInstitutionDetails();
    }
  }, [institutionId, creditId, loadInstitutionDetails]);

  const handleUploadClick = useCallback((docType: DocumentType) => {
    setCurrentDocType(docType);
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, []);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile || !currentDocType) return;

    try {
      if (selectedFile.size > 5 * 1024 * 1024) {
        throw new Error("El archivo no debe superar los 5MB");
      }

      const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
      if (!allowedTypes.includes(selectedFile.type)) {
        throw new Error("Solo se permiten archivos PDF, JPG y PNG");
      }

      const fileType: "image" | "pdf" = selectedFile.type.startsWith("image/")
        ? "image"
        : "pdf";

      // Mostrar progreso
      setUploadProgress((prev) => ({
        ...prev,
        [currentDocType]: 0,
      }));

      // Almacenar el archivo temporalmente para mostrar vista previa
      const previewUrl =
        fileType === "image" ? URL.createObjectURL(selectedFile) : undefined;
      setUploadedFiles((prev) => ({
        ...prev,
        [currentDocType]: {
          file: selectedFile,
          type: fileType,
          previewUrl,
        },
      }));

      // Subir el archivo al servidor
      const response = await creditDocumentService.uploadDocument(
        creditId,
        currentDocType,
        selectedFile,
        (progress) => {
          setUploadProgress((prev) => ({
            ...prev,
            [currentDocType]: progress,
          }));
        }
      );

      if (response.success) {
        // Asegurar que data existe y hacer aserción de tipo
        const responseData = response.data;

        if (responseData) {
          toast.success("Documento subido exitosamente");

          setUploadedFiles((prev) => ({
            ...prev,
            [currentDocType]: {
              file: selectedFile,
              type: fileType,
              previewUrl:
                fileType === "image" ? responseData.fileUrl : undefined,
            },
          }));

          if (fileInputRef.current) {
            fileInputRef.current.value = "";
          }
        } else {
          throw new Error(
            "Error al subir el documento: no se recibieron datos"
          );
        }
      } else {
        throw new Error("Error al subir el documento");
      }
      
    } catch (error: any) {
      console.error("Error al subir archivo:", error);
      toast.error(error.message || "Error al subir el archivo");

      // Limpiar el progreso y el archivo temporal en caso de error
      setUploadProgress((prev) => {
        const newProgress = { ...prev };
        if (currentDocType) {
          delete newProgress[currentDocType];
        }
        return newProgress;
      });

      setUploadedFiles((prev) => {
        const newFiles = { ...prev };
        if (currentDocType && prev[currentDocType]?.previewUrl) {
          URL.revokeObjectURL(prev[currentDocType]!.previewUrl!);
          delete newFiles[currentDocType];
        }
        return newFiles;
      });
    } finally {
      // Resetear input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleDeleteFile = useCallback(
    async (documentType: DocumentType) => {
      try {
        // Primero encontrar el documento por tipo
        const docsResponse = await creditDocumentService.getDocuments(creditId);

        if (docsResponse.success && docsResponse.data) {
          const documentToDelete = docsResponse.data.find(
            (doc) => doc.documentType === documentType
          );

          if (documentToDelete) {
            await creditDocumentService.deleteDocument(
              creditId,
              documentToDelete.id
            );

            setUploadedFiles((prev) => {
              const newFiles = { ...prev };
              if (prev[documentType]?.previewUrl) {
                URL.revokeObjectURL(prev[documentType]!.previewUrl!);
              }
              delete newFiles[documentType];
              return newFiles;
            });

            setUploadProgress((prev) => {
              const newProgress = { ...prev };
              delete newProgress[documentType];
              return newProgress;
            });

            toast.success("Documento eliminado exitosamente");
          }
        }
      } catch (error: any) {
        console.error("Error al eliminar archivo:", error);
        toast.error(error.message || "Error al eliminar el archivo");
      }
    },
    [creditId]
  );

  const areAllFilesUploaded = useCallback(() => {
    return requirements.every((req) => uploadedFiles[req.type]);
  }, [requirements, uploadedFiles]);

  const handleApplyClick = useCallback(async () => {
    if (!areAllFilesUploaded()) {
      toast.error("Por favor, suba todos los documentos requeridos");
      return;
    }

    try {
      setIsSubmitting(true);
      await onApply();
    } catch (error) {
      console.error("Error al procesar solicitud:", error);
      toast.error("Error al procesar la solicitud");
    } finally {
      setIsSubmitting(false);
    }
  }, [areAllFilesUploaded, onApply]);

  return {
    institution,
    isSubmitting,
    loadingError,
    institutionLoading,
    creditLoading,
    handleApplyClick,
    uploadedFiles,
    uploadProgress,
    fileInputRef,
    handleUploadClick,
    handleFileChange,
    handleDeleteFile,
    areAllFilesUploaded,
  };
};

export default useCreditDetails;
