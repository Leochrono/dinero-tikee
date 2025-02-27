import React, { useState } from "react";
import GreenLine from "../../components/greenline/greenline";
import Steps from "../../components/home/steps/steps";
import Products from "@/components/home/products/products";
import BankLogos from "@/components/home/bankLogos,tsx/bankLogos";
import BlogPosts from "@/components/home/blogPost/blogPost";
import HeroBanner from "@/components/home/heroBanner/heroBanner";
import Footer from "@/components/footer/footer";
import BlogLoan from "@/webpage/components/blog/components/blogloan";

const Home: React.FC = () => {
  const [showLoanInfo, setShowLoanInfo] = useState(false);
  
  // Función para mostrar la información de préstamos
  const handleShowLoanInfo = () => {
    setShowLoanInfo(true);
  };
  
  // Función para volver a la página principal
  const handleBackToMain = () => {
    setShowLoanInfo(false);
  };
  
  // Si showLoanInfo es true, muestra el componente BlogLoan
  if (showLoanInfo) {
    return (
      <>
        <GreenLine />
        <BlogLoan 
          blogPost={{
            id: "loan-1",
            title: "Préstamos Personales Explicados",
            image: "/assets/img/personalloan.webp",
            slug: "prestamos-personales"
          }}
          onBackToList={handleBackToMain}
        />
        <GreenLine />
        <Footer />
      </>
    );
  }
  
  // Página principal normal
  return (
    <>
      <GreenLine />
      <Steps />
      <GreenLine />
      <Products />
      <GreenLine />
      <BankLogos />
      <GreenLine />
      <BlogPosts />
      <GreenLine />
      <HeroBanner onReadMore={handleShowLoanInfo} />
      <GreenLine />
      <Footer />
    </>
  );
};

export default Home;