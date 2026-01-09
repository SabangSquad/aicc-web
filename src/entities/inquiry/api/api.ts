import { fetcher } from '@/shared/lib/fetcher';
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
  getListByAgent: (agentId: number) =>
    fetcher<{ data: InquiryType[] }>(`/agents/${agentId}/cases`, { method: 'GET' }).then(res => res.data || []),

  getCustomer: (customerId: number | string) => fetcher<Customer>(`/customers/${customerId}`, { method: 'GET' }),

  getCustomerCases: (customerId: number | string) =>
    fetcher<{ data: InquiryType[] }>(`/customers/${customerId}/cases`, { method: 'GET' }).then(res => res.data || []),

  getMessages: (caseId: number | string) => fetcher<Message[]>(`/cases/${caseId}/messages`, { method: 'GET' }),
};
