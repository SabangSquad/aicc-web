'use client';
import { Bar, BarChart, XAxis } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from '@/shared/ui/chart';
import { chartConfig } from '@/shared/lib/emotion';
import { InquiryType } from '@/shared/types/inquiry';

export function InquiryEmotionChart({ items }: { items: InquiryType[] }) {
  const aggregateEmotionsByDay = (items: InquiryType[]) => {
    const days = ['일', '월', '화', '수', '목', '금', '토'];

    const initialData = days.map(day => ({
      name: day, // X축에 표시될 이름
      기쁨: 0,
      평온: 0,
      화남: 0,
      슬픔: 0,
      짜증: 0,
    }));

    items.forEach(item => {
      const date = new Date(item.created_at);
      const dayIndex = date.getDay();
      const emotion = item.emotion;

      if (initialData[dayIndex][emotion] !== undefined) {
        initialData[dayIndex][emotion] += 1;
      }
    });

    return initialData;
  };

  return (
    <div className="flex flex-col">
      <div className="mb-4">
        <h2 className="text-2xl font-semibold tracking-tight">요일별 감정 추이</h2>
        <p className="mt-1 text-muted-foreground">요일별 감정 분포를 확인할 수 있습니다.</p>
      </div>

      <ChartContainer config={chartConfig} className="h-[300px] w-full">
        <BarChart accessibilityLayer data={aggregateEmotionsByDay(items)}>
          <XAxis dataKey="name" tickLine={false} tickMargin={10} axisLine={false} />
          <Bar dataKey="기쁨" stackId="emotion" fill="var(--laugh-color)" />
          <Bar dataKey="평온" stackId="emotion" fill="var(--smile-color)" />
          <Bar dataKey="화남" stackId="emotion" fill="var(--angry-color)" />
          <Bar dataKey="슬픔" stackId="emotion" fill="var(--frown-color)" />
          <Bar dataKey="짜증" stackId="emotion" fill="var(--annoyed-color)" />

          <ChartTooltip content={<ChartTooltipContent />} cursor={false} />
          <ChartLegend content={<ChartLegendContent payload={undefined} />} />
        </BarChart>
      </ChartContainer>
    </div>
  );
}
