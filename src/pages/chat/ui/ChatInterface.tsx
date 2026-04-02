'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2, Clock, MapPin, Star, HelpCircle, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const QUICK_PROMPTS = [
  { id: 1, icon: <Clock size={18} />, text: '오늘 영업 시간 알려줘' },
  { id: 2, icon: <MapPin size={18} />, text: '여기 어떻게 찾아가?' },
  { id: 3, icon: <Star size={18} />, text: '제일 잘나가는 메뉴 추천해봐' },
  { id: 4, icon: <HelpCircle size={18} />, text: '주차 공간 넉넉해?' },
];

export const ChatInterface = () => {
  const [messages, setMessages] = useState([{ id: 1, text: '안녕하세요! "봉구스 밥버거 (인천대점)" 챗봇 입니다. 문의사항이 있으신가요?', isAi: true }]);

  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [thinkingStep, setThinkingStep] = useState('');

  const latestUserMsgRef = useRef<HTMLDivElement>(null);
  const latestUserMsgId = [...messages].reverse().find(m => !m.isAi)?.id;

  useEffect(() => {
    if (latestUserMsgRef.current) {
      latestUserMsgRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, [messages.length, isTyping]);

  const handleSendMessage = async (textToSend?: string) => {
    const messageContent = textToSend || inputValue;

    if (!messageContent.trim()) return;

    const userMessage = { id: Date.now(), text: messageContent, isAi: false };
    setMessages(prev => [...prev, userMessage]);

    if (!textToSend) {
      setInputValue('');
    }

    setIsTyping(true);
    setThinkingStep(''); // 초기 메시지 설정

    try {
      const response = await fetch('http://localhost:8080/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: messageContent + '봉구스 밥버거 (인천대점)' }),
      });

      if (!response.ok) {
        throw new Error(`서버 에러: ${response.status}`);
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder('utf-8');

      if (!reader) return;

      // eslint-disable-next-line no-constant-condition
      while (true) {
        try {
          const { done, value } = await reader.read();
          if (done) break;

          const chunkString = decoder.decode(value);
          const lines = chunkString.split('\n').filter(line => line.trim() !== '');

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = JSON.parse(line.replace('data: ', ''));

              if (data.type === 'thinking') {
                setThinkingStep(data.message);
              } else if (data.type === 'MESSAGE') {
                const aiMessage = {
                  id: Date.now(),
                  text: data.answer,
                  isAi: true,
                };
                setMessages(prev => [...prev, aiMessage]);
              } else if (data.type === 'error') {
                setMessages(prev => [
                  ...prev,
                  {
                    id: Date.now(),
                    text: '응답 처리 중 오류가 발생했습니다.',
                    isAi: true,
                  },
                ]);
              }
            }
          }
        } catch (readError) {
          console.error('스트림 읽기 오류:', readError);
          break;
        }
      }
    } catch (error) {
      console.error('API Error:', error);
    } finally {
      setIsTyping(false);
      setThinkingStep('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      <section className="flex-1 space-y-8 overflow-y-auto p-6 pb-[50vh] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {messages.map(msg => {
          const isLatestUser = msg.id === latestUserMsgId;

          return (
            <motion.div
              data-testid="message-bubble"
              key={msg.id}
              ref={isLatestUser ? latestUserMsgRef : null}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className={`flex scroll-mt-6 ${msg.isAi ? 'justify-start' : 'justify-end'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl border px-5 py-3 ${
                  msg.isAi
                    ? 'rounded-tl-sm border-white/80 bg-white/60 text-zinc-700 shadow-sm backdrop-blur-md'
                    : 'rounded-tr-sm border-zinc-700 bg-zinc-800 font-medium text-white shadow-md'
                }`}
              >
                <p className="text-[15px] leading-relaxed break-words">{msg.text}</p>
              </div>
            </motion.div>
          );
        })}
        {messages.length === 1 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-8 w-full max-w-[340px]">
            <p className="mb-3 px-2 text-[13px] font-medium text-zinc-500">클릭하면 바로 물어볼 수 있어요</p>

            <div className="flex w-full flex-col gap-2">
              {QUICK_PROMPTS.map(prompt => (
                <motion.button
                  whileHover={{ scale: 1.01, backgroundColor: '#fafafa' }}
                  whileTap={{ scale: 0.98 }}
                  key={prompt.id}
                  onClick={() => handleSendMessage(prompt.text)}
                  className="group flex w-full cursor-pointer items-center justify-between rounded-2xl border border-zinc-100 bg-white px-4 py-3 text-left shadow-[0_2px_8px_-4px_rgba(0,0,0,0.05)] transition-all"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="text-zinc-800">{prompt.icon}</div>
                    <span className="text-[14.5px] font-medium text-zinc-700">{prompt.text}</span>
                  </div>
                  <ArrowUpRight size={16} className="text-zinc-300 transition-colors group-hover:text-zinc-400" />
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex justify-start px-2 py-3"
          >
            <div className="flex items-center gap-2.5 py-2">
              <Loader2 size={16} className="animate-spin text-zinc-400" />
              <div className="relative flex h-5 items-center overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={thinkingStep}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.2 }}
                    className="text-[14px] leading-none font-medium tracking-tight whitespace-nowrap text-zinc-400"
                  >
                    {thinkingStep || '생각 중...'}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </section>

      {/* 입력창 */}
      <footer className="p-6">
        <div className="relative flex items-center rounded-2xl border border-white/80 bg-white/50 p-2 shadow-sm backdrop-blur-xl transition-all focus-within:border-zinc-300 focus-within:bg-white/80">
          <input
            type="text"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="메시지를 입력하세요..."
            className="flex-1 border-none bg-transparent px-3 py-2 text-zinc-800 placeholder:text-zinc-400 focus:outline-none disabled:opacity-50"
          />
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => handleSendMessage()}
            disabled={!inputValue.trim() || isTyping}
            className="rounded-xl bg-zinc-800 p-2.5 text-white shadow-sm transition-all hover:bg-zinc-700 disabled:cursor-not-allowed disabled:bg-zinc-400"
          >
            <Send size={18} />
          </motion.button>
        </div>
      </footer>
    </>
  );
};
