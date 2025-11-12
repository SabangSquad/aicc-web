import { InquiryStatus } from '@/shared/types/inquiry';
import { Badge } from '@/shared/ui/badge';
import { CheckCircle, Clock, MessageCircle } from 'lucide-react';

export function StateBadge({ status }: { status: InquiryStatus }) {
  if (status === '대기') {
    return (
      <Badge variant="secondary">
        <Clock />
        <span>답변대기</span>
      </Badge>
    );
  }

  if (status === '상담') {
    return (
      <Badge variant="secondary" className="text-white bg-deep-green">
        <MessageCircle />
        <span>상담중</span>
      </Badge>
    );
  }

  if (status === '종료') {
    return (
      <Badge variant="secondary" className="text-white bg-red-400">
        <CheckCircle />
        <span>종료</span>
      </Badge>
    );
  }

  return null;
}
