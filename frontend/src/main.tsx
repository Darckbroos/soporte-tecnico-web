import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App";
import ServicesIndex from "./pages/ServicesIndex";
import ServiceDetail from "./pages/ServiceDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import "./styles.css";
import { SEOProvider } from "./components/SEO";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SEOProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/servicios" element={<ServicesIndex />} />
          <Route path="/servicios/:slug" element={<ServiceDetail />} />
          <Route path="/nosotros" element={<About />} />
          <Route path="/contacto" element={<Contact />} />
          {/* Evita pantalla vacía en rutas desconocidas */}
          <Route path="*" element={<div style={{padding:24}}>Página no encontrada</div>} />
        </Routes>
      </BrowserRouter>
    </SEOProvider>
  </React.StrictMode>
);