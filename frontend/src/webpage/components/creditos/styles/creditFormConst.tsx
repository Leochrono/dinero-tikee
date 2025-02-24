import {
  Box,
  Typography,
  Slider,
  TextField,
  Button,
  styled,
} from "@mui/material";
import { fadeIn, slideIn, checkmark, shake } from "./animations";
import { alpha } from "@mui/material/styles";

export const FormContainer = styled(Box)(({ theme }) => ({
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "40px 20px",
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "40px",
  animation: `${slideIn} 0.5s ease-in-out`,
  minHeight: "5",
  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "1fr",
    padding: "32px 16px",
  },
  [theme.breakpoints.down("sm")]: {
    padding: "24px 12px",
  },
}));

export const SliderGroup = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  gap: "24px",
}));

export const SliderContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: "16px",
  padding: "24px",
  border: `1px solid ${theme.palette.primary.main}`,
  [theme.breakpoints.down("sm")]: {
    padding: "20px",
  },
}));

export const SliderValue = styled(Typography)(({ theme }) => ({
  color: theme.palette.common.white,
  textAlign: "right",
  fontSize: "24px",

  fontFamily: "'Stage Grotesque', sans-serif",
  [theme.breakpoints.down("sm")]: {
    fontSize: "20px",
  },
}));

export const StyledSlider = styled(Slider, {
  shouldForwardProp: (prop) => prop !== "hasError",
})<{ hasError?: boolean }>(({ theme, hasError }) => ({
  color: hasError ? theme.palette.error.main : theme.palette.primary.light,
  "& .MuiSlider-thumb": {
    height: 24,
    width: 24,
    "&:hover, &.Mui-focusVisible": {
      boxShadow: hasError
        ? `0 0 0 8px ${alpha(theme.palette.error.main, 0.16)}`
        : `0 0 0 8px ${alpha(theme.palette.primary.light, 0.16)}`,
    },
  },
  "& .MuiSlider-track": {
    height: 4,
  },
  [theme.breakpoints.down("sm")]: {
    "& .MuiSlider-thumb": {
      height: 20,
      width: 20,
    },
  },
}));

export const ErrorText = styled(Typography)(({ theme }) => ({
  color: theme.palette.error.main,
  fontSize: "12px",
  marginTop: "4px",
  fontFamily: "'Stage Grotesque', sans-serif",
  animation: `${fadeIn} 0.3s ease-in-out`,
  [theme.breakpoints.down("sm")]: {
    fontSize: "11px",
  },
}));

export const FormFields = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  fontFamily: "'Stage Grotesque', sans-serif",
}));

export const StyledTextField = styled(TextField)(({ theme }) => ({
  position: "relative",
  fontFamily: "'Stage Grotesque', sans-serif",
  "& .MuiOutlinedInput-root": {
    backgroundColor: theme.palette.common.white, // Fondo blanco
    borderRadius: "50px",
    transition: "all 0.3s ease-in-out",
    "& fieldset": {
      border: "none",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    },
    "& input, & select": {
      color: theme.palette.common.black, // Texto negro
      "&::placeholder": {
        color: theme.palette.text.secondary,
        opacity: 1,
      },
      "&:-webkit-autofill, &:-webkit-autofill:hover, &:-webkit-autofill:focus":
        {
          WebkitBoxShadow: `0 0 0 30px ${theme.palette.common.white} inset !important`,
          WebkitTextFillColor: `${theme.palette.common.black} !important`, // Texto negro para autofill
          transition: "background-color 5000s ease-in-out 0s",
        },
    },
    "&.Mui-error": {
      animation: `${shake} 0.5s ease-in-out`,
      backgroundColor: theme.palette.common.white,
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: theme.palette.error.main,
      },
    },
    "&.Mui-success": {
      backgroundColor: theme.palette.common.white,
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: theme.palette.success.main,
      },
    },
    [theme.breakpoints.down("sm")]: {
      height: "48px",
    },
  },
  "& .MuiInputLabel-root": {
    color: theme.palette.common.black, // Etiqueta negra
    fontFamily: "'Stage Grotesque', sans-serif",
    transition: "all 0.3s ease-in-out",
    "&.Mui-focused": {
      color: theme.palette.common.black, // Etiqueta enfocada negra
    },
    "&.Mui-error": {
      color: theme.palette.error.main,
      animation: `${fadeIn} 0.3s ease-in-out`,
    },
    "&.Mui-success": {
      color: theme.palette.success.main,
      animation: `${fadeIn} 0.3s ease-in-out`,
    },
    transform: "translate(14px, 16px) scale(1)",
    "&.MuiInputLabel-shrink": {
      transform: "translate(14px, -6px) scale(0.75)",
      background: theme.palette.common.white,
      padding: "0 8px",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "14px",
    },
  },
  "& .MuiFormHelperText-root": {
    color: theme.palette.error.main,
    marginLeft: "16px",
    fontFamily: "'Stage Grotesque', sans-serif",
    animation: `${fadeIn} 0.3s ease-in-out`,
    "&.Mui-success": {
      color: theme.palette.success.main,
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "11px",
      marginLeft: "12px",
    },
  },
  "& .MuiSelect-select": {
    color: theme.palette.common.black, // Texto de selección negro
    fontFamily: "'Stage Grotesque', sans-serif",
  },
  "& .success-icon": {
    position: "absolute",
    right: "14px",
    top: "50%",
    transform: "translateY(-50%)",
    color: theme.palette.success.main,
    display: "none",
    animation: `${checkmark} 0.3s ease-in-out`,
    ".Mui-success &": {
      display: "block",
    },
    [theme.breakpoints.down("sm")]: {
      right: "12px",
    },
  },
}));

export const SubmitButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  borderRadius: "50px",
  padding: "16px",
  fontSize: "18px",

  fontFamily: "'Stage Grotesque', sans-serif",
  marginTop: "24px",
  [theme.breakpoints.down("sm")]: {
    padding: "14px",
    fontSize: "16px",
    marginTop: "20px",
  },
}));
