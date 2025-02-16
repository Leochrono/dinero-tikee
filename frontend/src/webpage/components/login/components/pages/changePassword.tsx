import { useState } from "react";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import { routesWebpage } from "@/webpage/components/contants/routes";
import { Box, CircularProgress } from "@mui/material";
import { toast } from 'react-hot-toast';
import {
  BackButton,
  RecoverWrapper,
  RecoverContainer,
  RecoverTitle,
  RecoverSubtitle,
  RecoverButton,
  StyledTextField,
} from "../styles/constpassword";
import { usePassword } from "@/src/core/hooks/api/use-password";
import { validatePassword } from "../utils/changePassword.tsx/validatePassword";
import { usePasswordVisibility } from "../utils/changePassword.tsx/usePasswordVisibility";
import { PasswordField } from "../utils/changePassword.tsx/passwordField";

const ChangePassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { changePassword, loading } = usePassword();
  const { showPassword, togglePasswordVisibility } = usePasswordVisibility();
  const { showPassword: showNewPassword, togglePasswordVisibility: toggleNewPasswordVisibility } = usePasswordVisibility();
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    const newErrors = { ...errors };

    if (name === "newPassword") {
      const passwordErrors = validatePassword(value);
      if (passwordErrors.length > 0) {
        newErrors.newPassword = passwordErrors.join('. ');
      } else {
        delete newErrors.newPassword;
      }

      if (formData.confirmPassword && value !== formData.confirmPassword) {
        newErrors.confirmPassword = "Las contraseñas no coinciden";
      } else {
        delete newErrors.confirmPassword;
      }
    }

    if (name === "confirmPassword") {
      if (value !== formData.newPassword) {
        newErrors.confirmPassword = "Las contraseñas no coinciden";
      } else {
        delete newErrors.confirmPassword;
      }
    }

    setErrors(newErrors);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const tempCode = location.state?.tempCode;
    const isRecoveryFlow = location.state?.isRecoveryFlow;

    if (Object.keys(errors).length > 0) return;

    try {
      const reason = isRecoveryFlow ? 'recovery' : (tempCode ? 'temporary_change' : 'user_request');
      
      const success = await changePassword(
        tempCode || formData.currentPassword,
        formData.newPassword,
        reason
      );

      if (!success) return;

      toast.success('Contraseña actualizada exitosamente');
      navigate(routesWebpage.login);
    } catch (error: any) {
      const errorMessage = error?.response?.data?.error || 'Error al cambiar la contraseña';
      setErrors({
        currentPassword: errorMessage
      });
      toast.error(errorMessage);
    }
  };

  return (
    <RecoverWrapper>
      <BackButton onClick={() => navigate(routesWebpage.login)}>
        <ArrowBack />
      </BackButton>
      <RecoverContainer>
        <form onSubmit={handleSubmit}>
          <RecoverTitle>Cambiar Contraseña</RecoverTitle>
          <RecoverSubtitle>
            Por seguridad, necesitas cambiar tu contraseña temporal
          </RecoverSubtitle>

          <PasswordField
            label="Contraseña actual"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
            error={!!errors.currentPassword}
            helperText={errors.currentPassword}
            showPassword={showPassword}
            togglePasswordVisibility={togglePasswordVisibility}
          />

          <PasswordField
            label="Nueva contraseña"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            error={!!errors.newPassword}
            helperText={errors.newPassword}
            showPassword={showNewPassword}
            togglePasswordVisibility={toggleNewPasswordVisibility}
          />

          <StyledTextField
            fullWidth
            label="Confirmar nueva contraseña"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
          />

          <RecoverButton
            type="submit"
            variant="contained"
            fullWidth
            disableElevation
            disabled={loading || Object.keys(errors).length > 0}
          >
            {loading ? (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, justifyContent: "center" }}>
                <CircularProgress size={20} sx={{ color: "white" }} />
                <span>ACTUALIZANDO...</span>
              </Box>
            ) : (
              "CAMBIAR CONTRASEÑA"
            )}
          </RecoverButton>
        </form>
      </RecoverContainer>
    </RecoverWrapper>
  );
};

export default ChangePassword;