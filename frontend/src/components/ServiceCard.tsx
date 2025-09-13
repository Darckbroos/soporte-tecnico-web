import { Link } from "react-router-dom";
import { Service } from "../data/services";

export default function ServiceCard({ s }: { s: Service }) {
  return (
    <div className="card">
      <h3 style={{marginBottom:8}}>{s.titulo}</h3>
      <p style={{color:"#475569"}}>{s.extracto}</p>
      <div style={{marginTop:10, fontSize:14, color:"#475569"}}>
        <b>CLP</b> {s.precioDesde.toLocaleString()} – {s.precioHasta.toLocaleString()}
      </div>
      <div style={{marginTop:12}}>
        <Link to={`/servicios/${s.slug}`} className="btn" style={{background:"#0ea5e9"}}>
          Ver detalle
        </Link>
      </div>
    </div>
  );
}