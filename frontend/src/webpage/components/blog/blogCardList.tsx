import React, { useState } from "react";
import {
  BlogContainer,
  BlogGrid,
  BlogCard,
  BlogImage,
  BlogTitle,
  ReadButton,
} from "./styles/constblogCardList";
import BlogUnpaid from "./components/blogUnpaid";
import BlogBudget from "./components/blogBudget";
import BlogCreativeForms from "./components/blogCreativeForms";
import BlogMutualFunds from "./components/blogMutualFunds";
import BlogRealEstate from "./components/blogRealState";
import BlogCreditCard from "./components/blogCreditCard";
import BlogLoan from "./components/blogloan";
import BlogPayCredit from "./components/blogPayCredit";

export interface BlogPost {
  id: string;
  title: string;
  image: string;
  slug: string;
  content?: string;
}

const BlogCardList: React.FC = () => {
  const [selectedBlogPost, setSelectedBlogPost] = useState<BlogPost | null>(
    null
  );

  const blogPosts: BlogPost[] = [
    {
      id: "1",
      title: "¿Qué pasa si no puedo pagar un préstamo?",
      image: "/assets/img/nopay.webp",
      slug: "no-puedo-pagar-prestamo",
      content:
        "Contenido detallado sobre qué hacer si no puedes pagar un préstamo",
    },
    {
      id: "2",
      title: "Metas y Presupuesto Personal",
      image: "/assets/img/presupuesto.webp",
      slug: "metas-presupuesto",
      content: "Estrategias para establecer y alcanzar metas financieras",
    },
    {
      id: "3",
      title: "Formas Creativas de Manejar Tus Finanzas en Época Festiva",
      image: "/assets/img/finanzas.webp",
      slug: "finanzas-creativas",
      content:
        "Consejos para mantener tus finanzas saludables durante las fiestas",
    },
    {
      id: "4",
      title: "Fundamentos de Fondos Mutuos",
      image: "/assets/img/fondos.webp",
      slug: "fondos-mutuos",
      content: "Guía completa para entender los fondos mutuos",
    },
    {
      id: "5",
      title: "Inversión en Bienes Raíces",
      image: "/assets/img/bienes.webp",
      slug: "inversion-bienes-raices",
      content: "Estrategias para invertir inteligentemente en propiedades",
    },
    {
      id: "6",
      title: "Tarjetas de Crédito: Guía Completa",
      image: "/assets/img/tarjetas.webp",
      slug: "tarjetas-credito",
      content: "Todo lo que necesitas saber sobre tarjetas de crédito",
    },
    {
      id: "7",
      title: "Préstamos Personales Explicados",
      image: "/assets/img/personalloan.webp",
      slug: "prestamos-personales",
      content: "Cómo solicitar y manejar préstamos de manera responsable",
    },
    {
      id: "8",
      title: "Estrategias de Pago de Créditos",
      image: "/assets/img/estrategia.webp",
      slug: "pago-creditos",
      content: "Consejos para manejar tus pagos de crédito eficientemente",
    },
  ];

  const blogComponentMap: { [key: string]: React.ComponentType<any> } = {
    "no-puedo-pagar-prestamo": BlogUnpaid,
    "metas-presupuesto": BlogBudget,
    "finanzas-creativas": BlogCreativeForms,
    "fondos-mutuos": BlogMutualFunds,
    "inversion-bienes-raices": BlogRealEstate,
    "tarjetas-credito": BlogCreditCard,
    "prestamos-personales": BlogLoan,
    "pago-creditos": BlogPayCredit,
  };

  const handleCardClick = (post: BlogPost) => {
    setSelectedBlogPost(post);
  };

  const handleBackToList = () => {
    setSelectedBlogPost(null);
  };

  if (selectedBlogPost) {
    const BlogComponent = blogComponentMap[selectedBlogPost.slug];

    if (BlogComponent) {
      return (
        <BlogComponent
          blogPost={selectedBlogPost}
          onBackToList={handleBackToList}
        />
      );
    }

    return (
      <div>
        <button onClick={handleBackToList}>Volver</button>
        <p>Contenido no disponible</p>
      </div>
    );
  }

  return (
    <BlogContainer>
      <BlogGrid>
        {blogPosts.map((post) => (
          <BlogCard key={post.id} onClick={() => handleCardClick(post)}>
            <BlogImage>
              <img src={post.image} alt={post.title} />
            </BlogImage>
            <BlogTitle>{post.title}</BlogTitle>
            <ReadButton>LEER</ReadButton>
          </BlogCard>
        ))}
      </BlogGrid>
    </BlogContainer>
  );
};

export default BlogCardList;
