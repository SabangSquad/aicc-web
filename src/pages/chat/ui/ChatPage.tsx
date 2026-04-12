import { storeAPI } from '@/entities/store';
import { ChatInterface } from './ChatInterface';
import { ChatNotice } from './Components';
import { AlertCircle } from 'lucide-react';

export async function ChatPage({ params }: { params: Promise<{ id?: string }> }) {
  const { id } = await params;

  if (!id || id.length === 0) {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-zinc-50 p-6 text-zinc-800">
        <div className="absolute top-[5%] left-[15%] h-[40vw] w-[40vw] rounded-full bg-white blur-[100px]" />
        <div className="absolute right-[15%] bottom-[5%] h-[45vw] w-[45vw] rounded-full bg-zinc-200/50 blur-[120px]" />

        <div className="z-10 flex w-full max-w-md flex-col items-center rounded-3xl border border-white/20 bg-white/40 p-12 text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-2xl">
          <div className="relative mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-zinc-100 shadow-inner">
            <AlertCircle className="h-10 w-10 text-zinc-400" />
            <div className="absolute -top-1 -right-1 h-4 w-4 animate-ping rounded-full bg-zinc-300" />
          </div>

          {/* 메인 메시지 */}
          <h2 className="mb-3 text-2xl font-bold tracking-tight text-zinc-900">가게 정보를 찾을 수 없습니다</h2>
          <p className="mb-8 leading-relaxed text-zinc-500">
            채팅을 시작할 가게 정보가 올바르지 않습니다
            <br />
            주소에 ?id=[숫자] 형식으로 가게 ID를 포함하여 다시 접속해주세요
          </p>
        </div>
      </div>
    );
  }
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
