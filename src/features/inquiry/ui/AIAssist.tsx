'use client';
import { emotionMap } from '@/shared/lib/emotion';
import { getEmotionDescription } from '@/shared/lib/emotionAnalytics';
import { generateDummySummary } from '@/shared/lib/generate';
import { InquiryType } from '@/shared/types/inquiry';
import { Manual } from '@/shared/types/manual';
import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from '@/shared/ui/item';
import { ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';

export function AIAssist({ inquiry }: { inquiry: InquiryType }) {
  const emo = emotionMap[inquiry.emotion];
  const [manuals, setManuals] = useState<Manual[]>([]);

  useEffect(() => {
    const fetchManuals = async () => {
      const manuals: Manual[] = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/manuals?category=${inquiry.category}`)
        .then(res => res.json())
        .then(data => data.data);
      setManuals(manuals);
    };
    fetchManuals();
  }, [inquiry.category]);

  return (
    <>
      <div>
        <h3 className="mb-3 text-lg font-medium text-ai">AI 상담 요약</h3>
        <Item variant="muted" className="mb-4">
          <ItemContent>
            <ItemTitle className="text-black-primary">{generateDummySummary(inquiry)}</ItemTitle>
          </ItemContent>
        </Item>
      </div>
      <div className="flex flex-row gap-6">
        <div className="flex-1">
          <h3 className="mb-3 text-lg font-medium text-ai">AI 감정 분석</h3>
          <div className="p-4 rounded-lg text-black-primary" style={{ backgroundColor: emo.color }}>
            <div className="flex mb-2 text-lg font-bold">
              {emo.emoji} {inquiry.emotion}
            </div>
            <div className="p-2 text-sm bg-white rounded-lg">{getEmotionDescription(inquiry.emotion)}</div>
          </div>
        </div>
        <div className="flex-1">
          <h3 className="mb-3 text-lg font-medium text-ai">AI 답변 추천</h3>
          {manuals.length === 0 && <p className="text-sm text-muted-foreground">추천 답변이 없습니다.</p>}
          {manuals.slice(0, 3).map(manual => (
            <ManualItem key={manual.manual_id} manual={manual} />
          ))}
        </div>
      </div>
    </>
  );
}

function ManualItem({ manual }: { manual: Manual }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Item
      variant="muted"
      className="mb-4 transition-all duration-500 cursor-pointer hover:shadow-lg"
      onClick={() => setExpanded(!expanded)}
    >
      <ItemMedia>
        <div className="p-2 rounded-full bg-ai">📦</div>
      </ItemMedia>

      <ItemContent>
        <ItemTitle className={`text-black-primary ${expanded ? 'line-clamp-none' : 'line-clamp-2'}`}>
          {manual.content}
        </ItemTitle>
        <ItemDescription className="flex items-center justify-between">
          <span>
            {manual.title} {'\u007C'} {manual.category}
          </span>
          <ChevronDown className={`transition-transform duration-500 ${expanded ? 'rotate-180' : ''}`} size={16} />
        </ItemDescription>
      </ItemContent>
    </Item>
  );
}
