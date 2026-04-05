import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

import { Separator } from '@/shared/ui/separator';
import { Button } from '@/shared/ui/button';
import { ScrollArea } from '@/shared/ui/scroll-area';

import { StateBadge } from '@/entities/inquiry';
import { casesAPI } from '@/entities/cases';
import { CustomerInformation, PastInquiryList, ChatHistoryViewer, CaseSatisfaction } from '@/features/cases';
import { AIAssist } from '@/features/chat';

export async function InquiryDetailPage({ params }: { params: Promise<{ id: number }> }) {
  const { id } = await params;
  const caseData = await casesAPI.getCase(id);

  return (
    <div className="flex h-full w-full flex-col">
      <div className="px-6 pt-6">
        <Button variant="outline" className="text-muted-foreground text-sm">
          <Link href="/inquiry">
            <ArrowLeft className="mr-2 h-4 w-4" />
            목록으로 돌아가기
          </Link>
        </Button>
      </div>

      <div className="border-b p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold tracking-tight">{caseData.summary}</h1>
          <div className="flex items-center gap-2">
            <StateBadge status={caseData.status} />
          </div>
        </div>
        <p className="text-muted-foreground mt-1 text-sm">{new Date(caseData.created_at).toLocaleString('ko-KR')}</p>
      </div>

      <ScrollArea className="h-0 flex-1 px-6">
        <div className="space-y-8 py-6">
          {caseData.customer_id && (
            <div className="flex flex-row gap-6">
              <CustomerInformation customerId={caseData.customer_id} />
              <PastInquiryList customerId={caseData.customer_id} storeId={caseData.store_id} />
            </div>
          )}

          <div className="flex flex-row gap-6">
            <AIAssist case_id={caseData.case_id} />
            <CaseSatisfaction case_id={caseData.case_id} />
          </div>

          <Separator />

          <ChatHistoryViewer caseId={caseData.case_id} />
        </div>
      </ScrollArea>
    </div>
  );
}
