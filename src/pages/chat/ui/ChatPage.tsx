import { Menu } from 'lucide-react';
import { ChatInterface } from './ChatInterface';

export async function ChatPage({ params }: { params: Promise<{ id: number }> }) {
  const { id } = await params;

  return (
    <div className="min-h-screen bg-zinc-50 flex items-center justify-center md:p-8 font-sans relative overflow-hidden text-zinc-800">
      <div className="absolute top-[5%] left-[15%] w-[40vw] h-[40vw] bg-white rounded-full blur-[100px]" />
      <div className="absolute bottom-[5%] right-[15%] w-[45vw] h-[45vw] bg-zinc-200/50 rounded-full blur-[120px]" />
      <div className="w-full max-w-5xl h-[100vh] md:h-[85vh] flex rounded-3xl bg-white/40 backdrop-blur-2xl border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden z-10">
        <aside className="hidden md:flex flex-col w-72 bg-white/30 border-r border-white/60 p-5">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-xl font-medium tracking-wide text-zinc-800">
              AI<span className="text-zinc-400">.chat</span>
            </h1>
            <button className="p-2 hover:bg-white/50 rounded-lg transition-colors text-zinc-500">
              <Menu size={20} />
            </button>
          </div>

          <div className="space-y-2 flex-1 overflow-y-auto pr-2">
            {['UI/UX 리팩토링', 'API 연동 테스트', '배포 자동화 스크립트'].map((topic, i) => (
              <div
                key={i}
                className="p-3 bg-white/20 hover:bg-white/60 border border-transparent hover:border-white/80 rounded-xl cursor-pointer transition-all duration-200 text-sm text-zinc-600 hover:text-zinc-900 shadow-sm"
              >
                {topic}
              </div>
            ))}
          </div>
        </aside>

        <main className="flex-1 flex flex-col relative">
          <header className="h-16 flex items-center justify-between px-6 bg-white/30 border-b border-white/60">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-zinc-800 animate-pulse" />
              <h2 className="font-medium text-zinc-700">System Assistant</h2>
            </div>
          </header>
          <ChatInterface />
        </main>
      </div>
    </div>
  );
}
