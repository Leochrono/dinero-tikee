export interface RequestDto {
    id: string;
    nombres: string;
    email: string;
    tokenOrPassword?: string;
    date: Date;
    ip?: string;
    userAgent?: string;
    // Campos adicionales para diferentes tipos de correos
    creditAmount?: number;
    creditTerm?: number;
    institutionName?: string;
    documentType?: string;
    securityInfo?: {
        location?: string;
        device?: string;
        browser?: string;
    };
}

// ESTE ES EL DE TIKEE
export abstract class MailerRepository {
    abstract sendVerifyEmail(data: RequestDto): Promise<void>;
    abstract sendPasswordRecovery(data: RequestDto): Promise<void>;
    abstract sendPasswordChangeNotification(data: RequestDto): Promise<void>;
    abstract sendAccountLockNotification(data: RequestDto): Promise<void>;
    abstract sendCreditApprovalNotification(data: RequestDto): Promise<void>;
    abstract sendSessionActivityNotification(data: RequestDto): Promise<void>;
    abstract sendSuspiciousLoginAlert(data: RequestDto): Promise<void>;
    abstract sendUserRecoveryNotification(data: RequestDto): Promise<void>;
    abstract sendWelcomeNotification(data: RequestDto): Promise<void>;
  
    // Agrega los nuevos métodos aquí
    abstract sendWelcomeEmail(data: RequestDto): Promise<void>;
    abstract sendProfileUpdateEmail(data: RequestDto): Promise<void>;
    abstract sendGoodbyeEmail(data: RequestDto): Promise<void>;
  }