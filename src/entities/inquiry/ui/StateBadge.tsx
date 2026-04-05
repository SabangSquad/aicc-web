import { CaseStatus } from '@/shared/types/case';
import { Badge } from '@/shared/ui/badge';
import { Check, Clock, MessageCircle } from 'lucide-react';

export function StateBadge({ status }: { status: CaseStatus }) {
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
      <Badge variant="secondary" className="bg-deep-green text-white">
        <MessageCircle />
        <span>상담중</span>
      </Badge>
    );
  }

  if (status === '종료') {
    return (
      <Badge variant="secondary" className="bg-red-400 text-white">
        <Check />
        <span>종료</span>
      </Badge>
    );
  }
  if (status === 'AI자동해결') {
    return (
      <Badge variant="secondary" className="bg-ai text-white">
        <Check />
        <span>AI자동해결</span>
      </Badge>
    );
  }

  return null;
}
