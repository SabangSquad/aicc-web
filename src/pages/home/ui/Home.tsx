import { AIEmotionSolution, AISolution } from '@/entities/ai';
import { InquiryTable, InquiryChart, InquiryLineChart, InquiryAPI } from '@/entities/inquiry';
import { DUMMY_INQUIRIES } from '@/entities/inquiry/data';
import { Separator } from '@/shared/ui/separator';

export async function Home() {
  // const items = await InquiryAPI.getListByAgent(3);
  const items = DUMMY_INQUIRIES;
  const pending = items.filter(item => item.status === '대기').length;

  return (
    <div className="space-y-10">
      <div className="flex gap-4 flex-col">
        <h1 className="text-3xl font-bold tracking-tight">
          안녕하세요, 사장님!
          <span className="text-primary"> {pending}건</span>의 업무가 대기 중입니다.
        </h1>
      </div>

      <AISolution />
      {/* <div className="flex gap-8 h-96">
        <Separator orientation="vertical" />

        <div className="flex-">
          <AIEmotionSolution items={items} />
        </div>
      </div> */}
      <Separator />

      <div className="flex gap-8 h-96">
        <InquiryTable items={items} />

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
