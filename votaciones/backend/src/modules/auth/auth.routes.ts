import { Router } from "express";
import { register, login } from "./auth.controller";
const r = Router();
r.post("/auth/register", register);
r.post("/auth/login", login);
export default r;