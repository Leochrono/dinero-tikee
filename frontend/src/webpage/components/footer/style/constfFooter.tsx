import { styled } from "@mui/material/styles";
import { Box, Container, IconButton, Link } from "@mui/material";


export const StyledGreenLine = styled(Box)(({ theme }) => ({
  margin: "0 auto",
  width: "83%",
  height: "4px",
  backgroundColor: theme.palette.primary.main,
  zIndex: 1,
  position: "relative",
  [theme.breakpoints.down("md")]: {
    width: "90%",
  },
  [theme.breakpoints.down("sm")]: {
    width: "95%",
  },
}));


export const StyledFooter = styled("footer")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  position: "relative",
  marginBottom: "70px",
  width: "100%",
  boxShadow: "0 -4px 6px rgba(0, 0, 0, 0.1)",
}));


export const FooterMainContent = styled(Container)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  maxWidth: "1440px",
  margin: "0 auto",
  padding: "24px 120px",
  [theme.breakpoints.down("lg")]: {
    padding: "24px 60px",
  },
  [theme.breakpoints.down("md")]: {
    padding: "24px 40px",
    flexDirection: "column",
    gap: "24px",
  },
  [theme.breakpoints.down("sm")]: {
    padding: "20px 16px",
  },
}));


export const FooterBottomContent = styled(Container)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  maxWidth: "1440px",
  margin: "0 auto",
  padding: "20px 120px",
  [theme.breakpoints.down("lg")]: {
    padding: "20px 60px",
  },
  [theme.breakpoints.down("md")]: {
    padding: "20px 40px",
    flexDirection: "column",
    gap: "20px",
    textAlign: "center",
  },
  [theme.breakpoints.down("sm")]: {
    padding: "16px",
  },
}));


export const NavigationLinks = styled("nav")(({ theme }) => ({
  display: "flex",
  gap: "60px",
  [theme.breakpoints.down("lg")]: {
    gap: "40px",
  },
  [theme.breakpoints.down("md")]: {
    gap: "32px",
  },
  [theme.breakpoints.down("sm")]: {
    gap: "20px",
    flexDirection: "column",
    alignItems: "center",
  },
}));


export const StyledLink = styled(Link)(({ theme }) => ({
  color: theme.palette.common.white,
  textDecoration: "none",
  fontSize: "24px",
  fontWeight: 500, // Cambiado a 500
  fontFamily: "'Galano Grotesque', sans-serif", // Añadida la fuente Galano Grotesque
  transition: "all 0.3s ease",
  position: "relative",
  "&:hover": {
    opacity: 0.8,
  },
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: -2,
    left: 0,
    width: 0,
    height: "2px",
    backgroundColor: theme.palette.primary.light,
    transition: "width 0.3s ease",
  },
  "&:hover::after": {
    width: "100%",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "20px",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "18px",
  },
}));


export const PoweredByText = styled("span")(({ theme }) => ({
  color: theme.palette.common.white,
  fontSize: "20px",
  fontWeight: 400,
  fontFamily: "'Stage Grotesque', sans-serif", // Añadida la fuente Stage Grotesque
  [theme.breakpoints.down("sm")]: {
    fontSize: "16px",
  },
}));


export const SocialContainer = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "30px",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    gap: "16px",
  },
}));


export const DomainText = styled("span")(({ theme }) => ({
  color: theme.palette.common.white,
  fontSize: "20px",
  fontWeight: 400,
  fontFamily: "'Stage Grotesque', sans-serif", // Añadida la fuente Stage Grotesque
  marginRight: "30px",
  [theme.breakpoints.down("md")]: {
    marginRight: 0,
    fontSize: "18px",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "16px",
  },
 }));


 export const SocialIcons = styled("div")(({ theme }) => ({
  display: "flex",
  gap: "20px",
  alignItems: "center",
  "& svg": {
    color: theme.palette.primary.light,
  }
 }));


export const LogoContainer = styled(Box)({
  transition: "transform 0.3s ease",
  "&:hover": {
    transform: "scale(1.05)",
  },
});