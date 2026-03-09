'use client';
import React, { useState } from 'react';
import { Send, Menu, MoreVertical, Paperclip, Smile } from 'lucide-react';

export const ChatPage = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: '밝은 모노톤으로 변경되었습니다. 화면이 훨씬 넓고 깨끗해 보이네요! 🕊️', isAi: true },
    { id: 2, text: '눈부시지 않고 딱 적당하게 밝아서 좋아요.', isAi: false },
  ]);

  return (
    // 1. 깨끗한 밝은 회색(Light Gray) 배경
    <div className="min-h-screen bg-zinc-50 flex items-center justify-center p-4 md:p-8 font-sans relative overflow-hidden text-zinc-800">
      {/* 배경 장식: 밝은 환경에서의 유리 질감을 위한 아주 연한 빛 번짐 */}
      <div className="absolute top-[5%] left-[15%] w-[40vw] h-[40vw] bg-white rounded-full blur-[100px]" />
      <div className="absolute bottom-[5%] right-[15%] w-[45vw] h-[45vw] bg-zinc-200/50 rounded-full blur-[120px]" />

      {/* 2. 메인 글래스 컨테이너 (흰색 반투명) */}
      <div className="w-full max-w-5xl h-[85vh] flex rounded-3xl bg-white/40 backdrop-blur-2xl border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden z-10">
        {/* 사이드바 */}
        <aside className="hidden md:flex flex-col w-72 bg-white/30 border-r border-white/60 p-5">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-xl font-medium tracking-wide text-zinc-800">
              AI<span className="text-zinc-400">.chat</span>
            </h1>
            <button className="p-2 hover:bg-white/50 rounded-lg transition-colors text-zinc-500">
              <Menu size={20} />
            </button>
          </div>

          <div className="space-y-2 flex-1 overflow-y-auto pr-2">
            {['UI/UX 리팩토링', 'API 연동 테스트', '배포 자동화 스크립트'].map((topic, i) => (
              <div
                key={i}
                className="p-3 bg-white/20 hover:bg-white/60 border border-transparent hover:border-white/80 rounded-xl cursor-pointer transition-all duration-200 text-sm text-zinc-600 hover:text-zinc-900 shadow-sm"
              >
                {topic}
              </div>
            ))}
          </div>
        </aside>

        {/* 메인 채팅 영역 */}
        <main className="flex-1 flex flex-col relative">
          {/* 헤더 */}
          <header className="h-16 flex items-center justify-between px-6 bg-white/30 border-b border-white/60">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-zinc-800 animate-pulse" />
              <h2 className="font-medium text-zinc-700">System Assistant</h2>
            </div>
            <button className="text-zinc-400 hover:text-zinc-600 transition-colors">
              <MoreVertical size={20} />
            </button>
          </header>

          {/* 대화 목록 */}
          <section className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.map(msg => (
              <div key={msg.id} className={`flex ${msg.isAi ? 'justify-start' : 'justify-end'}`}>
                <div
                  className={`px-5 py-3.5 max-w-[80%] rounded-2xl border ${
                    msg.isAi
                      ? 'bg-white/60 border-white/80 text-zinc-700 rounded-tl-sm backdrop-blur-md shadow-sm'
                      : 'bg-zinc-800 border-zinc-700 text-white rounded-tr-sm font-medium shadow-md'
                  }`}
                >
                  <p className="leading-relaxed text-[15px]">{msg.text}</p>
                </div>
              </div>
            ))}
          </section>

          {/* 입력창 */}
          <footer className="p-6">
            <div className="relative flex items-center bg-white/50 border border-white/80 backdrop-blur-xl rounded-2xl p-2 transition-all focus-within:border-zinc-300 focus-within:bg-white/80 shadow-sm">
              <button className="p-2 text-zinc-400 hover:text-zinc-600 transition-colors">
                <Paperclip size={20} />
              </button>
              <input
                type="text"
                placeholder="메시지를 입력하세요..."
                className="flex-1 bg-transparent border-none px-3 py-2 text-zinc-800 placeholder:text-zinc-400 focus:outline-none"
              />
              <button className="p-2 text-zinc-400 hover:text-zinc-600 transition-colors mr-1">
                <Smile size={20} />
              </button>
              <button className="bg-zinc-800 hover:bg-zinc-700 text-white p-2.5 rounded-xl transition-all shadow-sm">
                <Send size={18} />
              </button>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
};
