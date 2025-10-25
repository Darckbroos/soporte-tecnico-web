import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import { FaWhatsapp } from 'react-icons/fa';

const CONTACT_PHONE_WA = import.meta.env.VITE_CONTACT_PHONE_WA || '56939291484';

export default function Layout() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'matrix' : 'light');
  };

  return (
    <>
      <Header toggleTheme={toggleTheme} theme={theme} />
      {theme === 'matrix' && (
        <video autoPlay loop muted className="bg-video">
          <source src="/img/gif/watermarked-72298b2e-955b-469c-ba99-cb283a0826d1.mp4" type="video/mp4" />
        </video>
      )}
      <Outlet />
      {theme === 'matrix' && (
        <a
          href={`https://wa.me/${CONTACT_PHONE_WA}`}
          className="whatsapp-icon"
          target="_blank"
          rel="noreferrer"
        >
          <FaWhatsapp size={30} />
          <span className="tooltip">Escríbenos</span>
        </a>
      )}
    </>
  );
}
