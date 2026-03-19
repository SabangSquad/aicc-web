'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = { id: Date.now(), text: inputValue, isAi: false };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    setThinkingStep(''); // 초기 메시지 설정

    try {
      const response = await fetch('http://localhost:8080/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: inputValue }),
      });

      // 1. 서버 응답이 정상(200-299)이 아닌 경우 처리
      if (!response.ok) {
        throw new Error(`서버 에러: ${response.status}`);
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder('utf-8');

      if (!reader) return;

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

        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="flex justify-start scroll-mt-6"
          >
            <div className="px-5 py-3.5 max-w-[80%]  flex items-center gap-3">
              {/* 빙글빙글 도는 로딩 아이콘 */}
              <Loader2 size={16} className="text-zinc-400 animate-spin" />

              {/* 상태 텍스트가 바뀔 때마다 부드럽게 애니메이션 처리 */}
              <div className="overflow-hidden h-[20px] flex items-center">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={thinkingStep}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="text-[14px] text-zinc-500 font-medium tracking-tight whitespace-nowrap"
                  >
                    {thinkingStep}
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
            onClick={handleSendMessage}
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
