export function ReservationPage() {
  return (
    <div className="w-full space-y-16">
      {/* 헤더 섹션 */}
      <div>
        <h1 className="mb-3 text-3xl font-bold tracking-tight">예약 관리</h1>
        <p className="text-[17px] font-medium text-slate-500">고객의 예약 현황을 관리하고, 예약 관련 문의에 답변합니다.</p>
      </div>

      <hr className="border-t-2 border-slate-100" />

      {/* 예약 관리 섹션 */}
      <div className="flex flex-col gap-8 xl:flex-row xl:gap-20">
        <div className="shrink-0 xl:w-80">
          <h2 className="text-[22px] font-bold text-slate-900">예약 현황</h2>
          <p className="mt-2 text-[15px] leading-relaxed font-medium text-slate-500">고객의 예약 정보를 확인하고 관리합니다.</p>
        </div>

        <div className="flex-1 space-y-3">
          {/* 예약 리스트 또는 관리 UI가 여기에 들어갈 수 있습니다. */}
          <p className="text-[15px] text-slate-700">예약 리스트 및 관리 기능이 여기에 표시됩니다.</p>
        </div>
      </div>
    </div>
  );
}
