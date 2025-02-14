import React from "react";
import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

interface SocialButtonProps {
  icon: React.ElementType;
  label: string;
  to?: string;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  disabled?: boolean;
}

const StyledButton = styled(Box)<{ disabled?: boolean }>(
  ({ theme, disabled }) => ({
    display: "flex",
    alignItems: "center",
    gap: "8px",
    color: theme.palette.common.white,
    fontSize: "14px",
    opacity: disabled ? 0.5 : 0.9,
    cursor: disabled ? "default" : "pointer",
    pointerEvents: disabled ? "none" : "auto",
    padding: "8px",
    borderRadius: theme.shape.borderRadius,
    transition: "all 0.3s ease",
    "& svg": {
      fontSize: "24px",
      color: theme.palette.common.white,
      transition: "color 0.3s ease",
    },
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      gap: "4px",
      padding: "8px",
      width: "60px",
      "& svg": {
        fontSize: "24px",
      },
    },
  })
);

const StyledLink = styled(Link)<{ disabled?: boolean }>(({ disabled }) => ({
  textDecoration: "none",
  color: "inherit",
  display: "block",
  cursor: disabled ? "default" : "pointer",
}));

const NavText = styled(Typography)(({ theme }) => ({
  fontSize: "16px",
  fontWeight: 500,
  fontFamily: "'Stage Grotesque', sans-serif",
  color: theme.palette.common.white,
  transition: "color 0.3s ease",
  textAlign: "center",
  [theme.breakpoints.down("md")]: {
    fontSize: "12px",
  },
}));

const SocialButton: React.FC<SocialButtonProps> = ({
  icon: Icon,
  label,
  to,
  onClick,
  disabled = false,
}) => {
  const location = useLocation();
  const isActive = to ? location.pathname === to : false;
  
  const buttonContent = (
    <StyledButton
      disabled={disabled}
      className={`${isActive ? "active" : ""} nav-button-hover`}
      sx={{
        color: isActive ? theme => theme.palette.custom.green.neon : "inherit",
      }}
    >
      <Icon className="MuiSvgIcon-root" />
      <NavText className="nav-text">{label}</NavText>
    </StyledButton>
  );

  if (onClick) {
    return (
      <Box onClick={onClick} sx={{ cursor: 'pointer' }}>
        {buttonContent}
      </Box>
    );
  }

  return (
    <StyledLink to={to || ''} disabled={disabled} tabIndex={disabled ? -1 : 0}>
      {buttonContent}
    </StyledLink>
  );
};

export default SocialButton;