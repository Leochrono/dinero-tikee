import { Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { 
  SectionTitle,
  HistoryGrid,
  HistoryCard,
  HistoryDate,
  HistoryDetails,
  InfoItem,
  ActionButton 
} from "../../styles/constUsuario";
import { SearchHistory as SearchHistoryType } from "@/src/core/types/credit.types";
import { routesWebpage } from '@/components/contants/routes';

interface SearchHistoryProps {
  searchHistory: SearchHistoryType[];
}

const SearchHistory = ({ searchHistory }: SearchHistoryProps) => {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <>
      <SectionTitle>Historial de Búsqueda</SectionTitle>
      {!searchHistory.length ? (
        <Typography 
          variant="body2" 
          sx={{ 
            textAlign: "center", 
            my: 2, 
            color: theme.palette.common.white 
          }}
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
    </>
  );
};

export default SearchHistory;