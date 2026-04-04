import { AIEmotionSolution } from '@/entities/ai';
import { AIAverageResponseTime } from '@/entities/ai/ui/AIAverageResponseTime';
import { AIResolutionRate } from '@/entities/ai/ui/AIResolutionRate';
import { InquiryEmotionChart, InquiryAreaSelectChart } from '@/entities/inquiry';
import { storeAPI } from '@/entities/store/api/api';
import { Separator } from '@/shared/ui/separator';

export async function Statistics() {
  const items = await storeAPI.getCases(1);

  return (
    <div className="space-y-16">
      <div>
        <h1 className="mb-3 text-3xl font-bold tracking-tight">통계</h1>
        <p className="text-[17px] font-medium text-slate-500">AI 상담사의 성과와 문의 통계를 확인할 수 있습니다.</p>
      </div>
      <div className="flex justify-between gap-8 px-20 md:px-40">
        <AIEmotionSolution items={items} />
        <AIAverageResponseTime items={items} />
        <AIResolutionRate items={items} />
      </div>
      <Separator />
      {/* <InquiryAreaSelectChart items={items} /> */}
      <Separator />
      <InquiryEmotionChart items={items} />
    </div>
  );
}
