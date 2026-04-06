'use client';
import { useRef } from 'react';
import { Copy, X } from 'lucide-react';
import { cn } from '@/shared/lib/utils';

const DEFAULT_BUSINESS_HOURS = {
  mon: '09:00~18:00',
  tue: '09:00~18:00',
  wed: '09:00~18:00',
  thu: '09:00~18:00',
  fri: '09:00~18:00',
  sat: 'off',
  sun: 'off',
};

const TIME_SLOTS = Array.from({ length: 48 }, (_, i) => {
  const hour = Math.floor(i / 2)
    .toString()
    .padStart(2, '0');
  const minute = i % 2 === 0 ? '00' : '30';
  return `${hour}:${minute}`;
});

export function BusinessHoursSection({ hours, onChange }: { hours: any; onChange: (newHours: any) => void }) {
  const currentHours = hours || DEFAULT_BUSINESS_HOURS;
  const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'] as const;
  const korDays: Record<string, string> = { mon: '월', tue: '화', wed: '수', thu: '목', fri: '금', sat: '토', sun: '일' };

  const isDragging = useRef(false);
  const selectionStart = useRef<{ day: string; slotIdx: number } | null>(null);

  const getSelectedIndices = (timeStr: string) => {
    if (!timeStr || typeof timeStr !== 'string' || timeStr === 'off' || !timeStr.includes('~')) {
      return null;
    }

    const [open, close] = timeStr.split('~');

    if (!open || !close) return null;

    const startIdx = TIME_SLOTS.indexOf(open.trim());
    const endIdx = TIME_SLOTS.indexOf(close.trim());

    if (startIdx === -1 || endIdx === -1) return null;

    return {
      start: startIdx,
      end: endIdx,
    };
  };
  const formatTimeRange = (start: number, end: number) => {
    return `${TIME_SLOTS[start]}~${TIME_SLOTS[end]}`;
  };

  const handleMouseDown = (day: string, slotIdx: number) => {
    isDragging.current = true;
    selectionStart.current = { day, slotIdx };
  };

  const handleMouseEnter = (day: string, slotIdx: number) => {
    if (!isDragging.current || !selectionStart.current) return;
    if (selectionStart.current.day !== day) return;
    const startIdx = selectionStart.current.slotIdx;
    const min = Math.min(startIdx, slotIdx);
    const max = Math.max(startIdx, slotIdx);
    const newHours = { ...currentHours };
    newHours[day] = formatTimeRange(min, max);
    onChange(newHours);
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    selectionStart.current = null;
  };

  const copyToWeekdays = () => {
    const next = { ...currentHours };
    ['tue', 'wed', 'thu', 'fri'].forEach(d => {
      next[d] = next.mon;
    });
    onChange(next);
  };

  return (
    <div className="w-full space-y-6 pb-10" onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}>
      <div className="flex flex-col gap-4 px-1 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={copyToWeekdays}
          className="flex items-center justify-center gap-2 rounded-xl bg-zinc-100 px-4 py-2 text-[13px] font-bold text-zinc-600 transition-all hover:bg-zinc-900 hover:text-white"
        >
          <Copy size={14} /> 월요일 시간을 평일 전체에 적용
        </button>
      </div>

      <div className="relative">
        <div className="mb-4 grid grid-cols-[140px_repeat(48,1fr)] items-center text-[16px] tracking-tighter text-zinc-400 uppercase">
          <div className="col-start-1" />
          {[0, 6, 12, 18, 24].map(h => (
            <div
              key={h}
              className={cn('relative flex flex-col items-center', h === 0 ? 'items-start' : h === 24 ? 'items-end' : 'items-center')}
              style={{
                gridColumnStart: h === 24 ? 49 : h * 2 + 2,
              }}
            >
              <span
                style={{
                  transform: h !== 0 && h !== 24 ? 'translateX(-50%)' : 'none',
                  whiteSpace: 'nowrap',
                }}
              >
                {h.toString().padStart(2, '0')}:00
              </span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-[80px_repeat(48,1fr)] gap-x-px gap-y-1.5">
          {days.map(day => {
            const indices = getSelectedIndices(currentHours[day]);

            return (
              <div key={day} className="group relative col-span-full grid h-8 grid-cols-[140px_repeat(48,1fr)] items-center gap-x-px">
                <div className="flex h-full items-center gap-3 pr-4">
                  <span
                    className={cn('w-5 shrink-0 text-center text-[16px]', day === 'sun' ? 'text-rose-400' : day === 'sat' ? 'text-blue-400' : 'text-zinc-700')}
                  >
                    {korDays[day]}
                  </span>

                  <div
                    className={cn(
                      'flex flex-1 items-center justify-between gap-1.5 rounded-lg border px-2 py-1.5 transition-all',
                      indices ? 'border-zinc-700 bg-zinc-700 text-white' : 'border-zinc-100 bg-zinc-50 text-zinc-300'
                    )}
                  >
                    <span className="truncate text-[10px] leading-none font-bold tracking-tighter">{indices ? currentHours[day] : 'CLOSED'}</span>
                    <button
                      onClick={() => onChange({ ...currentHours, [day]: indices ? 'off' : '09:00~18:00' })}
                      className="shrink-0 transition-colors hover:text-rose-500"
                    >
                      <X size={12} strokeWidth={3} />
                    </button>
                  </div>
                </div>

                {TIME_SLOTS.map((slot, idx) => {
                  const isSelected = indices && idx >= indices.start && idx <= indices.end;
                  return (
                    <div
                      key={`${day}-${idx}`}
                      onMouseDown={() => handleMouseDown(day, idx)}
                      onMouseEnter={() => handleMouseEnter(day, idx)}
                      className={cn(
                        'h-8 cursor-pointer border transition-all duration-100',
                        isSelected ? 'border-zinc-700 bg-zinc-700' : 'border-zinc-100 bg-zinc-100 hover:border-zinc-300 hover:bg-zinc-50'
                      )}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
