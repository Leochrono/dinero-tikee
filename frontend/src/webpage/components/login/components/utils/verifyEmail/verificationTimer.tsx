import React from 'react';
import { Typography, TypographyProps } from "@mui/material";
import { TimerText } from "@/components/login/components/styles/constVerify";

interface TimerProps {
  timeLeft: number;
  isExpired: boolean;
  formatTime: (seconds: number) => string;
}

export const VerificationTimer: React.FC<TimerProps> = ({ 
  timeLeft, 
  isExpired, 
  formatTime 
}) => {
  return (
    <TimerText
      variant="body1"
      sx={{
        color: isExpired ? "error.main" : "primary.light",
      }}
    >
      Tiempo restante: {formatTime(timeLeft)}
    </TimerText>
  );
};