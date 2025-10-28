import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

import { items } from '@/shared/data/inquiryItem';
import { getChatLogsByEmail } from '@/shared/data/chatItem';

// 2. UI 컴포넌트 import
import { Separator } from '@/shared/ui/separator';
import { Button } from '@/shared/ui/button';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/shared/ui/resizable';
import { ScrollArea } from '@/shared/ui/scroll-area';

// 3. 재사용 컴포넌트 import
import { StateBadge } from '@/entities/inquiry/ui/StateBadge';
import { CustomerInformation } from './CustomerInformation';
import { AIAssist } from './AIAssist';
import { PastInquiryList } from './PastInquiryList';
import { ChatHistoryViewer } from './ChatHistoryViewer';

interface InquiryDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function InquiryDetailPage({ params }: InquiryDetailPageProps) {
  const { id } = await params;

  // 1. 현재 문의 내역 찾기
  const inquiry = items.find(item => item.id === id);

  if (!inquiry) {
    notFound();
  }

  // 2. 과거 상담 이력 찾기 (현재 문의 제외)
  const pastInquiries = items
    .filter(item => item.email === inquiry.email && item.id !== inquiry.id)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  // 3. 챗봇/보이스봇 이력 불러오기 (비동기)
  const chatLogs = await getChatLogsByEmail(inquiry.email);

  return (
    // max-w-7xl로 확장
    <div className="mx-auto max-w-7xl p-6 lg:p-8">
      {/* 목록으로 돌아가기 버튼 */}
      <Button asChild variant="outline">
        <Link href="/inquiry">
          <ArrowLeft />
          목록으로 돌아가기
        </Link>
      </Button>

      {/* --- Card Wrapper 제거 --- */}

      {/* 1. 헤더 (제목, 상태, 날짜) */}
      <div className="border-b p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold tracking-tight">{inquiry.title}</h1>
          <StateBadge status={inquiry.status} />
        </div>
        <p className="mt-1 text-sm text-muted-foreground">{new Date(inquiry.createdAt).toLocaleString('ko-KR')}</p>
      </div>

      {/* 2. 고객 정보 */}
      <div className="border-b p-6">
        <CustomerInformation inquiry={inquiry} />
      </div>

      {/* 3. 3분할 탭 영역 */}
      <ResizablePanelGroup
        direction="horizontal"
        // Card wrapper 대신 여기에 테두리와 둥근 모서리 적용
        className="min-h-[70vh] w-full border-b"
      >
        {/* 패널 1: AI 요약 / 본문 */}
        <ResizablePanel defaultSize={50} minSize={30}>
          <div className="flex h-full flex-col">
            <ScrollArea className="h-0 flex-1">
              {' '}
              {/* 스크롤 영역 */}
              <div className="space-y-8 p-6">
                <AIAssist inquiry={inquiry} />
                <Separator />
                <div>
                  <h3 className="mb-3 text-lg font-medium">문의 내역 본문</h3>
                  <div className="w-full rounded-md border bg-background p-4">
                    <p className="whitespace-pre-wrap text-sm leading-relaxed">{inquiry.content}</p>
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
              <div className="flex h-full flex-col">
                <div className="flex-shrink-0 border-b p-4">
                  <h3 className="font-semibold">과거 상담 ({pastInquiries.length})</h3>
                </div>
                <ScrollArea className="h-0 flex-1">
                  <PastInquiryList inquiries={pastInquiries} />
                </ScrollArea>
              </div>
            </ResizablePanel>

            <ResizableHandle withHandle />

            <ResizablePanel defaultSize={50} minSize={15}>
              <div className="flex h-full flex-col">
                <div className="flex-shrink-0 border-b p-4">
                  <h3 className="font-semibold">챗봇/보이스봇 이력 ({chatLogs.length})</h3>
                </div>
                <ScrollArea className="h-0 flex-1">
                  <ChatHistoryViewer logs={chatLogs} />
                </ScrollArea>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
