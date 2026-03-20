import { ChatInterface } from './ChatInterface';
import { ChatSidebar } from './ChatSidebar';

export async function ChatPage({ params }: { params: Promise<{ id: number }> }) {
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const { id } = await params;

  return (
    <div className="min-h-screen bg-zinc-50 flex items-center justify-center md:p-8 font-sans relative overflow-hidden text-zinc-800">
      <div className="absolute top-[5%] left-[15%] w-[40vw] h-[40vw] bg-white rounded-full blur-[100px]" />
      <div className="absolute bottom-[5%] right-[15%] w-[45vw] h-[45vw] bg-zinc-200/50 rounded-full blur-[120px]" />
      <div className="w-full max-w-5xl h-[100vh] md:h-[85vh] flex rounded-3xl bg-white/40 backdrop-blur-2xl  shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden z-10">
        {/* <ChatSidebar /> */}

        <main className="flex-1 flex flex-col relative">
          <header className="h-16 flex items-center justify-between px-6 bg-white/30 border-b border-white/60">
            <div className="flex items-center gap-3">
              <h2 className="font-medium text-zinc-700">가게이름</h2>
            </div>
          </header>
          <ChatInterface />
        </main>
      </div>
    </div>
  );
}
