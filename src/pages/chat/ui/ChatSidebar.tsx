'use client';
import { Menu, ArrowUpRight, Clock, MapPin, Star, HelpCircle } from 'lucide-react';
import { useState } from 'react';

const QUICK_PROMPTS = [
  { icon: <Clock size={16} />, text: '오늘 영업 시간 알려줘' },
  { icon: <MapPin size={16} />, text: '여기 어떻게 찾아가?' },
  { icon: <Star size={16} />, text: '제일 잘나가는 메뉴 추천해봐' },
  { icon: <HelpCircle size={16} />, text: '주차 공간 넉넉해?' },
];

export function ChatSidebar() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <aside
      className={`hidden md:flex flex-col bg-zinc-100 border-r border-white/60 transition-all duration-300 ease-in-out p-5 overflow-hidden ${
        isOpen ? 'w-72' : 'w-20'
      }`}
    >
      <div className="flex items-center w-full mb-10 shrink-0">
        <button onClick={() => setIsOpen(!isOpen)} className="p-2 hover:bg-zinc-200 rounded-full cursor-pointer transition-colors text-zinc-500 shrink-0">
          <Menu size={20} />
        </button>
      </div>
      <div
        className={`flex flex-col h-full transition-all duration-300 ${isOpen ? 'opacity-100 visible translate-x-0' : 'opacity-0 invisible -translate-x-5'}`}
      >
        <div className="mb-2 shrink-0">
          <p className="px-2 text-[14px] text-zinc-500 whitespace-nowrap">클릭하면 바로 물어볼 수 있어요</p>
        </div>

        <div className="space-y-3 flex-1 overflow-y-auto py-2">
          {QUICK_PROMPTS.map((prompt, i) => (
            <button
              key={i}
              className="w-full flex items-center justify-between p-4 bg-white/50 hover:bg-white border border-white/80 hover:border-zinc-300 rounded-2xl cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 group whitespace-nowrap"
            >
              <div className="flex items-center gap-3 overflow-hidden">
                <span className="shrink-0">{prompt.icon}</span>
                <span className="text-sm font-medium text-zinc-600 group-hover:text-zinc-900 transition-colors truncate">{prompt.text}</span>
              </div>
              <ArrowUpRight
                size={14}
                className="shrink-0 text-zinc-300 group-hover:text-zinc-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
              />
            </button>
          ))}
        </div>

        <p className="text-[14px] text-zinc-600 leading-snug mt-6 whitespace-nowrap shrink-0">
          찾으시는 답변이 없나요? <br />
          하단 채팅창에 직접 입력해주세요.
        </p>
      </div>
    </aside>
  );
}
