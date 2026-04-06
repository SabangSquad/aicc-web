import { Input } from '@/shared/ui/input';
import { Button } from '@/shared/ui/button';
import { Plus, Trash2 } from 'lucide-react';

interface MenuType {
  name: string;
  price: number;
  description: string;
}

interface MenuSectionProps {
  menus: MenuType[];
  onChange: (newMenus: MenuType[]) => void;
}

export function MenuSection({ menus, onChange }: MenuSectionProps) {
  // 부모가 데이터를 넘겨주지 않았을 경우를 대비한 안전망
  const currentMenus = menus || [];

  // 💡 특정 인덱스의 메뉴 항목을 수정하여 부모에게 전달
  const handleUpdateMenu = (idx: number, field: keyof MenuType, value: any) => {
    const newMenus = [...currentMenus];
    newMenus[idx] = { ...newMenus[idx], [field]: value };
    onChange(newMenus);
  };

  // 💡 새 빈 메뉴를 추가하여 부모에게 전달
  const handleAddMenu = () => {
    onChange([...currentMenus, { name: '', price: 0, description: '' }]);
  };

  // 💡 특정 인덱스의 메뉴를 삭제하여 부모에게 전달
  const handleRemoveMenu = (idx: number) => {
    onChange(currentMenus.filter((_, i) => i !== idx));
  };

  return (
    <div className="flex-1 space-y-4">
      {currentMenus.map((menu, idx) => (
        <div key={idx} className="flex items-start gap-3">
          <Input
            value={menu.name}
            onChange={e => handleUpdateMenu(idx, 'name', e.target.value)}
            placeholder="메뉴명"
            className="h-12 w-1/3 rounded-xl bg-slate-100 px-4"
          />
          <Input
            type="number"
            value={menu.price}
            onChange={e => handleUpdateMenu(idx, 'price', Number(e.target.value))}
            placeholder="가격"
            className="h-12 w-1/4 rounded-xl bg-slate-100 px-4"
          />
          <Input
            value={menu.description}
            onChange={e => handleUpdateMenu(idx, 'description', e.target.value)}
            placeholder="메뉴 설명"
            className="h-12 flex-1 rounded-xl bg-slate-100 px-4"
          />
          <Button variant="ghost" onClick={() => handleRemoveMenu(idx)} className="h-12 px-3 text-red-500">
            <Trash2 className="h-5 w-5" />
          </Button>
        </div>
      ))}
      <Button variant="outline" onClick={handleAddMenu} className="h-12 w-full rounded-xl border-dashed border-slate-300 text-slate-500 hover:text-slate-700">
        <Plus className="mr-2 h-4 w-4" /> 메뉴 추가하기
      </Button>
    </div>
  );
}
