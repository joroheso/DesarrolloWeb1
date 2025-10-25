import { Request, Response } from "express";
import { db } from "../../store/memory";

export function vote(req: Request, res: Response) {
  const userId = (req as any).user.id;
  const campaignId = Number(req.params.id);
  const { candidateId } = req.body;

  const c = db.campaigns.find(c => c.id === campaignId);
  if (!c || c.status !== "enabled") return res.status(400).json({ message: "Campaña no habilitada" });

  const quota = db.quotas.find(q => q.voterId === userId && q.campaignId === campaignId);
  if (!quota || quota.remaining <= 0) return res.status(400).json({ message: "Sin votos disponibles" });

  db.votes.push({ id: db.votes.length + 1, campaignId, candidateId, voterId: userId, createdAt: new Date().toISOString() });
  quota.remaining -= 1;

  const results = resultsByCampaign(campaignId);
  res.json({ message: "Voto registrado", results });
}

export function results(req: Request, res: Response) {
  const campaignId = Number(req.params.id);
  res.json(resultsByCampaign(campaignId));
}

function resultsByCampaign(campaignId: number): Record<string, number> {
  const candidates = db.candidates.filter(c => c.campaignId === campaignId);
  const counts: Record<string, number> = {};
  candidates.forEach(c => {
    counts[c.name] = db.votes.filter(v => v.campaignId === campaignId && v.candidateId === c.id).length;
  });
  return counts;
}