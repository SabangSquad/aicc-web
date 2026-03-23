export const AISolutionSkeleton = () => {
  return (
    <div className="relative min-h-[600px] w-full overflow-hidden rounded-3xl">
      <style>{`
        @keyframes orbit {
          0% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(50px, -30px) scale(1.2); }
          66% { transform: translate(-30px, 40px) scale(0.9); }
          100% { transform: translate(0, 0) scale(1); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-orbit { animation: orbit 12s ease-in-out infinite; }
        .animate-shimmer { animation: shimmer 4s infinite; }
        
      `}</style>

      <div className="absolute inset-0 overflow-hidden opacity-60">
        <div className="animate-orbit absolute -top-[10%] -left-[10%] h-[70%] w-[70%] rounded-full bg-[#f3e8ff] blur-[100px]" />
        <div className="animate-orbit absolute top-[10%] -right-[10%] h-[60%] w-[60%] rounded-full bg-[#fff1f2] blur-[100px] [animation-delay:3s]" />
        <div className="animate-orbit absolute -bottom-[10%] left-[10%] h-[60%] w-[60%] rounded-full bg-[#fff7ed] blur-[100px] [animation-delay:6s]" />
      </div>

      <div className="relative z-10 flex h-full flex-col p-12 opacity-40">
        <div className="grid grid-cols-2 gap-10">
          <div className="space-y-6">
            <div className="h-40 w-full rounded-3xl border border-white bg-white/60" />
            <div className="h-40 w-full rounded-3xl border border-white bg-white/60" />
          </div>
          <div className="space-y-6 pt-12">
            <div className="h-40 w-full rounded-3xl border border-white bg-white/60" />
            <div className="h-40 w-full rounded-3xl border border-white bg-white/60" />
          </div>
        </div>
      </div>

      <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/10 backdrop-blur-[4px]">
        <div className="relative overflow-hidden rounded-[40px] border border-white/40 bg-white/70 p-[1px] shadow-2xl shadow-purple-100/50">
          <div className="relative flex flex-col items-center justify-center rounded-[39px] bg-white/40 px-16 py-12 backdrop-blur-2xl">
            <div className="text-center">
              <h3 className="text-ai mb-4 text-3xl font-extrabold tracking-tight">나만을 위한 AI의 특별한 제안</h3>
              <div className="flex flex-col gap-1">
                <p className="text-sm text-slate-400">AI 리포트 생성 중... 잠시만 기다려 주세요.</p>
              </div>
            </div>

            <div className="mt-10 h-1.5 w-56 overflow-hidden rounded-full bg-slate-100">
              <div className="animate-shimmer bg-ai h-full w-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
