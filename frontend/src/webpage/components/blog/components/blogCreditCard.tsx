import React from "react";
import { ArrowBack } from "@mui/icons-material";
import {
  DetailContainer,
  ArticleParagraph,
  HighlightText,
  SubTitle,
} from "@/components/blog/styles/constBlogUnpaid";
import { BackButton } from "@/components/login/components/styles/constregistro";
import { styled } from "@mui/material";

// Contenedor principal con posición relativa
const BlogContentWrapper = styled('div')(({ theme }) => ({
  position: 'relative',
  paddingTop: '40px', // Espacio para el botón arriba
}));

// Contenedor para el botón de retroceso
const BackButtonContainer = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: '0',
  left: '20px',
  zIndex: 10
}));

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

const BlogCreditCard: React.FC<BlogDetailsProps> = ({
  blogPost,
  onBackToList,
}) => {
  return (
    <BlogContentWrapper>
      <BackButtonContainer>
        <BackButton onClick={onBackToList}>
          <ArrowBack />
        </BackButton>
      </BackButtonContainer>
      
      <DetailContainer>
        <ArticleParagraph>
          Obtener una tarjeta de crédito en Ecuador puede ser un paso importante
          en tu gestión financiera. Sin embargo, no se trata solo de llenar un
          formulario, sino de comprender a fondo los requisitos y
          responsabilidades que conlleva.
        </ArticleParagraph>

        <SubTitle>Requisitos para Obtener una Tarjeta de Crédito</SubTitle>
        <ArticleParagraph>
          Las instituciones financieras ecuatorianas evalúan cuidadosamente a
          los potenciales clientes. Los requisitos generales incluyen: •{" "}
          <HighlightText>Edad</HighlightText>: Ser mayor de 18 años •{" "}
          <HighlightText>Documentación</HighlightText>: - Cédula de identidad
          vigente - Comprobante de ingresos - Para independientes: RUC o
          documentación tributaria Factores clave de evaluación: • Nivel de
          ingresos estables • Historial crediticio • Capacidad de endeudamiento
        </ArticleParagraph>

        <SubTitle>Cómo Mejorar tus Posibilidades de Aprobación</SubTitle>
        <ArticleParagraph>
          Estrategias para aumentar tus probabilidades: 1.{" "}
          <HighlightText>Historial Crediticio Limpio</HighlightText>• Paga tus
          deudas a tiempo • Mantén un bajo nivel de endeudamiento • Evita
          morosidad en créditos anteriores 2.{" "}
          <HighlightText>Estabilidad Financiera</HighlightText>• Demuestra
          ingresos estables • Mantén un trabajo formal • Presenta documentación
          clara de tus ingresos 3.{" "}
          <HighlightText>Gestión Financiera Responsable</HighlightText>•
          Controla tu relación deuda-ingreso • Mantén un buen score crediticio •
          Diversifica pero no te sobreendeudes
        </ArticleParagraph>

        <SubTitle>Verificación de Información Crediticia</SubTitle>
        <ArticleParagraph>
          En Ecuador, puedes verificar tu situación crediticia a través de: •
          Buró de Crédito de la Superintendencia de Bancos • Consultas directas
          en instituciones financieras • Plataformas de verificación crediticia
          oficial
          <HighlightText>Consejo Importante:</HighlightText> Revisa
          periódicamente tu historial crediticio para detectar y corregir
          posibles errores.
        </ArticleParagraph>

        <SubTitle>Tipos de Tarjetas de Crédito en Ecuador</SubTitle>
        <ArticleParagraph>
          Principales opciones disponibles: • Tarjetas básicas • Tarjetas
          premium • Tarjetas para estudiantes • Tarjetas corporativas • Tarjetas
          con beneficios especiales Cada tipo tiene: • Diferentes límites de
          crédito • Variedad de beneficios • Requisitos específicos
        </ArticleParagraph>

        <SubTitle>Consideraciones Importantes</SubTitle>
        <ArticleParagraph>
          Antes de solicitar una tarjeta de crédito, evalúa: • Tu capacidad real
          de pago • Tasas de interés • Comisiones y costos asociados •
          Beneficios adicionales • Flexibilidad de pagos
          <HighlightText>Recuerda:</HighlightText> Una tarjeta de crédito es una
          herramienta financiera que requiere responsabilidad y planificación.
        </ArticleParagraph>

        <ArticleParagraph>
          Una tarjeta de crédito puede ser un aliado financiero o una fuente de
          estrés. La clave está en la educación financiera, la planificación
          responsable y el uso inteligente del crédito.
        </ArticleParagraph>
      </DetailContainer>
    </BlogContentWrapper>
  );
};

export default BlogCreditCard;