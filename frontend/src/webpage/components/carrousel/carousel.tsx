import React, { useMemo, useCallback, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { keyframes, styled } from "@mui/system";
import { routesWebpage } from "@/webpage/components/contants/routes";
import {
  CarouselWrapper,
  CarouselContainer,
  Slide,
  SlideImage,
  ContentOverlay,
  SlideTitle,
  ActionButton,
  CarouselImage,
} from "./style/consCarrousel";

declare module "react" {
  interface ImgHTMLAttributes<T> {
    fetchpriority?: "high" | "low" | "auto";
  }
}

const CAROUSEL_IMAGES: CarouselImage[] = [
  {
    src: "/assets/img/freelance.webp",
    alt: "Comparación rápida",
    title: "Comparación rápida, decisiones inteligentes",
    routes: [routesWebpage.inicio, "/"],
  },
  {
    src: "/assets/img/couple.webp",
    alt: "Comparación de créditos",
    title: "Encuentra tu crédito ideal",
    routes: [
      routesWebpage.creditos,
      "/creditos/solicitud",
      "/creditos/resultados",
      "/creditos/detalles",
      "/creditos/confirmacion",
    ],
  },
  {
    src: "/assets/img/piggi.webp",
    alt: "Blog de finanzas",
    title: "¿Qué pasa si no puedo pagar un préstamo?",
    routes: [routesWebpage.blog],
  },
];

const fadeInZoom = keyframes`
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const shimmerAnimation = keyframes`
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
`;

const Carousel: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loadedImages, setLoadedImages] = useState<{ [key: string]: boolean }>(
    {}
  );

  useEffect(() => {
    const imageLoadPromises = CAROUSEL_IMAGES.map(
      (image) =>
        new Promise<{ src: string; loaded: boolean }>((resolve) => {
          const img = new Image();
          img.src = image.src;
          (img as any).fetchPriority = "high";
          img.loading = "eager";

          img.onload = () => {
            setLoadedImages((prev) => ({
              ...prev,
              [image.src]: true,
            }));
            resolve({ src: image.src, loaded: true });
          };

          img.onerror = () => {
            console.warn(`Failed to load image: ${image.src}`);
            resolve({ src: image.src, loaded: false });
          };
        })
    );

    Promise.all(imageLoadPromises);
  }, []);
  const activeSlide = useMemo(() => {
    return (
      CAROUSEL_IMAGES.find((img) => img.routes.includes(location.pathname)) ||
      CAROUSEL_IMAGES[0]
    );
  }, [location.pathname]);
  const handleButtonClick = useCallback(() => {
    navigate(routesWebpage.creditos);
  }, [navigate]);
  const AnimatedSlideImage = styled(SlideImage, {
    shouldForwardProp: (prop) =>
      prop !== "isLoaded" && prop !== "fetchpriority",
  })<{ isLoaded: boolean }>(({ theme, isLoaded }) => ({
    opacity: isLoaded ? 1 : 0,
    transform: isLoaded ? "scale(1)" : "scale(0.95)",
    transition: "all 0.3s ease-in-out",
    animation: isLoaded ? `${fadeInZoom} 0.5s ease-out` : "none",
    backgroundColor: !isLoaded ? "rgba(200,200,200,0.1)" : "transparent",
    backgroundImage: !isLoaded
      ? `linear-gradient(90deg, 
          rgba(230,230,230,0.2) 0%, 
          rgba(230,230,230,0.4) 50%, 
          rgba(230,230,230,0.2) 100%)`
      : "none",
    backgroundSize: "1000px 100%",
    backgroundRepeat: "no-repeat",
    ...(!isLoaded && {
      animation: `${shimmerAnimation} 1.5s infinite linear`,
    }),
  }));

  return (
    <CarouselWrapper>
      <CarouselContainer>
        {CAROUSEL_IMAGES.map((slide) => (
          <Slide
            key={slide.src}
            sx={{
              display: slide.src === activeSlide.src ? "block" : "none",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <AnimatedSlideImage
              src={slide.src}
              alt={slide.alt}
              loading="eager"
              fetchpriority="high"
              decoding="async"
              width={1920}
              height={1080}
              isLoaded={!!loadedImages[slide.src]}
            />
          </Slide>
        ))}
        <ContentOverlay>
          <SlideTitle>{activeSlide.title}</SlideTitle>
          <ActionButton onClick={handleButtonClick}>
            <strong>¡BUSCA UN CREDITO!</strong>
          </ActionButton>
        </ContentOverlay>
      </CarouselContainer>
    </CarouselWrapper>
  );
};

export default React.memo(Carousel);
