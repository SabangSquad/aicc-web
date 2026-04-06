import { Utensils, Stethoscope, ShoppingBag } from 'lucide-react';

type CategoryType = '식당' | '병원' | '이커머스';

interface CategorySelectorProps {
  category: CategoryType;
  onChange: (newCategory: CategoryType, newStoreItems: any) => void;
}
export function CategorySelector({ category, onChange }: CategorySelectorProps) {
  const handleCategoryChange = (newCategory: CategoryType) => {
    const newItems = newCategory === '식당' ? { menu: [] } : newCategory === '병원' ? { department: [] } : {};
    onChange(newCategory, newItems);
  };

  return (
    <div className="flex rounded-2xl bg-slate-100 p-1.5 shadow-inner">
      {(['식당', '병원', '이커머스'] as const).map(type => (
        <button
          key={type}
          onClick={() => handleCategoryChange(type)}
          className={`flex items-center gap-2 rounded-xl px-6 py-2.5 text-[14px] font-bold transition-all ${
            category === type ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          {type === '식당' && <Utensils className="h-4 w-4" />}
          {type === '병원' && <Stethoscope className="h-4 w-4" />}
          {type === '이커머스' && <ShoppingBag className="h-4 w-4" />}
          {type}
        </button>
      ))}
    </div>
  );
}
