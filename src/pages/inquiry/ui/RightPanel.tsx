'use client';
import { StateBadge } from '@/entities/inquiry';
import { AIAssist, CustomerInformation } from '@/features/inquiry';
import { Customer } from '@/shared/types/customer';
import { InquiryType } from '@/shared/types/inquiry';
import { ScrollArea } from '@/shared/ui/scroll-area';
import { Separator } from '@/shared/ui/separator';
import { useEffect, useState } from 'react';

export function RightPanel({ selectedInquiry }: { selectedInquiry: InquiryType | null }) {
  const [customer, setCustomer] = useState<Customer | null>(null);

  useEffect(() => {
    if (selectedInquiry) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/customers/${selectedInquiry.customer_id}`)
        .then(res => res.json())
        .then(data => setCustomer(data))
        .catch(() => setCustomer(null));
    } else {
      setCustomer(null);
    }
  }, [selectedInquiry]);

  if (!customer) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-muted-foreground">고객 정보를 불러오는 중...</p>
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
                {/* <AIBadge status={selectedInquiry.processedByAI} /> */}
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

              <div>
                <h3 className="mb-3 text-lg font-medium">문의 내역 본문</h3>
                <div className="w-full rounded-md border p-4">
                  <p className="text-sm whitespace-pre-wrap leading-relaxed">{selectedInquiry.content}</p>
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
