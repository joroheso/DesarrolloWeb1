import { Router } from "express";
import * as ctrl from "./users.controller";
import { requireAuth, requireAdmin } from "../../middleware/auth";

const r = Router();
r.get("/users", requireAuth, requireAdmin, ctrl.getAllUsers);
r.get("/users/:id", requireAuth, ctrl.getUserById);
export default r;
