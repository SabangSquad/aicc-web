import { http } from '@/shared/lib/http';
import { StoreType } from '../types';
import { CaseType } from '@/shared/types/case';

export const storeAPI = {
  getStoreInfomation: (store_id: number) => {
    return http.get<StoreType>(`/stores/${store_id}`);
  },
  getCases: (store_id: number) => {
    return http.get<{ data: CaseType[] }>(`/stores/${store_id}/cases`).then(res => res.data || []);
  },
  getSatisfactions: (store_id: number) => {
    return http.get<{ data: { satisfaction: number } }>(`/stores/${store_id}/satisfaction`);
  },
  getReservations: (store_id: number) => {
    return http.get<{ data: { reservation_count: number } }>(`/stores/${store_id}/reservations`);
  },
};
