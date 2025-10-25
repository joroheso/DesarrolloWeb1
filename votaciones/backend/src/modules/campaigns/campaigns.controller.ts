import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// 📋 Listar todas las campañas
export async function list(req: Request, res: Response) {
  try {
    const campaigns = await prisma.campaign.findMany({
      orderBy: { id: "asc" }
    });
    res.json(campaigns);
  } catch (error) {
    console.error("Error al listar campañas:", error);
    res.status(500).json({ message: "Error al listar campañas" });
  }
}

// 🔍 Detalle de una campaña
export async function detail(req: Request, res: Response) {
  const id = Number(req.params.id);
  try {
    const campaign = await prisma.campaign.findUnique({
      where: { id }
    });
    if (!campaign) return res.status(404).json({ message: "No encontrada" });

    const userId = (req as any).user.id;
    const quota = await prisma.quota.findUnique({
      where: {
        voterId_campaignId: {
          voterId: userId,
          campaignId: id
        }
      }
    });

    res.json({ campaign, remainingVotes: quota?.remaining ?? 0 });
  } catch (error) {
    console.error("Error al obtener detalle:", error);
    res.status(500).json({ message: "Error al obtener detalle" });
  }
}

// 🆕 Crear una campaña
export async function create(req: Request, res: Response) {
  const { title, description, votesPerCampaign, startAt, endAt } = req.body;
  try {
    const campaign = await prisma.campaign.create({
      data: {
        title,
        description,
        votesPerCampaign,
        status: "disabled",
        startAt: new Date(startAt),
        endAt: new Date(endAt)
      }
    });
    res.status(201).json(campaign);
  } catch (error) {
    console.error("Error al crear campaña:", error);
    res.status(500).json({ message: "Error al crear campaña" });
  }
}

// ✏️ Actualizar campaña
export async function update(req: Request, res: Response) {
  const id = Number(req.params.id);
  try {
    const campaign = await prisma.campaign.update({
      where: { id },
      data: req.body
    });
    res.json(campaign);
  } catch (error) {
    console.error("Error al actualizar campaña:", error);
    res.status(500).json({ message: "Error al actualizar campaña" });
  }
}

// ✅ Habilitar campaña
export async function enable(req: Request, res: Response) {
  const id = Number(req.params.id);
  try {
    const campaign = await prisma.campaign.update({
      where: { id },
      data: { status: "enabled" }
    });

    const voters = await prisma.user.findMany({ where: { role: "voter" } });

    for (const voter of voters) {
      await prisma.quota.upsert({
        where: {
          voterId_campaignId: {
            voterId: voter.id,
            campaignId: id
          }
        },
        update: { remaining: campaign.votesPerCampaign },
        create: {
          voterId: voter.id,
          campaignId: id,
          remaining: campaign.votesPerCampaign
        }
      });
    }

    res.json({ message: "Campaña habilitada" });
  } catch (error) {
    console.error("Error al habilitar campaña:", error);
    res.status(500).json({ message: "Error al habilitar campaña" });
  }
}

// 🚫 Deshabilitar campaña
export async function disable(req: Request, res: Response) {
  const id = Number(req.params.id);
  try {
    await prisma.campaign.update({
      where: { id },
      data: { status: "disabled" }
    });
    res.json({ message: "Campaña deshabilitada" });
  } catch (error) {
    console.error("Error al deshabilitar campaña:", error);
    res.status(500).json({ message: "Error al deshabilitar campaña" });
  }
}

// 🛑 Cerrar campaña
export async function close(req: Request, res: Response) {
  const id = Number(req.params.id);
  try {
    await prisma.campaign.update({
      where: { id },
      data: { status: "closed" }
    });
    res.json({ message: "Campaña cerrada" });
  } catch (error) {
    console.error("Error al cerrar campaña:", error);
    res.status(500).json({ message: "Error al cerrar campaña" });
  }
}