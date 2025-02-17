import { Box, Typography, Button, styled } from "@mui/material";

export const BlogContainer = styled(Box)(({ theme }) => ({
  padding: "80px 40px",
  backgroundColor: theme.palette.background.default,
  width: "100%",
  boxSizing: "border-box",
  overflow: "hidden",

  [theme.breakpoints.down("lg")]: {
    padding: "70px 32px",
  },
  [theme.breakpoints.down("md")]: {
    padding: "60px 24px",
  },
  [theme.breakpoints.down("sm")]: {
    padding: "40px 16px",
  },
}));

export const BlogTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.common.white,
  fontSize: "48px",
  fontWeight: 500,
  textAlign: "center",
  marginBottom: "48px",
  fontFamily: "'Galano Grotesque', sans-serif",
  transition: "all 0.3s ease",

  [theme.breakpoints.down("lg")]: {
    fontSize: "42px",
    marginBottom: "40px",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "36px",
    marginBottom: "32px",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "28px",
    marginBottom: "24px",
  },
}));

export const BlogGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 550px), 1fr))",
  gap: "32px",
  maxWidth: "1440px",
  margin: "0 auto",
  width: "100%",

  [theme.breakpoints.down("lg")]: {
    maxWidth: "1200px",
    gap: "28px",
  },
  [theme.breakpoints.down("md")]: {
    gap: "24px",
    gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 450px), 1fr))",
  },
  [theme.breakpoints.down("sm")]: {
    gap: "20px",
    gridTemplateColumns: "1fr",
  },
}));

export const BlogCard = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  borderRadius: "16px",
  padding: "24px",
  display: "flex",
  alignItems: "flex-start",
  gap: "24px",
  border: `1px solid ${theme.palette.primary.main}`,
  transition: "all 0.3s ease",
  position: "relative",
  overflow: "hidden",

  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: `0 10px 20px rgba(0,0,0,0.2)`,
    borderColor: theme.palette.primary.light,
  },

  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `linear-gradient(45deg, ${theme.palette.primary.light}20, transparent)`,
    opacity: 0,
    transition: "opacity 0.3s ease",
  },

  "&:hover::before": {
    opacity: 1,
  },

  [theme.breakpoints.down("lg")]: {
    padding: "22px",
    gap: "22px",
  },
  [theme.breakpoints.down("md")]: {
    padding: "20px",
    gap: "20px",
  },
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    padding: "16px",
    gap: "16px",
  },
}));

export const ImageContainer = styled(Box)(({ theme }) => ({
  width: "200px",
  height: "200px",
  borderRadius: "12px",
  overflow: "hidden",
  flexShrink: 0,
  position: "relative",
  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  transition: "all 0.3s ease",

  "&:hover": {
    transform: "scale(1.02)",
    boxShadow: "0 6px 12px rgba(0,0,0,0.2)",
  },

  [theme.breakpoints.down("lg")]: {
    width: "180px",
    height: "180px",
  },
  [theme.breakpoints.down("md")]: {
    width: "160px",
    height: "160px",
  },
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    height: "200px",
  },
}));

export const BlogImage = styled("img")(({ theme }) => ({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  transition: "transform 0.5s ease",

  "&:hover": {
    transform: "scale(1.1)",
  },
}));

export const ContentContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  minWidth: 0,

  [theme.breakpoints.down("md")]: {
    gap: "16px",
  },
  [theme.breakpoints.down("sm")]: {
    gap: "14px",
  },
}));

export const BlogPostTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.common.white,
  fontSize: "32px",
  fontWeight: 500,
  lineHeight: 1.3,
  display: "-webkit-box",
  WebkitLineClamp: 3,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  transition: "color 0.3s ease",
  fontFamily: "'Galano Grotesque', sans-serif",
  [theme.breakpoints.down("lg")]: {
    fontSize: "28px",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "24px",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "20px",
    WebkitLineClamp: 2,
  },
}));

export const ReadButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  color: theme.palette.text.secondary,
  borderRadius: "50px",
  padding: "10px 32px",
  alignSelf: "flex-start",
  fontSize: "16px",
  fontWeight: 500,
  transition: "all 0.3s ease",
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
    background:
      "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
    transition: "0.5s",
  },
  "&:hover": {
    backgroundColor: theme.palette.primary.main,
    transform: "translateX(5px)",
    "&::after": {
      left: "100%",
    },
  },
  [theme.breakpoints.down("md")]: {
    padding: "8px 28px",
    fontSize: "15px",
  },
  [theme.breakpoints.down("sm")]: {
    padding: "8px 24px",
    fontSize: "14px",
    alignSelf: "stretch",
    textAlign: "center",
  },
}));
