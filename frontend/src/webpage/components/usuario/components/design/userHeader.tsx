import { useNavigate } from "react-router-dom";
import { IconButton, useTheme } from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useGlobalAuth } from "@/src/core/context/authContext";
import { Header, BackButton } from "../../styles/constUsuario";
import { routesWebpage } from '@/components/contants/routes';

const UserHeader = () => {
  const navigate = useNavigate();
  const { logout } = useGlobalAuth();
  const theme = useTheme();

  const handleLogout = () => {
    logout();
    navigate(routesWebpage.login);
  };

  return (
    <Header>
      <BackButton onClick={() => navigate(-1)} />
      <IconButton
        onClick={handleLogout}
        sx={{
          color: theme.palette.common.white,
          marginLeft: "auto",
          "&:hover": {
            backgroundColor: `${theme.palette.common.white}0A`, 
          },
        }}
      >
        <ExitToAppIcon />
      </IconButton>
    </Header>
  );
};

export default UserHeader;