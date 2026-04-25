'use client';
import { Package, Truck, Calendar, CheckCircle, MapPin, Clock } from 'lucide-react';
import { useShipment } from '@/entities/order';
import { useShipmentTracks } from '@/entities/shipment';

const formatDateTime = (isoString: string | null) => {
  if (!isoString) return null;
  const date = new Date(isoString);
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

const InfoRow = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string | null }) => {
  return (
    <div className="flex items-start gap-3 rounded-lg px-3 py-2.5 transition-colors">
      <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-zinc-100 text-zinc-500">{icon}</div>
      <div className="flex flex-col gap-0.5">
        <span className="text-[11px] font-semibold tracking-wider text-zinc-400 uppercase">{label}</span>
        <span className={`text-[13px] leading-relaxed break-keep ${!value ? 'text-zinc-400' : 'font-medium text-zinc-700'}`}>{value || '정보 없음'}</span>
      </div>
    </div>
  );
};

export const ShipmentItem = ({ order_id }: { order_id: number }) => {
  const { data } = useShipment(order_id);

  if (!data || data.length === 0) {
    return (
      <div className="flex items-center gap-2 rounded-2xl border border-zinc-200 bg-white px-5 py-4 text-[14px] text-zinc-500 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)]">
        <Package size={16} className="text-zinc-400" />
        조회된 배송 정보가 없습니다.
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)]">
      {/* 헤더 영역 */}
      <div className="flex items-center border-b border-zinc-100 bg-zinc-50/50 px-5 py-4">
        <div className="flex items-center gap-2">
          <Package size={16} className="text-zinc-800" />
          <h3 className="text-[15px] font-semibold text-zinc-800">배송 정보 ({data.length}건)</h3>
        </div>
      </div>

      <div className="flex flex-col gap-6 p-5">
        {data.map((shipment, index) => (
          <div key={shipment.shipment_id} className="grid grid-cols-1 gap-5 md:grid-cols-12">
            <div className="flex flex-col gap-1 md:col-span-5">
              <div className="mb-2 flex items-center gap-4 rounded-xl border border-zinc-100 bg-zinc-50/80 p-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-zinc-200 bg-white shadow-sm">
                  <Truck size={20} className="text-zinc-600" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[16px] font-bold text-zinc-900">{shipment.carrier}</span>
                  <span className="text-[13px] font-medium text-zinc-400">운송장 : {shipment.tracking_no}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-1">
                <InfoRow icon={<Calendar size={14} />} label="발송 기한" value={formatDateTime(shipment.promised_at)} />
                <InfoRow icon={<CheckCircle size={14} />} label="배송 완료일" value={formatDateTime(shipment.delivered_at)} />
              </div>
            </div>

            <div className="rounded-xl border border-zinc-100 bg-white p-5 md:col-span-7">
              <ShipmentTrackHistory shipment_id={shipment.shipment_id} />
            </div>
            {index < data.length - 1 && <div className="col-span-full my-2 border-b border-zinc-100" />}
          </div>
        ))}
      </div>
    </div>
  );
};

export const ShipmentTrackHistory = ({ shipment_id }: { shipment_id: number }) => {
  const { data: tracks } = useShipmentTracks(shipment_id);

  if (!tracks || tracks.length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-2 text-zinc-400">
        <MapPin size={24} className="text-zinc-300" />
        <span className="text-[13px] font-medium">배송 추적 내역이 없습니다.</span>
      </div>
    );
  }

  const sortedTracks = [...tracks].sort((a, b) => new Date(b.event_at).getTime() - new Date(a.event_at).getTime());

  return (
    <div className="flex h-full flex-col">
      <div className="mb-4 flex items-center gap-2">
        <Clock size={16} className="text-zinc-600" />
        <h4 className="text-[14px] font-semibold text-zinc-800">진행 상황</h4>
      </div>

      <div className="relative flex flex-col gap-6 pl-5 before:absolute before:top-2 before:bottom-2 before:left-[9px] before:w-[2px] before:bg-zinc-100">
        {sortedTracks.map((track, index) => {
          const isLatest = index === 0;

          return (
            <div key={track.track_id} className="relative flex flex-col gap-1">
              {/* 타임라인 도트 (가장 최근 내역은 진한 색상) */}
              <div
                className={`absolute top-1.5 -left-[16px] h-[10px] w-[10px] rounded-full border-2 border-white ring-1 ${
                  isLatest ? 'bg-zinc-700 ring-zinc-700' : 'bg-zinc-300 ring-zinc-200'
                }`}
              />

              <div className="flex items-center gap-2">
                <span className={`text-[14px] font-bold ${isLatest ? 'text-zinc-900' : 'text-zinc-500'}`}>{track.event_type}</span>
                <span className="rounded-md bg-zinc-100 px-1.5 py-0.5 text-[11px] font-medium text-zinc-500">{track.location}</span>
              </div>

              <span className="text-[12px] font-medium text-zinc-400">
                {new Date(track.event_at).toLocaleString('ko-KR', {
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
