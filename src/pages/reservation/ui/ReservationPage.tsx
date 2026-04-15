'use client';
import { useReservations } from '@/entities/store';
import { ReservationType } from '@/shared/types/reservation';
import { Calendar, Users, Clock, User } from 'lucide-react';

export function ReservationPage() {
  const { data } = useReservations(2);

  const sortedData = data ? [...data.data].sort((a, b) => new Date(a.reserved_at).getTime() - new Date(b.reserved_at).getTime()) : [];

  const groupedData = sortedData.reduce(
    (acc, reservation) => {
      const dateObj = new Date(reservation.reserved_at);
      const dateKey = dateObj.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'short',
      });

      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(reservation);
      return acc;
    },
    {} as Record<string, ReservationType[]>
  );

  return (
    <div className="w-full space-y-12 pb-20">
      <div>
        <h1 className="mb-3 text-3xl font-bold tracking-tight text-zinc-900">예약 관리</h1>
        <p className="text-[17px] font-medium text-zinc-500">고객의 예약 현황을 관리하고, 예약 관련 문의에 답변합니다.</p>
      </div>

      <hr className="border-t-2 border-zinc-100" />

      <div className="flex flex-col gap-8 xl:flex-row xl:gap-20">
        <div className="shrink-0 xl:w-80">
          <h2 className="text-[22px] font-bold text-zinc-900">예약 현황</h2>
          <p className="mt-2 text-[15px] leading-relaxed font-medium text-zinc-500">날짜 및 시간별로 고객의 예약 정보를 확인합니다.</p>
        </div>

        <div className="flex-1">
          {Object.keys(groupedData).length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 py-24">
              <Calendar className="mb-4 h-10 w-10 text-zinc-300" />
              <p className="text-[16px] font-medium text-zinc-500">등록된 예약 내역이 없습니다.</p>
            </div>
          ) : (
            <div className="space-y-12">
              {Object.entries(groupedData).map(([dateString, reservations]) => (
                <section key={dateString}>
                  <div className="mb-5 flex items-center gap-2.5">
                    <h3 className="text-lg font-bold text-zinc-800">{dateString}</h3>
                    <span className="ml-2 rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-semibold text-zinc-500">{reservations.length}건</span>
                  </div>

                  <div className="grid gap-5 border-b border-zinc-300 pb-12 sm:grid-cols-2 md:grid-cols-4">
                    {reservations.map(reservation => {
                      const reserveDate = new Date(reservation.reserved_at);
                      const timeString = reserveDate.toLocaleTimeString('ko-KR', {
                        hour: '2-digit',
                        minute: '2-digit',
                      });

                      return (
                        <div
                          key={reservation.reservation_id}
                          className="group flex flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
                        >
                          <div className="p-5">
                            <div className="mb-5 flex items-center justify-between">
                              <span className="text-[13px] font-semibold tracking-wide text-zinc-400">예약번호 {reservation.reservation_id}</span>
                              <span
                                className={`flex items-center rounded-full px-2.5 py-1 text-[12px] font-bold ${
                                  reservation.status === '완료'
                                    ? 'bg-zinc-700 text-zinc-50 ring-1 ring-zinc-700/20 ring-inset'
                                    : 'bg-zinc-100 text-zinc-400 ring-1 ring-zinc-400/20 ring-inset'
                                }`}
                              >
                                {reservation.status}
                              </span>
                            </div>

                            <div className="flex flex-col justify-between gap-4">
                              <div className="flex items-center gap-2.5">
                                <Clock className="h-4 w-4 text-zinc-500" />
                                <span className="text-[15px] font-bold tracking-tight text-zinc-900">{timeString}</span>
                              </div>

                              {reservation.headcount !== null && (
                                <>
                                  <div className="flex items-center gap-2.5">
                                    <Users className="h-4 w-4 text-zinc-500" />
                                    <span className="text-[15px] font-bold tracking-tight text-zinc-900">인원수 : {reservation.headcount}명</span>
                                  </div>
                                </>
                              )}
                            </div>
                          </div>

                          <div className="mt-auto flex items-center justify-between border-t border-zinc-100 bg-white px-5 py-3.5">
                            <div className="flex items-center gap-2 text-zinc-600">
                              <User className="h-4 w-4 shrink-0 text-zinc-400" />
                              <span className="text-[13px] font-medium">{reservation.customer_id ? `고객 ID: ${reservation.customer_id}` : '비회원 예약'}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
