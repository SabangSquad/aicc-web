'use client';
import { TrendingUp } from 'lucide-react';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/shared/ui/chart';
import { categoryChartColorSet } from '@/shared/lib/category';
import { thirtyDaysAgo } from '@/shared/lib/date';
import { InquiryType } from '@/shared/types/inquiry';

export function InquiryLineChart({ items }: { items: InquiryType[] }) {
  const recentItems = items.filter(item => new Date(item.created_at) >= thirtyDaysAgo);

  const inquiryCountByDate = recentItems.reduce((acc: Record<string, number>, item) => {
    const date = new Date(item.created_at).toLocaleDateString('ko-KR', {
      month: '2-digit',
      day: '2-digit',
    });
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});
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
  const total = recentItems.length;

  return (
    <div className="flex flex-col">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">최근 문의 그래프</h2>
        <div className="mt-2 flex items-center gap-2">
          <TrendingUp className="text-emerald-500" size={16} />
          <p className="mt-1 text-muted-foreground">최근 한 달 동안 {total}건의 문의가 발생했습니다.</p>
        </div>
      </div>

      <ChartContainer config={categoryChartColorSet} className="h-[200px]">
        <AreaChart
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
          <Area
            type="monotone"
            dataKey="count"
            stroke={categoryChartColorSet['전체'].color}
            fill={categoryChartColorSet['전체'].color}
            fillOpacity={0.25}
          />
        </AreaChart>
      </ChartContainer>
    </div>
  );
}
