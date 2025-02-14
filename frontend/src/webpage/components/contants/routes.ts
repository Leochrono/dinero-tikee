const HomePrefix = '/';

export const routesWebpage = {
  inicio: HomePrefix,
  login: '/login',
  registro: '/registro',
  registroVerify: '/registro/verify',
  recuperarPassword: '/recuperar-password',
  cambiarPassword: '/cambiar-password',
  verificarEmail: '/verificar-email',
  verificarEmailToken: '/verificar-email/:token',
  desbloquearCuenta: '/desbloquear-cuenta',
  desbloquearCuentaToken: '/desbloquear-cuenta/:token',
  creditos: '/creditos',
  creditoForm: '/creditos/solicitud',
  creditoResults: '/creditos/resultados',
  creditoDetails: '/creditos/detalles',
  creditoSuccess: '/creditos/confirmacion',
  blog: '/blog',
  blogPrestamosImpagos: '/blog/prestamos-impagos',
  blogMetasPresupuesto: '/blog/metas-presupuesto',
  blogFinanzasCreativas: '/blog/finanzas-creativas',
  blogFondosMutuos: '/blog/fondos-mutuos',
  blogBienesRaices: '/blog/bienes-raices',
  blogTarjetasCredito: '/blog/tarjetas-credito',
  blogPrestamosPersonales: '/blog/prestamos-personales',
  blogPagoCreditos: '/blog/pago-creditos',
  perfil: '/perfil',
  notFound: '/404'
} as const;

export const routePaths = Object.values(routesWebpage);
export type RoutesWebpage = typeof routesWebpage;