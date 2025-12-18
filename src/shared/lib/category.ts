import { CATEGORY } from '../constant/category';
import { ChartConfig } from '../ui/chart';

const bases = ['var(--chart-1)', 'var(--chart-2)', 'var(--chart-3)', 'var(--chart-4)'];
const overallColor = 'var(--chart-5)';

const getSoftColor = (base: string, idx: number) => `color-mix(in srgb, ${base} ${85 - idx * 5}%, white)`;

export const categoryChartColorSet: ChartConfig = {
  ...Object.fromEntries(
    CATEGORY.map((cat, index) => {
      const base = bases[index % bases.length];
      return [cat, { label: cat, color: getSoftColor(base, Math.floor(index / bases.length)) }];
    })
  ),
  전체: { label: '전체', color: overallColor },
} satisfies ChartConfig;
