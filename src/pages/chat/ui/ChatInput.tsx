'use client';

import React from 'react';
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
  // ❌ 원인이었던 visualViewport 높이 계산 로직을 모두 제거합니다.

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <footer
      // bottom-0과 env(safe-area-inset-bottom)만 사용합니다.
      className="fixed right-0 bottom-0 left-0 z-50 w-full p-4 pb-[calc(1rem+env(safe-area-inset-bottom))] transition-all duration-200 ease-out"
    >
      <div className="relative flex w-full items-center gap-2 rounded-2xl border border-white/80 bg-zinc-50 p-2 shadow-sm transition-all focus-within:border-zinc-300 focus-within:bg-white/80">
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
