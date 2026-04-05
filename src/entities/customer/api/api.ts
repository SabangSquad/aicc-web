import { http } from '@/shared/lib/http';
import { CustomerType } from '../types';
import { CaseType } from '@/shared/types/case';

export const customerAPI = {
  getCustomerInfo: (customer_id: number) => http.get<CustomerType>(`/customers/${customer_id}`),
  getPastInquiries: (customer_id: number) => http.get<{ data: CaseType[] }>(`/customers/${customer_id}/cases`).then(res => res.data),
};
