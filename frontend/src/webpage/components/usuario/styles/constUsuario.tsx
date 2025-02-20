import {
  Box,
  Typography,
  Button,
  TextField,
  FormControlLabel,
  Tabs,
  styled,
} from "@mui/material";

const NAVBAR_HEIGHT = "64px";

export const UserContainer = styled(Box)(({ theme }) => ({
  minHeight: `calc(100vh - ${NAVBAR_HEIGHT})`,
  backgroundColor: theme.palette.background.default,
  padding: "100px 200px",
  marginTop: NAVBAR_HEIGHT,
  width: "100%",
  boxSizing: "border-box",
  overflowX: "hidden",

  [theme.breakpoints.down("lg")]: {
    padding: "20px 60px",
  },
  [theme.breakpoints.down("md")]: {
    padding: "20px 40px",
  },
  [theme.breakpoints.down("sm")]: {
    padding: "20px",
  },
}));

export const Header = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: "16px 0",
  width: "100%",
  gap: "16px",

  "& > *:nth-of-type(2)": {
    flex: 1,
  },

  [theme.breakpoints.down("sm")]: {
    padding: "12px 0",
    justifyContent: "space-between",
  },
}));

export const BackButton = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  color: theme.palette.common.white,
  cursor: "pointer",
  padding: "8px",
  borderRadius: "8px",
  transition: "all 0.3s ease",

  "& svg": {
    color: theme.palette.primary.light,
    fontSize: "28px",
  },

  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },

  [theme.breakpoints.down("sm")]: {
    padding: "6px",
    "& svg": {
      fontSize: "24px",
    },
  },
}));

export const PageTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.common.white,
  fontSize: "32px",
  fontWeight: 500,
  textAlign: "center",
  fontFamily: "'Galano Grotesque', sans-serif", 

  [theme.breakpoints.down("md")]: {
    fontSize: "28px",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "24px",
  },
}));

export const WelcomeSection = styled(Typography)(({ theme }) => ({
  color: theme.palette.common.white,
  fontSize: "64px",
  fontWeight: 500, 
  marginTop: "40px",
  marginBottom: "48px",
  fontFamily: "'Galano Grotesque', sans-serif", 

  "& .highlight": {
    display: "block",
    fontSize: "72px",
    marginTop: "8px",
  },

  [theme.breakpoints.down("lg")]: {
    fontSize: "56px",
    "& .highlight": {
      fontSize: "64px",
    },
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "48px",
    marginTop: "32px",
    marginBottom: "40px",
    "& .highlight": {
      fontSize: "56px",
    },
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "36px",
    marginTop: "24px",
    marginBottom: "32px",
    "& .highlight": {
      fontSize: "42px",
    },
  },
}));

export const SectionTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.light,
  fontSize: '32px', // Reducido el tamaño para mejor ajuste
  fontWeight: 500, 
  marginBottom: '24px',
  width: '100%',
  textAlign: 'left',
  fontFamily: "'Galano Grotesque', sans-serif",
  display: 'block', // Asegura que tome todo el espacio necesario
  
  [theme.breakpoints.down('lg')]: {
    fontSize: '28px',
  },
  [theme.breakpoints.down('md')]: {
    fontSize: '24px',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '22px',
    marginBottom: '16px',
  },
}));

export const CreditCard = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  border: `1px solid ${theme.palette.primary.light}`,
  borderRadius: "16px",
  padding: "32px",
  marginBottom: "32px",
  display: "flex",
  alignItems: "center",
  gap: "32px",
  flexWrap: "wrap",

  [theme.breakpoints.down("lg")]: {
    padding: "24px",
    gap: "24px",
  },
  [theme.breakpoints.down("md")]: {
    padding: "20px",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",
  },
  [theme.breakpoints.down("sm")]: {
    padding: "16px",
    gap: "16px",
  },
}));

export const BankLogo = styled(Box)(({ theme }) => ({
  width: "180px",
  height: "180px",
  flexShrink: 0,
  backgroundColor: theme.palette.common.white,
  borderRadius: "12px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "16px",

  "& img": {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },

  [theme.breakpoints.down("lg")]: {
    width: "150px",
    height: "150px",
  },
  [theme.breakpoints.down("md")]: {
    width: "120px",
    height: "120px",
  },
  [theme.breakpoints.down("sm")]: {
    width: "100px",
    height: "100px",
    padding: "12px",
  },
}));

export const CreditInfo = styled(Box)(({ theme }) => ({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  gap: "24px",
  minWidth: "250px",

  [theme.breakpoints.down("md")]: {
    width: "100%",
    gap: "16px",
  },
}));

export const InfoRow = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "48px",
  flexWrap: "wrap",

  [theme.breakpoints.down("lg")]: {
    gap: "32px",
  },
  [theme.breakpoints.down("md")]: {
    gap: "24px",
    justifyContent: "center",
  },
  [theme.breakpoints.down("sm")]: {
    gap: "16px",
    flexDirection: "column",
    alignItems: "stretch",
  },
}));

export const InfoItem = styled(Box)(({ theme }) => ({
  flex: 1,
  minWidth: "200px",

  "& .label": {
    color: theme.palette.common.white,
    fontSize: "18px",
    marginBottom: "8px",
  },
  "& .value": {
    color: theme.palette.primary.light,
    fontSize: "32px",
    fontWeight: 700,
  },

  [theme.breakpoints.down("lg")]: {
    "& .value": {
      fontSize: "28px",
    },
  },
  [theme.breakpoints.down("md")]: {
    textAlign: "center",
    "& .value": {
      fontSize: "24px",
    },
  },
  [theme.breakpoints.down("sm")]: {
    minWidth: "unset",
    "& .label": {
      fontSize: "16px",
    },
    "& .value": {
      fontSize: "22px",
    },
  },
}));

export const ActionButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  color: theme.palette.text.secondary,
  padding: "12px 32px",
  borderRadius: "50px",
  fontSize: "16px",
  fontWeight: 500, 
  fontFamily: "'Stage Grotesque', sans-serif", 
  alignSelf: "flex-start",

  "&:hover": {
    backgroundColor: theme.palette.primary.main,
  },

  [theme.breakpoints.down("md")]: {
    alignSelf: "center",
    padding: "10px 24px",
    fontSize: "14px",
  },
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    padding: "8px 20px",
  },
}));

export const HistoryGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))",
  gap: "24px",

  [theme.breakpoints.down("lg")]: {
    gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
  },
  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
  },
  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: "1fr",
    gap: "16px",
  },
}));

export const HistoryCard = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  border: `1px solid ${theme.palette.primary.light}`,
  borderRadius: "16px",
  padding: "24px",

  [theme.breakpoints.down("md")]: {
    padding: "20px",
  },
  [theme.breakpoints.down("sm")]: {
    padding: "16px",
  },
}));

export const HistoryDate = styled(Typography)(({ theme }) => ({
  color: theme.palette.common.white,
  fontSize: "18px",
  marginBottom: "24px",
  fontFamily: "'Stage Grotesque', sans-serif", 

  [theme.breakpoints.down("md")]: {
    fontSize: "16px",
    marginBottom: "20px",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "14px",
    marginBottom: "16px",
  },
}));

export const HistoryDetails = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "16px",
  marginBottom: "24px",

  [theme.breakpoints.down("md")]: {
    gap: "12px",
    marginBottom: "20px",
  },
  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "8px",
    marginBottom: "16px",
  },
  [theme.breakpoints.down("xs")]: {
    gridTemplateColumns: "1fr",
  },
}));

export const SettingsContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  borderRadius: '16px',
  padding: '32px',
  width: '400px',  // Ancho fijo para el drawer
  minWidth: '350px', // Ancho mínimo para asegurar que el contenido quepa
  boxSizing: 'border-box',
  
  [theme.breakpoints.down('sm')]: {
    padding: '20px',
    width: '100%',
    minWidth: '300px',
  },
}));
export const StyledTabs = styled(Tabs)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.primary.light}`,
  marginBottom: '24px',
  minHeight: '48px',
  '& .MuiTab-root': {
    color: theme.palette.common.white,
    fontSize: '14px',
    fontWeight: 500,
    minHeight: '48px',
    padding: '6px 12px',
    '&.Mui-selected': {
      color: theme.palette.primary.light,
    },
  },
}));


export const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: '16px',
  '& .MuiOutlinedInput-root': {
    color: theme.palette.common.white,
    '& fieldset': {
      borderColor: theme.palette.primary.light,
    },
    '&:hover fieldset': {
      borderColor: theme.palette.primary.main,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
    },
  },
  '& .MuiInputLabel-root': {
    color: theme.palette.common.white,
    '&.Mui-focused': {
      color: theme.palette.primary.light,
    },
  },
  '& .MuiInputBase-input': {
    '&::placeholder': {
      color: 'rgba(255, 255, 255, 0.5)',
      opacity: 1,
    },
  },
}));

export const SettingsForm = styled('form')(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.05)',
  borderRadius: '8px',
  padding: '20px',
  marginBottom: '16px',
  width: '100%',
}));

export const StyledFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
  color: theme.palette.common.white,
  '& .MuiSwitch-root': {
    '& .MuiSwitch-switchBase.Mui-checked': {
      color: theme.palette.primary.light,
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.primary.main,
      },
    },
  },
}));

export const SubtitleText = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.light,
  fontSize: '13px',
  marginBottom: '20px',
  opacity: 0.8,
  lineHeight: 1.4,
}));