export const validations = {
  validateName: (value: string) => {
    if (!/^[a-záéíóúüñA-ZÁÉÍÓÚÜÑ\s]*$/.test(value)) return 'Solo se permiten letras';
    if (value.length < 3) return 'Debe tener al menos 3 caracteres';
    if (/^\s|\s$/.test(value)) return 'No puede contener espacios al inicio o final';
    if (/\s{2,}/.test(value)) return 'No puede contener espacios múltiples';
    return '';
  },
 
  formatName: (value: string) => {
    return value
      .replace(/[^a-záéíóúüñA-ZÁÉÍÓÚÜÑ\s]/g, '')
      .replace(/\b\w/g, l => l.toUpperCase())
      .replace(/\s+/g, ' ')
      .trim();
  },
 
  validateCedula: (cedula: string) => /^\d{10}$/.test(cedula),
 
  validatePhone: (phone: string) => /^0[9]\d{8}$/.test(phone),
 
  validateEmail: (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },
 
  validatePasswordStrength: (password: string) => {
    const meetsMinLength = password.length >= 8;
    return {
      strength: meetsMinLength ? 3 : 0,
      messages: meetsMinLength ? '' : 'Debe tener al menos 8 caracteres',
    };
   },
 
  formatCedula: (value: string) => value.replace(/\D/g, '').slice(0, 10),
 
  formatPhone: (value: string) => {
    const cleaned = value.replace(/\D/g, '').slice(0, 10);
    return cleaned.length >= 2 && !cleaned.startsWith('09') ? '09' : cleaned;
  }
 };
 
 export const fieldHelpers = {
  nombres: "Ingrese sus nombres sin números ni caracteres especiales",
  apellidos: "Ingrese sus apellidos sin números ni caracteres especiales",
  cedula: "Ingrese un número de identificación de 10 dígitos",
  telefono: "Ingrese su número celular empezando con 09",
  email: "Ingrese un correo electrónico válido",
 };