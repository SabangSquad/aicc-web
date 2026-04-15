import { AIEmotionSolution, AIResolutionRate, AIAverageResponseTime, InquiryEmotionChart, SatisfactionRate } from '@/features/statistics';
import { storeAPI } from '@/entities/store/api/api';
import { Separator } from '@/shared/ui/separator';

export async function Statistics() {
  const items = await storeAPI.getCases(1);
  const { data: satisfactions } = await storeAPI.getSatisfactions(2);

  return (
    <div className="space-y-16">
      <div>
        <h1 className="mb-3 text-3xl font-bold tracking-tight">통계</h1>
        <p className="text-[17px] font-medium text-slate-500">AI 상담사의 성과와 문의 통계를 확인할 수 있습니다.</p>
      </div>
      <div className="flex justify-between gap-8 px-20 md:px-20">
        <AIEmotionSolution items={items} />
        <AIAverageResponseTime items={items} />
        <AIResolutionRate items={items} />
        <SatisfactionRate items={satisfactions} />
      </div>
      <Separator />
      {/* <InquiryAreaSelectChart items={items} /> */}
      <Separator />
      <InquiryEmotionChart items={items} />
    </div>
  );
}
