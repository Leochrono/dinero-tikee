import { Injectable } from '@nestjs/common';
import { EmailRequest } from './Model/request';
import { EmailProcess } from './Model/process';
import { RequestService } from '../Common/Model/RequestService';
import { IHttpService } from '../Common/Http/IHttpService';
import {MailerRepository, RequestDto, } from 'src/application/Common/interfaces/mailer.repository';
import { verificationEmailTemplate } from './templates/verification-email.template';
import { passwordChangeNotificationTemplate } from './templates/password-change-notification.template';
import { recoveryPasswordTemplate } from './templates/send-recovery-password.template';
import { accountLockNotificationTemplate } from './templates/account-lock-notification.template';
import { creditApprovalNotificationTemplate } from './templates/credit-approval-notification.template';
import { sessionActivityNotificationTemplate } from './templates/session-activity-notification.template';
import { suspiciousLoginAlertTemplate } from './templates/suspicious-login-alert.template';
import { userRecoveryTemplate } from './templates/user-Recovery-Template';
import { welcomeNotificationTemplate } from './templates/welcome-notification.template';
import { goodbyeTemplate } from './templates/goodbye.template';
import { profileUpdateTemplate } from './templates/profile-update.template';

@Injectable()
export class TikeeMailerRepository implements MailerRepository {
  private AUTOMATIZACIONES_TIKEE_URL =
    'http://20.84.48.225:5056/api/emails/enviarDirecto';
  private LOGO_URL =
    'https://s3-tikee-image-public.s3.amazonaws.com/quinociotest/dineroalvuelologo1.png';
  // Cambiar el correo si la coop tiene alguno propio
  private EMAIL_SENDER = 'automatizaciones@tikee.tech';

  constructor(private readonly httpService: IHttpService) {}

  async sendVerifyEmail(data: RequestDto): Promise<void> {
    const emailRequest = new EmailRequest();

    emailRequest.idUser = data.id;
    emailRequest.process = EmailProcess.VERIFY_USER_EMAIL;
    emailRequest.asunto = 'Verificación de Cuenta';
    emailRequest.destinos = [data.email];
    // Aquí traes tu plantilla que sea
    emailRequest.plantilla = verificationEmailTemplate;
    emailRequest.correo_envia = this.EMAIL_SENDER;
    // Importante, mismo orden, misma cantidad, mismos nombres que en la plantilla
    emailRequest.lista_vals_email = [
      this.LOGO_URL,
      emailRequest.asunto,
      data.nombres.toUpperCase(),
      data.tokenOrPassword,
      data.date.getFullYear().toString(),
    ];
    emailRequest.lista_vars_email = [
      '[LOGO_URL]',
      '[ASUNTO_EMAIL]',
      '[USER_NOMBRES]',
      '[TOKEN_OR_PASSWORD]',
      '[FULL_YEAR]',
    ];

    // Crear la request para enviar el correo
    const request = new RequestService();

    request.service_url = this.AUTOMATIZACIONES_TIKEE_URL;
    // Importante asignar data = emailRequest
    request.data = emailRequest;

    // Enviar el correo electrónico
    const response = await this.httpService.requestService(request);

    if (response.code === 'COD_ERR') {
      throw new Error('Error al enviar el correo');
    }
  }

  async sendWelcomeEmail(data: RequestDto): Promise<void> {
    const emailRequest = new EmailRequest();

    emailRequest.idUser = data.id;
    emailRequest.process = EmailProcess.WELCOME_NOTIFICATION; // Usa el proceso correspondiente
    emailRequest.asunto = '¡Bienvenido a Dinero al Vuelo!';
    emailRequest.destinos = [data.email];
    emailRequest.plantilla = welcomeNotificationTemplate; // Usa la plantilla de bienvenida
    emailRequest.correo_envia = this.EMAIL_SENDER;
    emailRequest.lista_vals_email = [
      this.LOGO_URL,
      emailRequest.asunto,
      data.nombres.toUpperCase(),
      data.date.toLocaleString().toString(),
      data.date.getFullYear().toString(),
    ];
    emailRequest.lista_vars_email = [
      '[LOGO_URL]',
      '[ASUNTO_EMAIL]',
      '[USER_NOMBRES]',
      '[PROCESS_DATE]',
      '[FULL_YEAR]',
    ];

    const request = new RequestService();
    request.service_url = this.AUTOMATIZACIONES_TIKEE_URL;
    request.data = emailRequest;

    const response = await this.httpService.requestService(request);
    if (response.code === 'COD_ERR') {
      throw new Error('Error al enviar el correo');
    }
  }

  async sendPasswordRecovery(data: RequestDto): Promise<void> {
    const emailRequest = new EmailRequest();

    emailRequest.idUser = data.id;
    emailRequest.process = EmailProcess.SEND_PASSWORD_RECOVERY;
    emailRequest.asunto = 'Recuperación de Contraseña';
    emailRequest.destinos = [data.email];
    // Aquí traes tu plantilla que sea
    emailRequest.plantilla = recoveryPasswordTemplate;
    emailRequest.correo_envia = this.EMAIL_SENDER;
    // Importante, mismo orden, misma cantidad, mismos nombres que en la plantilla
    emailRequest.lista_vals_email = [
      this.LOGO_URL,
      emailRequest.asunto,
      data.nombres.toUpperCase(),
      data.tokenOrPassword,
      data.date.getFullYear().toString(),
    ];
    emailRequest.lista_vars_email = [
      '[LOGO_URL]',
      '[ASUNTO_EMAIL]',
      '[USER_NOMBRES]',
      '[TOKEN_OR_PASSWORD]',
      '[FULL_YEAR]',
    ];

    // Crear la request para enviar el correo
    const request = new RequestService();

    request.service_url = this.AUTOMATIZACIONES_TIKEE_URL;
    // Importante asignar data = emailRequest
    request.data = emailRequest;

    // Enviar el correo electrónico
    const response = await this.httpService.requestService(request);

    if (response.code === 'COD_ERR') {
      throw new Error('Error al enviar el correo');
    }
  }

  async sendPasswordChangeNotification(data: RequestDto): Promise<void> {
    const emailRequest = new EmailRequest();

    emailRequest.idUser = data.id;
    emailRequest.process = EmailProcess.CHANGE_PASSWORD_NOTIFICATION;
    emailRequest.asunto = 'Cambio de Contraseña';
    emailRequest.destinos = [data.email];
    // Aquí traes tu plantilla que sea
    emailRequest.plantilla = passwordChangeNotificationTemplate;
    emailRequest.correo_envia = this.EMAIL_SENDER;
    // Importante, mismo orden, misma cantidad, mismos nombres que en la plantilla
    emailRequest.lista_vals_email = [
      this.LOGO_URL,
      emailRequest.asunto,
      data.nombres.toUpperCase(),
      data.date.toLocaleString().toString(),
      data.ip,
      data.userAgent,
      data.date.getFullYear().toString(),
    ];
    emailRequest.lista_vars_email = [
      '[LOGO_URL]',
      '[ASUNTO_EMAIL]',
      '[USER_NOMBRES]',
      '[PROCESS_DATE]',
      '[IP_INFO]',
      '[DEVICE_INFO]',
      '[FULL_YEAR]',
    ];

    // Crear la request para enviar el correo
    const request = new RequestService();

    request.service_url = this.AUTOMATIZACIONES_TIKEE_URL;
    // Importante asignar data = emailRequest
    request.data = emailRequest;

    // Enviar el correo electrónico
    const response = await this.httpService.requestService(request);

    if (response.code === 'COD_ERR') {
      throw new Error('Error al enviar el correo');
    }
  }

  async sendAccountLockNotification(data: RequestDto): Promise<void> {
    const emailRequest = new EmailRequest();

    emailRequest.idUser = data.id;
    emailRequest.process = EmailProcess.SEND_LOCK_NOTIFICATION;
    emailRequest.asunto = 'Desbloqueo de Cuenta';
    emailRequest.destinos = [data.email];
    // Aquí traes tu plantilla que sea
    emailRequest.plantilla = accountLockNotificationTemplate;
    emailRequest.correo_envia = this.EMAIL_SENDER;
    // Importante, mismo orden, misma cantidad, mismos nombres que en la plantilla
    emailRequest.lista_vals_email = [
      this.LOGO_URL,
      emailRequest.asunto,
      data.nombres.toUpperCase(),
      data.date.toLocaleString().toString(),
      data.ip,
      data.userAgent,
      data.tokenOrPassword,
      data.date.getFullYear().toString(),
    ];
    emailRequest.lista_vars_email = [
      '[LOGO_URL]',
      '[ASUNTO_EMAIL]',
      '[USER_NOMBRES]',
      '[PROCESS_DATE]',
      '[IP_INFO]',
      '[DEVICE_INFO]',
      '[TOKEN_OR_PASSWORD]',
      '[FULL_YEAR]',
    ];

    // Crear la request para enviar el correo
    const request = new RequestService();

    request.service_url = this.AUTOMATIZACIONES_TIKEE_URL;
    // Importante asignar data = emailRequest
    request.data = emailRequest;

    // Enviar el correo electrónico
    const response = await this.httpService.requestService(request);

    if (response.code === 'COD_ERR') {
      throw new Error('Error al enviar el correo');
    }
  }

  async sendCreditApprovalNotification(data: RequestDto): Promise<void> {
    const emailRequest = new EmailRequest();

    emailRequest.idUser = data.id;
    emailRequest.process = EmailProcess.CREDIT_APPROVAL_NOTIFICATION;
    emailRequest.asunto = 'Aprobación de Crédito';
    emailRequest.destinos = [data.email];
    emailRequest.plantilla = creditApprovalNotificationTemplate;
    emailRequest.correo_envia = this.EMAIL_SENDER;
    emailRequest.lista_vals_email = [
      this.LOGO_URL,
      emailRequest.asunto,
      data.nombres.toUpperCase(),
      data.date.toLocaleString().toString(),
      data.ip,
      data.userAgent,
      data.date.getFullYear().toString(),
    ];
    emailRequest.lista_vars_email = [
      '[LOGO_URL]',
      '[ASUNTO_EMAIL]',
      '[USER_NOMBRES]',
      '[PROCESS_DATE]',
      '[IP_INFO]',
      '[DEVICE_INFO]',
      '[FULL_YEAR]',
    ];

    const request = new RequestService();
    request.service_url = this.AUTOMATIZACIONES_TIKEE_URL;
    request.data = emailRequest;

    const response = await this.httpService.requestService(request);
    if (response.code === 'COD_ERR') {
      throw new Error('Error al enviar el correo');
    }
  }

  async sendSessionActivityNotification(data: RequestDto): Promise<void> {
    const emailRequest = new EmailRequest();

    emailRequest.idUser = data.id;
    emailRequest.process = EmailProcess.SESSION_ACTIVITY_NOTIFICATION;
    emailRequest.asunto = 'Nueva Actividad de Sesión';
    emailRequest.destinos = [data.email];
    emailRequest.plantilla = sessionActivityNotificationTemplate;
    emailRequest.correo_envia = this.EMAIL_SENDER;
    emailRequest.lista_vals_email = [
      this.LOGO_URL,
      emailRequest.asunto,
      data.nombres.toUpperCase(),
      data.date.toLocaleString().toString(),
      data.ip,
      data.userAgent,
      data.date.getFullYear().toString(),
    ];
    emailRequest.lista_vars_email = [
      '[LOGO_URL]',
      '[ASUNTO_EMAIL]',
      '[USER_NOMBRES]',
      '[PROCESS_DATE]',
      '[IP_INFO]',
      '[DEVICE_INFO]',
      '[FULL_YEAR]',
    ];

    const request = new RequestService();
    request.service_url = this.AUTOMATIZACIONES_TIKEE_URL;
    request.data = emailRequest;

    const response = await this.httpService.requestService(request);
    if (response.code === 'COD_ERR') {
      throw new Error('Error al enviar el correo');
    }
  }

  async sendSuspiciousLoginAlert(data: RequestDto): Promise<void> {
    const emailRequest = new EmailRequest();

    emailRequest.idUser = data.id;
    emailRequest.process = EmailProcess.SUSPICIOUS_LOGIN_ALERT;
    emailRequest.asunto = 'Alerta de Seguridad - Actividad Sospechosa';
    emailRequest.destinos = [data.email];
    emailRequest.plantilla = suspiciousLoginAlertTemplate;
    emailRequest.correo_envia = this.EMAIL_SENDER;
    emailRequest.lista_vals_email = [
      this.LOGO_URL,
      emailRequest.asunto,
      data.nombres.toUpperCase(),
      data.date.toLocaleString().toString(),
      data.ip,
      data.userAgent,
      data.date.getFullYear().toString(),
    ];
    emailRequest.lista_vars_email = [
      '[LOGO_URL]',
      '[ASUNTO_EMAIL]',
      '[USER_NOMBRES]',
      '[PROCESS_DATE]',
      '[IP_INFO]',
      '[DEVICE_INFO]',
      '[FULL_YEAR]',
    ];

    const request = new RequestService();
    request.service_url = this.AUTOMATIZACIONES_TIKEE_URL;
    request.data = emailRequest;

    const response = await this.httpService.requestService(request);
    if (response.code === 'COD_ERR') {
      throw new Error('Error al enviar el correo');
    }
  }

  async sendUserRecoveryNotification(data: RequestDto): Promise<void> {
    const emailRequest = new EmailRequest();

    emailRequest.idUser = data.id;
    emailRequest.process = EmailProcess.USER_RECOVERY;
    emailRequest.asunto = 'Recuperación de Usuario';
    emailRequest.destinos = [data.email];
    emailRequest.plantilla = userRecoveryTemplate;
    emailRequest.correo_envia = this.EMAIL_SENDER;
    emailRequest.lista_vals_email = [
      this.LOGO_URL,
      emailRequest.asunto,
      data.nombres.toUpperCase(),
      data.email,
      data.date.getFullYear().toString(),
    ];
    emailRequest.lista_vars_email = [
      '[LOGO_URL]',
      '[ASUNTO_EMAIL]',
      '[USER_NOMBRES]',
      '[USER_EMAIL]',
      '[FULL_YEAR]',
    ];

    const request = new RequestService();
    request.service_url = this.AUTOMATIZACIONES_TIKEE_URL;
    request.data = emailRequest;

    const response = await this.httpService.requestService(request);
    if (response.code === 'COD_ERR') {
      throw new Error('Error al enviar el correo');
    }
  }

  async sendWelcomeNotification(data: RequestDto): Promise<void> {
    const emailRequest = new EmailRequest();

    emailRequest.idUser = data.id;
    emailRequest.process = EmailProcess.WELCOME_NOTIFICATION;
    emailRequest.asunto = '¡Bienvenido a Dinero al Vuelo!';
    emailRequest.destinos = [data.email];
    emailRequest.plantilla = welcomeNotificationTemplate;
    emailRequest.correo_envia = this.EMAIL_SENDER;
    emailRequest.lista_vals_email = [
      this.LOGO_URL,
      emailRequest.asunto,
      data.nombres.toUpperCase(),
      data.date.toLocaleString().toString(),
      data.date.getFullYear().toString(),
    ];
    emailRequest.lista_vars_email = [
      '[LOGO_URL]',
      '[ASUNTO_EMAIL]',
      '[USER_NOMBRES]',
      '[PROCESS_DATE]',
      '[FULL_YEAR]',
    ];

    const request = new RequestService();
    request.service_url = this.AUTOMATIZACIONES_TIKEE_URL;
    request.data = emailRequest;

    const response = await this.httpService.requestService(request);
    if (response.code === 'COD_ERR') {
      throw new Error('Error al enviar el correo');
    }
  }

  async sendProfileUpdateEmail(data: RequestDto): Promise<void> {
    // Implementa la lógica para enviar el correo de actualización de perfil
    const emailRequest = new EmailRequest();
    emailRequest.idUser = data.id;
    emailRequest.process = EmailProcess.PROFILE_UPDATE_NOTIFICATION;
    emailRequest.asunto = 'Actualización de Perfil';
    emailRequest.destinos = [data.email];
    emailRequest.plantilla = profileUpdateTemplate;
    emailRequest.correo_envia = this.EMAIL_SENDER;
    emailRequest.lista_vals_email = [
      this.LOGO_URL,
      emailRequest.asunto,
      data.nombres.toUpperCase(),
      data.date.toLocaleString().toString(),
      data.date.getFullYear().toString(),
    ];
    emailRequest.lista_vars_email = [
      '[LOGO_URL]',
      '[ASUNTO_EMAIL]',
      '[USER_NOMBRES]',
      '[PROCESS_DATE]',
      '[FULL_YEAR]',
    ];

    const request = new RequestService();
    request.service_url = this.AUTOMATIZACIONES_TIKEE_URL;
    request.data = emailRequest;

    const response = await this.httpService.requestService(request);
    if (response.code === 'COD_ERR') {
      throw new Error('Error al enviar el correo');
    }
  }

  async sendGoodbyeEmail(data: RequestDto): Promise<void> {
    // Implementa la lógica para enviar el correo de despedida
    const emailRequest = new EmailRequest();
    emailRequest.idUser = data.id;
    emailRequest.process = EmailProcess.GOODBYE_NOTIFICATION;
    emailRequest.asunto = '¡Gracias por usar Dinero al Vuelo!';
    emailRequest.destinos = [data.email];
    emailRequest.plantilla = goodbyeTemplate; 
    emailRequest.correo_envia = this.EMAIL_SENDER;
    emailRequest.lista_vals_email = [
      this.LOGO_URL,
      emailRequest.asunto,
      data.nombres.toUpperCase(),
      data.date.toLocaleString().toString(),
      data.date.getFullYear().toString(),
    ];
    emailRequest.lista_vars_email = [
      '[LOGO_URL]',
      '[ASUNTO_EMAIL]',
      '[USER_NOMBRES]',
      '[PROCESS_DATE]',
      '[FULL_YEAR]',
    ];

    const request = new RequestService();
    request.service_url = this.AUTOMATIZACIONES_TIKEE_URL;
    request.data = emailRequest;

    const response = await this.httpService.requestService(request);
    if (response.code === 'COD_ERR') {
      throw new Error('Error al enviar el correo');
    }
  }
}
