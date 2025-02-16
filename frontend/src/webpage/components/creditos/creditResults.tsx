import { useState, useEffect, useCallback, useMemo } from "react";
import { Box, useTheme } from "@mui/material";
import { Pagination } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { CreditFormData, Institution } from "@/components/creditos/utils/types";
import FilterButton from "./styles/filterButton";
import DestacadoTag from "./styles/destacadoTag";
import { useInstitution } from "@/src/core/hooks/api/use-institution";
import { useCredit } from "@/src/core/hooks/api/use-credit";
import { useGlobalAuth } from "@/src/core/context/authContext";
import { routesWebpage } from "@/components/contants/routes";
import LoadingResults from "../../components/shared/loadingResults";
import ErrorMessage from "../../components/shared/errorMessage";
import CreditCardSkeleton from "../../components/shared/creditCardSkeleton";
import {
  ResultsContainer,
  ResultsGrid,
  FiltersContainer,
  FilterGroup,
  FilterLabel,
  CreditCard,
  BankLogo,
  InfoContainer,
  InfoItem,
  Label,
  Value,
  ActionButton,
  SmallText,
  BackButton,
  AvailableOptions,
  ActiveFilterChip,
} from "./styles/creditResultConst";
import { toast } from "react-hot-toast";
import {
  BestRatesParams,
  InstitutionFilters,
} from "@/src/core/types/institutions.types";
import { InfoRow } from "../usuario/styles/constUsuario";

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
  const [onlyBanks, setOnlyBanks] = useState<boolean | undefined>(undefined);
  const [rateFilter, setRateFilter] = useState<"min" | "max" | undefined>(
    undefined
  );
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [page, setPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [selectedInstitutionId, setSelectedInstitutionId] =
    useState<string>("");
  const [status, setStatus] = useState<string>("PENDING");
  const [creditId, setCreditId] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const { loading, setLoading, error, filterInstitutions } = useInstitution();
  const { updateCredit } = useCredit();

  // Cargar datos del formulario
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

  // Verificar autenticación
  useEffect(() => {
    if (!isAuthenticated) {
      navigate(routesWebpage.login, {
        state: { from: routesWebpage.creditoResults },
      });
    }
  }, [isAuthenticated, navigate]);

  // Calcular pago mensual
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

  // Fetch instituciones
  const fetchInstitutions = useCallback(async () => {
    if (!currentFormData) {
      console.error("No hay datos del formulario disponibles");
      return;
    }

    try {
      console.log(
        "Iniciando búsqueda de instituciones con datos:",
        currentFormData
      );

      const params: InstitutionFilters = {
        amount: Number(currentFormData.amount),
        term: Number(currentFormData.term),
        type:
          onlyBanks === true
            ? "bank"
            : onlyBanks === false
            ? "cooperative"
            : undefined,
        rateFilter: rateFilter,
        location: currentFormData.location, // Agregamos la ubicación
      };

      console.log("Enviando parámetros al servicio:", params);

      const fetchedInstitutions = await filterInstitutions(params);
      console.log("Respuesta del servicio:", fetchedInstitutions);

      if (fetchedInstitutions.length === 0) {
        toast.error(
          "No se encontraron instituciones que cumplan con los criterios"
        );
        return;
      }

      setInstitutions(fetchedInstitutions);
    } catch (error: any) {
      console.error("Error al cargar instituciones:", error);
      toast.error(error.message || "Error al cargar las instituciones");
    }
  }, [currentFormData, onlyBanks, rateFilter, filterInstitutions]);

  // Cargar instituciones cuando cambian los filtros
  useEffect(() => {
    if (currentFormData?.amount && currentFormData?.term) {
      fetchInstitutions();
    }
  }, [fetchInstitutions, currentFormData]);

  // Manejadores
  const handleBankFilter = useCallback(
    (value: boolean) => {
      setOnlyBanks(onlyBanks === value ? undefined : value);
      setPage(1);
    },
    [onlyBanks]
  );

  const handleRateFilter = useCallback(
    (value: "min" | "max") => {
      setRateFilter(rateFilter === value ? undefined : value);
      setPage(1);
    },
    [rateFilter]
  );

  const handleSelect = useCallback(
    async (institutionId: string) => {
      try {
        setLoading(true);
        console.log('Datos de selección:', {
          institutionId,
          storedCreditId: localStorage.getItem('currentCreditId')
        });
  
        const storedCreditId = localStorage.getItem('currentCreditId');
        if (!storedCreditId) {
          throw new Error("No hay un crédito activo");
        }
  
        if (!institutionId) {
          throw new Error("No se ha seleccionado una institución");
        }
  
        // Guardar institución seleccionada
        localStorage.setItem('selectedInstitutionId', institutionId);
  
        // Actualizar el crédito
        const updateResponse = await updateCredit(storedCreditId, {
          institutionId,
          status: "INSTITUTION_SELECTED"
        });
  
        if (!updateResponse.success) {
          throw new Error(updateResponse.error || "Error al actualizar el crédito");
        }
  
        // Actualizar estados
        setSelectedInstitutionId(institutionId);
        setStatus("INSTITUTION_SELECTED");
        setCreditId(storedCreditId);
  
        console.log('Navegando a detalles con institución:', institutionId);
        navigate(routesWebpage.creditoDetails);
  
      } catch (error: any) {
        console.error('Error en handleSelect:', error);
        toast.error(error.message);
        localStorage.removeItem('selectedInstitutionId');
      } finally {
        setLoading(false);
      }
    },
    [updateCredit, navigate]
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

  // Memos
  const filteredInstitutions = useMemo(() => institutions, [institutions]);

  const paginatedInstitutions = useMemo(() => {
    const startIndex = (page - 1) * itemsPerPage;
    return filteredInstitutions.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredInstitutions, page, itemsPerPage]);

  const totalPages = useMemo(
    () => Math.ceil(filteredInstitutions.length / itemsPerPage),
    [filteredInstitutions, itemsPerPage]
  );

  // Loading y Error states
  if (loading || isLoading) {
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
        <ErrorMessage onRetry={fetchInstitutions} />
      </Box>
    );
  }

  // No renderizar si no hay datos del formulario
  if (!currentFormData) {
    return null;
  }

  // Render principal
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
          {filteredInstitutions.length} OPCIONES DISPONIBLES
        </AvailableOptions>

        {(onlyBanks !== undefined || rateFilter !== undefined) && (
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 1,
              mt: 2,
              mb: 2,
              justifyContent: "center",
            }}
          >
            {onlyBanks !== undefined && (
              <ActiveFilterChip>
                {onlyBanks ? "Solo Bancos" : "Solo Cooperativas"}
                <CloseIcon
                  className="clearIcon"
                  onClick={() => handleBankFilter(onlyBanks)}
                />
              </ActiveFilterChip>
            )}
            {rateFilter !== undefined && (
              <ActiveFilterChip>
                Tasa {rateFilter === "min" ? "Mínima" : "Máxima"}
                <CloseIcon
                  className="clearIcon"
                  onClick={() => handleRateFilter(rateFilter)}
                />
              </ActiveFilterChip>
            )}
          </Box>
        )}
      </Box>

      <FiltersContainer>
        <FilterGroup>
          <FilterLabel>Solo Bancos:</FilterLabel>
          <Box sx={{ display: "flex", gap: 1 }}>
            <FilterButton
              $isActive={onlyBanks === true}
              onClick={() => handleBankFilter(true)}
            >
              sí
            </FilterButton>
            <FilterButton
              $isActive={onlyBanks === false}
              onClick={() => handleBankFilter(false)}
            >
              no
            </FilterButton>
          </Box>
        </FilterGroup>

        <FilterGroup>
          <FilterLabel>Considerar Tasa</FilterLabel>
          <Box sx={{ display: "flex", gap: 1 }}>
            <FilterButton
              $isActive={rateFilter === "min"}
              onClick={() => handleRateFilter("min")}
            >
              min.
            </FilterButton>
            <FilterButton
              $isActive={rateFilter === "max"}
              onClick={() => handleRateFilter("max")}
            >
              max.
            </FilterButton>
          </Box>
        </FilterGroup>
      </FiltersContainer>

      <ResultsGrid>
 {paginatedInstitutions.map((institution: Institution, index: number) => {
   const monthlyPayment = calculateMonthlyPayment(
     formData.amount,
     institution.minRate,
     formData.term
   );
   const totalPayment = monthlyPayment * formData.term;

   // Log para debugging
   console.log('Institución a renderizar:', {
     id: institution.id,
     name: institution.name,
     minRate: institution.minRate
   });

   return (
     <CreditCard
       key={institution.id}
       style={{
         animationDelay: `${index * 0.1}s`,
       }}
     >
       <DestacadoTag>DESTACADO</DestacadoTag>
       <BankLogo src={institution.logo} alt={institution.name} />
       <InfoContainer>
         <InfoRow>
           <InfoItem>
             <Label>Valor Cuota</Label>
             <Value>
               ${Math.round(monthlyPayment).toLocaleString()}
             </Value>
           </InfoItem>
           <InfoItem>
             <Label>Tasa de interés</Label>
             <Value>{institution.minRate}%</Value>
           </InfoItem>
         </InfoRow>
         <InfoItem>
           <Label>Pago Total (aprox.)</Label>
           <Value>${Math.round(totalPayment).toLocaleString()}</Value>
         </InfoItem>
       </InfoContainer>
       <Box
         sx={{
           display: "flex",
           flexDirection: "column",
           alignItems: "center",
           gap: "1rem",
           width: "100%",
           marginTop: "1rem"
         }}
       >
         <SmallText>
           {institution.products.personalLoan.description}
         </SmallText>
         <ActionButton
           onClick={() => {
             console.log('Seleccionando institución:', {
               id: institution.id,
               name: institution.name
             });
             if (institution.id) {
               handleSelect(institution.id);
             } else {
               console.error('ID de institución no disponible');
             }
           }}
           disabled={!institution.id}
           sx={{
             width: "100%",
             maxWidth: "200px"
           }}
         >
           ¡LO QUIERO!
         </ActionButton>
       </Box>
     </CreditCard>
   );
 })}
</ResultsGrid>

      {totalPages > 1 && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 4,
            mb: 2,
          }}
        >
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
            size="large"
            showFirstButton
            showLastButton
            sx={{
              "& .MuiPaginationItem-root": {
                color: "white",
                borderColor: theme.palette.primary.light,
              },
              "& .Mui-selected": {
                backgroundColor: theme.palette.primary.light,
                "&:hover": {
                  backgroundColor: theme.palette.primary.main,
                },
              },
            }}
          />
        </Box>
      )}
    </ResultsContainer>
  );
};

export default CreditResults;
