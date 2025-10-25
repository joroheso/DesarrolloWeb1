import { useContext, useState } from "react";
import { apiFetch } from "../../services/api";
import { AuthContext } from "../../context/AuthContext";

export default function LoginForm() {
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ colegiado: "", dpi: "", fechaNacimiento: "", password: "" });
  const [msg, setMsg] = useState<string | null>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, [e.target.name]: e.target.value });
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await apiFetch("/auth/login", { method: "POST", body: JSON.stringify(form) });
      login(data.token, data.user);
      window.location.href = "/campaigns";
    } catch (err: any) { setMsg("Credenciales inválidas"); }
  };

  return (
    <form className="card" onSubmit={submit}>
      <h3>Acceder</h3>
      <input name="colegiado" placeholder="Número de colegiado" onChange={onChange} />
      <input name="dpi" placeholder="DPI" onChange={onChange} />
      <input name="fechaNacimiento" type="date" onChange={onChange} />
      <input name="password" type="password" placeholder="Contraseña" onChange={onChange} />
      <button>Ingresar</button>
      {msg && <p>{msg}</p>}
    </form>
  );
}