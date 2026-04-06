'use client';
import { useState } from 'react';
import { Button } from '@/shared/ui/button';
import { Textarea } from '@/shared/ui/textarea';
import { Label } from '@/shared/ui/label';
import { AlertTriangle, History } from 'lucide-react';

export function PoliciesPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [policies, setPolicies] = useState({
    terms:
      '제 1조 (목적)\n본 약관은 "맛있는 베이커리"(이하 "회사")가 제공하는 서비스의 이용조건 및 절차, 이용자와 회사의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.',
    privacy:
      '1. 개인정보의 처리 목적\n회사는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 개인정보 보호법 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.',
    refund: '환불 규정\n1. 단순 변심에 의한 환불은 상품 수령 후 7일 이내에 가능합니다.\n2. 신선식품의 경우 제품 특성상 교환 및 반품이 제한될 수 있습니다.',
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
    <div className="w-full space-y-16">
      {/* 헤더 섹션 */}
      <div>
        <h1 className="mb-3 text-3xl font-bold tracking-tight">이용약관 및 정책 관리</h1>
        <p className="text-[17px] font-medium whitespace-pre-line text-slate-500">
          {`매장의 운영 정책과 약관을 관리합니다 \nAI는 이 정책을 기반으로 문의에 답변합니다.`}
        </p>
      </div>

      <hr className="border-t-2 border-slate-100" />

      {/* 서비스 이용약관 섹션 */}
      <div className="flex flex-col gap-8 xl:flex-row xl:gap-20">
        <div className="shrink-0 xl:w-80">
          <h2 className="text-[22px] font-bold text-slate-900">서비스 이용약관</h2>
          <p className="mt-2 text-[15px] leading-relaxed font-medium text-slate-500">가게 이용에 관한 기본적인 규칙과 고객의 권리/의무를 정의합니다.</p>
        </div>

        <div className="flex-1 space-y-3">
          <Label htmlFor="terms" className="text-[15px] font-semibold text-slate-700">
            약관 내용
          </Label>
          <Textarea
            id="terms"
            value={policies.terms}
            onChange={e => setPolicies({ ...policies, terms: e.target.value })}
            className="min-h-[240px] w-full resize-y rounded-2xl border-transparent bg-slate-100 p-6 text-[17px] leading-relaxed text-slate-900 shadow-none transition-all focus-visible:border-transparent focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-blue-500"
            placeholder="서비스 이용약관을 입력해주세요."
          />
        </div>
      </div>

      <hr className="border-t-2 border-slate-100" />

      {/* 개인정보 처리방침 섹션 */}
      <div className="flex flex-col gap-8 xl:flex-row xl:gap-20">
        <div className="shrink-0 xl:w-80">
          <h2 className="text-[22px] font-bold text-slate-900">개인정보 처리방침</h2>
          <p className="mt-2 text-[15px] leading-relaxed font-medium text-slate-500">고객의 소중한 개인정보를 어떻게 수집하고 보호하는지 명시합니다.</p>
        </div>

        <div className="flex-1 space-y-3">
          <Label htmlFor="privacy" className="text-[15px] font-semibold text-slate-700">
            처리방침 내용
          </Label>
          <Textarea
            id="privacy"
            value={policies.privacy}
            onChange={e => setPolicies({ ...policies, privacy: e.target.value })}
            className="min-h-[240px] w-full resize-y rounded-2xl border-transparent bg-slate-100 p-6 text-[17px] leading-relaxed text-slate-900 shadow-none transition-all focus-visible:border-transparent focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-blue-500"
            placeholder="개인정보 처리방침을 입력해주세요."
          />
        </div>
      </div>

      <hr className="border-t-2 border-slate-100" />

      {/* 환불 및 취소 정책 섹션 */}
      <div className="flex flex-col gap-8 xl:flex-row xl:gap-20">
        <div className="shrink-0 xl:w-80">
          <h2 className="text-[22px] font-bold text-slate-900">환불 및 취소 정책</h2>
          <p className="mt-2 text-[15px] leading-relaxed font-medium text-slate-500">결제 취소나 제품 환불에 대한 구체적인 기준을 설정합니다.</p>
        </div>

        <div className="flex-1 space-y-4">
          <div className="space-y-3">
            <Label htmlFor="refund" className="text-[15px] font-semibold text-slate-700">
              정책 내용
            </Label>
            <Textarea
              id="refund"
              value={policies.refund}
              onChange={e => setPolicies({ ...policies, refund: e.target.value })}
              className="min-h-[240px] w-full resize-y rounded-2xl border-transparent bg-slate-100 p-6 text-[17px] leading-relaxed text-slate-900 shadow-none transition-all focus-visible:border-transparent focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-blue-500"
              placeholder="환불 및 취소 정책을 입력해주세요."
            />
          </div>

          {/* 경고 박스 (Toss 느낌의 부드러운 라운딩) */}
          <div className="mt-4 flex w-full items-start gap-3 rounded-2xl bg-amber-50/80 p-5">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
            <p className="text-[14px] leading-relaxed font-medium text-amber-900">
              <strong className="mr-1 text-amber-700">중요.</strong>
              환불 정책은 고객 분쟁 시 중요한 근거가 됩니다. AI가 고객에게 안내할 때 이 내용을 그대로 인용하므로 정확하게 작성해 주세요.
            </p>
          </div>
        </div>
      </div>

      {/* 하단 버튼 영역 */}
      <div className="flex flex-col items-center justify-end gap-4 pt-8 sm:flex-row">
        <Button
          variant="outline"
          className="h-14 w-full gap-2 rounded-2xl border-slate-200 px-6 text-[16px] font-semibold text-slate-600 transition-all hover:bg-slate-50 sm:w-auto"
        >
          <History className="h-5 w-5" />
          변경 이력 보기
        </Button>
        <Button
          onClick={handleSave}
          disabled={isSubmitting}
          className="h-14 w-full rounded-2xl bg-blue-600 px-10 text-[17px] font-bold text-white shadow-none transition-all hover:bg-blue-700 sm:w-auto"
        >
          {isSubmitting ? '저장 중...' : '모든 정책 저장하기'}
        </Button>
      </div>
    </div>
  );
}
