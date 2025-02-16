import { Typography, Collapse } from "@mui/material";
import { ActionButton } from "../../styles/constUsuario";
import { CreditDocument, DocumentType, FileType } from "@/src/core/types/credit.types";
import DocumentPreview from "./documentPreview";
import { useState } from "react";

interface CreditDocumentsProps {
  documents: CreditDocument[];
}

const CreditDocuments = ({ documents }: CreditDocumentsProps) => {
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null);

  const getDocumentTypeText = (type: DocumentType) => {
    const documentTypes: Record<DocumentType, string> = {
      [DocumentType.ID]: 'Documento de Identidad',
      [DocumentType.PAYROLL]: 'Comprobante de Ingresos',
      [DocumentType.SERVICES]: 'Comprobante de Servicios'
    };
    return documentTypes[type] || 'Documento';
  };

  const getFileIcon = (fileType: FileType) => {
    if (fileType === FileType.PDF) return '📄';
    if (fileType === FileType.JPEG || fileType === FileType.PNG) return '🖼️';
    return '📎';
  };

  return (
    <>
      <Typography variant="h6" sx={{ color: "white", mb: 2 }}>
        Documentos Enviados
      </Typography>
      {documents.map((doc) => (
        <div key={doc.id}>
          <div style={{ 
            display: 'flex',
            alignItems: 'center',
            marginBottom: '8px',
            padding: '8px',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '4px'
          }}>
            <div style={{ marginRight: '8px' }}>
              {getFileIcon(doc.fileType)}
            </div>
            <div style={{ flex: 1 }}>
              <Typography sx={{ color: "white" }}>
                {getDocumentTypeText(doc.documentType)}
              </Typography>
              <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                {doc.fileName}
              </Typography>
            </div>
            <ActionButton
              onClick={() => setSelectedDocument(selectedDocument === doc.id ? null : doc.id)}
              sx={{ 
                minWidth: 'auto', 
                padding: '4px 8px',
                backgroundColor: "primary.main",
                marginRight: '8px'
              }}
            >
              {selectedDocument === doc.id ? 'Ocultar' : 'Ver'}
            </ActionButton>
            <ActionButton
              onClick={() => window.open(doc.fileUrl, '_blank')}
              sx={{ 
                minWidth: 'auto', 
                padding: '4px 8px',
                backgroundColor: "primary.main"
              }}
            >
              Descargar
            </ActionButton>
          </div>
          {selectedDocument === doc.id && (
            <Collapse in={true}>
              <DocumentPreview doc={doc} />
            </Collapse>
          )}
        </div>
      ))}
    </>
  );
};

export default CreditDocuments;