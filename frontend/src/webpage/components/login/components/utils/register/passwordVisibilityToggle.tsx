import React from 'react';
import { IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

interface PasswordVisibilityToggleProps {
  isVisible: boolean;
  onToggle: () => void;
}

export const PasswordVisibilityToggle: React.FC<PasswordVisibilityToggleProps> = ({ 
  isVisible, 
  onToggle 
}) => {
  return (
    <InputAdornment position="end">
      <IconButton
        onClick={onToggle}
        edge="end"
        sx={{ color: "white" }}
      >
        {isVisible ? <VisibilityOff /> : <Visibility />}
      </IconButton>
    </InputAdornment>
  );
};