// import { InquiryAreaSelectChart, InquiryEmotionChart } from '@/entities/inquiry';
import { InquiryEmotionChart } from '@/entities/inquiry';
import { Separator } from '@/shared/ui/separator';

export async function Statistics() {
  const items = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/agents/3/cases`)
    .then(res => res.json())
    .then(data => data.data);

  return (
    <div className="p-6 mx-auto space-y-10 max-w-7xl lg:p-8">
      {/* <InquiryAreaSelectChart items={items} /> */}
      <Separator />
      <div className="flex flex-row gap-6 h-96">
        <div className="flex-1">
          <InquiryEmotionChart items={items} />
        </div>
        <Separator orientation="vertical" />
        {/* <div className="flex-1"><InquiryAIChart /></div> */}
      </div>
    </div>
  );
}
