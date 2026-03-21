'use client';
import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { InquiryType, InquiryStatus } from '@/shared/types/inquiry';
import { Emotion } from '@/shared/types/emotion';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from '@/shared/ui/carousel';

const getCardStyle = (emotion: Emotion) => {
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
  items: InquiryType[];
}

export function InquiryTable({ items }: InquiryGraphicBoardProps) {
  const router = useRouter();

  const [activeFilter, setActiveFilter] = useState<InquiryStatus>('대기');

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

  const toggleFilter = (filter: InquiryStatus) => {
    setActiveFilter(prev => (prev === filter ? '대기' : filter));
    api?.scrollTo(0);
  };

  return (
    <div className="flex-1 min-w-0">
      <div className="flex items-end justify-between">
        <div className="flex-1">
          <h2 className="text-2xl font-semibold tracking-tight">금주의 상담 현황</h2>
          <p className="mt-1 text-muted-foreground">
            답변을 기다리는 고객의 질문이 <span className="text-xl font-bold text-red-400 underline">{counts.pending}건</span> 있습니다.
          </p>
        </div>
        <Link href="/inquiry" className="pb-3 text-sm font-medium transition-colors text-muted-foreground hover:text-foreground">
          더보기
        </Link>
      </div>

      <div className="flex gap-4 py-4 text-sm font-medium">
        <button
          onClick={() => toggleFilter('대기')}
          className={`transition-colors flex items-center ${activeFilter === '대기' ? 'text-[var(--laugh-color,#22a37a)]' : 'text-muted-foreground hover:text-foreground'}`}
        >
          상담대기 <span className="ml-1 text-base font-bold">{counts.pending}</span>
        </button>
        <button
          onClick={() => toggleFilter('상담')}
          className={`transition-colors flex items-center ${activeFilter === '상담' ? 'text-[var(--laugh-color,#22a37a)]' : 'text-muted-foreground hover:text-foreground'}`}
        >
          상담중 <span className="ml-1 text-base font-bold">{counts.inProgress}</span>
        </button>
        <button
          onClick={() => toggleFilter('AI자동해결')}
          className={`transition-colors flex items-center ${activeFilter === 'AI자동해결' ? 'text-[var(--laugh-color,#22a37a)]' : 'text-muted-foreground hover:text-foreground'}`}
        >
          AI자동해결 <span className="ml-1 text-base font-bold">{counts.aiResolved}</span>
        </button>
        <button
          onClick={() => toggleFilter('종료')}
          className={`transition-colors flex items-center ${activeFilter === '종료' ? 'text-[var(--laugh-color,#22a37a)]' : 'text-muted-foreground hover:text-foreground'}`}
        >
          상담종료 <span className="ml-1 text-base font-bold">{counts.closed}</span>
        </button>
      </div>

      <div className="relative group">
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
                  <CarouselItem key={item.case_id} className="pl-4  basis-1/3 md:basis-1/4 ">
                    <div
                      onClick={() => router.push(`/inquiry/${item.case_id}`)}
                      className={`relative w-full h-[240px] p-5 cursor-pointer overflow-hidden rounded-xl transition-transform hover:-translate-y-1 hover:shadow-lg ${style.bg}`}
                    >
                      <div className="flex justify-between text-[13px] font-medium text-white/90">
                        <span>{item.category}</span>
                        <span>{item.status}</span>
                      </div>
                      <h3 className="mt-4 text-[16px] font-bold leading-tight text-white line-clamp-3">{item.title}</h3>
                      <p className="mt-2 text-[11px] font-medium text-white/80">{formatCardDate(item.created_at)}</p>

                      <div className="absolute bottom-0 right-0 w-24 h-24 flex items-end justify-end p-2 select-none">
                        <span className="text-6xl">{style.character}</span>
                      </div>
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>

            <CarouselPrevious className="absolute left-2 z-20 hidden md:flex bg-white/90 backdrop-blur-sm shadow-md border-gray-200 text-gray-500 hover:text-gray-800 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity" />
            <CarouselNext className="absolute right-2 z-20 hidden md:flex bg-white/90 backdrop-blur-sm shadow-md border-gray-200 text-gray-500 hover:text-gray-800 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity" />
          </Carousel>
        ) : (
          <div className="flex items-center justify-center w-full h-[240px] bg-muted/30 rounded-[24px] text-muted-foreground font-medium my-2">
            해당 상태의 문의 내역이 없습니다.
          </div>
        )}
      </div>
    </div>
  );
}
