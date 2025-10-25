import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';

const BRAND_NAME = import.meta.env.VITE_BRAND_NAME || 'FixPC — Soporte Técnico';
const CONTACT_PHONE_WA = import.meta.env.VITE_CONTACT_PHONE_WA || '56939291484';

export default function Header({ toggleTheme, theme }: { toggleTheme: () => void, theme: string }) {
  const [open, setOpen] = useState(false);
  const wa = `https://wa.me/${CONTACT_PHONE_WA}`;

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => (document.body.style.overflow = '');
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className="site-header">
      <div className="container header-bar">
        <Link to="/" className="brand" aria-label="Volver al inicio" onClick={close}>
          <img
            src="/img/home/fixpc-logo.png"
            alt="FixPC"
            className="brand-logo"
            width={32}
            height={32}
          />
          <span>{BRAND_NAME}</span>
        </Link>

        <div className="nav-right">
          <nav className="menu" aria-label="Navegación principal">
            <NavLink to="/" end onClick={close}>Inicio</NavLink>
            <NavLink to="/servicios" onClick={close}>Servicios</NavLink>
            <NavLink to="/nosotros" onClick={close}>Sobre Nosotros</NavLink>
            <NavLink to="/contacto" onClick={close}>Contacto</NavLink>
          </nav>

          {theme !== 'matrix' && (
            <a className="btn wa-btn" href={wa} target="_blank" rel="noreferrer">
              Escríbenos al WhatsApp
            </a>
          )}

          <button onClick={toggleTheme} className="btn btn-primary" style={{marginLeft: '10px'}}>Cambiar Estilo</button>

          <button
            className={`menu-toggle ${open ? 'is-open' : ''}`}
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

      <nav className={`mobile-nav ${open ? 'is-open' : ''}`} aria-label="Menú móvil">
        <NavLink to="/" end onClick={close}>Inicio</NavLink>
        <NavLink to="/servicios" onClick={close}>Servicios</NavLink>
        <NavLink to="/nosotros" onClick={close}>Sobre Nosotros</NavLink>
        <NavLink to="/contacto" onClick={close}>Contacto</NavLink>

        {theme !== 'matrix' && (
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
        )}
      </nav>
    </header>
  );
}
