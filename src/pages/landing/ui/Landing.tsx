'use client';
import Link from 'next/link';
import { Button } from '@/shared/ui/button';
import { ArrowRight, Clock, PhoneOff, Store, Calendar } from 'lucide-react';
import { BotIcon } from '@/shared/icon/BotIcon';

export const Landing = () => {
  return (
    <main className="flex w-full mx-auto flex-col bg-white text-zinc-900 overflow-hidden">
      <header className="sticky top-0 z-50 w-full border-b border-zinc-100 bg-white/95 backdrop-blur-sm">
        <div className="flex h-16 items-center justify-between px-4 md:px-6 max-w-7xl mx-auto">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight text-zinc-900">
            <span className="text-ai text-2xl">AICC</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button className="cursor-pointer bg-ai rounded-md px-5 text-white font-bold border-0 hover:opacity-100 transition-opacity">로그인</Button>
            </Link>
          </div>
        </div>
      </header>

      <section className="pt-16 pb-20 md:pt-28 md:pb-32 bg-[#F8FAFC]">
        <div className="mx-auto max-w-7xl px-4 md:px-6 grid md:grid-cols-2 gap-12 items-center">
          <div className="text-left space-y-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-800 leading-[1.2]">
              손이 모자란 사장님 대신 <br />
              <span className="text-ai font-black">AI가 답변해 드려요</span>
            </h1>
            <p className="text-lg md:text-xl text-zinc-600 leading-relaxed font-medium">
              주문받고 요리하느라 놓쳤던 고객 문의들, <br />
              이제 AI 비서에게 맡기고 사장님은 장사에만 집중하세요.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/login">
                <Button
                  size="lg"
                  className="cursor-pointer bg-ai h-14 px-8 rounded-lg text-white font-bold text-lg shadow-lg hover:opacity-100 transition-all border-0"
                >
                  지금 바로 시작하기 <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl border border-zinc-200 p-4 relative z-10">
              <div className="flex items-center gap-2 mb-4 border-b pb-4">
                <div className="w-10 h-10 bg-ai rounded-full flex items-center justify-center opacity-100">
                  <BotIcon className="w-5 h-5 text-white" />
                </div>
                <p className="text-xs text-zinc-400 font-bold">실시간 응대 현황</p>
              </div>

              <div className="space-y-4">
                <div className="flex flex-col items-end">
                  <div className="bg-zinc-100 p-3 rounded-2xl rounded-tr-none text-sm w-fit text-zinc-600 max-w-[80%] shadow-sm">
                    오늘 영업 하시나요? 주차장 있는지 궁금해요!
                  </div>
                </div>

                <div className="flex flex-col items-start">
                  <div className="bg-ai p-3 rounded-2xl rounded-tl-none text-sm text-white max-w-[85%] mr-auto shadow-md font-medium opacity-100">
                    네, 고객님! 오늘 정상 영업합니다. 건물 뒤편 전용 주차장을 무료로 이용하실 수 있습니다. 😊
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="absolute -bottom-10 -right-10 bg-white p-4 rounded-xl shadow-xl border border-zinc-100 flex items-center gap-3 z-20">
              <div className="bg-green-100 p-2 rounded-lg">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-xs text-zinc-400 ">미응대 제로</p>
                <p className="text-lg font-black">답변율 100%</p>
              </div>
            </div> */}
          </div>
        </div>
      </section>

      <section className="py-24 max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">이런 고민, AICC가 해결해 드릴게요</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: PhoneOff,
              title: '바빠서 전화를 못 받을 때',
              desc: '요리 중이거나 배달 중일 때 들어온 문의, AI가 실시간으로 채팅 답변을 남깁니다.',
            },
            {
              icon: Clock,
              title: '퇴근 후 늦은 밤 문의',
              desc: '밤늦게 온 가게 위치나 메뉴 문의도 AI가 바로 알려주니까, 다음 날 예약이 늘어납니다.',
            },
            {
              icon: Calendar,
              title: '매번 똑같은 반복 질문',
              desc: '영업 시간, 주차, 메뉴 추천... 같은 대답 반복하지 마세요. AI가 완벽하게 대처합니다.',
            },
          ].map((item, i) => (
            <div key={i} className="p-8 rounded-2xl bg-white border border-zinc-100 shadow-sm hover:shadow-md transition-shadow group">
              <item.icon className="w-10 h-10 mb-6 text-zinc-400 group-hover:text-fuchsia-400 transition-colors" />
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-zinc-500 leading-relaxed font-medium">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-zinc-50 py-24 border-t border-zinc-100">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-8">
          <Store className="w-16 h-16 text-zinc-300 mx-auto" />
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-800">
            이제 일에만 전념하세요. <br />
            상담은 <span className="text-ai">AICC</span>가 책임지겠습니다.
          </h2>
          <div className="flex flex-col items-center gap-4">
            <Link href="/login">
              <Button
                size="lg"
                className="cursor-pointer bg-ai h-16 px-12 rounded-lg text-white text-xl font-bold border-0 hover:opacity-100 shadow-xl transition-all"
              >
                무료로 써보기
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <footer className="bg-white border-t border-zinc-100 py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 font-bold text-zinc-400">AICC for Owner</div>
          <p className="text-xs text-zinc-400">© 2026 AICC. 모든 사장님들을 응원합니다.</p>
        </div>
      </footer>
    </main>
  );
};
