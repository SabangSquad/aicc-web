import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';

export function FormSection({ title, desc, children }: { title: string; desc: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-8 xl:flex-row xl:gap-20">
      <div className="shrink-0 xl:w-80">
        <h2 className="text-[22px] font-bold text-slate-900">{title}</h2>
        <p className="mt-2 text-[15px] leading-relaxed font-medium text-slate-500">{desc}</p>
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
}

interface CommonProps {
  data: any;
  onChange: (field: string, value: string) => void;
}

export function CommonFields({ data, onChange }: CommonProps) {
  return (
    <FormSection title="기본 정보" desc="업장의 핵심 연락처와 공지사항을 관리합니다.">
      <div className="grid grid-cols-1 gap-x-10 gap-y-8 lg:grid-cols-2">
        <div className="space-y-3">
          <Label className="text-[15px] font-semibold text-slate-700">업장명</Label>
          <Input value={data.name} onChange={e => onChange('name', e.target.value)} className="h-14 rounded-2xl border-transparent bg-slate-100 px-5" />
        </div>
        <div className="space-y-3">
          <Label className="text-[15px] font-semibold text-slate-700">대표 연락처</Label>
          <Input value={data.phone} onChange={e => onChange('phone', e.target.value)} className="h-14 rounded-2xl border-transparent bg-slate-100 px-5" />
        </div>
        <div className="space-y-3">
          <Label className="text-[15px] font-semibold text-slate-700">이메일</Label>
          <Input value={data.email} onChange={e => onChange('email', e.target.value)} className="h-14 rounded-2xl border-transparent bg-slate-100 px-5" />
        </div>
        <div className="space-y-3">
          <Label className="text-[15px] font-semibold text-slate-700">최근 공지</Label>
          <Input
            value={data.notice}
            onChange={e => onChange('notice', e.target.value)}
            placeholder="공지사항을 입력하세요"
            className="h-14 rounded-2xl border-blue-100 bg-blue-50/50 px-5 focus-visible:ring-blue-500"
          />
        </div>
        <div className="space-y-3 lg:col-span-2">
          <Label className="text-[15px] font-semibold text-slate-700">주소</Label>
          <Input
            value={data.address}
            onChange={e => onChange('address', e.target.value)}
            className="h-14 w-full rounded-2xl border-transparent bg-slate-100 px-5"
          />
        </div>
      </div>
    </FormSection>
  );
}
