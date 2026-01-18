import { fetcher } from '@/shared/lib/fetcher';
import { Manual } from '@/shared/types/manual';

export const ManualsAPI = {
  getManuals: (category: string) =>
    fetcher<{ data: Manual[] }>(`/manuals?category=${category}`, {
      method: 'GET',
    }).then(res => res.data || []),
};
