import { useCallback } from "react";
import { Institution } from "@/src/core/types/types";

export const useCreditCalculations = () => {
  const calculateMonthlyPayment = useCallback(
    (amount: number, rate: number, term: number) => {
      const monthlyRate = rate / 12 / 100;
      return (
        (amount * monthlyRate * Math.pow(1 + monthlyRate, term)) /
        (Math.pow(1 + monthlyRate, term) - 1)
      );
    },
    []
  );

  const calculateTotalPayment = useCallback(
    (monthlyPayment: number, term: number) => {
      return monthlyPayment * term;
    },
    []
  );

  return {
    calculateMonthlyPayment,
    calculateTotalPayment,
  };
};
