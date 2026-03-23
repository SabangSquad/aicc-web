import { http } from '@/shared/lib/http';
import { Customer } from '@/shared/types/customer';
import { InquiryType } from '@/shared/types/inquiry';

export type Message = {
  message_id: number;
  case_id: number;
  occurred_at: string;
  content: string;
  speaker: '상담사' | '고객' | '보이스봇' | '챗봇';
};
export const InquiryAPI = {
  getListByAgent: (agentId: number) => {
    return http.get<{ data: InquiryType[] }>(`/agents/${agentId}/cases`).then(res => res.data || []);
  },
  getCustomer: (customerId: number | string) => {
    return http.get<{ data: Customer }>(`/customers/${customerId}`).then(res => res.data);
  },

  getCustomerCases: (customerId: number | string) => http.get<{ data: InquiryType[] }>(`/customers/${customerId}/cases`).then(res => res.data || []),

  getMessages: (caseId: number | string) => http.get<{ data: Message[] }>(`/cases/${caseId}/messages`).then(res => res.data || []),
};
