'use client';
import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from '@/shared/ui/carousel';
import { EmotionType } from '@/shared/types/emotion';
import { CaseStatus, CaseType } from '@/shared/types/case';

const getCardStyle = (emotion: EmotionType) => {
  switch (emotion) {
    case '기쁨':
      return {
        gradient: 'from-[#34d399] to-[#059669]', // Emerald
        shadow: 'shadow-emerald-500/25',
        character: '😆',
      };
    case '평온':
      return {
        gradient: 'from-[#38bdf8] to-[#0284c7]', // Sky
        shadow: 'shadow-sky-500/25',
        character: '😌',
      };
    case '화남':
      return {
        gradient: 'from-[#fb7185] to-[#e11d48]', // Rose
        shadow: 'shadow-rose-500/25',
        character: '😡',
      };
    case '슬픔':
      return {
        gradient: 'from-[#818cf8] to-[#4f46e5]', // Indigo
        shadow: 'shadow-indigo-500/25',
        character: '😢',
      };
    case '짜증':
      return {
        gradient: 'from-[#fb923c] to-[#ea580c]', // Orange
        shadow: 'shadow-orange-500/25',
        character: '😤',
      };
    default:
      return {
        gradient: 'from-[#9ca3af] to-[#4b5563]', // Gray
        shadow: 'shadow-gray-500/25',
        character: '💬',
      };
  }
};

const formatCardDate = (dateString: string) => {
  const d = new Date(dateString);
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const hours = String(d.getHours()).padStart(2, '0');
  const mins = String(d.getMinutes()).padStart(2, '0');
  return `${month}.${day} • ${hours}:${mins} 접수`;
};

interface InquiryGraphicBoardProps {
  items: CaseType[];
}

export function InquiryTable({ items }: InquiryGraphicBoardProps) {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState<CaseStatus | '전체'>('대기');
  const [api, setApi] = useState<CarouselApi>();

  const counts = useMemo(() => {
    return items.reduce(
      (acc, item) => {
        if (item.status === '대기') acc.pending += 1;
        else if (item.status === '상담') acc.inProgress += 1;
        else if (item.status === 'AI자동해결') acc.aiResolved += 1;
        else if (item.status === '종료') acc.closed += 1;
        return acc;
      },
      { pending: 0, inProgress: 0, aiResolved: 0, closed: 0 }
    );
  }, [items]);

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      if (activeFilter === '전체') return true;
      return item.status === activeFilter;
    });
  }, [items, activeFilter]);

  const handleFilterClick = (filter: CaseStatus | '전체') => {
    setActiveFilter(filter);
    api?.scrollTo(0);
  };

  const renderTab = (label: string, value: CaseStatus | '전체', count?: number) => {
    const isActive = activeFilter === value;
    return (
      <button
        onClick={() => handleFilterClick(value)}
        className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-all ${
          isActive
            ? 'bg-zinc-800 text-white shadow-md' // 활성 상태
            : 'bg-zinc-100 text-zinc-500 hover:bg-zinc-200 hover:text-zinc-700' // 비활성 상태
        }`}
      >
        {label}
        {count !== undefined && <span className={`rounded-full px-1.5 py-0.5 text-xs ${isActive ? 'bg-white/20' : 'bg-zinc-200/50'}`}>{count}</span>}
      </button>
    );
  };

  return (
    <div className="min-w-0 flex-1">
      <div className="mb-5 flex items-end justify-between">
        <div className="flex-1">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900">금주의 상담 현황</h2>
          <p className="text-muted-foreground mt-1">
            답변을 기다리는 고객의 질문이 <span className="font-bold text-rose-500">{counts.pending}건</span> 있습니다.
          </p>
        </div>
        <Link href="/inquiry" className="text-sm font-semibold text-zinc-400 transition-colors hover:text-zinc-900">
          더보기 &rarr;
        </Link>
      </div>

      {/* 필터 영역 */}
      <div className="mb-6 flex flex-wrap gap-2">
        {renderTab('전체', '전체', items.length)}
        {renderTab('상담대기', '대기', counts.pending)}
        {renderTab('상담중', '상담', counts.inProgress)}
        {renderTab('AI자동해결', 'AI자동해결', counts.aiResolved)}
        {renderTab('상담종료', '종료', counts.closed)}
      </div>

      {/* 카드 캐러셀 영역 */}
      <div className="group relative">
        {filteredItems.length > 0 ? (
          <Carousel setApi={setApi} opts={{ align: 'start', slidesToScroll: 1 }} className="w-full">
            <CarouselContent className="-ml-4 py-4">
              {filteredItems.map(item => {
                const style = getCardStyle(item.emotion);
                return (
                  <CarouselItem key={item.case_id} className="basis-[85%] pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                    <div
                      onClick={() => router.push(`/inquiry/${item.case_id}`)}
                      className={`group/card relative flex h-[240px] w-full cursor-pointer flex-col overflow-hidden rounded-2xl bg-gradient-to-br ${style.gradient} border border-white/20 p-5 shadow-lg ${style.shadow} transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl`}
                    >
                      <div className="relative z-10 flex h-full flex-col">
                        <div className="mb-3 flex items-center justify-between text-[12px] font-bold tracking-wide text-white/80">
                          <span className="rounded-md bg-white/20 px-2 py-1 backdrop-blur-sm">{item.category}</span>
                          <span className="rounded-md bg-black/20 px-2 py-1 backdrop-blur-sm">{item.status}</span>
                        </div>

                        <h3 className="mt-2 line-clamp-3 text-lg leading-snug font-bold text-white drop-shadow-sm">{item.summary}</h3>

                        <p className="mt-auto text-[12px] font-medium text-white/70">{formatCardDate(item.created_at)}</p>
                      </div>

                      <div className="absolute -right-6 -bottom-8 z-0 opacity-[0.25] transition-transform duration-500 select-none group-hover/card:scale-105">
                        <span className="text-[140px] leading-none mix-blend-overlay">{style.character}</span>
                      </div>
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>

            <CarouselPrevious className="absolute -left-4 z-20 hidden h-10 w-10 border-zinc-200 bg-white/90 text-zinc-600 shadow-md backdrop-blur-sm transition-all hover:bg-white disabled:opacity-0 md:flex" />
            <CarouselNext className="absolute -right-4 z-20 hidden h-10 w-10 border-zinc-200 bg-white/90 text-zinc-600 shadow-md backdrop-blur-sm transition-all hover:bg-white disabled:opacity-0 md:flex" />
          </Carousel>
        ) : (
          <div className="flex h-[240px] w-full flex-col items-center justify-center rounded-2xl text-zinc-500">
            <span className="mb-3 text-3xl opacity-50">📭</span>
            <span className="text-sm font-semibold">해당 상태의 문의 내역이 없습니다.</span>
          </div>
        )}
      </div>
    </div>
  );
}
