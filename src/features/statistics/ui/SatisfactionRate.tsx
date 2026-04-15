'use client';
import React, { useMemo } from 'react';
import { Label, PolarGrid, PolarRadiusAxis, RadialBar, RadialBarChart } from 'recharts';
import { ChartContainer } from '@/shared/ui/chart';
import { SatisfactionType } from '@/shared/types/satisfaction';

export const SatisfactionRate = React.memo(({ items }: { items: SatisfactionType[] }) => {
  const { avgScore, displayValue, chartData } = useMemo(() => {
    if (!items || items.length === 0) {
      return { avgScore: 0, displayValue: 0, chartData: [] };
    }

    const validScores = items.map(item => Number(item.score)).filter(score => !isNaN(score) && score > 0);

    let average = 0;
    if (validScores.length > 0) {
      const sum = validScores.reduce((acc, curr) => acc + curr, 0);
      average = parseFloat((sum / validScores.length).toFixed(1));
    }

    const TARGET_SCORE = 5;
    const display = Math.min((average / TARGET_SCORE) * 100, 100);

    return {
      avgScore: average,
      displayValue: display,
      chartData: [{ name: '만족도', value: display, fill: 'var(--chart-2)' }],
    };
  }, [items]);

  const chartConfig = {
    value: { label: '평균 점수' },
    satisfaction: { label: '고객 만족도', color: 'hsl(var(--chart-2))' },
  };

  return (
    <div className="flex h-full flex-col">
      <div className="mb-4">
        <h2 className="text-2xl font-semibold tracking-tight">평균 고객 만족도</h2>
        <p className="text-md text-muted-foreground mt-1">고객들이 남긴 만족도의 평균입니다.</p>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center p-6">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square w-[250px]">
          <RadialBarChart data={chartData} startAngle={90} endAngle={90 + displayValue * 3.6} innerRadius={80} outerRadius={110}>
            <PolarGrid gridType="circle" radialLines={false} stroke="none" className="first:fill-muted last:fill-background" polarRadius={[86, 74]} />

            <RadialBar dataKey="value" background cornerRadius={10} />

            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                        <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-3xl font-bold">
                          {avgScore}점
                        </tspan>
                        <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground text-xs font-medium">
                          5점 만점
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </div>
    </div>
  );
});

SatisfactionRate.displayName = 'SatisfactionRate';
