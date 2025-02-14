import React from 'react';
import { ArrowBack } from "@mui/icons-material";
import {
  DetailContainer,
  ArticleParagraph,
  HighlightText,
  SubTitle
} from '@/components/blog/styles/constBlogUnpaid';
import { BackButton } from '@/components/login/components/styles/constregistro';

export interface BlogPost {
  id: string;
  title: string;
  image: string;
  slug: string;
  content?: string;
}

interface BlogDetailsProps {
  blogPost: BlogPost;
  onBackToList: () => void;
}

const BlogRealEstate: React.FC<BlogDetailsProps> = ({ blogPost, onBackToList }) => {
  return (
    <>
      <BackButton onClick={onBackToList}>
        <ArrowBack />
      </BackButton>
      <DetailContainer>
        <ArticleParagraph>
          Bienes raíces: una industria que va mucho más allá de comprar y vender propiedades. 
          Es un ecosistema complejo de inversión, desarrollo y oportunidades estratégicas 
          que puede convertirse en una fuente significativa de ingresos y crecimiento patrimonial.
        </ArticleParagraph>

        <SubTitle>¿Qué Son Realmente los Bienes Raíces?</SubTitle>
        <ArticleParagraph>
          Los bienes raíces comprenden <HighlightText>todo activo físico vinculado a un terreno</HighlightText>:

          • Terrenos sin desarrollar
          • Casas y departamentos
          • Edificios comerciales
          • Locales industriales
          • Terrenos agrícolas

          Estos activos tienen características únicas:
          • Valor que tiende a incrementarse con el tiempo
          • Posibilidad de generar ingresos pasivos
          • Protección contra la inflación
        </ArticleParagraph>

        <SubTitle>Estrategias de Inversión en Bienes Raíces</SubTitle>
        <ArticleParagraph>
          Existen múltiples formas de invertir en bienes raíces:

          1. <HighlightText>Inversión Directa</HighlightText>
          • Compra de propiedades para alquiler
          • Rehabilitación y venta de inmuebles
          • Desarrollo de proyectos inmobiliarios

          2. <HighlightText>Inversión Indirecta</HighlightText>
          • Fondos de inversión inmobiliarios
          • Crowdfunding inmobiliario
          • Acciones de empresas del sector
          • Bonos respaldados por hipotecas

          3. <HighlightText>Estrategias Especializadas</HighlightText>
          • Propiedades de bajo costo para renovación
          • Inmuebles en zonas de desarrollo
          • Propiedades para alquiler vacacional
        </ArticleParagraph>

        <SubTitle>Evaluación de Oportunidades Inmobiliarias</SubTitle>
        <ArticleParagraph>
          Factores clave para una inversión inteligente:

          • Ubicación geográfica
          • Tendencias demográficas
          • Desarrollo urbano
          • Potencial de apreciación
          • Costos de mantenimiento
          • Regulaciones locales
          • Potencial de generación de ingresos
        </ArticleParagraph>

        <SubTitle>Formación Profesional en Bienes Raíces</SubTitle>
        <ArticleParagraph>
          Convertirse en un profesional del sector requiere:

          • Educación especializada
          • Certificaciones profesionales
          • Conocimientos interdisciplinarios:
            - Derecho inmobiliario
            - Finanzas
            - Tasación
            - Marketing inmobiliario
            - Análisis de mercado

          <HighlightText>Perfiles profesionales más comunes:</HighlightText>
          • Abogados
          • Arquitectos
          • Ingenieros civiles
          • Economistas
          • Administradores de empresas
        </ArticleParagraph>

        <SubTitle>Riesgos y Consideraciones</SubTitle>
        <ArticleParagraph>
          Todo inversionista debe considerar:

          • Volatilidad del mercado inmobiliario
          • Costos de mantenimiento
          • Riesgos de vacancia
          • Regulaciones cambiantes
          • Necesidad de capital inicial
          • Competencia en el mercado

          <HighlightText>Consejo fundamental:</HighlightText> Investiga, capacítate y 
          diversifica tus estrategias de inversión.
        </ArticleParagraph>

        <ArticleParagraph>
          Los bienes raíces no son solo una inversión, son una herramienta para construir 
          patrimonio y generar flujos de ingresos sostenibles. La clave está en la 
          educación continua, la planificación estratégica y la visión a largo plazo.
        </ArticleParagraph>
      </DetailContainer>
    </>
  );
};

export default BlogRealEstate;