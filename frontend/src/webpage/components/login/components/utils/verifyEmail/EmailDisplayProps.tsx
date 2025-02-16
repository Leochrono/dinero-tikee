import React from 'react';
import { Typography } from "@mui/material";

interface EmailDisplayProps {
  email?: string;
}

export const EmailDisplay: React.FC<EmailDisplayProps> = ({ email }) => {
  if (!email) return null;

  return (
    <Typography
      variant="body2"
      sx={{
        textAlign: "center",
        marginBottom: 2,
        color: "primary.light",
        fontFamily: "Inter",
      }}
    >
      Email: {email}
    </Typography>
  );
};