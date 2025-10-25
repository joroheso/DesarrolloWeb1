import { Router } from "express";
import * as ctrl from "./votes.controller";
import { requireAuth } from "../../middleware/auth";

const r = Router();
r.post("/campaigns/:id/vote", requireAuth, ctrl.vote);
r.get("/campaigns/:id/results", requireAuth, ctrl.results);
export default r;