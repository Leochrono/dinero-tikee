import { CreditFormData, FormErrors } from "./types";

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateDocument = (document: string): boolean => {
  if (!/^\d{10}$/.test(document)) return false;

  const provincia = parseInt(document.substring(0, 2));
  if (provincia < 1 || provincia > 24) return false;

  const tercerDigito = parseInt(document.charAt(2));
  if (tercerDigito > 6) return false;

  const coeficientes = [2, 1, 2, 1, 2, 1, 2, 1, 2];
  let suma = 0;

  for (let i = 0; i < 9; i++) {
    let valor = parseInt(document.charAt(i)) * coeficientes[i];
    if (valor > 9) valor -= 9;
    suma += valor;
  }

  let total = Math.ceil(suma / 10) * 10;
  let digitoVerificador = total - suma;
  if (digitoVerificador === 10) digitoVerificador = 0;

  return digitoVerificador === parseInt(document.charAt(9));
};

export const getFormErrors = (formData: CreditFormData): FormErrors => {
  const errors: FormErrors = {};

  if (!formData.location) {
    errors.location = "Por favor seleccione una ciudad";
  }

  if (!formData.document) {
    errors.document = "La cédula es requerida";
  } else if (!validateDocument(formData.document)) {
    errors.document = "La cédula ingresada no es válida";
  }

  if (!formData.email) {
    errors.email = "El email es requerido";
  } else if (!validateEmail(formData.email)) {
    errors.email = "Por favor ingrese un email válido";
  }

  if (formData.amount < 1000) {
    errors.amount = "El monto mínimo es $1.000";
  } else if (formData.amount > 30000) {
    errors.amount = "El monto máximo es $30.000";
  }

  if (formData.income < 500) {
    errors.income = "Los ingresos mínimos deben ser $500";
  }

  if (!formData.termsAccepted) {
    errors.termsAccepted = "Debes aceptar los términos y condiciones";
  }

  return errors;
};
