import { Badge } from '@/shared/ui/badge';
import { membershipColors, MembershipLevel } from '@/shared/types/membership';

export function GradeBadge({ grade }: { grade: MembershipLevel }) {
  const colors = membershipColors[grade];

  return <Badge className={`${colors.bg} ${colors.text}`}>{grade}</Badge>;
}
