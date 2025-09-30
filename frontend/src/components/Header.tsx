// src/components/Header.tsx
import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";

const BRAND_NAME = import.meta.env.VITE_BRAND_NAME || "FixPC — Soporte Técnico";
const CONTACT_PHONE_WA = import.meta.env.VITE_CONTACT_PHONE_WA || "56939291484";

export default function Header() {
  const [open, setOpen] = useState(false);
  const wa = `https://wa.me/${CONTACT_PHONE_WA}`;

  // (Opcional) bloquear el scroll del body cuando el panel está abierto
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => (document.body.style.overflow = "");
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className="site-header">
      <div className="container header-bar">
        {/* IZQUIERDA: LOGO + NOMBRE */}
        <Link to="/" className="brand" aria-label="Volver al inicio" onClick={close}>
          <img
            src="/img/home/fixpc-logo.png"  // 👈 desde /public
            alt="FixPC"
            className="brand-logo"
            width={32}
            height={32}
          />
          <span>{BRAND_NAME}</span>
        </Link>

        {/* DERECHA: MENÚ + CTA + HAMBURGER */}
        <div className="nav-right">
          {/* Menú horizontal (desktop) */}
          <nav className="menu" aria-label="Navegación principal">
            <NavLink to="/" end onClick={close}>Inicio</NavLink>
            <NavLink to="/servicios" onClick={close}>Servicios</NavLink>
            <NavLink to="/nosotros" onClick={close}>Sobre Nosotros</NavLink>
            <NavLink to="/contacto" onClick={close}>Contacto</NavLink>
          </nav>

          {/* CTA visible solo en desktop (en móvil va dentro del panel) */}
          <a className="btn wa-btn" href={wa} target="_blank" rel="noreferrer">
            Escríbenos al WhatsApp
          </a>

          {/* Botón hamburger (móvil) */}
          <button
            className={`menu-toggle ${open ? "is-open" : ""}`}
            aria-label="Abrir menú"
            aria-expanded={open}
            onClick={() => setOpen(v => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {/* Panel móvil desplegable */}
      <nav className={`mobile-nav ${open ? "is-open" : ""}`} aria-label="Menú móvil">
        <NavLink to="/" end onClick={close}>Inicio</NavLink>
        <NavLink to="/servicios" onClick={close}>Servicios</NavLink>
        <NavLink to="/nosotros" onClick={close}>Sobre Nosotros</NavLink>
        <NavLink to="/contacto" onClick={close}>Contacto</NavLink>

        <a
          className="btn wa-btn mobile-wa"
          href={wa}
          target="_blank"
          rel="noreferrer"
          onClick={close}
          style={{ marginTop: 10 }}
        >
          Escríbenos al WhatsApp
        </a>
      </nav>
    </header>
  );
}