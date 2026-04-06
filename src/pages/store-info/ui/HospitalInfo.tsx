'use client';
import { useState, KeyboardEvent } from 'react';
import { X, Plus } from 'lucide-react';
import { cn } from '@/shared/lib/utils';

const RECOMMENDATIONS = ['내과', '이비인후과', '소아청소년과', '피부과', '정형외과', '치과', '안과', '비뇨의학과'];

interface DepartmentSectionProps {
  departments: string[];
  onChange: (departments: string[]) => void;
}
export function DepartmentSection({ departments, onChange }: DepartmentSectionProps) {
  const [inputValue, setInputValue] = useState('');

  const addDepartment = (dept: string) => {
    const trimmed = dept.trim();
    if (trimmed && !departments.includes(trimmed)) {
      onChange([...departments, trimmed]);
      setInputValue('');
    }
  };

  const removeDepartment = (target: string) => {
    onChange(departments.filter(d => d !== target));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addDepartment(inputValue);
    } else if (e.key === 'Backspace' && !inputValue && departments.length > 0) {
      removeDepartment(departments[departments.length - 1]);
    }
  };

  return (
    <div className="w-full space-y-2">
      <p className="text-[13px] font-medium text-zinc-400">병원에서 진료하는 과목들을 추가해 주세요. (Enter로 추가)</p>
      <div className="group relative flex flex-wrap gap-2 rounded-xl border border-zinc-200 bg-white px-5 py-3 shadow-sm transition-all focus-within:border-zinc-900 focus-within:ring-1 focus-within:ring-zinc-900">
        {departments.map(dept => (
          <div
            key={dept}
            className="animate-in fade-in zoom-in flex items-center gap-1.5 rounded-xl bg-zinc-900 px-3 py-1.5 text-[13px] font-bold text-white transition-all duration-200"
          >
            {dept}
            <button type="button" onClick={() => removeDepartment(dept)} className="rounded-full p-0.5 transition-colors hover:bg-white/20">
              <X size={12} strokeWidth={3} />
            </button>
          </div>
        ))}

        <input
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={departments.length === 0 ? '예: 내과, 피부과...' : ''}
          className="min-w-[120px] flex-1 bg-transparent text-[14px] font-medium text-zinc-900 outline-none placeholder:text-zinc-300"
        />

        {inputValue && (
          <button
            type="button"
            onClick={() => addDepartment(inputValue)}
            className="absolute top-1/2 right-3 -translate-y-1/2 rounded-lg bg-zinc-100 p-1 text-zinc-600 transition-all hover:bg-zinc-900 hover:text-white"
          >
            <Plus size={16} />
          </button>
        )}
      </div>

      <div className="space-y-3">
        <h4 className="text-[14px] text-zinc-500">추천 과목</h4>
        <div className="flex flex-wrap gap-2">
          {RECOMMENDATIONS.map(rec => {
            const isSelected = departments.includes(rec);
            return (
              <button
                key={rec}
                type="button"
                disabled={isSelected}
                onClick={() => addDepartment(rec)}
                className={cn(
                  'cursor-pointer rounded-xl border px-3 py-1.5 text-[13px] font-bold transition-all active:scale-95',
                  isSelected
                    ? 'cursor-not-allowed border-zinc-100 bg-zinc-50 text-zinc-200'
                    : 'border-zinc-100 bg-white text-zinc-500 hover:border-zinc-900 hover:text-zinc-900 hover:shadow-md'
                )}
              >
                {rec}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
