import { CONTACT } from "../utils/contact";
import ContactForm from "../components/ContactForm";

const contactPhotos = [
  "/img/servicios/Contactanos.png",
];

export default function Contact() {
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
          <div style={{ marginTop: 14, display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a className="btn" style={{ background: "#10b981" }} href={CONTACT.waUrl} target="_blank" rel="noreferrer">
              WhatsApp
            </a>
            <a className="btn btn-outline" href={CONTACT.mailto}>
              Escribir por correo
            </a>
          </div>
        </div>
      </section>

      {/* === Franja de imágenes sobre el formulario === */}
      <section className="container contact-photos">
        <div className="contact-photos-row">
          <figure className="contact-photo">
            <img src="/img/Contacto/Contactanos.png" alt="Soporte FixPC" />
          </figure>
        </div>
      </section>

      {/* === Formulario + info === */}
      <section className="container" style={{ padding: "10px 0 36px" }}>
        <div className="grid" style={{ gridTemplateColumns: "minmax(0,1fr) 380px", gap: 24 }}>
          <div className="card" id="contacto">
            <h3>Solicita tu soporte</h3>
            <ContactForm />
          </div>

          <aside className="card">
            <h3>Información</h3>
            <ul style={{ paddingLeft: 18, color: "#475569", marginTop: 8, lineHeight: 1.9 }}>
              <li><strong>Marca:</strong> {CONTACT.brand}</li>
              <li><strong>Teléfono:</strong> {CONTACT.phoneDisplay}</li>
              <li><strong>Correo:</strong> {CONTACT.email}</li>
              <li><strong>Dirección:</strong> {CONTACT.address}</li>
              <li><strong>Horario:</strong> {CONTACT.hours}</li>
            </ul>

            <div style={{ marginTop: 12, display: "flex", gap: 10, flexWrap: "wrap" }}>
              <a className="btn" style={{ background: "#10b981" }} href={CONTACT.waUrl} target="_blank" rel="noreferrer">
                WhatsApp
              </a>
              <a className="btn btn-outline" href={CONTACT.mapsUrl} target="_blank" rel="noreferrer">
                Ver en Maps
              </a>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}