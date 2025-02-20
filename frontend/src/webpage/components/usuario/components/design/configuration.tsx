import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { toast } from 'react-hot-toast';
import Navbar from '@/webpage/components/navbar/navbar';
import { UserContainer } from '@/webpage/components/usuario/styles/constUsuario';
import SidebarMenu from '@/webpage/components/usuario/components/design/SidebarMenu';
import {
  SettingsForm,
  StyledTextField,
  ActionButton,
  SubtitleText
} from '@/webpage/components/usuario/styles/constUsuario';
import { usePassword } from '@/src/core/hooks/api/use-password';
import { useSettingsUser } from "@/src/core/hooks/api/settings-user";

const Configuracion = () => {
  const { changePassword } = usePassword();
  const { loading, updatePersonalInfo } = useSettingsUser();

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [profileForm, setProfileForm] = useState({
    telefono: '',
    direccion: '',
  });

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error('Las contraseñas no coinciden');
      return;
    }

    try {
      await changePassword(passwordForm.currentPassword, passwordForm.newPassword);
      toast.success('Contraseña actualizada exitosamente');
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (error: any) {
      toast.error(error.message || 'Error al cambiar la contraseña');
    }
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updatePersonalInfo(profileForm);
      toast.success('Información personal actualizada exitosamente');
    } catch (error: any) {
      toast.error(error.message || 'Error al actualizar el perfil');
    }
  };

  return (
    <SidebarMenu>
      <Navbar />
      <UserContainer>
        <Typography variant="h4" sx={{ 
          color: 'white', 
          mb: 4,
          fontFamily: "'Galano Grotesque', sans-serif"
        }}>
          Configuración
        </Typography>

        {/* Sección de Cambio de Contraseña */}
        <Box sx={{ 
          backgroundColor: 'secondary.main',
          borderRadius: 2,
          p: 3,
          border: '1px solid',
          borderColor: 'primary.light',
          mb: 4
        }}>
          <Typography variant="h5" sx={{ 
            color: 'white',
            mb: 2,
            fontFamily: "'Galano Grotesque', sans-serif"
          }}>
            Cambiar Contraseña
          </Typography>
          
          <SettingsForm onSubmit={handlePasswordChange}>
            <SubtitleText>
              Cambia tu contraseña regularmente para mantener tu cuenta segura
            </SubtitleText>
            <StyledTextField
              fullWidth
              type="password"
              label="Contraseña actual"
              value={passwordForm.currentPassword}
              onChange={(e) => setPasswordForm(prev => ({ ...prev, currentPassword: e.target.value }))}
              required
            />
            <StyledTextField
              fullWidth
              type="password"
              label="Nueva contraseña"
              value={passwordForm.newPassword}
              onChange={(e) => setPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
              required
            />
            <StyledTextField
              fullWidth
              type="password"
              label="Confirmar nueva contraseña"
              value={passwordForm.confirmPassword}
              onChange={(e) => setPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
              required
            />
            <ActionButton type="submit" disabled={loading}>
              {loading ? 'Actualizando...' : 'Cambiar Contraseña'}
            </ActionButton>
          </SettingsForm>
        </Box>

        {/* Sección de Información Personal */}
        <Box sx={{ 
          backgroundColor: 'secondary.main',
          borderRadius: 2,
          p: 3,
          border: '1px solid',
          borderColor: 'primary.light'
        }}>
          <Typography variant="h5" sx={{ 
            color: 'white',
            mb: 2,
            fontFamily: "'Galano Grotesque', sans-serif"
          }}>
            Información Personal
          </Typography>

          <SettingsForm onSubmit={handleProfileUpdate}>
            <SubtitleText>
              Mantén tu información de contacto actualizada
            </SubtitleText>
            <StyledTextField
              fullWidth
              label="Teléfono"
              value={profileForm.telefono}
              onChange={(e) => setProfileForm(prev => ({ ...prev, telefono: e.target.value }))}
              placeholder="Ingresa tu número de teléfono"
            />
            <StyledTextField
              fullWidth
              label="Dirección"
              value={profileForm.direccion}
              onChange={(e) => setProfileForm(prev => ({ ...prev, direccion: e.target.value }))}
              placeholder="Ingresa tu dirección"
              multiline
              rows={3}
            />
            <ActionButton type="submit" disabled={loading}>
              {loading ? 'Actualizando...' : 'Actualizar Datos'}
            </ActionButton>
          </SettingsForm>
        </Box>
      </UserContainer>
    </SidebarMenu>
  );
};

export default Configuracion;