import { Link } from "react-router-dom";
import { SEO } from "../components/SEO";

const BRAND_NAME = import.meta.env.VITE_BRAND_NAME || "FixPC — Soporte Técnico";
const CONTACT_PHONE_WA = import.meta.env.VITE_CONTACT_PHONE_WA || "56939291484";

export default function About() {
  return (
    <main>
      <SEO
        title="Nosotros | FixPC"
        description="Conoce quiénes somos, nuestra misión y visión. Soporte técnico confiable en Santiago."
      />

      {/* HERO */}
      <section
        className="hero"
        style={{
          padding: "56px 0",
          background:
            "linear-gradient(135deg, rgba(2,132,199,.10), rgba(16,185,129,.10))",
          borderBottom: "1px solid #e2e8f0",
        }}
      >
        <div className="container">
          <h1 style={{ marginBottom: 10 }}>Sobre nosotros</h1>
          <p style={{ color: "#475569", maxWidth: 820 }}>
            En <b>FixPC</b> ofrecemos soporte técnico confiable y rápido. Nos enfocamos en
            diagnósticos honestos, transparencia de precios y soluciones que alargan
            la vida útil de tus equipos. Nuestro compromiso es resolver a tiempo y bien.
          </p>

          <div style={{ display: "flex", gap: 12, marginTop: 16, flexWrap: "wrap" }}>
            <Link to="/" className="btn">Volver al inicio</Link>
            <Link to="/servicios" className="btn" style={{ background: "#10b981" }}>
              Ver servicios
            </Link>
            <a
              className="btn"
              style={{ background: "#0ea5e9" }}
              href={`https://wa.me/${CONTACT_PHONE_WA}`}
              target="_blank"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Misión / Visión */}
      <section className="container" style={{ padding: "40px 0" }}>
        <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 16 }}>
          <div className="card">
            <h2 style={{ marginBottom: 8 }}>Misión</h2>
            <p style={{ color: "#475569" }}>
              Proporcionar soporte técnico cercano y eficiente, optimizando el rendimiento
              de cada computador y acompañando a nuestros clientes con educación y buenas prácticas.
            </p>
          </div>
          <div className="card">
            <h2 style={{ marginBottom: 8 }}>Visión</h2>
            <p style={{ color: "#475569" }}>
              Ser referentes en Chile por calidad, tiempos de respuesta e impulso a la economía
              circular del hardware, priorizando reparación responsable por sobre el descarte.
            </p>
          </div>
        </div>
      </section>

      {/* Diferenciadores */}
      <section className="container" style={{ paddingBottom: 32 }}>
        <h2 style={{ marginBottom: 12 }}>¿Por qué elegir {BRAND_NAME.replace(" — Soporte Técnico","")}? </h2>
        <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 16 }}>
          <div className="card">
            <h3>✔ Diagnóstico honesto</h3>
            <p style={{ color: "#475569" }}>
              Te explicamos el problema en lenguaje claro y te damos alternativas con costos reales.
            </p>
          </div>
          <div className="card">
            <h3>✔ Respuesta rápida</h3>
            <p style={{ color: "#475569" }}>
              Atención remota o presencial según tu necesidad, con seguimiento hasta cerrar el caso.
            </p>
          </div>
          <div className="card">
            <h3>✔ Buenas prácticas</h3>
            <p style={{ color: "#475569" }}>
              Limpieza adecuada, respaldo cuando corresponde y pruebas antes de entregar.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section
        className="hero"
        style={{
          padding: "32px 0",
          background: "linear-gradient(90deg, rgba(14,165,233,.08), rgba(6,182,212,.08))",
          borderTop: "1px solid #e2e8f0",
          borderBottom: "1px solid #e2e8f0",
        }}
      >
        <div className="container">
          <div className="grid" style={{ gridTemplateColumns: "1.2fr 1fr", alignItems: "center" }}>
            <div>
              <h3 style={{ marginBottom: 6 }}>¿Listo para recibir soporte?</h3>
              <p style={{ color: "#475569" }}>
                Cuéntanos tu problema y te daremos una solución clara y conveniente.
              </p>
            </div>
            <div style={{ display: "flex", gap: 12, justifyContent: "flex-end", flexWrap: "wrap" }}>
              <a className="btn" href="/contacto">Solicitar soporte</a>
              <a
                className="btn"
                style={{ background: "#10b981" }}
                href={`https://wa.me/${CONTACT_PHONE_WA}`}
                target="_blank"
              >
                Escríbenos por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}