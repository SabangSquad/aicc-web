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
  const [messages, setMessages] = useState([{ id: 1, text: '안녕하세요! "가게이름" 챗봇 입니다. 문의사항이 있으신가요?', isAi: true }]);

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
        body: JSON.stringify({ message: messageContent }),
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
      <section className="flex-1 overflow-y-auto p-6 pb-[50vh] space-y-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {messages.map(msg => {
          const isLatestUser = msg.id === latestUserMsgId;

          return (
            <motion.div
              key={msg.id}
              ref={isLatestUser ? latestUserMsgRef : null}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className={`flex scroll-mt-6 ${msg.isAi ? 'justify-start' : 'justify-end'}`}
            >
              <div
                className={`px-5 py-3 max-w-[80%] rounded-2xl border ${
                  msg.isAi
                    ? 'bg-white/60 border-white/80 text-zinc-700 rounded-tl-sm backdrop-blur-md shadow-sm'
                    : 'bg-zinc-800 border-zinc-700 text-white rounded-tr-sm font-medium shadow-md'
                }`}
              >
                <p className="leading-relaxed text-[15px] break-words">{msg.text}</p>
              </div>
            </motion.div>
          );
        })}
        {messages.length === 1 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-8 w-full max-w-[340px]">
            <p className="text-[13px] text-zinc-500 font-medium mb-3 px-2">클릭하면 바로 물어볼 수 있어요</p>

            <div className="flex flex-col gap-2 w-full">
              {QUICK_PROMPTS.map(prompt => (
                <motion.button
                  whileHover={{ scale: 1.01, backgroundColor: '#fafafa' }}
                  whileTap={{ scale: 0.98 }}
                  key={prompt.id}
                  onClick={() => handleSendMessage(prompt.text)}
                  className="cursor-pointer flex items-center justify-between px-4 py-3 bg-white border border-zinc-100 rounded-2xl transition-all shadow-[0_2px_8px_-4px_rgba(0,0,0,0.05)] text-left w-full group"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="text-zinc-800">{prompt.icon}</div>
                    <span className="text-[14.5px] text-zinc-700 font-medium">{prompt.text}</span>
                  </div>
                  <ArrowUpRight size={16} className="text-zinc-300 group-hover:text-zinc-400 transition-colors" />
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
            className="flex justify-start px-2"
          >
            <div className="flex items-center gap-2.5 py-2">
              <Loader2 size={16} className="text-zinc-400 animate-spin" />
              <div className="relative overflow-hidden h-5 flex items-center">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={thinkingStep}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.2 }}
                    className="text-[14px] text-zinc-400 font-medium tracking-tight whitespace-nowrap leading-none"
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
        <div className="relative flex items-center bg-white/50 border border-white/80 backdrop-blur-xl rounded-2xl p-2 transition-all focus-within:border-zinc-300 focus-within:bg-white/80 shadow-sm">
          <input
            type="text"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="메시지를 입력하세요..."
            className="flex-1 bg-transparent border-none px-3 py-2 text-zinc-800 placeholder:text-zinc-400 focus:outline-none disabled:opacity-50"
          />
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => handleSendMessage()}
            disabled={!inputValue.trim() || isTyping}
            className="bg-zinc-800 hover:bg-zinc-700 disabled:bg-zinc-400 disabled:cursor-not-allowed text-white p-2.5 rounded-xl transition-all shadow-sm"
          >
            <Send size={18} />
          </motion.button>
        </div>
      </footer>
    </>
  );
};
