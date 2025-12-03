'use client';
import { Pie, PieChart } from 'recharts';
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from '@/shared/ui/chart';
import { categoryChartColorSet } from '@/shared/lib/category';
import { InquiryType } from '@/shared/types/inquiry';
import { Category } from '@/shared/types/category';

export function InquiryChart({ items }: { items: InquiryType[] }) {
  // 1. 카테고리별 개수 집계
  const categoryCounts = items.reduce((acc: Partial<Record<Category, number>>, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1;
    return acc;
  }, {});

  // 2. 데이터 변환, 정렬 및 상위 6개 추출
  const chartData = Object.entries(categoryCounts)
    .map(([category, count]) => {
      // category key를 사용하여 색상 가져오기 (타입 단언 필요할 수 있음)
      const color = categoryChartColorSet[category as Category]?.color;
      return {
        category: category,
        count: count,
        fill: color,
      };
    })
    .sort((a, b) => b.count - a.count) // 개수 기준 내림차순 정렬
    .slice(0, 6); // 상위 6개만 자르기

  const totalInquiries = items.length;

  return (
    <div className="flex flex-col">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">문의 카테고리 현황</h2>
        <p className="mt-1 text-muted-foreground">
          총 {totalInquiries}건의 문의 ({new Date().toLocaleDateString('ko-KR')})
          <span className="text-xs ml-2">(상위 6개 항목)</span>
        </p>
      </div>

      <div className="flex-1">
        <ChartContainer config={categoryChartColorSet} className="mx-auto aspect-square max-h-[320px]">
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
