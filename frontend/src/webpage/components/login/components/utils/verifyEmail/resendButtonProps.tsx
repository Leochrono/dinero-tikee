import React from "react";
import { Box, CircularProgress } from "@mui/material";
import { VerifyButton } from "@/components/login/components/styles/constVerify";

interface ResendButtonProps {
  isResending: boolean;
  resendCooldown: number;
  handleResendCode: () => void;
}

export const ResendCodeButton: React.FC<ResendButtonProps> = ({
  isResending,
  resendCooldown,
  handleResendCode,
}) => {
  return (
    <VerifyButton
      type="button"
      variant="outlined"
      fullWidth
      onClick={handleResendCode}
      disabled={resendCooldown > 0 || isResending}
      sx={{ mt: 2 }}
    >
      {isResending ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            justifyContent: "center",
          }}
        >
          <CircularProgress size={20} />
          <span>REENVIANDO...</span>
        </Box>
      ) : resendCooldown > 0 ? (
        `REENVIAR CÓDIGO (${resendCooldown}s)`
      ) : (
        "REENVIAR CÓDIGO"
      )}
    </VerifyButton>
  );
};
