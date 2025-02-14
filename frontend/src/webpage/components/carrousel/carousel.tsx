import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { routesWebpage } from "@/webpage/components/contants/routes";
import {
  CarouselWrapper,
  CarouselContainer,
  Slide,
  SlideImage,
  ContentOverlay,
  SlideTitle,
  ActionButton,
} from "./style/consCarrousel";

interface CarouselProps {
  defaultImage?: string;
}

const Carousel: React.FC<CarouselProps> = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const getActiveSlides = () => {
    const creditRoutes = [
      routesWebpage.creditos,
      "/creditos/solicitud",
      "/creditos/resultados",
      "/creditos/detalles",
      "/creditos/confirmacion",
    ];

    switch (true) {
      case location.pathname === routesWebpage.inicio:
        return {
          firstSlide: true,
          secondSlide: false,
          thirdSlide: false,
          image: "/assets/img/freelance.png",
          title: "Comparación rápida, decisiones inteligentes",
        };
      case creditRoutes.includes(location.pathname):
        return {
          firstSlide: false,
          secondSlide: true,
          thirdSlide: false,
          image: "/assets/img/couple.jpg",
          title: "Encuentra tu crédito ideal",
        };
      case location.pathname === routesWebpage.blog:
        return {
          firstSlide: false,
          secondSlide: false,
          thirdSlide: true,
          image: "/assets/img/piggi.jpg",
          title: "¿Qué pasa si no puedo pagar un préstamo?",
        };
      default:
        return {
          firstSlide: true,
          secondSlide: false,
          thirdSlide: false,
          image: "/assets/img/freelance.png",
          title: "Comparación rápida, decisiones inteligentes",
        };
    }
  };

  const { firstSlide, secondSlide, thirdSlide, title } = getActiveSlides();

  const handleButtonClick = () => {
    navigate(routesWebpage.creditos);
  };

  return (
    <CarouselWrapper>
      <CarouselContainer>
        <Slide sx={{ display: firstSlide ? "block" : "none" }}>
          <SlideImage
            src="/assets/img/freelance.png"
            alt="Comparación rápida"
            loading="eager"
          />
        </Slide>
        <Slide sx={{ display: secondSlide ? "block" : "none" }}>
          <SlideImage
            src="/assets/img/couple.jpg"
            alt="Comparación de créditos"
            loading="eager"
          />
        </Slide>
        <Slide sx={{ display: thirdSlide ? "block" : "none" }}>
          <SlideImage
            src="/assets/img/piggi.jpg"
            alt="Blog de finanzas"
            loading="eager"
          />
        </Slide>
        <ContentOverlay>
          <SlideTitle>{title}</SlideTitle>
          <ActionButton onClick={handleButtonClick}>
            <strong>¡BUSCA UN CREDITO!</strong>
          </ActionButton>
        </ContentOverlay>
      </CarouselContainer>
    </CarouselWrapper>
  );
};

export default Carousel;
