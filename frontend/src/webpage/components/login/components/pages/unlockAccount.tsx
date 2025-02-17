import { useState } from "react";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { routesWebpage } from "@/webpage/components/contants/routes";
import { useAuth } from "@/src/core/hooks/api/useAuth";
import { Box, CircularProgress } from "@mui/material";
import { useUserProfile } from "@/src/core/hooks/api/use-user-profile";
import {
  BackButton,
  UnlockWrapper,
  UnlockContainer,
  UnlockTitle,
  UnlockSubtitle,
  StyledTextField,
  UnlockButton,
  UnlockFormData,
  FormErrors,
} from "../styles/constUnlock";

const UnlockAccount = () => {
  const navigate = useNavigate();
  const { unlockAccount, loading } = useUserProfile();
  const [formData, setFormData] = useState<UnlockFormData>({
    email: "",
    unlockCode: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await unlockAccount(formData.email, formData.unlockCode);
      navigate(routesWebpage.login);
    } catch (error) {
      setErrors({
        unlockCode: "Código inválido o expirado",
      });
    }
  };

  return (
    <UnlockWrapper>
      <BackButton onClick={() => navigate(routesWebpage.login)}>
        <ArrowBack />
      </BackButton>
      <UnlockContainer>
        <form onSubmit={handleSubmit}>
          <UnlockTitle>Desbloquear Cuenta</UnlockTitle>
          <UnlockSubtitle>
            Ingresa tu email y el código de desbloqueo
          </UnlockSubtitle>

          <StyledTextField
            fullWidth
            label="Correo electrónico"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
            required
          />

          <StyledTextField
            fullWidth
            label="Código de desbloqueo"
            name="unlockCode"
            value={formData.unlockCode}
            onChange={handleChange}
            error={!!errors.unlockCode}
            helperText={errors.unlockCode}
            required
          />

          <UnlockButton
            type="submit"
            variant="contained"
            fullWidth
            disableElevation
            disabled={loading || !formData.email || !formData.unlockCode}
          >
            {loading ? (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  justifyContent: "center",
                }}
              >
                <CircularProgress size={20} sx={{ color: "white" }} />
                <span>DESBLOQUEANDO...</span>
              </Box>
            ) : (
              "DESBLOQUEAR CUENTA"
            )}
          </UnlockButton>
        </form>
      </UnlockContainer>
    </UnlockWrapper>
  );
};

export default UnlockAccount;
