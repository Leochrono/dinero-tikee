import React from "react";
import { ArrowBack } from "@mui/icons-material";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { routesWebpage } from "@/webpage/components/contants/routes";
import {
  BackButton,
  RegisterWrapper,
  RegisterContainer,
  RegisterTitle,
  RegisterSubtitle,
  FieldsGrid,
  StyledTextField,
} from "@/components/login/components/styles/constregistro";
import { PasswordStrengthIndicator } from "../tools/PasswordStrengthIndicator";
import { validations } from "@/src/utils/validations";
import { useRegisterForm } from "../utils/register/useRegisterForm";
import { PasswordVisibilityToggle } from "../utils/register/passwordVisibilityToggle";
import { RegisterSubmitButton } from "../utils/register/registerButton";

const RegisterForm: React.FC = () => {
  const {
    formData,
    errors,
    showPassword,
    showConfirmPassword,
    handleChange,
    handleSubmit,
    handlePaste,
    togglePasswordVisibility,
    isLoading,
  } = useRegisterForm();

  const navigate = useNavigate();

  return (
    <RegisterWrapper>
      <BackButton onClick={() => navigate(routesWebpage.login)}>
        <ArrowBack />
      </BackButton>
      <RegisterContainer>
        <form onSubmit={handleSubmit}>
          <RegisterTitle>Crear cuenta</RegisterTitle>
          <RegisterSubtitle>
            Ingresa tus datos para registrarte
          </RegisterSubtitle>

          <FieldsGrid>
            <StyledTextField
              fullWidth
              label="Nombres"
              variant="outlined"
              name="nombres"
              value={formData.nombres}
              onChange={handleChange}
              required
              error={Boolean(errors.nombres)}
              helperText={errors.nombres}
            />

            <StyledTextField
              fullWidth
              label="Apellidos"
              variant="outlined"
              name="apellidos"
              value={formData.apellidos}
              onChange={handleChange}
              required
              error={Boolean(errors.apellidos)}
              helperText={errors.apellidos}
            />

            <StyledTextField
              fullWidth
              label="Cédula"
              variant="outlined"
              name="cedula"
              value={formData.cedula}
              onChange={handleChange}
              required
              error={Boolean(errors.cedula)}
              helperText={errors.cedula}
              inputProps={{
                maxLength: 10,
                pattern: "\\d*",
              }}
            />

            <StyledTextField
              fullWidth
              label="Teléfono"
              variant="outlined"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              required
              error={Boolean(errors.telefono)}
              helperText={errors.telefono}
              inputProps={{
                maxLength: 10,
                pattern: "\\d*",
              }}
            />

            <StyledTextField
              fullWidth
              label="Correo electrónico"
              variant="outlined"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              error={Boolean(errors.email)}
              helperText={errors.email}
              sx={{ gridColumn: "1 / -1" }}
            />

            <StyledTextField
              fullWidth
              label="Dirección"
              variant="outlined"
              name="direccion"
              value={formData.direccion}
              onChange={handleChange}
              required
              error={Boolean(errors.direccion)}
              helperText={errors.direccion}
              sx={{ gridColumn: "1 / -1" }}
            />

            <Box sx={{ width: "100%" }}>
              <StyledTextField
                fullWidth
                label="Contraseña"
                variant="outlined"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                required
                error={Boolean(errors.password)}
                helperText={errors.password}
                InputProps={{
                  endAdornment: (
                    <PasswordVisibilityToggle
                      isVisible={showPassword}
                      onToggle={() => togglePasswordVisibility("password")}
                    />
                  ),
                }}
              />
              {formData.password && (
                <PasswordStrengthIndicator
                  strength={
                    validations.validatePasswordStrength(formData.password)
                      .strength
                  }
                  message={
                    validations.validatePasswordStrength(formData.password)
                      .messages || ""
                  }
                />
              )}
            </Box>

            <StyledTextField
              fullWidth
              label="Confirmar contraseña"
              variant="outlined"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={handleChange}
              onPaste={handlePaste}
              required
              error={Boolean(errors.confirmPassword)}
              helperText={errors.confirmPassword}
              InputProps={{
                endAdornment: (
                  <PasswordVisibilityToggle
                    isVisible={showConfirmPassword}
                    onToggle={() => togglePasswordVisibility("confirmPassword")}
                  />
                ),
              }}
            />
          </FieldsGrid>

          <RegisterSubmitButton isLoading={isLoading} errors={errors} />
        </form>
      </RegisterContainer>
    </RegisterWrapper>
  );
};

export default RegisterForm;
