'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

export async function logout() {
  const cookieStore = await cookies();

  cookieStore.delete('connect.sid');

  cookieStore.set('connect.sid', '', {
    path: '/',
    maxAge: 0,
    expires: new Date(0),
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
  });

  revalidatePath('/', 'layout');

  return { success: true };
}
