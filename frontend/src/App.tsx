import React, { useState } from 'react'
import axios from 'axios'
import { Link } from "react-router-dom";
import ServiceCard from "./components/ServiceCard";
import { serviciosOrdenados,servicios  } from "./data/services";
import HomeServicesStrip from "./components/HomeServicesStrip";

const API_BASE_RAW =
  (import.meta.env as any).VITE_API_URL ||
  (import.meta.env as any).VITE_API_BASE ||
  "/api";
const API_BASE = String(API_BASE_RAW).replace(/\/$/, ""); // sin slash final

// === Personalización rápida ===
// Cambia estos valores desde tu archivo .env de Vite (frontend/.env)
const BRAND_NAME = import.meta.env.VITE_BRAND_NAME || 'FixPC — Soporte Técnico'
const CONTACT_EMAIL = import.meta.env.VITE_CONTACT_EMAIL || 'kalbert.contreras@gmail.com'
const CONTACT_PHONE_DISPLAY = import.meta.env.VITE_CONTACT_PHONE || '+56 9 3929 1484'
const CONTACT_PHONE_WA = import.meta.env.VITE_CONTACT_PHONE_WA || '56939291484'

// 🔹 NUEVO: dirección y horario desde .env
const CONTACT_ADDRESS = import.meta.env.VITE_CONTACT_ADDRESS || 'Rafael Sotomayor 71A, Santiago'
const CONTACT_HOURS = import.meta.env.VITE_CONTACT_HOURS || 'L–V 10:00–20:00'


export default function App(){
  const [form, setForm] = useState({ name:'', email:'', phone:'', city:'', message:'' })
  const [status, setStatus] = useState<string | null>(null)
  const listaServicios = serviciosOrdenados({ incluirOcultos: true });
  const webSvc = listaServicios.find(s => s.slug === "creacion-paginas-web");
  const showWeb = !!webSvc && !webSvc.oculto;  // <- se muestra solo si NO está oculto

  async function submit(e: React.FormEvent){
    e.preventDefault()
    setStatus('Enviando...')
    try{
      await axios.post(`${API_BASE}/leads`, { ...form, source:'landing' })
      setStatus('¡Recibido! Te contactaremos pronto.')
      setForm({ name:'', email:'', phone:'', city:'', message:'' })
    }catch(err:any){
      setStatus('Hubo un problema. Intenta nuevamente.')
    }
  }

  return (
    <>
      
      <main className="container">
        <section className="hero">
          <div className="grid" style={{ gridTemplateColumns: '1.2fr 1fr' }}>
            {/* Columna izquierda: igual */}
            <div>
              <h1>Servicio Técnico PC confiable y rápido</h1>
              <p>En FixPC ofrecemos mantención, diagnóstico, reparación, instalación y optimización de computadores. 
                    Atendemos a domicilio o en nuestro taller, siempre con un servicio cercano, 
                    precios justos y soluciones que realmente mejoran el rendimiento y la vida útil de tu equipo.</p>
              <div style={{display:'flex',gap:12,flexWrap:'wrap'}}>
                <Link className="btn" to="/contacto">Solicitar soporte</Link>
              </div>
            </div>

            {/* Columna derecha: imagen */}
            <aside className="hero-visual is-cover">
              <img
                src="/img/home/fixpc.png"
                alt="Soporte técnico FixPC"
                loading="lazy"
              />
            </aside>
          </div>
        </section>

        {/* === SOBRE NOSOTROS (centrado + fondo) === */}
        <section id="nosotros" className="about-band about-band--image">
          {/* ^ usa about-band--image para fondo con imagen
              o about-band--gradient para un degradado */}
          <div className="container">
            <div className="about-content">
              <h2>Sobre Nosotros</h2>

              <p className="about-text">
                En <b>FixPC</b> entregamos soporte técnico confiable y rápido en Santiago,
                con un equipo comprometido en brindar soluciones que marquen la diferencia.
                Nuestro trabajo se basa en honestidad, transparencia y compromiso real con
                cada cliente, porque entendemos lo valioso que es tu tiempo y lo importante
                que son tus equipos.
              </p>

              <p className="about-text">
                Nos especializamos en diagnósticos claros y explicamos cada paso,
                para que siempre sepas qué hacemos y por qué. Además, ofrecemos precios
                justos y sin sorpresas, porque creemos que la confianza se construye
                con transparencia.
              </p>

              <p className="about-text">
                Nuestro objetivo es más que reparar: buscamos mejorar el rendimiento y
                alargar la vida útil de tus equipos, entregándote un servicio profesional
                que te dé seguridad y tranquilidad.
              </p>

              <Link to="/nosotros" className="btn" style={{ background: '#0ea5e9' }}>
                Conócenos
              </Link>
            </div>
          </div>
        </section>

        {/* === Servicios destacados (home) === */}
        <section className="feature-services">
          <div className="container">
            <div className="feature-layout">
              {/* Izquierda: imagen */}
              <div className="feature-image">
                {/* Usa la foto que prefieras en /public/img/... */}
                <img
                  src="/img/servicios/Mantenimiento2.jpg"
                  alt="Soporte técnico a domicilio"
                  loading="lazy"
                />
              </div>

              {/* Derecha: textos + cuadro con servicios */}
              <div className="feature-right">
                {/* Bloque de textos (arriba) */}
                <div className="card feature-copy">
                  <span className="kicker">FixPC</span>
                  <h2 style={{ margin: "6px 0 8px" }}>¿Por qué elegirnos?</h2>
                  <p className="muted" style={{ marginTop: 15 }}>
                    En <b>FixPC</b> trabajamos con responsabilidad, transparencia y compromiso total hacia nuestros clientes. Ofrecemos diagnósticos claros y soluciones efectivas, con precios justos y sin sorpresas, porque creemos que la confianza se gana con honestidad.

                  </p>
                  <p className="muted" style={{ marginTop: 10 }}>
                    
                    Nuestro objetivo es que tengas la seguridad de dejar tu equipo en manos expertas y recibir un servicio de calidad, a tiempo y al valor que corresponde.

                    Con <b>FixPC</b> no solo obtienes una reparación, sino un aliado confiable en tecnología.
                  </p>
                </div>

                {/* Cuadro con los 4 servicios (abajo) */}
                <div className="card service-quad">
                  <div className="mini-grid">
                    {/* 1 */}
                    <article className="mini-service">
                      <span className="chip-emoji">🧰</span>
                      <div>
                        <h3 className="mini-title">Mantención & Reparación</h3>
                        <p className="mini-text">
                          Diagnóstico certero, limpieza interna y reinstalación /
                          configuración cuando corresponde.
                        </p>
                      </div>
                    </article>

                    {/* 2 */}
                    <article className="mini-service">
                      <span className="chip-emoji">💻</span>
                      <div>
                        <h3 className="mini-title">Soporte Técnico IT</h3>
                        <p className="mini-text">
                          Asistencia remota o presencial, optimización y solución de
                          problemas.
                        </p>
                      </div>
                    </article>

                    {/* 3 */}
                    <article className="mini-service">
                      <span className="chip-emoji">🛠️</span>
                      <div>
                        <h3 className="mini-title">Armado de PC</h3>
                        <p className="mini-text">
                          Te asesoramos con los componentes y te entregamos el PC listo
                          para usar.
                        </p>
                      </div>
                    </article>

                    {/* 4 */}
                    {showWeb && (
                      <article className="mini-service">
                        <span className="chip-emoji">🌐</span>
                        <div>
                          <h3 className="mini-title">Páginas Web</h3>
                          <p className="mini-text">
                            Sitios modernos, rápidos y medibles con SEO on-page e
                            integración de Analytics.
                          </p>
                        </div>
                      </article>
                    )}
                  </div>

                  <div className="quad-actions">
                    <Link to="/servicios" className="btn" style={{ background: "#0ea5e9" }}>
                      ¿Qué servicios ofrecemos? →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="card">
          <h2>¿Necesitas ayuda ahora?</h2>
          <p className="muted">
            Agenda tu soporte o cotización. Te respondemos a la brevedad.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link to="/contacto" className="btn" style={{ background: "#0ea5e9" }}>
              Ir a Contacto
            </Link>
            <a
              className="btn"
              style={{ background: "#10b981" }}
              href={`https://wa.me/${CONTACT_PHONE_WA}`}
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp
            </a>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          © {new Date().getFullYear()} {"Kalbert Contreras — Desarrollo fullstack"}
        </div>
      </footer>
    </>
  )
}