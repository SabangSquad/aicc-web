'use client';

import React, { useState, useEffect } from 'react';
import { Send } from 'lucide-react';
import { motion } from 'motion/react';

export function ChatInput({
  inputValue,
  setInputValue,
  handleSendMessage,
  isChatEnded,
}: {
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  handleSendMessage: (textToSend?: string) => Promise<void>;
  isChatEnded: boolean;
}) {
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    if (!window.visualViewport) return;

    const handleResize = () => {
      const offset = window.innerHeight - window.visualViewport!.height;
      setKeyboardHeight(offset > 0 ? offset : 0);
    };

    window.visualViewport.addEventListener('resize', handleResize);
    window.visualViewport.addEventListener('scroll', handleResize);

    return () => {
      window.visualViewport?.removeEventListener('resize', handleResize);
      window.visualViewport?.removeEventListener('scroll', handleResize);
    };
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <footer
      className="fixed right-0 bottom-0 left-0 z-50 w-full p-4 transition-[bottom] duration-200 ease-out"
      style={{
        bottom: `${keyboardHeight}px`,
        paddingBottom: keyboardHeight > 0 ? '1rem' : 'calc(1rem + env(safe-area-inset-bottom))',
      }}
    >
      <div className="relative flex w-full items-center gap-2 rounded-2xl border border-white/80 p-2 shadow-sm transition-all focus-within:border-zinc-300 focus-within:bg-white/80">
        <input
          type="text"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isChatEnded}
          placeholder={isChatEnded ? '상담이 종료되었습니다.' : '메시지를 입력하세요...'}
          className="min-w-0 flex-1 border-none bg-transparent px-3 py-2 text-zinc-800 placeholder:text-zinc-400 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
        />
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => handleSendMessage()}
          disabled={!inputValue.trim() || isChatEnded}
          className="shrink-0 rounded-xl bg-zinc-800 p-2.5 text-white shadow-sm transition-all hover:bg-zinc-700 disabled:cursor-not-allowed disabled:bg-zinc-400"
        >
          <Send size={18} />
        </motion.button>
      </div>
    </footer>
  );
}
