'use client';
import { Label, PolarGrid, PolarRadiusAxis, RadialBar, RadialBarChart } from 'recharts';
import { ChartContainer } from '@/shared/ui/chart';
import { CaseType } from '@/shared/types/case';

export function AIAverageResponseTime({ items }: { items: CaseType[] }) {
  const calculateMedianTime = (data: CaseType[]) => {
    const aiCases = data
      .filter(item => item.status === 'AI자동해결' && item.closed_at)
      .map(item => {
        const start = new Date(item.created_at).getTime();
        const end = new Date(item.closed_at!).getTime();
        return (end - start) / (1000 * 60);
      })
      .sort((a, b) => a - b); // 오름차순 정렬

    if (aiCases.length === 0) return 0;

    const mid = Math.floor(aiCases.length / 2);
    // 데이터 개수가 짝수면 중앙 두 값의 평균, 홀수면 중앙값 반환
    const median = aiCases.length % 2 !== 0 ? aiCases[mid] : (aiCases[mid - 1] + aiCases[mid]) / 2;

    return parseFloat(median.toFixed(1));
  };

  const avgMinutes = calculateMedianTime(items) || 1.5;

  const TARGET_MINUTES = 5;
  const displayValue = Math.min((avgMinutes / TARGET_MINUTES) * 100, 100);

  const chartData = [{ name: '응답 시간', value: displayValue, fill: 'var(--chart-2)' }];

  const chartConfig = {
    value: { label: '평균 시간' },
    ai: { label: 'AI 응답', color: 'hsl(var(--chart-2))' },
  };

  return (
    <div className="flex h-full flex-col">
      <div className="mb-4">
        <h2 className="text-2xl font-semibold tracking-tight">AI 평균 처리 시간</h2>
        <p className="text-md text-muted-foreground mt-1">상담 AI의 평균 처리 시간입니다.</p>
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
                          {avgMinutes}분
                        </tspan>
                        <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground text-xs font-medium">
                          중앙값
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
}
