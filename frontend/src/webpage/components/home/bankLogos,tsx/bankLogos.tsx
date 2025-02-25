import React from "react";
import {
  CarouselContainer,
  Title,
  MarqueeContainer,
  MarqueeContent,
  LogoItem,
  LogoImage,
} from "./Style/constBankLogos";

interface BankLogo {
  src: string;
  alt: string;
}

const BankLogos: React.FC = () => {
  const logos: BankLogo[] = [
    {
      src: "/assets/img//logobank/pichincha.webp",
      alt: "Banco Pichincha",
    },
    {
      src: "/assets/img//logobank/pacifico.webp",
      alt: "Banco del Pacífico",
    },
    {
      src: "/assets/img/logobank/produbanco.webp",
      alt: "Produbanco",
    },
    {
      src: "/assets/img/logobank/29.webp",
      alt: "Cooperativa 29 de Octubre",
    },
    {
      src: "/assets/img/logobank/jep.webp",
      alt: "Cooperativa JEP",
    },
    {
      src: "/assets/img/logobank/guayaquil.webp",
      alt: "Banco de Guayaquil",
    },
  ];

  const duplicatedLogos = [...logos, ...logos];

  return (
    <CarouselContainer>
      <Title>Encuentra productos de:</Title>
      <MarqueeContainer>
        <MarqueeContent>
          {duplicatedLogos.map((logo, index) => (
            <LogoItem key={`logo-${index}`}>
              <LogoImage
                src={logo.src}
                alt={logo.alt}
                title={logo.alt}
                loading={index > 5 ? "lazy" : undefined}
              />
            </LogoItem>
          ))}
        </MarqueeContent>
      </MarqueeContainer>
    </CarouselContainer>
  );
};

export default BankLogos;
