import { useState, useEffect } from "react";
import { useCredit } from "@/src/core/hooks/api/use-credit";
import {
  CheckIcon,
  CreditSuccessProps,
  Message,
  SearchButton,
  SuccessContainer,
  Title,
} from "./styles/consCreditSucces";

const CreditSuccess = ({ onNewSearch }: CreditSuccessProps) => {
  const [creditInfo, setCreditInfo] = useState<any>(null);
  const { getDetails } = useCredit();

  useEffect(() => {
    const fetchCreditInfo = async () => {
      const creditId = localStorage.getItem("currentCreditId");
      if (!creditId) return;

      try {
        const response = await getDetails(creditId);
        if (response.success) {
          setCreditInfo(response.data);
        }
      } catch (error) {
        console.error("Error fetching credit info:", error);
      }
    };

    fetchCreditInfo();
  }, [getDetails]);

  return (
    <SuccessContainer>
      <CheckIcon />
      <Title>¡Felicidades!</Title>
      {creditInfo && (
        <>
          <Message>
            Se ha enviado la documentación para tu crédito de $
            {creditInfo.amount}
            <br />a {creditInfo.institution.name}
          </Message>
          <Message>
            Te contactaremos al correo:
            <br />
            {creditInfo.email}
          </Message>
        </>
      )}
      <SearchButton onClick={onNewSearch}>BUSCAR OTRO CRÉDITO</SearchButton>
    </SuccessContainer>
  );
};

export default CreditSuccess;
