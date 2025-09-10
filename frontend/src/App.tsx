import React, { useState } from 'react'
import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8000'

// === Personalización rápida ===
// Cambia estos valores desde tu archivo .env de Vite (frontend/.env)
const BRAND_NAME = import.meta.env.VITE_BRAND_NAME || 'Kalbert Contreras — Soporte Técnico'
const CONTACT_EMAIL = import.meta.env.VITE_CONTACT_EMAIL || 'kalbert.contreras@ejemplo.cl'
const CONTACT_PHONE_DISPLAY = import.meta.env.VITE_CONTACT_PHONE || '+56 9 3882 8433'
// Solo dígitos para WhatsApp (e.g., 569XXXXXXXX)
const CONTACT_PHONE_WA = import.meta.env.VITE_CONTACT_PHONE_WA || '56938828433'

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
      <header>
        <div className="container">
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:16}}>
            <strong style={{fontSize:22}}>{BRAND_NAME}</strong>
            <a className="btn" href={`https://wa.me/${CONTACT_PHONE_WA}`} target="_blank">WhatsApp</a>
          </div>
        </div>
      </header>

      <main className="container">
        <section className="hero">
          <div className="grid">
            <div>
              <h1>Servicio Técnico PC confiable y rápido</h1>
              <p>Mantención, diagnóstico, reparación, instalación y optimización. A domicilio o en mi estación de trabajo.</p>
              <div style={{display:'flex',gap:12,flexWrap:'wrap'}}>
                <a className="btn" href="#contacto">Solicitar soporte</a>
                <a className="btn" style={{background:'#10b981'}} href="#servicios">Ver servicios</a>
              </div>
            </div>
            <div className="card">
              <h3>Información de contacto</h3>
              <p><strong>Tel:</strong> {CONTACT_PHONE_DISPLAY}</p>
              <p><strong>Correo:</strong> {CONTACT_EMAIL}</p>
              <p><strong>Dirección:</strong> Rafael Sotomayor 71A, Santiago</p>
              <p><strong>Horario:</strong> L–V 10:00–20:00</p>
            </div>
          </div>
        </section>

        <section id="servicios" className="services">
          <h2>Servicios</h2>
          <div className="grid" style={{gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))'}}>
            {[
              'Mantención preventiva',
              'Diagnóstico',
              'Reparación de hardware/software',
              'Instalación y configuración',
              'Optimización de rendimiento',
              'Respaldos y migración de datos',
              'Particionamiento y formateo',
              'Limpieza interna/externa',
              'Cambio de repuestos'
            ].map(s => (
              <div className="card" key={s}>{s}</div>
            ))}
          </div>
        </section>

        <section id="contacto" className="card">
          <h2>Solicita tu soporte</h2>
          <form onSubmit={submit} className="cols">
            <div>
              <label>Nombre</label>
              <input required value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Tu nombre" />
            </div>
            <div>
              <label>Correo</label>
              <input required type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="tu@correo.cl" />
            </div>
            <div>
              <label>Teléfono</label>
              <input value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} placeholder="+56 9 ..." />
            </div>
            <div>
              <label>Ciudad / Comuna</label>
              <input value={form.city} onChange={e=>setForm({...form,city:e.target.value})} placeholder="Ej: Puente Alto" />
            </div>
            <div style={{gridColumn:'1 / -1'}}>
              <label>Describe tu problema</label>
              <textarea required rows={5} value={form.message} onChange={e=>setForm({...form,message:e.target.value})} placeholder="Cuéntame qué sucede con tu PC..." />
            </div>
            <div style={{gridColumn:'1 / -1',display:'flex',gap:12,alignItems:'center'}}>
              <button className="btn" type="submit">Enviar solicitud</button>
              {status && <span style={{color:'#475569'}}>{status}</span>}
            </div>
          </form>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          © {new Date().getFullYear()} Kalbert Contreras — Servicio Técnico
        </div>
      </footer>
    </>
  )
}
