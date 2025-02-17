import React, { useState, useEffect } from "react";
import { Box, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useGlobalAuth } from "@/src/core/context/authContext";
import { CreditFormData } from "@/src/core/types/types";
import { routesWebpage } from "@/components/contants/routes";
import LoadingResults from "../../shared/loadingResults";
import ErrorMessage from "../../shared/errorMessage";
import CreditCardSkeleton from "../../shared/creditCardSkeleton";
import CreditResultsFilters from "@/webpage/components/creditos/utils/creditResults/CreditResultsFilters";
import CreditResultsCard from "@/webpage/components/creditos/utils/creditResults/CreditResultsCard";
import CreditResultsPagination from "@/webpage/components/creditos/utils/creditResults/CreditResultsPagination";
import { useCreditResultsInstitutions } from "@/webpage/components/creditos/utils/creditResults/useCreditResultsInstitutions";
import { useCreditResultsFilters } from "@/webpage/components/creditos/utils/creditResults/useCreditResultsFilters";
import { useCreditInstitutionSelection } from "@/webpage/components/creditos/utils/creditResults/useCreditInstitutionSelection";

import {
  ResultsContainer,
  ResultsGrid,
  BackButton,
  AvailableOptions,
} from "../styles/creditResultConst";

interface CreditResultsProps {
  formData: CreditFormData;
  onSelect: (institutionId: string) => void;
  onBack: () => void;
}

const CreditResults = ({ formData, onSelect, onBack }: CreditResultsProps) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { isAuthenticated } = useGlobalAuth();
  const [currentFormData, setCurrentFormData] = useState<CreditFormData | null>(
    null
  );
  const { onlyBanks, rateFilter, handleBankFilter, handleRateFilter } =
    useCreditResultsFilters();

  const {
    institutions,
    paginatedInstitutions,
    loading,
    error,
    page,
    totalPages,
    calculateMonthlyPayment,
    handlePageChange,
  } = useCreditResultsInstitutions({
    formData: currentFormData || formData,
    onlyBanks,
    rateFilter,
  });

  const { handleInstitutionSelect, isLoading: isSelectingInstitution } =
    useCreditInstitutionSelection();

  useEffect(() => {
    const savedFormData = localStorage.getItem("creditFormData");
    if (savedFormData) {
      setCurrentFormData(JSON.parse(savedFormData));
    } else if (formData) {
      setCurrentFormData(formData);
    } else {
      console.error("No se encontraron datos del formulario");
      navigate(routesWebpage.creditoForm);
    }
  }, [formData, navigate]);
  useEffect(() => {
    if (!isAuthenticated) {
      navigate(routesWebpage.login, {
        state: { from: routesWebpage.creditoResults },
      });
    }
  }, [isAuthenticated, navigate]);
  if (loading || isSelectingInstitution) {
    return (
      <Box sx={{ maxWidth: "1440px", margin: "0 auto", padding: "0 20px" }}>
        <LoadingResults />
        <ResultsGrid>
          {[1, 2, 3, 4].map((index) => (
            <CreditCardSkeleton key={index} />
          ))}
        </ResultsGrid>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ maxWidth: "1440px", margin: "0 auto", padding: "0 20px" }}>
        <ErrorMessage onRetry={() => {}} />
      </Box>
    );
  }

  if (!currentFormData) {
    return null;
  }

  return (
    <ResultsContainer>
      <Box
        sx={{
          maxWidth: "1440px",
          margin: "0 auto",
          padding: "0 20px",
          [theme.breakpoints.down("md")]: {
            padding: "0 12px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          },
        }}
      >
        <BackButton onClick={onBack}>Volver</BackButton>
        <AvailableOptions>
          {institutions.length} OPCIONES DISPONIBLES
        </AvailableOptions>

        <CreditResultsFilters
          onlyBanks={onlyBanks}
          rateFilter={rateFilter}
          handleBankFilter={handleBankFilter}
          handleRateFilter={handleRateFilter}
        />
      </Box>

      <ResultsGrid>
        {paginatedInstitutions.map((institution, index) => (
          <CreditResultsCard
            key={institution.id}
            institution={institution}
            index={index}
            formData={currentFormData}
            onSelect={handleInstitutionSelect}
            calculateMonthlyPayment={calculateMonthlyPayment}
          />
        ))}
      </ResultsGrid>

      <CreditResultsPagination
        totalPages={totalPages}
        currentPage={page}
        onPageChange={handlePageChange}
      />
    </ResultsContainer>
  );
};

export default CreditResults;
