import { NextResponse } from 'next/server';
import { getDb } from '../../../lib/db';

export async function GET() {
  const db = getDb();
  if (!db) return NextResponse.json({ photos: [] });
  try {
    const rows = await db`SELECT id, title, url, created_at FROM photos ORDER BY created_at DESC`;
    return NextResponse.json({ photos: rows });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ photos: [] }, { status: 200 });
  }
}
