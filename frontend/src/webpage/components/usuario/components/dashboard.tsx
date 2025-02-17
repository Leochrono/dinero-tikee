import { Box, Typography, Grid } from "@mui/material";
import { UserCredit } from "@/src/core/types/credit.types";
import { creditStatusConfig } from "@/src/core/types/profilestatus";

interface DashboardProps {
  credits: UserCredit[];
}

const Dashboard = ({ credits }: DashboardProps) => {
  const validCredits = credits.filter((credit) => credit.institution);

  const summary = {
    total: validCredits.length,
    byStatus: Object.keys(creditStatusConfig).reduce((acc, status) => {
      acc[status] = validCredits.filter(
        (credit) => credit.status === status
      ).length;
      return acc;
    }, {} as Record<string, number>),
  };

  const orderedStatuses = Object.keys(creditStatusConfig).sort(
    (a, b) =>
      creditStatusConfig[a as keyof typeof creditStatusConfig].order -
      creditStatusConfig[b as keyof typeof creditStatusConfig].order
  );

  return (
    <Box
      sx={{
        mb: 4,
        p: 3,
        bgcolor: "rgba(255, 255, 255, 0.05)",
        borderRadius: 2,
      }}
    >
      <Typography variant="h6" sx={{ color: "white", mb: 2 }}>
        Resumen de Solicitudes
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <Box
            sx={{
              p: 2,
              bgcolor: "rgba(255, 255, 255, 0.05)",
              borderRadius: 1,
              textAlign: "center",
            }}
          >
            <Typography variant="h4" sx={{ color: "white" }}>
              {summary.total}
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "rgba(255, 255, 255, 0.7)" }}
            >
              Total de Solicitudes
            </Typography>
          </Box>
        </Grid>
        {orderedStatuses.map((status) => (
          <Grid item xs={6} md={3} key={status}>
            <Box
              sx={{
                p: 2,
                bgcolor: "rgba(255, 255, 255, 0.05)",
                borderRadius: 1,
                borderLeft: `4px solid ${
                  creditStatusConfig[status as keyof typeof creditStatusConfig]
                    .color
                }`,
                textAlign: "center",
              }}
            >
              <Typography variant="h4" sx={{ color: "white" }}>
                {summary.byStatus[status]}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "rgba(255, 255, 255, 0.7)" }}
              >
                {
                  creditStatusConfig[status as keyof typeof creditStatusConfig]
                    .text
                }
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Dashboard;
