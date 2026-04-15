'use client';
import { AISolution, AISolutionSkeleton, useCases } from '@/entities/store';
import { InquiryTable, InquiryChart, InquiryLineChart } from '@/features/statistics';
import { Separator } from '@/shared/ui/separator';
import { AsyncBoundary } from '@/shared/error/AsyncBoundary';

export function Home() {
  const { data } = useCases(1);
  const pending = data?.filter(item => item.status === '대기').length;

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">
          안녕하세요, 사장님!
          <span className="text-primary"> {pending}건</span>의 업무가 대기 중입니다.
        </h1>
      </div>

      <div className="flex h-96 gap-8">
        <InquiryTable items={data} />

        <Separator orientation="vertical" />

        <div className="flex-1">
          <InquiryChart items={data} />
        </div>
      </div>

      <Separator />

      <AsyncBoundary fallback={<AISolutionSkeleton />}>
        <AISolution />
      </AsyncBoundary>

      <Separator />
      <InquiryLineChart items={data} />
    </div>
  );
}
