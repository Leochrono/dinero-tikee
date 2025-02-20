import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Home as HomeIcon,
  Settings as SettingsIcon,
  ContactSupport as ContactIcon,
  Info as InfoIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon
} from '@mui/icons-material';
import { Box } from '@mui/material';
import { routesWebpage } from '@/webpage/components/contants/routes';
import {
  SidebarContainer,
  SidebarHeader,
  SidebarLogo,
  SidebarContent,
  SidebarItem,
  SidebarToggle,
  MainContent
} from '@/webpage/components/usuario/utils/constSidebarMenu';
import Logo from '@/components/logo/logo';

interface SidebarMenuProps {
  children: React.ReactNode;
}

const SidebarMenu: React.FC<SidebarMenuProps> = ({ children }) => {
  const [expanded, setExpanded] = useState(true);
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
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <SidebarContainer className={!expanded ? 'collapsed' : ''}>
        <SidebarHeader>
          {expanded && (
            <Logo />
          )}
          <SidebarToggle onClick={() => setExpanded(!expanded)}>
            {expanded ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </SidebarToggle>
        </SidebarHeader>

        <SidebarContent>
          {menuItems.map(({ id, icon: Icon, label, path }) => (
            <SidebarItem
              key={id}
              className={location.pathname === path ? 'active' : ''}
              onClick={() => handleNavigation(path)}
            >
              <Icon className="icon" />
              {expanded && <span className="label">{label}</span>}
            </SidebarItem>
          ))}
        </SidebarContent>
      </SidebarContainer>

      <MainContent isSidebarExpanded={expanded}>
        {children}
      </MainContent>
    </Box>
  );
};

export default SidebarMenu;