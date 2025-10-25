import express from "express";
import cors from "cors";
import authRoutes from "./modules/auth/auth.routes";
import usersRoutes from "./modules/users/users.routes";
import campaignsRoutes from "./modules/campaigns/campaigns.routes";
import candidatesRoutes from "./modules/candidates/candidates.routes";
import votesRoutes from "./modules/votes/votes.routes";

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

app.get("/", (_req, res) => res.json({ ok: true }));

app.use(authRoutes);
app.use(usersRoutes);
app.use(campaignsRoutes);
app.use(candidatesRoutes);
app.use(votesRoutes);

export default app;