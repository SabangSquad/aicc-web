'use client';
import { useEffect, useState } from 'react';
import { StateBadge } from '@/entities/inquiry';
import { AIAssist, CustomerInformation } from '@/features/inquiry';
import { Customer } from '@/shared/types/customer';
import { InquiryType } from '@/shared/types/inquiry';
import { ScrollArea } from '@/shared/ui/scroll-area';
import { Separator } from '@/shared/ui/separator';
import { Textarea } from '@/shared/ui/textarea';
import { Button } from '@/shared/ui/button';

export function RightPanel({ selectedInquiry }: { selectedInquiry: InquiryType | null }) {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [memo, setMemo] = useState('');

  useEffect(() => {
    const fetchCustomer = async () => {
      if (selectedInquiry) {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/customers/${selectedInquiry.customer_id}`)
          .then(res => res.json())
          .then(data => setCustomer(data))
          .catch(() => setCustomer(null));
      }
    };
    fetchCustomer();

    // ✅ inquiry 바뀔 때 memo 초기화
    if (selectedInquiry) {
      setMemo(selectedInquiry.memo ?? '');
    }
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

  if (!customer) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center text-muted-foreground">
          <p>왼쪽 목록에서 문의를 선택하세요.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full items-center justify-center">
      {selectedInquiry ? (
        <div className="flex h-full w-full flex-col">
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
            <div className="space-y-8 py-6">
              <CustomerInformation customer={customer} />
              <Separator />
              <AIAssist inquiry={selectedInquiry} />
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
          </ScrollArea>
        </div>
      ) : (
        <div className="text-center text-muted-foreground">
          <p>왼쪽 목록에서 문의를 선택하세요.</p>
        </div>
      )}
    </div>
  );
}
