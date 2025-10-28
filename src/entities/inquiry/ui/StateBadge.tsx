import { Badge } from '@/shared/ui/badge';
import { CheckCircle, Clock } from 'lucide-react';

export function StateBadge({ status }: { status: 'pending' | 'completed' }) {
  return (
    <Badge variant="secondary" className={`${status === 'pending' ? '' : 'bg-deep-green text-white'}`}>
      {status === 'pending' ? (
        <>
          <Clock />
          <span>답변대기</span>
        </>
      ) : (
        <>
          <CheckCircle />
          <span>완료</span>
        </>
      )}
    </Badge>
  );
}
