import { CreditResponse } from "../types/credit.types";

export const creditCalculationsService = {
  calculatePayments: (amount: number, rate: number, term: number) => {
    try {
      const monthlyRate = rate / 12 / 100;
      const monthlyPayment =
        (amount * monthlyRate * Math.pow(1 + monthlyRate, term)) /
        (Math.pow(1 + monthlyRate, term) - 1);
      const totalPayment = monthlyPayment * term;

      return {
        monthlyPayment: isNaN(monthlyPayment) ? 0 : monthlyPayment,
        totalPayment: isNaN(totalPayment) ? 0 : totalPayment,
      };
    } catch (error) {
      console.error("Error calculando pagos:", error);
      return { monthlyPayment: 0, totalPayment: 0 };
    }
  },

  transformCredit: (credit: CreditResponse) => {
    if (!credit.institution) {
      return null;
    }

    const { monthlyPayment, totalPayment } =
      creditCalculationsService.calculatePayments(
        Number(credit.amount),
        credit.institution.minRate || 0,
        credit.term
      );

    return {
      ...credit,
      monthlyPayment,
      totalPayment,
    };
  },

  transformCredits: (credits: CreditResponse[]) => {
    return credits
      .filter((credit) => credit.institution)
      .map((credit) => creditCalculationsService.transformCredit(credit))
      .filter((credit) => credit !== null);
  },
};
