import React, { useState } from "react";
import {
  Typography,
  Box,
  TextField,
  InputAdornment,
  Alert,
} from "@mui/material";
import {
  SliderGroup,
  SliderContainer,
  SliderValue,
  StyledSlider,
  ErrorText,
} from "../../styles/creditFormConst";
import { CreditFormData, FormErrors } from "../../../../../core/types/types";

interface CreditFormSlidersProps {
  formData: CreditFormData;
  formErrors: FormErrors;
  handleSliderChange: (
    field: keyof CreditFormData
  ) => (event: Event, value: number | number[]) => void;
  handleInputChange: (
    field: keyof CreditFormData
  ) => (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CreditFormSliders = ({
  formData,
  formErrors,
  handleSliderChange,
  handleInputChange,
}: CreditFormSlidersProps) => {
  const [showAlert, setShowAlert] = useState({
    amount: false,
    term: false,
    income: false,
  });

  // Función para verificar valores al perder el foco
  const handleBlur = (field: keyof CreditFormData) => () => {
    let showWarning = false;

    if (
      field === "amount" &&
      (isNaN(formData.amount) || formData.amount < 2000)
    ) {
      showWarning = true;
    } else if (
      field === "term" &&
      (isNaN(formData.term) || formData.term < 6)
    ) {
      showWarning = true;
    } else if (
      field === "income" &&
      (isNaN(formData.income) || formData.income < 500)
    ) {
      showWarning = true;
    }

    setShowAlert((prev) => ({
      ...prev,
      [field]: showWarning,
    }));
  };

  // Función para ocultar la alerta al enfocar el campo
  const handleFocus = (field: keyof CreditFormData) => () => {
    setShowAlert((prev) => ({
      ...prev,
      [field]: false,
    }));
  };

  return (
    <SliderGroup>
      <SliderContainer>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            color="white"
            sx={{
              fontFamily: "'Brooklyn', sans-serif",
              fontSize: "16px",
            }}
          >
            Monto:
          </Typography>
          <TextField
            value={formData.amount}
            onChange={handleInputChange("amount")}
            onBlur={handleBlur("amount")}
            onFocus={handleFocus("amount")}
            variant="outlined"
            size="small"
            type="number"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
              sx: {
                bgcolor: "rgba(255, 255, 255, 0.1)",
                borderRadius: "8px",
                color: "white",
                width: "120px",
                height: "36px",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(255, 255, 255, 0.2)",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "primary.light",
                },
                "& input": {
                  color: "white",
                  textAlign: "right",
                  fontFamily: "'Galano Grotesque', sans-serif",
                  fontWeight: 500,
                  padding: "8px 4px",
                },
              },
            }}
            inputProps={{
              sx: {
                "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
                  WebkitAppearance: "none",
                  margin: 0,
                },
                "&[type=number]": {
                  MozAppearance: "textfield",
                },
              },
            }}
          />
        </Box>
        {showAlert.amount && (
          <Alert severity="info" sx={{ mt: 1, fontSize: "12px", py: 0 }}>
            El monto mínimo es $2,000
          </Alert>
        )}
        <StyledSlider
          value={isNaN(formData.amount) ? 2000 : formData.amount}
          onChange={handleSliderChange("amount")}
          min={2000}
          max={30000}
          step={100}
          hasError={!!formErrors.amount}
        />
        {formErrors.amount && <ErrorText>{formErrors.amount}</ErrorText>}
      </SliderContainer>

      <SliderContainer>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            color="white"
            sx={{
              fontFamily: "'Brooklyn', sans-serif",
              fontSize: "16px",
            }}
          >
            Plazo:
          </Typography>
          <TextField
            value={formData.term}
            onChange={handleInputChange("term")}
            onBlur={handleBlur("term")}
            onFocus={handleFocus("term")}
            variant="outlined"
            size="small"
            type="number"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">meses</InputAdornment>
              ),
              sx: {
                bgcolor: "rgba(255, 255, 255, 0.1)",
                borderRadius: "8px",
                color: "white",
                width: "120px",
                height: "36px",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(255, 255, 255, 0.2)",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "primary.light",
                },
                "& input": {
                  color: "white",
                  textAlign: "right",
                  fontFamily: "'Galano Grotesque', sans-serif",
                  fontWeight: 500,
                  padding: "8px 0px 8px 4px",
                  marginRight: "0", 
                },
                "& .MuiInputAdornment-root": {
                  marginLeft: "2px", 
                  "& p": {
                    color: "white",
                    fontFamily: "'Galano Grotesque', sans-serif",
                  },
                },
              },
            }}
            inputProps={{
              sx: {
                "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
                  WebkitAppearance: "none",
                  margin: 0,
                },
                "&[type=number]": {
                  MozAppearance: "textfield",
                },
              },
            }}
          />
        </Box>
        {showAlert.term && (
          <Alert severity="info" sx={{ mt: 1, fontSize: "12px", py: 0 }}>
            El plazo mínimo es 6 meses
          </Alert>
        )}
        <StyledSlider
          value={isNaN(formData.term) ? 6 : formData.term}
          onChange={handleSliderChange("term")}
          min={6}
          max={64}
          step={6}
          hasError={!!formErrors.term}
        />
        {formErrors.term && <ErrorText>{formErrors.term}</ErrorText>}
      </SliderContainer>

      <SliderContainer>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            color="white"
            sx={{
              fontFamily: "'Brooklyn', sans-serif",
              fontSize: "16px",
            }}
          >
            Ingresos:
          </Typography>
          <TextField
            value={formData.income}
            onChange={handleInputChange("income")}
            onBlur={handleBlur("income")}
            onFocus={handleFocus("income")}
            variant="outlined"
            size="small"
            type="number"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
              sx: {
                bgcolor: "rgba(255, 255, 255, 0.1)",
                borderRadius: "8px",
                color: "white",
                width: "120px",
                height: "36px",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(255, 255, 255, 0.2)",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "primary.light",
                },
                "& input": {
                  color: "white",
                  textAlign: "right",
                  fontFamily: "'Galano Grotesque', sans-serif",
                  fontWeight: 500,
                  padding: "8px 4px",
                },
              },
            }}
            inputProps={{
              sx: {
                "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
                  WebkitAppearance: "none",
                  margin: 0,
                },
                "&[type=number]": {
                  MozAppearance: "textfield",
                },
              },
            }}
          />
        </Box>
        {showAlert.income && (
          <Alert severity="info" sx={{ mt: 1, fontSize: "12px", py: 0 }}>
            El ingreso mínimo es $500
          </Alert>
        )}
        <StyledSlider
          value={isNaN(formData.income) ? 500 : formData.income}
          onChange={handleSliderChange("income")}
          min={500}
          max={10000}
          step={100}
          hasError={!!formErrors.income}
        />
        {formErrors.income && <ErrorText>{formErrors.income}</ErrorText>}
      </SliderContainer>
    </SliderGroup>
  );
};

export default CreditFormSliders;
