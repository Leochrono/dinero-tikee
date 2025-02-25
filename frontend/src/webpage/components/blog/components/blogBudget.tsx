import React from "react";
import { ArrowBack } from "@mui/icons-material";
import {
  DetailContainer,
  ArticleTitle,
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

const BlogBudget: React.FC<BlogDetailsProps> = ({ blogPost, onBackToList }) => {
  return (
    <BlogContentWrapper>
      <BackButtonContainer>
        <BackButton onClick={onBackToList}>
          <ArrowBack />
        </BackButton>
      </BackButtonContainer>
      
      <DetailContainer>
        <ArticleParagraph>
          Lograr nuestros objetivos, muchas veces involucran dinero. Aquí te
          explicamos algunos términos que debes saber. ¿Qué es una meta? Una
          meta en presupuesto es lo que se busca a futuro con la{" "}
          <HighlightText>organización de tus finanzas</HighlightText>. Es cierto
          que tiene mucho que ver con el ahorro, pero no se confunda, eso no es
          todo lo que logra cuando decide poner orden a sus finanzas y meta
          ingresos.
        </ArticleParagraph>

        <SubTitle>¿Qué es un presupuesto y su objetivo?</SubTitle>
        <ArticleParagraph>
          Un{" "}
          <HighlightText>
            presupuesto meta es la planificación anticipada de los gastos e
            ingresos de una persona o empresa
          </HighlightText>
          . Se define como un plan de acción para cumplir objetivos financieros
          determinados en un plazo específico y con ciertas condiciones según el
          contexto económico ecuatoriano.
        </ArticleParagraph>

        <SubTitle>¿Cuál es el objetivo de hacer un presupuesto?</SubTitle>

        <ArticleParagraph>
          Las metas de un presupuesto se pueden apreciar en lo siguiente:
        </ArticleParagraph>

        <SubTitle>Ahorrar</SubTitle>
        <ArticleParagraph>
          Se busca que destine cierto porcentaje de su sueldo al ahorro. No se
          trata de sacrificar todo su ingreso, sino de elegir un porcentaje
          pequeño pero significativo. En el contexto económico ecuatoriano, esto
          puede ser especialmente importante dado el panorama económico actual.
        </ArticleParagraph>

        <SubTitle>Ordenar</SubTitle>
        <ArticleParagraph>
          Una de las principales metas es poner orden a sus finanzas, comprender
          cuánto está gastando y en qué, para poder hacer pequeños cambios
          estratégicos.
        </ArticleParagraph>

        <SubTitle>Invertir</SubTitle>
        <ArticleParagraph>
          La idea de tener un presupuesto es aprender a evaluar cuánto tiene y
          ver las posibilidades de hacer crecer su dinero. En Ecuador, esto
          puede incluir opciones como: • Depósitos a plazo fijo en bancos
          locales • Títulos del Banco Central • Fondos de inversión nacionales •
          Pequeñas inversiones en cooperativas de ahorro
        </ArticleParagraph>

        <SubTitle>
          ¿Cuáles son los principales elementos de un presupuesto?
        </SubTitle>
        <ArticleParagraph>
          Los principales elementos de un presupuesto son: • Definir los
          ingresos mensuales • Definir los gastos fijos mensuales • Definir los
          gastos variables • Calcular el flujo de dinero (diferencia entre
          ingresos y gastos)
        </ArticleParagraph>

        <SubTitle>¿Cómo contribuye el presupuesto al logro de metas?</SubTitle>
        <ArticleParagraph>
          Realizar un presupuesto es una herramienta fundamental para
          identificar ingresos y gastos en un periodo determinado. Esta
          identificación te permite: • Planificar ahorros • Establecer metas
          financieras claras • Cumplir objetivos a corto y mediano plazo • Tener
          mayor control sobre tus finanzas personales
        </ArticleParagraph>

        <ArticleParagraph>
          En el contexto ecuatoriano, donde la economía puede presentar
          desafíos, contar con un presupuesto personal bien estructurado puede
          marcar la diferencia entre mantenerse estable o enfrentar dificultades
          financieras.
        </ArticleParagraph>
      </DetailContainer>
    </BlogContentWrapper>
  );
};

export default BlogBudget;