import { Link } from "react-router-dom";
import { serviciosOrdenados } from "../data/services";

const CONTACT_PHONE_WA = import.meta.env.VITE_CONTACT_PHONE_WA || "56939291484";

function iconFor(slug: string) {
  if (slug.includes("mantencion")) return "🧰";
  if (slug.includes("soporte")) return "💻";
  if (slug.includes("web")) return "🌐";
  if (slug.includes("armado")) return "🛠️";
  return "🛠️";
}

// 👇 Planes de soporte (contenido nuevo)
const planesSoporte = [
  {
    nombre: "Básico",
    rango: "Según cantidad de equipos",
    bullets: [
      "1 visita mensual programada",
      "Chequeo de malware y limpieza",
      "Actualización de sistema y parches",
      "Verificación de backups",
      "Soporte remoto razonable en horario hábil",
    ],
  },
  {
    nombre: "Pro",
    rango: "Según cantidad de equipos",
    bullets: [
      "2 visitas mensuales programadas",
      "Limpieza y hardening (navegación/descargas seguras)",
      "Optimización de arranque y tareas",
      "Monitoreo básico y checklist preventivo",
      "Soporte remoto prioritario",
    ],
  },
  {
    nombre: "Full",
    rango: "Según cantidad de equipos",
    bullets: [
      "4 visitas mensuales programadas",
      "Políticas de respaldo y pruebas de restauración",
      "Gestión de licencias y antivirus premium",
      "Asesoría continua de mejoras",
      "Soporte remoto + on–call bajo acuerdo",
    ],
  },
];

export default function ServicesIndex() {
  const lista = serviciosOrdenados(); // por defecto excluye los ocultos


  return (
    <main>
      {/* Encabezado */}
      <section
        className="services-hero"
        style={{
          padding: "32px 0",
          background: "linear-gradient(135deg, rgba(2,132,199,.08), rgba(16,185,129,.08))",
          borderBottom: "1px solid #e2e8f0",
        }}
      >
        <div className="container">
          <div
            style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}
          >
            <h1 style={{ margin: 0 }}>Servicios</h1>
            
          </div>

          <p className="muted" style={{ maxWidth: 820, marginTop: 10 }}>
            Elige el servicio que necesitas. Precios referenciales y descripción clara.
            Si tienes dudas, escríbenos y te ayudamos a elegir la mejor opción.
          </p>

          <div style={{ marginTop: 14, display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link to="/" className="btn btn-outline">Volver al inicio</Link>
            <a className="btn" style={{ background: "#0ea5e9" }} href={`https://wa.me/${CONTACT_PHONE_WA}`} target="_blank" rel="noreferrer">
              Consultar por WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Grid de servicios */}
      <section id="lista" className="container" style={{ padding: "28px 0 16px" }}>
        <div className="grid-3">
          {lista.map((s) => (
            <article key={s.slug} className="card service-card hover-up">
              {s.cover && (
                <div className="service-cover-wrap">
                  <img
                    src={s.cover || "/img/servicios/placeholder.jpg"}
                    alt={s.titulo}
                    className="service-thumb service-thumb--lg"   // 👈 un poco más alta en /servicios
                    loading="lazy"
                  />
                </div>
              )}
              <h3 className="service-title">{s.titulo}</h3>
              <p className="muted">{s.extracto}</p>

              <div className="chip" style={{ marginTop: 10 }}>
                CLP {s.precioDesde.toLocaleString()} – {s.precioHasta.toLocaleString()}
              </div>

              <ul className="bullets">
                {s.incluye.slice(0, 2).map((i, idx) => <li key={idx}>{i}</li>)}
              </ul>

              <div className="card-footer">
                <Link to={`/servicios/${s.slug}`} className="btn">Ver detalle</Link>
                <Link className="btn btn-outline" to="/contacto">Solicitar</Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 👇 NUEVA SECCIÓN: Planes de soporte */}
      <section className="container" style={{ padding: "8px 0 48px" }}>
        <div
          className="card"
          style={{
            display: "grid",
            gap: 18,
            gridTemplateColumns: "1.2fr 1fr",
            alignItems: "center",
          }}
        >
          <div>
            <h2 style={{ marginTop: 0 }}>Planes de soporte</h2>
            <p className="muted" style={{ marginBottom: 10 }}>
              Mantención preventiva con visitas programadas, revisión de malware,
              aplicación de parches, verificación de respaldos y soporte remoto.
              El valor depende de la cantidad de equipos y del alcance acordado.
              Los precios unitarios referenciales están en esta misma sección de servicios.
            </p>

            <ul className="bullets">
              <li>1, 2 o 4 visitas mensuales programadas.</li>
              <li>Chequeo de malware, hardening y actualizaciones.</li>
              <li>Backups y pruebas periódicas de restauración.</li>
              <li>Soporte remoto prioritario y seguimiento.</li>
            </ul>

            <div style={{ marginTop: 12 }}>
              <Link to="/planes" className="btn" style={{ background: "#0ea5e9" }}>
                Ver planes →
              </Link>
            </div>
          </div>

          {/* Columna derecha opcional (solo decoración rápida) */}
          <div
            className="card"
            style={{
              borderStyle: "dashed",
              textAlign: "center",
              background:
                "linear-gradient(135deg, rgba(2,132,199,.06), rgba(16,185,129,.06))",
            }}
          >
            <p className="muted" style={{ margin: 0 }}>
              Básico • Pro • Full
            </p>
            <p style={{ margin: "6px 0 0", fontWeight: 600 }}>
              Diseñados para hogares, profesionales y PYMEs
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}