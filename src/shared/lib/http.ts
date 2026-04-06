const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const stripHateoasLinks = (data: any): any => {
  if (data !== null && typeof data === 'object') {
    const { links, _links, ...rest } = data;
    return rest;
  }

  return data;
};

export async function request<T>(path: string, options?: RequestInit): Promise<T> {
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
    const errorData = await res.json().catch(() => ({}));
    throw errorData;
  }

  const data = await res.json();

  // 💡 여기서 모든 응답 데이터를 세탁(?)해서 반환합니다.
  return stripHateoasLinks(data) as T;
}

export const http = {
  get: <T>(url: string, options?: RequestInit) => request<T>(url, { ...options, method: 'GET' }),
  post: <T>(url: string, body: unknown, options?: RequestInit) => {
    const isFormData = body instanceof FormData;
    return request<T>(url, {
      ...options,
      method: 'POST',
      headers: {
        ...(!isFormData && { 'Content-Type': 'application/json' }),
        ...options?.headers,
      },
      body: isFormData ? body : JSON.stringify(body),
    });
  },
  patch: <T>(url: string, body: unknown, options?: RequestInit) => {
    // 💡 PATCH 요청을 보낼 때도 혹시 모르니 클라이언트에서 한 번 더 잘라서 보낼 수도 있습니다. (선택)
    const cleanBody = body instanceof FormData ? body : stripHateoasLinks(body);
    return request<T>(url, { ...options, method: 'PATCH', body: cleanBody instanceof FormData ? cleanBody : JSON.stringify(cleanBody) });
  },
  put: <T>(url: string, body: unknown, options?: RequestInit) => {
    const cleanBody = body instanceof FormData ? body : stripHateoasLinks(body);
    return request<T>(url, { ...options, method: 'PUT', body: cleanBody instanceof FormData ? cleanBody : JSON.stringify(cleanBody) });
  },
  delete: <T>(url: string, options?: RequestInit) => request<T>(url, { ...options, method: 'DELETE' }),
};
