import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  const cookieStore = await cookies();
  cookieStore.delete('connect.sid');
  cookieStore.set('connect.sid', '', {
    path: '/',
    maxAge: 0,
    expires: new Date(0),
  });

  return NextResponse.json(
    { success: true },
    {
      headers: { 'Cache-Control': 'no-store' },
    }
  );
}
