import { Separator } from '@/shared/ui/separator';
import { InquiryTable, KPIAnalysis, InquiryChart, InquiryLineChart, InquiryAPI } from '@/entities/inquiry';

export async function Home() {
  const items = await InquiryAPI.getListByAgent(3);

  const pending = items.filter(item => item.status === '대기').length;

  return (
    <div className="p-6 mx-auto space-y-10 max-w-7xl lg:p-8">
      <h1 className="text-3xl font-bold tracking-tight">
        안녕하세요, 사장님!
        <span className="text-primary"> {pending}건</span>의 업무가 대기 중입니다.
      </h1>

      <KPIAnalysis items={items} />
      <Separator />

      <div className="flex gap-8 h-96">
        <div className="flex-1">
          <InquiryTable items={items} />
        </div>

        <Separator orientation="vertical" />

        <div className="flex-1">
          <InquiryChart items={items} />
        </div>
      </div>

      <Separator />
      <InquiryLineChart items={items} />
    </div>
  );
}
