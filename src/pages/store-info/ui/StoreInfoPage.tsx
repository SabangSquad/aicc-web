'use client';
import { useState } from 'react';
import { Button } from '@/shared/ui/button';
import { Check, Loader2 } from 'lucide-react';
import { useStoreInformation, useStoreAction, StoreType } from '@/entities/store/';

import { BasicInfoSection } from './BasicSection';
import { FacilitiesSection } from './FacilitiesSection';
import { MenuSection } from './RestaurantInfo';
import { DepartmentSection } from './HospitalInfo';
import { BusinessHoursSection } from './BusinessHoursSection';
import { CategorySelector } from './CategorySelector';
import { toast } from 'sonner';

const SectionHeader = ({ title, desc }: { title: string; desc: string }) => (
  <div className="shrink-0 xl:w-80">
    <h2 className="text-[22px] font-bold text-slate-900">{title}</h2>
    <p className="mt-2 text-[15px] leading-relaxed font-medium text-slate-500">{desc}</p>
  </div>
);

export function StoreInfoPage() {
  const { data: initialData } = useStoreInformation(2);
  const { editMutation } = useStoreAction(2);

  const [formData, setFormData] = useState<StoreType>(initialData);

  const handleSave = async () => {
    try {
      await editMutation.mutateAsync({ store_id: 2, data: formData });
      toast.success('업장 정보가 성공적으로 업데이트되었습니다.');
    } catch {
      toast.error('업장 정보 업데이트에 실패했습니다.');
    }
  };

  return (
    <div className="relative w-full space-y-16 pb-32">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <h1 className="mb-3 text-3xl font-bold tracking-tight text-slate-900">업장 정보 설정</h1>
          <p className="text-[17px] font-medium text-slate-500">매장 성격에 맞는 상세 정보를 입력해주세요.</p>
        </div>

        <CategorySelector
          category={formData.category}
          onChange={(newCategory, newItems) => setFormData({ ...formData, category: newCategory, store_items: newItems } as StoreType)}
        />
      </div>

      <hr className="border-t-2 border-slate-100" />

      <div className="flex flex-col gap-8 xl:flex-row xl:gap-20">
        <SectionHeader title="기본 정보" desc="고객 상담의 기본이 되는 핵심 연락처입니다." />
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
              title={formData.category === '식당' ? '메뉴 정보' : '진료 정보'}
              desc={formData.category === '식당' ? '상세 메뉴를 입력하면 AI가 더 정확하게 답변합니다.' : '병원의 전문 진료 과목을 입력해주세요.'}
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

          {/* 영업시간 */}
          <div className="flex flex-col gap-8 xl:flex-row xl:gap-20">
            <SectionHeader title="영업 시간" desc="요일별 운영 시간을 상세히 설정할 수 있습니다." />
            <BusinessHoursSection hours={formData.business_hours} onChange={newHours => setFormData({ ...formData, business_hours: newHours })} />
          </div>
        </>
      )}

      <Button
        onClick={handleSave}
        disabled={editMutation.isPending}
        className="fixed right-16 bottom-8 z-50 flex h-16 min-w-[160px] items-center justify-center gap-3 rounded-2xl bg-blue-600 text-[16px] font-bold text-white shadow-[0_20px_40px_-10px_rgba(37,99,235,0.3)] transition-all hover:-translate-y-1 hover:bg-blue-700 active:scale-95 disabled:opacity-70"
      >
        {editMutation.isPending ? <Loader2 className="h-8 w-8 animate-spin" /> : <Check className="h-8 w-8" />}
        <span>{editMutation.isPending ? '저장 중...' : '설정 완료'}</span>
      </Button>
    </div>
  );
}
