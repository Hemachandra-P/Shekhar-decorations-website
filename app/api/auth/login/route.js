import { NextResponse } from 'next/server';
import { setAdminCookie } from '../../../../lib/auth';

export async function POST(request) {
  const { password } = await request.json();
  const expected = process.env.ADMIN_PASSWORD || 'admin123';
  if (password !== expected) return NextResponse.json({ error: 'Incorrect password.' }, { status: 401 });
  setAdminCookie();
  return NextResponse.json({ ok: true });
}
