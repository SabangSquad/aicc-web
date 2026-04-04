import { http } from '@/shared/lib/http';
import { CaseType } from '@/shared/types/case';
import { MessageType } from '@/shared/types/message';
import { SatisfactionType } from '@/shared/types/satisfaction';

export const casesAPI = {
  getCase: (case_id: number) => http.get<CaseType>(`/cases/${case_id}`),
  getSatisfactions: (case_id: number) => http.get<{ data: SatisfactionType }>(`/cases/${case_id}/satisfactions`),
  getMessages: (case_id: number) => http.get<{ data: MessageType[] }>(`/cases/${case_id}/messages`),
};
