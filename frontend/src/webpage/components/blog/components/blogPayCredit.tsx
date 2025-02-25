import React from "react";
import { ArrowBack } from "@mui/icons-material";
import {
  DetailContainer,
  ArticleParagraph,
  HighlightText,
  SubTitle,
} from "@/components/blog/styles/constBlogUnpaid";
import { BackButton } from "@/components/login/components/styles/constregistro";
import { Box, styled } from "@mui/material";

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

const BlogPayCredit: React.FC<BlogDetailsProps> = ({
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
          Las tarjetas de crédito son herramientas financieras poderosas que,
          utilizadas incorrectamente, pueden convertirse en una trampa de
          endeudamiento. En el contexto económico ecuatoriano, comprender
          estrategias inteligentes de pago es fundamental.
        </ArticleParagraph>

        <SubTitle>
          Estrategias Inteligentes de Pago con Tarjeta de Crédito
        </SubTitle>
        <ArticleParagraph>
          <HighlightText>Principios Fundamentales:</HighlightText>• Evitar usar
          la tarjeta para todo tipo de gastos • Planificar compras
          estratégicamente • Comprender el impacto real de los intereses •
          Mantener un uso responsable del crédito
        </ArticleParagraph>

        <SubTitle>Modalidades de Pago: Contado vs. Cuotas</SubTitle>
        <ArticleParagraph>
          <HighlightText>Pago al Contado</HighlightText>• Pago inmediato en
          efectivo o débito • Sin intereses adicionales • Menor costo total
          <HighlightText>Pago en Cuotas</HighlightText>• Diferimiento del pago •
          Intereses incrementales • Mayor costo total del producto
          <HighlightText>Regla de Oro:</HighlightText> A más cuotas, más
          intereses pagarás.
        </ArticleParagraph>

        <SubTitle>Análisis de Cuotas y su Impacto Financiero</SubTitle>
        <ArticleParagraph>
          Consideraciones sobre diferentes plazos de cuotas: •{" "}
          <HighlightText>12 Cuotas</HighlightText>- Precio dividido en 12 pagos
          mensuales - Periodo de un año - Impacto moderado en finanzas
          personales • <HighlightText>36 Cuotas</HighlightText>- Máximo típico
          en tarjetas de crédito - Tres años de compromiso financiero - Alto
          costo por intereses acumulados •{" "}
          <HighlightText>48 Cuotas</HighlightText>- Aproximadamente 4 años -
          Recomendado solo para bienes de alto valor - Mayor riesgo financiero
        </ArticleParagraph>

        <SubTitle>Estrategias para Minimizar Intereses</SubTitle>
        <ArticleParagraph>
          Tácticas para un uso inteligente del crédito: 1.{" "}
          <HighlightText>Pago Anticipado</HighlightText>• Cancelar antes de la
          fecha de corte • Evitar cargos por intereses • Mantener un historial
          crediticio positivo 2.{" "}
          <HighlightText>Planificación de Compras</HighlightText>• Evaluar
          necesidad real de la compra • Comparar opciones de financiamiento •
          Calcular costo total con intereses 3.{" "}
          <HighlightText>Gestión de Ciclo de Crédito</HighlightText>• Comprender
          fechas de corte • Aprovechar periodos sin intereses • Mantener bajo
          control el endeudamiento
        </ArticleParagraph>

        <SubTitle>Selección Inteligente de Tarjeta de Crédito</SubTitle>
        <ArticleParagraph>
          Factores a considerar: • Tasas de interés • Beneficios adicionales •
          Comisiones • Flexibilidad de pagos • Reputación de la institución
          financiera
          <HighlightText>Consejo Clave:</HighlightText> No solo te fijes en el
          límite de crédito, sino en las condiciones integrales de la tarjeta.
        </ArticleParagraph>

        <ArticleParagraph>
          Recuerda: Una tarjeta de crédito es una herramienta financiera, no un
          recurso ilimitado. La disciplina, la planificación y el conocimiento
          son tus mejores aliados para un uso responsable.
        </ArticleParagraph>
      </DetailContainer>
    </BlogContentWrapper>
  );
};

export default BlogPayCredit;