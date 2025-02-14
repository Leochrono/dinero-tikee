import { useState, useEffect, useRef, useCallback } from "react";
import { Box, Typography, Button, useTheme } from "@mui/material";
import { CreditFormData, Institution } from "@/components/creditos/utils/types";
import { useInstitution } from "@/src/core/hooks/api/use-institution";
import LoadingResults from "../../components/shared/loadingResults";
import ErrorMessage from "../../components/shared/errorMessage";
import { useCredit } from "@/src/core/hooks/api/use-credit";
import { useGlobalAuth } from "@/src/core/context/authContext";
import { toast } from "react-hot-toast";
import {
  DetailsContainer,
  Header,
  BankLogo,
  InfoGrid,
  InfoItem,
  LabelText,
  Value,
  RequirementContainer,
  RequirementButton,
  ApplyButton,
  FilePreview,
  FileDetails,
  FileInfo,
  DeleteButton,
  PreviewContainer,
  ImagePreview,
  PDFIcon,
  ProgressBar,
} from "./styles/creditDetailConst";

interface CreditDetailsProps {
  formData: CreditFormData;
  onBack: () => void;
  onApply: () => void;
  institutionId: string;
  creditId: string;
}

interface UploadProgress {
  [key: string]: number;
}

interface FileData {
  file: File;
  type: "image" | "pdf";
  previewUrl?: string;
}

type UploadedFiles = Record<string, FileData | null>;

const requirements = [
  {
    id: "id",
    name: "Documento de identidad",
    accept: ".jpg,.jpeg,.png,.pdf",
    maxSize: 5 * 1024 * 1024,
  },
  {
    id: "payroll",
    name: "Roles de pago",
    accept: ".jpg,.jpeg,.png,.pdf",
    maxSize: 5 * 1024 * 1024,
  },
  {
    id: "services",
    name: "Factura Servicios Básicos",
    accept: ".jpg,.jpeg,.png,.pdf",
    maxSize: 5 * 1024 * 1024,
  },
];

const CreditDetails = ({
  formData: initialFormData,
  onBack,
  onApply,
  institutionId,
  creditId,
}: CreditDetailsProps) => {
  const theme = useTheme();
  const { isAuthenticated } = useGlobalAuth();
  const [uploadProgress, setUploadProgress] = useState<UploadProgress>({});
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFiles>({});
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [currentReqId, setCurrentReqId] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [institution, setInstitution] = useState<Institution | null>(null);
  const [loadingError, setLoadingError] = useState<string | null>(null);

  const {
    uploadCreditFiles,
    updateStatus,
    loading: creditLoading,
    error: creditError,
  } = useCredit();

  const {
    getInstitution,
    loading: institutionLoading,
    error: institutionError,
  } = useInstitution();

// Verificar creditId al montar el componente
useEffect(() => {
  const storedCreditId = localStorage.getItem('currentCreditId');
  console.log('Verificando creditId:', {
    propCreditId: creditId,
    storedCreditId,
    institutionId
  });

  if (!creditId && !storedCreditId) {
    setLoadingError('No se encontró información del crédito');
  }
}, [creditId]);

useEffect(() => {
  const loadInstitution = async () => {
    try {
      console.log('Intentando cargar institución con ID:', institutionId);
      
      // Obtener el ID desde localStorage como respaldo
      const storedId = localStorage.getItem('selectedInstitutionId');
      const finalId = storedId || institutionId;

      if (!finalId) {
        throw new Error('No se encontró ID de institución');
      }

      const institution = await getInstitution(finalId);
      console.log('Institución obtenida:', institution);

      if (institution) {
        setInstitution(institution);
        setLoadingError(null);
      } else {
        throw new Error('No se pudo cargar la información de la institución');
      }
    } catch (error: any) {
      console.error('Error cargando institución:', error);
      setLoadingError(error.message || 'Error al cargar los datos de la institución');
      toast.error(error.message || 'Error al cargar los datos de la institución');
    }
  };

  loadInstitution();
}, [institutionId, getInstitution]);

  // Limpiar URLs de previsualización al desmontar
  useEffect(() => {
    return () => {
      Object.values(uploadedFiles).forEach((fileData) => {
        if (fileData?.previewUrl) {
          URL.revokeObjectURL(fileData.previewUrl);
        }
      });
    };
  }, [uploadedFiles]);

  const validateFileType = (file: File): "image" | "pdf" | null => {
    if (file.type.startsWith("image/")) return "image";
    if (file.type === "application/pdf") return "pdf";
    return null;
  };

  const calculateMonthlyPayment = useCallback((
    amount: number,
    rate: number,
    term: number
  ) => {
    const monthlyRate = rate / 12 / 100;
    return (
      (amount * monthlyRate * Math.pow(1 + monthlyRate, term)) /
      (Math.pow(1 + monthlyRate, term) - 1)
    );
  }, []);

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      const fileType = validateFileType(file);
      const requirement = requirements.find((req) => req.id === currentReqId);
      if (!requirement) return;

      if (!fileType) {
        toast.error(
          "Solo se permiten imágenes (JPG, JPEG, PNG) o archivos PDF"
        );
        if (event.target) event.target.value = "";
        return;
      }

      if (file.size > requirement.maxSize) {
        toast.error("El archivo es demasiado grande. Máximo 5MB");
        if (event.target) event.target.value = "";
        return;
      }

      const previewUrl =
        fileType === "image" ? URL.createObjectURL(file) : undefined;
      setUploadedFiles((prev) => ({
        ...prev,
        [currentReqId]: { file, type: fileType, previewUrl },
      }));

      if (event.target) event.target.value = "";
    },
    [currentReqId]
  );

  const handleUploadClick = useCallback((reqId: string) => {
    setCurrentReqId(reqId);
    setTimeout(() => {
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    }, 0);
  }, []);

  const handleDeleteFile = useCallback((reqId: string) => {
    setUploadedFiles((prev) => {
      const fileData = prev[reqId];
      if (fileData?.previewUrl) {
        URL.revokeObjectURL(fileData.previewUrl);
      }
      return { ...prev, [reqId]: null };
    });
    setUploadProgress((prev) => ({
      ...prev,
      [reqId]: 0,
    }));
  }, []);

  const handleApplyClick = async () => {
    if (!isAuthenticated) {
      toast.error("Debes iniciar sesión para continuar");
      return;
    }
  
    const currentCreditId = creditId || localStorage.getItem('currentCreditId');
    if (!currentCreditId) {
      toast.error("No se encontró el ID del crédito");
      return;
    }
  
    try {
      setIsSubmitting(true);
      
      for (const [key, fileData] of Object.entries(uploadedFiles)) {
        if (fileData?.file) {
          const formData = new FormData();
          
          console.log(`Preparando archivo ${key}:`, {
            name: fileData.file.name,
            type: fileData.file.type,
            size: fileData.file.size
          });
  
          // Asegúrate de que el orden sea correcto
          formData.append('documentType', key);
          formData.append('file', fileData.file);
  
          try {
            const response = await uploadCreditFiles(
              currentCreditId, 
              formData,
              (progress) => {
                setUploadProgress(prev => ({
                  ...prev,
                  [key]: progress
                }));
              }
            );
  
            console.log(`Respuesta para archivo ${key}:`, response);
  
            if (!response.success) {
              throw new Error(`Error al subir el archivo ${key}`);
            }
          } catch (uploadError) {
            console.error(`Error subiendo archivo ${key}:`, uploadError);
            throw uploadError;
          }
        }
      }
  
      // Solo actualizar el estado si todos los archivos se subieron correctamente
      const updateResponse = await updateStatus(currentCreditId, "DOCUMENTS_SUBMITTED");
      if (updateResponse.success) {
        toast.success("Documentos subidos exitosamente");
        onApply();
      }
    } catch (error: any) {
      console.error("Error en el proceso:", error);
      toast.error(error.message || "Error al procesar la solicitud");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Validaciones de carga y error
  if (institutionLoading || creditLoading) {
    return <LoadingResults />;
  }

  if (loadingError) {
    return (
      <ErrorMessage 
        message={loadingError} 
        onRetry={() => window.location.reload()} 
      />
    );
  }

  if (!institution) {
    return <LoadingResults />;
  }

  const monthlyPayment = calculateMonthlyPayment(
    initialFormData.amount,
    institution.products.personalLoan.minRate,
    initialFormData.term
  );
  const totalPayment = monthlyPayment * initialFormData.term;

  return (
    <DetailsContainer>
      <Box
        sx={{
          mb: 2,
          [theme.breakpoints.down("md")]: {
            display: "flex",
            justifyContent: "center",
          },
        }}
      >
        <Button
          onClick={onBack}
          variant="outlined"
          color="primary"
          sx={{
            [theme.breakpoints.down("md")]: {
              width: "100%",
              maxWidth: "200px",
            },
          }}
        >
          Volver
        </Button>
      </Box>

      <Header>
        <Box>
          <Typography
            variant="h4"
            color="white"
            gutterBottom
            sx={{ fontSize: { xs: "24px", md: "34px" } }}
          >
            Préstamo {institution.name}
          </Typography>
          <Typography
            color="white"
            sx={{ fontSize: { xs: "14px", md: "16px" } }}
          >
            Monto: ${initialFormData.amount.toLocaleString()}
            <br />
            Plazo: {initialFormData.term} meses
            <br />
            Ingresos: ${initialFormData.income.toLocaleString()}
          </Typography>
        </Box>
        <BankLogo src={institution.logo} alt={institution.name} />
      </Header>

      <InfoGrid>
        <InfoItem>
          <LabelText>Valor Cuota</LabelText>
          <Value>${Math.round(monthlyPayment).toLocaleString()}</Value>
        </InfoItem>
        <InfoItem>
          <LabelText>Tasa de interés</LabelText>
          <Value>{institution.products.personalLoan.minRate}%</Value>
        </InfoItem>
        <InfoItem>
          <LabelText>Pago Total (aprox.)</LabelText>
          <Value>${Math.round(totalPayment).toLocaleString()}</Value>
        </InfoItem>
      </InfoGrid>

      <Typography
        variant="h6"
        color="white"
        gutterBottom
        sx={{
          fontSize: { xs: "18px", md: "20px" },
          textAlign: { xs: "center", md: "left" },
          mt: 4,
        }}
      >
        Requisitos:
      </Typography>

      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        accept=".jpg,.jpeg,.png,.pdf"
        onChange={handleFileChange}
      />

      {requirements.map((req) => (
        <RequirementContainer key={req.id}>
          <RequirementButton
            onClick={() => handleUploadClick(req.id)}
            fullWidth
          >
            {req.name}
            <span>CARGAR</span>
          </RequirementButton>

          {uploadedFiles[req.id] && (
            <FilePreview>
              <FileDetails>
                <FileInfo>
                  {uploadedFiles[req.id]?.file.name} (
                  {(
                    (uploadedFiles[req.id]?.file.size || 0) /
                    1024 /
                    1024
                  ).toFixed(2)}{" "}
                  MB)
                </FileInfo>
                {uploadedFiles[req.id]?.type === "image" &&
                  uploadedFiles[req.id]?.previewUrl && (
                    <PreviewContainer>
                      <ImagePreview
                        src={uploadedFiles[req.id]!.previewUrl}
                        alt={uploadedFiles[req.id]?.file.name || "Preview"}
                      />
                    </PreviewContainer>
                  )}
                {uploadedFiles[req.id]?.type === "pdf" && (
                  <PreviewContainer>
                    <PDFIcon>PDF</PDFIcon>
                  </PreviewContainer>
                )}
                {(uploadProgress[req.id] ?? 0) > 0 && (
                  <ProgressBar
                    variant="determinate"
                    value={uploadProgress[req.id] ?? 0}
                  />
                )}
              </FileDetails>
              <DeleteButton
                onClick={() => handleDeleteFile(req.id)}
                disabled={Boolean(uploadProgress[req.id])}
              >
                Eliminar
              </DeleteButton>
            </FilePreview>
          )}
        </RequirementContainer>
      ))}

      <Box sx={{ textAlign: "center", mt: { xs: 3, md: 4 } }}>
        <ApplyButton
          variant="contained"
          onClick={handleApplyClick}
          disabled={
            !requirements.every((req) => uploadedFiles[req.id]) ||
            isSubmitting ||
            creditLoading
          }
        >
          {isSubmitting ? "PROCESANDO..." : "APLICAR"}
        </ApplyButton>
      </Box>
    </DetailsContainer>
  );
};

export default CreditDetails;
