'use client';
import { CheckCircle2 } from 'lucide-react';
import { GoogleLoginButton } from '@/features/login';
import Link from 'next/link';

export const Login = () => {
  return (
    <div className="w-full h-screen lg:grid lg:grid-cols-2 bg-white">
      <div className="hidden lg:flex flex-col justify-between bg-[#0B011A] p-16 text-white relative overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-purple-600/20 rounded-full blur-[100px]" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-pink-600/10 rounded-full blur-[100px]" />

        <div className="relative z-10">
          <Link href="/" className="text-2xl font-black tracking-tighter text-white">
            AICC
          </Link>
        </div>

        <div className="relative z-10 space-y-12">
          <div className="space-y-6">
            <h1 className="text-5xl font-bold leading-[1.2] tracking-tight">
              바쁜 사장님 대신,
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                AI 비서가 응대합니다
              </span>
            </h1>
            <p className="text-slate-400 text-xl font-light leading-relaxed max-w-md">
              매장 일로 바쁜 순간에도, <br />
              AI가 고객의 문의를 완벽하게 처리합니다.
            </p>
          </div>

          <ul className="space-y-5">
            {[
              '반복되는 질문은 AI가 알아서 척척',
              '24시간 쉬지 않는 우리 매장 고객센터',
              '고객 응대 품질은 높이고, 운영 비용은 절감',
            ].map((text, i) => (
              <li key={i} className="flex items-center gap-4 text-lg text-slate-200">
                <CheckCircle2 className="h-6 w-6 text-purple-500 shrink-0" />
                <span>{text}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative z-10 text-sm text-slate-500">&copy; 2026 AICC. Powered by Advanced AI.</div>
      </div>

      <div className="flex items-center justify-center p-8 bg-white text-slate-900">
        <div className="w-full max-w-[420px] space-y-10">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-extrabold tracking-tight">사장님, 환영합니다!</h2>
            <p className="text-slate-500 text-lg">
              <span className="text-ai font-semibold underline underline-offset-4 text-nowrap">3분 만에 </span>
              우리 매장 전용 AI를 만들 수 있습니다.
            </p>
          </div>
          <GoogleLoginButton />
        </div>
      </div>
    </div>
  );
};
