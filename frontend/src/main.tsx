import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App";
import ServicesIndex from "./pages/ServicesIndex";
import ServiceDetail from "./pages/ServiceDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Plans from "./pages/Plans";
import "./styles.css";
import { SEOProvider } from "./components/SEO";
import Layout from "./components/Layout";
import ScrollToTop from "./components/ScrollToTop";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SEOProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<App />} />
            <Route path="/servicios" element={<ServicesIndex />} />
            <Route path="/servicios/:slug" element={<ServiceDetail />} />
            <Route path="/nosotros" element={<About />} />
            <Route path="/planes" element={<Plans />} />
            <Route path="/contacto" element={<Contact />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </SEOProvider>
  </React.StrictMode>
);