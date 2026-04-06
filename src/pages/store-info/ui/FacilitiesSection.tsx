import { Label } from '@/shared/ui/label';

export const DEFAULT_FACILITIES = {
  wifi: false,
  '남/녀 화장실 구분': false,
  휠체어: false,
  주차: false,
};

interface FacilitiesSectionProps {
  facilities: typeof DEFAULT_FACILITIES | null;
  onChange: (newFacilities: typeof DEFAULT_FACILITIES) => void;
}

export function FacilitiesSection({ facilities, onChange }: FacilitiesSectionProps) {
  // 부모가 null을 주더라도 자식 내부에서 안전하게 기본값으로 처리
  const currentFacilities = facilities || DEFAULT_FACILITIES;

  // 💡 클릭 시 내부에서 값을 반전시킨 뒤, 부모의 onChange를 호출해 결과물만 전달
  const toggleFacility = (key: keyof typeof DEFAULT_FACILITIES) => {
    const newFacilities = {
      ...currentFacilities,
      [key]: !currentFacilities[key],
    };
    onChange(newFacilities);
  };

  return (
    <div className="mt-8 space-y-3 lg:col-span-2">
      <Label className="text-[15px] font-semibold text-slate-700">편의 시설</Label>
      <div className="flex gap-4">
        {(Object.keys(DEFAULT_FACILITIES) as Array<keyof typeof DEFAULT_FACILITIES>).map(key => (
          <button
            key={key}
            onClick={() => toggleFacility(key)}
            className={`rounded-xl px-4 py-2 text-sm font-semibold transition-colors ${
              currentFacilities[key] ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
            }`}
          >
            {key}
          </button>
        ))}
      </div>
    </div>
  );
}
