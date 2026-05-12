import postgres from "postgres";

// Use process.env.DATABASE_URL for the connection string
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL environment variable is not set");
}

// This file should ONLY be executed on the server.
// In TanStack Start, server functions will call this.
export const sql = postgres(connectionString, { ssl: "require" });
