import { InquiryAIChart, InquiryAreaSelectChart, InquiryEmotionChart } from '@/entities/inquiry';
import { Separator } from '@/shared/ui/separator';

export function Statistics() {
  return (
    <div className="mx-auto max-w-7xl p-6 lg:p-8 space-y-10">
      <InquiryAreaSelectChart />
      <Separator />
      <div className="flex flex-row gap-6 h-96">
        <div className="flex-1">
          <InquiryEmotionChart />
        </div>
        <Separator orientation="vertical" />
        <div className="flex-1">
          <InquiryAIChart />
        </div>
      </div>
    </div>
  );
}
