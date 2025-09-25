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

export default function ServicesIndex() {
  // Orden por 'orden' si existe
  const lista = serviciosOrdenados(); // 

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
          {/* fila: título + botón a la derecha */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 16,
              flexWrap: "wrap",
            }}
          >
            <h1 style={{ margin: 0 }}>Servicios</h1>

            {/* botón que baja a la grilla */}
            <a href="#lista" className="btn" style={{ background: "#0ea5e9", whiteSpace: "nowrap" }}>
              ¿Qué servicios ofrecemos? →
            </a>
          </div>

          <p className="muted" style={{ maxWidth: 820, marginTop: 10 }}>
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
              rel="noreferrer"
            >
              Consultar por WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Grid de servicios */}
      <section id="lista" className="container" style={{ padding: "28px 0 36px" }}>
        <div className="grid-3">
          {lista.map((s) => (
            <article key={s.slug} className="card service-card hover-up">
              <div className="service-icon">{iconFor(s.slug)}</div>
              <h3 className="service-title">{s.titulo}</h3>
              <p className="muted">{s.extracto}</p>

              <div className="chip" style={{ marginTop: 10 }}>
                CLP {s.precioDesde.toLocaleString()} – {s.precioHasta.toLocaleString()}
              </div>

              <ul className="bullets">
                {s.incluye.slice(0, 2).map((i, idx) => (
                  <li key={idx}>{i}</li>
                ))}
              </ul>

              <div className="card-footer">
                <Link to={`/servicios/${s.slug}`} className="btn">Ver detalle</Link>
                {/* ahora apunta a la nueva página de contacto */}
                <Link className="btn btn-outline" to="/contacto">Solicitar</Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}