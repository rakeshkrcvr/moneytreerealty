import { createServerFn } from "@tanstack/react-start";
import postgres from "postgres";

let sql: any;

const BACKUP_URL = "postgresql://neondb_owner:npg_3nqjkzrFX8vN@ep-raspy-smoke-ap7s3j49-pooler.c-7.us-east-1.aws.neon.tech/neondb?sslmode=require";

async function getSql() {
  if (sql) return sql;
  
  const url = process.env.DATABASE_URL || BACKUP_URL;
  
  try {
    sql = postgres(url, { 
      ssl: "require",
      max: 10,
      prepare: false,
      idle_timeout: 20
    });
    
    await sql`SELECT 1`;
    return sql;
  } catch (e) {
    console.error("DB CONNECTION FAILED:", e);
    return null;
  }
}

// Optimized Data Fetchers with Safe Serialization (Fix for TanStack Start Serialization Error)
export const getAllProperties = createServerFn({ method: "GET" }).handler(async () => {
  const db = await getSql();
  if (!db) return [];
  try {
    const res = await db`SELECT * FROM properties ORDER BY id DESC`;
    // CRITICAL FIX: Convert postgres Result object to plain Array of Objects
    return res.map((row: any) => ({ ...row }));
  } catch (e) {
    return [];
  }
});

export const getAllPropertyTypes = createServerFn({ method: "GET" }).handler(async () => {
  const db = await getSql();
  if (!db) return [];
  try { 
    const res = await db`SELECT * FROM property_types ORDER BY id ASC`; 
    return res.map((row: any) => ({ ...row }));
  } catch (e) { return []; }
});
export const getSiteSettings = createServerFn({ method: "GET" }).handler(async () => {
  const db = await getSql();
  if (!db) return null;
  try {
    const res = await db`SELECT * FROM site_settings WHERE id = 1 LIMIT 1`;
    return res[0] || null;
  } catch (e) {
    return null;
  }
});

export const getAllDevelopers = createServerFn({ method: "GET" }).handler(async () => {
  const db = await getSql();
  if (!db) return [];
  try {
    const res = await db`SELECT * FROM developers ORDER BY name ASC`;
    return res.map((row: any) => ({ ...row }));
  } catch (e) {
    return [];
  }
});

export const createDeveloper = createServerFn({ method: "POST" }).handler(async ({ data }: { data: any }) => {
  const db = await getSql();
  if (!db) throw new Error("DB Error");
  const slug = data.name.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
  await db`INSERT INTO developers (name, slug, logo_url, about) VALUES (${data.name}, ${slug}, ${data.logo_url}, ${data.about})`;
  return { success: true };
});

export const updateDeveloper = createServerFn({ method: "POST" }).handler(async ({ data }: { data: any }) => {
  const db = await getSql();
  if (!db) throw new Error("DB Error");
  await db`UPDATE developers SET name = ${data.name}, logo_url = ${data.logo_url}, about = ${data.about} WHERE id = ${data.id}`;
  return { success: true };
});

export const deleteDeveloper = createServerFn({ method: "POST" }).handler(async ({ data: id }: { data: number }) => {
  const db = await getSql();
  if (!db) throw new Error("DB Error");
  await db`DELETE FROM developers WHERE id = ${id}`;
  return { success: true };
});

export const updateSiteSettings = createServerFn({ method: "POST" }).handler(async ({ data }: { data: any }) => {
  const db = await getSql();
  if (!db) throw new Error("DB Error");
  await db`UPDATE site_settings SET 
    logo_url = ${data.logo_url}, 
    logo_url_light = ${data.logo_url_light}, 
    theme_color = ${data.theme_color}, 
    email = ${data.email}, 
    phone = ${data.phone}, 
    whatsapp = ${data.whatsapp} 
    WHERE id = 1`;
  return { success: true };
});

export const getAllAmenitiesMaster = createServerFn({ method: "GET" }).handler(async () => {
  const db = await getSql();
  if (!db) return [];
  try { 
    const res = await db`SELECT * FROM amenities ORDER BY name ASC`; 
    return res.map((row: any) => ({ ...row }));
  } catch (e) { return []; }
});

export const getAllLeads = createServerFn({ method: "GET" }).handler(async () => {
  const db = await getSql();
  if (!db) return [];
  try { 
    const res = await db`SELECT * FROM leads ORDER BY id DESC`; 
    return res.map((row: any) => ({ ...row }));
  } catch (e) {
    console.error("GET ALL LEADS ERROR:", e);
    return [];
  }
});

// CRUD Operations
export const createProperty = createServerFn({ method: "POST" }).handler(async ({ data: p }: { data: any }) => {
  const db = await getSql();
  if (!db) throw new Error("DB Error");
  const slug = p.title.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
  await db`INSERT INTO properties (
             title, slug, location, price, type, category, img, description,
             status, gallery, video_url, bedrooms, bathrooms, area, 
             floor_number, furnishing, amenities_ids, map_location, 
             nearby_places, agent_name, agent_phone, agent_image, floor_plan_img, floor_plans,
             developer_id
           ) 
           VALUES (
             ${p.title}, ${slug}, ${p.location}, ${p.price}, ${p.type}, ${p.category || 'Residential'}, ${p.img}, ${p.description},
             ${p.status || 'Sale'}, ${JSON.stringify(p.gallery || [])}, ${p.video_url || ''}, ${p.bedrooms || 0}, ${p.bathrooms || 0}, ${p.area || ''},
             ${p.floor_number || ''}, ${p.furnishing || 'Unfurnished'}, ${p.amenities_ids || []}, ${p.map_location || ''},
             ${JSON.stringify(p.nearby_places || [])}, ${p.agent_name || ''}, ${p.agent_phone || ''}, ${p.agent_image || ''},
             ${p.floor_plan_img || ''}, ${JSON.stringify(p.floor_plans || [])},
             ${p.developer_id || null}
           )`;
  return { success: true };
});

export const updateProperty = createServerFn({ method: "POST" }).handler(async ({ data: p }: { data: any }) => {
  console.log("updateProperty called with:", p);
  const db = await getSql();
  if (!db) throw new Error("DB Error");
  
  try {
    await db`UPDATE properties SET 
             title = ${p.title}, 
             location = ${p.location}, 
             price = ${p.price}, 
             type = ${p.type}, 
             img = ${p.img}, 
             description = ${p.description},
             status = ${p.status},
             gallery = ${JSON.stringify(p.gallery || [])},
             video_url = ${p.video_url || ""},
             bedrooms = ${Number(p.bedrooms) || 0},
             bathrooms = ${Number(p.bathrooms) || 0},
             area = ${p.area || ""},
             floor_number = ${p.floor_number || ""},
             furnishing = ${p.furnishing || "Unfurnished"},
             amenities_ids = ${p.amenities_ids || []},
             map_location = ${p.map_location || ""},
             nearby_places = ${JSON.stringify(p.nearby_places || [])},
             agent_name = ${p.agent_name || ""},
             agent_phone = ${p.agent_phone || ""},
             agent_image = ${p.agent_image || ""},
             floor_plan_img = ${p.floor_plan_img || ""},
             floor_plans = ${JSON.stringify(p.floor_plans || [])},
             developer_id = ${p.developer_id || null}
             WHERE id = ${p.id}`;
    console.log("Update success for ID:", p.id);
    return { success: true };
  } catch (e) {
    console.error("UPDATE PROPERTY FAILED:", e);
    throw e;
  }
});

export const deleteProperty = createServerFn({ method: "POST" }).handler(async ({ data: slug }: { data: string }) => {
  const db = await getSql();
  if (!db) throw new Error("DB Error");
  await db`DELETE FROM properties WHERE slug = ${slug}`;
  return { success: true };
});

export const createPropertyType = createServerFn({ method: "POST" }).handler(async ({ data: t }: { data: any }) => {
  const db = await getSql();
  if (!db) throw new Error("DB Error");
  const slug = t.name.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
  await db`INSERT INTO property_types (name, slug, category, img) VALUES (${t.name}, ${slug}, ${t.category || 'Residential'}, ${t.img || ''})`;
  return { success: true };
});

export const updatePropertyType = createServerFn({ method: "POST" }).handler(async ({ id, name, category, img }: { id: any, name: string, category: string, img: string }) => {
  const db = await getSql();
  if (!db) throw new Error("DB Error");
  await db`UPDATE property_types SET name = ${name}, category = ${category}, img = ${img} WHERE id = ${id}`;
  return { success: true };
});

export const bulkUpdatePropertyTypes = createServerFn({ method: "POST" }).handler(async ({ data: types }: { data: any[] }) => {
  const db = await getSql();
  if (!db) throw new Error("DB Error");
  
  try {
    await db.begin(async (sql) => {
      for (const t of types) {
        await sql`UPDATE property_types SET name = ${t.name}, category = ${t.category}, img = ${t.img} WHERE id = ${t.id}`;
      }
    });
    return { success: true };
  } catch (e) {
    console.error("BULK UPDATE FAILED:", e);
    throw e;
  }
});

export const deletePropertyType = createServerFn({ method: "POST" }).handler(async ({ data: id }: { data: number }) => {
  const db = await getSql();
  if (!db) throw new Error("DB Error");
  await db`DELETE FROM property_types WHERE id = ${id}`;
  return { success: true };
});

export const createAmenity = createServerFn({ method: "POST" }).handler(async ({ data: a }: { data: any }) => {
  const db = await getSql();
  if (!db) throw new Error("DB Error");
  await db`INSERT INTO amenities (name, icon) VALUES (${a.name}, ${a.icon})`;
  return { success: true };
});

export const updateAmenity = createServerFn({ method: "POST" }).handler(async ({ data: a }: { data: any }) => {
  const db = await getSql();
  if (!db) throw new Error("DB Error");
  await db`UPDATE amenities SET name = ${a.name}, icon = ${a.icon} WHERE id = ${a.id}`;
  return { success: true };
});

export const deleteAmenity = createServerFn({ method: "POST" }).handler(async ({ data: id }: { data: number }) => {
  const db = await getSql();
  if (!db) throw new Error("DB Error");
  await db`DELETE FROM amenities WHERE id = ${id}`;
  return { success: true };
});

// Shims
export const getAllLaunches = getAllProperties;
export const getAllCommunities = createServerFn({ method: "GET" }).handler(async () => {
  const db = await getSql();
  if (!db) return [];
  try { 
    const res = await db`SELECT * FROM communities ORDER BY title ASC`; 
    return res.map((row: any) => ({ ...row }));
  } catch (e) { return []; }
});

export const getAllBlogs = createServerFn({ method: "GET" }).handler(async () => {
  const db = await getSql();
  if (!db) return [];
  try {
    const res = await db`SELECT * FROM blogs ORDER BY date DESC`;
    return res.map((r: any) => ({ ...r }));
  } catch (e) { return []; }
});

export const createBlog = createServerFn({ method: "POST" }).handler(async ({ data }: { data: any }) => {
  const db = await getSql();
  if (!db) throw new Error("Offline");
  const slug = data.title.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
  try {
    await db`INSERT INTO blogs (title, slug, date, img, cat, content, excerpt, author) 
             VALUES (${data.title}, ${slug}, ${new Date().toISOString()}, ${data.img}, ${data.cat}, ${data.content}, ${data.excerpt}, ${data.author || 'Admin'})`;
    return { success: true };
  } catch (e) {
    console.error("Blog creation failed:", e);
    return { success: false };
  }
});

export const updateBlog = createServerFn({ method: "POST" }).handler(async ({ data }: { data: any }) => {
  const db = await getSql();
  if (!db) throw new Error("Offline");
  try {
    await db`UPDATE blogs SET 
             title = ${data.title}, 
             img = ${data.img}, 
             cat = ${data.cat}, 
             content = ${data.content}, 
             excerpt = ${data.excerpt}, 
             author = ${data.author} 
             WHERE id = ${data.id}`;
    return { success: true };
  } catch (e) {
    console.error("Blog update failed:", e);
    return { success: false };
  }
});

export const deleteBlog = createServerFn({ method: "POST" }).handler(async ({ data: id }: { data: number }) => {
  const db = await getSql();
  if (!db) throw new Error("Offline");
  try {
    await db`DELETE FROM blogs WHERE id = ${id}`;
    return { success: true };
  } catch (e) {
    console.error("Blog deletion failed:", e);
    return { success: false };
  }
});

export const getAllTestimonials = createServerFn({ method: "GET" }).handler(async () => {
  const db = await getSql();
  if (!db) return [];
  try {
    const res = await db`SELECT * FROM testimonials ORDER BY id DESC`;
    return res.map((r: any) => ({ ...r }));
  } catch (e) { return []; }
});

export const getAllFAQs = createServerFn({ method: "GET" }).handler(async () => {
  const db = await getSql();
  if (!db) return [];
  try {
    const res = await db`SELECT * FROM faqs ORDER BY id ASC`;
    return res.map((r: any) => ({ ...r }));
  } catch (e) { return []; }
});

export const getLaunchBySlug = createServerFn({ method: "GET" })
  .handler(async ({ data: slug }) => {
    console.log("getLaunchBySlug called with slug:", slug);
    
    const sql = await getSql();
    if (!sql || !slug) return null;
    
    try {
      const rows = await sql`
        SELECT p.*, d.name as developer_name, d.logo_url as developer_logo, d.about as developer_about
        FROM properties p
        LEFT JOIN developers d ON p.developer_id = d.id
        WHERE p.slug = ${slug} 
        LIMIT 1
      `;
      if (!rows[0]) return null;
      return JSON.parse(JSON.stringify(rows[0]));
    } catch (e) {
      console.error("Error fetching property:", e);
      return null;
    }
  });

export const createLead = createServerFn({ method: "POST" }).handler(async ({ data }: { data: any }) => {
  const db = await getSql();
  if (!db) throw new Error("Offline");
  try {
    await db`INSERT INTO leads (name, email, phone, property_slug) 
             VALUES (${data.name}, ${data.email}, ${data.phone}, ${data.source || data.property_slug || 'General'})`;
    return { success: true };
  } catch (e) {
    console.error("Lead creation failed:", e);
    return { success: false };
  }
});

export const updateLead = createServerFn({ method: "POST" }).handler(async ({ data }: { data: any }) => {
  const db = await getSql();
  if (!db) throw new Error("Offline");
  try {
    await db`UPDATE leads SET remark = ${data.remark} WHERE id = ${data.id}`;
    return { success: true };
  } catch (e) {
    console.error("Lead update failed:", e);
    return { success: false };
  }
});

export const getCommunityBySlug = createServerFn({ method: "GET" }).handler(async (slug: string) => {
  const db = await getSql();
  if (!db) return null;
  try {
    const res = await db`SELECT * FROM communities WHERE slug = ${slug} LIMIT 1`;
    return res.length ? { ...res[0] } : null;
  } catch (e) {
    return null;
  }
});

export const getProjectsInCommunity = createServerFn({ method: "GET" }).handler(async (slug: string) => {
  const db = await getSql();
  if (!db) return { active: [], handedOver: [] };
  try {
    // 1. Get community title from slug
    const comm = await db`SELECT title FROM communities WHERE slug = ${slug} LIMIT 1`;
    if (!comm.length) return { active: [], handedOver: [] };
    
    // 2. Fetch properties in this community (location = title)
    const res = await db`SELECT * FROM properties WHERE location = ${comm[0].title}`;
    const all = res.map((r: any) => ({ ...r }));
    
    return {
      active: all.filter((p: any) => p.handover !== 'Ready'),
      handedOver: all.filter((p: any) => p.handover === 'Ready')
    };
  } catch (e) {
    console.error("Error fetching projects in community:", e);
    return { active: [], handedOver: [] };
  }
});
export const uploadImage = createServerFn({ method: "POST" }).handler(async ({ data }: { data: { base64: string, fileName: string } }) => {
  try {
    const { base64, fileName } = data;
    const fs = await import("node:fs/promises");
    const path = await import("node:path");
    const buffer = Buffer.from(base64.split(",")[1], "base64");
    const uniqueName = `${Date.now()}-${fileName.replace(/\s+/g, '-')}`;
    const publicDir = path.join(process.cwd(), "public");
    const uploadDir = path.join(publicDir, "uploads");
    
    // Ensure directories exist
    await fs.mkdir(uploadDir, { recursive: true });
    
    const filePath = path.join(uploadDir, uniqueName);
    await fs.writeFile(filePath, buffer);
    
    return { url: `/uploads/${uniqueName}` };
  } catch (error) {
    console.error("Upload Error:", error);
    throw new Error("Failed to upload image");
  }
});
