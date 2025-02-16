import {
  Box,
  Typography,
  IconButton,
  InputAdornment,
  CircularProgress,
  Dialog,
  DialogContent,
} from "@mui/material";
import { useState, useEffect } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import CloseIcon from '@mui/icons-material/Close';
import { useLoginModal } from "@/src/core/hooks/api/useLoginModal";
import { useGlobalAuth } from "@/src/core/context/authContext"; 
import {
  LoginContainer,
  LoginTitle,
  LoginSubtitle,
  StyledTextField,
  LoginButton,
  ActionLinks,
} from "../styles/constlogin";
import { styled } from '@mui/material/styles';
import { routesWebpage } from "@/components/contants/routes";
import { toast } from 'react-toastify';

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
  onLoginSuccess?: () => void;
}

const CloseButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  right: '10px',
  top: '10px',
  color: theme.palette.common.white,
}));

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    backgroundColor: 'transparent',
    boxShadow: 'none',
    width: '100%',
    maxWidth: '450px',
    margin: '20px',
  }
}));

const ModalLoginContainer = styled(LoginContainer)({
  margin: 0,
  width: '100%',
  maxHeight: '90vh',
  overflow: 'auto',
  padding: '40px 30px',
});

const MessageTypography = styled(Typography)({
  color: 'white',
  textAlign: 'center',
  marginBottom: '20px',
  fontSize: '14px',
});

const LoginModal = ({ open, onClose, onLoginSuccess }: LoginModalProps) => {
  const globalAuth = useGlobalAuth(); // Get global auth context
  const { login, loading, error, setError, navigateToPublic } = useLoginModal(onLoginSuccess);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error, setError]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return;
    }
  
    try {
      // Use global login method to ensure context update
      const success = await globalAuth.login(formData.email, formData.password, false);
      
      if (success) {
        // Recargar la página después del inicio de sesión exitoso
        window.location.reload();
        
        handleClose();
        toast.success('¡Bienvenido!', {
          autoClose: 3000,
          position: 'top-right'
        });
      } else {
        setFormData(prev => ({
          ...prev,
          password: "",
        }));
        toast.error('Usuario o contraseña incorrectos', {
          autoClose: 4000,
          position: 'top-right'
        });
      }
    } catch (err) {
      console.error("Error en inicio de sesión:", err);
      setFormData(prev => ({
        ...prev,
        password: "",
      }));
      toast.error('Hubo un error al intentar iniciar sesión', {
        autoClose: 4000,
        position: 'top-right'
      });
    }
  };

  const handleClose = () => {
    setFormData({ email: "", password: "" });
    setError(null);
    onClose();
  };

  return (
    <StyledDialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogContent>
        <ModalLoginContainer>
          <CloseButton onClick={handleClose}>
            <CloseIcon />
          </CloseButton>
          <form onSubmit={handleSubmit}>
            <LoginTitle>Bienvenido</LoginTitle>
            <LoginSubtitle>
              Ingresa tus credenciales para continuar
            </LoginSubtitle>

            <MessageTypography>
              Debes iniciar sesión para poder continuar con la solicitud de crédito
            </MessageTypography>

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
                      aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
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
                onClick={() => {
                  handleClose();
                  navigateToPublic(routesWebpage.recuperarPassword);
                }}
              >
                ¿Problemas de inicio de sesión?
              </Typography>
              <Typography
                variant="body2"
                sx={{ cursor: "pointer" }}
                onClick={() => {
                  handleClose();
                  navigateToPublic(routesWebpage.registro);
                }}
              >
                Crear cuenta
              </Typography>
            </ActionLinks>
          </form>
        </ModalLoginContainer>
      </DialogContent>
    </StyledDialog>
  );
};

export default LoginModal;