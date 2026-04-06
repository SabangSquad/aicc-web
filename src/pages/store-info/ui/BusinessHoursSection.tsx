import { useState, useEffect } from 'react';
import { Label } from '@/shared/ui/label';
import { Input } from '@/shared/ui/input';

export const DEFAULT_BUSINESS_HOURS = {
  mon: '09:00~18:00',
  tue: '09:00~18:00',
  wed: '09:00~18:00',
  thu: '09:00~18:00',
  fri: '09:00~18:00',
  sat: '휴무',
  sun: '휴무',
};

interface BusinessHoursSectionProps {
  hours: any;
  onChange: (newHours: any) => void; // 부모에게 완성된 객체를 전달
}

export function BusinessHoursSection({ hours, onChange }: BusinessHoursSectionProps) {
  const [weeklyHours, setWeeklyHours] = useState(() => {
    const currentHours = hours || DEFAULT_BUSINESS_HOURS;
    const daysMap = [
      { key: 'mon', label: '월' },
      { key: 'tue', label: '화' },
      { key: 'wed', label: '수' },
      { key: 'thu', label: '목' },
      { key: 'fri', label: '금' },
      { key: 'sat', label: '토' },
      { key: 'sun', label: '일' },
    ];
    return daysMap.map(({ key, label }) => {
      const timeStr = currentHours[key] || '휴무';
      const isOpen = timeStr !== '휴무';
      const [open, close] = isOpen ? timeStr.split('~') : ['09:00', '18:00'];
      return { id: key, day: label, isOpen, open: open?.trim() || '09:00', close: close?.trim() || '18:00' };
    });
  });

  // 내부 상태가 바뀔 때마다 부모에게 전달할 API 포맷으로 말아서 전송
  useEffect(() => {
    const formattedHours = weeklyHours.reduce(
      (acc, curr) => {
        acc[curr.id] = curr.isOpen ? `${curr.open}~${curr.close}` : '휴무';
        return acc;
      },
      {} as Record<string, string>
    );
    onChange(formattedHours);
  }, [weeklyHours]);

  const updateHour = (index: number, field: string, value: any) => {
    const newHours = [...weeklyHours];
    newHours[index] = { ...newHours[index], [field]: value };
    setWeeklyHours(newHours);
  };

  const copyToWeekdays = () => {
    const mon = weeklyHours[0];
    const newHours = weeklyHours.map((h, i) => (i > 0 && i < 5 ? { ...h, isOpen: mon.isOpen, open: mon.open, close: mon.close } : h));
    setWeeklyHours(newHours);
  };

  return (
    <div className="flex-1 space-y-6">
      <div className="flex items-center justify-between px-2">
        <Label className="text-[16px] font-bold text-slate-800">요일별 설정</Label>
        <button
          onClick={copyToWeekdays}
          className="rounded-lg bg-blue-50 px-3 py-1.5 text-[13px] font-bold text-blue-600 transition-colors hover:text-blue-800"
        >
          월요일 시간을 평일 전체에 적용
        </button>
      </div>

      <div className="space-y-3">
        {weeklyHours.map((item, idx) => (
          <div key={item.id} className={`flex items-center gap-4 rounded-2xl p-4 transition-all ${item.isOpen ? 'bg-slate-100' : 'bg-slate-50 opacity-60'}`}>
            <div className="flex w-24 items-center gap-3">
              <input
                type="checkbox"
                checked={item.isOpen}
                onChange={e => updateHour(idx, 'isOpen', e.target.checked)}
                className="h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-[14px] font-bold text-slate-700">{item.day}요일</span>
            </div>

            {item.isOpen ? (
              <div className="flex flex-1 items-center gap-3">
                <Input
                  type="time"
                  value={item.open}
                  onChange={e => updateHour(idx, 'open', e.target.value)}
                  className="h-11 rounded-xl border-none bg-white px-4 text-[15px] shadow-sm"
                />
                <span className="font-bold text-slate-400">~</span>
                <Input
                  type="time"
                  value={item.close}
                  onChange={e => updateHour(idx, 'close', e.target.value)}
                  className="h-11 rounded-xl border-none bg-white px-4 text-[15px] shadow-sm"
                />
              </div>
            ) : (
              <span className="flex-1 px-2 py-3 text-[14px] font-medium text-slate-400">정기 휴무</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
