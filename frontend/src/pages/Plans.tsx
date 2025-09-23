// src/pages/Plans.tsx
import { servicios } from "../data/services";
import { Link } from "react-router-dom";

export default function Plans() {
  const armado = servicios.find((s) => s.slug === "armado-pc");

  return (
    <main className="container">
      <section className="hero">
        <h1>Planes de PC</h1>
        <p style={{ color: "#475569" }}>
          Elige un perfil según tu uso y presupuesto. Todos los planes son orientativos
          y se ajustan a stock y marcas preferidas.
        </p>
      </section>

      <section className="services">
        {armado?.planes?.length ? (
          <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))" }}>
            {armado.planes.map((p, i) => (
              <div key={i} className="card" style={{ padding: 16 }}>
                <div style={{ fontWeight: 600 }}>{p.nombre}</div>
                <div style={{ opacity: 0.8, marginTop: 6 }}>{p.rango}</div>
                {p.resumen && (
                  <div style={{ color: "#475569", marginTop: 8, fontSize: 14 }}>{p.resumen}</div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p style={{ color: "#64748b" }}>Pronto publicaremos nuestros planes.</p>
        )}

        <div style={{ marginTop: 12 }}>
          <Link to="/servicios/armado-pc" className="btn">Ver detalle del armado →</Link>
        </div>
      </section>
    </main>
  );
}