'use client';
import { Bar, BarChart, XAxis } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from '@/shared/ui/chart';
import { items } from '@/shared/data/emotion';
import { chartConfig } from '@/shared/lib/emotion';

export function InquiryEmotionChart() {
  return (
    <div className="flex flex-col">
      <div className="mb-4">
        <h2 className="text-2xl font-semibold tracking-tight">감정 추이 그래프</h2>
        <p className="mt-1 text-muted-foreground">날짜별 감정 추이를 확인할 수 있습니다.</p>
      </div>

      <ChartContainer config={chartConfig} className="h-[300px] w-full">
        <BarChart accessibilityLayer data={items}>
          <XAxis
            dataKey="date"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={value => new Date(value).toLocaleDateString('ko-KR', { weekday: 'short' })}
          />
          <Bar dataKey="positive" stackId="emotion" fill="var(--positive-color)" radius={[0, 0, 4, 4]} />
          <Bar dataKey="neutral" stackId="emotion" fill="var(--neutral-color)" />
          <Bar dataKey="negative" stackId="emotion" fill="var(--negative-color)" radius={[4, 4, 0, 0]} />

          <ChartTooltip content={<ChartTooltipContent />} cursor={false} />
          <ChartLegend content={<ChartLegendContent payload={undefined} />} />
        </BarChart>
      </ChartContainer>
    </div>
  );
}
