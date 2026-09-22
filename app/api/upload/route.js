import { NextResponse } from 'next/server';
import { isAdmin } from '../../../lib/auth';
import { getDb } from '../../../lib/db';
import { getCloudinary } from '../../../lib/cloudinary';

export const runtime = 'nodejs';

function uploadBuffer(cloudinary, buffer, filename) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: 'shekhar-events', resource_type: 'image', format: 'webp', public_id: filename },
      (error, result) => error ? reject(error) : resolve(result)
    );
    stream.end(buffer);
  });
}

export async function POST(request) {
  if (!isAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const db = getDb();
  const cloudinary = getCloudinary();
  if (!db || !cloudinary) return NextResponse.json({ error: 'Storage/database is not configured. Add DATABASE_URL and Cloudinary keys.' }, { status: 500 });

  try {
    const form = await request.formData();
    const files = form.getAll('files').filter((file) => file && typeof file.arrayBuffer === 'function');
    if (!files.length) return NextResponse.json({ error: 'No images selected.' }, { status: 400 });

    const added = [];
    for (const file of files) {
      const original = file.name || 'event-photo';
      const safe = original.replace(/[^a-zA-Z0-9-_]/g, '-').slice(0, 50).toLowerCase();
      const result = await uploadBuffer(cloudinary, Buffer.from(await file.arrayBuffer()), `${Date.now()}-${safe}`);
      const title = original.replace(/\.[^/.]+$/, '').replace(/[-_]+/g, ' ').trim() || 'Shekhar Events decoration';
      const rows = await db`INSERT INTO photos (title, url, public_id) VALUES (${title}, ${result.secure_url}, ${result.public_id}) RETURNING id, title, url, created_at`;
      added.push(rows[0]);
    }
    return NextResponse.json({ photos: added });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message || 'Upload failed.' }, { status: 500 });
  }
}
