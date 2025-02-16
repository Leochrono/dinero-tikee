import { CreditDocument, FileType } from "@/src/core/types/credit.types";

interface DocumentPreviewProps {
  doc: CreditDocument;
}

const DocumentPreview = ({ doc }: DocumentPreviewProps) => {
  if (doc.fileType === FileType.PDF) {
    return (
      <iframe
        src={doc.fileUrl}
        style={{
          width: '100%',
          height: '400px',
          border: 'none',
          borderRadius: '4px',
          marginTop: '8px'
        }}
        title={doc.fileName}
      />
    );
  } else if (doc.fileType === FileType.JPEG || doc.fileType === FileType.PNG) {
    return (
      <img
        src={doc.fileUrl}
        alt={doc.fileName}
        style={{
          maxWidth: '100%',
          maxHeight: '400px',
          objectFit: 'contain',
          borderRadius: '4px',
          marginTop: '8px'
        }}
      />
    );
  }
  return null;
};

export default DocumentPreview;