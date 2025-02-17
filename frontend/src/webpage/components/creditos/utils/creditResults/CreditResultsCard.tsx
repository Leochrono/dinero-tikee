import React from "react";
import { Box } from "@mui/material";
import { Institution } from "@/src/core/types/types";
import DestacadoTag from "../../styles/destacadoTag";
import {
  CreditCard,
  BankLogo,
  InfoContainer,
  InfoItem,
  Label,
  Value,
  ActionButton,
  SmallText,
} from "../../styles/creditResultConst";
import { InfoRow } from "../../../usuario/styles/constUsuario";

interface CreditResultsCardProps {
  institution: Institution;
  index: number;
  formData: {
    amount: number;
    term: number;
  };
  onSelect: (institutionId: string) => void;
  calculateMonthlyPayment: (
    amount: number,
    rate: number,
    term: number
  ) => number;
}

const CreditResultsCard: React.FC<CreditResultsCardProps> = ({
  institution,
  index,
  formData,
  onSelect,
  calculateMonthlyPayment,
}) => {
  const monthlyPayment = calculateMonthlyPayment(
    formData.amount,
    institution.minRate,
    formData.term
  );
  const totalPayment = monthlyPayment * formData.term;

  return (
    <CreditCard
      style={{
        animationDelay: `${index * 0.1}s`,
      }}
    >
      <DestacadoTag>DESTACADO</DestacadoTag>
      <BankLogo src={institution.logo} alt={institution.name} />
      <InfoContainer>
        <InfoRow>
          <InfoItem>
            <Label>Valor Cuota</Label>
            <Value>${Math.round(monthlyPayment).toLocaleString()}</Value>
          </InfoItem>
          <InfoItem>
            <Label>Tasa de interés</Label>
            <Value>{institution.minRate}%</Value>
          </InfoItem>
        </InfoRow>
        <InfoItem>
          <Label>Pago Total (aprox.)</Label>
          <Value>${Math.round(totalPayment).toLocaleString()}</Value>
        </InfoItem>
      </InfoContainer>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
          width: "100%",
          marginTop: "1rem",
        }}
      >
        <SmallText>{institution.products.personalLoan.description}</SmallText>
        <ActionButton
          onClick={() => {
            if (institution.id) {
              onSelect(institution.id);
            } else {
              console.error("ID de institución no disponible");
            }
          }}
          disabled={!institution.id}
          sx={{
            width: "100%",
            maxWidth: "200px",
          }}
        >
          ¡LO QUIERO!
        </ActionButton>
      </Box>
    </CreditCard>
  );
};

export default CreditResultsCard;
