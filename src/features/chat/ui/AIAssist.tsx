'use client';
import { useState } from 'react';
import { Sparkles, Copy, Check, MessageSquare, Bot } from 'lucide-react';
import { motion } from 'framer-motion';
import { useChatSummary } from '@/entities/chat/hooks/useChatSummary';

export const AIAssist = ({ case_id }: { case_id: number }) => {
  const { data } = useChatSummary(case_id);
  const [isCopied, setIsCopied] = useState(false);

  if (data.ok === false) {
    return (
      <div className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 p-6 text-center text-[14px] text-zinc-500">
        AI 분석을 불러오는 데 실패했습니다. 잠시 후 다시 시도해주세요.
      </div>
    );
  }

  // 1. 추천 답변 복사 기능
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(data.suggested_answer);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('복사 실패:', err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)]"
    >
      {/* 🔹 헤더 영역 */}
      <div className="flex items-center justify-between border-b border-zinc-100 px-5 py-4">
        <div className="flex items-center gap-2">
          <Sparkles size={16} className="text-zinc-800" />
          <h3 className="text-[15px] font-semibold text-zinc-800">AI 어시스트</h3>
        </div>

        {/* 톤온톤 감정 뱃지: 색상 대신 명도와 폰트 웨이트로 구분 */}
        <div className="flex items-center rounded-md bg-zinc-100 px-2.5 py-1 text-[12px] font-medium text-zinc-500">
          고객 감정 <span className="ml-1.5 font-bold text-zinc-700">{data.emotion}</span>
        </div>
      </div>

      <div className="flex flex-col gap-6 p-5">
        {/* 🔹 대화 요약 섹션 */}
        <section>
          <div className="mb-2.5 flex items-center gap-1.5 text-[13px] font-medium text-zinc-500">
            <MessageSquare size={15} />
            <h4>대화 요약</h4>
          </div>
          {/* 배경을 빼고 텍스트에만 집중하도록 수정 */}
          <p className="text-[14px] leading-relaxed text-zinc-700">{data.summary}</p>
        </section>

        {/* 미니멀한 구분선 */}
        <hr className="border-zinc-100" />

        {/* 🔹 AI 추천 답변 섹션 */}
        <section>
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-[14px] font-semibold text-zinc-800">
              <Bot size={16} className="text-zinc-600" />
              <h4>추천 답변</h4>
            </div>

            {/* 복사 버튼 */}
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 rounded-md px-2 py-1.5 text-[12px] font-medium text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-800"
            >
              {isCopied ? (
                <>
                  <Check size={14} className="text-zinc-800" />
                  <span className="text-zinc-800">복사완료</span>
                </>
              ) : (
                <>
                  <Copy size={14} />
                  <span>복사하기</span>
                </>
              )}
            </button>
          </div>

          {/* 파란색 톤 대신 차분한 연회색 톤온톤 박스 */}
          <div className="rounded-xl border border-zinc-100 bg-zinc-50/80 p-4">
            <p className="text-[14px] leading-relaxed break-keep text-zinc-700">{data.suggested_answer}</p>
          </div>
        </section>
      </div>
    </motion.div>
  );
};
