import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, IconButton } from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useUserProfile } from "@/src/core/hooks/api/use-user-profile";
import { useGlobalAuth } from "@/src/core/context/authContext";
import LoadingResults from "../shared/loadingResults";
import ErrorMessage from "../shared/errorMessage";
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
import { 
  SearchHistory, 
  CreditResponse,
  Credit
} from "@/src/core/types/credit.types";
import { UserProfile } from "@/src/core/types/user.types";
import { useCreditCalculations } from "@/src/core/hooks/api/use-credit-calculations";

const Usuario = () => {
  const navigate = useNavigate();
  const { getUserProfile, getUserCredits, getSearchHistory } = useUserProfile();
  const { logout } = useGlobalAuth();
  const { transformCredits } = useCreditCalculations();

  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [userCredits, setUserCredits] = useState<Credit[]>([]);
  const [searchHistory, setSearchHistory] = useState<SearchHistory[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [dataError, setDataError] = useState<string | null>(null);

  const loadUserData = async () => {
    setLoadingData(true);
    setDataError(null);
    try {
      // Obtener perfil
      const profileResponse = await getUserProfile();
      if (profileResponse?.success && profileResponse?.data) {
        setUserProfile(profileResponse.data);
      }

      // Obtener créditos
      try {
        const creditsResponse = await getUserCredits();
        if (creditsResponse?.success && creditsResponse?.data) {
          const transformedCredits = transformCredits(
            creditsResponse.data as unknown as CreditResponse[]
          );
          setUserCredits(transformedCredits as unknown as Credit[]);
        } else {
          setUserCredits([]);
        }
      } catch (error) {
        console.warn("Error loading credits:", error);
        setUserCredits([]);
      }

      // Obtener historial
      try {
        const historyResponse = await getSearchHistory();
        if (Array.isArray(historyResponse)) {
          setSearchHistory(historyResponse);
        } else {
          setSearchHistory([]);
        }
      } catch (error) {
        console.warn("Error loading history:", error);
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
  };

  if (loadingData) return <LoadingResults />;
  if (dataError)
    return (
      <ErrorMessage
        onRetry={loadUserData}
        message="No pudimos cargar la información de tu perfil. Por favor, intenta nuevamente."
      />
    );

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
        {!userCredits ||
        userCredits.length === 0 ||
        !userCredits[0]?.institution ? (
          <Typography
            variant="body2"
            sx={{ textAlign: "center", my: 2, color: "white" }}
          >
            No tienes créditos en proceso
          </Typography>
        ) : (
          userCredits.map((credit) => (
            <CreditCard key={credit.id}>
              <BankLogo>
                <img
                  src={credit.institution.logo}
                  alt={credit.institution.name}
                />
              </BankLogo>
              <CreditInfo>
                <InfoRow>
                  <InfoItem>
                    <Typography className="label">Valor Cuota</Typography>
                    <Typography className="value">
                      ${credit.monthlyPayment.toLocaleString()}
                    </Typography>
                  </InfoItem>
                  <InfoItem>
                    <Typography className="label">Tasa de interés</Typography>
                    <Typography className="value">
                      {credit.institution.minRate}%
                    </Typography>
                  </InfoItem>
                </InfoRow>
                <InfoItem>
                  <Typography className="label">Pago Total (aprox.)</Typography>
                  <Typography className="value">
                    ${credit.totalPayment.toLocaleString()}
                  </Typography>
                </InfoItem>
                <ActionButton>CONTACTAR</ActionButton>
              </CreditInfo>
            </CreditCard>
          ))
        )}

        <SectionTitle>Historial de Búsqueda</SectionTitle>
        {searchHistory.length === 0 ? (
          <Typography
            variant="body2"
            sx={{ textAlign: "center", my: 2, color: "white" }}
          >
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
                      ${search?.amount?.toLocaleString() || "0"}
                    </Typography>
                  </InfoItem>
                  <InfoItem>
                    <Typography className="label">Plazo</Typography>
                    <Typography className="value">
                      {search?.term || "0"} meses
                    </Typography>
                  </InfoItem>
                  <InfoItem>
                    <Typography className="label">Ingresos</Typography>
                    <Typography className="value">
                      ${search?.income?.toLocaleString() || "0"}
                    </Typography>
                  </InfoItem>
                </HistoryDetails>
                <ActionButton
                  onClick={() =>
                    navigate("/credit", {
                      state: {
                        amount: search.amount,
                        term: search.term,
                        income: search.income,
                      },
                    })
                  }
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