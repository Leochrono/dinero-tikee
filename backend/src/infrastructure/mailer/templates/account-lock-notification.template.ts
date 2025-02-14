export const accountLockNotificationTemplate = `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #001B30; border-radius: 5px; background-color: #001e35;">
  <div style="text-align: center; margin-bottom: 20px;">
    <img src="[LOGO_URL]" alt="Dinero al Vuelo" style="max-width: 200px; margin-bottom: 15px;">
    <h1 style="color: #63ff48; margin-bottom: 10px;">[ASUNTO_EMAIL]</h1>
    <div style="background-color: #63ff48; height: 4px; width: 100px; margin: 0 auto;"></div>
  </div>

  <div style="background-color: #001B30; padding: 20px; border-radius: 5px; margin: 20px 0; border: 1px solid #ff4848;">
    <p style="color: #ffffff; font-size: 16px; line-height: 1.5;">
      Hola [USER_NOMBRES],<br><br>
      Tu cuenta ha sido bloqueada temporalmente por motivos de seguridad:
    </p>
    <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #ff4848; color: rgba(255,255,255,0.7);">Fecha:</td>
        <td style="padding: 10px; border-bottom: 1px solid #ff4848; color: #ffffff;">
          [PROCESS_DATE]
        </td>
      </tr>
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #ff4848; color: rgba(255,255,255,0.7);">IP:</td>
        <td style="padding: 10px; border-bottom: 1px solid #ff4848; color: #ffffff;">
          [IP_INFO]
        </td>
      </tr>
      <tr>
        <td style="padding: 10px; color: rgba(255,255,255,0.7);">Dispositivo:</td>
        <td style="padding: 10px; color: #ffffff;">
          [DEVICE_INFO]
        </td>
      </tr>
    </table>
  </div>

  <div style="margin-top: 20px; padding: 20px; background-color: rgba(255, 72, 72, 0.1); border-radius: 5px;">
    <p style="color: #ff4848; margin: 0;">
      <strong>Información importante:</strong>
    </p>
    <ul style="color: #ffffff; margin: 10px 0 0 0; padding-left: 20px;">
      <li>Este bloqueo es una medida de seguridad automática.</li>
      <li>Para desbloquear tu cuenta, utiliza el siguiente código:</li>
    </ul>
    <div style="text-align: center; margin: 20px 0;">
      <div style="background-color: #63ff48; color: #091e35; padding: 15px; border-radius: 5px; font-size: 24px; font-weight: bold; letter-spacing: 2px;">
        [TOKEN_OR_PASSWORD]
      </div>
    </div>
  </div>

  <div style="margin-top: 30px; text-align: center; color: #ffffff;">
    <p>Gracias por confiar en nosotros</p>
    <p style="margin-top: 10px; font-size: 14px;">Equipo de Dinero al Vuelo</p>
  </div>

  <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #63ff48; text-align: center; font-size: 12px; color: rgba(255,255,255,0.7);">
    <p>Este es un correo automático, por favor no responder.</p>
    <p>© [FULL_YEAR] Dinero al Vuelo. Todos los derechos reservados.</p>
  </div>
</div>`;
