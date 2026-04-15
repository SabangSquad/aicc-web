'use client';
import { StateBadge } from '@/entities/inquiry';
import { AIAssist } from '@/features/chat';
import { CaseSatisfaction, ChatHistoryViewer, CustomerInformation, PastInquiryList } from '@/features/cases';
import { CaseType } from '@/shared/types/case';
import { ScrollArea } from '@/shared/ui/scroll-area';
import { Separator } from '@/shared/ui/separator';
import { motion } from 'motion/react';

export function RightPanel({ selectedInquiry }: { selectedInquiry: CaseType | null }) {
  if (!selectedInquiry) {
    return (
      <div className="bg-muted/10 flex h-full items-center justify-center">
        <motion.div
          className="flex flex-col items-center gap-4 text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="space-y-1">
            <h3 className="text-lg font-medium tracking-tight">선택된 문의가 없습니다</h3>
            <p className="text-muted-foreground text-sm">
              왼쪽 목록에서 문의를 선택하면
              <br />
              상세 정보와 상담 내역을 확인할 수 있습니다.
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex h-full items-center justify-center">
      <div className="flex h-full w-full flex-col">
        <div className="border-b p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold tracking-tight">{selectedInquiry.summary}</h2>
            <div className="flex items-center gap-2">
              <StateBadge status={selectedInquiry.status} />
            </div>
          </div>
          <p className="text-muted-foreground mt-1 text-sm">{new Date(selectedInquiry.created_at).toLocaleString('ko-KR')}</p>
        </div>

        <ScrollArea className="h-0 flex-1 px-6">
          <motion.div className="space-y-8 py-6" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            {selectedInquiry.customer_id && (
              <div className="flex flex-row gap-6">
                <CustomerInformation customerId={selectedInquiry.customer_id} />
                <PastInquiryList customerId={selectedInquiry.customer_id} storeId={selectedInquiry.store_id} />
              </div>
            )}
            <div className="flex flex-row gap-6">
              <AIAssist case_id={selectedInquiry.case_id} />
              <CaseSatisfaction case_id={selectedInquiry.case_id} />
            </div>
            <Separator />
            <ChatHistoryViewer caseId={selectedInquiry.case_id} />
          </motion.div>
        </ScrollArea>
      </div>
    </div>
  );
}
