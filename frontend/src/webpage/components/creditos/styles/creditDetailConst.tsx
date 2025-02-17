import { styled } from "@mui/material/styles";
import { Box, Typography, Button, LinearProgress } from "@mui/material";

export const DetailsContainer = styled(Box)(({ theme }) => ({
  maxWidth: "800px",
  margin: "0 auto",
  padding: "40px 20px",
  width: "100%",
  boxSizing: "border-box",

  [theme.breakpoints.down("lg")]: {
    padding: "32px 20px",
  },
  [theme.breakpoints.down("md")]: {
    padding: "24px 16px",
  },
  [theme.breakpoints.down("sm")]: {
    padding: "20px 12px",
  },
}));

export const Header = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr auto",
  gap: "24px",
  marginBottom: "40px",
  alignItems: "center",

  [theme.breakpoints.down("lg")]: {
    gap: "20px",
    marginBottom: "32px",
  },
  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "1fr",
    gap: "16px",
    marginBottom: "24px",
    textAlign: "center",
  },
  [theme.breakpoints.down("sm")]: {
    gap: "12px",
    marginBottom: "20px",
  },
}));

export const BankLogo = styled("img")(({ theme }) => ({
  width: "120px",
  height: "120px",
  borderRadius: "8px",
  backgroundColor: "white",
  padding: "8px",
  objectFit: "contain",

  [theme.breakpoints.down("lg")]: {
    width: "110px",
    height: "110px",
  },
  [theme.breakpoints.down("md")]: {
    width: "100px",
    height: "100px",
    margin: "0 auto",
  },
  [theme.breakpoints.down("sm")]: {
    width: "90px",
    height: "90px",
    padding: "6px",
  },
}));

export const InfoGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "24px",
  marginBottom: "40px",

  [theme.breakpoints.down("lg")]: {
    gap: "20px",
    marginBottom: "32px",
  },
  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "16px",
    marginBottom: "24px",
  },
  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: "1fr",
    gap: "12px",
    marginBottom: "20px",
  },
}));

export const InfoItem = styled(Box)(({ theme }) => ({
  color: "white",
  padding: "12px",
  borderRadius: "8px",
  backgroundColor: "rgba(255, 255, 255, 0.05)",

  [theme.breakpoints.down("md")]: {
    textAlign: "center",
    padding: "10px",
  },
  [theme.breakpoints.down("sm")]: {
    padding: "8px",
  },
}));

export const LabelText = styled(Typography)(({ theme }) => ({
  color: theme.palette.common.white,
  fontSize: "14px",
  opacity: 0.8,
  marginBottom: "4px",
  fontFamily: "'Stage Grotesque', sans-serif",

  [theme.breakpoints.down("lg")]: {
    fontSize: "13px",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "12px",
  },
}));

export const Value = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.light,
  fontSize: "24px",
  fontWeight: 500,
  lineHeight: 1.2,
  fontFamily: "'Galano Grotesque', sans-serif",

  [theme.breakpoints.down("lg")]: {
    fontSize: "22px",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "20px",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "18px",
  },
}));

export const RequirementContainer = styled(Box)(({ theme }) => ({
  marginBottom: "16px",
  width: "100%",

  [theme.breakpoints.down("md")]: {
    marginBottom: "12px",
  },
}));

export const RequirementButton = styled(Button)(({ theme }) => ({
  backgroundColor: "transparent",
  border: `1px solid ${theme.palette.primary.light}`,
  borderRadius: "50px",
  color: theme.palette.common.white,
  padding: "12px 24px",
  justifyContent: "space-between",
  width: "100%",
  fontFamily: "'Stage Grotesque', sans-serif",
  fontWeight: 500,
  transition: "all 0.3s ease",

  "&:hover": {
    backgroundColor: "rgba(99, 255, 72, 0.1)",
  },

  [theme.breakpoints.down("lg")]: {
    padding: "10px 20px",
  },
  [theme.breakpoints.down("md")]: {
    padding: "8px 16px",
    fontSize: "14px",
  },
  [theme.breakpoints.down("sm")]: {
    padding: "8px 12px",
    fontSize: "13px",
  },
}));

export const ApplyButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  color: theme.palette.text.secondary,
  borderRadius: "50px",
  padding: "12px 48px",
  fontSize: "18px",
  fontWeight: 500,
  fontFamily: "'Stage Grotesque', sans-serif",
  margin: "24px auto",
  display: "block",
  transition: "all 0.3s ease",

  "&:hover": {
    backgroundColor: theme.palette.primary.main,
    transform: "scale(1.02)",
  },

  [theme.breakpoints.down("lg")]: {
    padding: "12px 40px",
    fontSize: "17px",
  },
  [theme.breakpoints.down("md")]: {
    padding: "10px 32px",
    fontSize: "16px",
    width: "100%",
    maxWidth: "300px",
  },
  [theme.breakpoints.down("sm")]: {
    padding: "10px 24px",
    fontSize: "15px",
    maxWidth: "250px",
  },
}));

export const FilePreview = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  backgroundColor: "rgba(99, 255, 72, 0.1)",
  borderRadius: "4px",
  padding: "8px 16px",
  marginTop: "8px",
  gap: "12px",

  [theme.breakpoints.down("lg")]: {
    padding: "8px 12px",
  },
  [theme.breakpoints.down("md")]: {
    padding: "6px 10px",
    flexDirection: "column",
    gap: "8px",
  },
}));

export const FileDetails = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "12px",
  flex: 1,

  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    gap: "6px",
    width: "100%",
    textAlign: "center",
  },
}));

export const FileInfo = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.light,
  fontSize: "14px",
  fontWeight: 500,
  fontFamily: "'Stage Grotesque', sans-serif",
  wordBreak: "break-word",

  [theme.breakpoints.down("md")]: {
    fontSize: "13px",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "12px",
  },
}));

export const DeleteButton = styled(Button)(({ theme }) => ({
  color: theme.palette.primary.light,
  minWidth: "auto",
  padding: "6px",
  borderRadius: "4px",

  "&:hover": {
    backgroundColor: "rgba(99, 255, 72, 0.2)",
  },

  [theme.breakpoints.down("md")]: {
    width: "100%",
    padding: "4px",
  },
}));

export const PreviewContainer = styled(Box)(({ theme }) => ({
  marginTop: "12px",
  width: "100%",
  maxWidth: "200px",
  borderRadius: "4px",
  overflow: "hidden",
  border: `1px solid ${theme.palette.primary.light}`,

  [theme.breakpoints.down("md")]: {
    maxWidth: "180px",
    marginLeft: "auto",
    marginRight: "auto",
  },
}));

export const ImagePreview = styled("img")({
  width: "100%",
  height: "auto",
  display: "block",
  objectFit: "cover",
});

export const PDFIcon = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "100px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "rgba(99, 255, 72, 0.1)",
  color: theme.palette.primary.light,

  [theme.breakpoints.down("md")]: {
    height: "80px",
  },
}));

export const ProgressBar = styled(LinearProgress)(({ theme }) => ({
  marginTop: "8px",
  height: "4px",
  backgroundColor: "rgba(99, 255, 72, 0.1)",
  borderRadius: "2px",

  "& .MuiLinearProgress-bar": {
    backgroundColor: theme.palette.primary.light,
  },

  [theme.breakpoints.down("md")]: {
    height: "3px",
  },
}));
