import { NavLink, Link } from "react-router-dom";

const BRAND_NAME = import.meta.env.VITE_BRAND_NAME || "FixPC — Soporte Técnico";
const CONTACT_PHONE_WA = import.meta.env.VITE_CONTACT_PHONE_WA || "56939291484";


export default function Header() {
  return (
    <header className="site-header">
      <div className="container nav">
        <Link to="/" className="brand" aria-label="Volver al inicio">
          <img
            src="/fixpc-logo.png"   // <- sale desde /public
            alt="FixPC"
            className="brand-logo"
            width={32}
            height={32}
          />
          <span>FixPC — Soporte Técnico</span>
        </Link>

        <nav className="nav-right">
          <NavLink to="/" end>Inicio</NavLink>
          <NavLink to="/servicios">Servicios</NavLink>
          <NavLink to="/nosotros">Sobre Nosotros</NavLink>
          <NavLink to="/planes">Planes</NavLink>
          <a href="/#contacto">Contacto</a>
        </nav>

        <a className="btn" href={`https://wa.me/${import.meta.env.VITE_CONTACT_PHONE_WA || "56939291484"}`} target="_blank">
          WhatsApp
        </a>
      </div>
    </header>
  );
}