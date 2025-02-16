import React from 'react';
import { Box, CircularProgress } from "@mui/material";
import { RegisterButton } from "@/components/login/components/styles/constregistro";
import { FormErrors } from "@/src/core/types/registerTypes";

interface RegisterSubmitButtonProps {
  isLoading: boolean;
  errors: FormErrors;
}

export const RegisterSubmitButton: React.FC<RegisterSubmitButtonProps> = ({
  isLoading,
  errors
}) => {
  const hasErrors = Object.values(errors).some(error => error !== undefined);

  return (
    <RegisterButton
      type="submit"
      variant="contained"
      fullWidth
      disableElevation
      disabled={
        isLoading ||
        hasErrors
      }
    >
      {isLoading ? (
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
  );
};