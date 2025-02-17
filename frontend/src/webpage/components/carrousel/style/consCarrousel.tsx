import { Box, Button, Typography, styled } from "@mui/material";

export interface CarouselImage {
  src: string;
  alt: string;
  title: string;
  routes: string[];
}

export const CarouselWrapper = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  height: "auto",
  display: "block",
  backgroundColor: theme.palette.background.default,
}));

export const CarouselContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  position: "relative",
  zIndex: 0,
  aspectRatio: "18/9",
  display: "block",
  [theme.breakpoints.down("md")]: {
    aspectRatio: "4/3",
  },
  [theme.breakpoints.down("sm")]: {
    aspectRatio: "1/1",
  },
}));

export const SlideImage = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  display: "block",
  verticalAlign: "bottom",
});

export const ContentOverlay = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  left: "200px",
  zIndex: 2,
  maxWidth: "500px",
  [theme.breakpoints.down("lg")]: {
    left: "100px",
    maxWidth: "400px",
  },
  [theme.breakpoints.down("md")]: {
    left: "40px",
    right: "40px",
    maxWidth: "none",
  },
  [theme.breakpoints.down("sm")]: {
    left: "20px",
    right: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  },
}));

export const SlideTitle = styled(Typography)(({ theme }) => ({
  fontFamily: "'Galano Grotesque', sans-serif",
  color: theme.palette.common.white,
  fontSize: "64px",
  letterSpacing: "-2px",
  lineHeight: 0.9,
  marginBottom: "32px",
  [theme.breakpoints.down("lg")]: {
    fontSize: "56px",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "42px",
    marginBottom: "24px",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "32px",
    marginBottom: "20px",
    "& br": {
      display: "none",
    },
  },
}));

export const ActionButton = styled(Button)(({ theme }) => ({
  fontFamily: "'Stage Grotesque', sans-serif",
  backgroundColor: theme.palette.custom.green.neon,
  color: theme.palette.text.secondary,
  padding: "12px 32px",
  borderRadius: "50px",
  fontSize: "16px",
  textTransform: "none",
  fontWeight: 200,
  "&:hover": {
    backgroundColor: theme.palette.custom.green.hover,
  },
  [theme.breakpoints.down("sm")]: {
    padding: "10px 24px",
    fontSize: "14px",
    width: "80%",
    maxWidth: "300px",
  },
}));

export const Slide = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  height: "100%",
  "&::after": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `linear-gradient(90deg, 
      ${theme.palette.custom.blue.dark}cc 0%, 
      ${theme.palette.custom.blue.dark}33 100%)`,
    [`@media (max-width: ${theme.breakpoints.values.sm}px)`]: {
      background: `linear-gradient(180deg, 
        ${theme.palette.custom.blue.dark}66 0%, 
        ${theme.palette.custom.blue.dark}99 100%)`,
    },
  },
}));
