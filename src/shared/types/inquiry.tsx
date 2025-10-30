import { Category } from './category';
import { MembershipLevel } from './membership';

export interface InquiryType {
  id: string;
  title: string;
  category: Category;
  status: 'pending' | 'completed';
  content: string;
  createdAt: string;
  closed_at: string;
  memo: string;
  emotion: 'happy' | 'neutral' | 'sad';
  aiSummary: string;

  processedByAI: boolean;

  customerName: string;
  email: string;
  phone: string;
  grade: MembershipLevel;
  joinedAt: string;
  birthday: string;
  points: string;
}
