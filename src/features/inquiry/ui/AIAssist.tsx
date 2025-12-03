'use client';
import { emotionMap } from '@/shared/lib/emotion';
import { Emotion } from '@/shared/types/emotion';
import { InquiryType } from '@/shared/types/inquiry';
import { Manual } from '@/shared/types/manual';
import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from '@/shared/ui/item';
import { ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';

interface AIAssist {
  ok: boolean;
  case_id: number;
  emotion: Emotion;
  summary: string;
  suggested_answer: string;
}
export function AIAssist({ inquiry }: { inquiry: InquiryType }) {
  const [manuals, setManuals] = useState<Manual[]>([]);
  const [aiAssist, setAIAssist] = useState<AIAssist | null>(null);

  useEffect(() => {
    const fetchManuals = async () => {
      const manuals: Manual[] = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/manuals?category=${inquiry.category}`)
        .then(res => res.json())
        .then(data => data.data);
      setManuals(manuals);
    };
    const fetchAIAssist = async () => {
      const aiAssist: AIAssist = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chat/${inquiry.case_id}`, {
        method: 'POST',
      }).then(res => res.json());
      setAIAssist(aiAssist);
    };
    fetchAIAssist();
    fetchManuals();
  }, [inquiry.category, inquiry.case_id]);

  if (!aiAssist) {
    return <div>AI 상담 데이터를 불러오는 중...</div>;
  }
  const emo = emotionMap[aiAssist.emotion];
  return (
    <>
      <div>
        <h3 className="mb-3 text-lg font-medium text-ai">AI 상담 요약</h3>
        <Item variant="muted" className="mb-4">
          <ItemContent>
            <ItemTitle className="text-black-primary">{aiAssist.summary}</ItemTitle>
          </ItemContent>
        </Item>
      </div>
      <div className="flex flex-row gap-6">
        <div className="flex-1">
          <h3 className="mb-3 text-lg font-medium text-ai">AI 감정 분석</h3>
          <div className="p-4 rounded-lg text-black-primary" style={{ backgroundColor: emo.color }}>
            <div className="flex mb-2 font-bold text-lg">
              {emo.emoji} {aiAssist.emotion}
            </div>
            <div className="text-sm bg-white p-2 rounded-lg">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nesciunt, harum? Hic maiores sit eius cum!
              Fugiat nam ea temporibus, fuga voluptatem molestias amet modi aliquam corporis sequi eligendi nobis
              repudiandae!
            </div>
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
