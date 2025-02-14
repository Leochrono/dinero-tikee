import { useState, useEffect } from "react";
import { ArrowBack } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import { routesWebpage } from "@/webpage/components/contants/routes";
import { useAuth } from "@/src/core/hooks/api/useAuth";
import { Box, CircularProgress, Typography } from "@mui/material";
import { toast } from "react-hot-toast";
import { verificationService } from "@/src/core/services/verification.service";
import {
  BackButton,
  VerifyWrapper,
  VerifyContainer,
  VerifyTitle,
  VerifySubtitle,
  StyledTextField,
  VerifyButton,
  TimerText,
  VerifyFormData,
  FormErrors,
} from "./styles/constVerify";
import { useUserProfile } from "@/src/core/hooks/api/use-user-profile";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { register } = useUserProfile();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState<VerifyFormData>({
    email: location.state?.email || "",
    verificationCode: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [timeLeft, setTimeLeft] = useState<number>(15 * 60);
  const [isExpired, setIsExpired] = useState(false);
  const [resendCooldown, setResendCooldown] = useState<number>(0);
  const [isResending, setIsResending] = useState(false);

  useEffect(() => {
    if (!location.state?.email) {
      navigate(routesWebpage.registro);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          setIsExpired(true);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [location.state?.email, navigate]);

  useEffect(() => {
    if (resendCooldown > 0) {
      const cooldownTimer = setInterval(() => {
        setResendCooldown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(cooldownTimer);
    }
  }, [resendCooldown]);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const handleResendCode = async () => {
    if (resendCooldown > 0) return;

    try {
      setIsResending(true);
      const response = await verificationService.resendCode(formData.email);

      if (response.success) {
        toast.success("Código reenviado exitosamente");
        setTimeLeft(15 * 60);
        setIsExpired(false);
        setResendCooldown(60);
        setFormData((prev) => ({ ...prev, verificationCode: "" }));
        setErrors({});
      }
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Error al reenviar el código"
      );
    } finally {
      setIsResending(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === "verificationCode") {
      formattedValue = value.toUpperCase();
    }

    setFormData((prev) => ({ ...prev, [name]: formattedValue }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isExpired) {
      toast.error("El código ha expirado. Por favor, solicita uno nuevo.");
      return;
    }

    try {
      setIsLoading(true);
      const verificationResponse = await verificationService.verifyCode(
        formData.email,
        formData.verificationCode
      );

      if (verificationResponse.success) {
        if (location.state?.isRegistration) {
          const registrationData = sessionStorage.getItem("registrationData");

          if (registrationData) {
            const userData = JSON.parse(registrationData);
            await register(userData);
            sessionStorage.removeItem("registrationData");
            toast.success("¡Registro completado exitosamente!");
          }
        }

        navigate(routesWebpage.login);
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Código de verificación inválido o expirado";

      setErrors({
        verificationCode: errorMessage,
      });
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    const confirmBack = window.confirm(
      "¿Estás seguro que deseas volver? Perderás el progreso actual."
    );
    if (confirmBack) {
      sessionStorage.removeItem("registrationData");
      navigate(routesWebpage.registro);
    }
  };

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

          {location.state?.email && (
            <Typography
              variant="body2"
              sx={{
                textAlign: "center",
                marginBottom: 2,
                color: "primary.light",
                fontFamily: "Inter",
              }}
            >
              Email: {location.state.email}
            </Typography>
          )}

          <TimerText
            variant="body1"
            sx={{
              color: isExpired ? "error.main" : "primary.light",
            }}
          >
            Tiempo restante: {formatTime(timeLeft)}
          </TimerText>

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

          <VerifyButton
            type="button"
            variant="outlined"
            fullWidth
            onClick={handleResendCode}
            disabled={resendCooldown > 0 || isResending}
            sx={{ mt: 2 }}
          >
            {isResending ? (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  justifyContent: "center",
                }}
              >
                <CircularProgress size={20} />
                <span>REENVIANDO...</span>
              </Box>
            ) : resendCooldown > 0 ? (
              `REENVIAR CÓDIGO (${resendCooldown}s)`
            ) : (
              "REENVIAR CÓDIGO"
            )}
          </VerifyButton>

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
