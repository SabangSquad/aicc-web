import { ChartConfig } from '../ui/chart';
import { CATEGORY_GROUPS } from '../constant/category';

export type ServiceType = keyof typeof CATEGORY_GROUPS;
export type CategoryUnion = {
  [K in ServiceType]: { type: K; category: (typeof CATEGORY_GROUPS)[K][number] };
}[ServiceType];

const bases = ['var(--chart-1)', 'var(--chart-2)', 'var(--chart-3)', 'var(--chart-4)', 'var(--chart-5)', 'var(--chart-6)', 'var(--chart-7)'];

const categoryChartColorSet: ChartConfig = {
  전체: { label: '전체', color: 'var(--chart-6)' },
  null: { label: '미분류', color: '#a1a1aa' },
} as ChartConfig;

Object.values(CATEGORY_GROUPS).forEach(categories => {
  categories.forEach((cat, index) => {
    categoryChartColorSet[cat] = {
      label: cat,
      color: bases[index % bases.length],
    };
  });
});

export { categoryChartColorSet };
