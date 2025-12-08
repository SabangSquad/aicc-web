'use client';

import { useState, useMemo } from 'react';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from '@/shared/ui/chart';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/shared/ui/select';
import { Category } from '@/shared/types/category'; // CategoryWithAll 제거
import { categoryChartColorSet } from '@/shared/lib/category';
import { InquiryType } from '@/shared/types/inquiry';
import { categoryGroups } from '@/shared/constant/category';
import { cn } from '@/shared/lib/utils';

export function InquiryAreaSelectChart({ items }: { items: InquiryType[] }) {
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [dateFilter, setDateFilter] = useState<'week' | 'month' | 'all'>('all');

  // 1. 개별 카테고리 토글 (로직 단순화)
  const handleCategoryToggle = (cat: Category) => {
    setSelectedCategories(prev => {
      if (prev.includes(cat)) {
        return prev.filter(c => c !== cat);
      }
      return [...prev, cat];
    });
  };

  // 2. 그룹 전체 토글
  const handleGroupToggle = (groupName: keyof typeof categoryGroups) => {
    const groupCats = categoryGroups[groupName];

    setSelectedCategories(prev => {
      const isAllSelected = groupCats.every(cat => prev.includes(cat));

      if (isAllSelected) {
        // 이미 그룹이 다 선택되어 있으면 -> 해당 그룹 해제
        return prev.filter(c => !groupCats.includes(c));
      } else {
        // 하나라도 빠져 있으면 -> 해당 그룹 전체 선택 (중복 제거)
        return Array.from(new Set([...prev, ...groupCats]));
      }
    });
  };

  const chartData = useMemo(() => {
    const now = new Date();

    const filtered = items.filter(item => {
      const itemDate = new Date(item.created_at);
      const diffDays = (now.getTime() - itemDate.getTime()) / (1000 * 60 * 60 * 24);

      if (dateFilter === 'week') return diffDays <= 7;
      if (dateFilter === 'month') return diffDays <= 30;
      return true;
    });

    const grouped: Record<string, Record<Category, number>> = {};
    const allDates = new Set<string>();

    filtered.forEach(item => {
      const date = new Date(item.created_at).toISOString().slice(0, 10);
      allDates.add(date);

      if (!grouped[date]) {
        grouped[date] = {} as Record<Category, number>;
      }
      grouped[date][item.category] = (grouped[date][item.category] || 0) + 1;
    });

    const sortedDates = Array.from(allDates).sort();

    return sortedDates.map(date => {
      const counts = grouped[date] || {};

      // ✅ '전체' 합계 계산 로직 제거됨
      const dataEntry: Record<string, number | string> = { date };

      selectedCategories.forEach(cat => {
        dataEntry[cat] = counts[cat] || 0;
      });
      return dataEntry;
    });
  }, [items, dateFilter, selectedCategories]);

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">문의 추이 그래프</h2>
          <p className="mt-1 text-sm text-muted-foreground">기간별 문의량을 비교 분석합니다.</p>
        </div>
        <Select value={dateFilter} onValueChange={(v: 'week' | 'month' | 'all') => setDateFilter(v)}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="기간 선택" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">최근 1주일</SelectItem>
            <SelectItem value="month">최근 1개월</SelectItem>
            <SelectItem value="all">전체 기간</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* 카테고리 선택 영역 ('요약-전체' 섹션 제거됨) */}
      <div className="flex flex-col gap-4 p-4 rounded-lg bg-muted/30 border">
        {Object.entries(categoryGroups).map(([groupName, cats]) => {
          const isGroupAllSelected = cats.every(cat => selectedCategories.includes(cat));

          return (
            <div key={groupName} className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => handleGroupToggle(groupName as keyof typeof categoryGroups)}
                className={cn(
                  'text-sm font-medium w-16 text-left pl-1 transition-colors rounded-sm hover:bg-accent/50 py-0.5',
                  isGroupAllSelected ? 'text-foreground font-bold' : 'text-muted-foreground hover:text-foreground'
                )}
                title={`${groupName} 전체 선택/해제`}
              >
                {groupName}
              </button>

              <div className="flex flex-wrap gap-2 flex-1">
                {cats.map(cat => (
                  <CategoryChip
                    key={cat}
                    label={cat}
                    isSelected={selectedCategories.includes(cat)}
                    color={categoryChartColorSet[cat].color}
                    onClick={() => handleCategoryToggle(cat)}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <ChartContainer config={categoryChartColorSet} className="h-[350px] w-full">
        <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            {selectedCategories.map(cat => (
              <linearGradient key={cat} id={`fill${cat}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={categoryChartColorSet[cat].color} stopOpacity={0.8} />
                <stop offset="95%" stopColor={categoryChartColorSet[cat].color} stopOpacity={0.1} />
              </linearGradient>
            ))}
          </defs>

          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            tickMargin={10}
            tickFormatter={value => new Date(value).toLocaleDateString('ko-KR', { month: '2-digit', day: '2-digit' })}
          />
          <YAxis tickLine={false} axisLine={false} tickMargin={10} width={30} />

          <ChartTooltip content={<ChartTooltipContent />} cursor={false} />
          <ChartLegend content={<ChartLegendContent />} />

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

function CategoryChip({
  label,
  isSelected,
  color,
  onClick,
}: {
  label: string;
  isSelected: boolean;
  color: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 border',
        isSelected
          ? 'text-white shadow-sm'
          : 'bg-white text-muted-foreground hover:bg-muted/50 border-transparent hover:border-border'
      )}
      style={{
        backgroundColor: isSelected ? color : undefined,
        borderColor: isSelected ? color : undefined,
      }}
    >
      {isSelected && (
        <span className="mr-1.5 bg-white/20 rounded-full p-0.5">
          <svg width="8" height="6" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M1 4L3.5 6.5L9 1"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      )}
      {label}
    </button>
  );
}
