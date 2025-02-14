import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { filterFeedback, filterChange } from "@/components/creditos/styles/animations";

interface FilterButtonProps {
  $isActive?: boolean;
}

const FilterButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== '$isActive',
})<FilterButtonProps>(({ theme, $isActive }) => ({
  backgroundColor: $isActive ? theme.palette.primary.light : "transparent",
  color: $isActive ? theme.palette.text.secondary : theme.palette.common.white,
  minWidth: "80px",
  padding: "4px 16px",
  fontSize: "16px",
  fontWeight: 500,
  borderRadius: "8px",
  border: $isActive ? "none" : `1px solid ${theme.palette.primary.light}`,
  textTransform: "none",
  height: "32px",
  animation: `${filterChange} 0.3s ease-out`,
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: $isActive ? theme.palette.primary.light : "transparent",
    opacity: 0.9,
    transform: "translateY(-2px)",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
  },
  "&:active": {
    animation: `${filterFeedback} 0.3s ease`,
    transform: "translateY(0)",
  },
  ...$isActive && {
    "&::after": {
      content: '"✓"',
      marginLeft: "4px",
      animation: `${filterFeedback} 0.3s ease`,
    }
  }
}));

export default FilterButton;