import React from "react";
import { Institution } from "@/src/core/types/types";
import {
  InfoGrid,
  InfoItem,
  LabelText,
  Value,
} from "@/webpage/components/creditos/styles/creditDetailConst";

interface LoanInfoGridProps {
  monthlyPayment: number;
  totalPayment: number;
  institution: Institution;
}

const LoanInfoGrid: React.FC<LoanInfoGridProps> = ({
  monthlyPayment,
  totalPayment,
  institution,
}) => {
  return (
    <InfoGrid>
      <InfoItem>
        <LabelText>Valor Cuota</LabelText>
        <Value>${Math.round(monthlyPayment).toLocaleString()}</Value>
      </InfoItem>
      <InfoItem>
        <LabelText>Tasa de interés</LabelText>
        <Value>{institution.products.personalLoan.minRate}%</Value>
      </InfoItem>
      <InfoItem>
        <LabelText>Pago Total (aprox.)</LabelText>
        <Value>${Math.round(totalPayment).toLocaleString()}</Value>
      </InfoItem>
    </InfoGrid>
  );
};

export default LoanInfoGrid;
