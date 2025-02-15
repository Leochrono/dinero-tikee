import { useState, useEffect } from "react";
import { useCredit } from "@/src/core/hooks/api/use-credit";
import { LoadingResults } from "../../components/shared/loadingResults";
import ErrorMessage from "../../components/shared/errorMessage";
import {
  CheckIcon,
  CreditSuccessProps,
  Message,
  SearchButton,
  SuccessContainer,
  Title,
} from "./styles/consCreditSucces";

interface CreditInfo {
  amount: number;
  institution: {
    name: string;
  };
  email: string;
}

const CreditSuccess = ({ onNewSearch }: CreditSuccessProps) => {
  const [creditInfo, setCreditInfo] = useState<CreditInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { getDetails } = useCredit();

  useEffect(() => {
    const fetchCreditInfo = async () => {
      const creditId = localStorage.getItem("currentCreditId");
      const creditFormData = localStorage.getItem("creditFormData");
      
      if (!creditId) {
        setError("No se encontró información del crédito");
        setLoading(false);
        return;
      }

      try {
        const response = await getDetails(creditId);
        const formData = creditFormData ? JSON.parse(creditFormData) : null;

        if (response.success && response.data) {
          setCreditInfo({
            amount: response.data.amount,
            institution: {
              name: response.data.institution?.name || 'Institución'
            },
            email: formData?.email || 'correo no disponible'
          });
        } else {
          setError("No se pudo obtener la información del crédito");
        }
      } catch (error: any) {
        console.error("Error obteniendo información del crédito:", error);
        setError(error.message || "Error al cargar la información");
      } finally {
        setLoading(false);
      }
    };

    fetchCreditInfo();
  }, [getDetails]);

  if (loading) {
    return <LoadingResults />;
  }

  if (error) {
    return (
      <ErrorMessage
        message={error}
        onRetry={() => window.location.reload()}
      />
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
          localStorage.removeItem("currentCreditId");
          localStorage.removeItem("selectedInstitutionId");
          localStorage.removeItem("creditFormData");
          onNewSearch();
        }}
      >
        BUSCAR OTRO CRÉDITO
      </SearchButton>
    </SuccessContainer>
  );
};

export default CreditSuccess;