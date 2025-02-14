import { useState } from "react";
import { ArrowBack, RestartAlt, LockReset, SyncAlt } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { routesWebpage } from "@/webpage/components/contants/routes";
import { useAuth } from "@/src/core/hooks/api/useAuth";
import { usePassword } from "@/src/core/hooks/api/use-password";
import { useUserProfile } from "@/src/core/hooks/api/use-user-profile";
import { toast } from "react-hot-toast";
import {
  BackButton,
  RecoverWrapper,
  RecoverContainer,
  RecoverTitle,
  RecoverSubtitle,
  StyledTextField,
  RecoverButton,
  RecoveryButton, 
  RecoverFormData,
  FormErrors,
} from "@/components/login/components/styles/constpassword";
import { Box, CircularProgress } from "@mui/material";

type RecoveryType = "password" | "user" | "both";

const RecuperarPassword = () => {
  const navigate = useNavigate();
  const { loading: authLoading } = useAuth();
  const { recoverPassword, loading: passwordLoading } = usePassword();
  const { recoverUser, loading: userLoading } = useUserProfile();
  const [recoveryType, setRecoveryType] = useState<RecoveryType | "">("");
  const [formData, setFormData] = useState<RecoverFormData>({
    email: "",
    cedula: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const loading = authLoading || passwordLoading || userLoading;

  const handleTypeSelection = (type: RecoveryType) => {
    setRecoveryType(type);
    setFormData({ email: "", cedula: "" });
    setErrors({});
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
   
    try {
      switch (recoveryType) {
        case "password":
          const passwordResponse = await recoverPassword(formData.email);
          if (passwordResponse) {
            toast.success("Se ha enviado una contraseña temporal a tu correo electrónico. Úsala para iniciar sesión y establecer una nueva contraseña.", {
              duration: 6000
            });
            navigate(routesWebpage.login);
          }
          break;
   
          case "user":
            const userResponse = await recoverUser(formData.cedula);
            if (userResponse) {
              toast.success("Se ha enviado la información a tu correo registrado");
              navigate(routesWebpage.login);
            }
            break;
   
        case "both":
          const [recoverPwdRes, recoverUserRes] = await Promise.all([
            recoverPassword(formData.email),
            recoverUser(formData.cedula)
          ]);
          
          if (recoverPwdRes && recoverUserRes) {
            toast.success("Se ha enviado la información a tu correo registrado");
            navigate(routesWebpage.login);
          }
          break;
   
        default:
          toast.error("Selecciona un tipo de recuperación");
          return;
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 
                          error.message || 
                          "Ocurrió un error. Por favor intenta nuevamente";
      
      if (error.response?.status === 429) {
        toast.error("Demasiados intentos. Por favor espera unos minutos antes de intentar nuevamente.", {
          duration: 8000
        });
      } else {
        toast.error(errorMessage);
      }
    }
   };

  const validateFields = (): boolean => {
    if (recoveryType === "password" && !formData.email) return false;
    if (recoveryType === "user" && !formData.cedula) return false;
    if (recoveryType === "both" && (!formData.email || !formData.cedula)) return false;
    return true;
  };

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
            <RecoveryButton
              onClick={() => handleTypeSelection("password")}
              className={recoveryType === "password" ? "selected" : ""}
            >
              <LockReset />
              Recuperar Contraseña
            </RecoveryButton>
            
            <RecoveryButton
              onClick={() => handleTypeSelection("user")}
              className={recoveryType === "user" ? "selected" : ""}
            >
              <RestartAlt />
              Recuperar Usuario
            </RecoveryButton>
            
            <RecoveryButton
              onClick={() => handleTypeSelection("both")}
              className={recoveryType === "both" ? "selected" : ""}
            >
              <SyncAlt />
              Recuperar Ambos
            </RecoveryButton>
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
            disabled={loading || !validateFields()}
          >
            {loading ? (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, justifyContent: "center" }}>
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

export default RecuperarPassword;