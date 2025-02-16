import { useEffect } from "react";
import LoadingResults from "../shared/loadingResults";
import ErrorMessage from "../shared/errorMessage";
import { UserContainer } from "./styles/constUsuario";
import Navbar from "../navbar/navbar";
import { userData } from "./utils/userData";
import UserHeader from "./components/design/userHeader";
import WelcomeSectionComponent from "./components/design/welcomeSection";
import CreditsList from "./components/creditsList";
import SearchHistoryComponent from "./components/design/searchHistory";
import NoCreditsMessage from "./components/design/noCreditsMessage";
import CreditHeader from "./components/design/creditHeader";
import CreditBasicInfo from "./components/design/creditBasicInfo";
import CreditCardProfile from "./components/design/creditCardProfile";
import CreditDetailsProfile from "./components/design/creditDetailsProfile";
import CreditDocuments from "./components/design/creditDocuments";
import DocumentPreview from "./components/design/documentPreview";

const Usuario = () => {
  const {
    userProfile,
    userCredits,
    searchHistory,
    loadingData,
    dataError,
    loadUserData
  } = userData();

  useEffect(() => {
    loadUserData();
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

  return (
    <>
      <Navbar />
      <UserContainer>
        <UserHeader />
        <WelcomeSectionComponent userProfile={userProfile} />
        <CreditsList 
          credits={userCredits}
          components={{
            NoCreditsMessage,
            CreditCardProfile,
            CreditHeader,
            CreditBasicInfo,
            CreditDetailsProfile,
            CreditDocuments,
            DocumentPreview
          }}
        />
        <SearchHistoryComponent searchHistory={searchHistory} />
      </UserContainer>
    </>
  );
};

export default Usuario;