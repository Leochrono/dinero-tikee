import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  private readonly LOGO_URL =
    'https://s3-tikee-image-public.s3.amazonaws.com/quinociotest/dineroalvuelologo1.png';
  private transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.configService.get('SMTP_USER'),
        pass: this.configService.get('SMTP_PASSWORD'),
      },
    });
  }

  getPasswordRecoveryTemplate(nombres: string, tempPassword: string): string {
    return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #001B30; border-radius: 5px; background-color: #001e35;">
      <div style="text-align: center; margin-bottom: 20px;">
        <img src="${this.LOGO_URL}" alt="Dinero al Vuelo" style="max-width: 200px; margin-bottom: 15px;">
        <h1 style="color: #63ff48; margin-bottom: 10px;">Recuperación de Contraseña</h1>
        <div style="background-color: #63ff48; height: 4px; width: 100px; margin: 0 auto;"></div>
      </div>

      <div style="background-color: #001B30; padding: 20px; border-radius: 5px; margin: 20px 0; border: 1px solid #63ff48;">
        <p style="color: #ffffff; font-size: 16px; line-height: 1.5;">
          Hola ${nombres},<br><br>
          Has solicitado restablecer tu contraseña. Tu contraseña temporal es:
        </p>
        <div style="text-align: center; margin: 30px 0;">
          <div style="background-color: #63ff48; color: #091e35; padding: 15px; border-radius: 5px; font-size: 24px; font-weight: bold; letter-spacing: 2px;">
            ${tempPassword}
          </div>
        </div>
      </div>

      <div style="margin-top: 20px; padding: 20px; background-color: rgba(99, 255, 72, 0.1); border-radius: 5px;">
        <p style="color: #63ff48; margin: 0;">
          <strong>Información importante:</strong>
        </p>
        <ul style="color: #ffffff; margin: 10px 0 0 0; padding-left: 20px;">
          <li>Esta es una contraseña temporal.</li>
          <li>Deberás cambiarla en tu próximo inicio de sesión.</li>
          <li>Por seguridad, no compartas esta contraseña con nadie.</li>
        </ul>
      </div>

      <div style="margin-top: 30px; text-align: center; color: #ffffff;">
        <p>Gracias por confiar en nosotros</p>
        <p style="margin-top: 10px; font-size: 14px;">Equipo de Dinero al Vuelo</p>
      </div>

      <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #63ff48; text-align: center; font-size: 12px; color: rgba(255,255,255,0.7);">
        <p>Este es un correo automático, por favor no responder.</p>
        <p>© ${new Date().getFullYear()} Dinero al Vuelo. Todos los derechos reservados.</p>
      </div>
    </div>
    `;
  }

  async sendPasswordRecovery(
    email: string,
    nombres: string,
    tempPassword: string,
  ) {
    await this.transporter.sendMail({
      from: '"Dinero al Vuelo" <noreply.dineroalvuelo@gmail.com>',
      to: email,
      subject: 'Recuperación de Contraseña',
      html: this.getPasswordRecoveryTemplate(nombres, tempPassword),
    });
  }

  getUserInfoTemplate(userInfo: any): string {
    return `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #001B30; border-radius: 5px; background-color: #001e35;">
    <div style="text-align: center; margin-bottom: 20px;">
      <img src="${this.LOGO_URL}" alt="Dinero al Vuelo" style="max-width: 200px; margin-bottom: 15px;">
      <h1 style="color: #63ff48; margin-bottom: 10px;">Información de tu cuenta</h1>
      <div style="background-color: #63ff48; height: 4px; width: 100px; margin: 0 auto;"></div>
    </div>

    <div style="background-color: #001B30; padding: 20px; border-radius: 5px; margin: 20px 0; border: 1px solid #63ff48;">
      <h2 style="color: #63ff48; margin-bottom: 15px; font-size: 18px;">Detalles de la cuenta</h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #63ff48; color: rgba(255,255,255,0.7);">Nombre completo:</td>
          <td style="padding: 10px; border-bottom: 1px solid #63ff48; color: #ffffff; font-weight: bold;">
            ${userInfo.nombres} ${userInfo.apellidos}
          </td>
        </tr>
        <tr>
          <td style="padding: 10px; color: rgba(255,255,255,0.7);">Correo electrónico:</td>
          <td style="padding: 10px; color: #ffffff; font-weight: bold;">${userInfo.email}</td>
        </tr>
      </table>
    </div>

    <div style="margin-top: 20px; padding: 20px; background-color: rgba(99, 255, 72, 0.1); border-radius: 5px;">
      <p style="color: #63ff48; margin: 0;">
        <strong>Nota de seguridad:</strong> Si no solicitaste esta información, puedes ignorar este correo.
      </p>
    </div>

    <div style="margin-top: 30px; text-align: center; color: #ffffff;">
      <p>Gracias por confiar en nosotros</p>
      <p style="margin-top: 10px; font-size: 14px;">Equipo de Dinero al Vuelo</p>
    </div>

    <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #63ff48; text-align: center; font-size: 12px; color: rgba(255,255,255,0.7);">
      <p>Este es un correo automático, por favor no responder.</p>
      <p>© ${new Date().getFullYear()} Dinero al Vuelo. Todos los derechos reservados.</p>
    </div>
  </div>
  `;
  }

  async sendUserInfo(email: string, userInfo: any) {
    await this.transporter.sendMail({
      from: '"Dinero al Vuelo" <noreply.dineroalvuelo@gmail.com>',
      to: email,
      subject: 'Recuperación de Usuario',
      html: this.getUserInfoTemplate(userInfo),
    });
  }

  getSuspiciousLoginAlertTemplate(
    nombres: string,
    loginInfo: {
      date: Date;
      ipAddress: string;
      location?: string;
      deviceInfo?: string;
    },
  ): string {
    return `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #001B30; border-radius: 5px; background-color: #001e35;">
    <div style="text-align: center; margin-bottom: 20px;">
      <img src="${this.LOGO_URL}" alt="Dinero al Vuelo" style="max-width: 200px; margin-bottom: 15px;">
      <h1 style="color: #63ff48; margin-bottom: 10px;">Alerta de Seguridad</h1>
      <div style="background-color: #63ff48; height: 4px; width: 100px; margin: 0 auto;"></div>
    </div>

    <div style="background-color: #001B30; padding: 20px; border-radius: 5px; margin: 20px 0; border: 1px solid #ff4848;">
      <p style="color: #ffffff; font-size: 16px; line-height: 1.5;">
        Hola ${nombres},<br><br>
        Hemos detectado un inicio de sesión inusual en tu cuenta:
      </p>
      <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #ff4848; color: rgba(255,255,255,0.7);">Fecha:</td>
          <td style="padding: 10px; border-bottom: 1px solid #ff4848; color: #ffffff;">
            ${loginInfo.date.toLocaleString()}
          </td>
        </tr>
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #ff4848; color: rgba(255,255,255,0.7);">Ubicación:</td>
          <td style="padding: 10px; border-bottom: 1px solid #ff4848; color: #ffffff;">
            ${loginInfo.location || 'Desconocida'}
          </td>
        </tr>
        <tr>
          <td style="padding: 10px; color: rgba(255,255,255,0.7);">Dispositivo:</td>
          <td style="padding: 10px; color: #ffffff;">
            ${loginInfo.deviceInfo || 'Desconocido'}
          </td>
        </tr>
      </table>
    </div>

    <div style="margin-top: 20px; padding: 20px; background-color: rgba(255, 72, 72, 0.1); border-radius: 5px;">
      <p style="color: #ff4848; margin: 0;">
        <strong>Acciones recomendadas:</strong>
      </p>
      <ul style="color: #ffffff; margin: 10px 0 0 0; padding-left: 20px;">
        <li>Cambia tu contraseña inmediatamente.</li>
        <li>Verifica la configuración de seguridad de tu cuenta.</li>
        <li>Contacta con soporte si no reconoces esta actividad.</li>
      </ul>
    </div>

    <div style="margin-top: 30px; text-align: center; color: #ffffff;">
      <p>Gracias por confiar en nosotros</p>
      <p style="margin-top: 10px; font-size: 14px;">Equipo de Dinero al Vuelo</p>
    </div>

    <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #63ff48; text-align: center; font-size: 12px; color: rgba(255,255,255,0.7);">
      <p>Este es un correo automático, por favor no responder.</p>
      <p>© ${new Date().getFullYear()} Dinero al Vuelo. Todos los derechos reservados.</p>
    </div>
  </div>
  `;
  }

  async sendSuspiciousLoginAlert(
    email: string,
    nombres: string,
    loginInfo: {
      date: Date;
      ipAddress: string;
      location?: string;
      deviceInfo?: string;
    },
  ) {
    await this.transporter.sendMail({
      from: '"Dinero al Vuelo - Seguridad" <noreply.dineroalvuelo@gmail.com>',
      to: email,
      subject: '⚠️ Alerta de Seguridad - Inicio de Sesión Sospechoso',
      html: this.getSuspiciousLoginAlertTemplate(nombres, loginInfo),
    });
  }

  getAccountLockNotificationTemplate(
    nombres: string,
    lockInfo: {
      reason: string;
      duration: string;
      unlockCode?: string;
    },
  ): string {
    return `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #001B30; border-radius: 5px; background-color: #001e35;">
    <div style="text-align: center; margin-bottom: 20px;">
      <img src="${this.LOGO_URL}" alt="Dinero al Vuelo" style="max-width: 200px; margin-bottom: 15px;">
      <h1 style="color: #63ff48; margin-bottom: 10px;">Cuenta Bloqueada</h1>
      <div style="background-color: #63ff48; height: 4px; width: 100px; margin: 0 auto;"></div>
    </div>

    <div style="background-color: #001B30; padding: 20px; border-radius: 5px; margin: 20px 0; border: 1px solid #ff4848;">
      <p style="color: #ffffff; font-size: 16px; line-height: 1.5;">
        Hola ${nombres},<br><br>
        Tu cuenta ha sido bloqueada temporalmente por motivos de seguridad:
      </p>
      <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #ff4848; color: rgba(255,255,255,0.7);">Motivo:</td>
          <td style="padding: 10px; border-bottom: 1px solid #ff4848; color: #ffffff;">
            ${lockInfo.reason}
          </td>
        </tr>
        <tr>
          <td style="padding: 10px; color: rgba(255,255,255,0.7);">Duración:</td>
          <td style="padding: 10px; color: #ffffff;">
            ${lockInfo.duration}
          </td>
        </tr>
      </table>
      ${
        lockInfo.unlockCode
          ? `
        <div style="margin-top: 20px; text-align: center;">
          <p style="color: #ffffff;">Código de desbloqueo:</p>
          <div style="background-color: #63ff48; color: #091e35; padding: 15px; border-radius: 5px; font-size: 24px; font-weight: bold; letter-spacing: 2px; margin: 10px 0;">
            ${lockInfo.unlockCode}
          </div>
        </div>
      `
          : ''
      }
    </div>

    <div style="margin-top: 20px; padding: 20px; background-color: rgba(255, 72, 72, 0.1); border-radius: 5px;">
      <p style="color: #ff4848; margin: 0;">
        <strong>Información importante:</strong>
      </p>
      <ul style="color: #ffffff; margin: 10px 0 0 0; padding-left: 20px;">
        <li>Este bloqueo es una medida de seguridad automática.</li>
        <li>Tu cuenta se desbloqueará automáticamente después del tiempo indicado.</li>
        <li>Si necesitas ayuda, contacta con nuestro equipo de soporte.</li>
      </ul>
    </div>

    <div style="margin-top: 30px; text-align: center; color: #ffffff;">
      <p>Gracias por confiar en nosotros</p>
      <p style="margin-top: 10px; font-size: 14px;">Equipo de Dinero al Vuelo</p>
    </div>

    <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #63ff48; text-align: center; font-size: 12px; color: rgba(255,255,255,0.7);">
      <p>Este es un correo automático, por favor no responder.</p>
      <p>© ${new Date().getFullYear()} Dinero al Vuelo. Todos los derechos reservados.</p>
    </div>
  </div>
  `;
  }

  async sendAccountLockNotification(
    email: string,
    nombres: string,
    lockInfo: {
      reason: string;
      duration: string;
      unlockCode?: string;
    },
  ) {
    await this.transporter.sendMail({
      from: '"Dinero al Vuelo - Seguridad" <noreply.dineroalvuelo@gmail.com>',
      to: email,
      subject: '🔒 Cuenta Bloqueada - Información Importante',
      html: this.getAccountLockNotificationTemplate(nombres, lockInfo),
    });
  }

  getPasswordChangeNotificationTemplate(
    nombres: string,
    changeInfo: {
      date: Date;
      ipAddress: string;
      location?: string;
      deviceInfo?: string;
    },
  ): string {
    return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #001B30; border-radius: 5px; background-color: #001e35;">
      <div style="text-align: center; margin-bottom: 20px;">
        <img src="${this.LOGO_URL}" alt="Dinero al Vuelo" style="max-width: 200px; margin-bottom: 15px;">
        <h1 style="color: #63ff48; margin-bottom: 10px;">Cambio de Contraseña</h1>
        <div style="background-color: #63ff48; height: 4px; width: 100px; margin: 0 auto;"></div>
      </div>
 
      <div style="background-color: #001B30; padding: 20px; border-radius: 5px; margin: 20px 0; border: 1px solid #63ff48;">
        <p style="color: #ffffff; font-size: 16px; line-height: 1.5;">
          Hola ${nombres},<br><br>
          Tu contraseña ha sido cambiada exitosamente. Detalles del cambio:
        </p>
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #63ff48; color: rgba(255,255,255,0.7);">Fecha:</td>
            <td style="padding: 10px; border-bottom: 1px solid #63ff48; color: #ffffff;">
              ${changeInfo.date.toLocaleString()}
            </td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #63ff48; color: rgba(255,255,255,0.7);">Ubicación:</td>
            <td style="padding: 10px; border-bottom: 1px solid #63ff48; color: #ffffff;">
              ${changeInfo.location || 'Desconocida'}
            </td>
          </tr>
          <tr>
            <td style="padding: 10px; color: rgba(255,255,255,0.7);">Dispositivo:</td>
            <td style="padding: 10px; color: #ffffff;">
              ${changeInfo.deviceInfo || 'Desconocido'}
            </td>
          </tr>
        </table>
      </div>
 
      <div style="margin-top: 20px; padding: 20px; background-color: rgba(99, 255, 72, 0.1); border-radius: 5px;">
        <p style="color: #63ff48; margin: 0;">
          <strong>Información importante:</strong>
        </p>
        <ul style="color: #ffffff; margin: 10px 0 0 0; padding-left: 20px;">
          <li>Si no realizaste este cambio, contacta inmediatamente con soporte.</li>
          <li>Por seguridad, se cerrarán todas las sesiones activas.</li>
          <li>Deberás iniciar sesión nuevamente con tu nueva contraseña.</li>
        </ul>
      </div>
 
      <div style="margin-top: 30px; text-align: center; color: #ffffff;">
        <p>Gracias por confiar en nosotros</p>
        <p style="margin-top: 10px; font-size: 14px;">Equipo de Dinero al Vuelo</p>
      </div>
 
      <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #63ff48; text-align: center; font-size: 12px; color: rgba(255,255,255,0.7);">
        <p>Este es un correo automático, por favor no responder.</p>
        <p>© ${new Date().getFullYear()} Dinero al Vuelo. Todos los derechos reservados.</p>
      </div>
    </div>
    `;
  }

  getVerificationEmailTemplate(nombres: string, code: string): string {
    return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #001B30; border-radius: 5px; background-color: #001e35;">
      <div style="text-align: center; margin-bottom: 20px;">
        <img src="${this.LOGO_URL}" alt="Dinero al Vuelo" style="max-width: 200px; margin-bottom: 15px;">
        <h1 style="color: #63ff48; margin-bottom: 10px;">Verificación de Cuenta</h1>
        <div style="background-color: #63ff48; height: 4px; width: 100px; margin: 0 auto;"></div>
      </div>
      <div style="background-color: #001B30; padding: 20px; border-radius: 5px; margin: 20px 0; border: 1px solid #63ff48;">
        <p style="color: #ffffff; font-size: 16px; line-height: 1.5;">
          Hola ${nombres},<br><br>
          Gracias por registrarte. Para verificar tu cuenta, utiliza el siguiente código:
        </p>
        <div style="text-align: center; margin: 30px 0;">
          <div style="background-color: #63ff48; color: #091e35; padding: 15px; border-radius: 5px; font-size: 24px; font-weight: bold; letter-spacing: 2px;">
            ${code}
          </div>
        </div>
      </div>
      <div style="margin-top: 20px; padding: 20px; background-color: rgba(99, 255, 72, 0.1); border-radius: 5px;">
        <p style="color: #63ff48; margin: 0;">
          <strong>Información importante:</strong>
        </p>
        <ul style="color: #ffffff; margin: 10px 0 0 0; padding-left: 20px;">
          <li>Este código expirará en 24 horas.</li>
          <li>No compartas este código con nadie.</li>
          <li>Si no solicitaste esta verificación, ignora este correo.</li>
        </ul>
      </div>
      <div style="margin-top: 30px; text-align: center; color: #ffffff;">
        <p>Gracias por confiar en nosotros</p>
        <p style="margin-top: 10px; font-size: 14px;">Equipo de Dinero al Vuelo</p>
      </div>
      <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #63ff48; text-align: center; font-size: 12px; color: rgba(255,255,255,0.7);">
        <p>Este es un correo automático, por favor no responder.</p>
        <p>© ${new Date().getFullYear()} Dinero al Vuelo. Todos los derechos reservados.</p>
      </div>
    </div>
    `;
   }

  async sendPasswordChangeNotification(
    email: string,
    nombres: string,
    changeInfo: {
      date: Date;
      ipAddress: string;
      location?: string;
      deviceInfo?: string;
    },
  ) {
    await this.transporter.sendMail({
      from: '"Dinero al Vuelo - Seguridad" <noreply.dineroalvuelo@gmail.com>',
      to: email,
      subject: '🔐 Confirmación de Cambio de Contraseña',
      html: this.getPasswordChangeNotificationTemplate(nombres, changeInfo),
    });
  }
}
