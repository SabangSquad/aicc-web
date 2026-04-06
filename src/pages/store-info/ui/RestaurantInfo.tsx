'use client';
import { Plus, Trash2 } from 'lucide-react';
import { RestaurantItems } from '@/entities/store';

interface MenuSectionProps {
  menus: RestaurantItems['menu'];
  onChange: (newMenus: RestaurantItems['menu']) => void;
}

export function MenuSection({ menus, onChange }: MenuSectionProps) {
  const currentMenus = menus || [];

  const handleUpdateMenu = (idx: number, field: keyof RestaurantItems['menu'][0], value: any) => {
    const newMenus = [...currentMenus];
    newMenus[idx] = { ...newMenus[idx], [field]: value };
    onChange(newMenus);
  };

  const handleAddMenu = () => {
    onChange([...currentMenus, { name: '', price: 0, description: '' }]);
  };

  const handleRemoveMenu = (idx: number) => {
    onChange(currentMenus.filter((_, i) => i !== idx));
  };

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-start px-2">
        <p className="text-[16px] font-bold text-zinc-400 uppercase">총 {currentMenus.length} 메뉴</p>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {currentMenus.map((menu, idx) => (
          <div
            key={idx}
            className="group relative flex min-h-[160px] flex-col justify-between rounded-lg border border-zinc-200 bg-white p-5 transition-all hover:border-zinc-900 hover:shadow-xl"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <input
                  value={menu.name}
                  onChange={e => handleUpdateMenu(idx, 'name', e.target.value)}
                  placeholder="메뉴 이름"
                  className="w-full bg-transparent text-[18px] font-semibold text-zinc-900 outline-none placeholder:text-zinc-300"
                />
                <button type="button" onClick={() => handleRemoveMenu(idx)} className="shrink-0 text-zinc-300 transition-colors hover:text-rose-500">
                  <Trash2 size={16} />
                </button>
              </div>

              <textarea
                value={menu.description}
                onChange={e => handleUpdateMenu(idx, 'description', e.target.value)}
                placeholder="메뉴에 대한 간단한 설명..."
                rows={2}
                className="w-full resize-none bg-transparent text-[14px] leading-snug font-medium text-zinc-600 outline-none placeholder:text-zinc-300"
              />

              <div className="flex items-center gap-2 rounded-xl border border-zinc-100 bg-zinc-50 px-3 py-2 transition-all focus-within:border-zinc-300">
                <input
                  type="number"
                  value={menu.price || ''}
                  onChange={e => handleUpdateMenu(idx, 'price', Number(e.target.value))}
                  placeholder="가격을 입력하세요"
                  className="w-full bg-transparent text-[14px] text-zinc-900 outline-none placeholder:text-zinc-300"
                />
                <span className="text-[16px] font-bold text-zinc-600">원</span>
              </div>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={handleAddMenu}
          className="flex min-h-[160px] cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-zinc-300 bg-zinc-50/30 text-zinc-400 transition-all hover:border-zinc-600 hover:text-zinc-600"
        >
          <Plus size={20} strokeWidth={3} />
          <span className="text-[13px] font-black">메뉴 추가</span>
        </button>
      </div>
    </div>
  );
}
