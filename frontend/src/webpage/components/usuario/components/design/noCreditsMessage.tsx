import { Typography, useTheme } from "@mui/material";

const NoCreditsMessage = () => {
  const theme = useTheme();

  return (
    <Typography 
      variant="body2" 
      sx={{ 
        textAlign: "center", 
        my: 2, 
        color: theme.palette.common.white 
      }}
    >
      No tienes créditos en proceso
    </Typography>
  );
};

export default NoCreditsMessage;