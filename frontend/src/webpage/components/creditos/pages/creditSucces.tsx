import React from "react";
import { LoadingResults } from "../../shared/loadingResults";
import ErrorMessage from "../../shared/errorMessage";
import {
  CheckIcon,
  CreditSuccessProps,
  Message,
  SearchButton,
  SuccessContainer,
  Title,
} from "../styles/consCreditSucces";
import { useCreditSuccessDetails } from "@/webpage/components/creditos/utils/creditsucces/useCreditSuccessDetails";

const CreditSuccess = ({ onNewSearch }: CreditSuccessProps) => {
  const { creditInfo, loading, error, clearLocalStorageData } =
    useCreditSuccessDetails();

  if (loading) {
    return <LoadingResults />;
  }

  if (error) {
    return (
      <ErrorMessage message={error} onRetry={() => window.location.reload()} />
    );
  }

  return (
    <SuccessContainer>
      <CheckIcon />
      <Title>¡Felicidades!</Title>
      {creditInfo && (
        <>
          <Message>
            Se ha enviado la documentación para tu crédito de $
            {creditInfo.amount.toLocaleString()}
            <br />
            {creditInfo.institution?.name ? (
              <>a {creditInfo.institution.name}</>
            ) : (
              "a la institución seleccionada"
            )}
          </Message>
          <Message>
            Te contactaremos al correo:
            <br />
            {creditInfo.email || "el correo registrado"}
          </Message>
        </>
      )}
      <SearchButton
        onClick={() => {
          clearLocalStorageData();
          onNewSearch();
        }}
      >
        BUSCAR OTRO CRÉDITO
      </SearchButton>
    </SuccessContainer>
  );
};

export default CreditSuccess;
