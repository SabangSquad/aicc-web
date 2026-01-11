'use client';
import { BotIcon } from '@/shared/icon/BotIcon';
import { useState, useRef, useEffect } from 'react';

const RECOMMENDED_KEYWORDS = [
  '서비스 가격은 얼마인가요?',
  '영업 시간이 어떻게 되나요?',
  '위치는 어디에 있나요?',
  '상담원과 연결해 주세요.',
];

interface ChatResponse {
  ok: boolean;
  answer: string;
  reason: string;
}

interface Message {
  role: 'user' | 'bot';
  content: string;
}

export function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const sendMessage = async (e?: React.FormEvent, keyword?: string) => {
    if (e) {
      e.preventDefault();
    }

    const messageToSend = keyword || inputValue;

    if (!messageToSend.trim() || isLoading) {
      return;
    }

    setMessages(prev => [...prev, { role: 'user', content: messageToSend }]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: messageToSend }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data: ChatResponse = await response.json();

      if (data.ok) {
        setMessages(prev => [...prev, { role: 'bot', content: data.answer }]);
      } else {
        setMessages(prev => [...prev, { role: 'bot', content: '응답을 처리하는 중 문제가 발생했습니다.' }]);
      }
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'bot', content: '서버와 연결할 수 없습니다. 잠시 후 다시 시도해주세요.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex flex-col h-screen font-sans overflow-hidden bg-white text-slate-900 selection:bg-[#e8499f] selection:text-white">
      <style jsx>{`
        @keyframes loading-wave {
          0%,
          100% {
            transform: translateY(0);
            opacity: 0.5;
          }
          50% {
            transform: translateY(-8px);
            opacity: 1;
          }
        }
        .animate-wave {
          animation: loading-wave 1.2s ease-in-out infinite;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* 헤더 */}
      <header className="sticky top-0 z-20 flex items-center px-6 py-4 justify-center bg-white border-b border-slate-100">
        <h1 className="text-xl font-bold tracking-tight bg-clip-text text-transparent text-ai">BrandName</h1>
      </header>

      {/* 메인 채팅 영역 */}
      <main className="flex-1 w-full max-w-3xl mx-auto p-4 overflow-y-auto z-10 scrollbar-hide">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center gap-6 animate-fade-in-up">
            <div className="w-20 h-20 rounded-3xl flex items-center justify-center shadow-2xl shadow-[#ac55f2]/20 mb-2 bg-ai">
              <BotIcon className="w-10 h-10 text-white animate-bounce" />
            </div>
            <h2 className="text-3xl font-bold text-slate-800">무엇을 도와드릴까요?</h2>
            <p className="text-slate-500 max-w-md leading-relaxed">
              궁금한 내용을 자유롭게 물어보세요.
              <br />
              AI가 친절하게 답변해 드립니다.
            </p>
          </div>
        )}

        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex items-end gap-3 mb-6 transition-all duration-300 ${
              msg.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {msg.role === 'bot' && (
              <div className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center shadow-md bg-ai">
                <BotIcon className="w-5 h-5 text-white" />
              </div>
            )}

            <div className={`flex flex-col gap-1 max-w-[85%] ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
              {msg.role === 'bot' && (
                <span className="text-[11px] text-slate-400 ml-1 font-medium tracking-wide">AI Assistant</span>
              )}

              <div
                className={`px-5 py-2 text-[15px] leading-7 shadow-sm ${
                  msg.role === 'user'
                    ? 'bg-ai text-white rounded-2xl rounded-br-none shadow-md shadow-[#e8499f]/20'
                    : 'bg-slate-50 border border-slate-100 text-slate-800 rounded-2xl rounded-bl-none'
                }`}
              >
                {msg.content}
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-end gap-3 mb-6">
            <div className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center shadow-md bg-ai">
              <BotIcon className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[11px] text-slate-400 ml-1 font-medium tracking-wide">AI Assistant</span>
              <div className="px-6 py-5 bg-slate-50 border border-slate-100 rounded-2xl rounded-bl-none shadow-sm">
                <div className="flex gap-2 items-center h-full">
                  <span
                    className="w-2.5 h-2.5 rounded-full bg-[#ac55f2] animate-bounce"
                    style={{ animationDelay: '0ms' }}
                  ></span>
                  <span
                    className="w-2.5 h-2.5 rounded-full bg-[#e8499f] animate-bounce"
                    style={{ animationDelay: '200ms' }}
                  ></span>
                  <span
                    className="w-2.5 h-2.5 rounded-full bg-[#ff6b6b] animate-bounce"
                    style={{ animationDelay: '400ms' }}
                  ></span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </main>

      {/* 하단 입력 영역 */}
      <div className="sticky bottom-0 w-full p-4 pb-8 z-20 bg-white">
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white via-white to-transparent pointer-events-none -z-10" />

        <div className="max-w-3xl mx-auto">
          {/* 추천 질문 칩 (가로 스크롤, 줄바꿈 방지) */}
          <div className="flex items-center gap-2 mb-3 overflow-x-auto scrollbar-hide pb-1">
            {RECOMMENDED_KEYWORDS.map((keyword, idx) => (
              <button
                key={idx}
                onClick={() => sendMessage(undefined, keyword)}
                disabled={isLoading}
                // whitespace-nowrap 추가: 텍스트가 길어도 버튼 내부에서 줄바꿈되지 않음
                className="flex-shrink-0 whitespace-nowrap px-4 py-2 bg-white border border-slate-200 rounded-full text-[13px] font-medium text-slate-600 hover:border-[#e8499f] hover:text-[#e8499f] active:scale-95 transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {keyword}
              </button>
            ))}
          </div>

          <form onSubmit={e => sendMessage(e)} className="relative flex items-center group">
            <input
              type="text"
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              placeholder="메시지를 입력하세요..."
              disabled={isLoading}
              className="w-full p-4 pr-16 rounded-full border border-slate-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#e8499f]/50 transition-all placeholder:text-slate-400 text-slate-800 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              className={`absolute right-2 p-2.5 rounded-full text-white transition-all shadow-md hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed bg-ai`}
            >
              {isLoading ? (
                <svg className="animate-spin w-5 h-5 text-white" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  ></path>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                </svg>
              )}
            </button>
          </form>
          <div className="text-center mt-3">
            <p className="text-[11px] text-slate-400 font-medium opacity-70">
              AI는 실수를 할 수 있습니다. 중요한 정보는 확인이 필요합니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
