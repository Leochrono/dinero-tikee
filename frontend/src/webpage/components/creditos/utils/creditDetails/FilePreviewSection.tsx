import React from "react";
import { Typography } from "@mui/material";
import FileUploadRequirement from "./FileUploadRequirement";
import { 
 DocumentType, 
 DocumentRequirement, 
 FileData, 
 UploadProgress 
} from "@/src/core/types/documents.types";

interface FilePreviewSectionProps {
 requirements: DocumentRequirement[];
 uploadedFiles: Record<string, FileData | null>;
 uploadProgress: UploadProgress;
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