import { storeAPI } from '@/entities/store';
import { ChatInterface } from './ChatInterface';
import { ChatNotice } from './Components';

export async function ChatPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const storeData = await storeAPI.getStoreInfomation(Number(id));

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-zinc-50 text-zinc-800 md:p-8">
      <ChatNotice notice={storeData.notice} />
      <div className="absolute top-[5%] left-[15%] h-[40vw] w-[40vw] rounded-full bg-white blur-[100px]" />
      <div className="absolute right-[15%] bottom-[5%] h-[45vw] w-[45vw] rounded-full bg-zinc-200/50 blur-[120px]" />
      <div className="z-10 flex h-[100vh] w-full max-w-5xl overflow-hidden rounded-3xl bg-white/40 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-2xl md:h-[85vh]">
        <main className="relative flex flex-1 flex-col">
          <header className="flex h-16 items-center justify-between border-b border-zinc-200 bg-white/30 px-6 shadow-sm">
            <div className="flex items-center gap-3">
              <h2 className="font-medium text-zinc-700">{storeData.name}</h2>
            </div>
          </header>
          <ChatInterface store_id={id} storeData={storeData} />
        </main>
      </div>
    </div>
  );
}
