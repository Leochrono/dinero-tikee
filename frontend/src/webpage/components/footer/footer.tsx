import React from "react";
import { useNavigate } from "react-router-dom";
import {
  StyledFooter,
  StyledGreenLine,
  FooterMainContent,
  FooterBottomContent,
  NavigationLinks,
  StyledLink,
  PoweredByText,
  SocialContainer,
  DomainText,
  SocialIcons,
  LogoContainer,
} from "./style/constfFooter";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Logowhite from "../logo/logowhite";
import { IconButton } from "@mui/material";
import { routesWebpage } from "@/webpage/components/contants/routes";

const Footer: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <StyledFooter>
      <FooterMainContent>
        <LogoContainer>
          <Logowhite />
        </LogoContainer>
        <NavigationLinks>
          <StyledLink onClick={() => handleNavigation(routesWebpage.preguntasFrecuentes)}>
            Preguntas Frecuentes
          </StyledLink>
          <StyledLink onClick={() => handleNavigation(routesWebpage.quienesSomos)}>
            ¿Quiénes Somos?
          </StyledLink>
          <StyledLink onClick={() => handleNavigation(routesWebpage.blog)}>
            Blog
          </StyledLink>
        </NavigationLinks>
      </FooterMainContent>
      <StyledGreenLine />
      <FooterBottomContent>
        <PoweredByText>Dinero al Vuelo - Powered by</PoweredByText>
        <SocialContainer>
          <DomainText>dineroalvuelo.com</DomainText>
          <SocialIcons>
            <IconButton
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <FacebookIcon />
            </IconButton>
            <IconButton
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <InstagramIcon />
            </IconButton>
            <IconButton
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <LinkedInIcon />
            </IconButton>
          </SocialIcons>
        </SocialContainer>
      </FooterBottomContent>
    </StyledFooter>
  );
};

export default Footer;