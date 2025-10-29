import { Category } from './category';
import { MembershipLevel } from './membership';

export interface InquiryType {
  id: string;
  customerName: string;
  email: string;
  title: string;
  content: string;
  status: 'pending' | 'completed';
  aiSummary: string;
  createdAt: string;
  phone: string;
  category: Category;
  grade: MembershipLevel;
  joinedAt: string;
  birthday: string;
  points: string;
}
