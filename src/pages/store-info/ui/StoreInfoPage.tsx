'use client';

import { useState } from 'react';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Textarea } from '@/shared/ui/textarea';
import { Label } from '@/shared/ui/label';
import { Utensils, Stethoscope, ShoppingBag, Check, Loader2 } from 'lucide-react';

// 업종 타입
type StoreType = 'RESTAURANT' | 'HOSPITAL' | 'ECOMMERCE';

export function StoreInfoPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [storeType, setStoreType] = useState<StoreType>('RESTAURANT');

  // 폼 데이터 상태
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    notice: '',
    description: '',
    menu: '', // 식당 전용
    departments: '', // 병원 전용
  });

  // 요일별 영업시간 상태
  const [weeklyHours, setWeeklyHours] = useState([
    { day: '월', isOpen: true, open: '09:00', close: '21:00' },
    { day: '화', isOpen: true, open: '09:00', close: '21:00' },
    { day: '수', isOpen: true, open: '09:00', close: '21:00' },
    { day: '목', isOpen: true, open: '09:00', close: '21:00' },
    { day: '금', isOpen: true, open: '09:00', close: '21:00' },
    { day: '토', isOpen: false, open: '10:00', close: '18:00' },
    { day: '일', isOpen: false, open: '10:00', close: '18:00' },
  ]);

  // 영업시간 업데이트 함수
  const updateHour = (index: number, field: string, value: any) => {
    const newHours = [...weeklyHours];
    newHours[index] = { ...newHours[index], [field]: value };
    setWeeklyHours(newHours);
  };

  // 평일 일괄 적용 (월요일 -> 화~금)
  const copyToWeekdays = () => {
    const mon = weeklyHours[0];
    const newHours = weeklyHours.map((h, i) => (i > 0 && i < 5 ? { ...h, isOpen: mon.isOpen, open: mon.open, close: mon.close } : h));
    setWeeklyHours(newHours);
  };

  const handleSave = async () => {
    setIsSubmitting(true);
    // 여기서 API 호출 (formData + weeklyHours 전송)
    setTimeout(() => {
      setIsSubmitting(false);
      alert('업장 정보가 성공적으로 업데이트되었습니다.');
    }, 1000);
  };

  // 섹션 헤더 컴포넌트 (내부 재사용)
  const SectionHeader = ({ title, desc }: { title: string; desc: string }) => (
    <div className="shrink-0 xl:w-80">
      <h2 className="text-[22px] font-bold text-slate-900">{title}</h2>
      <p className="mt-2 text-[15px] leading-relaxed font-medium text-slate-500">{desc}</p>
    </div>
  );

  return (
    <div className="relative w-full space-y-16 pb-32">
      {/* 1. 헤더 & 업종 선택 */}
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <h1 className="mb-3 text-3xl font-bold tracking-tight text-slate-900">업장 정보 설정</h1>
          <p className="text-[17px] font-medium text-slate-500">매장 성격에 맞는 상세 정보를 입력해주세요.</p>
        </div>

        <div className="flex rounded-2xl bg-slate-100 p-1.5 shadow-inner">
          {(['RESTAURANT', 'HOSPITAL', 'ECOMMERCE'] as const).map(type => (
            <button
              key={type}
              onClick={() => setStoreType(type)}
              className={`flex items-center gap-2 rounded-xl px-6 py-2.5 text-[14px] font-bold transition-all ${
                storeType === type ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {type === 'RESTAURANT' && <Utensils className="h-4 w-4" />}
              {type === 'HOSPITAL' && <Stethoscope className="h-4 w-4" />}
              {type === 'ECOMMERCE' && <ShoppingBag className="h-4 w-4" />}
              {type === 'RESTAURANT' ? '식당' : type === 'HOSPITAL' ? '병원' : '이커머스'}
            </button>
          ))}
        </div>
      </div>

      <hr className="border-t-2 border-slate-100" />

      {/* 2. 공통 정보 섹션 */}
      <div className="flex flex-col gap-8 xl:flex-row xl:gap-20">
        <SectionHeader title="기본 정보" desc="고객 상담의 기본이 되는 핵심 연락처입니다." />
        <div className="grid flex-1 grid-cols-1 gap-x-10 gap-y-8 lg:grid-cols-2">
          <div className="space-y-3">
            <Label className="text-[15px] font-semibold text-slate-700">업장명</Label>
            <Input
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              placeholder="상호명을 입력하세요"
              className="h-14 rounded-2xl border-transparent bg-slate-100 px-5 transition-all focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-blue-600"
            />
          </div>
          <div className="space-y-3">
            <Label className="text-[15px] font-semibold text-slate-700">대표 연락처</Label>
            <Input
              value={formData.phone}
              type="tel"
              onChange={e => setFormData({ ...formData, phone: e.target.value })}
              placeholder="02-000-0000"
              className="h-14 rounded-2xl border-transparent bg-slate-100 px-5 transition-all focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-blue-600"
            />
          </div>
          <div className="space-y-3">
            <Label className="text-[15px] font-semibold text-slate-700">대표 이메일</Label>
            <Input
              value={formData.email}
              type={'email'}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
              placeholder="example@email.com"
              className="h-14 rounded-2xl border-transparent bg-slate-100 px-5 transition-all focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-blue-600"
            />
          </div>
          <div className="space-y-3">
            <Label className="text-[15px] font-semibold text-slate-700">주소</Label>
            <Input
              value={formData.address}
              onChange={e => setFormData({ ...formData, address: e.target.value })}
              placeholder="주소 검색을 이용하거나 직접 입력하세요"
              className="h-14 rounded-2xl border-transparent bg-slate-100 px-5 transition-all focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-blue-600"
            />
          </div>
          <div className="space-y-3 lg:col-span-2">
            <Label className="text-[15px] font-semibold text-slate-700">실시간 공지</Label>
            <Input
              value={formData.notice}
              onChange={e => setFormData({ ...formData, notice: e.target.value })}
              placeholder="예: 이번 주 금요일은 내부 수리로 인해 임시 휴무입니다."
              className="h-14 rounded-2xl border-blue-100 bg-blue-50/50 px-5 focus-visible:ring-blue-600"
            />
          </div>
        </div>
      </div>

      <hr className="border-t-2 border-slate-100" />

      {/* 3. 업종별 특화 필드 (식당/병원만) */}
      {storeType !== 'ECOMMERCE' && (
        <>
          <div className="flex flex-col gap-8 xl:flex-row xl:gap-20">
            <SectionHeader
              title={storeType === 'RESTAURANT' ? '메뉴 정보' : '진료 정보'}
              desc={storeType === 'RESTAURANT' ? '주요 메뉴를 입력하면 AI가 더 풍부하게 답변합니다.' : '병원의 전문 진료 과목을 입력해주세요.'}
            />
            <div className="flex-1 space-y-3">
              <Label className="text-[15px] font-semibold text-slate-700">{storeType === 'RESTAURANT' ? '대표 메뉴 리스트' : '진료 과목'}</Label>
              <Textarea
                value={storeType === 'RESTAURANT' ? formData.menu : formData.departments}
                onChange={e => setFormData({ ...formData, [storeType === 'RESTAURANT' ? 'menu' : 'departments']: e.target.value })}
                placeholder={storeType === 'RESTAURANT' ? '예: 아메리카노(4.5), 소금빵(3.2)' : '예: 내과, 소아과, 영유아 검진'}
                className="min-h-[120px] resize-none rounded-2xl border-transparent bg-slate-100 p-5 transition-all focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-blue-600"
              />
            </div>
          </div>
          <hr className="border-t-2 border-slate-100" />
        </>
      )}

      {/* 4. 요일별 영업시간 설정 (식당/병원만) */}
      {storeType !== 'ECOMMERCE' && (
        <>
          <div className="flex flex-col gap-8 xl:flex-row xl:gap-20">
            <SectionHeader title="영업 시간" desc="요일별 운영 시간을 상세히 설정할 수 있습니다." />
            <div className="flex-1 space-y-6">
              <div className="flex items-center justify-between px-2">
                <Label className="text-[16px] font-bold text-slate-800">요일별 설정</Label>
                <button
                  onClick={copyToWeekdays}
                  className="rounded-lg bg-blue-50 px-3 py-1.5 text-[13px] font-bold text-blue-600 transition-colors hover:text-blue-800"
                >
                  월요일 시간을 평일 전체에 적용
                </button>
              </div>

              <div className="space-y-3">
                {weeklyHours.map((item, idx) => (
                  <div
                    key={item.day}
                    className={`flex items-center gap-4 rounded-2xl p-4 transition-all ${item.isOpen ? 'bg-slate-100' : 'bg-slate-50 opacity-60'}`}
                  >
                    <div className="flex w-24 items-center gap-3">
                      <input
                        type="checkbox"
                        checked={item.isOpen}
                        onChange={e => updateHour(idx, 'isOpen', e.target.checked)}
                        className="h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-[14px] font-bold text-slate-700">{item.day}요일</span>
                    </div>

                    {item.isOpen ? (
                      <div className="flex flex-1 items-center gap-3">
                        <Input
                          type="time"
                          value={item.open}
                          onChange={e => updateHour(idx, 'open', e.target.value)}
                          className="h-11 rounded-xl border-none bg-white px-4 text-[15px] shadow-sm"
                        />
                        <span className="font-bold text-slate-400">~</span>
                        <Input
                          type="time"
                          value={item.close}
                          onChange={e => updateHour(idx, 'close', e.target.value)}
                          className="h-11 rounded-xl border-none bg-white px-4 text-[15px] shadow-sm"
                        />
                      </div>
                    ) : (
                      <span className="flex-1 px-2 py-3 text-[14px] font-medium text-slate-400">정기 휴무</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      <Button
        onClick={handleSave}
        disabled={isSubmitting}
        className="fixed right-16 bottom-8 z-50 flex h-16 min-w-[160px] items-center justify-center gap-3 rounded-2xl bg-blue-600 text-[16px] font-bold text-white shadow-[0_20px_40px_-10px_rgba(37,99,235,0.3)] transition-all hover:-translate-y-1 hover:bg-blue-700 active:scale-95 disabled:opacity-70"
      >
        {isSubmitting ? <Loader2 className="h-8 w-8 animate-spin" /> : <Check className="h-8 w-8" />}
        <span>{isSubmitting ? '저장 중...' : '설정 완료'}</span>
      </Button>
    </div>
  );
}
