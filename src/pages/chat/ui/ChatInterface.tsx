'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2, Clock, MapPin, Star, HelpCircle, ArrowUpRight, XCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { chatAPI } from '@/entities/chat';
import { StoreType } from '@/entities/store';
import { GoogleLoginButton } from '@/features/login';

const QUICK_PROMPTS = [
  { id: 1, icon: <Clock size={18} />, text: '오늘 영업 시간 알려줘' },
  { id: 2, icon: <MapPin size={18} />, text: '여기 어떻게 찾아가?' },
  { id: 3, icon: <Star size={18} />, text: '제일 잘나가는 메뉴 추천해봐' },
  { id: 4, icon: <HelpCircle size={18} />, text: '주차 공간 넉넉해?' },
];

export const ChatInterface = ({ store_id, storeData }: { store_id: string; storeData: StoreType }) => {
  const [messages, setMessages] = useState([
    { id: 1, text: `안녕하세요! ${storeData.name} 챗봇 입니다. 문의사항이 있으신가요?`, isAi: true, isLoginRequired: false },
  ]);

  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [thinkingStep, setThinkingStep] = useState('');

  const [currentCaseId, setCurrentCaseId] = useState<number | null>(null);

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

    const userMessage = { id: Date.now(), text: messageContent, isAi: false, isLoginRequired: false };
    setMessages(prev => [...prev, userMessage]);

    if (!textToSend) {
      setInputValue('');
    }

    setIsTyping(true);
    setThinkingStep('생각 중...');

    try {
      await chatAPI.postChatStream({ message: messageContent, store_id, caseId: currentCaseId || undefined }, (response: any) => {
        if (response.type === 'thinking') {
          setThinkingStep(response.message);
        } else if (response.type === 'answer' && response.ok) {
          const aiMessage = {
            id: Date.now(),
            text: response.answer,
            isAi: true,
            isLoginRequired: false,
          };
          setMessages(prev => [...prev, aiMessage]);
          setIsTyping(false);
          setThinkingStep('');

          if (response.caseId) {
            setCurrentCaseId(response.caseId);
          }
        } else if (response.type === 'login_required') {
          const aiMessage = {
            id: Date.now(),
            text: response.message,
            isAi: true,
            isLoginRequired: true,
          };
          setMessages(prev => [...prev, aiMessage]);
          setIsTyping(false);
          setThinkingStep('');

          if (response.caseId) {
            setCurrentCaseId(response.caseId);
          }
        } else if (response.ok === false) {
          throw new Error(response.error);
        }
      });
    } catch (error) {
      console.error('API Error:', error);
      setMessages(prev => [
        ...prev,
        {
          id: Date.now(),
          text: '응답 처리 중 오류가 발생했습니다.',
          isAi: true,
          isLoginRequired: false,
        },
      ]);
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

  const handleCloseChat = async () => {
    if (!currentCaseId) return;

    try {
      await chatAPI.postChatClose(currentCaseId);
      setMessages(prev => [...prev, { id: Date.now(), text: '상담이 종료되었습니다. 이용해 주셔서 감사합니다.', isAi: true, isLoginRequired: false }]);
      setCurrentCaseId(null);
    } catch (error) {
      console.error('채팅 종료 중 오류 발생:', error);
    }
  };

  return (
    <>
      {currentCaseId && (
        <button
          onClick={handleCloseChat}
          className="absolute top-4 right-4 z-10 flex cursor-pointer items-center gap-1.5 rounded-full bg-zinc-100 px-3 py-1.5 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-200"
        >
          <XCircle size={16} />
          상담 종료
        </button>
      )}
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

                {msg.isLoginRequired && (
                  <div className="mt-4 w-full">
                    <GoogleLoginButton />
                  </div>
                )}
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
