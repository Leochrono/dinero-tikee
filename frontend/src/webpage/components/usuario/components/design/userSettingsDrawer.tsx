import { useState } from 'react';
import { IconButton, Drawer, Tooltip } from '@mui/material';
import { Settings } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const SettingsButton = styled(IconButton)(({ theme }) => ({
  position: 'fixed',
  bottom: '2rem',
  right: '2rem',
  backgroundColor: theme.palette.primary.main,
  color: 'white',
  width: '56px',
  height: '56px',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
    transform: 'rotate(45deg)',
    transition: 'transform 0.3s ease-in-out',
  },
  boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
  zIndex: 1000,
}));

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    width: '100%', // Cambia a 100% para móviles
    maxWidth: '400px', // Máximo 400px para pantallas más grandes
    backgroundColor: '#1E1E1E',
    borderLeft: '1px solid rgba(255, 255, 255, 0.12)',
    padding: '20px',
    boxSizing: 'border-box',
  },
}));

interface UserSettingsDrawerProps {
  children: React.ReactNode;
}

const UserSettingsDrawer = ({ children }: UserSettingsDrawerProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Tooltip title="Configuraciones" placement="left">
        <SettingsButton 
          onClick={toggleDrawer}
          sx={{
            transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
            transition: 'transform 0.3s ease-in-out',
          }}
        >
          <Settings />
        </SettingsButton>
      </Tooltip>

      <StyledDrawer
        anchor="right"
        open={isOpen}
        onClose={toggleDrawer}
        variant="temporary"
        elevation={4}
      >
        {children}
      </StyledDrawer>
    </>
  );
};

export default UserSettingsDrawer;