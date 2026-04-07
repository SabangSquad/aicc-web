'use client';

import { useState, useRef, useEffect } from 'react';
import { CATEGORY_GROUPS } from '@/shared/constant/category';
import { StoreType } from '@/entities/store';
import { ChevronDown, Check } from 'lucide-react';

interface CategorySelectorProps {
  value: string;
  onChange: (value: string) => void;
  storeCategory: StoreType['category'];
  className?: string;
}

export function CategorySelector({ value, onChange, storeCategory, className = '' }: CategorySelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // 현재 업종에 맞는 카테고리 목록 추출
  const categories = CATEGORY_GROUPS[storeCategory as keyof typeof CATEGORY_GROUPS] || [];

  // 외부 클릭 시 닫기 로직
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (category: string) => {
    onChange(category);
    setIsOpen(false);
  };

  return (
    <div className={`relative w-full ${className}`} ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex h-12 w-full cursor-pointer items-center justify-between rounded-xl border border-zinc-200 bg-zinc-50 px-4 text-[15px] font-medium transition-all focus:ring-2 focus:ring-zinc-500/20 focus:outline-none ${
          isOpen ? 'border-zinc-500 bg-white ring-2 ring-zinc-500/10' : 'hover:border-zinc-300'
        }`}
      >
        <span className={value ? 'text-zinc-900' : 'text-zinc-400'}>{value || '카테고리를 선택하세요'}</span>
        <ChevronDown className={`h-4 w-4 text-zinc-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="animate-in fade-in zoom-in-95 absolute z-50 mt-2 w-full overflow-hidden rounded-xl border border-zinc-100 bg-white shadow-xl duration-150">
          <div className="max-h-[300px] overflow-y-auto p-1.5">
            {categories.length > 0 ? (
              categories.map(category => {
                const isSelected = value === category;
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => handleSelect(category)}
                    className={`flex w-full cursor-pointer items-center justify-between rounded-lg px-3 py-2.5 text-left text-[14px] font-medium transition-colors ${
                      isSelected ? 'bg-zinc-100 text-zinc-900' : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900'
                    }`}
                  >
                    {category}
                    {isSelected && <Check className="h-4 w-4 text-zinc-900" />}
                  </button>
                );
              })
            ) : (
              <div className="px-3 py-4 text-center text-[13px] text-zinc-400">등록된 카테고리가 없습니다.</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
