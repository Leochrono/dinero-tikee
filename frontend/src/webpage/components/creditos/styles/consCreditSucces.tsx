import { Box, Button, styled } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export const SuccessContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "70vh",
  textAlign: "center",
  maxWidth: "800px",
  margin: "0 auto",
  padding: "40px 20px",
});

export const CheckIcon = styled(CheckCircleIcon)(({ theme }) => ({
  fontSize: "80px",
  color: theme.palette.primary.light,
  marginBottom: "32px",
}));

export const Title = styled("h1")(({ theme }) => ({
  color: theme.palette.common.white,
  fontSize: "48px",
  fontWeight: 500,
  marginBottom: "32px",
  fontFamily: "'Galano Grotesque', sans-serif",
}));

export const Message = styled("p")(({ theme }) => ({
  color: theme.palette.common.white,
  fontSize: "24px",
  marginBottom: "16px",
  fontFamily: "'Stage Grotesque', sans-serif",
}));

export const SearchButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  color: theme.palette.text.secondary,
  borderRadius: "50px",
  padding: "12px 48px",
  fontSize: "18px",
  marginTop: "48px",
  textTransform: "uppercase",
  fontFamily: "'Stage Grotesque', sans-serif",
  fontWeight: 500,
  "&:hover": {
    backgroundColor: theme.palette.primary.main,
  },
}));

export interface CreditSuccessProps {
  onNewSearch: () => void;
}
