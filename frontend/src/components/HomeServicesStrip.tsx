import { Link } from "react-router-dom";

const items = [
  {
    icon: "🧰",
    title: "Mantención & Reparación",
    text: "Diagnóstico certero, limpieza interna, reinstalación/configuración y pruebas."
  },
  {
    icon: "💻",
    title: "Soporte Técnico IT",
    text: "Asistencia remota o presencial, optimización y solución de problemas."
  },
  {
    icon: "🛠️",
    title: "Armado de PC",
    text: "Te asesoramos con los componentes y te entregamos el PC listo para usar."
  },
  {
    icon: "🌐",
    title: "Páginas Web",
    text: "Sitios modernos, rápidos y medibles con SEO on-page e integración de Analytics."
  },
];

export default function HomeServicesStrip() {
  return (
    <section className="container services-teaser">
      <div className="teaser-head">
        <span className="eyebrow">FixPC</span>
        <h2>¿Por qué elegirnos?</h2>
        <p className="muted" style={{maxWidth: 740}}>
          Confiabilidad, responsabilidad y precios transparentes. Estos son los
          servicios más solicitados por nuestros clientes.
        </p>
      </div>

      <div className="feature-grid">
        {items.map((it, i) => (
          <div key={i} className="feature-card">
            <div className="feature-icon" aria-hidden>{it.icon}</div>
            <div>
              <h3 className="feature-title">{it.title}</h3>
              <p className="muted">{it.text}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="teaser-cta">
        <Link to="/servicios" className="btn" style={{background:"#0ea5e9"}}>
          ¿Qué servicios ofrecemos? →
        </Link>
      </div>
    </section>
  );
}