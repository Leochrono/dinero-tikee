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
      src: "https://www.clave.com.ec/wp-content/uploads/2021/07/banco-pacifico.png",
      alt: "Banco del Pacífico",
    },
    {
      src: "https://ccq.ec/wp-content/uploads/2018/12/Produbanco-1.jpg-1024x282.jpeg",
      alt: "Produbanco",
    },
    {
      src: "https://emprendimiento.ec/wp-content/uploads/Financiamiento/emprendimiento-ecuador-financiamiento-emprendedores-cooperativa-29-octubre-1024x683.jpg",
      alt: "Cooperativa 29 de Octubre",
    },
    {
      src: "https://play-lh.googleusercontent.com/1rk_Nw5REpMle46jLJzwKWgR9bGYXmiNH1qien0ZqJrYm5UOK8GbwtIlgMNovup13j8=w240-h480",
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
