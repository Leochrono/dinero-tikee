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
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
  borderRight: `1px solid ${theme.palette.primary.light}`,
  zIndex: 1200,

  '&.collapsed': {
    width: SIDEBAR_COLLAPSED_WIDTH,
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
    transition: 'opacity 0.3s ease',
  },
}));

export const SidebarToggle = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '32px',
  height: '32px',
  borderRadius: '50%',
  cursor: 'pointer',
  color: theme.palette.common.white,
  transition: 'all 0.3s ease',

  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
}));

export const MainContent = styled(Box)<{ isSidebarExpanded: boolean }>(({ theme, isSidebarExpanded }) => ({
  flexGrow: 1,
  marginLeft: isSidebarExpanded ? `${SIDEBAR_WIDTH}px` : `${SIDEBAR_COLLAPSED_WIDTH}px`,
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  padding: '24px',
  backgroundColor: theme.palette.background.default,
  minHeight: '100vh',
  width: `calc(100% - ${isSidebarExpanded ? SIDEBAR_WIDTH : SIDEBAR_COLLAPSED_WIDTH}px)`,

  [theme.breakpoints.down('sm')]: {
    marginLeft: 0,
    width: '100%',
    padding: '16px',
  },
}));