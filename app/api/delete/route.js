import { NextResponse } from 'next/server';
import { isAdmin } from '../../../lib/auth';
import { getDb } from '../../../lib/db';
import { getCloudinary } from '../../../lib/cloudinary';

export const runtime = 'nodejs';

export async function DELETE(request) {
  if (!isAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const db = getDb();
  const cloudinary = getCloudinary();
  if (!db || !cloudinary) return NextResponse.json({ error: 'Storage/database is not configured.' }, { status: 500 });
  try {
    const { id } = await request.json();
    const rows = await db`SELECT public_id FROM photos WHERE id = ${id} LIMIT 1`;
    if (!rows.length) return NextResponse.json({ error: 'Photo not found.' }, { status: 404 });
    await cloudinary.uploader.destroy(rows[0].public_id, { resource_type: 'image' });
    await db`DELETE FROM photos WHERE id = ${id}`;
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message || 'Delete failed.' }, { status: 500 });
  }
}
