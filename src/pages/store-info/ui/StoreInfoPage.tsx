'use client';
import { useState } from 'react';
import { Button } from '@/shared/ui/button';
import { Check, Loader2 } from 'lucide-react';
import { useStoreInformation, useStoreAction, StoreType } from '@/entities/store';

import { BasicInfoSection } from './BasicSection';
import { FacilitiesSection } from './FacilitiesSection';
import { MenuSection } from './RestaurantInfo';
import { DepartmentSection } from './HospitalInfo';
import { BusinessHoursSection } from './BusinessHoursSection';
import { CategorySelector } from './CategorySelector';
import { toast } from 'sonner';
import { useAuth } from '@/entities/auth';

const SectionHeader = ({ title, desc }: { title: string; desc: string }) => (
  <div className="shrink-0 xl:w-80">
    <h2 className="text-[22px] font-bold text-slate-900">{title}</h2>
    <p className="mt-2 text-[15px] leading-relaxed font-medium whitespace-pre-wrap text-slate-500">{desc}</p>
  </div>
);
export function StoreInfoPage() {
  const { data: authData } = useAuth();
  const { data: initialData } = useStoreInformation(authData.user.store_id);
  const { editMutation } = useStoreAction(authData.user.store_id);

  const [formData, setFormData] = useState<StoreType>(initialData);

  const handleSave = async () => {
    try {
      const { store_id, _links, category, ...rest } = formData;
      await editMutation.mutateAsync({ store_id: authData.user.store_id, data: rest });
      toast.success('업장 정보가 성공적으로 업데이트되었습니다.');
    } catch {
      toast.error('업장 정보 업데이트에 실패했습니다.');
    }
  };

  return (
    <div className="relative w-full space-y-16 pb-32">
      <div>
        <h1 className="mb-3 text-3xl font-bold tracking-tight text-slate-900">업장 정보 설정</h1>
        <p className="text-[17px] font-medium text-slate-500">매장 정보를 관리합니다. 꼼꼼히 작성할수록 AI 상담원이 고객에게 더 똑똑하게 답변할 수 있습니다.</p>
      </div>

      <div className="flex flex-col gap-8 xl:flex-row xl:gap-20">
        <SectionHeader title="업종 설정" desc="운영 중인 매장의 성격을 선택해 주세요." />
        <div className="flex-1">
          <CategorySelector
            category={formData.category}
            onChange={(newCategory, newItems) => setFormData({ ...formData, category: newCategory, store_items: newItems } as StoreType)}
          />
        </div>
      </div>

      <hr className="border-t-2 border-slate-100" />

      <div className="flex flex-col gap-8 xl:flex-row xl:gap-20">
        <SectionHeader title="기본 정보" desc={`업장의 기본적인 정보를 입력해주세요. \nAI 답변에 활용됩니다.`} />
        <div className="flex-1">
          <BasicInfoSection formData={formData} setFormData={setFormData} />
          {formData.category !== '이커머스' && (
            <FacilitiesSection facilities={formData.facilities} onChange={newFac => setFormData({ ...formData, facilities: newFac })} />
          )}
        </div>
      </div>

      {formData.category !== '이커머스' && (
        <>
          <hr className="border-t-2 border-slate-100" />

          <div className="flex flex-col gap-8 xl:flex-row xl:gap-20">
            <SectionHeader
              title={formData.category === '식당' ? '메뉴 정보' : '진료 과목'}
              desc={
                formData.category === '식당'
                  ? `판매 중인 메뉴를 알려주세요. \nAI가 꼼꼼하게 확인해 답변합니다.`
                  : `병원에서 진료하는 과목을 추가해주세요. \n환자들이 궁금해하는 진료 범위를 명확히 답변할 수 있습니다.`
              }
            />
            {formData.category === '식당' ? (
              <MenuSection menus={formData.store_items?.menu} onChange={newMenu => setFormData({ ...formData, store_items: { menu: newMenu } })} />
            ) : (
              <DepartmentSection
                departments={formData.store_items?.department}
                onChange={newDept => setFormData({ ...formData, store_items: { department: newDept } })}
              />
            )}
          </div>

          <hr className="border-t-2 border-slate-100" />

          <div className="flex flex-col gap-8 xl:flex-row xl:gap-20">
            <SectionHeader title="영업 시간" desc={`요일별 운영 시간을 설정해주세요.\nAI가 매장 운영 상황을 이해하는 데 도움이 됩니다.`} />
            <BusinessHoursSection hours={formData.business_hours} onChange={newHours => setFormData({ ...formData, business_hours: newHours })} />
          </div>
        </>
      )}

      <Button
        onClick={handleSave}
        disabled={editMutation.isPending}
        className="fixed right-24 bottom-8 z-50 flex h-16 min-w-[160px] animate-bounce cursor-pointer items-center justify-center gap-3 rounded-xl bg-zinc-800 text-[18px] font-bold text-white transition-all hover:-translate-y-1 hover:bg-zinc-400 active:scale-95 disabled:opacity-70"
      >
        {editMutation.isPending ? <Loader2 className="h-8 w-8 animate-spin" /> : <Check className="h-8 w-8" />}
        <span>{editMutation.isPending ? '저장 중...' : '설정 완료'}</span>
      </Button>
    </div>
  );
}
