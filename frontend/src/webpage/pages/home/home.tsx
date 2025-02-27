import React, { useState } from "react";
import GreenLine from "../../components/greenline/greenline";
import Steps from "../../components/home/steps/steps";
import Products from "@/components/home/products/products";
import BankLogos from "@/components/home/bankLogos,tsx/bankLogos";
import BlogPosts from "@/components/home/blogPost/blogPost";
import HeroBanner from "@/components/home/heroBanner/heroBanner";
import Footer from "@/components/footer/footer";

// Importar tus componentes de blog individuales
import BlogLoan from "@/webpage/components/blog/components/blogloan";
import BlogBudget from "@/webpage/components/blog/components/blogBudget";
import BlogCreativeForms from "@/webpage/components/blog/components/blogCreativeForms";
import BlogMutualFunds from "@/webpage/components/blog/components/blogMutualFunds";
import BlogUnpaid from "@/webpage/components/blog/components/blogUnpaid";

const Home: React.FC = () => {
  const [currentView, setCurrentView] = useState("home");
  
  // Función para volver a la página principal
  const handleBackToMain = () => {
    setCurrentView("home");
  };
  
  // Manejador para mostrar el blog de préstamos
  const handleShowLoanInfo = () => {
    setCurrentView("prestamos-personales");
  };
  
  // Manejador para los clics en las tarjetas de blog
  const handleBlogPostClick = (slug: string) => {
    setCurrentView(slug);
  };
  
  // Renderizado condicional basado en el estado
  if (currentView === "prestamos-personales") {
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
  
  if (currentView === "metas-presupuesto") {
    return (
      <>
        <GreenLine />
        <BlogBudget 
          blogPost={{
            id: "2",
            title: "Metas y Presupuesto: Guía Financiera Práctica",
            image: "/assets/img/presupuesto.webp",
            slug: "metas-presupuesto"
          }}
          onBackToList={handleBackToMain}
        />
        <GreenLine />
        <Footer />
      </>
    );
  }
  
  if (currentView === "finanzas-creativas") {
    return (
      <>
        <GreenLine />
        <BlogCreativeForms 
          blogPost={{
            id: "3",
            title: "Finanzas Creativas en Época Festiva",
            image: "/assets/img/finanzas.webp",
            slug: "finanzas-creativas"
          }}
          onBackToList={handleBackToMain}
        />
        <GreenLine />
        <Footer />
      </>
    );
  }
  
  if (currentView === "fondos-mutuos") {
    return (
      <>
        <GreenLine />
        <BlogMutualFunds 
          blogPost={{
            id: "4",
            title: "Fondos Mutuos: Guía Completa de Inversión",
            image: "/assets/img/fondos.webp",
            slug: "fondos-mutuos"
          }}
          onBackToList={handleBackToMain}
        />
        <GreenLine />
        <Footer />
      </>
    );
  }
  
  if (currentView === "prestamos-impagos") {
    return (
      <>
        <GreenLine />
        <BlogUnpaid 
          blogPost={{
            id: "1",
            title: "Estrategias Financieras para Préstamos Impagos",
            image: "/assets/img/estrategias.webp",
            slug: "prestamos-impagos"
          }}
          onBackToList={handleBackToMain}
        />
        <GreenLine />
        <Footer />
      </>
    );
  }
  
  // Vista principal por defecto
  return (
    <>
      <GreenLine />
      <Steps />
      <GreenLine />
      <Products />
      <GreenLine />
      <BankLogos />
      <GreenLine />
      <BlogPosts onPostClick={handleBlogPostClick} />
      <GreenLine />
      <HeroBanner onReadMore={handleShowLoanInfo} />
      <GreenLine />
      <Footer />
    </>
  );
};

export default Home;