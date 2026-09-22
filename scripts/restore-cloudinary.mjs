import { loadEnvConfig } from "@next/env";
import { v2 as cloudinary } from "cloudinary";
import { neon } from "@neondatabase/serverless";

loadEnvConfig(process.cwd());

if (
  !process.env.DATABASE_URL ||
  !process.env.CLOUDINARY_CLOUD_NAME ||
  !process.env.CLOUDINARY_API_KEY ||
  !process.env.CLOUDINARY_API_SECRET
) {
  throw new Error("Missing DATABASE_URL or Cloudinary environment variables.");
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const sql = neon(process.env.DATABASE_URL);

async function getAllCloudinaryPhotos() {
  const resources = [];
  let nextCursor;

  do {
    const result = await cloudinary.api.resources({
      type: "upload",
      prefix: "shekhar-events/",
      resource_type: "image",
      max_results: 500,
      next_cursor: nextCursor,
    });

    resources.push(...result.resources);
    nextCursor = result.next_cursor;
  } while (nextCursor);

  return resources;
}

const resources = await getAllCloudinaryPhotos();

console.log(`Found ${resources.length} Cloudinary photos.`);

let restored = 0;
let skipped = 0;

for (const photo of resources) {
  const filename =
    photo.display_name ||
    photo.public_id.split("/").pop() ||
    "event-photo";

  const title = filename
    .replace(/\.[^/.]+$/, "")
    .replace(/[-_]+/g, " ")
    .trim();

  await sql`
    INSERT INTO photos (title, url, public_id, created_at)
    VALUES (
      ${title},
      ${photo.secure_url},
      ${photo.public_id},
      ${photo.created_at ? new Date(photo.created_at) : new Date()}
    )
    ON CONFLICT (public_id) DO NOTHING
  `;

  restored++;
}

console.log(`Processed: ${restored} photos.`);
console.log("Cloudinary → Neon restoration complete.");

const rows = await sql`
  SELECT id, title, url, public_id, created_at
  FROM photos
  ORDER BY created_at ASC
`;

console.log(`Neon now contains ${rows.length} photo records.`);