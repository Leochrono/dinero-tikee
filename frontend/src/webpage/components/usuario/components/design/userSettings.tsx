import React, { useState } from 'react';
import { Box, Switch } from '@mui/material';
import { toast } from 'react-hot-toast';
import { useSettingsUser } from "@/src/core/hooks/api/settings-user";
import { usePassword } from '@/src/core/hooks/api/use-password';
import {
  SettingsContainer,
  SettingsButton,
  StyledTextField,
  SettingsForm,
  StyledFormControlLabel,
  SubtitleText,
  ActionButton
} from '@/webpage/components/usuario/styles/constUsuario';

const UserSettings = () => {
  const [currentSection, setCurrentSection] = useState('password');
  const { changePassword } = usePassword();
  const { loading, updatePersonalInfo, updateSecuritySettings } = useSettingsUser();

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [profileForm, setProfileForm] = useState({
    telefono: '',
    direccion: '',
  });

  const [securityForm, setSecurityForm] = useState({
    notifyOnNewLogin: true,
    notifyOnPasswordChange: true,
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

  const handleSecurityUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateSecuritySettings(securityForm);
      toast.success('Preferencias de seguridad actualizadas');
    } catch (error: any) {
      toast.error(error.message || 'Error al actualizar preferencias de seguridad');
    }
  };

  const renderContent = () => {
    switch (currentSection) {
      case 'password':
        return (
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
        );

      case 'personal':
        return (
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
        );

      case 'security':
        return (
          <SettingsForm onSubmit={handleSecurityUpdate}>
            <SubtitleText>
              Configura tus preferencias de notificaciones de seguridad
            </SubtitleText>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <StyledFormControlLabel
                control={
                  <Switch
                    checked={securityForm.notifyOnNewLogin}
                    onChange={(e) => setSecurityForm(prev => ({
                      ...prev,
                      notifyOnNewLogin: e.target.checked
                    }))}
                  />
                }
                label="Notificar nuevos inicios de sesión por correo"
              />
              <StyledFormControlLabel
                control={
                  <Switch
                    checked={securityForm.notifyOnPasswordChange}
                    onChange={(e) => setSecurityForm(prev => ({
                      ...prev,
                      notifyOnPasswordChange: e.target.checked
                    }))}
                  />
                }
                label="Notificar cambios de contraseña por correo"
              />
              <ActionButton type="submit" disabled={loading}>
                {loading ? 'Guardando...' : 'Guardar Preferencias'}
              </ActionButton>
            </Box>
          </SettingsForm>
        );

      default:
        return null;
    }
  };

  return (
    <SettingsContainer>
      <Box mb={3}>
        <SubtitleText>Configuración</SubtitleText>
      </Box>
      <Box>
        <SettingsButton
          className={currentSection === 'password' ? 'active' : ''}
          onClick={() => setCurrentSection('password')}
        >
          Contraseña
        </SettingsButton>
        <SettingsButton
          className={currentSection === 'personal' ? 'active' : ''}
          onClick={() => setCurrentSection('personal')}
        >
          Datos Personales
        </SettingsButton>
        <SettingsButton
          className={currentSection === 'security' ? 'active' : ''}
          onClick={() => setCurrentSection('security')}
        >
          Seguridad
        </SettingsButton>
      </Box>
      <Box mt={3}>
        {renderContent()}
      </Box>
    </SettingsContainer>
  );
};

export default UserSettings;