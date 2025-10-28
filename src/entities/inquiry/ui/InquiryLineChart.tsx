'use client';
import { TrendingUp } from 'lucide-react';
import { CartesianGrid, LabelList, Line, LineChart, XAxis, YAxis } from 'recharts';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/shared/ui/chart';
import { items } from '@/shared/data/inquiryItem';

const today = new Date();
const thirtyDaysAgo = new Date(today);
thirtyDaysAgo.setDate(today.getDate() - 30);

const recentItems = items.filter(item => new Date(item.createdAt) >= thirtyDaysAgo);

const inquiryCountByDate = recentItems.reduce(
  (acc, item) => {
    const date = new Date(item.createdAt).toLocaleDateString('ko-KR', {
      month: '2-digit',
      day: '2-digit',
    });
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  },
  {} as Record<string, number>
);

const chartData: Array<{ date: string; count: number }> = [];
for (let i = 0; i <= 30; i++) {
  const d = new Date(thirtyDaysAgo);
  d.setDate(d.getDate() + i);
  const label = d.toLocaleDateString('ko-KR', { month: '2-digit', day: '2-digit' });
  chartData.push({
    date: label,
    count: inquiryCountByDate[label] || 0,
  });
}

const chartConfig = {
  count: {
    label: '문의 수',
    color: 'var(--chart-1)',
  },
} satisfies ChartConfig;

export function InquiryLineChart() {
  const total = recentItems.length;

  return (
    <div className="flex flex-col ">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">최근 문의 그래프</h2>
        <p className="mt-1 text-muted-foreground">최근 30일간 일별 문의 건수 추이입니다.</p>
      </div>

      <ChartContainer config={chartConfig} className="h-[200px]">
        <LineChart
          accessibilityLayer
          data={chartData}
          margin={{
            top: 20,
            left: 0,
            right: 20,
            bottom: 0,
          }}
        >
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={6} tick={{ fontSize: 10 }} interval={4} />
          <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 10 }} width={25} />
          <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
          <Line
            type="monotone"
            dataKey="count"
            stroke="var(--color-count)"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4 }}
          >
            <LabelList position="top" offset={8} className="fill-foreground" fontSize={9} />
          </Line>
        </LineChart>
      </ChartContainer>

      <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
        <TrendingUp className="h-3 w-3 text-emerald-500" />
        <span>최근 한 달 동안 {total}건의 문의가 발생했습니다.</span>
      </div>
    </div>
  );
}
