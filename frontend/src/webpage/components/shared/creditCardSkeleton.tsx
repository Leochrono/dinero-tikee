import { Box, Skeleton, styled } from "@mui/material";

const SkeletonCard = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  borderRadius: "16px",
  padding: "24px",
  display: "grid",
  gridTemplateColumns: "120px 1fr auto",
  alignItems: "center",
  gap: "24px",
  border: `1px solid ${theme.palette.primary.main}`,
  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "1fr",
    padding: "16px",
  },
}));

const CreditCardSkeleton = () => {
  return (
    <SkeletonCard>
      <Skeleton 
        variant="rectangular" 
        width={120} 
        height={120} 
        sx={{ borderRadius: 2, bgcolor: 'rgba(255, 255, 255, 0.1)' }} 
      />
      <Box sx={{ display: 'flex', gap: 4 }}>
        {[1, 2, 3].map((index) => (
          <Box key={index}>
            <Skeleton 
              width={60} 
              height={20} 
              sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)' }} 
            />
            <Skeleton 
              width={80} 
              height={32} 
              sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)' }} 
            />
          </Box>
        ))}
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Skeleton 
          width={200} 
          height={40} 
          sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)' }} 
        />
        <Skeleton 
          width={120} 
          height={40} 
          sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)' }} 
        />
      </Box>
    </SkeletonCard>
  );
};

export default CreditCardSkeleton;