'use client';
import { Triangle } from 'lucide-react';

export function InsightGauge({ score }: { score: number }) {
  const min = 0;
  const max = 100;

  const getStatus = (val: number) => {
    if (val <= 40) return { label: '위험', desc: '즉각적인 조치 필요', color: 'text-[#ff5f5f]' };
    if (val <= 70) return { label: '주의', desc: '지속적인 모니터링 요망', color: 'text-[#ffb347]' };
    return { label: '정상', desc: '안정적으로 운영 중', color: 'text-[#2ecc71]' };
  };

  const status = getStatus(score);
  const percentage = Math.min(Math.max(((score - min) / (max - min)) * 100, 0), 100);

  return (
    <div className="w-full max-w-[420px]">
      <div className="flex items-end justify-between">
        <div className="flex flex-col gap-0.5">
          <div className="flex items-baseline gap-1">
            <span className="text-5xl font-semibold tracking-tighter text-zinc-600">{score}</span>
            <span className="text-sm font-bold tracking-widest text-zinc-400">점</span>
          </div>
        </div>

        <div className="pb-1 text-right">
          <p className={`text-[15px] font-bold ${status.color} leading-tight tracking-tight`}>{status.desc}</p>
        </div>
      </div>

      <div className="relative py-6">
        <div
          className="absolute top-2 z-10 flex flex-col items-center transition-all duration-1000 ease-out"
          style={{ left: `${percentage}%`, transform: 'translateX(-50%)' }}
        >
          <Triangle className="rotate-180 fill-zinc-600 text-zinc-600" size={10} strokeWidth={4} />
        </div>

        <div className="flex h-4 w-full gap-1.5">
          <div className="h-full flex-[40] rounded-l-xl bg-gradient-to-r from-[#ff8c8c] to-[#ffb68d] opacity-90 shadow-inner" />
          <div className="h-full flex-[30] bg-[#ffe08d] opacity-90 shadow-inner" />
          <div className="h-full flex-[30] rounded-r-xl bg-gradient-to-r from-[#a2f0b5] to-[#7ed997] opacity-90 shadow-inner" />
        </div>

        <div className="relative mt-3 flex w-full gap-1.5 text-xs tracking-tighter text-zinc-400">
          <span className="absolute left-0">0</span>
          <div className="relative flex-[40] text-right">
            <span className="absolute right-0 translate-x-1/2">40</span>
          </div>
          <div className="relative flex-[30] text-right">
            <span className="absolute right-0 translate-x-1/2">70</span>
          </div>
          <div className="relative flex-[30] text-right">
            <span className="absolute right-0">100</span>
          </div>
        </div>
      </div>
    </div>
  );
}
