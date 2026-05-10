'use server';
import { cookies } from 'next/headers';

export async function logout(returnTo?: string) {
  const cookieStore = await cookies();
  cookieStore.delete('connect.sid');
}
