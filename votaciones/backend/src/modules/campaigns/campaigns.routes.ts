import { Router } from "express";
import * as ctrl from "./campaigns.controller";
import { requireAuth, requireAdmin } from "../../middleware/auth";

const r = Router();
r.get("/campaigns", requireAuth, ctrl.list);
r.get("/campaigns/:id", requireAuth, ctrl.detail);
r.post("/campaigns", requireAuth, requireAdmin, ctrl.create);
r.put("/campaigns/:id", requireAuth, requireAdmin, ctrl.update);
r.post("/campaigns/:id/enable", requireAuth, requireAdmin, ctrl.enable);
r.post("/campaigns/:id/disable", requireAuth, requireAdmin, ctrl.disable);
r.post("/campaigns/:id/close", requireAuth, requireAdmin, ctrl.close);
export default r;