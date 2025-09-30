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
          <p style={{color:'#475569', marginBottom:12}}>
            En <b>FixPC</b> entregamos soporte técnico confiable y rápido en Santiago, 
            con un equipo comprometido en brindar soluciones que marquen la diferencia. 
            Nuestro trabajo se basa en honestidad, transparencia y compromiso real con cada cliente,
            porque entendemos lo valioso que es tu tiempo y lo importante que son tus equipos en tu vida diaria o en tu negocio.
          </p>
          <p style={{color:'#475569', marginBottom:12}}>
            Nos especializamos en realizar diagnósticos claros y explicar cada paso del proceso, 
            para que siempre tengas la tranquilidad de saber qué hacemos y por qué. Además, 
            ofrecemos precios justos y sin sorpresas, porque creemos que la confianza se construye con transparencia.
          </p>
          <p style={{color:'#475569', marginBottom:12}}>
            Nuestro objetivo es más que reparar: buscamos mejorar el rendimiento y alargar la vida útil de tus equipos, 
            entregándote un servicio profesional que te dé seguridad y tranquilidad. En FixPC no solo encontrarás soporte técnico, 
            sino también un aliado en quien confiar.
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
              En <b>FixPC</b> nuestra misión es dar un soporte técnico rápido, 
              confiable y cercano, ayudando a que cada computador funcione mejor y dure más tiempo. 
              Nos preocupamos de entregar diagnósticos claros, precios justos y soluciones sin enredos,
              enseñando a nuestros clientes buenas prácticas para cuidar sus equipos.
            </p>
          </div>
          <div className="card">
            <h2 style={{ marginBottom: 8 }}>Visión</h2>
            <p style={{ color: "#475569" }}>
              En <b>FixPC</b> buscamos crecer día a día como un servicio técnico de confianza para las personas y empresas que atendemos, 
              destacando por la calidad y rapidez de nuestro trabajo. 
              Creemos en arreglar antes que botar, 
              dándole más vida a los computadores y evitando basura tecnológica, 
              para así cuidar tu bolsillo y también el medioambiente.
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
              Explicamos el problema en palabras simples y te damos opciones claras, sin cobros sorpresa.
            </p>
          </div>
          <div className="card">
            <h3>✔ Respuesta rápida</h3>
            <p style={{ color: "#475569" }}>
              Sabemos lo importante que es tu computador, por eso damos soluciones ágiles y hacemos seguimiento hasta dejarlo funcionando.
            </p>
          </div>
          <div className="card">
            <h3>✔ Buenas prácticas</h3>
            <p style={{ color: "#475569" }}>
              Cuidamos tus equipos con limpiezas, respaldos y pruebas antes de entregarlos, para que duren más y rindan mejor.
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