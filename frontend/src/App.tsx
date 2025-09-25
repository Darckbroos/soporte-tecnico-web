import React, { useState } from 'react'
import axios from 'axios'
import { Link } from "react-router-dom";
import ServiceCard from "./components/ServiceCard";
import { serviciosOrdenados } from "./data/services";

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8000'

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
          <div className="grid">
            <div>
              <h1>Servicio Técnico PC confiable y rápido</h1>
              <p>Mantención, diagnóstico, reparación, instalación y optimización. A domicilio o en mi estación de trabajo.</p>
              <div style={{display:'flex',gap:12,flexWrap:'wrap'}}>
                <Link className="btn" to="/contacto">Solicitar soporte</Link>
              </div>
            </div>
            <div className="card">
              <h3>Información de contacto</h3>
              <p><strong>Tel:</strong> {CONTACT_PHONE_DISPLAY}</p>
              <p><strong>Correo:</strong> {CONTACT_EMAIL}</p>
              {/* 🔹 NUEVO: usan envs, no texto duro */}
              <p><strong>Dirección:</strong> {CONTACT_ADDRESS}</p>
              <p><strong>Horario:</strong> {CONTACT_HOURS}</p>
            </div>
          </div>
        </section>

        {/* === Nosotros (sección corta) === */}
        <section id="nosotros" className="services">
          <h2>Sobre Nosotros</h2>
          <div className="grid" style={{gridTemplateColumns:'1.2fr 1fr'}}>
            <div>
              <p style={{color:'#475569', marginBottom:12}}>
                En <b>FixPC</b> entregamos soporte técnico confiable y rápido en Santiago.
                Trabajamos con diagnósticos honestos, precios claros y soluciones que
                realmente mejoran el rendimiento y vida útil de tus equipos.
              </p>
              <Link to="/nosotros" className="btn" style={{background:'#0ea5e9'}}>
                Conócenos
              </Link>
            </div>

            <div className="card">
              <h3>¿Por qué elegirnos?</h3>
              <ul style={{marginTop:8, paddingLeft:18, color:'#475569'}}>
                <li>Respuesta rápida y atención cercana</li>
                <li>Transparencia en diagnóstico y costos</li>
                <li>Buenas prácticas y enfoque preventivo</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="servicios" className="services">
          {/* fila de encabezado: título + botón */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 12,
              flexWrap: "wrap",        // en móviles, el botón baja
              marginBottom: 12
            }}
          >
            <h2 style={{ margin: 0 }}>Servicios</h2>
            <Link to="/servicios" className="btn" style={{ background: "#0ea5e9" }}>
              ¿Qué servicios ofrecemos? →
            </Link>
          </div>

          {/* cards */}
          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
            {serviciosOrdenados().map(s => <ServiceCard key={s.slug} s={s} />)}
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