import React from "react";
import { Box, Typography } from "@mui/material";
import { Institution } from "@/src/core/types/types";
import {
  Header,
  BankLogo,
} from "@/webpage/components/creditos/styles/creditDetailConst";

interface BankHeaderProps {
  institution: Institution;
  amount: number;
  term: number;
  income: number;
}

const BankHeader: React.FC<BankHeaderProps> = ({
  institution,
  amount,
  term,
  income,
}) => {
  return (
    <Header>
      <Box>
        <Typography
          variant="h4"
          color="white"
          gutterBottom
          sx={{ fontSize: { xs: "24px", md: "34px" } }}
        >
          Préstamo {institution.name}
        </Typography>
        <Typography color="white" sx={{ fontSize: { xs: "14px", md: "16px" } }}>
          Monto: ${amount.toLocaleString()}
          <br />
          Plazo: {term} meses
          <br />
          Ingresos: ${income.toLocaleString()}
        </Typography>
      </Box>
      <BankLogo src={institution.logo} alt={institution.name} />
    </Header>
  );
};

export default BankHeader;
