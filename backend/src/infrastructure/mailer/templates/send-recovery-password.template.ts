export const recoveryPasswordTemplate = `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #001B30; border-radius: 5px; background-color: #001e35;">
<div style="text-align: center; margin-bottom: 20px;"><img style="max-width: 200px; margin-bottom: 15px;" src="[LOGO_URL]" alt="Dinero al Vuelo" />
<h1 style="color: #63ff48; margin-bottom: 10px;">[ASUNTO_EMAIL]</h1>
<div style="background-color: #63ff48; height: 4px; width: 100px; margin: 0 auto;">&nbsp;</div>
</div>
<div style="background-color: #001b30; padding: 20px; border-radius: 5px; margin: 20px 0; border: 1px solid #63ff48;">
<p style="color: #ffffff; font-size: 16px; line-height: 1.5;">Hola [USER_NOMBRES],<br /><br />Has solicitado restablecer tu contrase&ntilde;a. Tu contrase&ntilde;a temporal es:</p>
<div style="text-align: center; margin: 30px 0;">
<div style="background-color: #63ff48; color: #091e35; padding: 15px; border-radius: 5px; font-size: 24px; font-weight: bold; letter-spacing: 2px;">[TOKEN_OR_PASSWORD]</div>
</div>
</div>
<div style="margin-top: 20px; padding: 20px; background-color: rgba(99, 255, 72, 0.1); border-radius: 5px;">
<p style="color: #63ff48; margin: 0;"><strong>Informaci&oacute;n importante:</strong></p>
<ul style="color: #ffffff; margin: 10px 0 0 0; padding-left: 20px;">
<li>Esta es una contrase&ntilde;a temporal.</li>
<li>Deber&aacute;s cambiarla en tu pr&oacute;ximo inicio de sesi&oacute;n.</li>
<li>Por seguridad, no compartas esta contrase&ntilde;a con nadie.</li>
</ul>
</div>
<div style="margin-top: 30px; text-align: center; color: #ffffff;">
<p>Gracias por confiar en nosotros</p>
<p style="margin-top: 10px; font-size: 14px;">Equipo de Dinero al Vuelo</p>
</div>
<div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #63ff48; text-align: center; font-size: 12px; color: rgba(255,255,255,0.7);">
<p>Este es un correo autom&aacute;tico, por favor no responder.</p>
<p>&copy; [FULL_YEAR] Dinero al Vuelo. Todos los derechos reservados.</p>
</div>
</div>`;
