import { http } from '@/shared/lib/http';
import { ChatResponse, ChatSummary } from '../types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

export const chatAPI = {
  postChatStream: async ({ message, store_id, caseId }: { message: string; store_id: number; caseId?: number }, onData: (data: ChatResponse) => void) => {
    const response = await fetch(`${API_BASE_URL}/chats`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message, store_id: String(store_id), caseId }),
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('서버 응답 에러');
    }

    const reader = response.body?.getReader();
    const decoder = new TextDecoder('utf-8');

    if (!reader) return;

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunkString = decoder.decode(value, { stream: true });
      const lines = chunkString.split('\n').filter(line => line.trim() !== '');

      for (const line of lines) {
        if (line.startsWith('data:')) {
          try {
            const jsonStr = line.replace(/^data:\s*/, '').trim();
            if (jsonStr) {
              const data = JSON.parse(jsonStr);
              onData(data);
            }
          } catch {
            new Error('데이터 파싱 에러');
          }
        }
      }
    }
  },
  getSummary: (case_Id: number) => http.post<ChatSummary>(`/chats/${case_Id}`, {}),
  postChatClose: (case_id: number) => http.post(`/chats/${case_id}/close`, {}),
};
