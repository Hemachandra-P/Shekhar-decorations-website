import { NextResponse } from 'next/server';
import { getDb } from '../../../lib/db';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  const db = getDb();

  if (!db) {
    return NextResponse.json(
      { photos: [], error: 'Database is not configured' },
      { status: 500 }
    );
  }

  try {
    const rows = await db`
      SELECT id, title, url, created_at
      FROM photos
      ORDER BY created_at DESC
    `;

    return NextResponse.json(
      { photos: rows },
      {
        status: 200,
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate',
        },
      }
    );
  } catch (error) {
    console.error('Failed to load photos:', error);

    return NextResponse.json(
      { photos: [], error: 'Failed to load photos' },
      { status: 500 }
    );
  }
}
