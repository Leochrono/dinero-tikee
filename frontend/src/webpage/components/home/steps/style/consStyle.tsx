import { Box, Typography, styled } from "@mui/material";

export const StepsContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(10, 0),
  backgroundColor: theme.palette.custom.blue.background,
  textAlign: "center",
  transition: "padding 0.3s ease",

  [theme.breakpoints.down("md")]: {
    padding: theme.spacing(7.5, 0),
  },
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(5, 0),
  },
}));

export const StepsTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.common.white,
  fontSize: "4rem",
  fontFamily: "'Galano Grotesque', sans-serif",
  textTransform: "uppercase",
  transition: "font-size 0.3s ease",
  letterSpacing: "-1px",
  [theme.breakpoints.down("lg")]: {
    fontSize: "3.5rem",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "3rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "2.25rem",
    marginBottom: theme.spacing(1),
  },
}));

export const StepsSubtitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.common.white,
  fontSize: "3.25rem",
  fontWeight: 500,
  marginBottom: theme.spacing(10),
  fontFamily: "'Stage Grotesque', sans-serif",
  transition: "all 0.3s ease",

  [theme.breakpoints.down("lg")]: {
    fontSize: "2.75rem",
    marginBottom: theme.spacing(7.5),
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "2.25rem",
    marginBottom: theme.spacing(5),
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.75rem",
    marginBottom: theme.spacing(4),
  },
}));

export const StepsGrid = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  maxWidth: "1440px",
  margin: "0 auto",
  padding: theme.spacing(0, 2.5),
  transition: "all 0.3s ease",

  [theme.breakpoints.down("lg")]: {
    gap: theme.spacing(3.75),
    padding: theme.spacing(0, 5),
  },
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    alignItems: "center",
    gap: theme.spacing(4),
  },
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(0, 2),
    gap: theme.spacing(3),
  },
}));

export const StepItem = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  flex: "1 1 0",
  maxWidth: "400px",
  transition: "all 0.3s ease",

  [theme.breakpoints.down("md")]: {
    maxWidth: "100%",
    width: "100%",
  },
}));

export const StepWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  borderRadius: "80px",
  width: "350px",
  height: "120px",
  marginBottom: theme.spacing(3),
  padding: theme.spacing(0, 5),
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  gap: theme.spacing(2.5),
  transition: "all 0.3s ease",
  "& .MuiSvgIcon-root": {
    fontSize: "35px",
    color: theme.palette.text.secondary,
    transition: "font-size 0.3s ease",
    [theme.breakpoints.down("sm")]: {
      fontSize: "28px",
    },
  },
  "& .step-text": {
    color: theme.palette.text.secondary,
    fontSize: "35px",
    fontWeight: 500,
    textAlign: "left",
    lineHeight: 1.2,
    fontFamily: "'Galano Grotesque', sans-serif",
    textTransform: "uppercase",
    transition: "font-size 0.3s ease",
  },
  [theme.breakpoints.down("lg")]: {
    width: "280px",
    height: "100px",
    "& .step-text": {
      fontSize: "30px",
    },
  },
  [theme.breakpoints.down("md")]: {
    width: "100%",
    maxWidth: "400px",
    height: "90px",
    "& .step-text": {
      fontSize: "28px",
    },
  },
  [theme.breakpoints.down("sm")]: {
    height: "80px",
    padding: theme.spacing(0, 3),
    gap: theme.spacing(2),
    "& .step-text": {
      fontSize: "24px",
    },
  },
}));

export const StepDescription = styled(Typography)(({ theme }) => ({
  color: theme.palette.common.white,
  fontSize: "24px",
  lineHeight: 1.5,
  maxWidth: "300px",
  margin: "0 auto",
  marginTop: theme.spacing(3),
  fontFamily: "'Stage Grotesque', sans-serif",
  textAlign: "left",
  transition: "all 0.3s ease",
  [theme.breakpoints.down("lg")]: {
    fontSize: "16px",
  },
  [theme.breakpoints.down("md")]: {
    maxWidth: "400px",
    marginTop: theme.spacing(2),
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "14px",
    marginTop: theme.spacing(1.5),
  },
}));
