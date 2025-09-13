import { Link } from "react-router-dom";
import { servicios } from "../data/services";

const CONTACT_PHONE_WA = import.meta.env.VITE_CONTACT_PHONE_WA || "56939291484";

function iconFor(slug: string) {
  if (slug.includes("mantencion")) return "🧰";
  if (slug.includes("soporte")) return "💻";
  if (slug.includes("web")) return "🌐";
  return "🛠️";
}

export default function ServicesIndex() {
  return (
    <main>
      {/* Hero / encabezado */}
      <section
        className="services-hero"
        style={{
          padding: "32px 0",
          background:
            "linear-gradient(135deg, rgba(2,132,199,.08), rgba(16,185,129,.08))",
          borderBottom: "1px solid #e2e8f0",
        }}
      >
        <div className="container">
          <h1 style={{ marginTop: 6 }}>Servicios</h1>
          <p className="muted" style={{ maxWidth: 820 }}>
            Elige el servicio que necesitas. Precios referenciales y descripción clara.
            Si tienes dudas, escríbenos y te ayudamos a elegir la mejor opción.
          </p>
          <div style={{ marginTop: 14, display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link to="/" className="btn btn-outline">Volver al inicio</Link>
            <a
              className="btn"
              style={{ background: "#0ea5e9" }}
              href={`https://wa.me/${CONTACT_PHONE_WA}`}
              target="_blank"
            >
              Consultar por WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Grid de servicios */}
      <section className="container" style={{ padding: "28px 0 36px" }}>
        <div className="grid-3">
          {servicios.map((s) => (
            <article key={s.slug} className="card service-card hover-up">
              <div className="service-icon">{iconFor(s.slug)}</div>
              <h3 className="service-title">{s.titulo}</h3>
              <p className="muted">{s.extracto}</p>

              <div className="chip" style={{ marginTop: 10 }}>
                CLP {s.precioDesde.toLocaleString()} – {s.precioHasta.toLocaleString()}
              </div>

              {/* Highlights rápidos */}
              <ul className="bullets">
                {s.incluye.slice(0, 2).map((i, idx) => (
                  <li key={idx}>{i}</li>
                ))}
              </ul>

              <div className="card-footer">
                <Link to={`/servicios/${s.slug}`} className="btn">Ver detalle</Link>
                <a className="btn btn-outline" href="/#contacto">Solicitar</a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}