import { Label } from '@/shared/ui/label';
import { Textarea } from '@/shared/ui/textarea';

interface DepartmentSectionProps {
  departments: string[];
  onChange: (departments: string[]) => void;
}

export function DepartmentSection({ departments, onChange }: DepartmentSectionProps) {
  // 부모가 준 배열을 콤마 텍스트로 보여주기
  const textValue = departments.join(', ');

  // 텍스트를 수정하면 다시 배열로 쪼개서 부모에게 넘기기
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newArray = e.target.value
      .split(',')
      .map(d => d.trim())
      .filter(Boolean);
    onChange(newArray);
  };

  return (
    <div className="flex-1 space-y-3">
      <Label className="text-[15px] font-semibold text-slate-700">진료 과목 (쉼표로 구분)</Label>
      <Textarea value={textValue} onChange={handleChange} placeholder="예: 내과, 소아과, 영유아 검진" className="..." />
    </div>
  );
}
