const HomePrefix = "/";

export const routesWebpage = {
  inicio: HomePrefix,
  login: "/login",
  registro: "/registro",
  registroVerify: "/registro/verify",
  recuperarPassword: "/recuperar-password",
  cambiarPassword: "/cambiar-password",
  verificarEmail: "/verificar-email",
  verificarEmailToken: "/verificar-email/:token",
  desbloquearCuenta: "/desbloquear-cuenta",
  desbloquearCuentaToken: "/desbloquear-cuenta/:token",
  creditos: "/creditos",
  creditoForm: "/creditos/solicitud",
  creditoResults: "/creditos/resultados",
  creditoDetails: "/creditos/detalles",
  creditoSuccess: "/creditos/confirmacion",
  blog: "/blog",
  blogPrestamosImpagos: "/blog/prestamos-impagos",
  blogMetasPresupuesto: "/blog/metas-presupuesto",
  blogFinanzasCreativas: "/blog/finanzas-creativas",
  blogFondosMutuos: "/blog/fondos-mutuos",
  blogBienesRaices: "/blog/bienes-raices",
  blogTarjetasCredito: "/blog/tarjetas-credito",
  blogPrestamosPersonales: "/blog/prestamos-personales",
  blogPagoCreditos: "/blog/pago-creditos",
  perfil: "/perfil",
  notFound: "/404",
  // Nuevas rutas para el sidebar
  configuracion: "/configuracion",
  contacto: "/contacto",
  acercaDe: "/acerca",
  // Rutas anidadas de configuración
  configuracionPerfil: "/configuracion/perfil",
  configuracionSeguridad: "/configuracion/seguridad",
  configuracionNotificaciones: "/configuracion/notificaciones",
  // Nuevas rutas para Preguntas Frecuentes y Quiénes Somos
  preguntasFrecuentes: "/preguntas-frecuentes",
  quienesSomos: "/quienes-somos",
} as const;

export const routePaths = Object.values(routesWebpage);
export type RoutesWebpage = typeof routesWebpage;

// Agrupaciones de rutas para facilitar su uso
export const publicRoutes = {
  inicio: routesWebpage.inicio,
  blog: routesWebpage.blog,
  contacto: routesWebpage.contacto,
  acercaDe: routesWebpage.acercaDe,
  preguntasFrecuentes: routesWebpage.preguntasFrecuentes,
  quienesSomos: routesWebpage.quienesSomos,
};

export const authRoutes = {
  login: routesWebpage.login,
  registro: routesWebpage.registro,
  recuperarPassword: routesWebpage.recuperarPassword,
};

export const privateRoutes = {
  perfil: routesWebpage.perfil,
  creditos: routesWebpage.creditos,
  configuracion: routesWebpage.configuracion,
};

export const blogRoutes = {
  prestamosImpagos: routesWebpage.blogPrestamosImpagos,
  metasPresupuesto: routesWebpage.blogMetasPresupuesto,
  finanzasCreativas: routesWebpage.blogFinanzasCreativas,
  fondosMutuos: routesWebpage.blogFondosMutuos,
  bienesRaices: routesWebpage.blogBienesRaices,
  tarjetasCredito: routesWebpage.blogTarjetasCredito,
  prestamosPersonales: routesWebpage.blogPrestamosPersonales,
  pagoCreditos: routesWebpage.blogPagoCreditos,
};

// Nuevas agrupaciones para secciones informativas
export const infoRoutes = {
  preguntasFrecuentes: routesWebpage.preguntasFrecuentes,
  quienesSomos: routesWebpage.quienesSomos,
};