'use client';
import { Label } from '@/shared/ui/label';
import { Wifi, ParkingCircle, Accessibility, Bath, Check, X } from 'lucide-react';
import { cn } from '@/shared/lib/utils';

export const DEFAULT_FACILITIES = {
  wifi: false,
  '남/녀 화장실 구분': false,
  휠체어: false,
  주차: false,
};

const FACILITY_ICONS = {
  wifi: Wifi,
  '남/녀 화장실 구분': Bath,
  휠체어: Accessibility,
  주차: ParkingCircle,
};

interface FacilitiesSectionProps {
  facilities: typeof DEFAULT_FACILITIES | null;
  onChange: (newFacilities: typeof DEFAULT_FACILITIES) => void;
}
export function FacilitiesSection({ facilities, onChange }: FacilitiesSectionProps) {
  const currentFacilities = facilities || DEFAULT_FACILITIES;

  const toggleFacility = (key: keyof typeof DEFAULT_FACILITIES) => {
    const newFacilities = {
      ...currentFacilities,
      [key]: !currentFacilities[key],
    };
    onChange(newFacilities);
  };

  return (
    <div className="mt-10 space-y-4">
      <div className="flex items-center gap-6">
        <Label className="text-[15px] font-semibold text-slate-700">편의 시설 유무</Label>
        <span className="text-[12px] font-medium text-zinc-400">중복 선택 가능</span>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {(Object.keys(DEFAULT_FACILITIES) as Array<keyof typeof DEFAULT_FACILITIES>).map(key => {
          const Icon = FACILITY_ICONS[key];
          const isSelected = currentFacilities[key];

          return (
            <button
              key={key}
              type="button"
              onClick={() => toggleFacility(key)}
              className={cn(
                'group relative flex flex-col items-center justify-center gap-3 rounded-2xl border py-5 transition-all duration-200',
                isSelected
                  ? 'border-zinc-700 bg-zinc-700 text-white shadow-md shadow-zinc-200'
                  : 'border-zinc-100 bg-white text-zinc-400 hover:border-zinc-200 hover:bg-zinc-50/50'
              )}
            >
              <div
                className={cn(
                  'absolute top-3 right-3 flex h-4 w-4 items-center justify-center rounded-full border transition-all',
                  isSelected ? 'scale-100 border-white bg-white' : 'scale-100 border-zinc-200 bg-zinc-50 opacity-100'
                )}
              >
                {isSelected ? <Check className="h-2.5 w-2.5 stroke-[3px] text-zinc-900" /> : <X className="h-2.5 w-2.5 stroke-[3px] text-zinc-300" />}
              </div>

              <Icon
                className={cn('h-6 w-6 transition-transform group-hover:scale-110', isSelected ? 'text-white' : 'text-zinc-300 group-hover:text-zinc-500')}
              />

              <span className={cn('text-[13px] font-bold tracking-tight transition-colors', isSelected ? 'text-white' : 'text-zinc-500')}>{key}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
