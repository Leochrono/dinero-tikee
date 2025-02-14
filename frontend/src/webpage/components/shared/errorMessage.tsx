import { Box, Typography, Button, styled } from "@mui/material";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const ErrorContainer = styled(Box)(({ theme }) => ({
  padding: "40px 20px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "400px",
  backgroundColor: theme.palette.background.default,
}));

const ErrorIcon = styled(ErrorOutlineIcon)(({ theme }) => ({
  color: theme.palette.primary.light,
  fontSize: "64px",
  marginBottom: "24px",
}));

const ErrorTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.common.white,
  fontSize: "24px",
  fontWeight: 700,
  marginBottom: "16px",
  textAlign: "center",
}));

const ErrorText = styled(Typography)(({ theme }) => ({
  color: theme.palette.common.white,
  opacity: 0.8,
  marginBottom: "24px",
  textAlign: "center",
}));

const RetryButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  color: theme.palette.text.secondary,
  padding: "12px 32px",
  borderRadius: "50px",
  fontSize: "16px",
  fontWeight: 700,
  "&:hover": {
    backgroundColor: theme.palette.primary.main,
  },
}));

interface ErrorMessageProps {
  onRetry: () => void;
  title?: string;
  message?: string;
}

const ErrorMessage = ({ 
  onRetry, 
  title = "¡Ups! Algo salió mal",
  message = "No pudimos cargar la información en este momento. Por favor, intenta nuevamente."
}: ErrorMessageProps) => {
  return (
    <ErrorContainer>
      <ErrorIcon />
      <ErrorTitle>{title}</ErrorTitle>
      <ErrorText>
        {message}
      </ErrorText>
      <RetryButton onClick={onRetry}>
        Intentar nuevamente
      </RetryButton>
    </ErrorContainer>
  );
};

export default ErrorMessage;