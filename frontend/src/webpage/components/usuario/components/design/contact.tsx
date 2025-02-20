import React from 'react';
import { Box, Typography } from '@mui/material';
import Navbar from '@/webpage/components/navbar/navbar';
import { UserContainer } from '@/webpage/components/usuario/styles/constUsuario';
import SidebarMenu from './sidebarMenu';

const Contacto = () => {
  return (
    <SidebarMenu>
      <Navbar />
      <UserContainer>
        <Typography variant="h4" sx={{ 
          color: 'white', 
          mb: 4,
          fontFamily: "'Galano Grotesque', sans-serif"
        }}>
          Contacto
        </Typography>
        <Box sx={{ 
          backgroundColor: 'secondary.main',
          borderRadius: 2,
          p: 3,
          border: '1px solid',
          borderColor: 'primary.light'
        }}>
          {/* Aquí irá el formulario de contacto */}
          <Typography variant="body1" sx={{ color: 'white' }}>
            Formulario de contacto
          </Typography>
        </Box>
      </UserContainer>
    </SidebarMenu>
  );
};

export default Contacto;