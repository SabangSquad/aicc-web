'use client';
import { useAISolution } from '../hooks/useAIQuery';
import { InsightGauge } from './InsightGauge';

export function AISolution() {
  const { data } = useAISolution();

  return (
    <div className="flex h-full flex-col">
      <div>
        <h2 className="text-ai w-fit text-2xl font-bold tracking-tight">AI Insight</h2>
        <p className="text-md mt-1 font-medium text-zinc-500">최근 상담 데이터 20건 분석 ({data.lastUpdated} 기준)</p>
      </div>
      <div className="mt-6 flex flex-col gap-6">
        <h3 className="text-[24px] font-bold tracking-tighter text-zinc-700">{data.headline}</h3>
        <InsightGauge score={data.score} />
      </div>

      <div className="grid grid-cols-1 gap-8 pt-8 lg:grid-cols-2">
        <div>
          <h4 className="text-ai mb-5 w-fit text-lg font-bold">지금 벌어지고 있는 일</h4>
          <div className="space-y-6">
            {data.trends.map(trend => (
              <div key={trend.id} className="group flex gap-4">
                <span className="text-[16px] font-black text-zinc-800 transition-colors">{trend.id}</span>
                <div className="flex flex-col gap-1">
                  <p className="text-[15px] leading-tight font-bold text-zinc-800">{trend.title}</p>
                  <p className="text-[13px] leading-relaxed font-medium tracking-tight text-zinc-500">{trend.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-ai mb-5 w-fit text-lg font-bold">추천 대응 전략</h4>
          <div className="flex flex-col gap-3">
            {data.solutions.map((sol, idx) => (
              <div
                key={idx}
                className="group rounded-2xl border border-zinc-100 bg-zinc-50 px-3 py-2 transition-all duration-200 hover:border-zinc-300 hover:bg-white"
              >
                <div className="mb-2 flex items-center gap-2">
                  <span
                    className={`rounded px-1.5 py-0.5 text-[9px] font-black ${
                      sol.priority === '긴급' ? 'bg-red-100 text-red-700' : 'bg-zinc-200 text-zinc-700'
                    }`}
                  >
                    {sol.priority}
                  </span>
                  <p className="text-[14px] font-bold text-zinc-900">{sol.title}</p>
                </div>
                <p className="text-[12px] font-medium text-zinc-600">{sol.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// const data = {
//   type: '이커머스',
//   score: 30,
//   lastUpdated: '3시간 전',
//   headline: '오배송 사고로 인해 VIP 고객 불만이 급증하고 있습니다!',
//   trends: [
//     {
//       id: 1,
//       title: '이슈 점유율',
//       content: '배송 문의가 평소보다 120% 많아요. 특정 지역 배송 지연이 의심됩니다.',
//     },
//     {
//       id: 2,
//       title: '감정 리스크',
//       content: "반품 건에서 '화남' 감정이 연속 발생 중입니다. 대응 속도를 높여주세요.",
//     },
//     {
//       id: 3,
//       title: '운영 패턴',
//       content: '오전 10시~11시 사이에 문의가 쏠립니다. 이때 집중 대응을 권장합니다.',
//     },
//   ],
//   solutions: [
//     {
//       priority: '긴급',
//       title: '오배송 다발 품목 이중 검수',
//       content: '최근 화이트 셔츠/치마 혼동이 많습니다. 출고 전 바코드 대조를 1회 더 진행하세요.',
//     },
//     {
//       priority: '긴급',
//       title: '배송 지연 공지 상단 배치',
//       content: '특정 터미널 지연 이슈를 쇼핑몰 메인 공지에 띄워 단순 문의 유입을 차단하세요.',
//     },
//     {
//       priority: '보통',
//       title: 'VIP 전용 선환불 프로세스',
//       content: 'VIP 고객 반품은 물건 회수 전 선환불을 진행하여 이탈 리스크를 관리하세요.',
//     },
//   ],
// };
