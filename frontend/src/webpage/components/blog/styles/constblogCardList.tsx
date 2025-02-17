import { styled } from "@mui/material/styles";
import { Box, Typography, Button } from "@mui/material";

export const BlogContainer = styled(Box)(({ theme }) => ({
  padding: "40px 200px",
  backgroundColor: theme.palette.background.default,
  minHeight: "100vh",
  width: "100%",
  boxSizing: "border-box",

  [theme.breakpoints.down("lg")]: {
    padding: "40px 60px",
  },
  [theme.breakpoints.down("md")]: {
    padding: "30px 40px",
  },
  [theme.breakpoints.down("sm")]: {
    padding: "20px",
  },
}));

export const BlogGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: "24px",
  width: "100%",

  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "1fr",
    gap: "20px",
  },
}));

export const BlogCard = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  borderRadius: "16px",
  padding: "24px",
  border: `1px solid ${theme.palette.primary.main}`,
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  position: "relative",
  transition: "transform 0.3s ease, border-color 0.3s ease",
  cursor: "pointer",

  "&:hover": {
    transform: "translateY(-5px)",
    borderColor: theme.palette.primary.light,
  },

  "&::before": {
    content: '""',
    position: "absolute",
    top: -2,
    left: -2,
    right: -2,
    bottom: -2,
    background: `linear-gradient(45deg, ${theme.palette.primary.light}, transparent)`,
    borderRadius: "18px",
    zIndex: -1,
    opacity: 0.3,
    transition: "opacity 0.3s ease",
  },

  "&:hover::before": {
    opacity: 0.5,
  },

  [theme.breakpoints.down("sm")]: {
    padding: "16px",
    gap: "12px",
  },
}));

export const BlogImage = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "200px",
  borderRadius: "8px",
  overflow: "hidden",
  position: "relative",

  "& img": {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "transform 0.3s ease",
  },

  "&:hover img": {
    transform: "scale(1.05)",
  },

  [theme.breakpoints.down("sm")]: {
    height: "150px",
  },
}));

export const BlogTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.common.white,
  fontSize: "24px",
  fontWeight: 500, 
  lineHeight: 1.2,
  fontFamily: "'Galano Grotesque', sans-serif", 
  transition: "color 0.3s ease",
  [theme.breakpoints.down("md")]: {
    fontSize: "22px",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "20px",
  },
}));

export const ReadButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  color: theme.palette.text.secondary,
  padding: "8px 24px",
  borderRadius: "50px",
  fontSize: "14px",
  fontWeight: 500, 
  fontFamily: "'Stage Grotesque', sans-serif",
  width: "fit-content",
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: theme.palette.primary.main,
    transform: "translateX(5px)",
  },
  [theme.breakpoints.down("sm")]: {
    padding: "6px 20px",
    fontSize: "13px",
  },
}));
