import { useState } from "react";
import { Collapse, Typography } from "@mui/material";
import { toast } from "react-hot-toast";
import { useCredit } from "@/src/core/hooks/api/use-credit";
import {
  CreditCard,
  CreditInfo,
  ActionButton,
} from "../../styles/constUsuario";
import { UserCredit, CreditDocument } from "@/src/core/types/credit.types";
import CreditHeader from "./creditHeader";
import CreditBasicInfo from "./creditBasicInfo";
import CreditDocuments from "./creditDocuments";

const statusColors = {
  DOCUMENTS_SUBMITTED: "#2196F3", // Azul
  UNDER_REVIEW: "#FF9800", // Naranja
  APPROVED: "#4CAF50", // Verde
  REJECTED: "#F44336", // Rojo
};

const statusTexts = {
  DOCUMENTS_SUBMITTED: "Documentos Enviados",
  UNDER_REVIEW: "En Revisión",
  APPROVED: "Aprobado",
  REJECTED: "Rechazado",
};

interface CreditCardProfileProps {
  credit: UserCredit;
}

const CreditCardProfile = ({ credit }: CreditCardProfileProps) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const { getDocuments } = useCredit();
  const [documents, setDocuments] = useState<CreditDocument[]>([]);
  const [loadingDocs, setLoadingDocs] = useState(false);

  const handleViewDocuments = async (creditId: string) => {
    if (expandedId === creditId) {
      setExpandedId(null);
      return;
    }

    try {
      setLoadingDocs(true);
      const response = await getDocuments(creditId);
      if (response.success) {
        setDocuments(response.data || []);
      }
      setExpandedId(creditId);
    } catch (error) {
      console.error('Error loading documents:', error);
      toast.error('Error al cargar los documentos');
    } finally {
      setLoadingDocs(false);
    }
  };

  return (
    <CreditCard>
      {credit.institution && (
        <>
          <CreditHeader institution={credit.institution} />
          <CreditInfo>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "16px",
              }}
            >
              <div
                style={{
                  padding: "6px 16px",
                  borderRadius: "20px",
                  backgroundColor:
                    statusColors[credit.status as keyof typeof statusColors] ||
                    "#757575",
                  color: "white",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <span
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    backgroundColor: "white",
                    opacity: 0.8,
                  }}
                />
                {statusTexts[credit.status as keyof typeof statusTexts] ||
                  "Estado Desconocido"}
              </div>
            </div>

            <CreditBasicInfo
              monthlyPayment={credit.monthlyPayment}
              totalPayment={credit.totalPayment}
              minRate={credit.institution.minRate}
              status={credit.status}
            />

            <ActionButton
              onClick={() => handleViewDocuments(credit.id)}
              sx={{
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                },
              }}
              disabled={loadingDocs}
            >
              {loadingDocs ? "CARGANDO..." : 
                expandedId === credit.id ? "OCULTAR DETALLES" : "VER DETALLES"}
            </ActionButton>

            <Collapse in={expandedId === credit.id}>
              <div
                style={{
                  padding: "16px",
                  borderTop: "1px solid rgba(255, 255, 255, 0.12)",
                  marginTop: "16px",
                  background: "rgba(255, 255, 255, 0.03)",
                  borderRadius: "0 0 12px 12px",
                }}
              >
                <Typography variant="h6" sx={{ color: "white", mb: 2 }}>
                  Detalles del Crédito
                </Typography>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: "16px",
                  }}
                >
                  <div>
                    <Typography sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
                      Monto Solicitado
                    </Typography>
                    <Typography sx={{ color: "white", fontSize: "1.25rem" }}>
                      ${credit.amount.toLocaleString()}
                    </Typography>
                  </div>
                  <div>
                    <Typography sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
                      Plazo
                    </Typography>
                    <Typography sx={{ color: "white", fontSize: "1.25rem" }}>
                      {credit.term} meses
                    </Typography>
                  </div>
                </div>

                {/* Sección de documentos */}
                {documents.length > 0 && (
                  <div style={{ marginTop: "24px" }}>
                    <CreditDocuments documents={documents} />
                  </div>
                )}
              </div>
            </Collapse>
          </CreditInfo>
        </>
      )}
    </CreditCard>
  );
};

export default CreditCardProfile;