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

const BlogMutualFunds: React.FC<BlogDetailsProps> = ({ blogPost, onBackToList }) => {
  return (
    <>
      <BackButton onClick={onBackToList}>
        <ArrowBack />
      </BackButton>
      <DetailContainer>
        <ArticleParagraph>
          En el mundo de las inversiones, los fondos mutuos se han convertido en una herramienta 
          fundamental para quienes buscan hacer crecer su patrimonio de manera inteligente y 
          relativamente accesible. Si alguna vez te has preguntado cómo comenzar a invertir sin 
          ser un experto en mercados financieros, los fondos mutuos podrían ser tu punto de partida.
        </ArticleParagraph>

        <SubTitle>¿Qué son los Fondos Mutuos?</SubTitle>
        <ArticleParagraph>
          Los fondos mutuos son una <HighlightText>estrategia de inversión colectiva</HighlightText> 
          donde múltiples inversionistas agrupan su dinero para ser administrado profesionalmente. 
          Funciona como un gran "pozo" de inversión donde:

          • Múltiples personas aportan diferentes cantidades de dinero
          • Profesionales especializados administran estos recursos
          • Se invierte en una diversa cartera de instrumentos financieros
          • El riesgo y las ganancias se distribuyen entre todos los participantes
        </ArticleParagraph>

        <SubTitle>Cómo Funcionan Realmente los Fondos Mutuos</SubTitle>
        <ArticleParagraph>
          El proceso de inversión en fondos mutuos es más simple de lo que parece:

          1. <HighlightText>Agrupación de Recursos</HighlightText>
          • Los inversionistas aportan diferentes montos
          • Se crea un fondo común de inversión

          2. <HighlightText>Administración Profesional</HighlightText>
          • Expertos financieros analizan el mercado
          • Distribuyen la inversión en:
            - Acciones
            - Bonos
            - Instrumentos del mercado monetario
            - Otros activos financieros

          3. <HighlightText>Distribución de Resultados</HighlightText>
          • Las ganancias o pérdidas se distribuyen proporcionalmente
          • Cada inversionista recibe un rendimiento según su participación
        </ArticleParagraph>

        <SubTitle>Ventajas de Invertir en Fondos Mutuos</SubTitle>
        <ArticleParagraph>
          Razones por las que los fondos mutuos son atractivos:

          • <HighlightText>Accesibilidad</HighlightText>: Puedes comenzar con montos pequeños
          • <HighlightText>Diversificación</HighlightText>: Reduces riesgos al invertir en múltiples activos
          • <HighlightText>Gestión Profesional</HighlightText>: Expertos manejan tus inversiones
          • <HighlightText>Flexibilidad</HighlightText>: Puedes retirar tu dinero con relativa facilidad
          • <HighlightText>Transparencia</HighlightText>: Supervisados por organismos reguladores
        </ArticleParagraph>

        <SubTitle>Tipos de Fondos Mutuos</SubTitle>
        <ArticleParagraph>
          Existen diferentes tipos de fondos según tu perfil de inversión:

          1. Fondos de Renta Fija
          • Menor riesgo
          • Inversiones en bonos y títulos
          • Rendimientos más predecibles

          2. Fondos de Renta Variable
          • Mayor potencial de ganancia
          • Inversiones en acciones
          • Mayor volatilidad

          3. Fondos Mixtos
          • Combinan renta fija y variable
          • Balance entre riesgo y rendimiento

          4. Fondos Internacionales
          • Inversiones en mercados globales
          • Mayor diversificación geográfica
        </ArticleParagraph>

        <SubTitle>Consideraciones Antes de Invertir</SubTitle>
        <ArticleParagraph>
          Consejos para invertir inteligentemente:

          • Evalúa tu tolerancia al riesgo
          • Define tus objetivos financieros
          • Investiga el historial del fondo
          • Comprende las comisiones
          • No inviertas más de lo que puedes perder
          • Mantén una visión a largo plazo
        </ArticleParagraph>

        <ArticleParagraph>
          Recuerda, invertir en fondos mutuos no garantiza ganancias, pero con educación, 
          paciencia y una estrategia bien planificada, puedes convertirlos en una 
          herramienta poderosa para construir tu patrimonio.
        </ArticleParagraph>
      </DetailContainer>
    </>
  );
};

export default BlogMutualFunds;