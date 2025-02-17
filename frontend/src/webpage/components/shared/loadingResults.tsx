import {
  Box,
  CircularProgress,
  Typography,
  styled,
  keyframes,
} from "@mui/material";

const fadeIn = keyframes`
 from {
 opacity: 0;
 }
 to {
 opacity: 1;
 }
`;

const LoadingContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  animation: `${fadeIn} 0.3s ease-in-out`,
}));

const LoadingText = styled(Typography)(({ theme }) => ({
  color: theme.palette.common.white,
  marginLeft: "12px",
  fontSize: "16px",
  fontWeight: 500,
  opacity: 0.9,
}));

const StyledCircularProgress = styled(CircularProgress)(({ theme }) => ({
  color: theme.palette.primary.light,
  width: "24px !important",
  height: "24px !important",
}));

interface LoadingResultsProps {
  text?: string;
}

export const LoadingResults = ({
  text = "Autenticando...",
}: LoadingResultsProps) => {
  return (
    <LoadingContainer>
      <StyledCircularProgress />
      <LoadingText>{text}</LoadingText>
    </LoadingContainer>
  );
};

export default LoadingResults;
