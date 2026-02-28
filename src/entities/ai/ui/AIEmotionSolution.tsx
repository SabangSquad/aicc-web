'use client';

import { TrendingUp } from 'lucide-react';
import {
  Label,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
  PolarAngleAxis, // 1. 이 컴포넌트가 필수입니다.
} from 'recharts';

import { ChartConfig, ChartContainer } from '@/shared/ui/chart';
import { InquiryType } from '@/shared/types/inquiry';

export function AIEmotionSolution({ items }: { items: InquiryType[] }) {
  // 점수 고정
  const score = 50;

  // 2. 데이터 설정: fill 색상은 여기서 지정하거나 아래 RadialBar className으로 제어 가능
  // 만약 tailwind.config.ts에 'ai'라는 컬러가 없다면 'fill-violet-500' 등으로 변경하세요.
  const chartData = [{ visitors: score, fill: 'var(--ai)' }];

  const chartConfig = {
    visitors: { label: '점수' },
  } satisfies ChartConfig;

  return (
    <div className="flex flex-col">
      <div className="pb-4">
        <h2 className="text-2xl font-semibold tracking-tight">감성 분석 점수</h2>
        <p className="mt-1 text-muted-foreground">최근 {items.length}건 대화의 평균 감성 지수입니다.</p>
      </div>

      <div className="flex-1 flex items-center justify-center min-h-[200px]">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px] w-full ">
          <RadialBarChart
            data={chartData}
            startAngle={180}
            endAngle={0} // 반원(12시 방향까지만) 설정
            innerRadius={80}
            outerRadius={110}
          >
            {/* 3. 핵심 수정 사항: 0~100점 범위를 명시해야 50점이 절반만 찹니다 */}
            <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />

            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                        <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-4xl font-bold">
                          {score}
                        </tspan>
                        <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground text-sm">
                          / 100점
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>

            <RadialBar dataKey="visitors" background cornerRadius={10} className="fill-violet-500 stroke-transparent stroke-2" />
          </RadialBarChart>
        </ChartContainer>
      </div>

      <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground -mt-12">
        <TrendingUp className="h-4 w-4 text-emerald-500" />
        <span>
          전일 대비 <span className="text-emerald-500 font-medium">2점 상승</span>
        </span>
      </div>
    </div>
  );
}
