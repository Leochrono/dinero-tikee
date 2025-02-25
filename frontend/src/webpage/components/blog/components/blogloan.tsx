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

const BlogLoan: React.FC<BlogDetailsProps> = ({ blogPost, onBackToList }) => {
  return (
    <BlogContentWrapper>
      <BackButtonContainer>
        <BackButton onClick={onBackToList}>
          <ArrowBack />
        </BackButton>
      </BackButtonContainer>
      
      <DetailContainer>
        <ArticleParagraph>
          Los préstamos pueden ser una herramienta financiera útil o una trampa
          de endeudamiento. En el contexto económico ecuatoriano, comprender a
          fondo los mecanismos de crédito es fundamental para tomar decisiones
          financieras inteligentes.
        </ArticleParagraph>

        <SubTitle>Entendiendo los Préstamos en Ecuador</SubTitle>
        <ArticleParagraph>
          <HighlightText>
            ¿Qué debes saber antes de solicitar un préstamo?
          </HighlightText>
          Elementos clave a considerar: • Capacidad real de pago • Fuentes de
          ingreso estables • Impacto en tu historial crediticio • Condiciones
          económicas actuales del país
        </ArticleParagraph>

        <SubTitle>
          Tipos de Préstamos en el Sistema Financiero Ecuatoriano
        </SubTitle>
        <ArticleParagraph>
          Principales opciones de crédito: 1.{" "}
          <HighlightText>Préstamos Personales</HighlightText>• Créditos de
          consumo • Préstamos para empleados • Créditos para independientes 2.{" "}
          <HighlightText>Préstamos Hipotecarios</HighlightText>• Crédito
          hipotecario del BIESS • Créditos bancarios para vivienda • Programas
          de vivienda gubernamentales 3.{" "}
          <HighlightText>Microcréditos</HighlightText>• Créditos para
          emprendedores • Financiamiento para pequeños negocios • Opciones de
          cooperativas de ahorro
        </ArticleParagraph>

        <SubTitle>Estrategias para un Endeudamiento Responsable</SubTitle>
        <ArticleParagraph>
          Consejos para solicitar un préstamo de manera inteligente: •{" "}
          <HighlightText>Evalúa tu capacidad de pago</HighlightText>- Calcula tu
          relación deuda-ingreso - No comprometer más del 30-40% de tus ingresos
          • <HighlightText>Comprende las condiciones</HighlightText>- Tasas de
          interés - Plazos de pago - Costos adicionales - Requisitos específicos
          • <HighlightText>Prepara tu documentación</HighlightText>-
          Comprobantes de ingresos - Documentos de identidad - Historial
          crediticio
        </ArticleParagraph>

        <SubTitle>Consolidación de Deudas</SubTitle>
        <ArticleParagraph>
          <HighlightText>Opciones para manejar múltiples deudas:</HighlightText>
          • Refinanciamiento de créditos • Consolidación de deudas • Negociación
          con entidades financieras • Reestructuración de pagos
          <HighlightText>Importante:</HighlightText> Solicitar un nuevo préstamo
          para pagar deudas anteriores no resuelve el problema de raíz. Es
          crucial abordar las causas originales del endeudamiento.
        </ArticleParagraph>

        <SubTitle>Riesgos y Consideraciones</SubTitle>
        <ArticleParagraph>
          Factores a tener en cuenta: • Impacto en tu calificación crediticia •
          Variabilidad de tasas de interés • Consecuencias legales de impago •
          Opciones de seguro de desgravamen • Flexibilidad de pagos
          <HighlightText>Recuerda:</HighlightText> Un préstamo debe ser una
          herramienta para mejorar tu situación financiera, no una carga
          adicional.
        </ArticleParagraph>

        <ArticleParagraph>
          La clave está en la educación financiera, la planificación responsable
          y la comprensión profunda de tus necesidades y capacidades económicas.
        </ArticleParagraph>
      </DetailContainer>
    </BlogContentWrapper>
  );
};

export default BlogLoan;