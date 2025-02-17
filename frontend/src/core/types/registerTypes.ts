export interface RegisterFormData {
  nombres: string;
  apellidos: string;
  cedula: string;
  email: string;
  telefono: string;
  direccion: string;
  password: string;
  confirmPassword: string;
}

export interface FormErrors {
  nombres?: string;
  apellidos?: string;
  cedula?: string;
  email?: string;
  telefono?: string;
  direccion?: string;
  password?: string;
  confirmPassword?: string;
}
