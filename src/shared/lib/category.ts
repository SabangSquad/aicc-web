import { ChartConfig } from '../ui/chart';

export const SERVICE_CATEGORIES = {
  병원: ['예약', '예약 확인', '예약 변경', '예약 취소', '진료과목'],
  식당: ['예약', '예약 확인', '예약 변경', '예약 취소', '메뉴', '가격'],
  이커머스: ['배송 조회', '주문 확인', '교환', '환불', '취소', '상품 정보'],
} as const;

export type ServiceType = keyof typeof SERVICE_CATEGORIES;
export type CategoryUnion = {
  [K in ServiceType]: { type: K; category: (typeof SERVICE_CATEGORIES)[K][number] };
}[ServiceType];

const bases = ['var(--chart-1)', 'var(--chart-2)', 'var(--chart-3)', 'var(--chart-4)'];
const overallColor = 'var(--chart-5)';
const getSoftColor = (base: string, idx: number) => `color-mix(in srgb, ${base} ${85 - idx * 5}%, white)`;

const allUniqueCategories = Array.from(new Set(Object.values(SERVICE_CATEGORIES).flat()));

export const categoryChartColorSet: ChartConfig = {
  ...Object.fromEntries(
    allUniqueCategories.map((cat, index) => {
      const base = bases[index % bases.length];
      return [cat, { label: cat, color: getSoftColor(base, Math.floor(index / bases.length)) }];
    })
  ),
  전체: { label: '전체', color: overallColor },
} satisfies ChartConfig;
