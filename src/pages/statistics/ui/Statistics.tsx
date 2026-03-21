import { AIEmotionSolution } from '@/entities/ai';
import { AIAverageResponseTime } from '@/entities/ai/ui/AIAverageResponseTime';
import { AIResolutionRate } from '@/entities/ai/ui/AIResolutionRate';
import { InquiryAPI, InquiryEmotionChart, InquiryAreaSelectChart } from '@/entities/inquiry';
import { DUMMY_INQUIRIES } from '@/entities/inquiry/data';
import { Separator } from '@/shared/ui/separator';

export async function Statistics() {
  // const items = await InquiryAPI.getListByAgent(3);
  const items = DUMMY_INQUIRIES;

  return (
    <div className="space-y-10 ">
      <div className="flex gap-8 px-20 md:px-40 justify-between">
        <AIEmotionSolution items={items} />
        <AIAverageResponseTime items={items} />
        <AIResolutionRate items={items} />
      </div>
      <Separator />
      <InquiryAreaSelectChart items={items} />
      <Separator />
      <InquiryEmotionChart items={items} />
    </div>
  );
}
