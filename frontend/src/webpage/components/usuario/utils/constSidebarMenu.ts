import { Box, styled } from "@mui/material";

const SIDEBAR_WIDTH = 280;
const SIDEBAR_COLLAPSED_WIDTH = 64;

export const SidebarContainer = styled(Box)(({ theme }) => ({
    width: SIDEBAR_WIDTH,
    backgroundColor: theme.palette.secondary.main,
    height: '100vh',
    position: 'fixed',
    left: 0,
    top: 0,
    transition: theme.transitions.create('transform', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
    borderRight: `1px solid ${theme.palette.primary.light}`,
    zIndex: 1200,
  
    '&.collapsed': {
      width: SIDEBAR_COLLAPSED_WIDTH,
    },
  
    [theme.breakpoints.down('sm')]: {
      width: '240px', // Ligeramente más estrecho en móvil
      transform: 'translateX(-100%)',
      boxShadow: '4px 0 8px rgba(0,0,0,0.1)',
  
      '&.mobile-visible': {
        transform: 'translateX(0)',
      },
  
      '&.collapsed': {
        width: '240px',
        transform: 'translateX(-100%)',
  
        '&.mobile-visible': {
          transform: 'translateX(0)',
        }
      }
    },
  }));

export const SidebarOverlay = styled(Box)(({ theme }) => ({
  display: 'none',
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  zIndex: 1150,
  opacity: 0,
  transition: 'opacity 0.3s ease',

  '&.visible': {
    opacity: 1,
  },

  [theme.breakpoints.down('sm')]: {
    display: 'block',
  },
}));

export const MobileMenuButton = styled(Box)(({ theme }) => ({
    display: 'none',
    position: 'fixed',
    left: '16px', // Ajustado para mejor alineación
    top: '16px',
    zIndex: 1300,
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
    transition: 'all 0.3s ease',
  
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
      transform: 'scale(1.05)',
    },
  
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      opacity: 1,
      visibility: 'visible',
      transition: 'opacity 0.3s ease, visibility 0.3s ease',
  
      '&.menu-open': {
        opacity: 0,
        visibility: 'hidden',
      }
    },
  }));
  

export const SidebarHeader = styled(Box)(({ theme }) => ({
  height: '64px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0 16px',
  backgroundColor: theme.palette.secondary.dark,
  borderBottom: `1px solid ${theme.palette.primary.light}`,

  [theme.breakpoints.down('sm')]: {
    '& .toggle-button': {
      display: 'none', // Ocultar el botón de toggle en móvil
    }
  }
}));

export const SidebarLogo = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  
  '& img': {
    height: '32px',
  },
  
  '& .logo-text': {
    color: theme.palette.common.white,
    fontSize: '1.5rem',
    fontWeight: 500,
    fontFamily: "'Galano Grotesque', sans-serif",
  },
}));

export const SidebarContent = styled(Box)(({ theme }) => ({
  padding: '24px 16px',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  overflowY: 'auto',
  height: 'calc(100vh - 64px)', // Resta la altura del header
}));

export const SidebarItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  padding: '12px 16px',
  borderRadius: '8px',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  color: theme.palette.common.white,
  fontFamily: "'Stage Grotesque', sans-serif",

  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },

  '&.active': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },

  '& .icon': {
    fontSize: '24px',
  },

  '& .label': {
    fontSize: '1rem',
    fontWeight: 500,
  },
}));

// Cambiamos a una versión que no use props personalizadas
export const MainContentWrapper = styled('div')({
    display: 'flex',
    minHeight: '100vh',
    width: '100%',
    position: 'relative', // Añadido para posicionamiento
  });

  export const MainContent = styled('div')(({ theme }) => ({
    flexGrow: 1,
    padding: '24px',
    backgroundColor: theme.palette.background.default,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  
    '&.expanded': {
      marginLeft: SIDEBAR_WIDTH,
      width: `calc(100% - ${SIDEBAR_WIDTH}px)`,
    },
  
    '&.collapsed': {
      marginLeft: SIDEBAR_COLLAPSED_WIDTH,
      width: `calc(100% - ${SIDEBAR_COLLAPSED_WIDTH}px)`,
    },
  
    [theme.breakpoints.down('sm')]: {
      marginLeft: '0 !important', // Forzar margen 0 en móvil
      width: '100% !important', // Forzar ancho completo en móvil
      padding: '16px',
      paddingTop: '24px', // Reducido para mejor espaciado
      minHeight: '100vh',
      position: 'relative',
      left: 0,
      overflowX: 'hidden', // Prevenir scroll horizontal
    },
  }));
  