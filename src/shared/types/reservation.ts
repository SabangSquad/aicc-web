export interface ReservationType {
  readonly reservation_id: number;
  readonly store_id: number;
  readonly customer_id: number | null;
  readonly reservation_at: string;
  status: '완료' | '취소';
  haedcount: number | null;
}
