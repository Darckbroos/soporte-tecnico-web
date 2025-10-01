// src/data/services.ts

export type Plan = { nombre: string; rango: string; resumen?: string };
export type Kit = { nombre: string; rango: string; descripcion?: string };
export type Faq = { q: string; a: string };

// Detalle de trabajos dentro de un servicio con rango de precios
export type SubService = {
  nombre: string;
  desde?: number;
  hasta?: number;
  descripcion?: string;
};

export type Service = {
  slug: string;
  titulo: string;
  extracto: string;
  precioDesde: number;
  precioHasta: number;
  incluye: string[];

  // ---- ya tenías ----
  icono?: string;
  planes?: Plan[];
  extras?: string[];

  // ---- NUEVO (opcionales) ----
  hero?: string;            // imagen principal
  galeria?: string[];       // mini galería
  beneficios?: string[];    // bullets
  subservicios?: SubService[];
  notaPrecios?: string;     // disclaimer
  orden?: number; // 👈 NUEVO
  cover?: string;


  oculto?: boolean;   
};

export const servicios: Service[] = [
  // Mantención / reparación — AHORA con extras de contenido
  {
    slug: "mantencion-reparacion-computadoras",
    orden: 1,
    titulo: "Mantención y Reparación de computadoras",
    oculto: false,
    extracto:
      "Diagnóstico certero, limpieza interna y reinstalación/configuración cuando corresponde.",
    precioDesde: 20000,
    precioHasta: 40000,
    incluye: [
      "Diagnóstico de hardware y software",
      "Limpieza interna y cambio de pasta térmica",
      "Ajustes/instalación de sistema y drivers",
      "Pruebas finales e informe",
    ],
    cover: "/img/servicios/Mantenimiento1.png",

    galeria: [
      "/img/servicios/limpieza2.png",
      "/img/servicios/Limpieza1.png",
      "/img/servicios/Limpieza.jpg",
    ],
    beneficios: [
      "Entrega el mismo día en trabajos de mantención (según agenda).",
      "Garantía de 30 días en mano de obra.",
      "Repuestos originales o de calidad equivalente (según stock).",
      "Asesoría honesta para prolongar la vida útil del equipo.",
    ],
    subservicios: [
      {
        nombre: "Diagnóstico (desarme y pruebas)",
        desde: 8000,
        descripcion: "Se descuenta si realizas la reparación con nosotros.",
      },
      {
        nombre: "Limpieza interna + cambio de pasta térmica",
        desde: 25000,
      },
      {
        nombre: "Formateo / instalación de sistema y drivers",
        desde: 30000,
      },
      {
        nombre: "Reparación de hardware (mano de obra)",
        desde: 35000,
        descripcion: "Repuestos se cotizan aparte según marca/modelo.",
      },
      {
        nombre: "Armado / orden de cables",
        desde: 25000,
      },
      {
        nombre: "Respaldo y recuperación básica",
        desde: 20000,
      },
    ],
    notaPrecios:
      "Precios referenciales por mano de obra. Los repuestos se cotizan aparte según stock y marca del equipo.",
  },

  // Soporte IT (sin cambios funcionales)
  {
    slug: "soporte-tecnico-it",
    orden: 2,
    titulo: "Soporte Técnico Informático (IT)",
    oculto: false,
    extracto:
      "Asistencia remota o presencial. Configuración, solución de problemas y optimización.",
    precioDesde: 15000,
    precioHasta: 40000,
    incluye: [
      "Soporte remoto",
      "Instalación y configuración de software",
      "Resolución de fallas comunes",
      "Optimización de rendimiento",
    ],
    cover: "/img/servicios/Soporteti.png",
    galeria: [
      "/img/servicios/SoporteTi3.png",
      "/img/servicios/SoporteTi2.png",
      "/img/servicios/SoporteTi4.png",
    ],
    beneficios: [
      "Atención remota en minutos (según agenda).",
      "Seguimiento por 7 días para el mismo incidente.",
      "Explicaciones claras y registro de cambios.",
      "Buenas prácticas para prevenir reincidencias.",
    ],
    subservicios: [
      {
        nombre: "Soporte remoto / diagnóstico inicial",
        desde: 20000,
        descripcion: "Se descuenta si continúas con la solución.",
      },
      {
        nombre: "Eliminación de virus/malware + hardening",
        desde: 30000,
      },
      {
        nombre: "Optimización de sistema y arranque",
        desde: 20000,
      },
      {
        nombre: "Instalación de programas/licencias (cliente)",
        desde: 15000,
        descripcion: "Office, antivirus, impresoras, drivers, etc.",
      },
      {
        nombre: "Configuración impresora / escáner / Wi-Fi",
        desde: 25000,
      },
      {
        nombre: "Correo corporativo / clientes mail",
        desde: 30000,
        descripcion: "Outlook, Thunderbird, IMAP/POP/Exchange.",
      },
      {
        nombre: "Respaldo y migración de datos",
        desde: 35000,
      },
      {
        nombre: "Reinstalación de Windows (sin formatear datos)",
        desde: 30000,
        descripcion: "Conservando datos personales cuando sea posible.",
      },
    ],
    notaPrecios:
      "Valores por mano de obra. Visita a domicilio dentro de Santiago (anillo Vespucio): +CLP 10.000. Fuera del anillo o urgencias fuera de horario: a convenir.",
    planes: [
      {
        nombre: "Bolsa Remota 3h",
        rango: "CLP 45.000",
        resumen: "Fraccionable en bloques de 15 minutos durante 60 días.",
      },
      {
        nombre: "PYME Básico",
        rango: "CLP 120.000 / mes",
        resumen:
          "4h presenciales al mes + soporte remoto razonable en horario hábil.",
      },
      {
        nombre: "PYME Pro",
        rango: "CLP 260.000 / mes",
        resumen:
          "10h mixtas (remoto/presencial) + checklist preventivo y monitoreo básico.",
      },
    ],
  },

  // Web (sin cambios funcionales)
  {
    slug: "creacion-paginas-web",
    orden: 4,
    titulo: "Creación de páginas web",
    oculto: true,
    extracto:
      "Sitios modernos, rápidos y medibles con prácticas SEO on-page e integraciones esenciales.",
    // Rango general del servicio (muestra en la card de /servicios)
    precioDesde: 250000,
    precioHasta: 1800000,

    incluye: [
      "Diseño responsive (móvil/desktop)",
      "SEO on-page básico y Analytics/Tag Manager",
      "Integración WhatsApp/formulario de contacto",
      "Implementación y despliegue",
      "Capacitación breve para editar contenidos",
      "30 días de soporte post-lanzamiento",
    ],
    cover: "/img/servicios/Programacion.png",

    galeria: [
      "/img/servicios/Paginaweb.png",
      "/img/servicios/Paginaweb2.png",
      "/img/servicios/Paginasweb2.png",
    ],
    beneficios: [
      "Carga rápida (Lighthouse 90+ cuando el hosting lo permite)",
      "Arquitectura pensada para posicionar mejor (SEO on-page)",
      "Editor visual/CMS para autogestión de contenidos",
      "Buenas prácticas de accesibilidad y seguridad",
      "Despliegue versionado y respaldo del proyecto",
    ],
    subservicios: [
      {
        nombre: "Landing page (1 sección)",
        desde: 250000,
        hasta: 400000,
        descripcion: "Ideal para campañas o presentación de servicios. 1 formulario + WhatsApp + Analytics.",
      },
      {
        nombre: "Sitio multipágina (4–10 secciones)",
        desde: 450000,
        hasta: 900000,
        descripcion: "Home, servicios, portafolio/blog básico y contacto. SEO on-page y medición.",
      },
      {
        nombre: "E-commerce básico",
        desde: 900000,
        hasta: 1800000,
        descripcion: "Catálogo, carrito, pasarela de pago, envíos y estados de pedido. Capacitación incluida.",
      },
      {
        nombre: "Optimización de performance/SEO on-page",
        desde: 150000,
        hasta: 350000,
        descripcion: "Mejoras Core Web Vitals, metadatos, schema y caching.",
      },
      {
        nombre: "Migración de hosting y correos",
        desde: 80000,
        hasta: 180000,
        descripcion: "Traslado de sitio, DNS, SSL y correos (según proveedor).",
      },
      {
        nombre: "Integraciones adicionales",
        desde: 80000,
        hasta: 200000,
        descripcion: "Chat, agenda, CRM, blog, pixel Meta/Google Ads, Zapier/Make, etc.",
      },
    ],
    notaPrecios:
      "Valores por proyecto. No incluyen IVA ni costos de terceros (dominio, hosting, pasarela de pago, licencias premium). El alcance exacto se define en la propuesta.",

    // Planes/boletas de mantención/hosting
    planes: [
      {
        nombre: "Hosting + Mantención Básico",
        rango: "CLP 45.000 / mes",
        resumen: "Hosting compartido, certificados SSL, monitoreo básico, 1 hora de soporte/mes.",
      },
      {
        nombre: "Mantención Pro",
        rango: "CLP 90.000 / mes",
        resumen: "2 horas soporte/mes, mejoras menores, hardening y respaldos programados.",
      },
      {
        nombre: "E-commerce Care",
        rango: "CLP 160.000 / mes",
        resumen: "4 horas soporte/mes, apoyo en promociones, monitoreo y optimizaciones periódicas.",
      },
    ],

  },

  // ✅ Armado de PC (el que mencionaste) — intacto
  {
    slug: "armado-pc",
    orden: 3,
    titulo: "Arma tu PC con nosotros",
    oculto: false,
    extracto:
      "Te ayudamos a elegir componentes según tu presupuesto, la armamos, probamos y te la entregamos lista para usar.",
    // mano de obra
    precioDesde: 15000,
    precioHasta: 40000,
    incluye: [
      "Asesoría de compra según uso y presupuesto (cotización comparada)",
      "Armado profesional y gestión de cables",
      "Instalación de Windows y drivers (licencia del cliente)",
      "Pruebas de estrés (CPU/GPU/RAM) y reporte de temperaturas",
      "30 días de soporte remoto / 1 año de garantía de mano de obra",
    ],
    cover: "/img/servicios/Armapc.png",

    galeria: [
      "/img/servicios/Armadopc1.png",
      "/img/servicios/Armadopc2.png",
      "/img/servicios/Armadopc3.png",
    ],
    beneficios: [
      "Cable management prolijo y flujo de aire optimizado",
      "Actualización de BIOS/firmware cuando corresponde",
      "Entrega con reporte de temperaturas y benchmarks básicos",
      "Soporte para reutilizar piezas (previo test de salud)",
    ],
    subservicios: [
      {
        nombre: "Armado estándar (ATX/mATX/ITX) — mano de obra",
        desde: 35000,
        descripcion: "Montaje completo, orden básico de cables y verificación eléctrica.",
      },
      {
        nombre: "Gestión avanzada de cables (cable management)",
        desde: 15000,
        descripcion: "Enrutado, bridas/velcro, estética y flujo de aire.",
      },
      {
        nombre: "Instalación de Windows + drivers",
        desde: 20000,
        descripcion: "Con licencia provista por el cliente.",
      },
      {
        nombre: "Actualización de BIOS",
        desde: 12000,
      },
      {
        nombre: "Montaje de refrigeración líquida AIO / cooler premium",
        desde: 18000,
      },
      {
        nombre: "Armado en sitio / despacho en Santiago (opcional)",
        desde: 25000,
        descripcion: "Según comuna y disponibilidad.",
      },
      {
        nombre: "Pruebas de estrés (CPU/GPU/RAM) + reporte",
        desde: 0,
        descripcion: "Incluido cuando realizamos el armado e instalación.",
      },
    ],
    
    
    notaPrecios:
      "Valores por mano de obra. Los componentes se cotizan aparte según stock/marcas preferidas.",
    icono: "🧰",
    planes: [
      {
        nombre: "Oficina / Estudio",
        rango: "CLP 300.000 – 450.000",
        resumen: "Word/Excel, clases online, navegación fluida.",
      },
      {
        nombre: "Gamer 1080p",
        rango: "CLP 500.000 – 850.000",
        resumen: "Juegos competitivos 1080p + streaming básico.",
      },
      {
        nombre: "Gamer 1440p",
        rango: "CLP 900.000 – 1.600.000",
        resumen: "Gráficos altos/ultra en 1440p.",
      },
      {
        nombre: "Workstation",
        rango: "CLP 1.200.000 – 3.000.000",
        resumen: "Edición de video, modelado 3D, IA, CAD.",
      },
    ],
    
  },
];
export function serviciosOrdenados(opts: { incluirOcultos?: boolean } = {}) {
  const { incluirOcultos = false } = opts;
  return [...servicios]
    .filter(s => incluirOcultos || !s.oculto)  // 👈 filtra ocultos
    .map((s, i) => ({ s, i }))
    .sort((a, b) => (a.s.orden ?? 999) - (b.s.orden ?? 999) || a.i - b.i)
    .map(x => x.s);
}