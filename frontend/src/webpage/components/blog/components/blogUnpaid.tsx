import React from "react";
import { ArrowBack } from "@mui/icons-material";
import {
  DetailContainer,
  ArticleParagraph,
  HighlightText,
  SubTitle,
} from "../styles/constBlogUnpaid";
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

const BlogDetails: React.FC<BlogDetailsProps> = ({
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
          Dejar de cumplir el <HighlightText>pago de tus deudas</HighlightText>{" "}
          podría traerte consecuencias graves. Es importante tener una{" "}
          <HighlightText>educación financiera</HighlightText> para cumplir con
          nuestras obligaciones. ¿Qué pasa si no pago mi deuda al banco?, esto
          podría ocurrir:
        </ArticleParagraph>

        <SubTitle>Pagarás más intereses</SubTitle>
        <ArticleParagraph>
          La entidad bancaria aplicará{" "}
          <HighlightText>intereses de mora</HighlightText>, cuyo tipo suele ser
          muy superior a de los intereses ordinarios. El banco también podrá
          cobrar una comisión muy elevada por reclamación de cuotas impagadas.
          Intereses y comisiones se van acumulando a la deuda original de forma
          que cada día deberemos más dinero.
        </ArticleParagraph>

        <SubTitle>No accederás a créditos</SubTitle>
        <ArticleParagraph>
          Si no pagaste la cuota de tu tarjeta de crédito, el banco podría
          suspenderla. Es más, algunas entidades bancarias{" "}
          <HighlightText>cancelan las tarjetas de créditos</HighlightText> de
          sus clientes si notan deudas atrasadas en otros bancos.
        </ArticleParagraph>

        <SubTitle>Historial financiero manchado</SubTitle>
        <ArticleParagraph>
          ¿Qué pasa si no pagas al banco? Si no cumples con tus deudas, el banco
          te incluye en la central de riesgos y mancharás tu{" "}
          <HighlightText>historial crediticio</HighlightText> por muchos años.
          Es probable que cuando necesites un préstamo ningún banco confiará en
          ti por tu historial crediticio.
        </ArticleParagraph>

        <SubTitle>Embargo de bienes</SubTitle>
        <ArticleParagraph>
          A partir de la tercera cuota no pagada, el banco puede iniciar una
          reclamación judicial, aunque normalmente dejan pasar hasta seis meses.
          Finalizado este plazo lo que pasa dependerá del tipo de préstamo que
          tiene y de los bienes que posee para saldar la deuda.
        </ArticleParagraph>

        <ArticleParagraph>
          Pero,{" "}
          <HighlightText>
            ¿Qué pasa si no pago un crédito y no tengo bienes? o ¿Qué pasa si no
            pago al banco y no tengo bienes?
          </HighlightText>
          ; ante esta situación entran a tallar los avalistas. Estas personas
          tienen que responder también por sus deudas pendientes. Es decir, si
          usted no paga y no tiene bienes para embargar el banco puede exigir a
          sus avalistas que paguen su deuda o también embargar sus bienes.
        </ArticleParagraph>

        <SubTitle>¿Qué pasa si no pago la deuda del banco?</SubTitle>
        <ArticleParagraph>
          Si alguna vez te has preguntado: qué me puede hacer el banco si no le
          pago. Aquí la respuesta. Dejar de
          <HighlightText>pagar un préstamo</HighlightText>, sea hipotecario o
          personal, te puede acarrear problemas muy graves. Desde manchar tu
          historial crediticio, pagar más de la deuda inicial y lo peor sería
          tener problemas judiciales.
        </ArticleParagraph>

        <ArticleParagraph>
          Ante una situación de impago prolongado la entidad podría conseguir
          que un juez embargue tus bienes, que incluyen su vivienda, auto,
          cuentas bancarias y todo lo necesario para saldar la deuda.
        </ArticleParagraph>

        <SubTitle>¿Qué es un proceso judicial por deuda?</SubTitle>
        <ArticleParagraph>
          Recuerda que{" "}
          <HighlightText>no todas las deudas se judicializan.</HighlightText>{" "}
          Únicamente se refieren a créditos hipotecarios o préstamos con montos
          altos. Todo depende de la política del banco, y si la ganancia será
          superior a la pérdida que implica un proceso judicial.
        </ArticleParagraph>

        <SubTitle>¿Por qué cantidad de dinero te pueden demandar?</SubTitle>
        <ArticleParagraph>
          Las deudas se judicializan cuando son créditos hipotecarios o
          préstamos de montos muy elevados que estén garantizados con algún bien
          mueble o inmueble. Normalmente, las deudas que no se judicializan son
          las de sumas bajas y cuando el costo de hacer el proceso judicial es
          mayor que la deuda.
        </ArticleParagraph>

        <SubTitle>¿Qué hacer cuando te demandan por deuda?</SubTitle>
        <ArticleParagraph>
          Cuando te demandan por deuda, lo primero que debes hacer es buscar
          asesoría de un abogado y asegurarte que el documento que te haya
          llegado sea oficial (emitido por un juez). Este profesional evaluará
          tu caso y buscará una solución legal que no implique perjudicarte.
        </ArticleParagraph>
      </DetailContainer>
    </BlogContentWrapper>
  );
};

export default BlogDetails;