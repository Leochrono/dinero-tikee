import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material";
import { useGlobalAuth } from "@/src/core/context/authContext";
import { Header, BackButton } from "../../styles/constUsuario";
import { routesWebpage } from "@/components/contants/routes";

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
    </Header>
  );
};

export default UserHeader;
