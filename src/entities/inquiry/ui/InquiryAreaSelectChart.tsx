'use client';
import { useState, useMemo } from 'react';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from '@/shared/ui/chart';
import { Checkbox } from '@/shared/ui/checkbox';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/shared/ui/select';
import { items } from '@/shared/data/inquiryItem';
import { Category, CategoryWithAll } from '@/shared/types/category';
import { categoryChartColorSet } from '@/shared/lib/category';

export function InquiryAreaSelectChart() {
  const [selectedCategories, setSelectedCategories] = useState<CategoryWithAll[]>(['전체']);
  const [dateFilter, setDateFilter] = useState<'week' | 'all'>('week');

  const chartData = useMemo(() => {
    const now = new Date();

    // ✅ 최근 7일 날짜 배열 생성
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const d = new Date(now);
      d.setDate(now.getDate() - (6 - i)); // 6일 전 ~ 오늘
      return d.toISOString().slice(0, 10);
    });

    const filtered = items.filter(item => {
      if (dateFilter === 'week') {
        const diff = (now.getTime() - new Date(item.createdAt).getTime()) / (1000 * 60 * 60 * 24);
        return diff <= 7;
      }
      return true;
    });

    const grouped: Record<string, Record<Category, number>> = {};
    filtered.forEach(item => {
      const date = new Date(item.createdAt).toISOString().slice(0, 10);
      if (!grouped[date]) {
        grouped[date] = { 배송: 0, 제품: 0, 결제: 0, 기타: 0 };
      }
      grouped[date][item.category]++;
    });

    const datesToUse = dateFilter === 'week' ? last7Days : Object.keys(grouped).sort();

    return datesToUse.map(date => {
      const counts = grouped[date] || { 배송: 0, 제품: 0, 결제: 0, 기타: 0 };
      return {
        date,
        전체: Object.values(counts).reduce((a, b) => a + b, 0),
        ...counts,
      };
    });
  }, [dateFilter]);

  const handleCategoryToggle = (cat: Category) => {
    setSelectedCategories(prev => (prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]));
  };

  return (
    <div className="flex flex-col">
      <div className="mb-4">
        <h2 className="text-2xl font-semibold tracking-tight">문의 추이 그래프</h2>
        <p className="mt-1 text-muted-foreground">기간별 문의 건수를 카테고리별로 확인할 수 있습니다.</p>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <label className="text-sm font-medium">날짜 선택</label>
        <Select value={dateFilter} onValueChange={(v: 'week' | 'all') => setDateFilter(v)}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="기간 선택" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">최근 1주일</SelectItem>
            <SelectItem value="all">전체</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* 카테고리 선택 */}
      <div className="flex gap-4 flex-wrap mb-4">
        {Object.keys(categoryChartColorSet).map(cat => (
          <label key={cat} className="flex items-center gap-2 cursor-pointer">
            <Checkbox
              checked={selectedCategories.includes(cat as Category)}
              onCheckedChange={() => handleCategoryToggle(cat as Category)}
            />
            <span className="text-sm">{cat}</span>
          </label>
        ))}
      </div>

      {/* 차트 (높이 줄임) */}
      <ChartContainer config={categoryChartColorSet} className="h-[250px] w-full">
        <AreaChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="date" tickLine={false} axisLine={false} />
          <YAxis tickLine={false} axisLine={false} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent payload={undefined} />} />

          {/* <Area
            type="monotone"
            dataKey="전체"
            stroke={categoryChartColorSet['전체'].color}
            fill={categoryChartColorSet['전체'].color}
            fillOpacity={0.3}
          /> */}

          {selectedCategories.map(cat => (
            <Area
              key={cat}
              type="monotone"
              dataKey={cat}
              stroke={categoryChartColorSet[cat].color}
              fill={categoryChartColorSet[cat].color}
              fillOpacity={0.25}
            />
          ))}
        </AreaChart>
      </ChartContainer>
    </div>
  );
}
