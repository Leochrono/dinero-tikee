import {
  Box,
  Typography,
  TextField,
  Button,
  Container,
  styled,
} from "@mui/material";

export interface FormErrors {
  nombres?: string;
  apellidos?: string;
  cedula?: string;
  email?: string;
  telefono?: string;
  direccion?: string;
  password?: string;
  confirmPassword?: string;
}

export interface RegisterFormData {
  nombres: string;
  apellidos: string;
  cedula: string;
  email: string;
  telefono: string;
  direccion: string;
  password: string;
  confirmPassword: string;
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
    left: "20px",
    top: "20px",
    padding: "6px",
    "& svg": {
      fontSize: "24px",
    },
  },
}));

export const RegisterWrapper = styled(Box)(({ theme }) => ({
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

export const RegisterContainer = styled(Container)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  borderRadius: "16px",
  padding: "40px",
  border: `1px solid ${theme.palette.primary.main}`,
  maxWidth: "600px !important",
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
    maxWidth: "500px !important",
  },

  [theme.breakpoints.down("sm")]: {
    padding: "24px 20px",
    maxWidth: "100% !important",
    margin: "0 12px",
  },
}));

export const RegisterTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.common.white,
  fontSize: "48px",
  fontWeight: 500, // Cambiado a 500
  marginBottom: "8px",
  textAlign: "center",
  fontFamily: "'Galano Grotesque', sans-serif", // Cambiada a Galano Grotesque
  textShadow: `0 0 10px ${theme.palette.primary.light}`,
 
  [theme.breakpoints.down("md")]: {
    fontSize: "42px",
  },
 
  [theme.breakpoints.down("sm")]: {
    fontSize: "32px",
  },
 }));

 export const RegisterSubtitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.common.white,
  fontSize: "16px",
  marginBottom: "32px",
  textAlign: "center",
  opacity: 0.8,
  fontFamily: "'Stage Grotesque', sans-serif", // Cambiada a Stage Grotesque
 
  [theme.breakpoints.down("md")]: {
    fontSize: "15px",
    marginBottom: "28px",
  },
 
  [theme.breakpoints.down("sm")]: {
    fontSize: "14px",
    marginBottom: "24px",
  },
 }));

export const FieldsGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: "24px 16px",

  [theme.breakpoints.down("md")]: {
    gap: "20px 16px",
  },

  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: "1fr",
    gap: "16px",
  },
}));

export const StyledTextField = styled(TextField)(({ theme }) => ({
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
      transition: "background-color 5000s ease-in-out 0s"
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
    "&.Mui-error fieldset": {
      borderColor: "rgba(255, 255, 255, 0.2)",
    },
    "&.Mui-error:hover fieldset": {
      borderColor: theme.palette.primary.light,
    },
  },

  "& .MuiInputLabel-root": {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: "16px",

    "&.Mui-focused": {
      color: theme.palette.primary.light,
    },
    "&.Mui-error": {
      color: "rgba(255, 255, 255, 0.7)",
    },

    [theme.breakpoints.down("sm")]: {
      fontSize: "14px",
    },
  },

  "& .MuiInputLabel-shrink": {
    transform: "translate(14px, -8px) scale(0.75)",
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
}));

export const RegisterButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  color: theme.palette.text.secondary,
  padding: "12px",
  fontSize: "16px",
  fontWeight: 500, 
  fontFamily: "'Stage Grotesque', sans-serif", 
  marginTop: "32px",
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
    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
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
    marginTop: "28px",
    fontSize: "15px",
  },

  [theme.breakpoints.down("sm")]: {
    marginTop: "24px",
    height: "48px",
    fontSize: "14px",
  },
}));