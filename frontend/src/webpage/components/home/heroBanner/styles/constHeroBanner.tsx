import { Box, Typography, Button, styled } from "@mui/material";
import { keyframes } from "@mui/system";

// Animaciones
export const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const scaleIn = keyframes`
  from {
    transform: scale(1);
  }
  to {
    transform: scale(1.05);
  }
`;

export const BannerContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  height: "600px",
  overflow: "hidden",
  
  "&::after": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "linear-gradient(90deg, rgba(0,27,48,0.8) 0%, rgba(0,27,48,0.4) 100%)", // Cambiado al color del theme
    zIndex: 1,
    transition: "background 0.3s ease",
  },

  [theme.breakpoints.down("lg")]: {
    height: "550px",
  },
  [theme.breakpoints.down("md")]: {
    height: "500px",
  },
  [theme.breakpoints.down("sm")]: {
    height: "450px",
  },
}));

export const BackgroundImage = styled("img")(({ theme }) => ({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  filter: "brightness(0.7)",
  transition: "all 0.5s ease-in-out",
  transform: "scale(1.01)", // Pequeño scale inicial

  "&:hover": {
    transform: "scale(1.05)",
    filter: "brightness(0.65)",
  },

  [theme.breakpoints.down("sm")]: {
    objectPosition: "center",
  },
}));

export const ContentOverlay = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "120px",
  transform: "translateY(-50%)",
  zIndex: 2,
  animation: `${fadeIn} 1s ease-out`,
  maxWidth: "600px",
  padding: "20px",
  
  "&::before": {
    content: '""',
    position: "absolute",
    top: -20,
    left: -20,
    right: -20,
    bottom: -20,
    background: "rgba(0,27,48,0.2)", // Cambiado al color del theme
    borderRadius: "20px",
    filter: "blur(10px)",
    zIndex: -1,
  },

  [theme.breakpoints.down("lg")]: {
    left: "80px",
    maxWidth: "550px",
  },
  [theme.breakpoints.down("md")]: {
    left: "40px",
    right: "40px",
    maxWidth: "500px",
  },
  [theme.breakpoints.down("sm")]: {
    left: "20px",
    right: "20px",
    textAlign: "center",
    transform: "translateY(-40%)",
    padding: "15px",
  },
}));

export const Title = styled(Typography)(({ theme }) => ({
  color: theme.palette.common.white,
  fontSize: "64px",
  fontWeight: 500, // Cambiado a 500
  lineHeight: 1.1,
  marginBottom: "32px",
  textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
  letterSpacing: "-0.5px",
  fontFamily: "'Galano Grotesque', sans-serif", // Añadida la fuente Galano Grotesque
  
  "& span": {
    color: theme.palette.primary.light,
    position: "relative",
    display: "inline-block",
    transition: "transform 0.3s ease",

    "&:hover": {
      transform: "translateY(-2px)",
    },
  },

  [theme.breakpoints.down("lg")]: {
    fontSize: "56px",
    marginBottom: "28px",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "48px",
    marginBottom: "24px",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "36px",
    margin: "0 auto 20px",
    padding: "0 10px",
    "& br": {
      display: "none",
    },
  },
}));

export const ReadMoreButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  color: theme.palette.text.secondary,
  borderRadius: "50px",
  padding: "14px 36px",
  fontSize: "20px",
  fontWeight: 900,
  textTransform: "uppercase",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
  position: "relative",
  overflow: "hidden",
  fontFamily: "'Stage Grotesque', sans-serif", 
  
  "&::after": {
    content: '""',
    position: "absolute",
    top: 0,
    left: "-100%",
    width: "100%",
    height: "100%",
    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
    transition: "0.5s",
  },

  "&:hover": {
    backgroundColor: theme.palette.primary.main,
    transform: "translateY(-2px) scale(1.02)",
    boxShadow: "0 6px 12px rgba(0,0,0,0.2)",
    
    "&::after": {
      left: "100%",
    },
  },

  "&:active": {
    transform: "translateY(0) scale(0.98)",
  },

  [theme.breakpoints.down("md")]: {
    padding: "12px 32px",
    fontSize: "15px",
  },
  [theme.breakpoints.down("sm")]: {
    padding: "10px 28px",
    fontSize: "14px",
    width: "80%",
    maxWidth: "300px",
    margin: "0 auto",
  },
}));