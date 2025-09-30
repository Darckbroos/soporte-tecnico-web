import { Link } from "react-router-dom";
import { Service } from "../data/services";

type Props = {
  s: Service;
  /** si true, usa la miniatura alta (para /servicios) */
  bigThumb?: boolean;
};

export default function ServiceCard({ s, bigThumb = false }: Props) {
  const thumbClass = `service-thumb ${bigThumb ? "service-thumb--lg" : ""}`;

  return (
    <article className="card service-card hover-up">
      {/* imagen de cabecera */}
      {s.cover ? (
        <img src={s.cover} alt={s.titulo} className={thumbClass} />
      ) : null}

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
  );
}