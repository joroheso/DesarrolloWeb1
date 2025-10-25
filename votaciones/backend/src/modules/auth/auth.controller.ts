import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { signToken } from "../../config/jwt";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export async function register(req: Request, res: Response) {

  const { colegiado, dpi, nombre, email, fechaNacimiento, password } = req.body;

  // Verificar si el usuario ya existe
  const existing = await prisma.user.findFirst({
    where: {
      OR: [
        { colegiado },
        { dpi },
        { email }
      ]
    }
  });

  if (existing) {
    return res.status(400).json({ message: "Usuario ya registrado" });
  }

  // Hashear la contraseña
  const hash = await bcrypt.hash(password, 10);

  // Crear el usuario
  const user = await prisma.user.create({
    data: {
      colegiado,
      dpi,
      nombre,
      email,
      fechaNacimiento: new Date(fechaNacimiento),
      passwordHash: hash,
      role: "voter"
    }
  });

  res.status(201).json({ id: user.id, nombre: user.nombre });
}

export async function login(req: Request, res: Response) {

  const { colegiado, dpi, fechaNacimiento, password } = req.body;

  const user = await prisma.user.findFirst({
    where: {
      colegiado,
      dpi,
      fechaNacimiento: new Date(fechaNacimiento)
    }
  });

  if (!user) {
    return res.status(401).json({ message: "Credenciales inválidas" });
  }

  const match = await bcrypt.compare(password, user.passwordHash);
  if (!match) {
    return res.status(401).json({ message: "Contraseña incorrecta" });
  }

  const token = signToken({ userId: user.id, role: user.role });
  res.json({ token, user: { id: user.id, nombre: user.nombre, role: user.role } });
}