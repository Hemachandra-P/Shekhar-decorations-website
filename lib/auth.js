import { cookies } from 'next/headers';

const COOKIE_NAME = 'shekhar_admin';
const COOKIE_VALUE = 'authenticated';

export function isAdmin() {
  return cookies().get(COOKIE_NAME)?.value === COOKIE_VALUE;
}

export function setAdminCookie() {
  cookies().set(COOKIE_NAME, COOKIE_VALUE, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });
}

export function clearAdminCookie() {
  cookies().set(COOKIE_NAME, '', { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', path: '/', maxAge: 0 });
}
