import React from "react";
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

// Añadir props para manejar clics en los posts
interface BlogPostsProps {
  onPostClick?: (slug: string) => void;
}

const BlogPosts: React.FC<BlogPostsProps> = ({ onPostClick }) => {
  const posts: BlogPost[] = [
    {
      id: "1",
      image: "/assets/img/blog/estrategia.webp",
      title: "Estrategias de pago de crédito",
      slug: "prestamos-impagos",
    },
    {
      id: "2",
      image: "/assets/img/blog/presupuesto.webp",
      title: "Metas y Presupuesto: Guía Financiera Práctica",
      slug: "metas-presupuesto",
    },
    {
      id: "3",
      image: "/assets/img/blog/finanzas.webp",
      title: "Finanzas Creativas en Época Festiva",
      slug: "finanzas-creativas",
    },
    {
      id: "4",
      image: "/assets/img/blog/fondos.webp",
      title: "Fondos Mutuos: Guía Completa de Inversión",
      slug: "fondos-mutuos",
    },
  ];

  const handleReadClick = (slug: string) => {
    if (onPostClick) {
      onPostClick(slug);
    }
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