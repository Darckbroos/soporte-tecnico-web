import { NavLink, Link } from "react-router-dom";

const BRAND_NAME = import.meta.env.VITE_BRAND_NAME || "FixPC — Soporte Técnico";
const CONTACT_PHONE_WA = import.meta.env.VITE_CONTACT_PHONE_WA || "56939291484";

export default function Header() {
  const wa = `https://wa.me/${CONTACT_PHONE_WA}`;

  return (
    <header className="site-header">
      <div className="container header-bar">
        {/* IZQUIERDA: SOLO LOGO */}
        <Link to="/" className="brand" aria-label="Volver al inicio">
          <img
            src="/fixpc-logo.png"
            alt="FixPC"
            className="brand-logo"
            width={32}
            height={32}
          />
          <span>{BRAND_NAME}</span>
        </Link>

        {/* DERECHA: MENÚ + CTA */}
        <div className="nav-right">
          <nav className="menu">
            <NavLink to="/" end>Inicio</NavLink>
            <NavLink to="/servicios">Servicios</NavLink>
            <NavLink to="/nosotros">Sobre Nosotros</NavLink>
            <NavLink to="/planes">Planes</NavLink>
            <NavLink to="/contacto">Contacto</NavLink>
          </nav>

          <a className="btn wa-btn" href={wa} target="_blank" rel="noreferrer">
            Escríbenos al WhatsApp
          </a>
        </div>
      </div>
    </header>
  );
}