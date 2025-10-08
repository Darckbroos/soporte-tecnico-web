import { useLocation } from "react-router-dom";
import { CONTACT } from "../utils/contact";
import ContactForm from "../components/ContactForm";
import { FaInstagram, FaFacebook } from "react-icons/fa";
import { useState } from 'react';

const contactPhotos = ["/img/servicios/Contactanos.png"];

const PLANES = {
  basico: {
    titulo: "Básico",
    precio: "25.000",
    precioAnual: "300.000",
    icono: "🥉",
    servicios: [
      "1 visita mensual programada",
      "Chequeo de malware y limpieza",
      "Actualización de sistema y parches",
      "Verificación de backups",
      "Soporte remoto razonable en horario hábil",
    ],
    mensaje:
      "Hola, estoy interesado en el plan Básico de soporte. Me gustaría contratar el plan anual y recibir más información sobre los servicios incluidos.",
  },
  pro: {
    titulo: "Pro",
    precio: "50.000",
    precioAnual: "600.000",
    icono: "🥈",
    servicios: [
      "2 visitas mensuales programadas",
      "Limpieza y hardening (descargas/navegación seguras)",
      "Optimización de arranque y tareas",
      "Monitoreo básico + checklist preventivo",
      "Soporte remoto prioritario",
    ],
    mensaje:
      "Hola, estoy interesado en el plan Pro de soporte. Me gustaría contratar el plan anual y recibir más información sobre los servicios incluidos.",
  },
  full: {
    titulo: "Full",
    precio: "90.000",
    precioAnual: "1.080.000",
    icono: "🥇",
    servicios: [
      "4 visitas mensuales programadas",
      "Políticas de respaldo + pruebas de restauración",
      "Gestión de licencias y antivirus premium",
      "Asesoría continua de mejoras",
      "Soporte remoto + on-call (bajo acuerdo)",
    ],
    mensaje:
      "Hola, estoy interesado en el plan Full de soporte. Me gustaría contratar el plan anual y recibir más información sobre los servicios incluidos.",
  },
};

export default function Contact() {
  const location = useLocation();
  const planSlug = location.state?.plan;
  const plan = planSlug ? PLANES[planSlug] : null;

  const [isInstagramHovered, setInstagramHovered] = useState(false);
  const [isFacebookHovered, setFacebookHovered] = useState(false);

  const instagramButtonStyle = {
    background: isInstagramHovered ? '#E4405F' : 'transparent',
    color: isInstagramHovered ? '#fff' : '#475569',
    border: `1px solid ${isInstagramHovered ? '#E4405F' : '#e2e8f0'}`,
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    transition: 'all 0.3s ease',
  };

  const facebookButtonStyle = {
    background: isFacebookHovered ? '#1877F2' : 'transparent',
    color: isFacebookHovered ? '#fff' : '#475569',
    border: `1px solid ${isFacebookHovered ? '#1877F2' : '#e2e8f0'}`,
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    transition: 'all 0.3s ease',
  };

  return (
    <main>
      <section
        className="hero"
        style={{
          padding: "32px 0",
          background:
            "linear-gradient(135deg, rgba(2,132,199,.08), rgba(16,185,129,.08))",
          borderBottom: "1px solid #e2e8f0",
        }}
      >
        <div className="container">
          <h1 style={{ marginTop: 6 }}>Contacto</h1>
          <p className="muted" style={{ maxWidth: 820 }}>
            ¿Necesitas soporte ahora o prefieres una cotización? Escríbenos,
            llámanos o completa el formulario y te contactaremos a la brevedad.
          </p>
          <div
            style={{ marginTop: 14, display: "flex", gap: 12, flexWrap: "wrap" }}
          >
            <a
              className="btn"
              style={{ background: "#10b981" }}
              href={CONTACT.waUrl}
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp
            </a>
            <a className="btn btn-outline" href={CONTACT.mailto}>
              Escribir por correo
            </a>
          </div>
        </div>
      </section>

      <section className="container contact-photos">
        <div className="contact-photos-row">
          <figure className="contact-photo">
            <img src="/img/Contacto/Contactanos.png" alt="Soporte FixPC" />
          </figure>
        </div>
      </section>

      {plan && (
        <section className="container" style={{ padding: "10px 0 0" }}>
          <div style={{ maxWidth: 450, margin: "0 auto 24px" }}>
            <article className={`price-card price-card--${planSlug}`}>
              <div className="price-badge-wrapper">
                <div className="price-badge">{plan.icono}</div>
              </div>
              <h3 className="price-title">{plan.titulo}</h3>
              <div className="price-sub">
                Pago anual de ${plan.precioAnual} (equivale a ${plan.precio} mensual)
              </div>

              <div className-="price-features" style={{ marginTop: 16 }}>
                {plan.servicios.map((s, i) => (
                  <p key={i}>{s}</p>
                ))}
              </div>
            </article>
          </div>
        </section>
      )}

      <section className="container" style={{ padding: "10px 0 36px" }}>
        <div className="contact-grid">
          <div className="card" id="contacto">
            <h3>Solicita tu soporte</h3>
            <ContactForm initialMessage={plan?.mensaje} />
          </div>

          <aside className="card">
            <h3>Información</h3>
            <ul
              style={{
                paddingLeft: 18,
                color: "#475569",
                marginTop: 8,
                lineHeight: 1.9,
              }}
            >
              <li>
                <strong>Marca:</strong> {CONTACT.brand}
              </li>
              <li>
                <strong>Teléfono:</strong> {CONTACT.phoneDisplay}
              </li>
              <li>
                <strong>Correo:</strong> {CONTACT.email}
              </li>
              <li>
                <strong>Dirección:</strong> {CONTACT.address}
              </li>
              <li>
                <strong>Horario:</strong> {CONTACT.hours}
              </li>
            </ul>

            <div
              style={{ marginTop: 12, display: "flex", gap: 10, flexWrap: "wrap" }}
            >
              <a
                className="btn"
                style={{ background: "#10b981" }}
                href={CONTACT.waUrl}
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp
              </a>
              <a
                className="btn btn-outline"
                href={CONTACT.mapsUrl}
                target="_blank"
                rel="noreferrer"
              >
                Ver en Maps
              </a>
              <a
                href="https://www.instagram.com/fixpc.support.chile/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn"
                style={instagramButtonStyle}
                onMouseEnter={() => setInstagramHovered(true)}
                onMouseLeave={() => setInstagramHovered(false)}
              >
                <FaInstagram />
                <span>Instagram</span>
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61581639582521"
                target="_blank"
                rel="noopener noreferrer"
                className="btn"
                style={facebookButtonStyle}
                onMouseEnter={() => setFacebookHovered(true)}
                onMouseLeave={() => setFacebookHovered(false)}
              >
                <FaFacebook />
                <span>Facebook</span>
              </a>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
