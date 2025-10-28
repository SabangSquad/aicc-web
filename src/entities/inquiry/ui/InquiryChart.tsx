'use client';
import { Pie, PieChart } from 'recharts';
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/shared/ui/chart';
import { items } from '@/shared/data/inquiryItem';

const categoryCounts = items.reduce(
  (acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1;
    return acc;
  },
  {} as Record<string, number>
);

const chartConfig: ChartConfig = {
  count: {
    label: '건수',
  },
  배송: {
    label: '배송',
    color: 'var(--chart-1)',
  },
  결제: {
    label: '결제',
    color: 'var(--chart-2)',
  },
  제품: {
    label: '제품',
    color: 'var(--chart-3)',
  },
  기타: {
    label: '기타',
    color: 'var(--chart-4)',
  },
} satisfies ChartConfig;

const chartData = Object.entries(categoryCounts).map(([category, count], index) => {
  const configKey = category as keyof typeof chartConfig;
  const color = chartConfig[configKey]?.color || `var(--chart-${index + 1})`;

  return {
    category: category,
    count: count,
    fill: color,
  };
});

export function InquiryChart() {
  const totalInquiries = items.length;

  return (
    <div className="flex flex-col">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">문의 카테고리 현황</h2>
        <p className="mt-1 text-muted-foreground">
          총 {totalInquiries}건의 문의 ({new Date().toLocaleDateString('ko-KR')})
        </p>
      </div>

      <div className="flex-1 ">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[300px]">
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent nameKey="category" hideLabel />} />
            <Pie data={chartData} dataKey="count" nameKey="category" innerRadius={50} outerRadius={90} label />
            <ChartLegend
              content={<ChartLegendContent nameKey="category" payload={undefined} />}
              className="-translate-y-2 flex-wrap gap-2 *:basis-1/3 *:justify-start"
            />
          </PieChart>
        </ChartContainer>
      </div>
    </div>
  );
}
