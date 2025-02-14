import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";

export const DetailContainer = styled(Box)(({ theme }) => ({
  minHeight: "50vh",
  backgroundColor: theme.palette.background.default,
  padding: "40px 200px",
  width: "100%",
  boxSizing: "border-box",

  [theme.breakpoints.down("lg")]: {
    padding: "40px 100px",
  },
  [theme.breakpoints.down("md")]: {
    padding: "30px 60px",
  },
  [theme.breakpoints.down("sm")]: {
    padding: "20px",
  },
}));

export const ArticleTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.common.white,
  fontSize: "42px",
  fontWeight: 500, // Cambiado a 500
  marginBottom: "24px",
  lineHeight: 1.3,
  fontFamily: "'Galano Grotesque', sans-serif", // Añadida fuente Galano Grotesque
  [theme.breakpoints.down("md")]: {
    fontSize: "28px",
    marginBottom: "20px",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "24px",
    marginBottom: "16px",
  },
 }));

 export const ArticleParagraph = styled(Typography)(({ theme }) => ({
  color: theme.palette.common.white,
  fontSize: "16px",
  lineHeight: 1.6,
  marginBottom: "20px",
  opacity: 0.9,
  fontFamily: "'Stage Grotesque', sans-serif", // Añadida fuente Stage Grotesque
  [theme.breakpoints.down("sm")]: {
    fontSize: "15px",
    lineHeight: 1.5,
    marginBottom: "16px",
  },
 }));

export const HighlightText = styled('span')(({ theme }) => ({
  color: theme.palette.primary.light,
  fontWeight: 500,
}));

export const SubTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.light,
  fontSize: "24px",
  fontWeight: 500, // Cambiado a 500
  marginTop: "32px",
  marginBottom: "16px",
  lineHeight: 1.3,
  fontFamily: "'Galano Grotesque', sans-serif", // Añadida fuente Galano Grotesque
  [theme.breakpoints.down("md")]: {
    fontSize: "22px",
    marginTop: "28px",
    marginBottom: "14px",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "20px",
    marginTop: "24px",
    marginBottom: "12px",
  },
 }));