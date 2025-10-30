import { GradeBadge } from '@/entities/customer';
import { InquiryType } from '@/shared/types/inquiry';
import { Avatar, AvatarFallback } from '@/shared/ui/avatar';

const ValueDisplay = ({ value }: { value: string }) => {
  return <span className={!value ? 'text-muted-foreground italic' : ''}>{value || 'N/A'}</span>;
};

export function CustomerInformation({ inquiry }: { inquiry: InquiryType }) {
  const getInitials = (name: string) => {
    return name ? name.substring(0, 1).toUpperCase() : 'U';
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">고객 정보</h3>

      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12">
            <AvatarFallback>{getInitials(inquiry.customerName)}</AvatarFallback>
          </Avatar>

          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <p className="text-base font-semibold">{inquiry.customerName}</p>
              <GradeBadge grade={inquiry.grade} />
            </div>

            <p className="text-sm text-muted-foreground">{inquiry.email}</p>
            <p className="text-sm text-muted-foreground">{inquiry.phone}</p>
          </div>
        </div>

        <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm">
          <span className="font-medium text-muted-foreground">가입일</span>
          <ValueDisplay value={new Date(inquiry.joinedAt).toLocaleString('ko-KR')} />

          <span className="font-medium text-muted-foreground">생년월일</span>
          <ValueDisplay value={inquiry.birthday} />

          <span className="font-medium text-muted-foreground">적립금</span>
          <ValueDisplay value={inquiry.points} />
        </div>
      </div>
    </div>
  );
}
