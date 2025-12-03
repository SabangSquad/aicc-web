import { Category } from './category';
import { Emotion } from './emotion';

const InquiryStatus = ['대기', '상담', '종료', 'AI자동해결'] as const;

export type InquiryStatus = (typeof InquiryStatus)[number];

export interface InquiryType {
  case_id: number;
  customer_id: number;
  title: string;
  status: InquiryStatus;
  created_at: string;
  closed_at: string | null;
  memo: string | null;
  order_id: number | null;
  category: Category;
  emotion: Emotion;
  content: string;
}
