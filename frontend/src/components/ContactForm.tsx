// frontend/src/components/ContactForm.tsx
import { useState } from "react";
import axios from "axios";

// Toma cualquiera de las dos vars si existen, si no usa /api
const API_BASE_RAW =
  (import.meta.env as any).VITE_API_URL ||
  (import.meta.env as any).VITE_API_BASE ||
  "/api";

// Normaliza (quita / final) para evitar //leads
const BASE = String(API_BASE_RAW).replace(/\/$/, "");
const CONTACT_EP =
  (import.meta.env as any).VITE_CONTACT_ENDPOINT || "/leads";

type FormState = {
  name: string;
  email: string;
  phone: string;
  city: string;
  message: string;
};

export default function ContactForm() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    city: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  function onChange<K extends keyof FormState>(key: K, val: FormState[K]) {
    setForm((f) => ({ ...f, [key]: val }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (sending) return;

    // Validaciones rápidas
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus("Completa nombre, correo y mensaje.");
      return;
    }
    const emailOk = /\S+@\S+\.\S+/.test(form.email);
    if (!emailOk) {
      setStatus("Ingresa un correo válido.");
      return;
    }

    setSending(true);
    setStatus("Enviando…");

    try {
      // El backend espera alias en español
      const payload = {
        nombre: form.name.trim(),
        correo: form.email.trim(),
        telefono: form.phone.trim() || null,
        ciudad: form.city.trim() || null,
        mensaje: form.message.trim(),
        source: "web",
      };

      await axios.post(`${BASE}${CONTACT_EP}`, payload, {
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        timeout: 20000,
      });

      setStatus("¡Recibido! Te contactaremos pronto.");
      setForm({ name: "", email: "", phone: "", city: "", message: "" });
    } catch (err: any) {
      const detail = err?.response?.data?.detail;
      console.error("Contact error:", err?.response?.status, detail || err?.message);
      setStatus(
        detail
          ? `Error: ${typeof detail === "string" ? detail : JSON.stringify(detail)}`
          : "Hubo un problema. Intenta nuevamente."
      );
    } finally {
      setSending(false);
    }
  }

  return (
    <form onSubmit={submit} className="cols" noValidate>
      <div>
        <label>Tu nombre</label>
        <input
          required
          value={form.name}
          onChange={(e) => onChange("name", e.target.value)}
          placeholder="Tu nombre"
          autoComplete="name"
        />
      </div>

      <div>
        <label>Tu correo</label>
        <input
          required
          type="email"
          value={form.email}
          onChange={(e) => onChange("email", e.target.value)}
          placeholder="tu@correo.cl"
          autoComplete="email"
          inputMode="email"
        />
      </div>

      <div>
        <label>Teléfono (opcional)</label>
        <input
          value={form.phone}
          onChange={(e) => onChange("phone", e.target.value)}
          placeholder="+56 9 ..."
          autoComplete="tel"
          inputMode="tel"
        />
      </div>

      <div>
        <label>Ciudad (opcional)</label>
        <input
          value={form.city}
          onChange={(e) => onChange("city", e.target.value)}
          placeholder="Santiago"
          autoComplete="address-level2"
        />
      </div>

      <div style={{ gridColumn: "1 / -1" }}>
        <label>Cuéntanos tu problema</label>
        <textarea
          required
          rows={5}
          value={form.message}
          onChange={(e) => onChange("message", e.target.value)}
          placeholder="Describe brevemente el problema…"
        />
      </div>

      <div
        style={{
          gridColumn: "1 / -1",
          display: "flex",
          gap: 12,
          alignItems: "center",
        }}
      >
        <button
          type="submit"
          className="btn"
          disabled={sending}
          style={{
            background: "#0ea5e9",
            width: "100%",
            padding: "12px 16px",
            fontWeight: 600,
            borderRadius: 12,
            boxShadow: "0 6px 20px -8px rgba(2,6,23,.25)",
            opacity: sending ? 0.8 : 1,
            cursor: sending ? "not-allowed" : "pointer",
            transition: "transform .06s ease",
          }}
          onMouseDown={(e) => (e.currentTarget.style.transform = "scale(.99)")}
          onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          {sending ? "Enviando…" : "Solicitar soporte"}
        </button>

        {status && (
          <span className="muted" aria-live="polite">
            {status}
          </span>
        )}
      </div>
    </form>
  );
}