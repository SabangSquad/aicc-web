import { BotIcon } from '@/shared/icon/BotIcon';

export const Introduce = () => {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center gap-6 animate-fade-in-up">
      <div className="w-20 h-20 rounded-3xl flex items-center justify-center shadow-2xl shadow-[#ac55f2]/20 mb-2 bg-ai">
        <BotIcon className="w-10 h-10 text-white animate-bounce" />
      </div>
      <h2 className="text-3xl font-bold text-slate-800">무엇을 도와드릴까요?</h2>
      <p className="text-slate-500 max-w-md leading-relaxed">AI가 친절하게 답변해 드립니다.</p>
    </div>
  );
};
