import { useState, useRef, useCallback, useEffect } from 'react';
import { creditService } from '@/src/core/services/credit.service';
import { creditDocumentService } from '@/src/core/services/credit-document.service';
import { toast } from 'react-hot-toast';
import { CreditFormData } from '@/src/core/types/types';
import { 
  DocumentType, 
  DocumentRequirement,
  FileData,
  UploadProgress,
  UploadedFiles,
} from '@/src/core/types/documents.types';

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
  requirements
}: UseCreditDetailsProps) => {
  const [institution, setInstitution] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadingError, setLoadingError] = useState<string | null>(null);
  const [institutionLoading, setInstitutionLoading] = useState(false);
  const [creditLoading, setCreditLoading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFiles>({});
  const [uploadProgress, setUploadProgress] = useState<UploadProgress>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadInstitutionDetails = useCallback(async () => {
    try {
      setInstitutionLoading(true);
      const response = await creditService.getDetails(creditId);
      if (response.success && response.data) {
        setInstitution(response.data.institution);
        
        const docsResponse = await creditDocumentService.getDocuments(creditId);
        if (docsResponse.success && docsResponse.data) {
          const filesData: UploadedFiles = {};
          docsResponse.data.forEach(doc => {
            filesData[doc.documentType] = {
              file: new File([], doc.fileName, { type: doc.fileType }),
              type: doc.fileType.startsWith('image/') ? 'image' : 'pdf',
              previewUrl: doc.fileUrl
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

  const handleUploadClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;

    try {
      if (selectedFile.size > 5 * 1024 * 1024) {
        throw new Error("El archivo no debe superar los 5MB");
      }

      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
      if (!allowedTypes.includes(selectedFile.type)) {
        throw new Error("Solo se permiten archivos PDF, JPG y PNG");
      }

      const currentRequirement = requirements[Object.keys(uploadedFiles).length];
      if (!currentRequirement) return;

      const fileType: 'image' | 'pdf' = selectedFile.type.startsWith('image/') ? 'image' : 'pdf';

      setUploadProgress((prev) => ({ 
        ...prev, 
        [currentRequirement.id]: 0 
      }));

      const response = await creditDocumentService.uploadDocument(
        creditId,
        currentRequirement.type,
        selectedFile,
        (progress) => {
          setUploadProgress((prev) => ({ 
            ...prev, 
            [currentRequirement.id]: progress 
          }));
        }
      );

      if (response.success) {
        setUploadedFiles((prev) => ({
          ...prev,
          [currentRequirement.id]: {
            file: selectedFile,
            type: fileType,
            previewUrl: fileType === 'image' ? URL.createObjectURL(selectedFile) : undefined
          }
        }));
        toast.success("Documento subido exitosamente");
        
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
    } catch (error: any) {
      console.error('Error al subir archivo:', error);
      toast.error(error.message || "Error al subir el archivo");
      
      setUploadProgress((prev) => {
        const newProgress = { ...prev };
        const currentRequirement = requirements[Object.keys(uploadedFiles).length];
        if (currentRequirement) {
          delete newProgress[currentRequirement.id];
        }
        return newProgress;
      });
    }
  };

  const handleDeleteFile = useCallback(async (documentId: string) => {
    try {
      await creditDocumentService.deleteDocument(creditId, documentId);
      
      setUploadedFiles((prev) => {
        const newFiles = { ...prev };
        delete newFiles[documentId];
        return newFiles;
      });
      
      setUploadProgress((prev) => {
        const newProgress = { ...prev };
        delete newProgress[documentId];
        return newProgress;
      });
      
      toast.success("Documento eliminado exitosamente");
    } catch (error: any) {
      console.error('Error al eliminar archivo:', error);
      toast.error(error.message || "Error al eliminar el archivo");
    }
  }, [creditId]);

  const areAllFilesUploaded = useCallback(() => {
    return Object.keys(uploadedFiles).length === requirements.length;
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

  useEffect(() => {
    setUploadedFiles({});
    setUploadProgress({});
    setLoadingError(null);
  }, [creditId]);

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