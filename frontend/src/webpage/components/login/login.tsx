import {
  Box,
  Typography,
  IconButton,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import { useState, useEffect } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { routesWebpage } from "@/webpage/components/contants/routes";
import { useAuth } from "@/src/core/hooks/api/useAuth";
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
import { usePassword } from "@/src/core/hooks/api/use-password";

const Login = () => {
  const navigate = useNavigate();
  const {
    login,
    loading,
    error,
    setError,
    navigateToPublic,
    checkAuth,
    isAuthenticated,
  } = useAuth();
  const { validateRecoveryCode } = usePassword();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Nuevo estado para controlar carga inicial
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [hasRedirected, setHasRedirected] = useState(false); // Bandera para evitar redirección duplicada

  // Limpiar el error después de 3 segundos
  useEffect(() => {
    const initialCheck = async () => {
      try {
        await checkAuth();
      } finally {
        // Retrasamos ligeramente mostrar el formulario para evitar titileo
        setTimeout(() => {
          setIsLoading(false);
        }, 300);
      }
    };
    initialCheck();
  }, []);


  // Redirección basada en el estado de autenticación
  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      const timer = setTimeout(() => {
        navigate(routesWebpage.perfil, { replace: true });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, isLoading, navigate]);

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error) {
      setError(null);
    }
  };

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Evitar recarga de la página
    if (!formData.email || !formData.password) return;

    try {
      // Si es código temporal (6 caracteres alfanuméricos)
      if (formData.password.length === 6 && /^[0-9A-Z]+$/.test(formData.password)) {
        const response = await validateRecoveryCode(formData.email, formData.password);
        console.log("Response from validateRecoveryCode:", response);

        if (response?.success) {
          navigate(routesWebpage.cambiarPassword, {
            state: {
              email: formData.email,
              tempCode: formData.password,
              isRecoveryFlow: true,
            },
            replace: true,
          });
          return;
        }
        setError("Código temporal inválido");
        setFormData((prev) => ({ ...prev, password: "" }));
        return;
      }

      // Login normal
      const loginSuccess = await login(formData.email, formData.password);
      console.log("Login success:", loginSuccess);

      if (loginSuccess) {
        // Verificar nuevamente el estado de autenticación
        const authCheck = await checkAuth();
        console.log("Auth check after login:", authCheck);

        if (authCheck) {
          console.log("User is authenticated, waiting for state update...");
        }
      } else {
        setFormData((prev) => ({ ...prev, password: "" }));
      }
    } catch (err) {
      console.error("Error:", err);
      setFormData((prev) => ({ ...prev, password: "" }));
    }
  };

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
                onClick={() => navigateToPublic(routesWebpage.recuperarPassword)}
              >
                ¿Problemas de inicio de sesión?
              </Typography>
              <Typography
                variant="body2"
                sx={{ cursor: "pointer" }}
                onClick={() => navigateToPublic(routesWebpage.registro)}
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