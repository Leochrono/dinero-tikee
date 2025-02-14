import {
  Box,
  Typography,
  IconButton,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import { useState } from "react";
import { ArrowBack, Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { routesWebpage } from "@/webpage/components/contants/routes";
import { useAuth } from "@/src/core/hooks/api/useAuth";
import { toast } from "react-hot-toast";
import { validations } from "@/src/utils/validations";
import {
  BackButton,
  RegisterWrapper,
  RegisterContainer,
  RegisterTitle,
  RegisterSubtitle,
  FieldsGrid,
  StyledTextField,
  RegisterButton,
  FormErrors,
  RegisterFormData,
} from "@/components/login/components/styles/constregistro";
import { PasswordStrengthIndicator } from "./tools/PasswordStrengthIndicator";
import { verificationService } from "@/src/core/services/verification.service";
import { useUserProfile } from "@/src/core/hooks/api/use-user-profile";

const Registro = () => {
  const navigate = useNavigate();
  const { register, error } = useUserProfile();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);  // Cambiado de loading a isLoading
  const [formData, setFormData] = useState<RegisterFormData>({
    nombres: "",
    apellidos: "",
    cedula: "",
    email: "", // cambiado de correo
    telefono: "",
    direccion: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    switch (name) {
      case "nombres":
      case "apellidos":
        formattedValue = validations.formatName(value);
        const nameError = validations.validateName(formattedValue);
        if (nameError) {
          setErrors((prev) => ({ ...prev, [name]: nameError }));
        } else {
          setErrors((prev) => ({ ...prev, [name]: undefined }));
        }
        break;

      case "cedula":
        formattedValue = validations.formatCedula(value);
        if (formattedValue.length === 10) {
          if (!validations.validateCedula(formattedValue)) {
            setErrors((prev) => ({ ...prev, cedula: "Cédula inválida" }));
          } else {
            setErrors((prev) => ({ ...prev, cedula: undefined }));
          }
        }
        break;

      case "telefono":
        formattedValue = validations.formatPhone(value);
        if (formattedValue.length === 10) {
          if (!validations.validatePhone(formattedValue)) {
            setErrors((prev) => ({
              ...prev,
              telefono: "Número de teléfono inválido",
            }));
          } else {
            setErrors((prev) => ({ ...prev, telefono: undefined }));
          }
        }
        break;

      case "email": // cambiado de correo
        if (value && !validations.validateEmail(value)) {
          setErrors((prev) => ({
            ...prev,
            email: "Correo electrónico inválido",
          }));
        } else {
          setErrors((prev) => ({ ...prev, email: undefined }));
        }
        break;

      case "password":
        const strength = validations.validatePasswordStrength(value);
        if (strength.strength < 3) {
          setErrors((prev) => ({
            ...prev,
            password: `Contraseña ${strength.messages}`,
          }));
        } else {
          setErrors((prev) => ({ ...prev, password: undefined }));
        }
        if (formData.confirmPassword && value !== formData.confirmPassword) {
          setErrors((prev) => ({
            ...prev,
            confirmPassword: "Las contraseñas no coinciden",
          }));
        } else {
          setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
        }
        break;

      case "confirmPassword":
        if (value !== formData.password) {
          setErrors((prev) => ({
            ...prev,
            confirmPassword: "Las contraseñas no coinciden",
          }));
        } else {
          setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
        }
        break;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: formattedValue,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      // Validaciones iniciales
      const newErrors: FormErrors = {};
  
      // Validar nombres y apellidos
      if (!formData.nombres || !formData.apellidos) {
        newErrors.nombres = "Nombres y apellidos son requeridos";
      }
  
      // Validar cédula
      if (!validations.validateCedula(formData.cedula)) {
        newErrors.cedula = "Cédula inválida";
      }
  
      // Validar teléfono
      if (!validations.validatePhone(formData.telefono)) {
        newErrors.telefono = "Número de teléfono inválido";
      }
  
      // Validar email
      if (!validations.validateEmail(formData.email)) {
        newErrors.email = "Correo electrónico inválido";
      }
  
      // Validar dirección
      if (!formData.direccion) {
        newErrors.direccion = "Dirección es requerida";
      }
  
      // Validar contraseñas
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Las contraseñas no coinciden";
      }
  
      // Si hay errores, mostrarlos y detener el proceso
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        toast.error("Por favor, corrija los errores antes de continuar");
        return;
      }
  
      setIsLoading(true); 
  
      // Preparar datos de registro
      const registrationData = {
        nombres: formData.nombres.trim(),
        apellidos: formData.apellidos.trim(),
        cedula: formData.cedula,
        email: formData.email.toLowerCase(),
        telefono: formData.telefono,
        direccion: formData.direccion.trim(),
        password: formData.password,
      };
  
      // Guardar datos en sessionStorage
      sessionStorage.setItem("registrationData", JSON.stringify(registrationData));
  
      try {
        // Enviar código de verificación
        const verificationResponse = await verificationService.sendVerificationCode(
          registrationData.email,
          `${registrationData.nombres} ${registrationData.apellidos}` // Agregar el nombre completo aquí
        );
  
        if (!verificationResponse.success) {
          throw new Error(verificationResponse.message || "Error al enviar código de verificación");
        }
  
        // Si el envío fue exitoso, navegar a la página de verificación
        navigate(routesWebpage.verificarEmail, {
          state: {
            email: registrationData.email,
            isRegistration: true,
            expiresAt: verificationResponse.data?.expiresAt,
            remainingAttempts: verificationResponse.data?.remainingAttempts ?? 5,
          },
        });
  
      } catch (verificationError: any) {
        // Manejar errores específicos del envío de verificación
        console.error('Error en verificación:', {
          error: verificationError,
          response: verificationError.response,
          status: verificationError.response?.status,
          data: verificationError.response?.data
        });
  
        if (verificationError.response?.status === 500) {
          throw new Error("Error en el servidor. Por favor, intente nuevamente en unos minutos.");
        }
  
        throw verificationError;
      }
  
    } catch (error: any) {
      // Manejar todos los errores posibles
      console.error("Error en registro:", error);
      
      const errorMessage = error.response?.data?.message || 
                          error.message || 
                          "Error en el proceso de registro";
      
      toast.error(errorMessage);
      setErrors({});
  
    } finally {
      setIsLoading(false);
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    if (e.currentTarget.id === "confirmPassword") {
      e.preventDefault();
      toast.error("Por favor, vuelva a escribir la contraseña para confirmar");
    }
  };

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
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        sx={{ color: "white" }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
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
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      edge="end"
                      sx={{ color: "white" }}
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </FieldsGrid>

          <RegisterButton
            type="submit"
            variant="contained"
            fullWidth
            disableElevation
            disabled={
              isLoading || 
              Object.values(errors).some((error) => error !== undefined)
            }
          >
            {isLoading? (
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
                <span>REGISTRANDO...</span>
              </Box>
            ) : (
              "REGISTRARSE"
            )}
          </RegisterButton>
        </form>
      </RegisterContainer>
    </RegisterWrapper>
  );
};

export default Registro;
