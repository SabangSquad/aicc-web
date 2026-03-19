'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { motion } from 'framer-motion';

export const ChatInterface = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: '밝은 모노톤으로 변경되었습니다. 화면이 훨씬 넓고 깨끗해 보이네요! 🕊️', isAi: true },
    { id: 2, text: '눈부시지 않고 딱 적당하게 밝아서 좋아요.', isAi: false },
  ]);

  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

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

  const handleSendMessage = () => {
    if (!inputValue.trim()) {
      return;
    }

    const userMessage = {
      id: Date.now(),
      text: inputValue,
      isAi: false,
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const aiMessage = {
        id: Date.now() + 1,
        text: '네, 확인했습니다! AI가 이런 식으로 생각하는 시간을 가지고 답변을 달아줍니다. 지금처럼 유저의 메시지가 상단에 고정되고, 제 답변이 아래로 길게 스트리밍 되더라도 화면 아래만 쳐다볼 필요 없이 편안하게 위에서 아래로 글을 읽어내려가실 수 있습니다. 이것이 바로 AI 챗봇 UX의 핵심입니다! 😊',
        isAi: true,
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* 3. pb-[50vh] 추가: 유저 메시지가 최상단까지 올라갈 수 있도록 강제로 여백(빈 공간)을 만듭니다. */}
      <section className="flex-1 overflow-y-auto p-6 pb-[50vh] space-y-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {messages.map(msg => {
          const isLatestUser = msg.id === latestUserMsgId;

          return (
            <motion.div
              key={msg.id}
              // 가장 최근 유저 메시지인 경우에만 ref를 달아줍니다.
              ref={isLatestUser ? latestUserMsgRef : null}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              // 4. scroll-mt-6: 상단으로 스크롤될 때 헤더에 딱 붙지 않고 24px(1.5rem) 여백을 줍니다.
              className={`flex scroll-mt-6 ${msg.isAi ? 'justify-start' : 'justify-end'}`}
            >
              <div
                className={`px-5 py-3.5 max-w-[80%] rounded-2xl border ${
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

        {/* AI 타이핑 인디케이터 */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="flex justify-start scroll-mt-6"
          >
            <div className="px-5 py-4 max-w-[80%] bg-white/60 border border-white/80 rounded-2xl rounded-tl-sm backdrop-blur-md shadow-sm flex items-center gap-1.5 h-[52px]">
              {[0, 1, 2].map(index => (
                <motion.div
                  key={index}
                  className="w-2 h-2 bg-zinc-400 rounded-full"
                  animate={{ y: [0, -6, 0] }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: index * 0.15,
                  }}
                />
              ))}
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
