import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

import { Separator } from '@/shared/ui/separator';
import { Button } from '@/shared/ui/button';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/shared/ui/resizable';
import { ScrollArea } from '@/shared/ui/scroll-area';

import { StateBadge } from '@/entities/inquiry';
import { CustomerInformation, AIAssist, PastInquiryList, ChatHistoryViewer } from '@/features/inquiry';
import { InquiryType } from '@/shared/types/inquiry';
// import { AIBadge } from '@/entities/ai';

interface InquiryDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function InquiryDetail({ params }: InquiryDetailPageProps) {
  const { id } = await params;

  const inquiryRes = fetch(`${process.env.NEXT_PUBLIC_API_URL}/agents/3/cases/`);

  const [inquiry, customer, pastInquiries, chatLogs] = await Promise.all([
    inquiryRes.then(res => res.json()).then(data => data.data.find((item: InquiryType) => item.case_id === Number(id))),
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/customers/${id}`).then(res => res.json()),
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/customers/${id}/cases`)
      .then(res => res.json())
      .then(data => data.data),
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/cases/${id}/messages`).then(res => res.json()),
  ]);

  return (
    <div className="p-6 mx-auto max-w-7xl lg:p-8">
      <Button asChild variant="outline" className="ml-6">
        <Link href="/inquiry">
          <ArrowLeft />
          목록으로 돌아가기
        </Link>
      </Button>

      <div className="p-6 border-b">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold tracking-tight">{inquiry.title}</h1>
          <div className="flex items-center gap-2">
            {/* <AIBadge status={inquiry.processedByAI} /> */}
            <StateBadge status={inquiry.status} />
          </div>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">{new Date(inquiry.created_at).toLocaleString('ko-KR')}</p>
      </div>

      <div className="p-6 border-b">
        <CustomerInformation customer={customer} />
      </div>

      <ResizablePanelGroup direction="horizontal" className="min-h-[70vh] w-full border-b">
        <ResizablePanel defaultSize={50} minSize={30}>
          <div className="flex flex-col h-full">
            <ScrollArea className="flex-1 h-0">
              <div className="p-6 space-y-8">
                <AIAssist inquiry={inquiry} />
                <Separator />
                <div>
                  <h3 className="mb-3 text-lg font-medium">문의 내역 본문</h3>
                  <div className="w-full p-4 border rounded-md bg-background">
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{inquiry.content}</p>
                  </div>
                </div>
              </div>
            </ScrollArea>
          </div>
        </ResizablePanel>

        <ResizableHandle withHandle />

        <ResizablePanel defaultSize={50} minSize={30}>
          <ResizablePanelGroup direction="vertical" className="h-full">
            <ResizablePanel defaultSize={50} minSize={15}>
              <div className="flex flex-col h-full">
                <div className="flex-shrink-0 p-4">
                  <h3 className="font-semibold">과거 상담 ({pastInquiries.length})</h3>
                </div>
                <ScrollArea className="flex-1 h-0">
                  <PastInquiryList inquiries={pastInquiries} />
                </ScrollArea>
              </div>
            </ResizablePanel>

            <ResizableHandle withHandle />

            <ResizablePanel defaultSize={50} minSize={15}>
              <div className="flex flex-col h-full">
                <div className="flex-shrink-0 p-4">
                  <h3 className="font-semibold">챗봇/보이스봇 이력 ({chatLogs.length})</h3>
                </div>
                <ChatHistoryViewer chats={chatLogs} />
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
