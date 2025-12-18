import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

import { Separator } from '@/shared/ui/separator';
import { Button } from '@/shared/ui/button';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/shared/ui/resizable';
import { ScrollArea } from '@/shared/ui/scroll-area';

import { InquiryAPI, StateBadge } from '@/entities/inquiry';
import { CustomerInformation, AIAssist, PastInquiryList, ChatHistoryViewer } from '@/features/inquiry';
import { InquiryType } from '@/shared/types/inquiry';
import { Manual } from '@/shared/types/manual';
import { AIAssistType } from '@/shared/types/aiAssist';
import { Textarea } from '@/shared/ui/textarea';

interface InquiryDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function InquiryDetail({ params }: InquiryDetailPageProps) {
  const { id } = await params;

  const inquiry: InquiryType | undefined = (await InquiryAPI.getListByAgent(3)).find(
    item => item.case_id === Number(id)
  );

  if (!inquiry) {
    return <div className="p-6">문의 내역을 찾을 수 없습니다.</div>;
  }

  const [customer, pastInquiries, chatLogs, manualsRes, aiAssistRes] = await Promise.all([
    InquiryAPI.getCustomer(inquiry.customer_id),
    InquiryAPI.getCustomerCases(inquiry.customer_id),
    InquiryAPI.getMessages(id),
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/manuals?category=${inquiry.category}`),
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/chat/${id}`, { method: 'POST' }),
  ]);

  const manualsData = await manualsRes.json();
  const manuals: Manual[] = manualsData.data || manualsData;
  const aiAssistData: AIAssistType = await aiAssistRes.json();

  return (
    <div className="p-6 mx-auto max-w-7xl lg:p-8">
      <Button asChild variant="outline" className="ml-6">
        <Link href="/inquiry">
          <ArrowLeft />
          목록으로 돌아가기
        </Link>
      </Button>

      {/* ... 상단 헤더 영역 ... */}
      <div className="p-6 border-b">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold tracking-tight">{inquiry.title}</h1>
          <div className="flex items-center gap-2">
            <StateBadge status={inquiry.status} />
          </div>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">{new Date(inquiry.created_at).toLocaleString('ko-KR')}</p>
      </div>

      <div className="p-6 border-b">
        <CustomerInformation customer={customer} />
      </div>

      <ResizablePanelGroup direction="horizontal" className="min-h-[70vh] w-full border-b">
        <ResizablePanel defaultSize={60} minSize={30}>
          <div className="flex flex-col h-full">
            <ScrollArea className="flex-1 h-0">
              <div className="p-6 space-y-8">
                <AIAssist manuals={manuals} aiAssist={aiAssistData} />

                <Separator />
                <div className="flex flex-row gap-6">
                  <div className="flex-1">
                    <h3 className="mb-3 text-lg font-medium">문의 내역 본문</h3>
                    <div className="w-full rounded-md p-4 bg-muted/50">
                      <p className="text-sm whitespace-pre-wrap leading-relaxed">{inquiry.content}</p>
                    </div>
                  </div>

                  <div className="flex-1">
                    <h3 className="mb-3 text-lg font-medium">메모</h3>
                    <Textarea
                      value={inquiry.memo || ''}
                      placeholder="메모를 입력하세요..."
                      className="min-h-[120px] mb-2"
                    />
                    <Button>저장</Button>
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
