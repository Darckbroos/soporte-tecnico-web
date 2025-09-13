import { useState } from "react";

type Props = { defaultMessage?: string };

export default function ContactForm({ defaultMessage = "" }: Props) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setOk(null); setErr(null);
    try {
      const api = (import.meta as any).env?.VITE_API_URL ?? "/api";
      const res = await fetch(`${api}/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          message: [defaultMessage, form.message].filter(Boolean).join("\n"),
        }),
      });
      if (!res.ok) throw new Error("No se pudo enviar el formulario.");
      setOk("¡Gracias! Te contactaremos pronto.");
      setForm({ name:"", email:"", phone:"", message:"" });
    } catch (e:any) {
      setErr(e.message || "Ocurrió un problema. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="space-y-3">
      <input className="w-full border rounded-xl px-3 py-2" required
             name="name" placeholder="Tu nombre" value={form.name} onChange={handle}/>
      <input className="w-full border rounded-xl px-3 py-2" required type="email"
             name="email" placeholder="Tu correo" value={form.email} onChange={handle}/>
      <input className="w-full border rounded-xl px-3 py-2"
             name="phone" placeholder="Teléfono (opcional)" value={form.phone} onChange={handle}/>
      <textarea className="w-full border rounded-xl px-3 py-2" required rows={4}
                name="message" placeholder="Cuéntanos tu problema" value={form.message} onChange={handle}/>
      <button disabled={loading}
              className="bg-sky-500 hover:bg-sky-600 disabled:opacity-60 text-white px-4 py-2 rounded-xl">
        {loading ? "Enviando..." : "Solicitar soporte"}
      </button>
      {ok && <p className="text-green-700">{ok}</p>}
      {err && <p className="text-red-700">{err}</p>}
    </form>
  );
}