import postgres from "postgres";

const connectionString = "postgresql://neondb_owner:npg_3nqjkzrFX8vN@ep-raspy-smoke-ap7s3j49-pooler.c-7.us-east-1.aws.neon.tech/neondb?sslmode=require";

// This file should ONLY be executed on the server.
// In TanStack Start, server functions will call this.
export const sql = postgres(connectionString, { ssl: "require" });
