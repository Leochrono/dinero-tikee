import { useState, useCallback } from "react";

export const useCreditResultsFilters = () => {
  const [onlyBanks, setOnlyBanks] = useState<boolean | undefined>(undefined);
  const [rateFilter, setRateFilter] = useState<"min" | "max" | undefined>(
    undefined
  );

  const handleBankFilter = useCallback(
    (value: boolean) => {
      setOnlyBanks(onlyBanks === value ? undefined : value);
    },
    [onlyBanks]
  );

  const handleRateFilter = useCallback(
    (value: "min" | "max") => {
      setRateFilter(rateFilter === value ? undefined : value);
    },
    [rateFilter]
  );

  const resetFilters = useCallback(() => {
    setOnlyBanks(undefined);
    setRateFilter(undefined);
  }, []);

  return {
    onlyBanks,
    rateFilter,
    handleBankFilter,
    handleRateFilter,
    resetFilters,
  };
};
