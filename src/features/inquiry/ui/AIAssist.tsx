'use client';
import { ChevronDown } from 'lucide-react';
import { emotionMap } from '@/shared/lib/emotion';
import { Manual } from '@/shared/types/manual';
import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from '@/shared/ui/item';
import { useState } from 'react';
import { useManuals } from '@/entities/manual/hooks/useManualQuery';
import { useAIAssist } from '@/entities/ai/hooks/useAIQuery';
import { InquiryType } from '@/shared/types/inquiry';

export function AIAssist({ inquiry }: { inquiry: InquiryType }) {
  const { data: manuals } = useManuals(inquiry?.category || '');
  // const { data: aiAssist } = useAIAssist(inquiry?.case_id || 0);
  // const emo = emotionMap[aiAssist.emotion];

  return (
    <>
      <div>
        {/* <h3 className="mb-3 text-lg font-medium text-ai">AI 상담 요약</h3>
        <Item variant="muted" className="mb-4">
          <ItemContent>
            <ItemTitle className="text-black-primary">{aiAssist.summary}</ItemTitle>
          </ItemContent>
        </Item>
      </div>
      <div className="flex flex-row gap-6">
        <div className="flex-1">
          <h3 className="mb-3 text-lg font-medium text-ai">AI 감정 분석</h3>
          <div
            className="p-4 rounded-lg text-black-primary"
            style={{ backgroundColor: `color-mix(in srgb, ${emo.color}, transparent 20%)` }}
          >
            <div className="flex mb-2 font-bold text-lg">
              {emo.emoji} {aiAssist.emotion}
            </div>
            <div className="bg-white/60 rounded-md p-3 backdrop-blur-sm border border-black/5">
              <p className="text-sm font-medium leading-relaxed text-black/80">
                현재 고객님의 감정은 <span className="font-bold text-black">{aiAssist.emotion}</span> 상태로 분석됩니다.
              </p>
            </div>
          </div>
        </div> */}
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
      className="mb-4 cursor-pointer transition-all hover:shadow-lg duration-500"
      onClick={() => setExpanded(!expanded)}
    >
      <ItemMedia>
        <div className="p-2 bg-ai rounded-full">📦</div>
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
