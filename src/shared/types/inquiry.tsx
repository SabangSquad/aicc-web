import { Category } from './category';

const InquiryStatus = ['대기', '상담', '종료'] as const;
const Emotion = ['평온', '기쁨', '슬픔', '화남', '짜증'] as const;

export type InquiryStatus = (typeof InquiryStatus)[number];
export type Emotion = (typeof Emotion)[number];

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
