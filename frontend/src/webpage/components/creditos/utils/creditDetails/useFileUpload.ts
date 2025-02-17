import { useState, useCallback, useRef, useEffect } from "react";
import { toast } from "react-hot-toast";
import { validateFile, createFilePreviewUrl, FileType } from "./fileValidation";

export interface FileData {
  file: File;
  type: "image" | "pdf";
  previewUrl?: string;
}

export type UploadedFiles = Record<string, FileData | null>;
export type UploadProgress = Record<string, number>;

interface FileUploadOptions {
  requirements: Array<{
    id: string;
    accept: string;
    maxSize: number;
  }>;
}

export const useFileUpload = ({ requirements }: FileUploadOptions) => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFiles>({});
  const [uploadProgress, setUploadProgress] = useState<UploadProgress>({});
  const [currentReqId, setCurrentReqId] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      Object.values(uploadedFiles).forEach((fileData) => {
        if (fileData?.previewUrl) {
          URL.revokeObjectURL(fileData.previewUrl);
        }
      });
    };
  }, [uploadedFiles]);

  const handleUploadClick = useCallback((reqId: string) => {
    setCurrentReqId(reqId);
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, []);

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      const requirement = requirements.find((req) => req.id === currentReqId);
      if (!requirement) return;

      if (!validateFile(file, requirement, currentReqId)) {
        if (event.target) event.target.value = "";
        return;
      }

      const fileType: FileType = file.type.startsWith("image/")
        ? "image"
        : file.type === "application/pdf"
        ? "pdf"
        : null;

      if (!fileType) {
        toast.error("Tipo de archivo no válido");
        return;
      }

      const previewUrl = createFilePreviewUrl(file, fileType);

      setUploadedFiles((prev) => ({
        ...prev,
        [currentReqId]: {
          file,
          type: fileType,
          previewUrl,
        },
      }));

      if (event.target) event.target.value = "";
    },
    [currentReqId, requirements]
  );

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

  const areAllFilesUploaded = useCallback(() => {
    return requirements.every((req) => uploadedFiles[req.id]);
  }, [requirements, uploadedFiles]);

  return {
    uploadedFiles,
    uploadProgress,
    fileInputRef,
    currentReqId,
    handleUploadClick,
    handleFileChange,
    handleDeleteFile,
    areAllFilesUploaded,
    setUploadProgress,
  };
};
