import React from "react";
import { useNavigate } from "react-router-dom";
import {
  BlogContainer,
  BlogTitle,
  BlogGrid,
  BlogCard,
  ImageContainer,
  BlogImage,
  ContentContainer,
  BlogPostTitle,
  ReadButton,
} from "./style/constBlogPost";

interface BlogPost {
  id: string;
  image: string;
  title: string;
  slug: string;
}

const BlogPosts: React.FC = () => {
  const navigate = useNavigate();

  const posts: BlogPost[] = [
    {
      id: "1",
      image: "/assets/img/unpaid-loans.jpg",
      title: "Estrategias Financieras para Préstamos Impagos",
      slug: "prestamos-impagos",
    },
    {
      id: "2",
      image: "/assets/img/budget-planning.jpg",
      title: "Metas y Presupuesto: Guía Financiera Práctica",
      slug: "metas-presupuesto",
    },
    {
      id: "3",
      image: "/assets/img/creative-finances.jpg",
      title: "Finanzas Creativas en Época Festiva",
      slug: "finanzas-creativas",
    },
    {
      id: "4",
      image: "/assets/img/mutual-funds.jpg",
      title: "Fondos Mutuos: Guía Completa de Inversión",
      slug: "fondos-mutuos",
    },
  ];

  const handleReadClick = (slug: string) => {
    navigate(`/blog/${slug}`);
  };

  return (
    <BlogContainer>
      <BlogTitle variant="h1">Blog de Consejos Financieros</BlogTitle>
      <BlogGrid>
        {posts.map((post) => (
          <BlogCard key={post.id}>
            <ImageContainer>
              <BlogImage
                src={post.image}
                alt={post.title}
                loading="lazy"
                title={post.title}
              />
            </ImageContainer>
            <ContentContainer>
              <BlogPostTitle variant="h2">{post.title}</BlogPostTitle>
              <ReadButton
                variant="contained"
                onClick={() => handleReadClick(post.slug)}
              >
                LEER
              </ReadButton>
            </ContentContainer>
          </BlogCard>
        ))}
      </BlogGrid>
    </BlogContainer>
  );
};

export default BlogPosts;
