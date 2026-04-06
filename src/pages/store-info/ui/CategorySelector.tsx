'use client';
import { Utensils, Stethoscope, ShoppingBag, Check, X } from 'lucide-react';
import { cn } from '@/shared/lib/utils';

type CategoryType = '식당' | '병원' | '이커머스';

interface CategorySelectorProps {
  category: CategoryType;
  onChange: (newCategory: CategoryType, newStoreItems: any) => void;
}

const CATEGORY_MAP = [
  {
    key: '식당',
    label: '식당·카페',
    description: '메뉴 및 시설 설정',
    icon: Utensils,
    items: { menu: [] },
  },
  {
    key: '병원',
    label: '병원·의료',
    description: '진료 과목 및 부서 설정',
    icon: Stethoscope,
    items: { department: [] },
  },
  {
    key: '이커머스',
    label: '이커머스',
    description: '상품 및 판매 설정',
    icon: ShoppingBag,
    items: {},
  },
] as const;

export function CategorySelector({ category, onChange }: CategorySelectorProps) {
  return (
    <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-3">
      {CATEGORY_MAP.map(item => {
        const Icon = item.icon;
        const isSelected = category === item.key;

        return (
          <button
            key={item.key}
            type="button"
            onClick={() => onChange(item.key, item.items)}
            className={cn(
              'group relative flex flex-col items-center justify-center gap-4 rounded-[2rem] border p-8 transition-all duration-300',
              isSelected
                ? 'border-zinc-700 bg-zinc-700 text-white shadow-xl shadow-zinc-200'
                : 'border-zinc-100 bg-white text-zinc-400 hover:border-zinc-200 hover:bg-zinc-50/50'
            )}
          >
            <div
              className={cn(
                'absolute top-6 right-6 flex h-5 w-5 items-center justify-center rounded-full border transition-all',
                isSelected ? 'scale-100 border-white bg-white' : 'scale-100 border-zinc-200 bg-zinc-50 opacity-100'
              )}
            >
              {isSelected ? <Check className="h-3 w-3 stroke-[3px] text-zinc-900" /> : <X className="h-3 w-3 stroke-[3px] text-zinc-300" />}
            </div>

            {/* 메인 아이콘: 크기를 키워 벤또 느낌 강조 */}
            <div
              className={cn(
                'flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-500 group-hover:scale-110',
                isSelected ? 'bg-zinc-700 text-white' : 'bg-zinc-50 text-zinc-300 group-hover:text-zinc-900'
              )}
            >
              <Icon className="h-7 w-7 stroke-[1.5px]" />
            </div>

            {/* 텍스트 정보 */}
            <div className="space-y-1.5 text-center">
              <h3 className={cn('text-[18px] font-bold tracking-tight transition-colors', isSelected ? 'text-white' : 'text-zinc-900')}>{item.label}</h3>
              <p className={cn('text-[13px] leading-tight font-medium transition-colors', isSelected ? 'text-zinc-500' : 'text-zinc-400')}>
                {item.description}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
}
