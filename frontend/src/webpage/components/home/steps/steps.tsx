import {
  StepsContainer,
  StepsTitle,
  StepsSubtitle,
  StepsGrid,
  StepItem,
  StepWrapper,
  StepDescription,
} from "./style/consStyle";
import SearchIcon from "@mui/icons-material/Search";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DescriptionIcon from "@mui/icons-material/Description";

const Steps = () => {
  const steps = [
    {
      icon: <SearchIcon />,
      title: "Busca y compara",
      description: "Usa nuestro comparador para indicar lo que necesitas",
    },
    {
      icon: <CheckCircleIcon />,
      title: "Elige",
      description: "Elige entre todas las opciones del mercado fácilmente.",
    },
    {
      icon: <DescriptionIcon />,
      title: "Solicita",
      description: "Solicita los mejores productos de manera rápida y segura.",
    },
  ];

  return (
    <StepsContainer>
      <StepsTitle>3 simples pasos</StepsTitle>
      <StepsSubtitle>para tu crédito ideal</StepsSubtitle>
      <StepsGrid>
        {steps.map((step, index) => (
          <StepItem key={index}>
            <StepWrapper>
              {step.icon}
              <span className="step-text">{step.title}</span>
            </StepWrapper>
            <StepDescription>{step.description}</StepDescription>
          </StepItem>
        ))}
      </StepsGrid>
    </StepsContainer>
  );
};

export default Steps;
