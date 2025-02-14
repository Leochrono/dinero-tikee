import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    custom: {
      green: {
        neon: string;
        hover: string;
      };
      blue: {
        dark: string;
        background: string;
      };
      text: {
        white: string;
        lightGray: string;
      };
    };
  }

  interface PaletteOptions {
    custom?: {
      green?: {
        neon?: string;
        hover?: string;
      };
      blue?: {
        dark?: string;
        background?: string;
      };
      text?: {
        white?: string;
        lightGray?: string;
      };
    };
  }
}