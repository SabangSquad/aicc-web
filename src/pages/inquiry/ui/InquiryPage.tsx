'use client';
import { useState } from 'react';
import Link from 'next/link';

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/shared/ui/resizable';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';
import { ScrollArea } from '@/shared/ui/scroll-area';
import { Input } from '@/shared/ui/input';

import { StateBadge } from '@/entities/inquiry/ui/StateBadge';
import { InquiryType } from '@/shared/types/inquiry';
import { RightPannel } from './RightPannel';
// import { AIBadge } from '@/entities/ai';

export function InquiryPage({ items }: { items: InquiryType[] }) {
  const [selectedInquiry, setSelectedInquiry] = useState<InquiryType | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = items.filter(inquiry => inquiry.title.toLowerCase().includes(searchTerm.toLowerCase()));

  const pendingInquiries = filteredItems.filter((inquiry: InquiryType) => inquiry.status === '대기');
  const ongoingInquiries = filteredItems.filter((inquiry: InquiryType) => inquiry.status === '상담');
  const completedInquiries = filteredItems.filter((inquiry: InquiryType) => inquiry.status === '종료');

  const renderInquiryItem = (inquiry: InquiryType) => (
    <Link
      key={inquiry.case_id}
      href={`/inquiry/${inquiry.case_id}`}
      onMouseEnter={() => setSelectedInquiry(inquiry)}
      className={`flex w-full flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent ${selectedInquiry?.case_id === inquiry.case_id && 'bg-muted'}`}
    >
      <div className="flex w-full items-center justify-between">
        <span className="font-semibold">{inquiry.title}</span>
        <div className="flex items-center gap-2">
          {/* <AIBadge status={inquiry.processedByAI} /> */}
          <StateBadge status={inquiry.status} />
        </div>
      </div>

      <div className="text-xs font-medium">{inquiry.category}</div>
      <div className="line-clamp-2 text-xs text-muted-foreground">{inquiry.content}</div>
      <div className="text-xs text-muted-foreground">{new Date(inquiry.created_at).toLocaleString('ko-KR')}</div>
    </Link>
  );

  return (
    <div className="h-screen w-full overflow-hidden">
      <ResizablePanelGroup direction="horizontal" className="min-h-[800px] ">
        <ResizablePanel defaultSize={30} minSize={25}>
          <div className="flex h-full flex-col">
            <Tabs defaultValue="전체" className="flex-1 overflow-hidden">
              <div className="p-4">
                <Input
                  type="search"
                  placeholder="제목 또는 내용으로 검색..."
                  className="mb-4"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="전체">전체</TabsTrigger>
                  <TabsTrigger value="상담">상담</TabsTrigger>
                  <TabsTrigger value="대기">답변대기</TabsTrigger>
                  <TabsTrigger value="종료">완료</TabsTrigger>
                </TabsList>
              </div>

              <ScrollArea className="h-0 flex-1 pb-4 px-4">
                <TabsContent value="전체">
                  <div className="flex flex-col gap-2">{filteredItems.map(renderInquiryItem)}</div>
                </TabsContent>
                <TabsContent value="상담">
                  <div className="flex flex-col gap-2">{ongoingInquiries.map(renderInquiryItem)}</div>
                </TabsContent>
                <TabsContent value="대기">
                  <div className="flex flex-col gap-2">{pendingInquiries.map(renderInquiryItem)}</div>
                </TabsContent>
                <TabsContent value="종료">
                  <div className="flex flex-col gap-2">{completedInquiries.map(renderInquiryItem)}</div>
                </TabsContent>
              </ScrollArea>
            </Tabs>
          </div>
        </ResizablePanel>

        <ResizableHandle withHandle />

        <ResizablePanel defaultSize={70}>
          <RightPannel selectedInquiry={selectedInquiry} />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
