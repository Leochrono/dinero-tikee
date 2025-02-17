import React from "react";
import {
  Typography,
  InputAdornment,
  IconButton,
  Box,
  CircularProgress,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { routesWebpage } from "@/webpage/components/contants/routes";

import {
  BackButton,
  LoginWrapper,
  LoginContainer,
  LoginTitle,
  LoginSubtitle,
  StyledTextField,
  LoginButton,
  ActionLinks,
} from "./components/styles/constlogin";

import Navbar from "../navbar/navbar";
import { useLogin } from "./components/utils/login/useLogin";

const Login: React.FC = () => {
  const {
    formData,
    showPassword,
    loading,
    error,
    isLoading,
    handleChange,
    handleSubmit,
    handleTogglePassword,
    navigateToRecovery,
    navigateToRegister,
  } = useLogin();
  const navigate = useNavigate();

  if (isLoading) {
    return null;
  }

  return (
    <>
      <Navbar />
      <LoginWrapper>
        <BackButton onClick={() => navigate(routesWebpage.inicio)} />
        <LoginContainer>
          <form onSubmit={handleSubmit}>
            <LoginTitle>Bienvenido</LoginTitle>
            <LoginSubtitle>
              Ingresa tus credenciales para acceder a tu cuenta
            </LoginSubtitle>

            {error && (
              <Typography
                color="error"
                sx={{
                  marginBottom: 2,
                  textAlign: "center",
                  backgroundColor: "rgba(211, 47, 47, 0.1)",
                  padding: "8px",
                  borderRadius: "4px",
                }}
              >
                {error}
              </Typography>
            )}

            <StyledTextField
              fullWidth
              label="Correo electrónico"
              variant="outlined"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="email"
            />

            <StyledTextField
              fullWidth
              label="Contraseña"
              variant="outlined"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              required
              autoComplete="current-password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleTogglePassword}
                      edge="end"
                      sx={{ color: "white" }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <LoginButton
              type="submit"
              variant="contained"
              fullWidth
              disableElevation
              disabled={!formData.email || !formData.password || loading}
            >
              {loading ? (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 1,
                  }}
                >
                  <CircularProgress
                    size={20}
                    color="inherit"
                    sx={{ color: "white" }}
                  />
                  <span>INGRESANDO...</span>
                </Box>
              ) : (
                "INGRESAR"
              )}
            </LoginButton>

            <ActionLinks>
              <Typography
                variant="body2"
                sx={{ cursor: "pointer" }}
                onClick={navigateToRecovery}
              >
                ¿Problemas de inicio de sesión?
              </Typography>
              <Typography
                variant="body2"
                sx={{ cursor: "pointer" }}
                onClick={navigateToRegister}
              >
                Crear cuenta
              </Typography>
            </ActionLinks>
          </form>
        </LoginContainer>
      </LoginWrapper>
    </>
  );
};

export default Login;
