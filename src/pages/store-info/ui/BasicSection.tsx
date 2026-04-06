import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';

interface BasicInfoSectionProps {
  formData: any;
  setFormData: (data: any) => void;
}
export function BasicInfoSection({ formData, setFormData }: BasicInfoSectionProps) {
  return (
    <div className="grid flex-1 grid-cols-1 gap-x-10 gap-y-8 lg:grid-cols-2">
      <div className="space-y-3">
        <Label className="text-[15px] font-semibold text-slate-700">업장명</Label>
        <Input
          value={formData.name || ''}
          onChange={e => setFormData({ ...formData, name: e.target.value })}
          placeholder="상호명을 입력하세요"
          className="h-14 rounded-2xl border-transparent bg-slate-100 px-5 focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-blue-600"
        />
      </div>
      <div className="space-y-3">
        <Label className="text-[15px] font-semibold text-slate-700">대표 연락처</Label>
        <Input
          value={formData.phone || ''}
          type="tel"
          onChange={e => setFormData({ ...formData, phone: e.target.value })}
          placeholder="02-000-0000"
          className="h-14 rounded-2xl border-transparent bg-slate-100 px-5 focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-blue-600"
        />
      </div>
      <div className="space-y-3">
        <Label className="text-[15px] font-semibold text-slate-700">대표 이메일</Label>
        <Input
          value={formData.email || ''}
          type="email"
          onChange={e => setFormData({ ...formData, email: e.target.value })}
          placeholder="example@email.com"
          className="h-14 rounded-2xl border-transparent bg-slate-100 px-5 focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-blue-600"
        />
      </div>
      <div className="space-y-3">
        <Label className="text-[15px] font-semibold text-slate-700">주소</Label>
        <Input
          value={formData.address || ''}
          onChange={e => setFormData({ ...formData, address: e.target.value })}
          placeholder="주소 검색을 이용하거나 직접 입력하세요"
          className="h-14 rounded-2xl border-transparent bg-slate-100 px-5 focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-blue-600"
        />
      </div>
      <div className="space-y-3 lg:col-span-2">
        <Label className="text-[15px] font-semibold text-slate-700">실시간 공지</Label>
        <Input
          value={formData.notice || ''}
          onChange={e => setFormData({ ...formData, notice: e.target.value })}
          placeholder="예: 이번 주 금요일은 내부 수리로 인해 임시 휴무입니다."
          className="h-14 rounded-2xl border-blue-100 bg-blue-50/50 px-5 focus-visible:ring-blue-600"
        />
      </div>
    </div>
  );
}
