import { fetcher } from '@/shared/lib/fetcher';
import { AIAssistType } from '@/shared/types/aiAssist';

export const AiAPI = {
  getListByAgent: (caseId: number) =>
    fetcher<{ data: AIAssistType }>(`/chat/${caseId}`, {
      method: 'POST',
    }).then(res => res.data || []),
};
