import { Typography } from "@mui/material";
import { InfoRow, InfoItem } from "../../styles/constUsuario";
import { useCallback } from "react";

interface CreditBasicInfoProps {
  monthlyPayment: number;
  totalPayment: number;
  minRate: number;
  status: string;
}

const CreditBasicInfo = ({
  monthlyPayment,
  totalPayment,
  minRate,
  status,
}: CreditBasicInfoProps) => {
  const getStatusText = useCallback((status: string): string => {
    const statusMap: Record<string, string> = {
      DOCUMENTS_SUBMITTED: "Documentos Enviados",
      INSTITUTION_SELECTED: "Institución Seleccionada",
      UNDER_REVIEW: "En Revisión",
      APPROVED: "Aprobado",
      REJECTED: "Rechazado",
      PENDING: "Pendiente",
    };
    return statusMap[status] || "Pendiente";
  }, []);

  return (
    <>
      <InfoRow>
        <InfoItem>
          <Typography className="label">Valor Cuota</Typography>
          <Typography className="value">
            ${(monthlyPayment || 0).toLocaleString()}
          </Typography>
        </InfoItem>
        <InfoItem>
          <Typography className="label">Tasa de interés</Typography>
          <Typography className="value">{minRate}%</Typography>
        </InfoItem>
      </InfoRow>
      <InfoRow>
        <InfoItem>
          <Typography className="label">Pago Total (aprox.)</Typography>
          <Typography className="value">
            ${(totalPayment || 0).toLocaleString()}
          </Typography>
        </InfoItem>
        <InfoItem>
          <Typography className="label">Estado</Typography>
          <Typography className="value">{getStatusText(status)}</Typography>
        </InfoItem>
      </InfoRow>
    </>
  );
};

export default CreditBasicInfo;
