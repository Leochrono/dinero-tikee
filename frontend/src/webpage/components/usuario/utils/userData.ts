import { useState } from 'react';
import { useUserProfile } from "@/src/core/hooks/api/use-user-profile";
import { UserProfile } from "@/src/core/types/user.types";
import { UserCredit, SearchHistory } from "@/src/core/types/credit.types";

export const userData = () => {
  const { getUserProfile, getUserCredits, getSearchHistory } = useUserProfile();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [userCredits, setUserCredits] = useState<UserCredit[]>([]);
  const [searchHistory, setSearchHistory] = useState<SearchHistory[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [dataError, setDataError] = useState<string | null>(null);

  const loadUserData = async () => {
    setLoadingData(true);
    setDataError(null);
    try {
      
      const profileResponse = await getUserProfile();
      if (profileResponse?.success && profileResponse?.data) {
        setUserProfile(profileResponse.data ?? null);
      }

      try {
        const creditsResponse = await getUserCredits();
        const credits = Array.isArray(creditsResponse) 
        ? creditsResponse 
        : (creditsResponse?.data || []);

        if (credits.length > 0) {
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

          setUserCredits(calculatedCredits);
        } else {
          console.error('No se recibieron créditos o el array está vacío');
          setUserCredits([]);
        }
      } catch (error) {
        console.error("Error loading credits:", error);
        setUserCredits([]);
      }

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

  return {
    userProfile,
    userCredits,
    searchHistory,
    loadingData,
    dataError,
    loadUserData
  };
};