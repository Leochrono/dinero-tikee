import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BannerContainer,
  BackgroundImage,
  ContentOverlay,
  Title,
  ReadMoreButton
} from './styles/constHeroBanner';

interface HeroBannerProps {
  onReadMore?: () => void;
}

const HeroBanner: React.FC<HeroBannerProps> = ({ onReadMore }) => {
  const navigate = useNavigate();

  const handleReadMore = () => {
    if (onReadMore) {
      onReadMore();
    } else {
      navigate('/blog/que-es-un-prestamo-personal');
    }
  };

  return (
    <BannerContainer>
      <BackgroundImage
        src="/assets/img/money.webp"
        alt="Préstamo personal - Imagen representativa de finanzas y préstamos"
        loading="eager" // Carga prioritaria por ser hero image
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