import { http } from '@/shared/lib/http';
import { Manual } from '@/shared/types/manual';

export const ManualsAPI = {
  getManuals: (category: string) => {
    return http.get<{ data: Manual[] }>(`/manuals?category=${category}`).then(res => res.data || []);
  },
};
