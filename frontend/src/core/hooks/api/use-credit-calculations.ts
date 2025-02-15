import { useMemo } from 'react';
import { CreditResponse, Credit } from '../../types/credit.types';
import { creditCalculationsService } from '../../services/credit-calculations.service';

interface CalculatedCredit extends CreditResponse {
  monthlyPayment: number;
  totalPayment: number;
  institution: {
    id: string;
    name: string;
    type: string;
    logo: string;
    minRate: number;
    email?: string;
  };
}

export const useCreditCalculations = () => {
  const calculatePayments = useMemo(() => {
    return creditCalculationsService.calculatePayments;
  }, []);

  const transformCredits = useMemo(() => {
    return (credits: Credit[] | CreditResponse[]): CalculatedCredit[] => {
      // Aseguramos que los créditos tengan todas las propiedades necesarias
      const completeCredits = credits.map(credit => ({
        ...credit,
        income: 'income' in credit ? credit.income : credit.amount * 0.4,
        createdAt: 'createdAt' in credit ? credit.createdAt : new Date(),
        institution: {
          ...credit.institution,
          type: credit.institution?.type || 'bank'
        }
      })) as CreditResponse[];

      // Transformamos los créditos completados
      return creditCalculationsService.transformCredits(completeCredits) as CalculatedCredit[];
    };
  }, []);

  return {
    calculatePayments,
    transformCredits
  };
};

export default useCreditCalculations;