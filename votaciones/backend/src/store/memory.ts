type User = {
  id: number; colegiado: string; dpi: string; nombre: string; email: string;
  fechaNacimiento: string; passwordHash: string; role: "admin" | "voter";
};
type Campaign = {
  id: number; title: string; description: string; votesPerCampaign: number;
  status: "enabled" | "disabled" | "closed"; startAt?: string; endAt?: string;
};
type Candidate = { id: number; campaignId: number; name: string; bio: string; photoUrl?: string };
type Vote = { id: number; campaignId: number; candidateId: number; voterId: number; createdAt: string };
type Quota = { voterId: number; campaignId: number; remaining: number };

export const db = {
  users: [] as User[],
  campaigns: [] as Campaign[],
  candidates: [] as Candidate[],
  votes: [] as Vote[],
  quotas: [] as Quota[]
};

// Datos iniciales: un admin de prueba
import bcrypt from "bcryptjs";
(async () => {
  const hash = await bcrypt.hash("Admin1234!", 10);
  db.users.push({
    id: 1, colegiado: "000001", dpi: "1234567890123", nombre: "Admin",
    email: "admin@colegio.gt", fechaNacimiento: "1990-01-01", passwordHash: hash, role: "admin"
  });
})();