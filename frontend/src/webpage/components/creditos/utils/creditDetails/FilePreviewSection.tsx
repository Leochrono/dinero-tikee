import React from "react";
import { Typography } from "@mui/material";
import FileUploadRequirement from "./FileUploadRequirement";

interface FileData {
  file: File;
  type: "image" | "pdf";
  previewUrl?: string;
}

interface FilePreviewSectionProps {
  requirements: Array<{
    id: string;
    name: string;
    accept: string;
    maxSize: number;
  }>;
  uploadedFiles: Record<string, FileData | null>;
  uploadProgress: Record<string, number>;
  fileInputRef: React.RefObject<HTMLInputElement>;
  onUploadClick: (reqId: string) => void;
  onDeleteFile: (reqId: string) => void;
}

const FilePreviewSection: React.FC<FilePreviewSectionProps> = ({
  requirements,
  uploadedFiles,
  uploadProgress,
  fileInputRef,
  onUploadClick,
  onDeleteFile,
}) => {
  return (
    <>
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

      {requirements.map((req) => (
        <FileUploadRequirement
          key={req.id}
          requirement={req}
          uploadedFile={uploadedFiles[req.id]}
          uploadProgress={uploadProgress[req.id]}
          onUploadClick={onUploadClick}
          onDeleteFile={onDeleteFile}
          fileInputRef={fileInputRef}
        />
      ))}
    </>
  );
};

export default FilePreviewSection;
