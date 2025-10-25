import { Request, Response } from "express";
import { db } from "../../store/memory";

export function list(req: Request, res: Response) {
  const campaignId = Number(req.params.id);
  res.json(db.candidates.filter(c => c.campaignId === campaignId));
}

export function add(req: Request, res: Response) {
  const campaignId = Number(req.params.id);
  const { name, bio, photoUrl } = req.body;
  const id = db.candidates.length ? db.candidates[db.candidates.length - 1].id + 1 : 1;
  db.candidates.push({ id, campaignId, name, bio, photoUrl });
  res.status(201).json({ id });
}