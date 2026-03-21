'use client';

import { useState } from 'react';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Textarea } from '@/shared/ui/textarea';
import { Label } from '@/shared/ui/label';
import { CheckCircle2 } from 'lucide-react';

export function StoreInfoPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '맛있는 베이커리',
    category: '베이커리/카페',
    phone: '02-1234-5678',
    address: '서울시 강남구 테헤란로 123',
    hours: '매일 09:00 - 21:00 (라스트오더 20:30)',
    description:
      '매일 아침 직접 구운 신선한 빵과 스페셜티 커피를 제공하는 동네 맛집입니다. 건강한 재료만을 사용하여 아이들도 안심하고 먹을 수 있는 빵을 만듭니다.',
  });

  const handleSave = async () => {
    setIsSubmitting(true);
    // API 호출 시뮬레이션
    setTimeout(() => {
      setIsSubmitting(false);
      alert('업장 정보가 성공적으로 저장되었습니다.');
    }, 1000);
  };

  return (
    <div className="w-full space-y-16">
      {/* 헤더 섹션 */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-3">업장 기본 정보</h1>
        <p className="text-[17px] font-medium text-slate-500">고객과 AI 상담사가 참고할 매장의 핵심 정보를 관리합니다.</p>
      </div>

      <hr className="border-t-2 border-slate-100" />

      {/* 기본 정보 섹션 */}
      <div className="flex flex-col xl:flex-row gap-8 xl:gap-20">
        <div className="xl:w-80 shrink-0">
          <h2 className="text-[22px] font-bold text-slate-900">매장 프로필</h2>
          <p className="text-[15px] font-medium text-slate-500 mt-2 leading-relaxed">매장의 이름과 업종 등 가장 기본적인 정보를 설정합니다.</p>
        </div>

        {/* 화면이 넓어지면(lg 이상) 2단 그리드로 배치 */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-8">
          <div className="space-y-3">
            <Label htmlFor="name" className="text-[15px] font-semibold text-slate-700">
              매장명
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              className="h-14 bg-slate-100 border-transparent rounded-2xl px-5 text-[17px] text-slate-900 focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:border-transparent transition-all shadow-none"
            />
          </div>

          <div className="space-y-3">
            <Label htmlFor="category" className="text-[15px] font-semibold text-slate-700">
              업종
            </Label>
            <Input
              id="category"
              value={formData.category}
              onChange={e => setFormData({ ...formData, category: e.target.value })}
              className="h-14 bg-slate-100 border-transparent rounded-2xl px-5 text-[17px] text-slate-900 focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:border-transparent transition-all shadow-none"
            />
          </div>
        </div>
      </div>

      <hr className="border-t-2 border-slate-100" />

      {/* 연락처 및 위치 섹션 */}
      <div className="flex flex-col xl:flex-row gap-8 xl:gap-20">
        <div className="xl:w-80 shrink-0">
          <h2 className="text-[22px] font-bold text-slate-900">연락처 및 위치</h2>
          <p className="text-[15px] font-medium text-slate-500 mt-2 leading-relaxed">고객이 찾아오거나 문의할 수 있는 정보를 입력합니다.</p>
        </div>

        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-8">
          <div className="space-y-3">
            <Label htmlFor="phone" className="text-[15px] font-semibold text-slate-700">
              대표 전화번호
            </Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={e => setFormData({ ...formData, phone: e.target.value })}
              className="h-14 bg-slate-100 border-transparent rounded-2xl px-5 text-[17px] text-slate-900 focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:border-transparent transition-all shadow-none"
            />
          </div>

          <div className="space-y-3">
            <Label htmlFor="hours" className="text-[15px] font-semibold text-slate-700">
              영업 시간
            </Label>
            <Input
              id="hours"
              value={formData.hours}
              onChange={e => setFormData({ ...formData, hours: e.target.value })}
              className="h-14 bg-slate-100 border-transparent rounded-2xl px-5 text-[17px] text-slate-900 focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:border-transparent transition-all shadow-none"
            />
          </div>

          {/* 주소는 길어질 수 있으므로 전체 너비(col-span-1 lg:col-span-2) 사용 */}
          <div className="space-y-3 lg:col-span-2">
            <Label htmlFor="address" className="text-[15px] font-semibold text-slate-700">
              매장 주소
            </Label>
            <Input
              id="address"
              value={formData.address}
              onChange={e => setFormData({ ...formData, address: e.target.value })}
              className="h-14 bg-slate-100 border-transparent rounded-2xl px-5 text-[17px] text-slate-900 focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:border-transparent transition-all shadow-none w-full"
            />
          </div>
        </div>
      </div>

      <hr className="border-t-2 border-slate-100" />

      {/* 상세 설명 섹션 */}
      <div className="flex flex-col xl:flex-row gap-8 xl:gap-20">
        <div className="xl:w-80 shrink-0">
          <h2 className="text-[22px] font-bold text-slate-900">매장 소개</h2>
          <p className="text-[15px] font-medium text-slate-500 mt-2 leading-relaxed">AI 상담사가 고객에게 매장을 소개할 때 사용하는 문구입니다.</p>
        </div>

        <div className="flex-1 space-y-4">
          <div className="space-y-3">
            <Label htmlFor="description" className="text-[15px] font-semibold text-slate-700">
              상세 설명
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              className="min-h-[160px] bg-slate-100 border-transparent rounded-2xl p-5 text-[17px] text-slate-900 leading-relaxed focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:border-transparent transition-all shadow-none resize-none w-full"
            />
          </div>

          <div className="flex items-start gap-3 mt-2 p-5 bg-blue-50/50 rounded-2xl w-full">
            <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
            <p className="text-[14px] font-medium text-slate-600 leading-relaxed">
              <strong className="text-blue-600 mr-1">Tip.</strong>
              매장의 특징이나 주차 정보, 시그니처 메뉴 등을 상세히 적어주시면 AI가 더 풍부하게 응대할 수 있습니다.
            </p>
          </div>
        </div>
      </div>

      {/* 하단 저장 영역 */}
      <div className="pt-8 flex flex-col-reverse sm:flex-row justify-between items-center gap-6">
        <p className="text-[14px] font-medium text-slate-400">마지막 업데이트: 2024년 2월 13일</p>
        <Button
          onClick={handleSave}
          disabled={isSubmitting}
          className="w-full sm:w-auto h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl px-10 text-[17px] font-bold transition-all shadow-none"
        >
          {isSubmitting ? '저장 중...' : '저장하기'}
        </Button>
      </div>
    </div>
  );
}
