import React, { useCallback } from "react";
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
import {
  DocumentRequirement,
  FileData,
  DocumentType,
} from "@/src/core/types/documents.types";

interface FileUploadRequirementProps {
  requirement: DocumentRequirement;
  uploadedFile: FileData | null;
  uploadProgress?: number;
  onUploadClick: (docType: DocumentType) => void;
  onDeleteFile: (docType: DocumentType) => void;
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
  const handleClick = useCallback(() => {
    // Guardamos el tipo de documento actual y abrimos el selector de archivos
    localStorage.setItem('currentDocumentType', requirement.type);
    onUploadClick(requirement.type);
  }, [requirement.type, onUploadClick]);

  const handleDelete = useCallback(() => {
    onDeleteFile(requirement.type);
  }, [requirement.type, onDeleteFile]);

  return (
    <RequirementContainer>
      <RequirementButton onClick={handleClick} fullWidth>
        {requirement.label}
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
          <DeleteButton onClick={handleDelete} disabled={uploadProgress > 0}>
            Eliminar
          </DeleteButton>
        </FilePreview>
      )}
    </RequirementContainer>
  );
};

export default FileUploadRequirement;