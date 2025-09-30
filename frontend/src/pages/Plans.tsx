// src/components/SupportPlans.tsx
import { Link } from "react-router-dom";

const PLANES = [
  {
    slug: "basico",
    titulo: "Básico",
    resumen: "Según cantidad de equipos",
    icono: "🛡️",
    bullets: [
      "1 visita mensual programada",
      "Chequeo de malware y limpieza",
      "Actualización de sistema y parches",
      "Verificación de backups",
      "Soporte remoto razonable en horario hábil",
    ],
  },
  {
    slug: "pro",
    titulo: "Pro",
    resumen: "Según cantidad de equipos",
    icono: "🚀",
    bullets: [
      "2 visitas mensuales programadas",
      "Limpieza y hardening (descargas/navegación seguras)",
      "Optimización de arranque y tareas",
      "Monitoreo básico + checklist preventivo",
      "Soporte remoto prioritario",
    ],
  },
  {
    slug: "full",
    titulo: "Full",
    resumen: "Según cantidad de equipos",
    icono: "🏢",
    bullets: [
      "4 visitas mensuales programadas",
      "Políticas de respaldo + pruebas de restauración",
      "Gestión de licencias y antivirus premium",
      "Asesoría continua de mejoras",
      "Soporte remoto + on-call (bajo acuerdo)",
    ],
  },
];

export default function SupportPlans() {
  return (
    <section id="planes" className="container pricing">
      <div className="pricing-head">
        <h2>Planes de soporte</h2>
        <p className="muted">
          Mantenimiento preventivo con visitas programadas, revisión de malware, aplicación
          de parches, verificación de backups y soporte remoto. El valor depende de la
          cantidad de equipos y el alcance acordado (los precios unitarios referenciales
          están en la sección <Link to="/servicios">Servicios</Link>).
        </p>
      </div>

      <div className="price-grid">
        {PLANES.map((p) => (
          <article key={p.slug} className="price-card hover-up">
            <div className="price-badge">{p.icono}</div>
            <h3 className="price-title">{p.titulo}</h3>
            <div className="price-sub"> {p.resumen} </div>

            <ul className="price-features">
              {p.bullets.map((b, i) => <li key={i}>{b}</li>)}
            </ul>

            <div className="price-actions">
              <Link className="btn" to="/contacto" state={{ plan: p.slug }}>
                Contactarnos
              </Link>

              {/* Botón preparado para integrar pago más adelante */}
              <button
                className="btn btn-outline soon"
                type="button"
                disabled
                title="Pronto habilitaremos pago online"
                aria-disabled="true"
              >
                Pagar online (pronto)
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
