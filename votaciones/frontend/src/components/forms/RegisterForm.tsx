import { useState } from "react";
import { apiFetch } from "../../services/api";

export default function RegisterForm() {
  const [form, setForm] = useState({ colegiado: "", dpi: "", nombre: "", email: "", fechaNacimiento: "", password: "" });
  const [msg, setMsg] = useState<string | null>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, [e.target.name]: e.target.value });
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try { await apiFetch("/auth/register", { method: "POST", body: JSON.stringify(form) }); setMsg("Registro exitoso. Inicia sesión."); }
    catch (err: any) { setMsg(err.message); }
  };

  return (
    <form className="card" onSubmit={submit}>
      <h3>Registro</h3>
      <input name="colegiado" placeholder="Número de colegiado" onChange={onChange} />
      <input name="dpi" placeholder="DPI (13 dígitos)" onChange={onChange} />
      <input name="nombre" placeholder="Nombre completo" onChange={onChange} />
      <input name="email" placeholder="Correo electrónico" onChange={onChange} />
      <input name="fechaNacimiento" type="date" onChange={onChange} />
      <input name="password" type="password" placeholder="Contraseña" onChange={onChange} />
      <button>Registrar</button>
      {msg && <p>{msg}</p>}
    </form>
  );
}