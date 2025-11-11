// 'use client';
// import { useState, useMemo } from 'react';
// import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';
// import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from '@/shared/ui/chart';
// import { Checkbox } from '@/shared/ui/checkbox';
// import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/shared/ui/select';
// import { CategoryWithAll, Category } from '@/shared/types/category';
// import { categoryChartColorSet } from '@/shared/lib/category';
// import { InquiryType } from '@/shared/types/inquiry';
// import { categoryGroups } from '@/shared/constant/category';

// export function InquiryAreaSelectChart({ items }: { items: InquiryType[] }) {
//   const [selectedCategories, setSelectedCategories] = useState<CategoryWithAll[]>(['전체']);
//   const [dateFilter, setDateFilter] = useState<'week' | 'all'>('week');

//   // 개별 카테고리 토글
//   const handleCategoryToggle = (cat: Category) => {
//     setSelectedCategories(prev => (prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]));
//   };

//   // 그룹 단위 토글
//   const handleGroupToggle = (groupName: keyof typeof categoryGroups) => {
//     const groupCats = categoryGroups[groupName];
//     const isAllSelected = groupCats.every(cat => selectedCategories.includes(cat));

//     setSelectedCategories(prev => {
//       if (isAllSelected) {
//         // 그룹 전체 해제
//         return prev.filter(cat => !groupCats.includes(cat));
//       } else {
//         // 그룹 전체 선택 (중복 제거)
//         return Array.from(new Set([...prev, ...groupCats]));
//       }
//     });
//   };

//   // 차트 데이터 생성
//   const chartData = useMemo(() => {
//     const now = new Date();

//     const last7Days = Array.from({ length: 7 }, (_, i) => {
//       const d = new Date(now);
//       d.setDate(now.getDate() - (6 - i)); // 6일 전 ~ 오늘
//       return d.toISOString().slice(0, 10);
//     });

//     const filtered = items.filter(item => {
//       if (dateFilter === 'week') {
//         const diff = (now.getTime() - new Date(item.created_at).getTime()) / (1000 * 60 * 60 * 24);
//         return diff <= 7;
//       }
//       return true;
//     });

//     const grouped: Record<string, Record<Category, number>> = {};
//     filtered.forEach(item => {
//       const date = new Date(item.created_at).toISOString().slice(0, 10);
//       if (!grouped[date]) {
//         grouped[date] = {} as Record<Category, number>;
//       }
//       grouped[date][item.category] = (grouped[date][item.category] || 0) + 1;
//     });

//     const datesToUse = dateFilter === 'week' ? last7Days : Object.keys(grouped).sort();

//     return datesToUse.map(date => {
//       const counts = grouped[date] || {};
//       const dataEntry = { date, 전체: Object.values(counts).reduce((a, b) => a + b, 0) };
//       // 선택한 카테고리별 값 추가
//       selectedCategories.forEach(cat => {
//         if (cat !== '전체') {
//           dataEntry[cat] = counts[cat] || 0;
//         }
//       });
//       return dataEntry;
//     });
//   }, [items, dateFilter, selectedCategories]);

//   return (
//     <div className="flex flex-col">
//       {/* 제목 */}
//       <div className="mb-4">
//         <h2 className="text-2xl font-semibold tracking-tight">문의 추이 그래프</h2>
//         <p className="mt-1 text-muted-foreground">기간별 문의 건수를 카테고리별로 확인할 수 있습니다.</p>
//       </div>

//       {/* 날짜 선택 */}
//       <div className="flex items-center gap-4 mb-4">
//         <label className="text-sm font-medium">날짜 선택</label>
//         <Select value={dateFilter} onValueChange={(v: 'week' | 'all') => setDateFilter(v)}>
//           <SelectTrigger className="w-[150px]">
//             <SelectValue placeholder="기간 선택" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="week">최근 1주일</SelectItem>
//             <SelectItem value="all">전체</SelectItem>
//           </SelectContent>
//         </Select>
//       </div>

//       {/* 그룹/카테고리 선택 */}
//       <div className="flex flex-col gap-4 mb-4">
//         {Object.entries(categoryGroups).map(([groupName, cats]) => (
//           <div key={groupName} className="flex flex-col gap-2">
//             {/* 그룹 체크박스 */}
//             <label className="flex items-center gap-2 font-medium cursor-pointer">
//               <Checkbox
//                 checked={cats.every(cat => selectedCategories.includes(cat))}
//                 onCheckedChange={() => handleGroupToggle(groupName as keyof typeof categoryGroups)}
//               />
//               {groupName}
//             </label>

//             {/* 개별 카테고리 */}
//             <div className="flex flex-wrap gap-2 pl-6">
//               {cats.map(cat => (
//                 <label key={cat} className="flex items-center gap-1 text-sm cursor-pointer">
//                   <Checkbox
//                     checked={selectedCategories.includes(cat)}
//                     onCheckedChange={() => handleCategoryToggle(cat)}
//                   />
//                   {cat}
//                 </label>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* 차트 */}
//       <ChartContainer config={categoryChartColorSet} className="h-[350px] w-full">
//         <AreaChart data={chartData}>
//           <CartesianGrid strokeDasharray="3 3" vertical={false} />
//           <XAxis dataKey="date" tickLine={false} axisLine={false} />
//           <YAxis tickLine={false} axisLine={false} />
//           <ChartTooltip content={<ChartTooltipContent />} />
//           <ChartLegend content={<ChartLegendContent payload={undefined} />} />

//           {/* 전체 */}
//           {selectedCategories.includes('전체') && (
//             <Area
//               type="monotone"
//               dataKey="전체"
//               stroke={categoryChartColorSet['전체'].color}
//               fill={categoryChartColorSet['전체'].color}
//               fillOpacity={0.3}
//             />
//           )}

//           {/* 선택한 카테고리 */}
//           {selectedCategories
//             .filter(cat => cat !== '전체')
//             .map(cat => (
//               <Area
//                 key={cat}
//                 type="monotone"
//                 dataKey={cat}
//                 stroke={categoryChartColorSet[cat].color}
//                 fill={categoryChartColorSet[cat].color}
//                 fillOpacity={0.25}
//               />
//             ))}
//         </AreaChart>
//       </ChartContainer>
//     </div>
//   );
// }
