import { useState, useEffect } from "react";
import axios from "axios";
import { COMUNAS_RM } from "../data/comunas-rm";

const API_BASE = String(import.meta.env.VITE_API_BASE || "/api").replace(/\/+$/, "");
const CONTACT_EP = String(import.meta.env.VITE_CONTACT_ENDPOINT || "/leads");

export default function ContactForm({ initialMessage }: { initialMessage?: string }) {
  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    comuna: "",
    mensaje: initialMessage || "",
  });
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    if (initialMessage) {
      setForm((prevForm) => ({ ...prevForm, mensaje: initialMessage }));
    }
  }, [initialMessage]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (sending) return;

    if (!form.nombre.trim() || !form.correo.trim() || !form.mensaje.trim()) {
      setStatus("Completa nombre, correo y mensaje.");
      return;
    }
    const emailOk = /\S+@\S+\.\S+/.test(form.correo);
    if (!emailOk) {
      setStatus("Ingresa un correo válido.");
      return;
    }

    setSending(true);
    setStatus("Enviando…");
    try {
      const payload = {
        nombre: form.nombre.trim(),
        correo: form.correo.trim(),
        telefono: form.telefono.trim() || null,
        comuna: form.comuna || null,
        mensaje: form.mensaje.trim(),
        fuente: "web",
      };

      await axios.post(`${API_BASE}${CONTACT_EP}`, payload, {
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        timeout: 20000,
      });

      setStatus("¡Recibido! Te contactaremos pronto.");
      setForm({ nombre: "", correo: "", telefono: "", comuna: "", mensaje: "" });
    } catch (err: any) {
      const detail = err?.response?.data?.detail;
      console.error("Contact error:", err?.response?.status, detail || err?.message);
      setStatus("Hubo un problema. Intenta nuevamente.");
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
          value={form.nombre}
          onChange={(e) => setForm({ ...form, nombre: e.target.value })}
          placeholder="Tu nombre"
          autoComplete="name"
        />
      </div>

      <div>
        <label>Tu correo</label>
        <input
          required
          type="email"
          value={form.correo}
          onChange={(e) => setForm({ ...form, correo: e.target.value })}
          placeholder="tu@correo.cl"
          autoComplete="email"
          inputMode="email"
        />
      </div>

      <div>
        <label>Teléfono (opcional)</label>
        <input
          value={form.telefono}
          onChange={(e) => setForm({ ...form, telefono: e.target.value })}
          placeholder="+56 9 ..."
          autoComplete="tel"
          inputMode="tel"
        />
      </div>

      <div>
        <label>Comuna (opcional)</label>
        <select
          className="input-like"
          value={form.comuna}
          onChange={(e) => setForm({ ...form, comuna: e.target.value })}
        >
          <option value="">Selecciona tu comuna</option>
          {COMUNAS_RM.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <div style={{ gridColumn: "1 / -1" }}>
        <label>Cuéntanos tu problema</label>
        <textarea
          required
          rows={5}
          value={form.mensaje}
          onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
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
