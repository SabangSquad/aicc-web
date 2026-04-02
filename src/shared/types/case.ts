import { EMOTION } from '../constant/emotion';

export interface CaseType {
  readonly case_id: number;
  readonly customer_id: number | null;
  readonly store_id: number;
  readonly order_id: number | null;
  readonly reservation_id: number | null;
  readonly created_at: string;
  readonly closed_at: string;
  category: string;
  status: '대기' | '상담' | '종료' | 'AI자동해결';
  emotion: (typeof EMOTION)[number];
  summary: string | null;
}

export type CaseStatus = CaseType['status'];
