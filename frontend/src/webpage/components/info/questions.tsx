import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { 
  Box, 
  Typography, 
  Container, 
  Paper, 
  Accordion, 
  AccordionSummary, 
  AccordionDetails 
} from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

// Contenedor principal con el fondo oscuro característico
const FaqContainer = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  backgroundColor: theme.palette.background.default,
  padding: "60px 0",
  width: "100%",
  boxSizing: "border-box",
}));

// Título principal con el estilo destacado
const MainTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.common.white,
  fontSize: "48px",
  fontWeight: 700,
  marginBottom: "16px",
  textAlign: "center",
  fontFamily: "'Visby', sans-serif",
  [theme.breakpoints.down("md")]: {
    fontSize: "36px",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "30px",
  },
}));

// Subtítulo descriptivo
const Subtitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.common.white,
  fontSize: "20px",
  lineHeight: 1.5,
  marginBottom: "40px",
  textAlign: "center",
  opacity: 0.9,
  fontFamily: "'Stage Grotesque', sans-serif",
  [theme.breakpoints.down("sm")]: {
    fontSize: "18px",
    marginBottom: "30px",
  },
}));

// Texto resaltado en verde
const HighlightText = styled("span")(({ theme }) => ({
  color: theme.palette.primary.light,
  fontWeight: 500,
}));

// Acordeón personalizado para las preguntas
const StyledAccordion = styled(Accordion)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.common.white,
  boxShadow: 'none',
  margin: '8px 0',
  borderRadius: '8px',
  '&:before': {
    display: 'none',
  },
  '&.Mui-expanded': {
    margin: '12px 0',
    boxShadow: `0 4px 12px rgba(${theme.palette.primary.light}, 0.1)`,
  },
}));

// Encabezado del acordeón (la pregunta)
const StyledAccordionSummary = styled(AccordionSummary)(({ theme }) => ({
  padding: '0 24px',
  minHeight: '64px',
  '& .MuiAccordionSummary-content': {
    margin: '16px 0',
  },
  '&.Mui-expanded': {
    minHeight: '64px',
    borderBottom: `1px solid rgba(255, 255, 255, 0.1)`,
  },
  '& .MuiSvgIcon-root': {
    color: theme.palette.primary.light,
    transition: 'transform 0.3s',
  },
  '&.Mui-expanded .MuiSvgIcon-root': {
    transform: 'rotate(180deg)',
  },
}));

// Contenido del acordeón (la respuesta)
const StyledAccordionDetails = styled(AccordionDetails)(({ theme }) => ({
  padding: '16px 24px 24px',
  borderTop: 'none',
}));

// Texto de la pregunta
const QuestionText = styled(Typography)(({ theme }) => ({
  fontSize: '18px',
  fontWeight: 600,
  fontFamily: "'Galano Grotesque', sans-serif",
  [theme.breakpoints.down("sm")]: {
    fontSize: '16px',
  },
}));

// Texto de la respuesta
const AnswerText = styled(Typography)(({ theme }) => ({
  fontSize: '16px',
  lineHeight: 1.6,
  color: 'rgba(255, 255, 255, 0.8)',
  fontFamily: "'Stage Grotesque', sans-serif",
  '& a': {
    color: theme.palette.primary.light,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: '15px',
  },
}));

// Contenedor de categoría
const CategoryContainer = styled(Box)(({ theme }) => ({
  marginBottom: '40px',
}));

// Título de categoría
const CategoryTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.light,
  fontSize: '24px',
  fontWeight: 600,
  marginBottom: '20px',
  fontFamily: "'Galano Grotesque', sans-serif",
  paddingLeft: '12px',
  borderLeft: `4px solid ${theme.palette.primary.light}`,
  [theme.breakpoints.down("sm")]: {
    fontSize: '20px',
  },
}));

// Componente principal
const PreguntasFrecuentes: React.FC = () => {
  // Estado para controlar qué acordeón está expandido
  const [expanded, setExpanded] = useState<string | false>(false);

  // Manejador para cambiar el estado de expansión
  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  // Datos de las preguntas frecuentes organizadas por categorías
  const faqData = [
    {
      category: "Sobre Dinero al Vuelo",
      questions: [
        {
          id: "panel1",
          question: "¿Qué es Dinero al Vuelo?",
          answer: "Dinero al Vuelo es una plataforma ecuatoriana que permite comparar, elegir y solicitar préstamos personales de distintas instituciones financieras. Nos encargamos de mostrarte las mejores opciones según tus necesidades y facilitamos el proceso de solicitud."
        },
        {
          id: "panel2",
          question: "¿Dinero al Vuelo es un banco o entidad financiera?",
          answer: "No, Dinero al Vuelo no es un banco ni una entidad financiera. Somos un comparador y facilitador que te conecta con instituciones financieras. No otorgamos préstamos directamente, sino que te ayudamos a encontrar la mejor opción entre nuestros aliados bancarios y cooperativas."
        },
        {
          id: "panel3",
          question: "¿El servicio de Dinero al Vuelo tiene algún costo?",
          answer: "No, nuestro servicio es completamente gratuito para los usuarios. Puedes comparar opciones, realizar simulaciones y solicitar préstamos sin ningún costo adicional. Nos financiamos a través de acuerdos con las instituciones financieras que forman parte de nuestra plataforma."
        }
      ]
    },
    {
      category: "Préstamos Personales",
      questions: [
        {
          id: "panel4",
          question: "¿Qué requisitos necesito para solicitar un préstamo?",
          answer: "Los requisitos básicos incluyen: ser mayor de edad, tener cédula de identidad ecuatoriana, contar con ingresos mensuales demostrables, y tener un historial crediticio aceptable. Cada institución puede tener requisitos adicionales que se especificarán en el proceso de solicitud."
        },
        {
          id: "panel5",
          question: "¿Cuál es el monto máximo que puedo solicitar?",
          answer: "El monto máximo depende de varios factores, incluyendo tus ingresos mensuales, historial crediticio y la política de la institución financiera. En nuestra plataforma puedes encontrar préstamos desde $2,000 hasta $30,000, sujetos a evaluación crediticia."
        },
        {
          id: "panel6",
          question: "¿A qué plazo puedo solicitar un préstamo?",
          answer: "Los plazos disponibles varían generalmente entre 6 y 64 meses, dependiendo del monto solicitado y la institución financiera. En nuestra plataforma puedes ajustar el plazo según tus preferencias y capacidad de pago."
        }
      ]
    },
    {
      category: "Proceso de Solicitud",
      questions: [
        {
          id: "panel7",
          question: "¿Cómo funciona el proceso de solicitud?",
          answer: "El proceso es simple: primero ingresas el monto, plazo y tus ingresos en nuestro comparador. Luego, seleccionas la opción que más te convenga entre las disponibles. Finalmente, completas un formulario con tus datos y enviamos tu solicitud a la institución financiera, quien te contactará para finalizar el proceso."
        },
        {
          id: "panel8",
          question: "¿Cuánto tiempo tarda en aprobarse mi solicitud?",
          answer: "Los tiempos de aprobación varían según la institución financiera y la complejidad de cada caso. En general, recibirás una respuesta preliminar en un plazo de 24 a 72 horas hábiles. Las solicitudes más sencillas pueden resolverse incluso el mismo día."
        },
        {
          id: "panel9",
          question: "¿Qué pasa si mi solicitud es rechazada?",
          answer: "Si tu solicitud es rechazada, te informaremos los motivos y te ofreceremos orientación sobre cómo mejorar tus posibilidades en futuras solicitudes. También podemos ayudarte a encontrar alternativas más acordes a tu perfil crediticio actual."
        }
      ]
    },
    {
      category: "Seguridad y Datos",
      questions: [
        {
          id: "panel10",
          question: "¿Es seguro ingresar mis datos en la plataforma?",
          answer: "Sí, implementamos altos estándares de seguridad para proteger tus datos personales y financieros. Utilizamos cifrado SSL, cumplimos con todas las normativas de protección de datos y nunca compartimos tu información con terceros sin tu consentimiento expreso."
        },
        {
          id: "panel11",
          question: "¿Cómo utilizan mi información personal?",
          answer: "Tu información personal se utiliza exclusivamente para procesar tu solicitud de préstamo y compartirla con la institución financiera que selecciones. No utilizamos tus datos para otros fines sin tu consentimiento previo y puedes solicitar la eliminación de tus datos en cualquier momento."
        }
      ]
    }
  ];

  return (
    <FaqContainer>
      <Container maxWidth="lg">
        <MainTitle>Preguntas Frecuentes</MainTitle>
        <Subtitle>
          Encuentra respuestas a las dudas más comunes sobre <HighlightText>Dinero al Vuelo</HighlightText> y nuestros servicios financieros
        </Subtitle>

        {faqData.map((category, index) => (
          <CategoryContainer key={index}>
            <CategoryTitle>{category.category}</CategoryTitle>
            {category.questions.map((item) => (
              <StyledAccordion 
                key={item.id} 
                expanded={expanded === item.id} 
                onChange={handleChange(item.id)}
              >
                <StyledAccordionSummary
                  expandIcon={<KeyboardArrowDownIcon />}
                  aria-controls={`${item.id}-content`}
                  id={`${item.id}-header`}
                >
                  <QuestionText>{item.question}</QuestionText>
                </StyledAccordionSummary>
                <StyledAccordionDetails>
                  <AnswerText>{item.answer}</AnswerText>
                </StyledAccordionDetails>
              </StyledAccordion>
            ))}
          </CategoryContainer>
        ))}
      </Container>
    </FaqContainer>
  );
};

export default PreguntasFrecuentes;