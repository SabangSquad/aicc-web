import { BotIcon } from 'lucide-react';

export const Loading = () => {
  return (
    <div className="flex items-end gap-3 mb-6">
      <div className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center shadow-md bg-ai">
        <BotIcon className="w-5 h-5 text-white" />
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-[11px] text-slate-400 ml-1 font-medium tracking-wide">AI Assistant</span>
        <div className="px-6 py-5 bg-slate-50 border border-slate-100 rounded-2xl rounded-bl-none shadow-sm">
          <div className="flex gap-2 items-center h-full">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ac55f2] animate-bounce" style={{ animationDelay: '0ms' }}></span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#e8499f] animate-bounce" style={{ animationDelay: '200ms' }}></span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff6b6b] animate-bounce" style={{ animationDelay: '400ms' }}></span>
          </div>
        </div>
      </div>
    </div>
  );
};
