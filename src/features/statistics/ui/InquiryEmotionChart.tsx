'use client';
import React, { useMemo } from 'react';
import { Bar, BarChart, XAxis } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from '@/shared/ui/chart';
import { chartConfig } from '@/shared/lib/emotion';
import { CaseType } from '@/shared/types/case';

export const InquiryEmotionChart = React.memo(({ items }: { items: CaseType[] }) => {
  const chartData = useMemo(() => {
    const initialData = Array.from({ length: 24 }, (_, i) => ({
      name: `${i}시`,
      기쁨: 0,
      평온: 0,
      화남: 0,
      슬픔: 0,
      짜증: 0,
    }));

    if (!items || items.length === 0) return initialData;

    items.forEach(item => {
      const hourIndex = new Date(item.created_at).getHours();
      const emotion = item.emotion as keyof (typeof initialData)[0];

      if (initialData[hourIndex][emotion] !== undefined) {
        (initialData[hourIndex][emotion] as number) += 1;
      }
    });

    return initialData;
  }, [items]);

  return (
    <div className="flex flex-col">
      <div className="mb-4">
        <h2 className="text-2xl font-semibold tracking-tight">시간대별 감정 분포</h2>
        <p className="text-muted-foreground mt-1">시간대별 고객 감정 분포를 확인할 수 있습니다.</p>
      </div>

      <ChartContainer config={chartConfig} className="h-[300px] w-full">
        <BarChart accessibilityLayer data={chartData}>
          <XAxis dataKey="name" tickLine={false} tickMargin={10} axisLine={false} />
          <Bar dataKey="기쁨" stackId="emotion" fill="var(--laugh-color)" isAnimationActive={false} />
          <Bar dataKey="평온" stackId="emotion" fill="var(--smile-color)" isAnimationActive={false} />
          <Bar dataKey="화남" stackId="emotion" fill="var(--angry-color)" isAnimationActive={false} />
          <Bar dataKey="슬픔" stackId="emotion" fill="var(--frown-color)" isAnimationActive={false} />
          <Bar dataKey="짜증" stackId="emotion" fill="var(--annoyed-color)" isAnimationActive={false} />
          <ChartTooltip content={<ChartTooltipContent />} cursor={false} />
          <ChartLegend content={<ChartLegendContent payload={undefined} />} />
        </BarChart>
      </ChartContainer>
    </div>
  );
});
