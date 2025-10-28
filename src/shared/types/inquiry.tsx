export type InquiryStatus = 'pending' | 'completed';
export type InquiryGrade = '브론즈' | '실버' | '골드';
export type InquiryCategory = '배송' | '결제' | '제품' | '기타';

export interface InquiryType {
  id: string;
  customerName: string;
  email: string;
  title: string;
  content: string;
  status: InquiryStatus;
  aiSummary: string;
  createdAt: string;
  phone: string;
  category: InquiryCategory;
  grade: InquiryGrade;
  joinedAt: string;
  birthday: string;
  points: string;
}
