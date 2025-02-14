import React from "react";
import { SubmitButton } from "../styles/creditFormConst";
import { LoadingResults } from "@/webpage/components/shared/loadingResults";

interface CreditFormSubmitProps {
  isLoading: boolean;
  termsAccepted: boolean;
}

const CreditFormSubmit = ({
  isLoading,
  termsAccepted,
}: CreditFormSubmitProps) => {
  return (
    <SubmitButton
      type="submit"
      variant="contained"
      fullWidth
      disabled={!termsAccepted || isLoading}
    >
      {isLoading ? <LoadingResults text="Verificando..." /> : "COMPARAR"}
    </SubmitButton>
  );
};

export default CreditFormSubmit;
