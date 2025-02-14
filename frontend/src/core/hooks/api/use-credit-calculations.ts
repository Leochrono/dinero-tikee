import { useMemo } from 'react';
import { CreditResponse } from '../../types/credit.types';
import { creditCalculationsService } from '../../services/credit-calculations.service';

interface CalculatedCredit extends CreditResponse {
  monthlyPayment: number;
  totalPayment: number;
}

export const useCreditCalculations = () => {
  const calculatePayments = useMemo(() => {
    return creditCalculationsService.calculatePayments;
  }, []);

  const transformCredits = useMemo(() => {
    return (credits: CreditResponse[]): CalculatedCredit[] => {
      return creditCalculationsService.transformCredits(credits) as CalculatedCredit[];
    };
  }, []);

  return {
    calculatePayments,
    transformCredits
  };
};

export default useCreditCalculations;