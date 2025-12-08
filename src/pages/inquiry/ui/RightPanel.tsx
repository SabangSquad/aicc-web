'use client';
import { useEffect, useState } from 'react';
import { InquiryAPI, StateBadge } from '@/entities/inquiry';
import { AIAssist, CustomerInformation } from '@/features/inquiry';
import { Customer } from '@/shared/types/customer';
import { InquiryType } from '@/shared/types/inquiry';
import { ScrollArea } from '@/shared/ui/scroll-area';
import { Separator } from '@/shared/ui/separator';
import { Textarea } from '@/shared/ui/textarea';
import { Button } from '@/shared/ui/button';
import { Manual } from '@/shared/types/manual';
import { AIAssistType } from '@/shared/types/aiAssist';
import { Skeleton } from '@/shared/ui/skeleton';

interface CacheData {
  customer: Customer | null;
  manuals: Manual[];
  aiAssist: AIAssistType | null;
}

export function RightPanel({ selectedInquiry }: { selectedInquiry: InquiryType | null }) {
  const [isLoading, setIsLoading] = useState(false);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [manuals, setManuals] = useState<Manual[]>([]);
  const [aiAssist, setAIAssist] = useState<AIAssistType | null>(null);
  const [memo, setMemo] = useState('');

  const [dataCache, setDataCache] = useState<Record<number, CacheData>>({});

  useEffect(() => {
    if (!selectedInquiry) {
      setCustomer(null);
      return;
    }

    const currentId = selectedInquiry.case_id;

    if (dataCache[currentId]) {
      const cached = dataCache[currentId];
      setCustomer(cached.customer);
      setManuals(cached.manuals);
      setAIAssist(cached.aiAssist);
      setIsLoading(false);
    } else {
      const loadAllData = async () => {
        setIsLoading(true);
        setCustomer(null);
        setManuals([]);
        setAIAssist(null);

        try {
          const [customerData, manualsRes, aiRes] = await Promise.all([
            InquiryAPI.getCustomer(selectedInquiry.customer_id),
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/manuals?category=${selectedInquiry.category}`),
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/chat/${selectedInquiry.case_id}`, { method: 'POST' }),
          ]);

          const manualsData = await manualsRes.json();
          const aiData = await aiRes.json();

          const newCustomer = customerData;
          const newManuals = manualsData.data || [];
          const newAiAssist = aiData;

          setCustomer(newCustomer);
          setManuals(newManuals);
          setAIAssist(newAiAssist);

          setDataCache(prev => ({
            ...prev,
            [currentId]: {
              customer: newCustomer,
              manuals: newManuals,
              aiAssist: newAiAssist,
            },
          }));
        } catch (error) {
          console.error('데이터 로딩 중 오류 발생:', error);
        } finally {
          setIsLoading(false);
        }
      };

      loadAllData();
    }

    setMemo(selectedInquiry.memo ?? '');
  }, [selectedInquiry]);

  const handleMemoChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMemo(e.target.value);
  };

  const handleSaveMemo = async () => {
    if (!selectedInquiry) {
      return;
    }
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/inquiries/${selectedInquiry.case_id}/memo`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ memo }),
      });
      if (!res.ok) {
        throw new Error('메모 저장 실패');
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (!selectedInquiry) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center text-muted-foreground">
          <p>왼쪽 목록에서 문의를 선택하세요.</p>
        </div>
      </div>
    );
  }

  const isDataReady = !isLoading && customer && aiAssist;

  return (
    <div className="flex h-full items-center justify-center">
      <div className="flex h-full w-full flex-col">
        {/* 고정 헤더 영역 */}
        <div className="border-b p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold tracking-tight">{selectedInquiry.title}</h2>
            <div className="flex items-center gap-2">
              <StateBadge status={selectedInquiry.status} />
            </div>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            {new Date(selectedInquiry.created_at).toLocaleString('ko-KR')}
          </p>
        </div>

        <ScrollArea className="h-0 flex-1 px-6">
          {
            isLoading && !customer ? (
              <RightPanelSkeleton />
            ) : isDataReady ? (
              // 데이터 로딩 완료 시 실제 콘텐츠 표시
              <div className="space-y-8 py-6">
                <CustomerInformation customer={customer} />
                <Separator />
                <AIAssist manuals={manuals} aiAssist={aiAssist} />
                <Separator />

                <div className="flex flex-row gap-6">
                  <div className="flex-1">
                    <h3 className="mb-3 text-lg font-medium">문의 내역 본문</h3>
                    <div className="w-full rounded-md p-4 bg-muted/50">
                      <p className="text-sm whitespace-pre-wrap leading-relaxed">{selectedInquiry.content}</p>
                    </div>
                  </div>

                  <div className="flex-1">
                    <h3 className="mb-3 text-lg font-medium">메모</h3>
                    <Textarea
                      value={memo}
                      onChange={handleMemoChange}
                      placeholder="메모를 입력하세요..."
                      className="min-h-[120px] mb-2"
                    />
                    <Button onClick={handleSaveMemo}>저장</Button>
                  </div>
                </div>
              </div>
            ) : null /* 로딩이 끝났는데 데이터가 없는 경우 (에러 등) */
          }
        </ScrollArea>
      </div>
    </div>
  );
}

function RightPanelSkeleton() {
  return (
    <div className="space-y-8 py-6 animate-pulse">
      {/* 고객 정보 영역 스켈레톤 */}
      <div className="space-y-4">
        <Skeleton className="h-6 w-32" /> {/* 섹션 타이틀 */}
        <div className="flex items-start gap-4 p-4 rounded-md">
          <Skeleton className="h-12 w-12 rounded-full" /> {/* 아바타 */}
          <div className="space-y-2 flex-1">
            <Skeleton className="h-5 w-48" /> {/* 이름/이메일 */}
            <Skeleton className="h-4 w-32" /> {/* 전화번호 */}
            <div className="pt-2 space-y-1">
              <Skeleton className="h-3 w-full" /> {/* 상세 정보 줄 1 */}
              <Skeleton className="h-3 w-2/3" /> {/* 상세 정보 줄 2 */}
            </div>
          </div>
        </div>
      </div>
      <Separator />

      {/* AI 요약 영역 스켈레톤 */}
      <div className="space-y-3">
        <Skeleton className="h-6 w-24" /> {/* 섹션 타이틀 */}
        <Skeleton className="h-16 w-full rounded-md" /> {/* 요약 박스 */}
      </div>
      <Separator />

      {/* AI 분석 및 답변 추천 영역 (2열) 스켈레톤 */}
      <div className="flex flex-row gap-6">
        {/* 감정 분석 */}
        <div className="flex-1 space-y-3">
          <Skeleton className="h-6 w-28" />
          <Skeleton className="h-24 w-full rounded-lg" /> {/* 감정 박스 */}
        </div>
        {/* 답변 추천 */}
        <div className="flex-1 space-y-3">
          <Skeleton className="h-6 w-28" />
          <div className="space-y-2">
            <Skeleton className="h-12 w-full rounded-md" />
            <Skeleton className="h-12 w-full rounded-md" />
            <Skeleton className="h-12 w-full rounded-md" />
          </div>
        </div>
      </div>
      <Separator />

      {/* 하단 문의 본문 및 메모 영역 (2열) 스켈레톤 */}
      <div className="flex flex-row gap-6">
        <div className="flex-1 space-y-3">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-40 w-full rounded-md" /> {/* 본문 박스 */}
        </div>
        <div className="flex-1 space-y-3">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-[120px] w-full rounded-md" /> {/* 메모장 */}
          <Skeleton className="h-10 w-20 rounded-md" /> {/* 저장 버튼 */}
        </div>
      </div>
    </div>
  );
}
