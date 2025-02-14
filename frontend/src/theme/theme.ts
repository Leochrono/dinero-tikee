import { createTheme } from '@mui/material/styles';
import { fontFaces } from './styles/fonts';

const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        ${fontFaces}
        .nav-button-hover:hover {
          & .MuiSvgIcon-root {
            color: rgba(99, 255, 72, 1) !important;
          }
          & .nav-text {
            color: rgba(99, 255, 72, 1) !important;
          }
          background-color: rgba(255, 255, 255, 0.05);
          opacity: 1;
        }
      `,
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '25px',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'transparent',
          boxShadow: 'none',
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: '#ffffff',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: '#ffffff',
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: '#ffffff',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.2)',
            },
            '&:hover fieldset': {
              borderColor: '#63ff48',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#63ff48',
            },
          },
        },
      },
    },
  },
  palette: {
    mode: 'dark',
    primary: {
      main: '#4CAF50',     // Verde principal
      light: '#39ff14',    // Verde neón
      dark: '#45a049',     // Verde oscuro
    },
    secondary: {
      main: '#001B30',     // Azul oscuro para contenedores secundarios
    },
    background: {
      default: '#001e35',  // Azul oscuro para fondo principal
      paper: '#001B30',    // Azul oscuro para elementos de papel
    },
    text: {
      primary: '#ffffff',  // Blanco para texto principal
      secondary: '#091e35', // Azul oscuro muy oscuro para texto secundario
    },
    error: {
      main: 'rgba(255, 0, 0, 0.7)', // Color de error
    },
    common: {
      white: '#ffffff',
      black: '#000000'
    },
    custom: {
      green: {
        neon: '#63ff48',     // Verde neón 
        hover: '#45a049',    // Verde oscuro para hover
      },
      blue: {
        dark: '#001B30',     // Azul oscuro profundo
        background: '#001e35', // Azul oscuro de fondo
      },
      text: {
        white: '#ffffff',
        lightGray: 'rgba(255, 255, 255, 0.7)', // Para texto secundario
      }
    }
  },
  typography: {
    fontFamily: [
      'Brooklyn',
      'Galano Grotesque', 
      'Stage Grotesque', 
      'Myriad Pro', 
      'Visby',
      'Inter',
      '-apple-system',
      'BlinkMacSystemFont',
      'Segoe UI',
      'Roboto',
      'Helvetica Neue',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontFamily: 'Visby',
      color: '#ffffff',
    },
    allVariants: {
      color: '#ffffff',
      fontFamily: 'Visby',
    },
    button: {
      textTransform: 'none',
      fontFamily: 'Stage Grotesque',
    },
  },
});

export default theme;