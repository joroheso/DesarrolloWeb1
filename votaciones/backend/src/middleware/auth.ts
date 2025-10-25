import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../config/jwt";

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token requerido" });
  }
  const token = header.split(" ")[1];
  try {
    const decoded = verifyToken(token) as any;
    (req as any).user = { id: decoded.userId, role: decoded.role };
    next();
  } catch {
    return res.status(401).json({ message: "Token inválido o expirado" });
  }
}

export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const user = (req as any).user;
  if (user?.role !== "admin") {
    return res.status(403).json({ message: "Acceso solo para administradores" });
  }
  next();
}