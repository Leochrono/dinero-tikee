import { styled } from "@mui/material/styles";
import { Box, Typography, TextField, Button, Container } from "@mui/material";

export const BackButton = styled(Box)(({ theme }) => ({
  position: "absolute",
  left: "40px",
  top: "40px",
  display: "flex",
  alignItems: "center",
  gap: "8px",
  color: theme.palette.common.white,
  cursor: "pointer",
  padding: "8px",
  borderRadius: "8px",
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  "& svg": {
    color: theme.palette.primary.light,
    fontSize: "32px",
  },
}));

export const UnlockWrapper = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  backgroundColor: theme.palette.background.default,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "40px 20px",
  position: "relative",
}));

export const UnlockContainer = styled(Container)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  borderRadius: "16px",
  padding: "40px",
  border: `1px solid ${theme.palette.primary.main}`,
  maxWidth: "600px !important",
  position: "relative",
  "&::before": {
    content: '""',
    position: "absolute",
    top: -2,
    left: -2,
    right: -2,
    bottom: -2,
    background: `linear-gradient(45deg, ${theme.palette.primary.light}, transparent, ${theme.palette.primary.light})`,
    borderRadius: "18px",
    zIndex: -1,
    opacity: 0.5,
  },
}));

export const UnlockTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.common.white,
  fontSize: "48px",
  fontWeight: 500,
  marginBottom: "8px",
  textAlign: "center",
  fontFamily: "'Galano Grotesque', sans-serif",
  textShadow: `0 0 10px ${theme.palette.primary.light}`,
}));

export const UnlockSubtitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.common.white,
  fontSize: "16px",
  marginBottom: "32px",
  textAlign: "center",
  opacity: 0.8,
  fontFamily: "'Stage Grotesque', sans-serif",
}));

export const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: "20px",
  "& .MuiInputBase-root": {
    color: theme.palette.common.white,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: "8px",
    height: "56px",
    transition: "transform 0.2s ease-in-out",
    "&:hover": {
      transform: "translateY(-2px)",
    },
    "&:-webkit-autofill": {
      "-webkit-text-fill-color": theme.palette.common.white,
      "-webkit-box-shadow": `0 0 0px 1000px ${theme.palette.secondary.main} inset`,
      transition: "background-color 5000s ease-in-out 0s",
    },
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "rgba(255, 255, 255, 0.2)",
      borderRadius: "8px",
    },
    "&:hover fieldset": {
      borderColor: theme.palette.primary.light,
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.primary.light,
    },
  },
  "& .MuiInputLabel-root": {
    color: "rgba(255, 255, 255, 0.7)",
    "&.Mui-focused": {
      color: theme.palette.primary.light,
    },
  },
  "& .MuiFormHelperText-root": {
    color: theme.palette.error.main,
    marginLeft: 0,
    marginTop: 4,
  },
}));

export const UnlockButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  color: theme.palette.text.secondary,
  padding: "12px",
  fontSize: "16px",
  fontWeight: 500,
  fontFamily: "'Stage Grotesque', sans-serif",
  marginTop: "32px",
  height: "56px",
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
    "&::after": {
      left: "100%",
    },
  },
}));

export interface UnlockFormData {
  email: string;
  unlockCode: string;
}

export interface FormErrors {
  email?: string;
  unlockCode?: string;
}
