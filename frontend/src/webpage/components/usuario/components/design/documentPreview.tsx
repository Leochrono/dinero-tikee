// src/webpage/components/usuario/components/design/documentPreview.tsx
import React, { useState } from "react";
import { CreditDocument, FileType } from "@/src/core/types/credit.types";
import { CircularProgress, Typography } from "@mui/material";

interface DocumentPreviewProps {
  doc: CreditDocument;
}

const DocumentPreview = ({ doc }: DocumentPreviewProps) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  if (!doc.fileContent) {
    return (
      <Typography color="error" sx={{ mt: 2 }}>
        No se pudo cargar el contenido del documento.
      </Typography>
    );
  }

  // Construir la URL de datos base64
  const base64Content = `data:${
    doc.fileType === FileType.PDF ? 'application/pdf' : 
    doc.fileType === FileType.JPEG ? 'image/jpeg' : 'image/png'
  };base64,${doc.fileContent}`;

  if (doc.fileType === FileType.PDF) {
    return (
      <div style={{ position: 'relative', height: '400px', marginTop: '8px' }}>
        {loading && (
          <div style={{ 
            position: 'absolute', 
            top: '50%', 
            left: '50%', 
            transform: 'translate(-50%, -50%)' 
          }}>
            <CircularProgress />
          </div>
        )}
        <iframe
          src={base64Content}
          style={{
            width: "100%",
            height: "400px",
            border: "none",
            borderRadius: "4px",
            display: loading ? 'none' : 'block'
          }}
          title={doc.fileName}
          onLoad={() => setLoading(false)}
          onError={() => {
            setLoading(false);
            setError("Error al cargar el PDF");
          }}
        />
        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}
      </div>
    );
  } else if (doc.fileType === FileType.JPEG || doc.fileType === FileType.PNG) {
    return (
      <div style={{ position: 'relative', marginTop: '8px' }}>
        {loading && (
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            padding: '2rem' 
          }}>
            <CircularProgress />
          </div>
        )}
        <img
          src={base64Content}
          alt={doc.fileName}
          style={{
            maxWidth: "100%",
            maxHeight: "400px",
            objectFit: "contain",
            borderRadius: "4px",
            display: loading ? 'none' : 'block'
          }}
          onLoad={() => setLoading(false)}
          onError={() => {
            setLoading(false);
            setError("Error al cargar la imagen");
          }}
        />
        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}
      </div>
    );
  }
  
  return null;
};

export default DocumentPreview;