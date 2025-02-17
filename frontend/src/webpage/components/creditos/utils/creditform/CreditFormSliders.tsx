import React from "react";
import { Typography } from "@mui/material";
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
}

const CreditFormSliders = ({
  formData,
  formErrors,
  handleSliderChange,
}: CreditFormSlidersProps) => {
  return (
    <SliderGroup>
      <SliderContainer>
        <Typography
          color="white"
          sx={{
            fontFamily: "'Brooklyn', sans-serif",
            fontSize: "16px",
          }}
        >
          Monto:
        </Typography>
        <SliderValue
          sx={{
            fontFamily: "'Galano Grotesque', sans-serif",
            fontWeight: 500,
          }}
        >
          ${formData.amount}
        </SliderValue>
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
        <Typography
          color="white"
          sx={{
            fontFamily: "'Brooklyn', sans-serif",
            fontSize: "16px",
          }}
        >
          Plazo:
        </Typography>
        <SliderValue
          sx={{
            fontFamily: "'Galano Grotesque', sans-serif",
            fontWeight: 500,
          }}
        >
          {formData.term} meses
        </SliderValue>
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
        <Typography
          color="white"
          sx={{
            fontFamily: "'Brooklyn', sans-serif",
            fontSize: "16px",
          }}
        >
          Ingresos:
        </Typography>
        <SliderValue
          sx={{
            fontFamily: "'Galano Grotesque', sans-serif",
            fontWeight: 500,
          }}
        >
          ${formData.income}
        </SliderValue>
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
