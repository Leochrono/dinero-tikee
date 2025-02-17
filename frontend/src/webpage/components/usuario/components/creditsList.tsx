import { useState } from "react";
import { ComponentType } from "react";
import { SectionTitle } from "../styles/constUsuario";
import { UserCredit } from "@/src/core/types/credit.types";
import CreditFilters from "./design/creditFilters";

interface CreditsListProps {
  credits: UserCredit[];
  components: {
    NoCreditsMessage: ComponentType;
    CreditCardProfile: ComponentType<{ credit: UserCredit }>;
    CreditHeader: ComponentType<{ institution: any }>;
    CreditBasicInfo: ComponentType<{
      monthlyPayment: number;
      totalPayment: number;
      minRate: number;
      status: string;
    }>;
    CreditDetailsProfile: ComponentType<{
      amount: number;
      term: number;
      income: number;
    }>;
    CreditDocuments: ComponentType<{ documents: any[] }>;
    DocumentPreview: ComponentType<{ doc: any }>;
  };
}

const CreditsList = ({ credits, components }: CreditsListProps) => {
  const { NoCreditsMessage, CreditCardProfile } = components;

  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const mockCredits = credits
    .filter((credit) => credit.institution && credit.monthlyPayment > 0)
    .map((credit, index) => {
      const mockStatuses = [
        "DOCUMENTS_SUBMITTED",
        "UNDER_REVIEW",
        "APPROVED",
        "REJECTED",
      ];
      return {
        ...credit,
        status: mockStatuses[index % mockStatuses.length],
      };
    });

  const validCredits = mockCredits.filter(
    (credit) => credit.institution && credit.monthlyPayment > 0
  );

  const filteredCredits = validCredits.filter((credit) => {
    if (activeFilters.length === 0) return true;
    return activeFilters.includes(credit.status);
  });

  return (
    <>
      <SectionTitle>Créditos Enviados</SectionTitle>
      <CreditFilters onFilterChange={setActiveFilters} />

      {!filteredCredits.length ? (
        <NoCreditsMessage />
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {filteredCredits.map((credit) => (
            <CreditCardProfile key={credit.id} credit={credit} />
          ))}
        </div>
      )}
    </>
  );
};

export default CreditsList;
