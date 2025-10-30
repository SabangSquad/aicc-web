import { Category } from '../types/category';
import { ChartConfig } from '../ui/chart';

export const categories: Category[] = ['배송', '결제', '제품', '기타'];

const colors = ['var(--chart-1)', 'var(--chart-2)', 'var(--chart-3)', 'var(--chart-4)'];
const overallColor = 'var(--chart-5)';

export const categoryChartColorSet: ChartConfig = {
  ...Object.fromEntries(categories.map((cat, index) => [cat, { label: cat, color: colors[index] }])),
  전체: { label: '전체', color: overallColor },
} satisfies ChartConfig;
