import React from "react";
import { Switch, FormControlLabel, Typography } from "@mui/material";
import { ErrorText } from "../../styles/creditFormConst";
import { CreditFormData, FormErrors } from "../../../../../core/types/types";

interface CreditFormTermsProps {
  formData: CreditFormData;
  formErrors: FormErrors;
  setFormData: React.Dispatch<React.SetStateAction<CreditFormData>>;
}

const CreditFormTerms = ({
  formData,
  formErrors,
  setFormData,
}: CreditFormTermsProps) => {
  return (
    <>
      <FormControlLabel
        control={
          <Switch
            checked={formData.termsAccepted}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                termsAccepted: e.target.checked,
              }))
            }
            color="primary"
          />
        }
        label={
          <Typography color="primary.light">
            Estoy de acuerdo con los <u>Términos y Condiciones</u>
          </Typography>
        }
      />
      {formErrors.termsAccepted && (
        <ErrorText>{formErrors.termsAccepted}</ErrorText>
      )}
    </>
  );
};

export default CreditFormTerms;
