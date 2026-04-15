'use client';
import { AIEmotionSolution, AIResolutionRate, AIAverageResponseTime, InquiryEmotionChart, SatisfactionRate } from '@/features/statistics';
import { Separator } from '@/shared/ui/separator';
import { useCases, useSatisfactions } from '@/entities/store';

export function Statistics() {
  const { data } = useCases(1);
  const { data: satisfactions } = useSatisfactions(2);

  return (
    <div className="space-y-16">
      <div>
        <h1 className="mb-3 text-3xl font-bold tracking-tight">통계</h1>
        <p className="text-[17px] font-medium text-slate-500">AI 상담사의 성과와 문의 통계를 확인할 수 있습니다.</p>
      </div>
      <div className="flex justify-between gap-8 px-20 md:px-20">
        <AIEmotionSolution items={data} />
        <AIAverageResponseTime items={data} />
        <AIResolutionRate items={data} />
        <SatisfactionRate items={satisfactions.data} />
      </div>
      <Separator />
      <InquiryEmotionChart items={data} />
      {/* <InquiryAreaSelectChart items={data} /> */}
    </div>
  );
}
