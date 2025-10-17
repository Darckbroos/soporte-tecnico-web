// src/pages/ServiceDetail.tsx
import { useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { servicios } from "../data/services";

const CONTACT_PHONE_WA = import.meta.env.VITE_CONTACT_PHONE_WA || "56939291484";

// Cambia esto para probar maquetas: "stacked" | "sidebar" | "tabs"
const LAYOUT: "stacked" | "sidebar" | "tabs" = "sidebar";

function clp(n?: number) {
  if (n == null) return "";
  return n.toLocaleString("es-CL", { maximumFractionDigits: 0 });
}

export default function ServiceDetail() {
  const { slug } = useParams();
  const s = servicios.find((x) => x.slug === slug);

  if (!s) {
    return (
      <main className="container">
        <section className="services">
          <h1>Servicio no encontrado</h1>
          <Link to="/servicios" className="btn">
            Volver a servicios
          </Link>
        </section>
      </main>
    );
  }
  // 🚫 Si el servicio existe pero está oculto, redirigimos

  if (s.oculto) {
    return <Navigate to="/servicios" replace />;
  }


  const waUrl = `https://wa.me/${CONTACT_PHONE_WA}?text=${encodeURIComponent(
    `Hola, quiero cotizar: ${s.titulo}`
  )}`;

  // ---- Bloques reutilizables ----
  const Ctas = (
    <div style={{ display: "flex", gap: 12, marginTop: 14, flexWrap: "wrap" }}>
      <a className="btn" href="/contacto">
        Solicitar soporte
      </a>
      <a className="btn" style={{ background: "#10b981" }} href={waUrl} target="_blank" rel="noreferrer">
        WhatsApp
      </a>
      <Link to="/servicios" className="btn" style={{ background: "#64748b" }}>
        Ver otros servicios
      </Link>
    </div>
  );

  const Price = (
    <>
      <div style={{ marginTop: 10 }}>
        <strong>Precio referencial:</strong>{" "}
        CLP {clp(s.precioDesde)} – {clp(s.precioHasta)}
      </div>
      {s.notaPrecios && (
        <div
          style={{
            background: "linear-gradient(to right, #d4edda, #fff3cd)",
            padding: "12px 16px",
            borderRadius: 8,
            marginTop: 12,
            display: "flex",
            alignItems: "center",
            gap: 12,
            color: "#333",
            border: "1px solid #c3e6cb"
          }}
        >
          <span style={{ fontSize: 24 }}>⚠️</span>
          <p
            style={{ margin: 0, fontSize: 13 }}
            dangerouslySetInnerHTML={{ __html: `* ${s.notaPrecios}` }}
          />
        </div>
      )}
      {s.slug === "armado-pc" && !s.notaPrecios && (
        <p style={{ marginTop: 6, color: "#64748b", fontSize: 13 }}>
          * Mano de obra. Los componentes se cotizan aparte según stock y preferencia de marcas.
        </p>
      )}
    </>
  );

  const Incluye = (
    <div className="card">
      <h3>¿Qué incluye?</h3>
      <ul style={{ marginTop: 8, paddingLeft: 18, color: "#475569" }}>
        {s.incluye.map((i, idx) => (
          <li key={idx}>{i}</li>
        ))}
      </ul>
    </div>
  );

const Subservicios =
  s.subservicios && s.subservicios.length > 0 ? (
    <div className="card">
      <h3>Subservicios y precios</h3>
      <div
        style={{
          border: "1px solid rgba(15,23,42,.08)",
          borderRadius: 12,
          overflow: "hidden",
        }}
      >
        {/* Encabezado */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0,1.6fr) minmax(0,.8fr)",
            background: "#f8fafc",
            fontWeight: 600,
            padding: "10px 14px",
          }}
        >
          <div>Trabajo</div>
          <div style={{ textAlign: "right" }}>Precio (CLP)</div> {/* <- aquí */}
        </div>

        {/* Filas */}
        {s.subservicios.map((ss: any, i: number) => (
          <div
            key={i}
            className="sub-row" // <- para CSS
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0,1.6fr) minmax(0,.8fr)",
              padding: "10px 14px",
              borderTop: "1px solid rgba(15,23,42,.06)",
              alignItems: "end", // <- alinea abajo
              gap: 8,
            }}
          >
            <div>
              <div style={{ fontWeight: 600 }}>{ss.nombre}</div>
              {ss.descripcion && (
                <div style={{ color: "#64748b", fontSize: ".95rem", marginTop: 4 }}>
                  {ss.descripcion}
                </div>
              )}
            </div>

            {/* Celda precio fija/ rango (por compatibilidad) */}
            <div className="price-cell" style={{ fontWeight: 600 }}>
              {ss.precio != null
                ? clp(ss.precio)
                : ss.desde != null && ss.hasta == null
                ? clp(ss.desde)
                : ss.desde != null && ss.hasta != null
                ? `${clp(ss.desde)} – ${clp(ss.hasta)}`
                : "—"}
            </div>
          </div>
        ))}
      </div>
    </div>
  ) : null;

  const Beneficios =
    s.beneficios && s.beneficios.length > 0 ? (
      <div className="card">
        <h3>Beneficios</h3>
        <ul style={{ marginTop: 8, paddingLeft: 18, color: "#475569" }}>
          {s.beneficios.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
      </div>
    ) : null;

  const Galeria =
    s.galeria && s.galeria.length > 0 ? (
      <div className="card">
        <h3>Galería del trabajo</h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))",
            gap: 10,
            marginTop: 8,
          }}
        >
          {s.galeria.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`g-${i}`}
              style={{
                width: "100%",
                height: 120,
                objectFit: "cover",
                borderRadius: 12,
              }}
            />
          ))}
        </div>
      </div>
    ) : null;

  const Perfiles =
    s.planes && s.planes.length > 0 ? (
      <>
        <h3 style={{ marginTop: 18 }}>Perfiles recomendados</h3>
        <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))" }}>
          {s.planes.map((p, i) => (
            <div key={i} className="card" style={{ padding: 16 }}>
              <div style={{ fontWeight: 600 }}>{p.nombre}</div>
              <div style={{ opacity: 0.8, marginTop: 6 }}>{p.rango}</div>
              {p.resumen && <div style={{ color: "#475569", marginTop: 8, fontSize: 14 }}>{p.resumen}</div>}
            </div>
          ))}
        </div>
      </>
    ) : null;

  const Extras =
    s.extras && s.extras.length > 0 ? (
      <>
        <h3 style={{ marginTop: 18 }}>Extras opcionales</h3>
        <ul style={{ marginTop: 8, paddingLeft: 18, color: "#475569" }}>
          {s.extras.map((e, i) => (
            <li key={i}>{e}</li>
          ))}
        </ul>
      </>
    ) : null;

  // ---- MAQUETA A: STACKED ----
  const LayoutStacked = () => (
    <main className="container">
      <section className="hero">
        <div style={{ maxWidth: 980, margin: "0 auto" }}>
          {s.hero && (
            <img
              src={s.hero}
              alt={s.titulo}
              style={{
                width: "100%",
                height: 280,
                objectFit: "cover",
                borderRadius: 16,
                marginBottom: 16,
                boxShadow: "0 8px 30px -12px rgba(2,6,23,.25)",
              }}
            />
          )}
          <h1>{s.titulo}</h1>
          <p style={{ color: "#475569" }}>{s.extracto}</p>
          {Price}
          {Ctas}
        </div>
      </section>

      <section className="services" style={{ maxWidth: 980, margin: "0 auto" }}>
        {Incluye}
        {Subservicios}
        {Beneficios}
        {Galeria}
        {Perfiles}
        {Extras}
      </section>
    </main>
  );

  // ---- MAQUETA B: SIDEBAR ----
const LayoutSidebar = () => (
  <main className="container">
    {/* HERO arriba, sin sidebar */}
    <section className="hero">
      <div style={{ maxWidth: 980, margin: "0 auto" }}>
        {s.hero && (
          <img
            src={s.hero}
            alt={s.titulo}
            style={{
              width: "100%",
              height: 220,
              objectFit: "cover",
              borderRadius: 16,
              marginBottom: 16,
              boxShadow: "0 8px 30px -12px rgba(2,6,23,.25)",
            }}
          />
        )}
        <h1>{s.titulo}</h1>
        <p style={{ color: "#475569" }}>{s.extracto}</p>
        {Price}
        {Ctas}
      </div>
    </section>

    {/* CONTENIDO + GALERÍA A LA DERECHA */}
    <section className="services">
      <div className="service-layout">
        <div className="service-main">
          {Incluye}
          {Subservicios}
          {Beneficios}
          {Extras}
        </div>

        <aside className="service-aside">
          <div className="gallery-vert">
            {s.galeria?.map((src, i) => (
              <figure key={i} className="gallery-vert-item">
                <img className="gallery-img" src={src} alt={`Trabajo ${i + 1}`} loading="lazy" />
              </figure>
            ))}
          </div>
        </aside>
      </div>
    </section>
  </main>
);

  // ---- MAQUETA C: TABS ----
  const LayoutTabs = () => {
    const tabs = [
      { id: "incluye", label: "Incluye", content: Incluye },
      ...(Subservicios ? [{ id: "sub", label: "Subservicios", content: <div className="card">{Subservicios}</div> }] : []),
      ...(Beneficios ? [{ id: "benef", label: "Beneficios", content: <div className="card">{Beneficios}</div> }] : []),
      ...(Galeria ? [{ id: "gal", label: "Galería", content: <div className="card">{Galeria}</div> }] : []),
      ...(Perfiles ? [{ id: "perfiles", label: "Perfiles", content: <div className="card" style={{ padding: 16 }}>{Perfiles}</div> }] : []),
      ...(Extras ? [{ id: "extras", label: "Extras", content: <div className="card">{Extras}</div> }] : []),
    ];
    const [active, setActive] = useState(tabs[0]?.id ?? "incluye");

    return (
      <main className="container">
        <section className="hero">
          <div style={{ maxWidth: 980, margin: "0 auto" }}>
            {s.hero && (
              <img
                src={s.hero}
                alt={s.titulo}
                style={{
                  width: "100%",
                  height: 260,
                  objectFit: "cover",
                  borderRadius: 16,
                  marginBottom: 16,
                  boxShadow: "0 8px 30px -12px rgba(2,6,23,.25)",
                }}
              />
            )}
            <h1>{s.titulo}</h1>
            <p style={{ color: "#475569" }}>{s.extracto}</p>
            {Price}
            {Ctas}
          </div>
        </section>

        <section className="services" style={{ maxWidth: 980, margin: "0 auto" }}>
          <div className="card" style={{ padding: 12 }}>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {tabs.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setActive(t.id)}
                  className="btn"
                  style={{
                    background: active === t.id ? "#0ea5e9" : "#e2e8f0",
                    color: active === t.id ? "#fff" : "#0f172a",
                    padding: "8px 14px",
                  }}
                >
                  {t.label}
                </button>
              ))}
            </div>
            <div style={{ marginTop: 12 }}>
              {tabs.find((t) => t.id === active)?.content}
            </div>
          </div>
        </section>
      </main>
    );
  };

  // ---- Render según layout elegido ----
  if (LAYOUT === "stacked") return <LayoutStacked />;
  if (LAYOUT === "sidebar") return <LayoutSidebar />;
  return <LayoutTabs />;
}
