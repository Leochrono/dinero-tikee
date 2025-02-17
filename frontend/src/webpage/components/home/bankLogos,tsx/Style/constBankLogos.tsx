import { Box, Typography, styled } from "@mui/material";
import { keyframes } from "@mui/system";

export const scroll = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(calc(-250px * 6)); }
`;

export const scrollMobile = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(calc(-150px * 6)); }
`;

export const scrollSmall = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(calc(-120px * 6)); }
`;

export const CarouselContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  padding: "80px 0",
  width: "100%",
  overflow: "hidden",
  position: "relative",
  minHeight: "300px",
  boxSizing: "border-box",

  [theme.breakpoints.down("lg")]: {
    padding: "60px 0",
    minHeight: "280px",
  },
  [theme.breakpoints.down("md")]: {
    padding: "40px 0",
    minHeight: "240px",
  },
  [theme.breakpoints.down("sm")]: {
    padding: "30px 0",
    minHeight: "200px",
  },
}));

export const Title = styled(Typography)(({ theme }) => ({
  color: theme.palette.common.white,
  fontSize: "56px",
  fontWeight: 500,
  textAlign: "center",
  marginBottom: "60px",
  fontFamily: "'Galano Grotesque', sans-serif",
  padding: "0 20px",
  transition: "font-size 0.3s ease",
  [theme.breakpoints.down("lg")]: {
    fontSize: "48px",
    marginBottom: "50px",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "40px",
    marginBottom: "40px",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "32px",
    marginBottom: "30px",
  },
}));

export const MarqueeContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  minHeight: "120px",
  display: "flex",
  overflow: "hidden",
  position: "relative",

  "&::before, &::after": {
    content: '""',
    height: "100%",
    width: "250px",
    position: "absolute",
    zIndex: 2,
    top: 0,
    transition: "width 0.3s ease",
  },

  "&::before": {
    left: 0,
    background: "linear-gradient(to right, #001e35 0%, transparent 100%)",
  },

  "&::after": {
    right: 0,
    background: "linear-gradient(to left, #001e35 0%, transparent 100%)",
  },

  [theme.breakpoints.down("lg")]: {
    minHeight: "100px",
    "&::before, &::after": {
      width: "200px",
    },
  },

  [theme.breakpoints.down("md")]: {
    minHeight: "90px",
    "&::before, &::after": {
      width: "150px",
    },
  },

  [theme.breakpoints.down("sm")]: {
    minHeight: "80px",
    "&::before, &::after": {
      width: "80px",
    },
  },
}));

export const MarqueeContent = styled(Box)(({ theme }) => ({
  display: "flex",
  animation: `${scroll} 40s linear infinite`,
  "&:hover": {
    animationPlayState: "paused",
  },

  [theme.breakpoints.down("lg")]: {
    animation: `${scroll} 35s linear infinite`,
  },
  [theme.breakpoints.down("md")]: {
    animation: `${scrollMobile} 30s linear infinite`,
  },
  [theme.breakpoints.down("sm")]: {
    animation: `${scrollSmall} 25s linear infinite`,
  },
}));

export const LogoItem = styled(Box)(({ theme }) => ({
  minWidth: "250px",
  padding: "0 30px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "all 0.3s ease",

  "&:hover": {
    transform: "scale(1.05)",
  },

  [theme.breakpoints.down("lg")]: {
    minWidth: "200px",
    padding: "0 25px",
  },
  [theme.breakpoints.down("md")]: {
    minWidth: "150px",
    padding: "0 20px",
  },
  [theme.breakpoints.down("sm")]: {
    minWidth: "120px",
    padding: "0 15px",
  },
}));

export const LogoImage = styled("img")(({ theme }) => ({
  width: "180px",
  height: "120px",
  objectFit: "contain",
  transition: "all 0.3s ease",
  filter: "brightness(0.9)",

  "&:hover": {
    filter: "brightness(1)",
    transform: "scale(1.05)",
  },

  [theme.breakpoints.down("lg")]: {
    width: "160px",
    height: "100px",
  },
  [theme.breakpoints.down("md")]: {
    width: "130px",
    height: "90px",
  },
  [theme.breakpoints.down("sm")]: {
    width: "100px",
    height: "70px",
  },
}));
