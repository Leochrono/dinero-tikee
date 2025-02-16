import { SectionTitle } from "../styles/constUsuario";
import { UserCredit } from "@/src/core/types/credit.types";

interface CreditsListProps {
  credits: UserCredit[];
  components: {
    NoCreditsMessage: React.ComponentType;
    CreditCardProfile: React.ComponentType<{ credit: UserCredit }>;
    CreditHeader: React.ComponentType<any>;
    CreditBasicInfo: React.ComponentType<any>;
    CreditDetailsProfile: React.ComponentType<any>;
    CreditDocuments: React.ComponentType<any>;
    DocumentPreview: React.ComponentType<any>;
  };
}

const CreditsList = ({ credits, components }: CreditsListProps) => {
  const {
    NoCreditsMessage,
    CreditCardProfile
  } = components;

  return (
    <>
      <SectionTitle>Créditos en proceso</SectionTitle>
      {!credits.length ? (
        <NoCreditsMessage />
      ) : (
        credits.map((credit) => (
          <CreditCardProfile 
            key={credit.id} 
            credit={credit}
          />
        ))
      )}
    </>
  );
};

export default CreditsList;