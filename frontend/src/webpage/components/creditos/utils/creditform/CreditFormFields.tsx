import React from "react";
import { StyledTextField } from "../../styles/creditFormConst";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import {
  CreditFormData,
  FormErrors,
  ValidFields,
} from "../../../../../core/types/types";
import { useTheme } from "@mui/material/styles";

interface CreditFormFieldsProps {
  formData: CreditFormData;
  formErrors: FormErrors;
  handleFieldChange: (
    field: keyof CreditFormData
  ) => (event: React.ChangeEvent<HTMLInputElement>) => void;
  isSubmitted: boolean;
  validFields: ValidFields;
}

const CreditFormFields = ({
  formData,
  formErrors,
  handleFieldChange,
  isSubmitted,
  validFields,
}: CreditFormFieldsProps) => {
  const theme = useTheme(); // Accedemos al tema

  return (
    <>
      <StyledTextField
        select
        fullWidth
        label="Ubicación"
        value={formData.location}
        onChange={handleFieldChange("location")}
        error={isSubmitted && !!formErrors.location}
        helperText={isSubmitted ? formErrors.location : ""}
        SelectProps={{
          native: true,
          displayEmpty: true,
          style: {
            backgroundColor: theme.palette.common.white, // Fondo blanco del tema
          }
        }}
        InputLabelProps={{
          shrink: true,
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            backgroundColor: theme.palette.common.white, // Fondo blanco del tema
          },
          "& .MuiInputLabel-root": {
            color: theme.palette.common.black, // Texto negro del tema
          }
        }}
      >
        <option value="" disabled hidden>
          Seleccione su ubicación
        </option>
        {[
          { value: "quito", label: "Quito" },
          { value: "guayaquil", label: "Guayaquil" },
          { value: "loja", label: "Loja" },
          { value: "cuenca", label: "Cuenca" },
          { value: "esmeraldas", label: "Esmeraldas" },
        ].map((location) => (
          <option key={location.value} value={location.value}>
            {location.label}
          </option>
        ))}
      </StyledTextField>

      <StyledTextField
        fullWidth
        label="Cédula"
        value={formData.document}
        onChange={handleFieldChange("document")}
        error={isSubmitted && !!formErrors.document}
        helperText={isSubmitted ? formErrors.document : ""}
        placeholder="Ingrese su número de cédula"
        InputProps={{
          endAdornment: validFields.document && (
            <CheckCircleOutlineIcon color="success" />
          ),
          style: {
            backgroundColor: theme.palette.common.white, // Fondo blanco del tema
          }
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            backgroundColor: theme.palette.common.white, // Fondo blanco del tema
          },
          "& .MuiInputLabel-root": {
            color: theme.palette.common.black, // Texto negro del tema
          }
        }}
      />

      <StyledTextField
        fullWidth
        label="Mail"
        type="email"
        value={formData.email}
        onChange={handleFieldChange("email")}
        error={isSubmitted && !!formErrors.email}
        helperText={isSubmitted ? formErrors.email : ""}
        placeholder="ejemplo@correo.com"
        InputProps={{
          endAdornment: validFields.email && (
            <CheckCircleOutlineIcon color="success" />
          ),
          style: {
            backgroundColor: theme.palette.common.white, // Fondo blanco del tema
          }
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            backgroundColor: theme.palette.common.white, // Fondo blanco del tema
          },
          "& .MuiInputLabel-root": {
            color: theme.palette.common.black, // Texto negro del tema
          }
        }}
      />
    </>
  );
};

export default CreditFormFields;