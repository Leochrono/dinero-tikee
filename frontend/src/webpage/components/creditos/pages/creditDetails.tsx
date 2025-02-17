import React from "react";
import { Box } from "@mui/material";
import LoadingResults from "@/components/shared/loadingResults";
import ErrorMessage from "@/components/shared/errorMessage";
import { CreditFormData } from "@/src/core/types/types";
import BankHeader from "../utils/creditDetails/BankHeader";
import LoanInfoGrid from "../utils/creditDetails/LoanInfoGrid";
import FilePreviewSection from "../utils/creditDetails/FilePreviewSection";
import CreditDetailsActions from "@/webpage/components/creditos/utils/creditDetails/CreditDetailsActions";
import { useCreditDetails } from "../utils/creditDetails/useCreditDetails";
import { useCreditCalculations } from "../utils/creditDetails/useCreditCalculations";
import { ApplyButton, DetailsContainer } from "../styles/creditDetailConst";
import { DOCUMENT_REQUIREMENTS } from "../utils/creditDetails/constants";

interface CreditDetailsProps {
  formData: CreditFormData;
  onBack: () => void;
  onApply: () => void;
  institutionId: string;
  creditId: string;
}

const CreditDetails: React.FC<CreditDetailsProps> = ({
  formData: initialFormData,
  onBack,
  onApply,
  institutionId,
  creditId,
}) => {
  const {
    institution,
    isSubmitting,
    loadingError,
    institutionLoading,
    creditLoading,
    handleApplyClick,
    uploadedFiles,
    uploadProgress,
    fileInputRef,
    handleUploadClick,
    handleFileChange,
    handleDeleteFile,
    areAllFilesUploaded,
  } = useCreditDetails({
    initialFormData,
    institutionId,
    creditId,
    onApply,
    requirements: DOCUMENT_REQUIREMENTS,
  });

  const { calculateMonthlyPayment, calculateTotalPayment } =
    useCreditCalculations();

  if (institutionLoading || creditLoading) return <LoadingResults />;

  if (loadingError) {
    return (
      <ErrorMessage
        message={loadingError}
        onRetry={() => window.location.reload()}
      />
    );
  }

  if (!institution) return <LoadingResults />;

  const monthlyPayment = calculateMonthlyPayment(
    initialFormData.amount,
    institution.products.personalLoan.minRate,
    initialFormData.term
  );
  const totalPayment = calculateTotalPayment(
    monthlyPayment,
    initialFormData.term
  );

  return (
    <DetailsContainer>
      <CreditDetailsActions onBack={onBack} />

      <BankHeader
        institution={institution}
        amount={initialFormData.amount}
        term={initialFormData.term}
        income={initialFormData.income}
      />

      <LoanInfoGrid
        monthlyPayment={monthlyPayment}
        totalPayment={totalPayment}
        institution={institution}
      />

      <FilePreviewSection
        requirements={DOCUMENT_REQUIREMENTS}
        uploadedFiles={uploadedFiles}
        uploadProgress={uploadProgress}
        fileInputRef={fileInputRef}
        onUploadClick={handleUploadClick}
        onDeleteFile={handleDeleteFile}
      />

      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        accept=".jpg,.jpeg,.png,.pdf"
        onChange={handleFileChange}
      />

      <Box
        sx={{
          textAlign: "center",
          mt: 4,
          mb: 4,
          padding: "16px",
        }}
      >
        <ApplyButton
          variant="contained"
          onClick={handleApplyClick}
          disabled={!areAllFilesUploaded() || isSubmitting || creditLoading}
        >
          {isSubmitting ? "PROCESANDO..." : "APLICAR"}
        </ApplyButton>
      </Box>
    </DetailsContainer>
  );
};

export default CreditDetails;
