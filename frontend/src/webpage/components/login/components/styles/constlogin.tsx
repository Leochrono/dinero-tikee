import {
  Box,
  Typography,
  TextField,
  Button,
  Container,
  styled,
} from "@mui/material";

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

export const LoginWrapper = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  backgroundColor: theme.palette.background.default,
  backgroundImage: "url('/assets/img/background.webp')", // Ruta a la imagen
  backgroundSize: "cover", // Ajusta la imagen para cubrir todo el contenedor
  backgroundPosition: "center", // Centra la imagen
  backgroundRepeat: "no-repeat", // Evita que la imagen se repita
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "40px 20px",
  position: "relative",
  boxSizing: "border-box",

  [theme.breakpoints.down("md")]: {
    padding: "30px 16px",
  },

  [theme.breakpoints.down("sm")]: {
    padding: "20px 12px",
  },
}));

export const LoginContainer = styled(Container)(({ theme }) => ({
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
    margin: "0 12px",
  },
}));

export const LoginTitle = styled(Typography)(({ theme }) => ({
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
    fontSize: "36px",
  },
}));

export const LoginSubtitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.common.white,
  fontSize: "16px",
  marginBottom: "32px",
  textAlign: "center",
  opacity: 0.8,
  fontFamily: "'Stage Grotesque', sans-serif", // Cambiada a Stage Grotesque

  [theme.breakpoints.down("sm")]: {
    fontSize: "14px",
    marginBottom: "24px",
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

    "&:-webkit-autofill, &:-webkit-autofill:hover, &:-webkit-autofill:focus": {
      WebkitTextFillColor: theme.palette.common.white, // camelCase
      WebkitBoxShadow: `0 0 0px 1000px ${theme.palette.secondary.main} inset`, // camelCase
      transition: "background-color 5000s ease-in-out 0s",
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

    [theme.breakpoints.down("sm")]: {
      fontSize: "14px",
    },

    "&.Mui-focused": {
      color: theme.palette.primary.light,
    },
  },

  "& .MuiInputLabel-shrink": {
    transform: "translate(14px, -8px) scale(0.75)",
  },

  [theme.breakpoints.down("sm")]: {
    marginBottom: "16px",
  },
}));

export const LoginButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  color: theme.palette.text.secondary,
  padding: "12px",
  fontSize: "16px",
  fontWeight: 500, // Cambiado a 500
  fontFamily: "'Stage Grotesque', sans-serif", // Añadida fuente Stage Grotesque
  marginTop: "16px",
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

  [theme.breakpoints.down("sm")]: {
    height: "48px",
    fontSize: "14px",
    marginTop: "12px",
  },
}));

export const ActionLinks = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  marginTop: "24px",
  gap: "16px",
  flexWrap: "wrap",

  "& .MuiTypography-root": {
    color: theme.palette.primary.light,
    cursor: "pointer",
    transition: "all 0.2s",
    fontSize: "14px",
    textAlign: "center",
    fontFamily: "'Stage Grotesque', sans-serif", // Añadida fuente Stage Grotesque
    flex: 1,

    "&:hover": {
      color: theme.palette.primary.main,
      textDecoration: "underline",
      transform: "translateY(-1px)",
    },
  },

  [theme.breakpoints.down("sm")]: {
    marginTop: "20px",
    gap: "12px",
    flexDirection: "column",
    alignItems: "center",

    "& .MuiTypography-root": {
      fontSize: "13px",
      width: "100%",
    },
  },
}));
