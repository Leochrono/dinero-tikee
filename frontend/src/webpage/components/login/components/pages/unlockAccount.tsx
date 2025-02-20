import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { routesWebpage } from "@/webpage/components/contants/routes";
import { useUnlock } from "@/src/core/hooks/api/useUnlock";
import { Box, CircularProgress } from "@mui/material";
import { UnlockAccountRequest } from "@/src/core/types/unlock.types";
import {
  BackButton,
  UnlockWrapper,
  UnlockContainer,
  UnlockTitle,
  UnlockSubtitle,
  StyledTextField,
  UnlockButton,
} from "../styles/constUnlock";

interface UnlockFormData {
  email: string;
  cedula: string;
  unlockCode: string;
}

interface FormErrors {
  email?: string;
  cedula?: string;
  unlockCode?: string;
}

const UnlockAccount = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { validateUnlockCode, loading, error } = useUnlock();
  
  const [formData, setFormData] = useState<UnlockFormData>(() => ({
    email: location.state?.email || "",
    cedula: location.state?.cedula || "",
    unlockCode: "",
  }));

  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: FormErrors = {};
    
    if (!formData.email.trim()) {
      newErrors.email = "El correo electrónico es obligatorio";
    }
    
    if (!formData.cedula.trim()) {
      newErrors.cedula = "La cédula es obligatoria";
    } else if (!/^\d{10}$/.test(formData.cedula)) {
      newErrors.cedula = "La cédula debe tener 10 dígitos numéricos";
    }
    
    if (!formData.unlockCode.trim()) {
      newErrors.unlockCode = "El código de desbloqueo es obligatorio";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const requestData: UnlockAccountRequest = {
        email: formData.email,
        cedula: formData.cedula,
        unlockCode: formData.unlockCode,
      };

      await validateUnlockCode(requestData);
      navigate(routesWebpage.login);
    } catch (error) {
      setErrors({
        unlockCode: "Credenciales inválidas o código expirado",
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
            Ingresa tus credenciales y el código de desbloqueo
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
            label="Cédula"
            name="cedula"
            value={formData.cedula}
            onChange={handleChange}
            error={!!errors.cedula}
            helperText={errors.cedula}
            required
            inputProps={{
              maxLength: 10,
              pattern: "\\d*"
            }}
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
            disabled={loading || !formData.email || !formData.cedula || !formData.unlockCode}
          >
            {loading ? (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, justifyContent: "center" }}>
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