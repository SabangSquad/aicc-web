'use client';
import { Bar, BarChart, XAxis } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from '@/shared/ui/chart';
import { chartConfig } from '@/shared/lib/emotion';
import { InquiryType } from '@/shared/types/inquiry';

export function InquiryEmotionChart({ items }: { items: InquiryType[] }) {
  const aggregateEmotions = (items: InquiryType[]) => {
    const map = new Map<string, Record<string, number>>();

    items.forEach(item => {
      const date = new Date(item.created_at).toLocaleDateString('ko-KR');
      if (!map.has(date)) {
        map.set(date, { 기쁨: 0, 평온: 0, 화남: 0, 슬픔: 0, 짜증: 0 });
      }

      if (map.get(date)![item.emotion] !== undefined) {
        map.get(date)![item.emotion] += 1;
      }
    });

    return Array.from(map.entries()).map(([date, counts]) => ({ date, ...counts }));
  };
  const data = aggregateEmotions(items);
  return (
    <div className="flex flex-col">
      <div className="mb-4">
        <h2 className="text-2xl font-semibold tracking-tight">감정 추이 그래프</h2>
        <p className="mt-1 text-muted-foreground">날짜별 감정 추이를 확인할 수 있습니다.</p>
      </div>

      <ChartContainer config={chartConfig} className="h-[300px] w-full">
        <BarChart accessibilityLayer data={data}>
          <XAxis
            dataKey="date"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={value => new Date(value).toLocaleDateString('ko-KR', { weekday: 'short' })}
          />
          <Bar dataKey="기쁨" stackId="emotion" fill="var(--laugh-color)" radius={[0, 0, 4, 4]} />
          <Bar dataKey="평온" stackId="emotion" fill="var(--smile-color)" />
          <Bar dataKey="화남" stackId="emotion" fill="var(--angry-color)" radius={[4, 4, 0, 0]} />
          <Bar dataKey="슬픔" stackId="emotion" fill="var(--frown-color)" />
          <Bar dataKey="짜증" stackId="emotion" fill="var(--annoyed-color)" />

          <ChartTooltip content={<ChartTooltipContent />} cursor={false} />
          <ChartLegend content={<ChartLegendContent payload={undefined} />} />
        </BarChart>
      </ChartContainer>
    </div>
  );
}
