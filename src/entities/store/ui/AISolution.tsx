'use client';
import { InsightGauge } from '../../../features/statistics/ui/InsightGauge';
import { useAISolution } from '../hooks/useStore';

export function AISolution() {
  const { data } = useAISolution(1);

  const analysis = data.ai_analysis;

  return (
    <div className="flex h-full flex-col">
      <div>
        <h2 className="text-ai w-fit text-2xl font-bold tracking-tight">AI Insight</h2>
        <p className="text-md mt-1 font-medium text-zinc-500">
          최근 {data.hours}시간 상담 데이터 {data.total_cases}건 분석
        </p>
      </div>

      <div className="mt-6 flex flex-col gap-6">
        <h3 className="text-[24px] font-bold tracking-tighter text-zinc-700">{analysis.headline}</h3>
        {/* 새 JSON에 score 데이터가 없으므로 임시 값 50 유지 */}
        <InsightGauge score={50} />
      </div>

      <div className="grid grid-cols-1 gap-8 pt-8 lg:grid-cols-2">
        <div>
          <h4 className="text-ai mb-5 w-fit text-lg font-bold">지금 벌어지고 있는 일</h4>
          <div className="space-y-6">
            {analysis.issues?.map((issue, index) => (
              <div key={index} className="group flex gap-4">
                <span className="text-[16px] font-black text-zinc-800 transition-colors">{String(index + 1).padStart(2, '0')}</span>
                <div className="flex flex-col gap-1">
                  <p className="text-[15px] leading-tight font-bold text-zinc-800">{issue.title}</p>
                  <p className="text-[13px] leading-relaxed font-medium tracking-tight text-zinc-500">{issue.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-ai mb-5 w-fit text-lg font-bold">추천 대응 전략</h4>
          <div className="flex flex-col gap-3">
            {analysis.strategies?.map((sol, idx) => {
              const isUrgent = sol.urgency === 'high';
              const priorityText = isUrgent ? '긴급' : '보통';

              return (
                <div
                  key={idx}
                  className="group rounded-2xl border border-zinc-100 bg-zinc-50 px-3 py-2 transition-all duration-200 hover:border-zinc-300 hover:bg-white"
                >
                  <div className="mb-2 flex items-center gap-2">
                    <span className={`rounded px-1.5 py-0.5 text-[9px] font-black ${isUrgent ? 'bg-red-100 text-red-700' : 'bg-zinc-200 text-zinc-700'}`}>
                      {priorityText}
                    </span>
                    <p className="text-[14px] font-bold text-zinc-900">{sol.title}</p>
                  </div>
                  <p className="text-[12px] font-medium text-zinc-600">{sol.detail}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
