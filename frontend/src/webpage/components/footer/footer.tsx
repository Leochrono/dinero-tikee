import React from "react";
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

const Footer: React.FC = () => {
  return (
    <StyledFooter>
      <FooterMainContent>
        <LogoContainer>
          <Logowhite />
        </LogoContainer>
        <NavigationLinks>
          <StyledLink href="/preguntas-frecuentes">
            Preguntas Frecuentes
          </StyledLink>
          <StyledLink href="/quienes-somos">¿Quiénes Somos?</StyledLink>
          <StyledLink href="/blog">Blog</StyledLink>
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
