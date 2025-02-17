import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";
import { Box, CircularProgress } from "@mui/material";

import { routesWebpage } from "@/webpage/components/contants/routes";
import {
  BackButton,
  RecoverWrapper,
  RecoverContainer,
  RecoverTitle,
  RecoverSubtitle,
  StyledTextField,
  RecoverButton,
} from "@/components/login/components/styles/constpassword";

import { useRecovery } from "../utils/recoveryPassword/useRecovery";
import { validateFields } from "../utils/recoveryPassword/validateFields";
import { RecoveryTypeButton } from "../utils/recoveryPassword/recoveryTypeButton";

const RecoveryPassword: React.FC = () => {
  const navigate = useNavigate();
  const {
    recoveryType,
    formData,
    errors,
    loading,
    handleTypeSelection,
    handleChange,
    handleSubmit,
  } = useRecovery();

  return (
    <RecoverWrapper>
      <BackButton onClick={() => navigate(routesWebpage.login)}>
        <ArrowBack />
      </BackButton>
      <RecoverContainer>
        <form onSubmit={handleSubmit}>
          <RecoverTitle>Recupera tu Cuenta</RecoverTitle>
          <RecoverSubtitle>
            Selecciona qué información necesitas recuperar
          </RecoverSubtitle>

          <Box sx={{ mb: 3 }}>
            <RecoveryTypeButton
              type="password"
              currentType={recoveryType}
              onClick={handleTypeSelection}
            />

            <RecoveryTypeButton
              type="user"
              currentType={recoveryType}
              onClick={handleTypeSelection}
            />

            <RecoveryTypeButton
              type="both"
              currentType={recoveryType}
              onClick={handleTypeSelection}
            />
          </Box>

          {(recoveryType === "password" || recoveryType === "both") && (
            <StyledTextField
              fullWidth
              label="Correo electrónico"
              variant="outlined"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              error={Boolean(errors.email)}
              helperText={errors.email}
              autoComplete="email"
            />
          )}

          {(recoveryType === "user" || recoveryType === "both") && (
            <StyledTextField
              fullWidth
              label="Cédula"
              variant="outlined"
              type="text"
              name="cedula"
              value={formData.cedula}
              onChange={handleChange}
              required
              error={Boolean(errors.cedula)}
              helperText={errors.cedula}
              inputProps={{ maxLength: 10 }}
              autoComplete="off"
            />
          )}

          <RecoverButton
            type="submit"
            variant="contained"
            fullWidth
            disableElevation
            disabled={loading || !validateFields(recoveryType, formData)}
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
                <span>ENVIANDO...</span>
              </Box>
            ) : (
              "ENVIAR"
            )}
          </RecoverButton>
        </form>
      </RecoverContainer>
    </RecoverWrapper>
  );
};

export default RecoveryPassword;
