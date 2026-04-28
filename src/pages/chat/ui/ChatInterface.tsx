'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { chatAPI } from '@/entities/chat';
import { StoreType } from '@/entities/store';
import { GoogleLoginButton } from '@/features/login';
import { ChatCloseButton, ReservationForm, StarRatingUI } from './Components';
import { ChatMessage } from '../types/chat';
import { QuickPrompts } from './QuickPrompts';
import { useAuth } from '@/entities/auth';
import { ChatInput } from './ChatInput';

export const ChatInterface = ({ store_id, storeData }: { store_id: number; storeData: StoreType }) => {
  // --- 상수 및 설정 ---
  const STORAGE_KEY = `chat_session_store_${store_id}`;
  const EXPIRATION_TIME = 20 * 60 * 1000; // 20분 (밀리초)

  // --- 상태 관리 ---
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const { data: authData } = useAuth();
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [thinkingStep, setThinkingStep] = useState('');
  const [currentCaseId, setCurrentCaseId] = useState<number | null>(null);
  const [isInitialized, setIsInitialized] = useState(false); // 초기 로드 여부 확인

  const latestUserMsgRef = useRef<HTMLDivElement>(null);
  const latestUserMsgId = [...messages].reverse().find(m => !m.isAi)?.id;
  const isChatEnded = messages.some(msg => msg.isRating);

  // --- 로컬스토리지 로직 ---

  // 1. 초기 마운트 시 데이터 복구
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);

    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        const currentTime = Date.now();
        const lastUpdated = parsed.lastUpdated || 0;

        // 20분이 지났는지 확인
        if (currentTime - lastUpdated > EXPIRATION_TIME) {
          localStorage.removeItem(STORAGE_KEY);
          resetChat();
        } else {
          setMessages(parsed.messages);
          setCurrentCaseId(parsed.currentCaseId);
        }
      } catch (e) {
        console.error('Failed to parse chat history', e);
        resetChat();
      }
    } else {
      resetChat();
    }
    setIsInitialized(true);
  }, [store_id]);

  // 2. 메시지나 세션 변경 시 로컬스토리지 저장
  useEffect(() => {
    if (isInitialized && messages.length > 0) {
      const dataToSave = {
        messages,
        currentCaseId,
        lastUpdated: Date.now(), // 저장할 때마다 타임스탬프 갱신
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
    }
  }, [messages, currentCaseId, isInitialized, STORAGE_KEY]);

  const resetChat = () => {
    setMessages([{ id: 1, text: `안녕하세요! ${storeData.name} 챗봇 입니다. 문의사항이 있으신가요?`, isAi: true, isLoginRequired: false }]);
    setCurrentCaseId(null);
  };

  // --- 스크롤 로직 ---
  useEffect(() => {
    if (latestUserMsgRef.current) {
      latestUserMsgRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [messages.length, isTyping]);

  // --- 핸들러 ---
  const handleSendMessage = async (textToSend?: string) => {
    const messageContent = textToSend || inputValue;
    if (!messageContent.trim() || isChatEnded) return;

    setMessages(prev => [...prev, { id: Date.now(), text: messageContent, isAi: false }]);
    if (!textToSend) setInputValue('');

    setIsTyping(true);
    setThinkingStep('생각 중...');

    try {
      await chatAPI.postChatStream({ message: messageContent, store_id, caseId: currentCaseId || undefined }, (response: any) => {
        if (response.type === 'thinking') {
          setThinkingStep(response.message);
        } else if (response.type === 'answer' && response.ok) {
          setMessages(prev => [
            ...prev,
            {
              id: Date.now(),
              text: response.answer,
              isAi: true,
              showReservationForm: response.showReservationForm,
              availableSlots: response.availableSlots,
            },
          ]);
          setIsTyping(false);
          setThinkingStep('');
          if (response.caseId) setCurrentCaseId(response.caseId);
        } else if (response.type === 'login_required') {
          setMessages(prev => [...prev, { id: Date.now(), text: response.message, isAi: true, isLoginRequired: true }]);
          setIsTyping(false);
          setThinkingStep('');
          if (response.caseId) setCurrentCaseId(response.caseId);
        }
      });
    } catch {
      setMessages(prev => [...prev, { id: Date.now(), text: '응답 처리 중 오류가 발생했습니다.', isAi: true }]);
      setIsTyping(false);
      setThinkingStep('');
    }
  };

  const handleQuickPromptAction = (userText: string, aiText: string) => {
    if (isChatEnded) return;

    setMessages(prev => [...prev, { id: Date.now(), text: userText, isAi: false }]);
    setIsTyping(true);
    setThinkingStep('정보를 확인하는 중...');

    setTimeout(() => {
      setMessages(prev => [...prev, { id: Date.now() + 1, text: aiText, isAi: true }]);
      setIsTyping(false);
      setThinkingStep('');
    }, 600);
  };

  // 초기화 전에는 아무것도 렌더링하지 않거나 로딩바를 보여줌 (Hydration Error 방지)
  if (!isInitialized) return null;

  return (
    <>
      {!isChatEnded && <ChatCloseButton currentCaseId={currentCaseId} setMessages={setMessages} />}

      <section className="flex-1 space-y-8 overflow-y-auto p-6 pb-[60vh] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
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
                <p className="text-[15px] leading-relaxed break-words whitespace-pre-wrap">{msg.text}</p>

                {msg.showReservationForm && authData?.user && (
                  <ReservationForm availableSlots={msg.availableSlots} store_id={store_id} customer_id={authData.user.customer_id} />
                )}
                {msg.isLoginRequired && (
                  <div className="mt-4 w-full">
                    <GoogleLoginButton />
                  </div>
                )}
                {msg.isRating && <StarRatingUI store_id={store_id} case_id={currentCaseId!} />}
              </div>
            </motion.div>
          );
        })}

        {messages.length === 1 && <QuickPrompts storeData={storeData} onAction={handleQuickPromptAction} />}

        {isTyping && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex justify-start px-2 py-3">
            <div className="flex items-center gap-2.5 py-2">
              <Loader2 size={16} className="animate-spin text-zinc-400" />
              <div className="relative flex items-center overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={thinkingStep}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="text-[14px] font-medium tracking-tight text-zinc-400"
                  >
                    {thinkingStep || '생각 중...'}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </section>

      <ChatInput inputValue={inputValue} setInputValue={setInputValue} handleSendMessage={handleSendMessage} isChatEnded={isChatEnded} />
    </>
  );
};
