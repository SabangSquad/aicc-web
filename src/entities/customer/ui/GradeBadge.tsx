import { Badge } from '@/shared/ui/badge';
import { MembershipLevel } from '@/shared/types/membership';
import { membershipColors, membershipLabels } from '@/shared/lib/membership';

export function GradeBadge({ grade }: { grade: MembershipLevel }) {
  const colors = membershipColors[grade];
  const label = membershipLabels[grade];

  return <Badge className={`${colors.bg} ${colors.text}`}>{label}</Badge>;
}
