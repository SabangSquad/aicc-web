'use client';
import React, { useMemo } from 'react';
import { Label, PolarGrid, PolarRadiusAxis, RadialBar, RadialBarChart } from 'recharts';
import { ChartContainer } from '@/shared/ui/chart';
import { CaseType } from '@/shared/types/case';

export const AIResolutionRate = React.memo(({ items }: { items: CaseType[] }) => {
  const { resolutionRate, chartData } = useMemo(() => {
    const totalInquiries = items?.length || 0;
    const aiResolvedCount = items?.filter(item => item.status === 'AI자동해결').length || 16;
    const rate = totalInquiries > 0 ? Math.round((aiResolvedCount / totalInquiries) * 100) : 80;

    return {
      resolutionRate: rate,
      chartData: [{ name: 'AI 해결', value: rate, fill: 'url(#aiGradient)' }],
    };
  }, [items]);

  const chartConfig = {
    value: { label: '해결률' },
    ai: { label: 'AI 자동 해결' },
  };

  return (
    <div className="flex h-full flex-col">
      <div className="mb-4">
        <h2 className="text-2xl font-semibold tracking-tight">AI 자동 해결률</h2>
        <p className="text-md text-muted-foreground mt-1">전체 문의 중 AI가 직접 해결한 비중입니다.</p>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center p-6">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square w-[250px]">
          <RadialBarChart data={chartData} startAngle={90} endAngle={90 + resolutionRate * 3.6} innerRadius={80} outerRadius={110}>
            <defs>
              <linearGradient id="aiGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#ac55f2" />
                <stop offset="40%" stopColor="#e8499f" />
                <stop offset="100%" stopColor="#ff6b6b" />
              </linearGradient>
            </defs>

            <PolarGrid gridType="circle" radialLines={false} stroke="none" className="first:fill-muted last:fill-background" polarRadius={[86, 74]} />

            <RadialBar dataKey="value" background cornerRadius={10} />

            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                        <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-4xl font-bold">
                          {resolutionRate}%
                        </tspan>
                        <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground text-xs font-medium">
                          자동 해결됨
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
