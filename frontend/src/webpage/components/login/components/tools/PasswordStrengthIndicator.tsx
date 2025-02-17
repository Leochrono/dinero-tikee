import { Box, LinearProgress, Typography } from "@mui/material";

interface PasswordStrengthIndicatorProps {
  strength: number;
  message: string;
}

export const PasswordStrengthIndicator = ({
  strength,
  message,
}: PasswordStrengthIndicatorProps) => {
  const getColor = (strength: number) => {
    if (strength <= 1) return "#ff4444";
    if (strength <= 2) return "#ffbb33";
    if (strength <= 3) return "#00C851";
    return "#007E33";
  };

  const getRecommendations = () => {
    const recommendations = [
      { text: "Incluir una letra mayúscula", met: /[A-Z]/.test(message) },
      { text: "Incluir una letra minúscula", met: /[a-z]/.test(message) },
      { text: "Incluir un número", met: /[0-9]/.test(message) },
      {
        text: "Incluir un carácter especial (!@#$%^&*)",
        met: /[!@#$%^&*]/.test(message),
      },
    ];

    return (
      <Box sx={{ mt: 1 }}>
        {recommendations.map((rec, index) => (
          <Typography
            key={index}
            variant="caption"
            sx={{
              display: "block",
              color: "rgba(255,255,255,0.7)",
              "&:before": {
                content: '"• "',
                color: rec.met ? "#00C851" : "rgba(255,255,255,0.7)",
              },
            }}
          >
            {rec.text}
          </Typography>
        ))}
      </Box>
    );
  };

  return (
    <Box sx={{ mt: 1, mb: 2 }}>
      <LinearProgress
        variant="determinate"
        value={(strength / 5) * 100}
        sx={{
          height: 8,
          borderRadius: 5,
          backgroundColor: "rgba(255,255,255,0.1)",
          "& .MuiLinearProgress-bar": {
            backgroundColor: getColor(strength),
          },
        }}
      />
      {message && (
        <Typography
          variant="caption"
          sx={{
            color: getColor(strength),
            mt: 0.5,
            display: "block",
          }}
        >
          {message}
        </Typography>
      )}
      {getRecommendations()}
    </Box>
  );
};
