import React from "react";
import { Box, Button, useTheme } from "@mui/material";

interface CreditDetailsActionsProps {
  onBack: () => void;
}

const CreditDetailsActions: React.FC<CreditDetailsActionsProps> = ({
  onBack,
}) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        mb: 2,
        [theme.breakpoints.down("md")]: {
          display: "flex",
          justifyContent: "center",
        },
      }}
    >
      <Button
        onClick={onBack}
        variant="outlined"
        color="primary"
        sx={{
          [theme.breakpoints.down("md")]: {
            width: "100%",
            maxWidth: "200px",
          },
        }}
      >
        Volver
      </Button>
    </Box>
  );
};

export default CreditDetailsActions;
