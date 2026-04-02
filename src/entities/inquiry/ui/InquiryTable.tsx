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
      return { bg: 'bg-[var(--laugh-color,#22a37a)]', character: '😆' };
    case '평온':
      return { bg: 'bg-[var(--smile-color,#48c9b0)]', character: '😌' };
    case '화남':
      return { bg: 'bg-[var(--angry-color,#ec4b68)]', character: '😡' };
    case '슬픔':
      return { bg: 'bg-[var(--frown-color,#4a90e2)]', character: '😢' };
    case '짜증':
      return { bg: 'bg-[var(--annoyed-color,#f5a623)]', character: '😤' };
    default:
      return { bg: 'bg-[var(--smile-color,#48c9b0)]', character: '😌' };
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

  const [activeFilter, setActiveFilter] = useState<CaseStatus>('대기');

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
      if (activeFilter === '대기') return item.status === '대기';
      if (activeFilter === '상담') return item.status === '상담';
      if (activeFilter === 'AI자동해결') return item.status === 'AI자동해결';
      if (activeFilter === '종료') return item.status === '종료';
      return true;
    });
  }, [items, activeFilter]);

  const toggleFilter = (filter: CaseStatus) => {
    setActiveFilter(prev => (prev === filter ? '대기' : filter));
    api?.scrollTo(0);
  };

  return (
    <div className="min-w-0 flex-1">
      <div className="flex items-end justify-between">
        <div className="flex-1">
          <h2 className="text-2xl font-semibold tracking-tight">금주의 상담 현황</h2>
          <p className="text-muted-foreground mt-1">
            답변을 기다리는 고객의 질문이 <span className="text-xl font-bold text-red-400 underline">{counts.pending}건</span> 있습니다.
          </p>
        </div>
        <Link href="/inquiry" className="text-muted-foreground hover:text-foreground pb-3 text-sm font-medium underline transition-colors">
          더보기
        </Link>
      </div>

      <div className="flex gap-4 py-4 text-sm font-medium">
        <button
          onClick={() => toggleFilter('대기')}
          className={`flex items-center transition-colors ${activeFilter === '대기' ? 'text-[var(--laugh-color,#22a37a)]' : 'text-muted-foreground hover:text-foreground'}`}
        >
          상담대기 <span className="ml-1 text-base font-bold">{counts.pending}</span>
        </button>
        <button
          onClick={() => toggleFilter('상담')}
          className={`flex items-center transition-colors ${activeFilter === '상담' ? 'text-[var(--laugh-color,#22a37a)]' : 'text-muted-foreground hover:text-foreground'}`}
        >
          상담중 <span className="ml-1 text-base font-bold">{counts.inProgress}</span>
        </button>
        <button
          onClick={() => toggleFilter('AI자동해결')}
          className={`flex items-center transition-colors ${activeFilter === 'AI자동해결' ? 'text-[var(--laugh-color,#22a37a)]' : 'text-muted-foreground hover:text-foreground'}`}
        >
          AI자동해결 <span className="ml-1 text-base font-bold">{counts.aiResolved}</span>
        </button>
        <button
          onClick={() => toggleFilter('종료')}
          className={`flex items-center transition-colors ${activeFilter === '종료' ? 'text-[var(--laugh-color,#22a37a)]' : 'text-muted-foreground hover:text-foreground'}`}
        >
          상담종료 <span className="ml-1 text-base font-bold">{counts.closed}</span>
        </button>
      </div>

      <div className="group relative">
        {filteredItems.length > 0 ? (
          <Carousel
            setApi={setApi}
            opts={{
              align: 'start',
              slidesToScroll: 1,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4 pt-4">
              {filteredItems.map(item => {
                const style = getCardStyle(item.emotion);
                return (
                  <CarouselItem key={item.case_id} className="basis-1/3 pl-4 md:basis-1/4">
                    <div
                      onClick={() => router.push(`/inquiry/${item.case_id}`)}
                      className={`relative h-[240px] w-full cursor-pointer overflow-hidden rounded-xl p-5 transition-transform hover:-translate-y-1 hover:shadow-lg ${style.bg}`}
                    >
                      <div className="flex justify-between text-[13px] font-medium text-white/90">
                        <span>{item.category}</span>
                        <span>{item.status}</span>
                      </div>
                      <h3 className="mt-4 line-clamp-3 text-[16px] leading-tight font-bold text-white">{item.summary}</h3>
                      <p className="mt-2 text-[11px] font-medium text-white/80">{formatCardDate(item.created_at)}</p>

                      <div className="absolute right-0 bottom-0 flex h-24 w-24 items-end justify-end p-2 select-none">
                        <span className="text-6xl">{style.character}</span>
                      </div>
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>

            <CarouselPrevious className="absolute left-2 z-20 hidden border-gray-200 bg-white/90 text-gray-500 opacity-0 shadow-md backdrop-blur-sm transition-opacity group-hover:opacity-100 hover:bg-white hover:text-gray-800 md:flex" />
            <CarouselNext className="absolute right-2 z-20 hidden border-gray-200 bg-white/90 text-gray-500 opacity-0 shadow-md backdrop-blur-sm transition-opacity group-hover:opacity-100 hover:bg-white hover:text-gray-800 md:flex" />
          </Carousel>
        ) : (
          <div className="bg-muted/30 text-muted-foreground my-2 flex h-[240px] w-full items-center justify-center rounded-[24px] font-medium">
            해당 상태의 문의 내역이 없습니다.
          </div>
        )}
      </div>
    </div>
  );
}
