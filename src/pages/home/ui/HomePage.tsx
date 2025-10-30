import { Separator } from '@/shared/ui/separator';
import { InquiryTable } from '@/entities/inquiry/ui/InquiryTable';
import { KPIAnalysis } from '@/entities/inquiry/ui/KPIAnalysis';
import { InquiryChart } from '@/entities/inquiry/ui/InquiryChart';
import { InquiryLineChart } from '@/entities/inquiry/ui/InquiryLineChart';

import { items } from '@/shared/data/inquiryItem';

export function HomePage() {
  const pending = items.filter(item => item.status === 'pending').length;
  return (
    <div className="mx-auto max-w-7xl p-6 lg:p-8 space-y-10">
      <h1 className="text-3xl font-bold tracking-tight">
        안녕하세요, 사장님!
        <span className="text-primary"> {pending}건</span>의 업무가 대기 중입니다.
      </h1>

      <KPIAnalysis />
      <Separator />

      <div className="flex gap-8 h-96">
        <div className="flex-1">
          <InquiryTable />
        </div>

        <Separator orientation="vertical" />

        <div className="flex-1">
          <InquiryChart />
        </div>
      </div>

      <Separator />
      <InquiryLineChart />
    </div>
  );
}
