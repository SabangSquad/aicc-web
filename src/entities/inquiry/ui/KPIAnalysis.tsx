'use client';
import { CheckCircle, Clock, MessageSquare } from 'lucide-react';
import { isToday } from '@/shared/lib/date';
import { items } from '@/shared/data/inquiryItem';

export function KPIAnalysis() {
  const pending = items.filter(item => item.status === 'pending').length;
  const todayNew = items.filter(item => isToday(item.createdAt)).length;
  const todayDone = items.filter(item => item.status === 'completed' && isToday(item.createdAt)).length;

  return (
    <div className="grid gap-6 md:grid-cols-3">
      <div className="rounded-lg border bg-background p-6">
        <div className="flex flex-row items-center justify-between space-y-0 pb-2">
          <h3 className="text-sm font-medium tracking-tight">처리 대기 중</h3>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </div>
        <div>
          <div className="text-2xl font-bold">{pending}건</div>
          <p className="text-xs text-muted-foreground">사장님의 조치가 필요합니다.</p>
        </div>
      </div>

      {/* 오늘 신규 접수 */}
      <div className="rounded-lg border bg-background p-6">
        <div className="flex flex-row items-center justify-between space-y-0 pb-2">
          <h3 className="text-sm font-medium tracking-tight">오늘 신규 접수</h3>
          <MessageSquare className="h-4 w-4 text-muted-foreground" />
        </div>
        <div>
          <div className="text-2xl font-bold">+{todayNew}건</div>
          <p className="text-xs text-muted-foreground">오늘 새로 들어온 문의</p>
        </div>
      </div>

      {/* 오늘 처리 완료 */}
      <div className="rounded-lg border bg-background p-6">
        <div className="flex flex-row items-center justify-between space-y-0 pb-2">
          <h3 className="text-sm font-medium tracking-tight">오늘 처리 완료</h3>
          <CheckCircle className="h-4 w-4 text-muted-foreground" />
        </div>
        <div>
          <div className="text-2xl font-bold">{todayDone}건</div>
          <p className="text-xs text-muted-foreground">오늘 완료한 업무</p>
        </div>
      </div>
    </div>
  );
}
