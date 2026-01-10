const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
export async function fetcher<T>(path: string, options?: RequestInit): Promise<T> {
  const headers = new Headers(options?.headers);

  if (typeof window === 'undefined') {
    try {
      const { cookies } = await import('next/headers');
      const cookieStore = await cookies();
      const cookieString = cookieStore.toString();
      if (cookieString) {
        headers.set('Cookie', cookieString);
      }
    } catch (error) {
      console.warn('Fetcher: 쿠키를 가져오는 데 실패했습니다 (Static Generation 중일 수 있음).', error);
    }
  }

  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
    credentials: 'include',
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || `API Error: ${res.status}`);
  }

  return res.json();
}
