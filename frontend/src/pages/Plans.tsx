// src/components/SupportPlans.tsx
import { Link } from "react-router-dom";

const PLANES = [
  {
    slug: "basico",
    titulo: "Básico",
    resumen: "1-5 equipos",
    icono: "🥉",
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
    resumen: "6-15 equipos",
    icono: "🥈",
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
    resumen: "16+ equipos",
    icono: "🥇",
    bullets: [
      "4 visitas mensuales programadas",
      "Políticas de respaldo + pruebas de restauración",
      "Gestión de licencias y antivirus premium",
      "Asesoría continua de mejoras",
      "Soporte remoto + on-call (bajo acuerdo)",
    ],
  },
];

const API_URL = import.meta.env.VITE_API_URL || "/api";

export default function SupportPlans() {
  async function handlePayment(plan: typeof PLANES[0]) {
    try {
      const response = await fetch(`${API_URL}/webpay/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          planId: plan.slug, 
          amount: 1000 // TODO: Cambiar por el precio real del plan
        }),
      });

      if (!response.ok) {
        throw new Error("Error al iniciar el pago");
      }

      const data = await response.json();

      if (data.url && data.token) {
        // Redirigir al usuario a la URL de Webpay
        window.location.href = `${data.url}?token_ws=${data.token}`;
      } else {
        throw new Error("Respuesta inválida del servidor");
      }
    } catch (error) {
      console.error("Error en el proceso de pago:", error);
      alert("No se pudo iniciar el proceso de pago. Por favor, intenta de nuevo.");
    }
  }

  return (
    <section id="planes" className="container pricing plans-section">
      <div className="pricing-head">
        <h2>Planes de Soporte a tu Medida</h2>
        <p className="muted">
          Mantén tus sistemas funcionando sin interrupciones. Ofrecemos planes flexibles que se adaptan a las necesidades de tu hogar, pyme o empresa.
        </p>
      </div>

      <div className="price-grid">
        {PLANES.map((p) => (
          <article key={p.slug} className={`price-card hover-up price-card--${p.slug} ${p.slug === 'pro' ? 'highlight' : ''}`}>
            <div className="price-badge-wrapper">
                <div className="price-badge">{p.icono}</div>
            </div>
            <h3 className="price-title">{p.titulo}</h3>
            <div className="price-sub"> {p.resumen} </div>

            <div className="price-features">
              {p.bullets.map((b, i) => <p key={i}>{b}</p>)}
            </div>

            <div className="price-actions">
              <Link className="btn" to="/contacto" state={{ plan: p.slug }}>
                Contactarnos
              </Link>

              <button
                className="btn btn-outline"
                type="button"
                onClick={() => handlePayment(p)}
              >
                Pagar online
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
