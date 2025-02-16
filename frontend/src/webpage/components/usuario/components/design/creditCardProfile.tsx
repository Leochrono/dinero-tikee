import { useState } from "react";
import { Collapse } from "@mui/material";
import { CreditCard, CreditInfo, ActionButton } from "../../styles/constUsuario";
import { UserCredit } from "@/src/core/types/credit.types";
import CreditHeader from "./creditHeader";
import CreditBasicInfo from "./creditBasicInfo";
import CreditDetailsProfile from "./creditDetailsProfile";
import CreditDocuments from "./creditDocuments";

interface CreditCardProfileProps {
  credit: UserCredit;
}

const CreditCardProfile = ({ credit }: CreditCardProfileProps) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <CreditCard>
      {credit.institution && (
        <>
          <CreditHeader institution={credit.institution} />
          <CreditInfo>
            <CreditBasicInfo 
              monthlyPayment={credit.monthlyPayment}
              totalPayment={credit.totalPayment}
              minRate={credit.institution.minRate}
              status={credit.status}
            />
            
            <ActionButton
              onClick={() => setExpandedId(expandedId === credit.id ? null : credit.id)}
            >
              {expandedId === credit.id ? 'OCULTAR DETALLES' : 'VER DETALLES'}
            </ActionButton>

            <Collapse in={expandedId === credit.id}>
              <div style={{ 
                padding: '16px', 
                borderTop: '1px solid rgba(255, 255, 255, 0.12)',
                marginTop: '16px' 
              }}>
                <CreditDetailsProfile 
                  amount={credit.amount}
                  term={credit.term}
                  income={credit.income}
                />
                {credit.documents && <CreditDocuments documents={credit.documents} />}
              </div>
            </Collapse>
          </CreditInfo>
        </>
      )}
    </CreditCard>
  );
};

export default CreditCardProfile;