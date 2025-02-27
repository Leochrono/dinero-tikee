import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Home as HomeIcon,
  Settings as SettingsIcon,
  ContactSupport as ContactIcon,
  Info as InfoIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Menu as MenuIcon,
  CreditCard as CreditCardIcon,
  AccountCircle as AccountCircleIcon,
  ExitToApp as ExitToAppIcon // Icono para Cerrar Sesión
} from '@mui/icons-material';
import { Box, Tooltip, Divider } from '@mui/material';
import { routesWebpage } from '@/webpage/components/contants/routes';
import { useGlobalAuth } from "@/src/core/context/authContext"; // Importamos el contexto de autenticación
import {
  SidebarContainer,
  SidebarHeader,
  SidebarLogo,
  SidebarContent,
  SidebarItem,
  MainContent,
  MainContentWrapper,
  MobileMenuButton,
  SidebarOverlay
} from '@/webpage/components/usuario/utils/constSidebarMenu';

interface SidebarMenuProps {
  children: React.ReactNode;
}

const SidebarMenu: React.FC<SidebarMenuProps> = ({ children }) => {
  const [expanded, setExpanded] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, isAuthenticated } = useGlobalAuth(); // Obtenemos la función logout del contexto

  const menuItems = [
    { id: 'home', icon: HomeIcon, label: 'Inicio', path: routesWebpage.perfil },
    { id: 'new-credit', icon: CreditCardIcon, label: 'Nuevo Crédito', path: routesWebpage.creditos },
    { id: 'settings', icon: SettingsIcon, label: 'Configuración', path: routesWebpage.configuracion },
    { id: 'contact', icon: ContactIcon, label: 'Contacto', path: routesWebpage.contacto },
    { id: 'about', icon: InfoIcon, label: 'Acerca de', path: routesWebpage.acercaDe }
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    if (window.innerWidth <= 600) {
      setMobileOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate(routesWebpage.inicio);
    if (window.innerWidth <= 600) {
      setMobileOpen(false);
    }
  };

  const toggleMobileMenu = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileOpen && window.innerWidth <= 600) {
        const isClickInsideMenu = (event.target as Element).closest('.sidebar');
        const isClickOnButton = (event.target as Element).closest('.menu-button');
        if (!isClickInsideMenu && !isClickOnButton) {
          setMobileOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [mobileOpen]);

  return (
    <MainContentWrapper>
      <MobileMenuButton
        className={`menu-button ${mobileOpen ? 'menu-open' : ''}`}
        onClick={toggleMobileMenu}
      >
        <MenuIcon />
      </MobileMenuButton>

      {mobileOpen && (
        <SidebarOverlay
          className={mobileOpen ? 'visible' : ''}
          onClick={() => setMobileOpen(false)}
        />
      )}

      <SidebarContainer
        className={`sidebar ${!expanded ? 'collapsed' : ''} ${mobileOpen ? 'mobile-visible' : ''}`}
      >
        <SidebarHeader>
          {expanded && (
            <SidebarLogo>
              <img src="/assets/logo.png" alt="Dinero al Vuelo" />
              <span className="logo-text">Dinero al Vuelo</span>
            </SidebarLogo>
          )}
          <Box
            className="toggle-button"
            onClick={() => setExpanded(!expanded)}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              color: 'white',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
              }
            }}
          >
            {expanded ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </Box>
        </SidebarHeader>

        <SidebarContent>
          {menuItems.map(({ id, icon: Icon, label, path }) => (
            expanded ? (
              <SidebarItem
                key={id}
                className={location.pathname === path ? 'active' : ''}
                onClick={() => handleNavigation(path)}
              >
                <Icon className="icon" />
                <span className="label">{label}</span>
              </SidebarItem>
            ) : (
              <Tooltip 
                key={id} 
                title={label} 
                placement="right"
                arrow
              >
                <SidebarItem
                  className={location.pathname === path ? 'active' : ''}
                  onClick={() => handleNavigation(path)}
                  sx={{
                    justifyContent: 'center',
                    padding: '12px',
                    '& .icon': {
                      margin: 0
                    }
                  }}
                >
                  <Icon className="icon" />
                </SidebarItem>
              </Tooltip>
            )
          ))}
          
          {/* Separador para perfil y logout */}
          <Box 
            sx={{ 
              mt: 'auto', 
              pt: 2, 
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}
          >
            {/* Perfil */}
            {expanded ? (
              <SidebarItem 
                onClick={() => handleNavigation(routesWebpage.perfil)}
                className={location.pathname === routesWebpage.perfil ? 'active' : ''}
              >
                <AccountCircleIcon className="icon" />
                <span className="label">Mi Perfil</span>
              </SidebarItem>
            ) : (
              <Tooltip title="Mi Perfil" placement="right" arrow>
                <SidebarItem 
                  onClick={() => handleNavigation(routesWebpage.perfil)}
                  className={location.pathname === routesWebpage.perfil ? 'active' : ''}
                  sx={{
                    justifyContent: 'center',
                    padding: '12px',
                    '& .icon': {
                      margin: 0
                    }
                  }}
                >
                  <AccountCircleIcon className="icon" />
                </SidebarItem>
              </Tooltip>
            )}
            
            {/* Botón de Cerrar Sesión - Solo mostrar si está autenticado */}
            {isAuthenticated && (
              expanded ? (
                <SidebarItem 
                  onClick={handleLogout}
                  sx={{
                    color: '#ff5252', // Color rojo para indicar acción de salida
                    '&:hover': {
                      backgroundColor: 'rgba(255, 82, 82, 0.1)', // Fondo rojo con transparencia al pasar el mouse
                    }
                  }}
                >
                  <ExitToAppIcon className="icon" />
                  <span className="label">Cerrar Sesión</span>
                </SidebarItem>
              ) : (
                <Tooltip title="Cerrar Sesión" placement="right" arrow>
                  <SidebarItem 
                    onClick={handleLogout}
                    sx={{
                      justifyContent: 'center',
                      padding: '12px',
                      '& .icon': {
                        margin: 0,
                        color: '#ff5252' // Color rojo para el icono
                      },
                      '&:hover': {
                        backgroundColor: 'rgba(255, 82, 82, 0.1)', // Fondo rojo con transparencia al pasar el mouse
                      }
                    }}
                  >
                    <ExitToAppIcon className="icon" />
                  </SidebarItem>
                </Tooltip>
              )
            )}
          </Box>
        </SidebarContent>
      </SidebarContainer>

      <MainContent className={expanded ? 'expanded' : 'collapsed'}>
        {children}
      </MainContent>
    </MainContentWrapper>
  );
};

export default SidebarMenu;