import React from "react";
import { Box, Button, ButtonProps, styled } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {
  FiltersContainer,
  FilterGroup,
  FilterLabel,
  ActiveFilterChip,
} from "../../styles/creditResultConst";

interface FilterButtonProps extends ButtonProps {
  isactive?: string;
}

const FilterButton = styled(Button)<FilterButtonProps>(
  ({ theme, isactive }) => ({
    backgroundColor:
      isactive === "true" ? theme.palette.primary.light : "transparent",
    color: theme.palette.common.white,
    border: `1px solid ${theme.palette.primary.light}`,
    borderRadius: "50px",
    padding: "4px 12px",
    fontSize: "14px",
    "&:hover": {
      backgroundColor:
        isactive === "true"
          ? theme.palette.primary.main
          : "rgba(255,255,255,0.1)",
    },
  })
);

interface CreditResultsFiltersProps {
  onlyBanks: boolean | undefined;
  rateFilter: "min" | "max" | undefined;
  handleBankFilter: (value: boolean) => void;
  handleRateFilter: (value: "min" | "max") => void;
}

const CreditResultsFilters: React.FC<CreditResultsFiltersProps> = ({
  onlyBanks,
  rateFilter,
  handleBankFilter,
  handleRateFilter,
}) => {
  return (
    <>
      {(onlyBanks !== undefined || rateFilter !== undefined) && (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 1,
            mt: 2,
            mb: 2,
            justifyContent: "center",
          }}
        >
          {onlyBanks !== undefined && (
            <ActiveFilterChip>
              {onlyBanks ? "Solo Bancos" : "Solo Cooperativas"}
              <CloseIcon
                className="clearIcon"
                onClick={() => handleBankFilter(onlyBanks)}
              />
            </ActiveFilterChip>
          )}
          {rateFilter !== undefined && (
            <ActiveFilterChip>
              Tasa {rateFilter === "min" ? "Mínima" : "Máxima"}
              <CloseIcon
                className="clearIcon"
                onClick={() => handleRateFilter(rateFilter)}
              />
            </ActiveFilterChip>
          )}
        </Box>
      )}

      <FiltersContainer>
        <FilterGroup>
          <FilterLabel>Solo Bancos:</FilterLabel>
          <Box sx={{ display: "flex", gap: 1 }}>
            <FilterButton
              isactive={onlyBanks === true ? "true" : "false"}
              onClick={() => handleBankFilter(true)}
            >
              sí
            </FilterButton>
            <FilterButton
              isactive={onlyBanks === false ? "true" : "false"}
              onClick={() => handleBankFilter(false)}
            >
              no
            </FilterButton>
          </Box>
        </FilterGroup>

        <FilterGroup>
          <FilterLabel>Considerar Tasa</FilterLabel>
          <Box sx={{ display: "flex", gap: 1 }}>
            <FilterButton
              isactive={rateFilter === "min" ? "true" : "false"}
              onClick={() => handleRateFilter("min")}
            >
              min.
            </FilterButton>
            <FilterButton
              isactive={rateFilter === "max" ? "true" : "false"}
              onClick={() => handleRateFilter("max")}
            >
              max.
            </FilterButton>
          </Box>
        </FilterGroup>
      </FiltersContainer>
    </>
  );
};

export default CreditResultsFilters;
