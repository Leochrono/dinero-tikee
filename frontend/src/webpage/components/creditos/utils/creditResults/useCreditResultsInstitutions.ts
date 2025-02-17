import { useState, useEffect, useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";
import { useInstitution } from "@/src/core/hooks/api/use-institution";
import { CreditFormData, Institution } from "@/src/core/types/types";
import { InstitutionFilters } from "@/src/core/types/institutions.types";

interface UseCreditResultsInstitutionsParams {
  formData: CreditFormData;
  onlyBanks?: boolean;
  rateFilter?: "min" | "max";
}

export const useCreditResultsInstitutions = ({
  formData,
  onlyBanks,
  rateFilter,
}: UseCreditResultsInstitutionsParams) => {
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

  const { loading, error, filterInstitutions } = useInstitution();
  const calculateMonthlyPayment = useCallback(
    (amount: number, rate: number, term: number) => {
      try {
        const monthlyRate = rate / 12 / 100;
        return (
          (amount * monthlyRate * Math.pow(1 + monthlyRate, term)) /
          (Math.pow(1 + monthlyRate, term) - 1)
        );
      } catch (error) {
        console.error("Error calculando pago mensual:", error);
        return 0;
      }
    },
    []
  );

  const fetchInstitutions = useCallback(async () => {
    try {
      const params: InstitutionFilters = {
        amount: Number(formData.amount),
        term: Number(formData.term),
        type:
          onlyBanks === true
            ? "bank"
            : onlyBanks === false
            ? "cooperative"
            : undefined,
        rateFilter: rateFilter,
        location: formData.location,
      };

      const fetchedInstitutions = await filterInstitutions(params);

      if (fetchedInstitutions.length === 0) {
        toast.error(
          "No se encontraron instituciones que cumplan con los criterios"
        );
        return [];
      }

      return fetchedInstitutions;
    } catch (error: any) {
      console.error("Error al cargar instituciones:", error);
      toast.error(error.message || "Error al cargar las instituciones");
      return [];
    }
  }, [formData, onlyBanks, rateFilter, filterInstitutions]);

  useEffect(() => {
    const loadInstitutions = async () => {
      const results = await fetchInstitutions();
      setInstitutions(results);
      setPage(1);
    };

    if (formData?.amount && formData?.term) {
      loadInstitutions();
    }
  }, [fetchInstitutions, formData]);

  const paginatedInstitutions = useMemo(() => {
    const startIndex = (page - 1) * itemsPerPage;
    return institutions.slice(startIndex, startIndex + itemsPerPage);
  }, [institutions, page, itemsPerPage]);

  const totalPages = useMemo(
    () => Math.ceil(institutions.length / itemsPerPage),
    [institutions, itemsPerPage]
  );

  const handlePageChange = useCallback(
    (_: React.ChangeEvent<unknown>, value: number) => {
      setPage(value);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
    []
  );

  return {
    institutions,
    paginatedInstitutions,
    loading,
    error,
    page,
    totalPages,
    calculateMonthlyPayment,
    handlePageChange,
    setPage,
  };
};
