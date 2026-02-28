'use client';

import { useState } from 'react';
import { Button } from '@/shared/ui/button';
import { Textarea } from '@/shared/ui/textarea';
import { Label } from '@/shared/ui/label';
import { Separator } from '@/shared/ui/separator';
import { FileText, ShieldCheck, RotateCcw, Save, AlertTriangle, History } from 'lucide-react';

export function PoliciesPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [policies, setPolicies] = useState({
    terms:
      '제 1조 (목적)본 약관은 "맛있는 베이커리"(이하 "회사")가 제공하는 서비스의 이용조건 및 절차, 이용자와 회사의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.',
    privacy:
      '1. 개인정보의 처리 목적 회사는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 개인정보 보호법 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.',
    refund: '환불 규정1. 단순 변심에 의한 환불은 상품 수령 후 7일 이내에 가능합니다.2. 신선식품의 경우 제품 특성상 교환 및 반품이 제한될 수 있습니다.',
  });

  const handleSave = async () => {
    setIsSubmitting(true);
    // API 호출 시뮬레이션
    setTimeout(() => {
      setIsSubmitting(false);
      alert('정책 정보가 성공적으로 업데이트되었습니다.');
    }, 1000);
  };

  return (
    <div className="space-y-10 pb-20">
      {/* 헤더 섹션 */}
      <div className="flex flex-col gap-3">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 flex items-center gap-3">이용약관 및 정책 관리</h1>
        <p className="text-slate-500 text-lg">매장의 운영 정책과 법적 약관을 관리합니다. AI는 이 정책을 기반으로 환불 및 이용 문의에 답변합니다.</p>
      </div>

      <Separator />

      {/* 서비스 이용약관 섹션 */}
      <div className="flex gap-12">
        <div className="w-64 shrink-0">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            서비스 이용약관
          </h2>
          <p className="text-sm text-slate-500 mt-2">가게 이용에 관한 기본적인 규칙과 고객의 권리/의무를 정의합니다.</p>
        </div>

        <div className="flex-1 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="terms" className="text-slate-600 font-medium text-sm">
              약관 내용
            </Label>
            <Textarea
              id="terms"
              value={policies.terms}
              onChange={e => setPolicies({ ...policies, terms: e.target.value })}
              className="min-h-[200px] p-4 text-base focus-visible:ring-primary leading-relaxed"
              placeholder="서비스 이용약관을 입력해주세요."
            />
          </div>
        </div>
      </div>

      <Separator />

      {/* 개인정보 처리방침 섹션 */}
      <div className="flex gap-12">
        <div className="w-64 shrink-0">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-primary" />
            개인정보 처리방침
          </h2>
          <p className="text-sm text-slate-500 mt-2">고객의 소중한 개인정보를 어떻게 수집하고 보호하는지 명시합니다.</p>
        </div>

        <div className="flex-1 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="privacy" className="text-slate-600 font-medium text-sm">
              처리방침 내용
            </Label>
            <Textarea
              id="privacy"
              value={policies.privacy}
              onChange={e => setPolicies({ ...policies, privacy: e.target.value })}
              className="min-h-[200px] p-4 text-base focus-visible:ring-primary leading-relaxed"
              placeholder="개인정보 처리방침을 입력해주세요."
            />
          </div>
        </div>
      </div>

      <Separator />

      {/* 환불 및 취소 정책 섹션 */}
      <div className="flex gap-12">
        <div className="w-64 shrink-0">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <RotateCcw className="w-5 h-5 text-primary" />
            환불 및 취소 정책
          </h2>
          <p className="text-sm text-slate-500 mt-2">결제 취소나 제품 환불에 대한 구체적인 기준을 설정합니다.</p>
        </div>

        <div className="flex-1 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="refund" className="text-slate-600 font-medium text-sm">
              정책 내용
            </Label>
            <Textarea
              id="refund"
              value={policies.refund}
              onChange={e => setPolicies({ ...policies, refund: e.target.value })}
              className="min-h-[200px] p-4 text-base focus-visible:ring-primary leading-relaxed"
              placeholder="환불 및 취소 정책을 입력해주세요."
            />
          </div>
          <div className="flex items-start gap-2 mt-2 p-4 bg-amber-50 rounded-lg border border-amber-100">
            <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
            <p className="text-sm text-amber-800">
              <strong>중요:</strong> 환불 정책은 고객 분쟁 시 중요한 근거가 됩니다. AI가 고객에게 안내할 때 이 내용을 그대로 인용하므로 정확하게 작성해 주세요.
            </p>
          </div>
        </div>
      </div>

      <Separator />

      {/* 하단 버튼 */}
      <div className="flex justify-end items-center gap-4">
        <Button variant="outline" className="h-12 px-6 gap-2 border-slate-200">
          <History className="w-4 h-4" />
          변경 이력 보기
        </Button>
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
              모든 정책 저장하기
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
