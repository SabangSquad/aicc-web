'use server';
import { cookies } from 'next/headers';

export async function logout() {
  const cookieStore = await cookies();

  cookieStore.set('connect.sid', '', {
    path: '/',
    maxAge: 0,
    expires: new Date(0),
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
  });
}
