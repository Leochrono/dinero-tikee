import React from "react";
import { Box, Pagination, useTheme } from "@mui/material";

interface CreditResultsPaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}

const CreditResultsPagination: React.FC<CreditResultsPaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
}) => {
  const theme = useTheme();

  if (totalPages <= 1) return null;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        mt: 4,
        mb: 2,
      }}
    >
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={onPageChange}
        color="primary"
        size="large"
        showFirstButton
        showLastButton
        sx={{
          "& .MuiPaginationItem-root": {
            color: "white",
            borderColor: theme.palette.primary.light,
          },
          "& .Mui-selected": {
            backgroundColor: theme.palette.primary.light,
            "&:hover": {
              backgroundColor: theme.palette.primary.main,
            },
          },
        }}
      />
    </Box>
  );
};

export default CreditResultsPagination;
