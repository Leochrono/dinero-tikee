import React from "react";
import {
  BannerContainer,
  BackgroundImage,
  ContentOverlay,
  Title,
  ReadMoreButton,
} from "./styles/constHeroBanner";

interface HeroBannerProps {
  onReadMore?: () => void;
}

const HeroBanner: React.FC<HeroBannerProps> = ({ onReadMore }) => {
  const handleReadMore = () => {
    if (onReadMore) {
      onReadMore();
    }
  };

  return (
    <BannerContainer>
      <BackgroundImage
        src="/assets/img/blog/money.webp"
        alt="Préstamo personal - Imagen representativa de finanzas y préstamos"
        loading="eager"
      />
      <ContentOverlay>
        <Title variant="h1">
          ¿Qué es un <span>préstamo</span> personal?
        </Title>
        <ReadMoreButton
          variant="contained"
          aria-label="Leer más sobre préstamos personales"
          onClick={handleReadMore}
        >
          LEER MÁS
        </ReadMoreButton>
      </ContentOverlay>
    </BannerContainer>
  );
};

export default HeroBanner;