'use client';
import { CheckCircle, Clock, MessageSquare } from 'lucide-react';
import { isToday } from '@/shared/lib/date';
import { Separator } from '@/shared/ui/separator';
import { InquiryType } from '@/shared/types/inquiry';

export function KPIAnalysis({ items }: { items: InquiryType[] }) {
  const pending = items.filter(item => item.status === '대기').length;
  const todayNew = items.filter(item => isToday(item.created_at)).length;
  const todayDone = items.filter(item => item.status === '종료' && isToday(item.created_at)).length;

  return (
    <div className="flex gap-6 h-24">
      {/* 처리 대기 중 */}
      <div className="flex-1 flex flex-col justify-center">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">처리 대기 중</span>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </div>
        <div className="text-2xl font-bold">{pending}건</div>
      </div>

      <Separator orientation="vertical" />

      {/* 오늘 신규 접수 */}
      <div className="flex-1 flex flex-col justify-center">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">오늘 신규 접수</span>
          <MessageSquare className="h-4 w-4 text-muted-foreground" />
        </div>
        <div className="text-2xl font-bold">+{todayNew}건</div>
      </div>

      <Separator orientation="vertical" />

      {/* 오늘 처리 완료 */}
      <div className="flex-1 flex flex-col justify-center">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">오늘 처리 완료</span>
          <CheckCircle className="h-4 w-4 text-muted-foreground" />
        </div>
        <div className="text-2xl font-bold">{todayDone}건</div>
      </div>
    </div>
  );
}
