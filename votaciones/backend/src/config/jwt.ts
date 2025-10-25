import jwt, { JwtPayload, SignOptions, Secret } from "jsonwebtoken";
import { env } from "./env";

export function signToken(payload: Record<string, any>) {
  // 👇 Forzamos a que TypeScript entienda que es un StringValue válido
  const options: SignOptions = { expiresIn: env.jwtExpiresIn as any };
  return jwt.sign(payload, env.jwtSecret as Secret, options);
}

export function verifyToken(token: string): JwtPayload {
  return jwt.verify(token, env.jwtSecret as Secret) as JwtPayload;
}