import { Request, Response } from "express";
import { db } from "../../store/memory";

export function getAllUsers(req: Request, res: Response) {
  res.json(db.users.map(u => ({ id: u.id, nombre: u.nombre, role: u.role, colegiado: u.colegiado })));
}

export function getUserById(req: Request, res: Response) {
  const id = Number(req.params.id);
  const u = db.users.find(u => u.id === id);
  if (!u) return res.status(404).json({ message: "No encontrado" });
  res.json({ id: u.id, nombre: u.nombre, role: u.role, colegiado: u.colegiado });
}