import React from "react";
import { styled } from "@mui/material/styles";
import { Box, Typography, Grid, Container, Paper } from "@mui/material";
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import VerifiedIcon from '@mui/icons-material/Verified';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import SecurityIcon from '@mui/icons-material/Security';
import GppGoodIcon from '@mui/icons-material/GppGood';
import SchoolIcon from '@mui/icons-material/School';

// Contenedor principal con el fondo oscuro característico
const AboutContainer = styled(Box)(({ theme }) => ({
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

// Sección con fondo ligeramente distinto
const Section = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: "40px",
  borderRadius: "16px",
  marginBottom: "40px",
  [theme.breakpoints.down("sm")]: {
    padding: "24px",
    marginBottom: "30px",
  },
}));

// Título de sección
const SectionTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.light,
  fontSize: "28px",
  fontWeight: 600,
  marginBottom: "20px",
  fontFamily: "'Galano Grotesque', sans-serif",
  [theme.breakpoints.down("sm")]: {
    fontSize: "24px",
    marginBottom: "16px",
  },
}));

// Párrafo común
const Paragraph = styled(Typography)(({ theme }) => ({
  color: theme.palette.common.white,
  fontSize: "16px",
  lineHeight: 1.7,
  marginBottom: "16px",
  fontFamily: "'Stage Grotesque', sans-serif",
  [theme.breakpoints.down("sm")]: {
    fontSize: "15px",
    lineHeight: 1.6,
  },
}));

// Tarjeta de valor
const ValueCard = styled(Paper)(({ theme }) => ({
  backgroundColor: "rgba(255, 255, 255, 0.05)",
  padding: "24px",
  borderRadius: "12px",
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  height: "100%",
  transition: "transform 0.3s, background-color 0.3s",
  "&:hover": {
    transform: "translateY(-5px)",
    backgroundColor: "rgba(99, 255, 72, 0.05)",
  },
}));

// Icono de valor
const ValueIcon = styled(Box)(({ theme }) => ({
  color: theme.palette.primary.light,
  fontSize: "48px",
  marginBottom: "16px",
  "& .MuiSvgIcon-root": {
    fontSize: "48px",
  },
}));

// Título de valor
const ValueTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.common.white,
  fontSize: "20px",
  fontWeight: 600,
  marginBottom: "12px",
  fontFamily: "'Galano Grotesque', sans-serif",
}));

// Descripción de valor
const ValueDescription = styled(Typography)(({ theme }) => ({
  color: theme.palette.common.white,
  fontSize: "14px",
  lineHeight: 1.6,
  opacity: 0.9,
  fontFamily: "'Stage Grotesque', sans-serif",
}));

const QuienesSomos: React.FC = () => {
  return (
    <AboutContainer>
      <Container maxWidth="lg">
        <MainTitle>
          Quiénes Somos
        </MainTitle>
        <Subtitle>
          Transformando la manera de acceder a servicios financieros en Ecuador
        </Subtitle>

        <Section>
          <SectionTitle>Nuestra Misión</SectionTitle>
          <Paragraph>
            En <HighlightText>Dinero al Vuelo</HighlightText>, creemos que todas las personas merecen acceso a productos financieros de calidad con total transparencia y sin complicaciones. Nuestra misión es <HighlightText>democratizar el acceso a servicios financieros</HighlightText> en Ecuador, permitiendo a los usuarios comparar, elegir y solicitar préstamos personales de forma rápida, segura y sin costo adicional.
          </Paragraph>
          <Paragraph>
            Hemos desarrollado una plataforma innovadora que conecta a usuarios con las mejores instituciones financieras del país, ofreciendo comparativas en tiempo real para que puedas tomar decisiones informadas sobre tu futuro financiero.
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>¿Por qué elegirnos?</SectionTitle>
          <Grid container spacing={4} sx={{ marginTop: "16px" }}>
            <Grid item xs={12} sm={6} md={4}>
              <ValueCard>
                <ValueIcon>
                  <TaskAltIcon />
                </ValueIcon>
                <ValueTitle>Comparación Transparente</ValueTitle>
                <ValueDescription>
                  Mostramos todas las opciones disponibles en el mercado con información clara sobre tasas, plazos y requisitos.
                </ValueDescription>
              </ValueCard>
            </Grid>
            
            <Grid item xs={12} sm={6} md={4}>
              <ValueCard>
                <ValueIcon>
                  <SecurityIcon />
                </ValueIcon>
                <ValueTitle>100% Seguro</ValueTitle>
                <ValueDescription>
                  Tu información personal está protegida con los más altos estándares de seguridad digital.
                </ValueDescription>
              </ValueCard>
            </Grid>
            
            <Grid item xs={12} sm={6} md={4}>
              <ValueCard>
                <ValueIcon>
                  <VerifiedIcon />
                </ValueIcon>
                <ValueTitle>Servicio Gratuito</ValueTitle>
                <ValueDescription>
                  Nuestro servicio de comparación y solicitud es completamente gratuito para todos los usuarios.
                </ValueDescription>
              </ValueCard>
            </Grid>
            
            <Grid item xs={12} sm={6} md={4}>
              <ValueCard>
                <ValueIcon>
                  <AccountBalanceIcon />
                </ValueIcon>
                <ValueTitle>Alianzas Estratégicas</ValueTitle>
                <ValueDescription>
                  Trabajamos con las instituciones financieras más reconocidas del Ecuador, incluyendo bancos y cooperativas.
                </ValueDescription>
              </ValueCard>
            </Grid>
            
            <Grid item xs={12} sm={6} md={4}>
              <ValueCard>
                <ValueIcon>
                  <GppGoodIcon />
                </ValueIcon>
                <ValueTitle>Respaldo y Confianza</ValueTitle>
                <ValueDescription>
                  Somos una plataforma confiable con años de experiencia en el sector financiero ecuatoriano.
                </ValueDescription>
              </ValueCard>
            </Grid>
            
            <Grid item xs={12} sm={6} md={4}>
              <ValueCard>
                <ValueIcon>
                  <SchoolIcon />
                </ValueIcon>
                <ValueTitle>Educación Financiera</ValueTitle>
                <ValueDescription>
                  Ofrecemos recursos y contenidos educativos para ayudarte a tomar mejores decisiones financieras.
                </ValueDescription>
              </ValueCard>
            </Grid>
          </Grid>
        </Section>

        <Section>
          <SectionTitle>Nuestro Proceso</SectionTitle>
          <Paragraph>
            En <HighlightText>Dinero al Vuelo</HighlightText> hemos simplificado el proceso de obtención de créditos personales en solo 3 pasos:
          </Paragraph>
          <Box sx={{ marginTop: "24px", marginBottom: "24px" }}>
            <Box sx={{ display: "flex", alignItems: "center", marginBottom: "16px" }}>
              <Typography variant="h5" sx={{ color: "primary.light", marginRight: "12px", fontWeight: "bold" }}>1.</Typography>
              <Paragraph sx={{ margin: 0 }}>
                <HighlightText>Busca y compara</HighlightText> - Indica el monto, plazo y tus ingresos, y te mostraremos las mejores opciones.
              </Paragraph>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", marginBottom: "16px" }}>
              <Typography variant="h5" sx={{ color: "primary.light", marginRight: "12px", fontWeight: "bold" }}>2.</Typography>
              <Paragraph sx={{ margin: 0 }}>
                <HighlightText>Elige</HighlightText> - Selecciona la institución financiera que mejor se adapte a tus necesidades.
              </Paragraph>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography variant="h5" sx={{ color: "primary.light", marginRight: "12px", fontWeight: "bold" }}>3.</Typography>
              <Paragraph sx={{ margin: 0 }}>
                <HighlightText>Solicita</HighlightText> - Completa tu solicitud de manera rápida y segura, y recibe respuesta en tiempo récord.
              </Paragraph>
            </Box>
          </Box>
          <Paragraph>
            Todo este proceso está diseñado para ahorrarte tiempo y esfuerzo, evitando que tengas que visitar múltiples instituciones financieras para comparar ofertas.
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>Compromiso con Ecuador</SectionTitle>
          <Paragraph>
            Somos una empresa 100% ecuatoriana comprometida con el desarrollo financiero del país. Entendemos las necesidades específicas de los ecuatorianos y trabajamos para ofrecer soluciones adaptadas al contexto económico nacional.
          </Paragraph>
          <Paragraph>
            Nuestro objetivo es contribuir a la inclusión financiera, permitiendo que más personas accedan a productos crediticios con condiciones favorables y transparentes, apoyando así el crecimiento económico y el bienestar de las familias ecuatorianas.
          </Paragraph>
        </Section>
      </Container>
    </AboutContainer>
  );
};

export default QuienesSomos;