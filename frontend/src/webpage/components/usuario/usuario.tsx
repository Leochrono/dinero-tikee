import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, IconButton } from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useUserProfile } from "@/src/core/hooks/api/use-user-profile";
import { useGlobalAuth } from "@/src/core/context/authContext";
import LoadingResults from "../shared/loadingResults";
import ErrorMessage from "../shared/errorMessage";
import { routesWebpage } from '@/components/contants/routes';
import {
  UserContainer,
  Header,
  BackButton,
  WelcomeSection,
  SectionTitle,
  CreditCard,
  BankLogo,
  CreditInfo,
  InfoRow,
  InfoItem,
  ActionButton,
  HistoryGrid,
  HistoryCard,
  HistoryDate,
  HistoryDetails,
} from "./components/constUsuario";
import Navbar from "../navbar/navbar";
import { UserCredit, SearchHistory, Credit } from "@/src/core/types/credit.types";
import { UserProfile } from "@/src/core/types/user.types";
import { useCreditCalculations } from "@/src/core/hooks/api/use-credit-calculations";

const Usuario = () => {
  const navigate = useNavigate();
  const { getUserProfile, getUserCredits, getSearchHistory } = useUserProfile();
  const { logout } = useGlobalAuth();
  const { transformCredits } = useCreditCalculations();

  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [userCredits, setUserCredits] = useState<UserCredit[]>([]);
  const [searchHistory, setSearchHistory] = useState<SearchHistory[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [dataError, setDataError] = useState<string | null>(null);

  const loadUserData = async () => {
    setLoadingData(true);
    setDataError(null);
    try {
      console.log('Iniciando carga de datos de usuario...');
      
      // Obtener perfil
      const profileResponse = await getUserProfile();
      console.log('Respuesta del perfil:', profileResponse);
      if (profileResponse?.success && profileResponse?.data) {
        setUserProfile(profileResponse.data ?? null);
      }

      // Obtener créditos
      // Obtener créditos
// Obtener créditos
try {
  const creditsResponse = await getUserCredits();
  console.log('Respuesta del servicio de créditos:', creditsResponse);

  // Verificar si creditsResponse es un array directamente
  const credits = Array.isArray(creditsResponse) 
    ? creditsResponse 
    : (creditsResponse?.data || []);

  console.log('Número de créditos:', credits.length);
  console.log('Primer crédito:', credits[0]);

  if (credits.length > 0) {
    // Transformar créditos y calcular pagos
    const calculatedCredits: UserCredit[] = credits.map(credit => {
      const monthlyRate = credit.institution?.minRate ? 
        credit.institution.minRate / 12 / 100 : 0;
      
      const monthlyPayment = credit.institution ? 
        (credit.amount * monthlyRate * Math.pow(1 + monthlyRate, credit.term)) /
        (Math.pow(1 + monthlyRate, credit.term) - 1) : 0;

      return {
        ...credit,
        institution: {
          ...credit.institution,
          email: credit.institution?.email || ''
        },
        monthlyPayment: isNaN(monthlyPayment) ? 0 : monthlyPayment,
        totalPayment: isNaN(monthlyPayment) ? 0 : monthlyPayment * credit.term
      };
    });

    console.log('Créditos procesados:', calculatedCredits);
    setUserCredits(calculatedCredits);
  } else {
    console.error('No se recibieron créditos o el array está vacío');
    setUserCredits([]);
  }
} catch (error) {
  console.error("Error loading credits:", error);
  setUserCredits([]);
}

      // Obtener historial
      try {
        const historyResponse = await getSearchHistory();
        if (Array.isArray(historyResponse)) {
          const sortedHistory = historyResponse
            .filter(Boolean)
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          setSearchHistory(sortedHistory);
        }
      } catch (error) {
        console.error("Error loading history:", error);
        setSearchHistory([]);
      }
    } catch (error) {
      console.error("Error loading profile:", error);
      setDataError("No se pudo cargar la información del usuario");
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    loadUserData();
  }, []);

  const handleLogout = () => {
    logout();
    navigate(routesWebpage.login);
  };

  const getStatusText = useCallback((status: string): string => {
    const statusMap: Record<string, string> = {
      'DOCUMENTS_SUBMITTED': 'Documentos Enviados',
      'INSTITUTION_SELECTED': 'Institución Seleccionada',
      'UNDER_REVIEW': 'En Revisión',
      'APPROVED': 'Aprobado',
      'REJECTED': 'Rechazado',
      'PENDING': 'Pendiente'
    };
    return statusMap[status] || 'Pendiente';
  }, []);

  if (loadingData) return <LoadingResults />;
  if (dataError) {
    return (
      <ErrorMessage
        onRetry={loadUserData}
        message="No pudimos cargar la información de tu perfil. Por favor, intenta nuevamente."
      />
    );
  }

  console.log('Estado final antes de render:', {
    userProfile,
    credits: userCredits,
    history: searchHistory,
    loading: loadingData,
    error: dataError
  });

  return (
    <>
      <Navbar />
      <UserContainer>
        <Header>
          <BackButton onClick={() => navigate(-1)} />
          <IconButton
            onClick={handleLogout}
            sx={{
              color: "white",
              marginLeft: "auto",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              },
            }}
          >
            <ExitToAppIcon />
          </IconButton>
        </Header>

        <WelcomeSection>
          Hola
          <span className="highlight">{userProfile?.nombres}</span>
        </WelcomeSection>

        <SectionTitle>Créditos en proceso</SectionTitle>
        {!userCredits.length ? (
          <Typography variant="body2" sx={{ textAlign: "center", my: 2, color: "white" }}>
            No tienes créditos en proceso
          </Typography>
        ) : (
          userCredits.map((credit) => (
            <CreditCard key={credit.id}>
              {credit.institution && (
                <>
                  <BankLogo>
                    <img src={credit.institution.logo} alt={credit.institution.name} />
                  </BankLogo>
                  <CreditInfo>
                    <InfoRow>
                      <InfoItem>
                        <Typography className="label">Valor Cuota</Typography>
                        <Typography className="value">
                          ${(credit.monthlyPayment || 0).toLocaleString()}
                        </Typography>
                      </InfoItem>
                      <InfoItem>
                        <Typography className="label">Tasa de interés</Typography>
                        <Typography className="value">
                          {credit.institution.minRate}%
                        </Typography>
                      </InfoItem>
                    </InfoRow>
                    <InfoRow>
                      <InfoItem>
                        <Typography className="label">Pago Total (aprox.)</Typography>
                        <Typography className="value">
                          ${(credit.totalPayment || 0).toLocaleString()}
                        </Typography>
                      </InfoItem>
                      <InfoItem>
                        <Typography className="label">Estado</Typography>
                        <Typography className="value">
                          {getStatusText(credit.status)}
                        </Typography>
                      </InfoItem>
                    </InfoRow>
                    <ActionButton
                      onClick={() => {
                        if (credit.status === 'DOCUMENTS_SUBMITTED') {
                          window.open(`mailto:${credit.institution.email || ''}?subject=Consulta sobre crédito ${credit.id}`);
                        } else {
                          navigate(`/creditos/detalles/${credit.id}`);
                        }
                      }}
                    >
                      {credit.status === 'DOCUMENTS_SUBMITTED' ? 'CONTACTAR' : 'VER DETALLES'}
                    </ActionButton>
                  </CreditInfo>
                </>
              )}
            </CreditCard>
          ))
        )}

        <SectionTitle>Historial de Búsqueda</SectionTitle>
        {!searchHistory.length ? (
          <Typography variant="body2" sx={{ textAlign: "center", my: 2, color: "white" }}>
            No tienes búsquedas recientes
          </Typography>
        ) : (
          <HistoryGrid>
            {searchHistory.map((search) => (
              <HistoryCard key={search.id}>
                <HistoryDate>
                  {new Date(search.createdAt).toLocaleDateString("es-ES", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </HistoryDate>
                <HistoryDetails>
                  <InfoItem>
                    <Typography className="label">Monto</Typography>
                    <Typography className="value">
                      ${search.amount?.toLocaleString() || "0"}
                    </Typography>
                  </InfoItem>
                  <InfoItem>
                    <Typography className="label">Plazo</Typography>
                    <Typography className="value">
                      {search.term || "0"} meses
                    </Typography>
                  </InfoItem>
                  <InfoItem>
                    <Typography className="label">Ingresos</Typography>
                    <Typography className="value">
                      ${search.income?.toLocaleString() || "0"}
                    </Typography>
                  </InfoItem>
                </HistoryDetails>
                <ActionButton
                  onClick={() => {
                    localStorage.setItem('creditFormData', JSON.stringify({
                      amount: search.amount,
                      term: search.term,
                      income: search.income
                    }));
                    navigate(routesWebpage.creditoForm);
                  }}
                >
                  BUSCAR NUEVAMENTE
                </ActionButton>
              </HistoryCard>
            ))}
          </HistoryGrid>
        )}
      </UserContainer>
    </>
  );
};

export default Usuario;