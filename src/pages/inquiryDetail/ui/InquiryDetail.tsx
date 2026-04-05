import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

import { Separator } from '@/shared/ui/separator';
import { Button } from '@/shared/ui/button';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/shared/ui/resizable';
import { ScrollArea } from '@/shared/ui/scroll-area';

import { StateBadge } from '@/entities/inquiry';
import { CustomerInformation, PastInquiryList, ChatHistoryViewer } from '@/features/cases';
import { casesAPI } from '@/entities/cases';

export async function InquiryDetail({ params }: { params: Promise<{ id: number }> }) {
  const { id } = await params;
  const caseData = await casesAPI.getCase(id);

  return (
    <>
      <Button asChild variant="outline" className="ml-6">
        <Link href="/inquiry">
          <ArrowLeft />
          목록으로 돌아가기
        </Link>
      </Button>

      <div className="border-b p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold tracking-tight">{caseData.summary}</h1>
          <div className="flex items-center gap-2">
            <StateBadge status={caseData.status} />
          </div>
        </div>
        <p className="text-muted-foreground mt-1 text-sm">{new Date(caseData.created_at).toLocaleString('ko-KR')}</p>
      </div>

      {/* <div className="border-b p-6">
        <CustomerInformation customerId={caseData.customer_id} />
      </div> */}

      <ResizablePanelGroup direction="horizontal" className="min-h-[70vh] w-full border-b">
        <ResizablePanel defaultSize={60} minSize={30}>
          <div className="flex h-full flex-col">
            <ScrollArea className="h-0 flex-1">
              <div className="space-y-8 p-6">
                {/* <AIAssist inquiry={caseData} /> */}

                <Separator />
                <div className="flex flex-row gap-6">
                  <div className="flex-1">
                    <h3 className="mb-3 text-lg font-medium">문의 내역 본문</h3>
                    <div className="bg-muted/50 w-full rounded-md p-4">
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">{caseData.summary}</p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollArea>
          </div>
        </ResizablePanel>

        <ResizableHandle withHandle />

        <ResizablePanel defaultSize={40} minSize={30}>
          <ResizablePanelGroup direction="vertical" className="h-full">
            <ResizablePanel defaultSize={50} minSize={15}>
              {/* <PastInquiryList customerId={caseData.customer_id} /> */}
            </ResizablePanel>

            <ResizableHandle withHandle />

            <ResizablePanel defaultSize={50} minSize={15}>
              <ChatHistoryViewer caseId={caseData.case_id} />
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </>
  );
}
