import { Badge } from '@/shared/ui/badge';

export function GradeBadge({ grade }: { grade: '브론즈' | '실버' | '골드' }) {
  let bgColor = '';
  let textColor = '';

  switch (grade) {
    case '브론즈':
      bgColor = 'bg-amber-100';
      textColor = 'text-amber-800';
      break;
    case '실버':
      bgColor = 'bg-gray-200';
      textColor = 'text-gray-800';
      break;
    case '골드':
      bgColor = 'bg-yellow-200';
      textColor = 'text-yellow-800';
      break;
    default:
      bgColor = 'bg-muted';
      textColor = 'text-muted-foreground';
  }

  return <Badge className={` ${bgColor} ${textColor}`}>{grade}</Badge>;
}
