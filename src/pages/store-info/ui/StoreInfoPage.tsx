'use client';

import { useState } from 'react';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Textarea } from '@/shared/ui/textarea';
import { Label } from '@/shared/ui/label';
import { Separator } from '@/shared/ui/separator';
import { Store, MapPin, Phone, Clock, Info, Save, CheckCircle2, Building2 } from 'lucide-react';

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
    <div className="space-y-10 pb-20">
      {/* 헤더 섹션 */}
      <div className="flex flex-col gap-3">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 flex items-center gap-3">업장 기본 정보 관리</h1>
        <p className="text-slate-500 text-lg">고객과 AI 상담사가 참고할 매장의 핵심 정보를 관리합니다.</p>
      </div>

      <Separator />

      {/* 기본 정보 섹션 */}
      <div className="flex gap-12">
        <div className="w-64 shrink-0">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Building2 className="w-5 h-5 text-primary" />
            매장 프로필
          </h2>
          <p className="text-sm text-slate-500 mt-2">매장의 이름과 업종 등 가장 기본적인 정보를 설정합니다.</p>
        </div>

        <div className="flex-1 grid grid-cols-2 gap-x-8 gap-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-slate-600 font-medium">
              매장명
            </Label>
            <div className="relative">
              <Store className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <Input
                id="name"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="pl-10 h-11 focus-visible:ring-primary"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category" className="text-slate-600 font-medium">
              업종
            </Label>
            <div className="relative">
              <Info className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <Input
                id="category"
                value={formData.category}
                onChange={e => setFormData({ ...formData, category: e.target.value })}
                className="pl-10 h-11 focus-visible:ring-primary"
              />
            </div>
          </div>
        </div>
      </div>

      <Separator />

      {/* 연락처 및 위치 섹션 */}
      <div className="flex gap-12">
        <div className="w-64 shrink-0">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            연락처 및 위치
          </h2>
          <p className="text-sm text-slate-500 mt-2">고객이 찾아오거나 문의할 수 있는 정보를 입력합니다.</p>
        </div>

        <div className="flex-1 space-y-6">
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-slate-600 font-medium">
                대표 전화번호
              </Label>
              <div className="relative">
                <Phone className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  className="pl-10 h-11 focus-visible:ring-primary"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="hours" className="text-slate-600 font-medium">
                영업 시간
              </Label>
              <div className="relative">
                <Clock className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <Input
                  id="hours"
                  value={formData.hours}
                  onChange={e => setFormData({ ...formData, hours: e.target.value })}
                  className="pl-10 h-11 focus-visible:ring-primary"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address" className="text-slate-600 font-medium">
              매장 주소
            </Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <Input
                id="address"
                value={formData.address}
                onChange={e => setFormData({ ...formData, address: e.target.value })}
                className="pl-10 h-11 focus-visible:ring-primary"
              />
            </div>
          </div>
        </div>
      </div>

      <Separator />

      {/* 상세 설명 섹션 */}
      <div className="flex gap-12">
        <div className="w-64 shrink-0">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Info className="w-5 h-5 text-primary" />
            매장 소개
          </h2>
          <p className="text-sm text-slate-500 mt-2">AI 상담사가 고객에게 매장을 소개할 때 사용하는 문구입니다.</p>
        </div>

        <div className="flex-1 space-y-2">
          <Label htmlFor="description" className="text-slate-600 font-medium">
            상세 설명
          </Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={e => setFormData({ ...formData, description: e.target.value })}
            className="min-h-[150px] p-4 text-base focus-visible:ring-primary"
          />
          <div className="flex items-start gap-2 mt-4 p-4 bg-emerald-50 rounded-lg border border-emerald-100">
            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
            <p className="text-sm text-emerald-800">
              <strong>Tip:</strong> 매장의 특징이나 주차 정보, 시그니처 메뉴 등을 상세히 적어주시면 AI가 더 풍부하게 응대할 수 있습니다.
            </p>
          </div>
        </div>
      </div>

      <Separator />

      {/* 하단 버튼 */}
      <div className="flex justify-end items-center gap-4">
        <p className="text-sm text-slate-400">마지막 업데이트: 2024년 2월 13일</p>
        <Button
          onClick={handleSave}
          disabled={isSubmitting}
          className="bg-primary hover:bg-primary/90 text-white px-10 h-12 text-lg font-semibold gap-2 shadow-lg shadow-primary/20"
        >
          {isSubmitting ? (
            '저장 중...'
          ) : (
            <>
              <Save className="w-5 h-5" />
              업장 정보 저장하기
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
