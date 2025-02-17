import { AppBar, Toolbar, Box, styled } from "@mui/material";

export const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: "transparent",
  boxShadow: "none",
  marginTop: "80px",
  position: "absolute",
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: 0,
    left: "150px",
    right: "150px",
    height: "2px",
    backgroundColor: theme.palette.custom.green.neon,
    [theme.breakpoints.down("lg")]: {
      left: "100px",
      right: "100px",
    },
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
  [theme.breakpoints.down("md")]: {
    margin: 0,
    position: "fixed",
    bottom: 0,
    top: "auto",
    backgroundColor: theme.palette.custom.blue.background,
    width: "100%",
    zIndex: 1300,
  },
}));

export const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  height: "90px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  maxWidth: "1440px",
  margin: "0 auto",
  width: "100%",
  padding: "0 200px",
  [theme.breakpoints.down("lg")]: {
    padding: "0 100px",
  },
  [theme.breakpoints.down("md")]: {
    padding: "8px 0",
    height: "auto",
    minHeight: "unset",
  },
}));

export const LogoContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

export const NavLinksContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "16px",
  [theme.breakpoints.down("md")]: {
    width: "100%",
    justifyContent: "space-around",
    gap: 0,
    margin: 0,
  },
}));
