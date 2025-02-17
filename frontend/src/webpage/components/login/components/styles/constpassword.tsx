import {
  Box,
  Typography,
  TextField,
  Button,
  Container,
  styled,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";

export interface RecoverFormData {
  email: string;
  cedula: string;
}

export interface FormErrors {
  email?: string;
  cedula?: string;
}

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
  zIndex: 10,

  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },

  "& svg": {
    color: theme.palette.primary.light,
    fontSize: "32px",
  },

  [theme.breakpoints.down("md")]: {
    left: "30px",
    top: "30px",
    "& svg": {
      fontSize: "28px",
    },
  },

  [theme.breakpoints.down("sm")]: {
    left: "16px",
    top: "16px",
    padding: "6px",
    "& svg": {
      fontSize: "24px",
    },
  },
}));

export const RecoverWrapper = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  backgroundColor: theme.palette.background.default,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "80px 20px 40px",
  position: "relative",
  boxSizing: "border-box",

  [theme.breakpoints.down("md")]: {
    padding: "70px 16px 30px",
  },

  [theme.breakpoints.down("sm")]: {
    padding: "60px 12px 20px",
  },
}));

export const RecoverContainer = styled(Container)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  borderRadius: "16px",
  padding: "40px",
  border: `1px solid ${theme.palette.primary.main}`,
  maxWidth: "450px !important",
  width: "100%",
  position: "relative",
  boxSizing: "border-box",

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

  [theme.breakpoints.down("md")]: {
    padding: "32px",
    maxWidth: "400px !important",
  },

  [theme.breakpoints.down("sm")]: {
    padding: "24px 20px",
    maxWidth: "100% !important",
  },
}));

export const RecoverTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.common.white,
  fontSize: "36px",
  fontWeight: 500,
  marginBottom: "8px",
  textAlign: "center",
  fontFamily: "'Galano Grotesque', sans-serif",
  textShadow: `0 0 10px ${theme.palette.primary.light}`,

  [theme.breakpoints.down("md")]: {
    fontSize: "32px",
  },

  [theme.breakpoints.down("sm")]: {
    fontSize: "28px",
  },
}));

export const RecoveryButton = styled(Button)(({ theme }) => ({
  width: "100%",
  padding: "12px 20px",
  marginBottom: "16px",
  borderRadius: "12px",
  backgroundColor: "rgba(0, 20, 40, 0.5)",
  border: `2px solid ${theme.palette.primary.main}`,
  color: theme.palette.common.white,
  display: "flex",
  alignItems: "center",
  gap: "12px",
  justifyContent: "flex-start",
  textTransform: "none",
  transition: "all 0.2s ease",
  WebkitBoxShadow: "0 4px 12px rgba(0, 255, 200, 0.1)",
  boxShadow: "0 4px 12px rgba(0, 255, 200, 0.1)",
  "&:hover": {
    backgroundColor: "rgba(0, 255, 200, 0.1)",
    borderColor: theme.palette.primary.light,
    transform: "translateY(-2px)",
  },
  "&.selected": {
    backgroundColor: "rgba(0, 255, 200, 0.2)",
    borderColor: theme.palette.primary.light,
    WebkitBoxShadow: "0 0 20px rgba(0, 255, 200, 0.2)",
    boxShadow: "0 0 20px rgba(0, 255, 200, 0.2)",
  },
  "& .MuiSvgIcon-root": {
    fontSize: "24px",
    color: theme.palette.primary.light,
  },
}));

export const RecoverSubtitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.common.white,
  fontSize: "16px",
  marginBottom: "32px",
  textAlign: "center",
  opacity: 0.8,
  fontFamily: "'Stage Grotesque', sans-serif",
  lineHeight: 1.5,

  [theme.breakpoints.down("md")]: {
    fontSize: "15px",
    marginBottom: "28px",
  },

  [theme.breakpoints.down("sm")]: {
    fontSize: "14px",
    marginBottom: "24px",
    lineHeight: 1.4,
  },
}));

export const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: "24px",
  width: "100%",

  "& .MuiInputBase-root": {
    color: theme.palette.common.white,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: "8px",
    height: "56px",
    transition: "transform 0.2s ease-in-out",

    "&:hover": {
      transform: "translateY(-2px)",
    },

    [theme.breakpoints.down("sm")]: {
      height: "48px",
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
      borderWidth: "2px",
    },
  },

  "& .MuiInputLabel-root": {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: "16px",

    "&.Mui-focused": {
      color: theme.palette.primary.light,
    },

    [theme.breakpoints.down("sm")]: {
      fontSize: "14px",
    },
  },

  "& .MuiFormHelperText-root": {
    color: theme.palette.error.main,
    marginLeft: 0,
    marginTop: 4,
    fontSize: "12px",

    [theme.breakpoints.down("sm")]: {
      fontSize: "11px",
    },
  },

  [theme.breakpoints.down("sm")]: {
    marginBottom: "20px",
  },
}));

export const RecoverButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  color: theme.palette.text.secondary,
  padding: "12px",
  fontSize: "16px",
  fontWeight: 500,
  fontFamily: "'Stage Grotesque', sans-serif",
  marginTop: "24px",
  height: "56px",
  width: "100%",
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
    transition: "all 0.2s",
    "&::after": {
      left: "100%",
    },
  },

  [theme.breakpoints.down("md")]: {
    fontSize: "15px",
    height: "52px",
    marginTop: "20px",
  },

  [theme.breakpoints.down("sm")]: {
    fontSize: "14px",
    height: "48px",
    marginTop: "16px",
  },
}));

export const StyledFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
  color: theme.palette.common.white,
  padding: "8px",
  margin: "0",
  width: "100%",
  borderRadius: "8px",
  transition: "all 0.2s ease",

  "& .MuiRadio-root": {
    color: theme.palette.common.white,
    padding: "8px",

    "&.Mui-checked": {
      color: theme.palette.primary.light,
    },

    "&:hover": {
      backgroundColor: "rgba(99, 255, 72, 0.08)",
    },
  },

  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
  },

  [theme.breakpoints.down("sm")]: {
    padding: "6px",
    "& .MuiTypography-root": {
      fontSize: "14px",
    },
    "& .MuiRadio-root": {
      padding: "6px",
    },
  },
}));

export const StyledRadioGroup = styled(RadioGroup)(({ theme }) => ({
  gap: "8px",
  padding: "12px",
  backgroundColor: "rgba(255, 255, 255, 0.05)",
  borderRadius: "8px",
  border: `1px solid ${theme.palette.primary.main}`,
  marginBottom: "24px",

  [theme.breakpoints.down("md")]: {
    padding: "10px",
    gap: "6px",
    marginBottom: "20px",
  },

  [theme.breakpoints.down("sm")]: {
    padding: "8px",
    gap: "4px",
    marginBottom: "16px",
  },
}));
