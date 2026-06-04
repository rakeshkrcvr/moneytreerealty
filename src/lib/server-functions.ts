import { createServerFn } from "@tanstack/react-start";
import postgres from "postgres";

let sql: any;


async function getSql() {
  if (sql) return sql;
  
  const url = process.env.DATABASE_URL;
  
  if (!url) {
    console.error("❌ DATABASE_URL environment variable is not set");
    return null;
  }
  
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

function slugify(value: string) {
  return value.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
}

async function ensureBlogColumns(db: any) {
  await db`CREATE TABLE IF NOT EXISTS blogs (slug TEXT PRIMARY KEY, title TEXT, date TEXT, img TEXT, cat TEXT)`;
  await db`ALTER TABLE blogs ADD COLUMN IF NOT EXISTS id BIGSERIAL`;
  await db`ALTER TABLE blogs ADD COLUMN IF NOT EXISTS content TEXT DEFAULT ''`;
  await db`ALTER TABLE blogs ADD COLUMN IF NOT EXISTS excerpt TEXT DEFAULT ''`;
  await db`ALTER TABLE blogs ADD COLUMN IF NOT EXISTS author TEXT DEFAULT 'Admin'`;
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
    whatsapp = ${data.whatsapp},
    page_templates = ${data.page_templates || {}},
    page_content = ${data.page_content || {}}
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
             title, slug, city, location, price, type, category, img, description,
             status, gallery, video_url, bedrooms, bathrooms, area, 
             floor_number, furnishing, amenities_ids, map_location, 
             nearby_places, agent_name, agent_phone, agent_image, floor_plan_img, floor_plans,
             developer_id
           ) 
           VALUES (
             ${p.title}, ${slug}, ${p.city || ''}, ${p.location}, ${p.price}, ${p.type}, ${p.category || 'Residential'}, ${p.img}, ${p.description},
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
             city = ${p.city || ""},
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
    const res = await db`SELECT * FROM communities ORDER BY id DESC`; 
    return res.map((row: any) => ({ ...row }));
  } catch (e) { return []; }
});

export const createCommunity = createServerFn({ method: "POST" }).handler(async ({ data }: { data: any }) => {
  const db = await getSql();
  if (!db) throw new Error("DB Error");
  const slug = data.title.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
  await db`INSERT INTO communities (title, slug, tag, description, img) VALUES (${data.title}, ${slug}, ${data.tag}, ${data.description}, ${data.img})`;
  return { success: true };
});

export const updateCommunity = createServerFn({ method: "POST" }).handler(async ({ data }: { data: any }) => {
  const db = await getSql();
  if (!db) throw new Error("DB Error");
  await db`UPDATE communities SET title = ${data.title}, tag = ${data.tag}, description = ${data.description}, img = ${data.img} WHERE id = ${data.id}`;
  return { success: true };
});

export const deleteCommunity = createServerFn({ method: "POST" }).handler(async ({ data: id }: { data: number }) => {
  const db = await getSql();
  if (!db) throw new Error("DB Error");
  await db`DELETE FROM communities WHERE id = ${id}`;
  return { success: true };
});

export const getAllBlogs = createServerFn({ method: "GET" }).handler(async () => {
  const db = await getSql();
  if (!db) return [];
  try {
    await ensureBlogColumns(db);
    const res = await db`SELECT * FROM blogs ORDER BY date DESC`;
    return res.map((r: any) => ({ ...r }));
  } catch (e) { return []; }
});

export const createBlog = createServerFn({ method: "POST" }).handler(async ({ data }: { data: any }) => {
  const db = await getSql();
  if (!db) throw new Error("Offline");
  const slug = slugify(data.slug || data.title);
  try {
    await ensureBlogColumns(db);
    await db`INSERT INTO blogs (title, slug, date, img, cat, content, excerpt, author) 
             VALUES (${data.title}, ${slug}, ${new Date().toISOString()}, ${data.img}, ${data.cat}, ${data.content || ''}, ${data.excerpt || ''}, ${data.author || 'Admin'})`;
    return { success: true };
  } catch (e) {
    console.error("Blog creation failed:", e);
    return { success: false };
  }
});

export const updateBlog = createServerFn({ method: "POST" }).handler(async ({ data }: { data: any }) => {
  const db = await getSql();
  if (!db) throw new Error("Offline");
  const slug = slugify(data.slug || data.title);
  const oldSlug = data.oldSlug ? slugify(data.oldSlug) : "";
  try {
    await ensureBlogColumns(db);
    const updated = data.id
      ? await db`UPDATE blogs SET 
                 title = ${data.title}, 
                 slug = ${slug},
                 img = ${data.img}, 
                 cat = ${data.cat}, 
                 content = ${data.content || ''}, 
                 excerpt = ${data.excerpt || ''}, 
                 author = ${data.author || 'Admin'} 
                 WHERE id = ${data.id}
                 RETURNING slug`
      : [];
    if (!updated.length && oldSlug) {
      await db`UPDATE blogs SET 
               title = ${data.title}, 
               slug = ${slug},
               img = ${data.img}, 
               cat = ${data.cat}, 
               content = ${data.content || ''}, 
               excerpt = ${data.excerpt || ''}, 
               author = ${data.author || 'Admin'} 
               WHERE slug = ${oldSlug}`;
    }
    return { success: true };
  } catch (e) {
    console.error("Blog update failed:", e);
    return { success: false };
  }
});

export const deleteBlog = createServerFn({ method: "POST" }).handler(async ({ data }: { data: any }) => {
  const db = await getSql();
  if (!db) throw new Error("Offline");
  try {
    await ensureBlogColumns(db);
    if (data?.id) {
      await db`DELETE FROM blogs WHERE id = ${data.id}`;
    } else {
      await db`DELETE FROM blogs WHERE slug = ${data?.slug || data}`;
    }
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
    // Duplicate check: Check if phone already exists
    const existing = await db`SELECT id FROM leads WHERE phone = ${data.phone} LIMIT 1`;
    if (existing.length > 0) {
      console.log("Duplicate lead blocked for:", data.phone);
      return { success: true, message: "Duplicate" };
    }

    await db`INSERT INTO leads (name, email, phone, property_slug, message) 
             VALUES (${data.name}, ${data.email}, ${data.phone}, ${data.source || data.property_slug || 'General'}, ${data.message || ''})`;
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
    
    // 2. Fetch properties in this community (city = title)
    const res = await db`SELECT * FROM properties WHERE city = ${comm[0].title}`;
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

    if (process.env.VERCEL) {
      return await saveImageToDatabase(base64, fileName);
    }
    
    // Ensure directories exist
    await fs.mkdir(uploadDir, { recursive: true });
    
    const filePath = path.join(uploadDir, uniqueName);
    await fs.writeFile(filePath, buffer);
    
    return { url: `/uploads/${uniqueName}` };
  } catch (error) {
    try {
      return await saveImageToDatabase(data.base64, data.fileName);
    } catch (fallbackError) {
      console.error("Upload Error:", error, fallbackError);
      throw new Error("Failed to upload image");
    }
  }
});

async function saveImageToDatabase(base64: string, fileName: string) {
  const db = await getSql();
  if (!db) throw new Error("DB Error");

  await db`
    CREATE TABLE IF NOT EXISTS media_assets (
      id TEXT PRIMARY KEY,
      file_name TEXT,
      content_type TEXT,
      data_base64 TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;

  const safeName = fileName.replace(/[^\w.\-]+/g, "-").replace(/^-+|-+$/g, "") || "image";
  const id = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  const mimeMatch = base64.match(/^data:([^;]+);base64,/);
  const contentType = mimeMatch?.[1] || "image/jpeg";
  const dataBase64 = base64.includes(",") ? base64.split(",")[1] : base64;

  await db`
    INSERT INTO media_assets (id, file_name, content_type, data_base64)
    VALUES (${id}, ${safeName}, ${contentType}, ${dataBase64})
  `;

  return { url: `/api/media/${id}/${safeName}` };
}

export const getUploadedMedia = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const fs = await import("node:fs/promises");
    const path = await import("node:path");
    const db = await getSql();
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    const imageExtensions = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg", ".avif"]);

    await fs.mkdir(uploadDir, { recursive: true });
    const files = await fs.readdir(uploadDir, { withFileTypes: true });
    const media = await Promise.all(
      files
        .filter((file) => file.isFile() && imageExtensions.has(path.extname(file.name).toLowerCase()))
        .map(async (file) => {
          const stat = await fs.stat(path.join(uploadDir, file.name));
          return {
            name: file.name,
            url: `/uploads/${file.name}`,
            size: stat.size,
            updatedAt: stat.mtime.toISOString(),
          };
        })
    );

    let dbMedia: any[] = [];
    if (db) {
      await db`
        CREATE TABLE IF NOT EXISTS media_assets (
          id TEXT PRIMARY KEY,
          file_name TEXT,
          content_type TEXT,
          data_base64 TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `;
      const rows = await db`SELECT id, file_name, created_at FROM media_assets ORDER BY created_at DESC`;
      dbMedia = rows.map((row: any) => ({
        name: row.file_name,
        url: `/api/media/${row.id}/${row.file_name}`,
        size: 0,
        updatedAt: new Date(row.created_at).toISOString(),
      }));
    }

    return [...dbMedia, ...media].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  } catch (error) {
    console.error("Media list error:", error);
    return [];
  }
});
