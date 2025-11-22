import { Badge } from '@/shared/ui/badge';
import { Check } from 'lucide-react';

export function AIBadge({ status }: { status: boolean }) {
  return (
    <Badge variant="secondary" className={`${status ? 'bg-ai text-white' : ''}`}>
      {status ? (
        <>
          <Check />
          <span>AI 자동해결</span>
        </>
      ) : (
        <></>
      )}
    </Badge>
  );
}
