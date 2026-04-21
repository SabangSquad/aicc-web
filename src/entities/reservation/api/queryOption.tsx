import { reservationAPI } from './api';

export const queryKeys = {
  reservations: ['reservations'] as const,
};
export const queryOptions = {
  getReservations: () => ({
    queryKey: queryKeys.reservations,
    queryFn: () => reservationAPI.postReservation,
  }),
};
