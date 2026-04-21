import { http } from '@/shared/lib/http';
import { ReservationType } from '@/shared/types/reservation';
import { ReservationRequest } from '../types';

export const reservationAPI = {
  getStoreReservation: (customer_id: number) => http.get<{ data: ReservationType[] }>(`/customers/${customer_id}/cases`).then(res => res.data),
  postReservation: (data: ReservationRequest) => http.post(`/reservations`, { ...data }),
};
