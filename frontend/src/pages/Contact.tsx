import { SEO } from "../components/SEO";
import ContactForm from "../components/ContactForm"; // usa tu formulario actual

export default function Contact() {
  return (
    <section className="max-w-5xl mx-auto px-4 py-12">
      <SEO title="Contacto | FixPC" description="Solicita soporte técnico para tu computador." />
      <h1 className="text-3xl font-bold mb-6">Contáctanos</h1>
      <p className="mb-6 text-slate-600">Completa el formulario y te responderemos a la brevedad.</p>
      <ContactForm />
    </section>
  );
}