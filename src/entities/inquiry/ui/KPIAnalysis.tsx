import { CheckCircle, Clock, MessageSquare } from 'lucide-react';
import { isToday } from '@/shared/lib/date';
import { Separator } from '@/shared/ui/separator';
import { InquiryType } from '@/shared/types/inquiry';

export function KPIAnalysis({ items }: { items: InquiryType[] }) {
  const pending = items.filter(item => item.status === '대기').length;
  const todayNew = items.filter(item => isToday(item.created_at)).length;
  const todayDone = items.filter(item => item.status === '종료' && isToday(item.created_at)).length;

  return (
    <div className="flex h-24 gap-6">
      <div className="flex flex-col justify-center flex-1">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">답변 대기 중</span>
          <Clock className="w-4 h-4 text-muted-foreground" />
        </div>
        <div className="text-2xl font-bold">{pending}건</div>
      </div>

      <Separator orientation="vertical" />

      <div className="flex flex-col justify-center flex-1">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">오늘 신규 접수</span>
          <MessageSquare className="w-4 h-4 text-muted-foreground" />
        </div>
        <div className="text-2xl font-bold">+{todayNew}건</div>
      </div>

      <Separator orientation="vertical" />

      <div className="flex flex-col justify-center flex-1">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">오늘 처리 완료</span>
          <CheckCircle className="w-4 h-4 text-muted-foreground" />
        </div>
        <div className="text-2xl font-bold">{todayDone}건</div>
      </div>
    </div>
  );
}
