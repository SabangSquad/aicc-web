export function AISolution() {
  const dummyData = {
    type: '이커머스',
    status: '위험',
    headline: '오배송 사고로 인해 VIP 고객 불만이 급증하고 있습니다!',
    trends: [
      {
        id: 1,
        title: '이슈 점유율',
        content: '배송 문의가 평소보다 120% 많아요. 특정 지역 배송 지연이 의심됩니다.',
      },
      {
        id: 2,
        title: '감정 리스크',
        content: "반품 건에서 '화남' 감정이 연속 발생 중입니다. 대응 속도를 높여주세요.",
      },
      {
        id: 3,
        title: '운영 패턴',
        content: '오전 10시~11시 사이에 문의가 쏠립니다. 이때 집중 대응을 권장합니다.',
      },
    ],
    // 💡 AI가 제안하는 구체적인 솔루션 데이터 추가
    solutions: [
      {
        priority: '긴급',
        title: '오배송 다발 품목 이중 검수',
        content: '최근 화이트 셔츠/치마 혼동이 많습니다. 출고 전 바코드 대조를 1회 더 진행하세요.',
      },
      {
        priority: '긴급',
        title: '배송 지연 공지 상단 배치',
        content: '특정 터미널 지연 이슈를 쇼핑몰 메인 공지에 띄워 단순 문의 유입을 차단하세요.',
      },
      {
        priority: '보통',
        title: 'VIP 전용 선환불 프로세스',
        content: 'VIP 고객 반품은 물건 회수 전 선환불을 진행하여 이탈 리스크를 관리하세요.',
      },
    ],
    cheerUp: '포장이 정성스럽다는 칭찬이 오늘만 3번 들어왔어요. 사장님, 기운 내세요!',
  };

  return (
    <div className="flex-1">
      {/* 헤더 섹션 */}
      <div className="pb-4">
        <h2 className="text-2xl font-semibold tracking-tight">AI Insight</h2>
        <p className="mt-1 text-[14px] text-muted-foreground">최근 상담 데이터 20건을 AI가 분석한 결과입니다.</p>
      </div>

      {/* 1. 운영 상태 요약 */}
      <div className="pb-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="bg-red-50 text-red-600 text-[12px] font-bold px-1.5 py-0.5 rounded border border-red-100">운영 상태: {dummyData.status}</span>
          <span className="text-red-500 text-[12px] font-bold">즉시 대응 필요</span>
        </div>
        <h3 className="text-[20px] font-black leading-tight text-zinc-800 mb-2 tracking-tight">{dummyData.headline}</h3>
      </div>
      <div className="flex flex-row gap-6 py-5">
        <div className="">
          <h4 className="text-[13px] font-bold text-zinc-400 mb-4 uppercase tracking-wider">주요 운영 트렌드</h4>
          <div className="space-y-4">
            {dummyData.trends.map(trend => (
              <div key={trend.id} className="flex gap-3">
                <span className="text-[14px] font-black text-zinc-200 mt-0.5">{trend.id}</span>
                <div className="flex flex-col gap-0.5">
                  <p className="text-[15px] font-bold text-zinc-800 leading-tight">{trend.title}</p>
                  <p className="text-[13px] font-medium text-zinc-500 leading-snug">{trend.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="">
          <h4 className="text-[13px] font-bold text-zinc-400 mb-4 uppercase tracking-wider">AI 권장 솔루션</h4>
          <div className="grid grid-cols-1 gap-2">
            {dummyData.solutions.map((sol, idx) => (
              <div key={idx} className="p-4 bg-zinc-50 rounded-xl border border-zinc-100 group hover:border-zinc-300 transition-colors">
                <div className="flex items-center gap-2 mb-1.5">
                  <span
                    className={`text-[10px] font-black px-1.5 py-0.5 rounded ${
                      sol.priority === '긴급' ? 'bg-red-100 text-red-700' : 'bg-zinc-200 text-zinc-700'
                    }`}
                  >
                    {sol.priority}
                  </span>
                  <p className="text-[14px] font-bold text-zinc-900">{sol.title}</p>
                </div>
                <p className="text-[13px] font-medium text-zinc-600 leading-relaxed pl-1 border-l-2 border-zinc-200 ml-1">{sol.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
