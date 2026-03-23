import { AIAssistType } from '@/shared/types/aiAssist';
import { AISolutionResponse } from '../types';
import { http } from '@/shared/lib/http';

export const AiAPI = {
  getListByAgent: (caseId: number) => {
    return http.post<{ data: AIAssistType }>(`/chat/${caseId}`, {}).then(res => res.data);
  },
  getSolution: () => {
    return http.get<{ data: AISolutionResponse }>('/solution').then(res => res.data);
  },
};
