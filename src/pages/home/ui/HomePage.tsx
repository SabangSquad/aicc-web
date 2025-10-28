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

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <InquiryTable />
        <InquiryChart />
      </div>

      <Separator />
      <InquiryLineChart />
    </div>
  );
}
