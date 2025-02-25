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

const BlogCreativeForms: React.FC<BlogDetailsProps> = ({
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
          La temporada de fiestas es un momento de alegría, pero también de
          potencial estrés financiero. Mientras la emoción de las celebraciones
          nos envuelve, el impacto en nuestro bolsillo puede ser significativo.
          Sin embargo, con una planificación inteligente y creatividad, es
          posible disfrutar las fiestas sin comprometer tu estabilidad
          económica.
        </ArticleParagraph>

        <SubTitle>
          Estrategias Financieras Creativas para Sobrevivir las Fiestas
        </SubTitle>

        <SubTitle>1. Planificación Financiera Estratégica</SubTitle>
        <ArticleParagraph>
          La clave para una navegación financiera exitosa en temporada festiva
          es la <HighlightText>planificación proactiva</HighlightText>. No se
          trata solo de establecer un presupuesto, sino de crear un plan de
          acción financiero integral: • Realiza un análisis detallado de tus
          ingresos y gastos mensuales • Establece un fondo específico para
          gastos navideños desde principios de año • Divide tu presupuesto
          festivo en categorías: regalos, alimentación, decoración y eventos •
          Usa aplicaciones de seguimiento de gastos para mantener el control
        </ArticleParagraph>

        <SubTitle>2. Regalos Inteligentes y Significativos</SubTitle>
        <ArticleParagraph>
          Los mejores regalos no son necesariamente los más costosos. Considera
          estas alternativas creativas: • Regalos hechos a mano con habilidades
          personales (repostería, artesanía, etc.) • Experiencias en lugar de
          objetos (clases, talleres, experiencias compartidas) • Intercambios de
          regalos con límites de presupuesto • Regalos digitales o suscripciones
          con costos más accesibles • Kits personalizados con elementos de bajo
          costo pero alto valor sentimental
        </ArticleParagraph>

        <SubTitle>3. Celebraciones Económicas y Creativas</SubTitle>
        <ArticleParagraph>
          Organizar reuniones festivas no tiene por qué ser sinónimo de gastar
          una fortuna: • Implementa el concepto de "cena compartida" donde cada
          invitado aporta un platillo • Considera reuniones temáticas con
          presupuestos predefinidos • Busca venues alternativos y económicos
          (casas, espacios comunitarios) • Utiliza decoraciones reutilizables o
          fabricadas artesanalmente • Planifica actividades grupales que no
          requieran grandes inversiones
        </ArticleParagraph>

        <SubTitle>4. Técnicas de Ahorro Creativo</SubTitle>
        <ArticleParagraph>
          Más allá de los gastos tradicionales, existen estrategias innovadoras
          para ahorrar: • Aprovecha ofertas y descuentos anticipados • Utiliza
          aplicaciones de cashback y comparadores de precios • Considera
          opciones de compras grupales para obtener mejores precios • Explora
          mercados locales y ferias para encontrar alternativas económicas •
          Implementa un "mes de austeridad" previo a las fiestas para generar un
          fondo extra
        </ArticleParagraph>

        <SubTitle>5. Envoltura y Presentación Económica</SubTitle>
        <ArticleParagraph>
          La presentación de los regalos puede ser elegante sin ser costosa: •
          Usa materiales reciclados y kraft para envolturas • Aprende técnicas
          de origami para envolturas creativas • Utiliza elementos naturales
          como hojas, ramas o cordel para decorar • Crea etiquetas
          personalizadas con materiales de bajo costo • Explora tutoriales
          online para técnicas de envoltura económica
        </ArticleParagraph>

        <ArticleParagraph>
          Recuerda, el verdadero espíritu de las fiestas no está en el dinero
          gastado, sino en los momentos compartidos y las conexiones
          fortalecidas. Una planificación inteligente te permitirá disfrutar
          plenamente sin la preocupación de un futuro financiero comprometido.
        </ArticleParagraph>
      </DetailContainer>
    </BlogContentWrapper>
  );
};

export default BlogCreativeForms;