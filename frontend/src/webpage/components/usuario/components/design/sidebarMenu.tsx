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
} from '@mui/icons-material';
import { Box } from '@mui/material';
import { routesWebpage } from '@/webpage/components/contants/routes';
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

  const menuItems = [
    { id: 'home', icon: HomeIcon, label: 'Inicio', path: routesWebpage.perfil },
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
              <img src="/logo.png" alt="Logo" />
              <span className="logo-text">Mi App</span>
            </SidebarLogo>
          )}
          <Box 
            className="toggle-button"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </Box>
        </SidebarHeader>

        <SidebarContent>
          {menuItems.map(({ id, icon: Icon, label, path }) => (
            <SidebarItem
              key={id}
              className={location.pathname === path ? 'active' : ''}
              onClick={() => handleNavigation(path)}
            >
              <Icon className="icon" />
              {(expanded || mobileOpen) && <span className="label">{label}</span>}
            </SidebarItem>
          ))}
        </SidebarContent>
      </SidebarContainer>

      <MainContent className={expanded ? 'expanded' : 'collapsed'}>
        {children}
      </MainContent>
    </MainContentWrapper>
  );
};

export default SidebarMenu;