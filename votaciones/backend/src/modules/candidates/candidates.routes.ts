import { Router } from "express";
import * as ctrl from "./candidates.controller";
import { requireAuth, requireAdmin } from "../../middleware/auth";

const r = Router();
r.get("/campaigns/:id/candidates", requireAuth, ctrl.list);
r.post("/campaigns/:id/candidates", requireAuth, requireAdmin, ctrl.add);
export default r;