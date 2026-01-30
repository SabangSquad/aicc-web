'use client';
import { useState, useRef, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { GoogleLoginButton } from '@/features/login';
import { BotIcon } from '@/shared/icon/BotIcon';
import { Loading } from './Loading';
import { Introduce } from './Introduce';

const RECOMMENDED_KEYWORDS = ['서비스 가격은 얼마인가요?', '영업 시간이 어떻게 되나요?', '위치는 어디에 있나요?', '상담원과 연결해 주세요.'];

interface ChatResponse {
  status: number;
  answer: string;
  type: 'MESSAGE' | 'REDIRECT';
}

interface Message {
  role: 'user' | 'bot';
  content: string;
  isLogin?: boolean;
}

export function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 스크롤 하단 이동
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const { mutate, isPending } = useMutation({
    mutationFn: async (text: string) => {
      const response = await fetch(`http://localhost:8080/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ message: text, threadId: 'user123' }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json() as Promise<ChatResponse>;
    },
    onMutate: async text => {
      setMessages(prev => [...prev, { role: 'user', content: text }]);
      setInputValue('');
    },
    onSuccess: data => {
      if (data.type === 'MESSAGE') {
        setMessages(prev => [...prev, { role: 'bot', content: data.answer }]);
      } else if (data.type === 'REDIRECT') {
        setMessages(prev => [...prev, { role: 'bot', content: data.answer, isLogin: true }]);
      } else {
        setMessages(prev => [...prev, { role: 'bot', content: '응답을 처리하는 중 문제가 발생했습니다.' }]);
      }
    },
    onError: error => {
      console.error(error);
      setMessages(prev => [...prev, { role: 'bot', content: '서버와 연결할 수 없습니다. 잠시 후 다시 시도해주세요.' }]);
    },
  });

  const handleSubmit = (e?: React.FormEvent, keyword?: string) => {
    if (e) {
      e.preventDefault();
    }
    const messageToSend = keyword || inputValue;
    if (!messageToSend.trim() || isPending) {
      return;
    }

    mutate(messageToSend);
  };

  return (
    <div className="relative flex flex-col h-screen font-sans overflow-hidden bg-white text-slate-900 selection:bg-[#e8499f] selection:text-white">
      <header className="sticky top-0 z-20 flex items-center px-6 py-4 justify-center bg-white border-b border-slate-100">
        <h1 className="text-xl font-bold tracking-tight bg-clip-text text-transparent text-ai">BrandName</h1>
      </header>

      {/* 메인 채팅 영역 */}
      <main className="flex-1 w-full max-w-3xl mx-auto p-4 overflow-y-auto z-10 scrollbar-hide">
        {messages.length === 0 && <Introduce />}

        {messages.map((msg, index) => (
          <div key={index} className={`flex items-end gap-3 mb-6 transition-all duration-300 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.role === 'bot' && (
              <div className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center shadow-md bg-ai">
                <BotIcon className="w-5 h-5 text-white" />
              </div>
            )}
            <div className={`flex flex-col gap-1 max-w-[85%] ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
              {msg.role === 'bot' && <span className="text-[11px] text-slate-400 ml-1 font-medium tracking-wide">AI Assistant</span>}
              <div
                className={`px-5 py-2 text-[15px] leading-7 shadow-sm ${
                  msg.role === 'user'
                    ? 'bg-ai text-white rounded-2xl rounded-br-none shadow-md'
                    : 'bg-slate-50 border border-slate-100 text-slate-800 rounded-2xl rounded-bl-none'
                }`}
              >
                {msg.content}
              </div>
              {msg.role === 'bot' && msg.isLogin && <GoogleLoginButton />}
            </div>
          </div>
        ))}

        {isPending && <Loading />}
        <div ref={messagesEndRef} />
      </main>

      {/* 하단 입력 영역 */}
      <div className="sticky bottom-0 w-full p-4 pb-8 z-20 bg-white">
        <div className="max-w-3xl mx-auto">
          {/* 추천 질문 */}
          <div className="flex items-center gap-2 mb-3 overflow-x-auto scrollbar-hide pb-1">
            {RECOMMENDED_KEYWORDS.map((keyword, idx) => (
              <button
                key={idx}
                onClick={() => handleSubmit(undefined, keyword)}
                disabled={isPending}
                className="flex-shrink-0 whitespace-nowrap px-4 py-2 bg-white border border-slate-200 rounded-full text-[13px] font-medium text-slate-600 hover:border-[#e8499f] transition-all disabled:opacity-50"
              >
                {keyword}
              </button>
            ))}
          </div>

          <form onSubmit={e => handleSubmit(e)} className="relative flex items-center group">
            <input
              type="text"
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              placeholder="메시지를 입력하세요..."
              disabled={isPending}
              className="w-full p-4 pr-16 rounded-full border border-slate-200 focus:ring-2 focus:ring-[#e8499f]/50 outline-none transition-all disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={isPending || !inputValue.trim()}
              className="absolute right-2 p-2.5 rounded-full text-white bg-ai disabled:opacity-50"
            >
              {isPending ? (
                <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                </svg>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
