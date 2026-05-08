import { createServerFn } from "@tanstack/react-start";
import postgres from "postgres";

let sql: any;

async function getSql() {
  if (sql) return sql;
  
  // High-reliability environment variable retrieval
  const url = process.env.DATABASE_URL;
  
  if (!url) {
    console.error("CRITICAL: DATABASE_URL IS MISSING IN SERVER ENVIRONMENT");
    return null;
  }

  try {
    // We remove channel_binding for maximum compatibility with older drivers if needed
    const cleanUrl = url.split('&channel_binding=')[0];
    
    sql = postgres(cleanUrl, { 
      ssl: "require",
      max: 10,
      idle_timeout: 20,
      connect_timeout: 10,
      // Important for pooler connections
      prepare: false 
    });
    
    // Immediate handshake test
    await sql`SELECT 1`;
    console.log("DB HANDSHAKE SUCCESSFUL");
    return sql;
  } catch (e) {
    console.error("DB HANDSHAKE FAILED:", e);
    return null;
  }
}

// Optimized Data Fetchers
export const getAllProperties = createServerFn({ method: "GET" }).handler(async () => {
  const db = await getSql();
  if (!db) return null; // Return null to trigger 'OFFLINE' status
  try {
    return await db`SELECT * FROM properties ORDER BY id DESC`;
  } catch (e) {
    console.error("Fetch Properties Error:", e);
    return [];
  }
});

export const getAllPropertyTypes = createServerFn({ method: "GET" }).handler(async () => {
  const db = await getSql();
  if (!db) return [];
  try { return await db`SELECT * FROM property_types ORDER BY id ASC`; } catch (e) { return []; }
});

export const getAllAmenitiesMaster = createServerFn({ method: "GET" }).handler(async () => {
  const db = await getSql();
  if (!db) return [];
  try { return await db`SELECT * FROM amenities ORDER BY name ASC`; } catch (e) { return []; }
});

export const getAllLeads = createServerFn({ method: "GET" }).handler(async () => {
  const db = await getSql();
  if (!db) return [];
  try { return await db`SELECT * FROM leads ORDER BY id DESC`; } catch (e) { return []; }
});

// CRUD Operations
export const createProperty = createServerFn({ method: "POST" }).handler(async (p: any) => {
  const db = await getSql();
  if (!db) throw new Error("DB Offline");
  const slug = p.title.toLowerCase().replace(/ /g, "-") + "-" + Date.now();
  await db`INSERT INTO properties (title, slug, location, price, type, img) VALUES (${p.title}, ${slug}, ${p.location}, ${p.price}, ${p.type}, ${p.img})`;
  return { success: true };
});

export const deleteProperty = createServerFn({ method: "POST" }).handler(async (slug: string) => {
  const db = await getSql();
  if (!db) throw new Error("DB Offline");
  await db`DELETE FROM properties WHERE slug = ${slug}`;
  return { success: true };
});

export const createPropertyType = createServerFn({ method: "POST" }).handler(async (t: any) => {
  const db = await getSql();
  if (!db) throw new Error("DB Offline");
  await db`INSERT INTO property_types (name, slug) VALUES (${t.name}, ${t.name.toLowerCase()})`;
  return { success: true };
});

export const deletePropertyType = createServerFn({ method: "POST" }).handler(async (id: number) => {
  const db = await getSql();
  if (!db) throw new Error("DB Offline");
  await db`DELETE FROM property_types WHERE id = ${id}`;
  return { success: true };
});

export const createAmenity = createServerFn({ method: "POST" }).handler(async (a: any) => {
  const db = await getSql();
  if (!db) throw new Error("DB Offline");
  await db`INSERT INTO amenities (name) VALUES (${a.name})`;
  return { success: true };
});

export const deleteAmenity = createServerFn({ method: "POST" }).handler(async (id: number) => {
  const db = await getSql();
  if (!db) throw new Error("DB Offline");
  await db`DELETE FROM amenities WHERE id = ${id}`;
  return { success: true };
});

// Shims
export const getAllLaunches = getAllProperties;
export const getAllCommunities = getAllPropertyTypes;
export const getAllBlogs = createServerFn({ method: "GET" }).handler(() => []);
export const getAllTestimonials = createServerFn({ method: "GET" }).handler(() => []);
export const getAllFAQs = createServerFn({ method: "GET" }).handler(() => []);
