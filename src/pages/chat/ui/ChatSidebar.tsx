'use client';
import { Menu } from 'lucide-react';
import { useState } from 'react';

export function ChatSidebar() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <aside className={`hidden md:flex flex-col bg-zinc-100 border-r border-white/60 transition-all duration-300 ease-in-out p-5 ${isOpen ? 'w-72' : 'w-20'}`}>
      <div className="flex items-center w-full mb-8">
        <button onClick={() => setIsOpen(!isOpen)} className="p-2 hover:bg-zinc-200 rounded-full cursor-pointer transition-colors text-zinc-500 shrink-0">
          <Menu size={20} />
        </button>
      </div>

      {isOpen && (
        <div className="space-y-2 flex-1 overflow-y-auto pr-2 w-full animate-in fade-in duration-300">
          {['UI/UX 리팩토링', 'API 연동 테스트', '배포 자동화 스크립트'].map((topic, i) => (
            <div
              key={i}
              className="p-3 bg-white/20 hover:bg-white/60 border border-transparent hover:border-white/80 rounded-xl cursor-pointer transition-all duration-200 text-sm text-zinc-600 hover:text-zinc-900 shadow-sm truncate"
            >
              {topic}
            </div>
          ))}
        </div>
      )}
    </aside>
  );
}
