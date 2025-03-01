export const institutionsData = {
  instituciones: [
    {
      id: "pichincha",
      name: "Banco Pichincha",
      type: "bank",
      logo: "https://www.ret.ec/wp-content/uploads/2022/05/Banco-Pichincha.jpg",
      minRate: 14.0,
      maxRate: 17.5,
      products: {
        personalLoan: {
          minAmount: 1000,
          maxAmount: 50000,
          minTerm: 6,
          maxTerm: 60,
          minIncome: 500,
          maxIncome: 10000,
          requirements: [
            "Documento de identidad",
            "Roles de pago",
            "Factura Servicios Básicos"
          ],
          features: [
            "Aprobación en 24 horas",
            "Sin garante hasta $10.000",
            "Seguro de desgravamen incluido"
          ],
          description: "¡Obtén aquí tu Préstamo Banco Pichincha 100% online! Rápido, fácil y seguro.",
          locations: ["quito", "guayaquil", "loja", "cuenca", "esmeraldas"]
        }
      }
    },
    {
      id: "pacifico",
      name: "Banco del Pacífico",
      type: "bank",
      logo: "https://www.clave.com.ec/wp-content/uploads/2021/07/banco-pacifico.png",
      minRate: 13.5,
      maxRate: 16.5,
      products: {
        personalLoan: {
          minAmount: 1000,
          maxAmount: 45000,
          minTerm: 6,
          maxTerm: 48,
          minIncome: 500,
          maxIncome: 10000,
          requirements: [
            "Documento de identidad",
            "Roles de pago",
            "Factura Servicios Básicos"
          ],
          features: [
            "Tasa preferencial para clientes",
            "Débito automático",
            "Período de gracia de 60 días"
          ],
          description: "Préstamo personal con las mejores tasas del mercado y beneficios exclusivos.",
          locations: ["guayaquil", "quito", "cuenca", "loja"]
        }
      }
    },
    {
      id: "produbanco",
      name: "Produbanco",
      type: "bank",
      logo: "https://ccq.ec/wp-content/uploads/2018/12/Produbanco-1.jpg-1024x282.jpeg",
      minRate: 14.25,
      maxRate: 16.9,
      products: {
        personalLoan: {
          minAmount: 1000,
          maxAmount: 40000,
          minTerm: 6,
          maxTerm: 54,
          minIncome: 500,
          maxIncome: 10000,
          requirements: [
            "Documento de identidad",
            "Roles de pago",
            "Factura Servicios Básicos"
          ],
          features: [
            "Aprobación en 48 horas",
            "Cuotas fijas mensuales",
            "Seguros opcionales"
          ],
          description: "Crédito personal flexible adaptado a tus necesidades con Produbanco.",
          locations: ["quito", "guayaquil", "cuenca", "loja"]
        }
      }
    },
    {
      id: "29octubre",
      name: "Cooperativa 29 de Octubre",
      type: "cooperative",
      logo: "https://emprendimiento.ec/wp-content/uploads/Financiamiento/emprendimiento-ecuador-financiamiento-emprendedores-cooperativa-29-octubre-1024x683.jpg",
      minRate: 15.5,
      maxRate: 18.5,
      products: {
        personalLoan: {
          minAmount: 1000,  // Confirmado para montos desde 1000
          maxAmount: 25000,
          minTerm: 6,
          maxTerm: 48,
          minIncome: 500,
          maxIncome: 10000,
          requirements: [
            "Documento de identidad",
            "Roles de pago",
            "Factura Servicios Básicos"
          ],
          features: [
            "Sin encaje",
            "Crédito pre-aprobado para socios",
            "Atención personalizada"
          ],
          description: "Cooperativa comprometida con el desarrollo de sus socios.",
          locations: ["quito", "guayaquil", "loja", "esmeraldas"]
        }
      }
    },
    {
      id: "jep",
      name: "Cooperativa JEP",
      type: "cooperative",
      logo: "https://play-lh.googleusercontent.com/1rk_Nw5REpMle46jLJzwKWgR9bGYXmiNH1qien0ZqJrYm5UOK8GbwtIlgMNovup13j8=w240-h480",
      minRate: 15.9,
      maxRate: 19.0,
      products: {
        personalLoan: {
          minAmount: 1000,  // Confirmado para montos desde 1000
          maxAmount: 30000,
          minTerm: 6,
          maxTerm: 60,
          minIncome: 500,
          maxIncome: 10000,
          requirements: [
            "Documento de identidad",
            "Roles de pago",
            "Factura Servicios Básicos"
          ],
          features: [
            "Crédito inmediato",
            "Sin garante hasta $5.000",
            "Beneficios adicionales para socios"
          ],
          description: "La cooperativa más grande del país con los mejores beneficios para ti.",
          locations: ["cuenca", "loja", "guayaquil"] 
        }
      }
    },
    {
      id: "guayaquil",
      name: "Banco de Guayaquil",
      type: "bank",
      logo: "https://ccelrecreo.com/wp-content/uploads/2024/07/Banco-de-Guayaquil-El-Recreo.png",
      minRate: 14.5,
      maxRate: 17.0,
      products: {
        personalLoan: {
          minAmount: 1000,
          maxAmount: 35000,
          minTerm: 6,
          maxTerm: 48,
          minIncome: 500,
          maxIncome: 10000,
          requirements: [
            "Documento de identidad",
            "Roles de pago",
            "Factura Servicios Básicos"
          ],
          features: [
            "Aprobación en línea",
            "Tasa preferencial",
            "Seguro de desempleo opcional"
          ],
          description: "Préstamos personales con la mejor tasa del mercado en Banco Guayaquil.",
          locations: ["guayaquil", "quito", "cuenca"]
        }
      }
    }
  ]
};