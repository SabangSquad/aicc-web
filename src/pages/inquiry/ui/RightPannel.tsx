import { StateBadge } from '@/entities/inquiry';
import { AIAssist, CustomerInformation } from '@/features/inquiry';
import { InquiryType } from '@/shared/types/inquiry';
import { ScrollArea } from '@/shared/ui/scroll-area';
import { Separator } from '@/shared/ui/separator';

export function RightPannel({ selectedInquiry }: { selectedInquiry: InquiryType | null }) {
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
              <CustomerInformation customerId={selectedInquiry.customer_id} />
              <Separator />
              <AIAssist inquiry={selectedInquiry} />
              <Separator />

              <div>
                <h3 className="mb-3 text-lg font-medium">문의 내역 본문</h3>
                <div className="w-full rounded-md border p-4">
                  <p className="text-sm whitespace-pre-wrap leading-relaxed">{selectedInquiry.title}</p>
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
