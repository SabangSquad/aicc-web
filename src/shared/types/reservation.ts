export interface ReservationType {
  readonly reservation_id: number;
  store_id: number;
  customer_id: number | null;
  reserved_at: string;
  status: '완료' | '취소';
  headcount: number | null;
}
