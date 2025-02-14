import { Box, Typography, Button, styled } from "@mui/material";
import { cardAppear, filterChange, resultUpdate, fadeIn } from "./animations";

export const ResultsContainer = styled(Box)(({ theme }) => ({
  padding: "80px 40",
  backgroundColor: theme.palette.background.default,
  width: "100%",
  [theme.breakpoints.down("md")]: {
    padding: "40px 0",
  },
  [theme.breakpoints.down("sm")]: {
    padding: "20px 0",
  },
}));

export const ResultsGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: "24px",
  maxWidth: "1440px",
  margin: "0 auto",
  padding: "0 20px",
  animation: `${resultUpdate} 0.3s ease-out`,
  transition: "all 0.3s ease-in-out",
  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "1fr",
    gap: "16px",
    padding: "0 12px",
  },
  [theme.breakpoints.down("sm")]: {
    gap: "12px",
  },
}));

export const FiltersContainer = styled(Box)(({ theme }) => ({
  maxWidth: "1440px",
  margin: "0 auto 40px",
  padding: "0 20px",
  display: "flex",
  justifyContent: "space-between",
  animation: `${filterChange} 0.3s ease-out`,
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    gap: "16px",
    alignItems: "center",
    padding: "0 12px",
  },
  [theme.breakpoints.down("sm")]: {
    gap: "12px",
  },
}));

export const FilterGroup = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "12px",
  color: theme.palette.common.white,
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    gap: "8px",
  },
  [theme.breakpoints.down("sm")]: {
    gap: "6px",
  },
}));

export const FilterLabel = styled(Typography)(({ theme }) => ({
  color: theme.palette.common.white,
  fontSize: "14px",
  fontFamily: "'Stage Grotesque', sans-serif", // Añadida fuente Stage Grotesque
  [theme.breakpoints.down("md")]: {
    fontSize: "16px",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "12px",
  },
 }));

export const CreditCard = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  borderRadius: "16px",
  padding: "24px",
  display: "grid",
  gridTemplateColumns: "120px 1fr auto",
  alignItems: "center",
  justifyItems: "center",
  gap: "24px",
  border: `1px solid ${theme.palette.primary.main}`,
  animation: `${cardAppear} 0.5s ease-out`,
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
  },
  [theme.breakpoints.down("md")]: {
    position: "relative",
    padding: "16px",
    gridTemplateColumns: "1fr",
    alignItems: "center",
    textAlign: "center",
  },
  [theme.breakpoints.down("sm")]: {
    padding: "12px",
    gap: "16px",
  },
}));

export const ActiveFilterChip = styled(Box)(({ theme }) => ({
  display: "inline-flex",
  alignItems: "center",
  padding: "4px 12px",
  backgroundColor: theme.palette.primary.light,
  color: theme.palette.text.secondary,
  borderRadius: "16px",
  margin: "4px",
  fontSize: "14px",
  animation: `${fadeIn} 0.3s ease-out`,
  "& .clearIcon": {
    marginLeft: "4px",
    cursor: "pointer",
    fontSize: "16px",
    "&:hover": {
      opacity: 0.8,
    },
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "12px",
    padding: "4px 8px",
  },
}));

export const BankLogo = styled("img")(({ theme }) => ({
  width: "120px",
  height: "120px",
  borderRadius: "8px",
  backgroundColor: "white",
  padding: "8px",
  objectFit: "contain",
  justifySelf: "center",
  [theme.breakpoints.down("md")]: {
    width: "140px",
    height: "140px",
    marginTop: "24px",
    margin: "24px auto 0",
  },
  [theme.breakpoints.down("sm")]: {
    width: "100px",
    height: "100px",
  },
}));

export const InfoContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    gap: "16px",
    alignItems: "center",
  },
  [theme.breakpoints.down("sm")]: {
    gap: "12px",
  },
}));

export const InfoItem = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  [theme.breakpoints.down("md")]: {
    alignItems: "center",
  },
}));

export const Label = styled(Typography)(({ theme }) => ({
  color: theme.palette.common.white,
  fontSize: "14px",
  opacity: 0.8,
  fontFamily: "'Stage Grotesque', sans-serif", // Añadida fuente Stage Grotesque
  [theme.breakpoints.down("md")]: {
    fontSize: "16px",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "12px",
  },
 }));

 export const Value = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.light,
  fontSize: "24px",
  fontWeight: 500, // Cambiado a 500
  fontFamily: "'Galano Grotesque', sans-serif", // Añadida fuente Galano Grotesque
  [theme.breakpoints.down("md")]: {
    fontSize: "28px",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "20px",
  },
 }));

 export const ActionButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  color: theme.palette.text.secondary,
  borderRadius: "50px",
  padding: "8px 24px",
  fontWeight: 500, // Cambiado a 500
  fontFamily: "'Stage Grotesque', sans-serif", // Añadida fuente Stage Grotesque
  fontSize: "16px",
  "&:hover": {
    backgroundColor: theme.palette.primary.main,
    transform: "scale(1.05)",
  },
  "&:active": {
    transform: "scale(0.95)",
  },
  transition: "all 0.3s ease-in-out",
  [theme.breakpoints.down("md")]: {
    marginTop: "16px",
    width: "80%",
  },
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    fontSize: "14px",
  },
 }));

export const SmallText = styled(Typography)(({ theme }) => ({
  color: theme.palette.common.white,
  fontSize: "12px",
  opacity: 0.8,
  maxWidth: "200px",
  marginBottom: "16px",
  textAlign: "right",
  fontFamily: "'Stage Grotesque', sans-serif", // Añadida fuente Stage Grotesque
  [theme.breakpoints.down("md")]: {
    textAlign: "center",
    margin: "8px auto",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "10px",
  },
 }));

 export const BackButton = styled(Button)(({ theme }) => ({
  backgroundColor: "transparent",
  color: theme.palette.common.white,
  borderRadius: "50px",
  padding: "8px 24px",
  border: `1px solid ${theme.palette.primary.light}`,
  fontWeight: 500, // Cambiado a 500
  fontFamily: "'Stage Grotesque', sans-serif", // Añadida fuente Stage Grotesque
  fontSize: "16px",
  marginBottom: "32px",
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  [theme.breakpoints.down("md")]: {
    width: "100%",
    maxWidth: "200px",
    margin: "0 auto 24px",
  },
  [theme.breakpoints.down("sm")]: {
    maxWidth: "100%",
    fontSize: "14px",
  },
 }));

export const AvailableOptions = styled(Typography)(({ theme }) => ({
  color: theme.palette.common.white,
  textAlign: "center",
  marginBottom: "20px",
  fontSize: "20px",
  fontWeight: 500, // Cambiado a 500
  fontFamily: "'Galano Grotesque', sans-serif", // Añadida fuente Galano Grotesque
  animation: `${fadeIn} 0.5s ease-out`,
  [theme.breakpoints.down("md")]: {
    fontSize: "16px",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "14px",
  },
 }));