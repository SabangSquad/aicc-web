import { ReservationType } from '@/shared/types/reservation';

export type ReservationRequest = Pick<ReservationType, 'store_id' | 'reserved_at' | 'headcount' | 'customer_id'>;
