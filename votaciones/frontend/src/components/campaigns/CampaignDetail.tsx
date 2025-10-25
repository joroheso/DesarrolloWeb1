import { useEffect, useState } from "react";
import { apiFetch } from "../../services/api";
import ResultsChart from "./ResultsChart";

export default function CampaignDetail({ id }: { id: number }) {
  const [campaign, setCampaign] = useState<any>(null);
  const [candidates, setCandidates] = useState<any[]>([]);
  const [results, setResults] = useState<Record<string, number>>({});
  const [remaining, setRemaining] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<string>("");

  useEffect(() => {
    apiFetch(`/campaigns/${id}`).then(({ campaign, remainingVotes }) => {
      setCampaign(campaign); setRemaining(remainingVotes); updateTimeLeft(campaign.endAt);
    });
    apiFetch(`/campaigns/${id}/candidates`).then(setCandidates);
    const interval = setInterval(() => apiFetch(`/campaigns/${id}/results`).then(setResults), 3000);
    return () => clearInterval(interval);
  }, [id]);

  function updateTimeLeft(endAt?: string) {
    if (!endAt) { setTimeLeft("Sin fin definido"); return; }
    const end = new Date(endAt).getTime();
    const tick = () => {
      const diff = end - Date.now();
      if (diff <= 0) setTimeLeft("Finalizada");
      else {
        const m = Math.floor(diff / 60000), s = Math.floor((diff % 60000) / 1000);
        setTimeLeft(`${m}m ${s}s`); requestAnimationFrame(tick);
      }
    };
    tick();
  }

  async function votar(candidateId: number) {
    await apiFetch(`/campaigns/${id}/vote`, { method: "POST", body: JSON.stringify({ candidateId }) });
    const r = await apiFetch(`/campaigns/${id}/results`); setResults(r);
    const d = await apiFetch(`/campaigns/${id}`); setRemaining(d.remainingVotes);
  }

  return (
    <div className="card">
      <h2>{campaign?.title}</h2>
      <p>{campaign?.description}</p>
      <p><strong>Estado:</strong> {campaign?.status} | <strong>Tiempo restante:</strong> {timeLeft}</p>
      <p><strong>Votos disponibles:</strong> {remaining}</p>
      <div>
        {candidates.map(c => (
          <div key={c.id} className="card">
            <h4>{c.name}</h4>
            <p>{c.bio}</p>
            <button disabled={campaign?.status !== "enabled" || remaining <= 0} onClick={() => votar(c.id)}>Votar</button>
          </div>
        ))}
      </div>
      <ResultsChart data={results} />
    </div>
  );
}