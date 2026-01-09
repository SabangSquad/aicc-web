import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL;

async function handleProxy(request: NextRequest, { params }: { params: { slug: string[] } }) {
  const { slug } = params;
  const pathname = slug.join('/');
  const searchParams = request.nextUrl.search;
  const targetUrl = `${BACKEND_URL}/api/${pathname}${searchParams}`;

  const body = ['GET', 'HEAD'].includes(request.method) ? undefined : await request.arrayBuffer();

  const cookieStore = await cookies();
  const clientCookies = cookieStore.toString();

  try {
    const response = await fetch(targetUrl, {
      method: request.method,
      headers: {
        'Content-Type': request.headers.get('content-type') || 'application/json',
        Authorization: request.headers.get('authorization') || '',
        Cookie: clientCookies,
      },
      body: body,
      cache: 'no-store',
    });

    const data = await response.arrayBuffer();

    const proxyResponse = new NextResponse(data, {
      status: response.status,
      headers: {
        'Content-Type': response.headers.get('content-type') || 'application/json',
      },
    });

    const setCookies = response.headers.getSetCookie();
    setCookies.forEach(cookie => {
      proxyResponse.headers.append('set-cookie', cookie);
    });

    return proxyResponse;
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export const GET = handleProxy;
export const POST = handleProxy;
export const PUT = handleProxy;
export const DELETE = handleProxy;
export const PATCH = handleProxy;
