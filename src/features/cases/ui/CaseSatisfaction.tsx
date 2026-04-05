'use client';
import { Star, Target } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCaseSatisfaction } from '@/entities/cases';

export const CaseSatisfaction = ({ case_id }: { case_id: number }) => {
  const { data } = useCaseSatisfaction(case_id);

  if (!data || data.length === 0) {
    return (
      <div className="flex w-full flex-col items-center justify-center rounded-2xl border border-zinc-200 bg-zinc-50 p-8 text-center shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)]">
        <Target size={28} className="mb-3 text-zinc-300" />
        <p className="text-[14px] font-medium text-zinc-500">수집된 상담 만족도 데이터가 없습니다.</p>
      </div>
    );
  }

  const satisfactionData = data[0];

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return new Intl.DateTimeFormat('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const getScoreFeedback = (scoreStr: string) => {
    const score = parseFloat(scoreStr);
    if (score >= 4.5) return '매우 긍정적';
    if (score >= 3.5) return '긍정적';
    if (score >= 2.5) return '보통';
    return '개선 필요';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)]"
    >
      <div className="flex items-center justify-between border-b border-zinc-100 bg-zinc-50/50 px-5 py-4">
        <div className="flex items-center gap-2">
          <Target size={16} className="text-zinc-800" />
          <h3 className="text-[15px] font-semibold text-zinc-800">상담 만족도</h3>
        </div>
        <span className="text-[12px] font-medium text-zinc-500">{formatDate(satisfactionData.collected_at)}</span>
      </div>

      <div className="flex flex-col items-center justify-center px-5 py-20">
        <div className="mb-3 flex items-center gap-2">
          <Star size={28} className="fill-zinc-700 text-zinc-700" />
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-bold tracking-tight text-zinc-800">{satisfactionData.score}</span>
            <span className="text-[16px] font-medium text-zinc-400">/ 5.0</span>
          </div>
        </div>

        <span className="rounded-full bg-zinc-100 px-3 py-1 text-[13px] font-medium text-zinc-600">{getScoreFeedback(satisfactionData.score)}</span>
      </div>
    </motion.div>
  );
};
