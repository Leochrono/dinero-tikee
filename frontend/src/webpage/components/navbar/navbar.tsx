import React from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Box, Menu, MenuItem } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ArticleIcon from "@mui/icons-material/Article";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useGlobalAuth } from "@/src/core/context/authContext";
import SocialButton from "./socialButton";
import Logo from "../logo/logo";
import { routesWebpage } from "@/webpage/components/contants/routes";
import {
  StyledAppBar,
  StyledToolbar,
  LogoContainer,
  NavLinksContainer,
} from "./style/constNavbar";

interface NavItem {
  icon: React.ElementType;
  label: string;
  path: string;
}

const baseNavItems: NavItem[] = [
  {
    icon: HomeIcon,
    label: "Inicio",
    path: routesWebpage.inicio,
  },
  {
    icon: AttachMoneyIcon,
    label: "Créditos",
    path: routesWebpage.creditos,
  },
  {
    icon: ArticleIcon,
    label: "Blog",
    path: routesWebpage.blog,
  },
];

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useGlobalAuth();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    if (isAuthenticated) {
      setAnchorEl(event.currentTarget);
    } else {
      navigate(routesWebpage.login);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    logout();
  };

  const handleProfileNavigation = () => {
    handleClose();
    navigate(routesWebpage.perfil);
  };

  const profileLabel =
    isAuthenticated && user
      ? `${user.nombres.split(" ")[0]} ${user.apellidos.split(" ")[0]}`
      : "Perfil";

  return (
    <StyledAppBar>
      <StyledToolbar>
        <LogoContainer>
          <Logo />
        </LogoContainer>
        <NavLinksContainer>
          {baseNavItems.map((item) => (
            <SocialButton
              key={item.path}
              icon={item.icon}
              label={item.label}
              to={item.path}
            />
          ))}
          {isAuthenticated ? (
            <>
              <SocialButton
                key="profile"
                icon={PersonOutlineIcon}
                label={profileLabel}
                onClick={handleProfileClick}
              />
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                PaperProps={{
                  sx: {
                    backgroundColor: "secondary.main",
                    color: "common.white",
                  },
                }}
              >
                <MenuItem onClick={handleProfileNavigation}>
                  <PersonOutlineIcon sx={{ mr: 1 }} />
                  Perfil
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <ExitToAppIcon sx={{ mr: 1 }} />
                  Cerrar Sesión
                </MenuItem>
              </Menu>
            </>
          ) : (
            <SocialButton
              key="login"
              icon={PersonOutlineIcon}
              label="Perfil"
              to={routesWebpage.login}
            />
          )}
        </NavLinksContainer>
      </StyledToolbar>
    </StyledAppBar>
  );
};

export default Navbar;
