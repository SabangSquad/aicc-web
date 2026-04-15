import { http } from '@/shared/lib/http';
import { ReservationType } from '@/shared/types/reservation';

export const reservationAPI = {
  getStoreReservation: (customer_id: number) => http.get<{ data: ReservationType[] }>(`/customers/${customer_id}/cases`).then(res => res.data),
};
