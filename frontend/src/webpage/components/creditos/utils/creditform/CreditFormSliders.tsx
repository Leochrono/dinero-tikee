import React from "react";
import { Typography, Box, TextField, InputAdornment } from "@mui/material";
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
  return (
    <SliderGroup>
      <SliderContainer>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
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
            variant="outlined"
            size="small"
            InputProps={{
              startAdornment: <InputAdornment position="start">$</InputAdornment>,
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
                }
              }
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
              }
            }}
          />
        </Box>
        <StyledSlider
          value={formData.amount}
          onChange={handleSliderChange("amount")}
          min={2000} 
          max={30000}
          step={100}
          hasError={!!formErrors.amount}
        />
        {formErrors.amount && <ErrorText>{formErrors.amount}</ErrorText>}
      </SliderContainer>
      <SliderContainer>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
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
            variant="outlined"
            size="small"
            InputProps={{
              endAdornment: <InputAdornment position="end">meses</InputAdornment>,
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
                }
              }
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
              }
            }}
          />
        </Box>
        <StyledSlider
          value={formData.term}
          onChange={handleSliderChange("term")}
          min={6}
          max={64}
          step={6}
          hasError={!!formErrors.term}
        />
        {formErrors.term && <ErrorText>{formErrors.term}</ErrorText>}
      </SliderContainer>
      <SliderContainer>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
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
            variant="outlined"
            size="small"
            InputProps={{
              startAdornment: <InputAdornment position="start">$</InputAdornment>,
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
                }
              }
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
              }
            }}
          />
        </Box>
        <StyledSlider
          value={formData.income}
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