import "dotenv/config";
import { Config } from "drizzle-kit";
export default {
  schema: "./db/schema.ts",
  out: "./drizzle",
  // driver: "pglite",
  dialect: "postgresql",
  dbCredentials: { url: process.env.DATABASE_URL! },
} satisfies Config;
