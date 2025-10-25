import { useEffect, useState } from "react";
import { apiFetch } from "../services/api";

export default function Admin() {
  const [form, setForm] = useState({ title: "", description: "", votesPerCampaign: 1, startAt: "", endAt: "" });
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [candidate, setCandidate] = useState({ name: "", bio: "" });

  useEffect(() => { apiFetch("/campaigns").then(setCampaigns); }, []);
  async function crearCampaña(e: React.FormEvent) {
    e.preventDefault();
    await apiFetch("/campaigns", { method: "POST", body: JSON.stringify(form) });
    const list = await apiFetch("/campaigns"); setCampaigns(list);
  }
  async function habilitar(id: number) { await apiFetch(`/campaigns/${id}/enable`, { method: "POST" }); const list = await apiFetch("/campaigns"); setCampaigns(list); }
  async function deshabilitar(id: number) { await apiFetch(`/campaigns/${id}/disable`, { method: "POST" }); const list = await apiFetch("/campaigns"); setCampaigns(list); }
  async function cerrar(id: number) { await apiFetch(`/campaigns/${id}/close`, { method: "POST" }); const list = await apiFetch("/campaigns"); setCampaigns(list); }
  async function agregarCandidato(e: React.FormEvent) {
    e.preventDefault();
    if (!selected) return;
    await apiFetch(`/campaigns/${selected}/candidates`, { method: "POST", body: JSON.stringify(candidate) });
    setCandidate({ name: "", bio: "" });
  }

  return (
    <div className="container">
      <h2>Panel admin</h2>
      <form className="card" onSubmit={crearCampaña}>
        <h3>Nueva campaña</h3>
        <input placeholder="Título" onChange={e => setForm({ ...form, title: e.target.value })} />
        <textarea placeholder="Descripción" onChange={e => setForm({ ...form, description: e.target.value })} />
        <input type="number" placeholder="Votos por campaña" value={form.votesPerCampaign}
          onChange={e => setForm({ ...form, votesPerCampaign: Number(e.target.value) })} />
        <input type="datetime-local" onChange={e => setForm({ ...form, startAt: e.target.value })} />
        <input type="datetime-local" onChange={e => setForm({ ...form, endAt: e.target.value })} />
        <button>Crear</button>
      </form>

      <div className="card">
        <h3>Campañas</h3>
        {campaigns.map(c => (
          <div key={c.id} className="card">
            <strong>{c.title}</strong> — {c.status}
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => habilitar(c.id)}>Habilitar</button>
              <button onClick={() => deshabilitar(c.id)}>Deshabilitar</button>
              <button onClick={() => cerrar(c.id)}>Cerrar</button>
            </div>
            <button onClick={() => setSelected(c.id)}>Agregar candidatos</button>
          </div>
        ))}
        {selected && (
          <form onSubmit={agregarCandidato}>
            <h4>Agregar candidato a campaña {selected}</h4>
            <input placeholder="Nombre" value={candidate.name} onChange={e => setCandidate({ ...candidate, name: e.target.value })} />
            <input placeholder="Bio" value={candidate.bio} onChange={e => setCandidate({ ...candidate, bio: e.target.value })} />
            <button>Agregar</button>
          </form>
        )}
      </div>
    </div>
  );
}