import { Link, useParams } from "react-router-dom";
import { servicios } from "../data/services";

const CONTACT_PHONE_WA = import.meta.env.VITE_CONTACT_PHONE_WA || "56939291484";

export default function ServiceDetail() {
  const { slug } = useParams();
  const s = servicios.find(x => x.slug === slug);

  if (!s) {
    return (
      <main className="container">
        <section className="services">
          <h1>Servicio no encontrado</h1>
          <Link to="/servicios" className="btn">Volver a servicios</Link>
        </section>
      </main>
    );
  }

  return (
    <main className="container">
      <section className="hero">
        <div className="grid">
          <div>
            <h1>{s.titulo}</h1>
            <p style={{color:"#475569"}}>{s.extracto}</p>
            <div style={{marginTop:10}}>
              <strong>Precio referencial:</strong>{" "}
              CLP {s.precioDesde.toLocaleString()} – {s.precioHasta.toLocaleString()}
            </div>
            <div style={{display:"flex",gap:12,marginTop:14,flexWrap:"wrap"}}>
              <a className="btn" href="/#contacto">Solicitar soporte</a>
              <a className="btn" style={{background:"#10b981"}}
                 href={`https://wa.me/${CONTACT_PHONE_WA}`} target="_blank">
                WhatsApp
              </a>
              <Link to="/servicios" className="btn" style={{background:"#64748b"}}>
                Ver otros servicios
              </Link>
            </div>
          </div>
          <div className="card">
            <h3>¿Qué incluye?</h3>
            <ul style={{marginTop:8, paddingLeft:18, color:"#475569"}}>
              {s.incluye.map((i, idx) => <li key={idx}>{i}</li>)}
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}