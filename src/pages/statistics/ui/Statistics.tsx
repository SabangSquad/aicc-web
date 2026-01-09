// import { InquiryAreaSelectChart } from '@/entities/inquiry';
import { InquiryAPI, InquiryEmotionChart, InquiryAreaSelectChart } from '@/entities/inquiry';
import { Separator } from '@/shared/ui/separator';

export async function Statistics() {
  const items = await InquiryAPI.getListByAgent(3);
  if (!items) {
    return null;
  }

  return (
    <div className="p-6 mx-auto space-y-10 max-w-7xl lg:p-8">
      <InquiryAreaSelectChart items={items} />
      <Separator />
      <div className="flex flex-row gap-6 h-96">
        <div className="flex-1">
          <InquiryEmotionChart items={items} />
        </div>
        <Separator orientation="vertical" />
        <div className="flex-1">{/* <InquiryAIChart /> */}</div>
      </div>
    </div>
  );
}
