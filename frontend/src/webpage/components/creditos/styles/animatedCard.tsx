import { Box, styled, Button } from "@mui/material";
import { cardAppear, fadeIn } from "./animations";

interface AnimatedCardProps {
  delay?: number;
  children: React.ReactNode;
}

const AnimatedContainer = styled(Box)<{ delay: number }>(({ delay }) => ({
  animation: `${cardAppear} 0.5s ease-out ${delay}s both`,
  display: "contents",
  "&:hover": {
    "& > *": {
      transform: "translateY(-5px)",
      transition: "transform 0.3s ease-in-out",
    },
  },
}));

export const AnimatedCard = ({ delay = 0, children }: AnimatedCardProps) => {
  return <AnimatedContainer delay={delay}>{children}</AnimatedContainer>;
};

export const AnimatedContainer2 = styled(Box)(({}) => ({
  transition: "all 0.3s ease-in-out",
  opacity: 0,
  animation: `${fadeIn} 0.5s ease-out forwards`,
}));

export const AnimatedActionButton = styled(Button)(({}) => ({
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.05)",
  },
  "&:active": {
    transform: "scale(0.95)",
  },
}));
