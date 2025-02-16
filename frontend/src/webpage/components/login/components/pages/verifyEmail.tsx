import React from "react";
import { ArrowBack } from "@mui/icons-material";
import { Box, CircularProgress, Typography } from "@mui/material";

import {
  BackButton,
  VerifyWrapper,
  VerifyContainer,
  VerifyTitle,
  VerifySubtitle,
  StyledTextField,
  VerifyButton,
} from "@/components/login/components/styles/constVerify";

import { useVerifyEmail } from "../utils/verifyEmail/useVerifyEmail";
import { VerificationTimer } from "../utils/verifyEmail/verificationTimer";
import { ResendCodeButton } from "../utils/verifyEmail/resendButtonProps";
import { EmailDisplay } from "../utils/verifyEmail/EmailDisplayProps";

const VerifyEmail: React.FC = () => {
  const {
    formData,
    errors,
    isLoading,
    timeLeft,
    isExpired,
    resendCooldown,
    isResending,
    formatTime,
    handleResendCode,
    handleChange,
    handleSubmit,
    handleBack,
    email,
  } = useVerifyEmail();

  return (
    <VerifyWrapper>
      <BackButton onClick={handleBack}>
        <ArrowBack />
      </BackButton>

      <VerifyContainer>
        <form onSubmit={handleSubmit}>
          <VerifyTitle variant="h1">Verificar Email</VerifyTitle>

          <VerifySubtitle>
            Ingresa el código de verificación enviado a tu correo
          </VerifySubtitle>

          <EmailDisplay email={email} />

          <VerificationTimer 
            timeLeft={timeLeft} 
            isExpired={isExpired} 
            formatTime={formatTime} 
          />

          <StyledTextField
            fullWidth
            label="Código de verificación"
            name="verificationCode"
            value={formData.verificationCode}
            onChange={handleChange}
            error={!!errors.verificationCode}
            helperText={errors.verificationCode}
            required
            inputProps={{
              maxLength: 6,
              style: {
                textTransform: "uppercase",
                textAlign: "center",
                letterSpacing: "0.5em",
              },
            }}
            placeholder="Ingrese el código de 6 caracteres"
          />

          <VerifyButton
            type="submit"
            variant="contained"
            fullWidth
            disableElevation
            disabled={isLoading || !formData.verificationCode || isExpired}
          >
            {isLoading ? (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  justifyContent: "center",
                }}
              >
                <CircularProgress size={20} sx={{ color: "white" }} />
                <span>VERIFICANDO...</span>
              </Box>
            ) : (
              "VERIFICAR EMAIL"
            )}
          </VerifyButton>

          <ResendCodeButton 
            isResending={isResending}
            resendCooldown={resendCooldown}
            handleResendCode={handleResendCode}
          />

          {isExpired && !resendCooldown && (
            <Typography
              color="error"
              sx={{
                mt: 2,
                textAlign: "center",
                fontFamily: "Inter",
              }}
            >
              El código ha expirado. Por favor, solicita uno nuevo.
            </Typography>
          )}
        </form>
      </VerifyContainer>
    </VerifyWrapper>
  );
};

export default VerifyEmail;