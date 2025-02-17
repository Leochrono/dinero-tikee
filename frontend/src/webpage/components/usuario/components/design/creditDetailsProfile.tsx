import { Typography } from "@mui/material";
import { InfoRow, InfoItem } from "../../styles/constUsuario";

interface CreditDetailsProfileProps {
  amount: number;
  term: number;
  income: number;
}

const CreditDetailsProfile = ({
  amount,
  term,
  income,
}: CreditDetailsProfileProps) => {
  return (
    <>
      <Typography variant="h6" sx={{ color: "white", mb: 2 }}>
        Detalles del Crédito
      </Typography>
      <div
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.05)",
          padding: "16px",
          borderRadius: "4px",
          marginBottom: "16px",
        }}
      >
        <InfoRow>
          <InfoItem>
            <Typography className="label">Monto Solicitado</Typography>
            <Typography className="value">
              ${amount.toLocaleString()}
            </Typography>
          </InfoItem>
          <InfoItem>
            <Typography className="label">Plazo (meses)</Typography>
            <Typography className="value">{term}</Typography>
          </InfoItem>
        </InfoRow>
        <InfoRow>
          <InfoItem>
            <Typography className="label">Ingresos Declarados</Typography>
            <Typography className="value">
              ${income.toLocaleString()}
            </Typography>
          </InfoItem>
        </InfoRow>
      </div>
    </>
  );
};

export default CreditDetailsProfile;
