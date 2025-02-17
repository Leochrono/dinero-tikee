import React, { useRef, useCallback } from "react";
import { toast } from "react-hot-toast";
import {
  RequirementContainer,
  RequirementButton,
  FilePreview,
  FileDetails,
  FileInfo,
  PreviewContainer,
  ImagePreview,
  PDFIcon,
  ProgressBar,
  DeleteButton,
} from "@/webpage/components/creditos/styles/creditDetailConst";

interface Requirement {
  id: string;
  name: string;
  accept: string;
  maxSize: number;
}

interface FileData {
  file: File;
  type: "image" | "pdf";
  previewUrl?: string;
}

interface FileUploadRequirementProps {
  requirement: Requirement;
  uploadedFile: FileData | null;
  uploadProgress?: number;
  onUploadClick: (reqId: string) => void;
  onDeleteFile: (reqId: string) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
}

const FileUploadRequirement: React.FC<FileUploadRequirementProps> = ({
  requirement,
  uploadedFile,
  uploadProgress = 0,
  onUploadClick,
  onDeleteFile,
  fileInputRef,
}) => {
  const validateFileType = (file: File): "image" | "pdf" | null => {
    if (file.type.startsWith("image/")) return "image";
    if (file.type === "application/pdf") return "pdf";
    return null;
  };

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      const fileType = validateFileType(file);

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

      // Esta lógica de establecer el archivo se manejará en el componente padre
      onUploadClick(requirement.id);
    },
    [requirement, onUploadClick]
  );

  return (
    <RequirementContainer>
      <RequirementButton
        onClick={() => onUploadClick(requirement.id)}
        fullWidth
      >
        {requirement.name}
        <span>CARGAR</span>
      </RequirementButton>

      {uploadedFile && (
        <FilePreview>
          <FileDetails>
            <FileInfo>
              {uploadedFile.file.name} (
              {(uploadedFile.file.size / 1024 / 1024).toFixed(2)} MB)
            </FileInfo>
            {uploadedFile.type === "image" && uploadedFile.previewUrl && (
              <PreviewContainer>
                <ImagePreview
                  src={uploadedFile.previewUrl}
                  alt={uploadedFile.file.name || "Preview"}
                />
              </PreviewContainer>
            )}
            {uploadedFile.type === "pdf" && (
              <PreviewContainer>
                <PDFIcon>PDF</PDFIcon>
              </PreviewContainer>
            )}
            {uploadProgress > 0 && (
              <ProgressBar variant="determinate" value={uploadProgress} />
            )}
          </FileDetails>
          <DeleteButton
            onClick={() => onDeleteFile(requirement.id)}
            disabled={uploadProgress > 0}
          >
            Eliminar
          </DeleteButton>
        </FilePreview>
      )}

      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        accept={requirement.accept}
        onChange={handleFileChange}
      />
    </RequirementContainer>
  );
};

export default FileUploadRequirement;
