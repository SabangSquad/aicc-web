'use client';
import { useState, useEffect } from 'react';
import { ChevronRight, Sparkles } from 'lucide-react';
import Grainient from '@/shared/ui/Grainient';
import ScrollVelocity from '@/shared/ui/ScrollVelocity';

export function Landing() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-slate-950 text-white font-sans">
      <div className="fixed inset-0 z-0">
        <Grainient
          color1="#FF9FFC"
          color2="#5227FF"
          color3="#B19EEF"
          timeSpeed={0.4}
          colorBalance={0}
          warpStrength={1}
          warpFrequency={5}
          warpSpeed={2}
          warpAmplitude={50}
          blendAngle={0}
          blendSoftness={0.05}
          rotationAmount={500}
          noiseScale={2}
          grainAmount={0.1}
          grainScale={2}
          grainAnimated={false}
          contrast={1.5}
          gamma={1}
          saturation={1}
          centerX={0}
          centerY={0}
          zoom={0.9}
        />
        <div className="absolute inset-0 bg-black/10" />
      </div>

      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 md:px-12 py-4 
          ${
            isScrolled
              ? 'mt-6 mx-6 md:mx-60 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]'
              : 'bg-transparent border-b border-white/5'
          }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BriefyLogo />
          </div>
          <div className="hidden md:flex gap-10 text-sm font-medium">
            {['서비스 소개', '주요 기능', '도입 사례', '가격 안내'].map(item => (
              <a key={item} href="#" className="text-white/80 hover:text-white transition-colors relative group">
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-pink-400 transition-all group-hover:w-full" />
              </a>
            ))}
          </div>
          <button className="px-5 py-2.5 rounded-full bg-white text-indigo-950 font-bold text-sm transition-all shadow-lg">
            로그인 <ChevronRight size={16} className="inline-block" />
          </button>
        </div>
      </nav>

      <main className="relative z-10">
        <section className="flex flex-col items-center h-screen justify-center px-6 pt-10 text-center gap-6 ">
          <div>
            <span className="inline-flex items-center gap-2 text-xs uppercase bg-white/10 px-4 py-2 rounded-full tracking-widest text-white font-semibold mb-2 backdrop-blur-sm border border-white/10">
              <Sparkles fill={'currentColor'} size={16} className="text-white animate-pulse" />
              혁신적인 상담 자동화
            </span>
          </div>
          <h1 className="text-5xl font-black leading-tight ">
            <span className="[text-shadow:_0_4px_30px_rgb(0_0_0_/_80%)]">멈추지 않는 상담,</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-indigo-200 to-purple-300 filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.3)] ">
              AI가 완성합니다.
            </span>
          </h1>

          <div className="flex flex-col sm:flex-row gap-5">
            <button className="cursor-pointer px-10 py-2 rounded-full bg-white text-zinc-800 text-lg transition-all shadow-[0_0_20px_rgba(79,70,229,0.4)] flex items-center justify-center gap-2">
              시작하기
            </button>
            <button className="cursor-pointer px-10 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all text-lg">
              자세히 알아보기
            </button>
          </div>
        </section>

        <div className="relative w-full py-10 pointer-events-none select-none overflow-hidden">
          <ScrollVelocity
            texts={['상담의 새로운 기준', '멈추지 않는 대화의 시작']}
            velocity={15}
            className="text-8xl md:text-[12rem] font-bold tracking-tighter opacity-[0.15] text-white mix-blend-overlay"
          />
        </div>
        <section className="px-6 py-40">
          <div className="max-w-6xl mx-auto">
            <div className="mb-24 space-y-4">
              <div className="text-white/40 font-mono text-[10px] tracking-[0.5em] uppercase">Technology Layer</div>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight">
                상담의 본질, <br />
                <span className="text-white/20">기술로 증명하다.</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
              <FeatureCard
                span="md:col-span-8"
                num="01"
                title="지능형 AI 챗봇"
                desc="문맥을 이해하는 자연어 처리 엔진이 고객의 의도를 실시간으로 정의합니다."
              />
              <FeatureCard span="md:col-span-4" num="02" title="24/7 챗봇" desc="빈틈없는 상담 환경을 제안합니다." />
              <FeatureCard span="md:col-span-4" num="03" title="실시간 인사이트" desc="데이터 속 숨겨진 고객의 니즈를 즉각 시각화합니다." />
              <FeatureCard
                span="md:col-span-8"
                num="04"
                title="실시간 감정 분석 및 정밀 매칭"
                desc="AI가 대화를 분석하여 감정 상태를 파악하고 최적의 대응방법을 제안합니다."
              />
            </div>
          </div>
        </section>

        <footer className="py-20 text-center border-t border-white/5">
          <p className="text-white/40 text-xs tracking-[0.4em]">© 2026 NEXT AICC TECHNOLOGY.</p>
        </footer>
      </main>
    </div>
  );
}

const FeatureCard = ({ span, num, title, desc }: { span: string; num: string; title: string; desc: string }) => (
  <div
    className={`${span} group relative bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-12 overflow-hidden hover:bg-white/[0.07] transition-all duration-700`}
  >
    <div className="relative z-10 h-full flex flex-col justify-between">
      <div>
        <span className="text-white/40 font-mono text-md tracking-widest border-b border-white/10 pb-1 mb-16 inline-block">{num}</span>
        <h3 className="text-3xl font-bold tracking-tight mb-4 text-white">{title}</h3>
        <p className="text-white/60 text-base leading-relaxed font-light">{desc}</p>
      </div>
    </div>
  </div>
);

const BriefyLogo = () => (
  <div className="flex items-center gap-3 group cursor-pointer">
    <span className="text-2xl font-black tracking-tighter">
      <span className="text-white">BRIEF</span>
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FFFF] to-[#FF00E5] filter">Y</span>
    </span>
  </div>
);
