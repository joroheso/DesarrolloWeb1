import dotenv from "dotenv";
dotenv.config();

export const env = {
  port: process.env.PORT || "4000",
  jwtSecret: process.env.JWT_SECRET || "supersecret",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "15m",
  useDb: (process.env.USE_DB || "false") === "true",
  dbUrl: process.env.DB_URL || "",
  nodeEnv: process.env.NODE_ENV || "development"
};