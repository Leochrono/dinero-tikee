import { Box, Typography, Button, styled } from "@mui/material";

export const ProductsContainer = styled(Box)(({ theme }) => ({
  padding: "80px 40px",
  backgroundColor: theme.palette.background.default,
  width: "100%",
  boxSizing: "border-box",

  [theme.breakpoints.down("lg")]: {
    padding: "60px 32px",
  },
  [theme.breakpoints.down("md")]: {
    padding: "40px 20px",
  },
  [theme.breakpoints.down("sm")]: {
    padding: "30px 16px",
  },
}));

export const ProductsTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.common.white,
  fontSize: "48px",
  fontWeight: 500,
  textAlign: "center",
  marginBottom: "40px",
  fontFamily: "'Galano Grotesque', sans-serif",
  [theme.breakpoints.down("lg")]: {
    fontSize: "42px",
    marginBottom: "36px",
  },
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

export const ProductsGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: "32px",
  maxWidth: "1440px",
  margin: "0 auto",
  width: "100%",

  [theme.breakpoints.down("lg")]: {
    gap: "24px",
    maxWidth: "1200px",
  },
  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "1fr",
    gap: "20px",
  },
}));

export const ProductCard = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  borderRadius: "16px",
  padding: "32px",
  display: "flex",
  alignItems: "center",
  gap: "24px",
  border: `1px solid ${theme.palette.primary.light}`,
  position: "relative",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
    borderColor: theme.palette.custom.green.neon,
  },
  [theme.breakpoints.down("lg")]: {
    padding: "28px",
    gap: "20px",
  },
  [theme.breakpoints.down("md")]: {
    padding: "24px",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  },
  [theme.breakpoints.down("sm")]: {
    padding: "20px",
    gap: "16px",
  },
}));

export const HighlightText = styled(Typography)(({ theme }) => ({
  display: "none",

  [theme.breakpoints.down("md")]: {
    display: "block",
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.text.secondary,
    padding: "6px 12px",
    fontSize: "14px",
    fontWeight: 600,
    textAlign: "center",
    borderRadius: "12px",
    margin: "4px",
    position: "absolute",
    top: "10px",
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 1,
    boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
    minWidth: "120px",
  },

  [theme.breakpoints.down("sm")]: {
    fontSize: "12px",
    padding: "4px 10px",
  },
}));

export const LogoContainer = styled(Box)(({ theme }) => ({
  width: "140px",
  height: "140px",
  backgroundColor: "#fff",
  borderRadius: "12px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "12px",
  transition: "transform 0.3s ease",
  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",

  "&:hover": {
    transform: "scale(1.05)",
  },

  [theme.breakpoints.down("lg")]: {
    width: "120px",
    height: "120px",
  },
  [theme.breakpoints.down("md")]: {
    width: "160px",
    height: "160px",
    marginTop: "32px",
  },
  [theme.breakpoints.down("sm")]: {
    width: "140px",
    height: "140px",
    marginTop: "24px",
  },
}));

export const LogoImage = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "contain",
  transition: "transform 0.3s ease",

  "&:hover": {
    transform: "scale(1.1)",
  },
});

export const ProductInfo = styled(Box)(({ theme }) => ({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  gap: "16px",

  [theme.breakpoints.down("md")]: {
    width: "100%",
    alignItems: "center",
    gap: "12px",
  },
}));

export const ProductTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.common.white,
  fontSize: "28px",
  fontWeight: 500,
  lineHeight: 1.2,
  fontFamily: "'Galano Grotesque', sans-serif",
  [theme.breakpoints.down("lg")]: {
    fontSize: "24px",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "22px",
    marginTop: "8px",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "20px",
  },
}));

export const InterestRateContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "12px",

  [theme.breakpoints.down("md")]: {
    justifyContent: "center",
    flexDirection: "column",
    gap: "4px",
  },
}));

export const InterestRateLabel = styled(Typography)(({ theme }) => ({
  color: theme.palette.common.white,
  fontSize: "20px",
  fontWeight: 500,
  fontFamily: "'Galano Grotesque', sans-serif",
  [theme.breakpoints.down("lg")]: {
    fontSize: "18px",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "16px",
  },
}));

export const InterestRateValue = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.light,
  fontSize: "32px",
  fontWeight: 500,
  fontFamily: "'Galano Grotesque', sans-serif",
  [theme.breakpoints.down("lg")]: {
    fontSize: "28px",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "36px",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "32px",
  },
}));

export const ProductDetails = styled(Typography)(({ theme }) => ({
  color: theme.palette.common.white,
  fontSize: "16px",
  opacity: 0.9,
  lineHeight: 1.5,
  fontFamily: "'Stage Grotesque', sans-serif",
  [theme.breakpoints.down("lg")]: {
    fontSize: "15px",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "14px",
    margin: "4px 0",
    textAlign: "center",
  },
}));

export const ActionButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  color: theme.palette.text.secondary,
  borderRadius: "50px",
  padding: "12px 32px",
  fontWeight: 700,
  fontSize: "16px",
  transition: "all 0.3s ease",
  position: "relative",
  overflow: "hidden",

  "&::after": {
    content: '""',
    position: "absolute",
    top: 0,
    left: "-100%",
    width: "100%",
    height: "100%",
    background:
      "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
    transition: "0.5s",
  },

  "&:hover": {
    backgroundColor: theme.palette.primary.main,
    transform: "translateY(-2px)",
    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",

    "&::after": {
      left: "100%",
    },
  },

  [theme.breakpoints.down("lg")]: {
    padding: "10px 28px",
    fontSize: "15px",
  },
  [theme.breakpoints.down("md")]: {
    marginTop: "16px",
    width: "80%",
    maxWidth: "300px",
    fontSize: "14px",
  },
}));
