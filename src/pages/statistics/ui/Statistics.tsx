import { InquiryAPI, InquiryEmotionChart, InquiryAreaSelectChart } from '@/entities/inquiry';
import { Separator } from '@/shared/ui/separator';

export async function Statistics() {
  const items = await InquiryAPI.getListByAgent(3);

  return (
    <div className="space-y-10 ">
      <InquiryAreaSelectChart items={items} />
      <Separator />
      <div className="flex flex-row gap-6 h-96">
        <div className="flex-1">
          <InquiryEmotionChart items={items} />
        </div>
        <Separator orientation="vertical" />
      </div>
    </div>
  );
}
