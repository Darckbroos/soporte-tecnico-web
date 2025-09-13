export type Service = {
  slug: string;
  titulo: string;
  extracto: string;
  precioDesde: number;
  precioHasta: number;
  incluye: string[];
};

export const servicios: Service[] = [
  {
    slug: "mantencion-reparacion-computadoras",
    titulo: "Mantención y Reparación de computadoras",
    extracto:
      "Diagnóstico certero, limpieza interna y reinstalación/configuración cuando corresponde.",
    precioDesde: 20000,
    precioHasta: 70000,
    incluye: [
      "Diagnóstico de hardware y software",
      "Limpieza interna y cambio de pasta térmica",
      "Ajustes/instalación de sistema y drivers",
      "Pruebas finales e informe"
    ],
  },
  {
    slug: "soporte-tecnico-it",
    titulo: "Soporte Técnico Informático (IT)",
    extracto:
      "Asistencia remota o presencial. Configuración, solución de problemas y optimización.",
    precioDesde: 15000,
    precioHasta: 50000,
    incluye: [
      "Soporte remoto",
      "Instalación y configuración de software",
      "Resolución de fallas comunes",
      "Optimización de rendimiento"
    ],
  },
  {
    slug: "creacion-paginas-web",
    titulo: "Creación de páginas web",
    extracto:
      "Sitios modernos, rápidos y medibles con prácticas SEO on-page e integraciones esenciales.",
    precioDesde: 250000,
    precioHasta: 900000,
    incluye: [
      "Landing o sitio multipágina responsive",
      "Integración WhatsApp/Analytics/SEO básico",
      "Implementación y despliegue",
      "Soporte de publicación"
    ],
  },
];