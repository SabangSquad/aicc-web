'use client';
import { StateBadge } from '@/entities/inquiry';
import { CustomerInformation } from '@/features/inquiry';
import { CaseType } from '@/shared/types/case';
import { ScrollArea } from '@/shared/ui/scroll-area';
import { Separator } from '@/shared/ui/separator';

export function RightPanel({ selectedInquiry }: { selectedInquiry: CaseType | null }) {
  if (!selectedInquiry) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-muted-foreground text-center">
          <p>왼쪽 목록에서 문의를 선택하세요.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full items-center justify-center">
      <div className="flex h-full w-full flex-col">
        <div className="border-b p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold tracking-tight">{selectedInquiry.summary}</h2>
            <div className="flex items-center gap-2">
              <StateBadge status={selectedInquiry.status} />
            </div>
          </div>
          <p className="text-muted-foreground mt-1 text-sm">{new Date(selectedInquiry.created_at).toLocaleString('ko-KR')}</p>
        </div>

        <ScrollArea className="h-0 flex-1 px-6">
          <div className="space-y-8 py-6">
            <CustomerInformation customerId={selectedInquiry.customer_id} />
            <Separator />
            {/* <AIAssist inquiry={selectedInquiry} /> */}
            <Separator />
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
