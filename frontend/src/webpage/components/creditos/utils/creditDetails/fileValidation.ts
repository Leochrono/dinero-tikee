import { toast } from "react-hot-toast";

export type FileType = "image" | "pdf" | null;

export const validateFileType = (file: File): FileType => {
  if (file.type.startsWith("image/")) return "image";
  if (file.type === "application/pdf") return "pdf";
  return null;
};

export const validateFile = (
  file: File,
  requirement: { accept: string; maxSize: number },
  currentReqId: string
): boolean => {
  const fileType = validateFileType(file);

  if (!fileType) {
    toast.error("Solo se permiten imágenes (JPG, JPEG, PNG) o archivos PDF");
    return false;
  }

  if (file.size > requirement.maxSize) {
    toast.error("El archivo es demasiado grande. Máximo 5MB");
    return false;
  }

  return true;
};

export const createFilePreviewUrl = (
  file: File,
  fileType: FileType
): string | undefined => {
  return fileType === "image" ? URL.createObjectURL(file) : undefined;
};
