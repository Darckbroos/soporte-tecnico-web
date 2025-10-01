import { useState } from "react";
import axios from "axios";

const API_BASE_RAW =
  (import.meta.env as any).VITE_API_URL ||
  (import.meta.env as any).VITE_API_BASE ||
  "/api";
const API_BASE = String(API_BASE_RAW).replace(/\/$/, ""); // sin slash final

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (sending) return;
    setSending(true);
    setStatus("Enviando…");
    try {
      await axios.post(`${API_BASE}/leads`, { ...form, source: "contacto" });
      setStatus("¡Recibido! Te contactaremos pronto.");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch {
      setStatus("Hubo un problema. Intenta nuevamente.");
    } finally {
      setSending(false);
    }
  }

  return (
    <form onSubmit={submit} className="cols">
      <div>
        <label>Tu nombre</label>
        <input
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Tu nombre"
        />
      </div>
      <div>
        <label>Tu correo</label>
        <input
          required
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="tu@correo.cl"
        />
      </div>
      <div>
        <label>Teléfono (opcional)</label>
        <input
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          placeholder="+56 9 ..."
        />
      </div>
      <div style={{ gridColumn: "1 / -1" }}>
        <label>Cuéntanos tu problema</label>
        <textarea
          required
          rows={5}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder="Describe brevemente el problema…"
        />
      </div>

      {/* Botón bonito y consistente */}
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
            width: "100%",            // ocupa todo el ancho de la card
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

        {status && <span className="muted" aria-live="polite">{status}</span>}
      </div>
    </form>
  );
}