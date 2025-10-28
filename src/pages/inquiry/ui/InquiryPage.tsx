'use client';
import { useState } from 'react';
import Link from 'next/link';

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/shared/ui/resizable';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';
import { Button } from '@/shared/ui/button';
import { ScrollArea } from '@/shared/ui/scroll-area';
import { Separator } from '@/shared/ui/separator';
import { cn } from '@/shared/lib/utils';

import { items, InquiryType } from '../model/inquiryItem';
import { StateBadge } from './StateBadge';
import { CustomerInformation } from './CustomerInformation';
import { AIAssist } from './AIAssist';
import { SquareArrowOutUpRight } from 'lucide-react';

export function InquiryPage() {
  const [selectedInquiry, setSelectedInquiry] = useState<InquiryType | null>(null);

  const pendingInquiries = items.filter((inquiry: InquiryType) => inquiry.status === 'pending');
  const completedInquiries = items.filter((inquiry: InquiryType) => inquiry.status === 'completed');

  const renderInquiryItem = (inquiry: InquiryType) => (
    <button
      key={inquiry.id}
      onClick={() => setSelectedInquiry(inquiry)}
      className={cn(
        'flex w-full flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent',
        selectedInquiry?.id === inquiry.id && 'bg-muted'
      )}
    >
      <div className="flex w-full items-center justify-between">
        <span className="font-semibold">{inquiry.title}</span>
        <StateBadge status={inquiry.status} />
      </div>

      <div className="text-xs font-medium">{inquiry.category}</div>
      <div className="text-xs text-muted-foreground">{new Date(inquiry.createdAt).toLocaleString('ko-KR')}</div>
      <div className="line-clamp-2 text-xs text-muted-foreground">{inquiry.content}</div>
    </button>
  );

  return (
    <div className="h-[calc(100vh-4rem)] w-full overflow-hidden">
      <ResizablePanelGroup direction="horizontal" className="min-h-[800px] ">
        <ResizablePanel defaultSize={30} minSize={25}>
          <div className="flex h-full flex-col">
            <Tabs defaultValue="all" className="flex-1 overflow-hidden">
              <div className="p-4">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="all">전체</TabsTrigger>
                  <TabsTrigger value="pending">답변대기</TabsTrigger>
                  <TabsTrigger value="completed">완료</TabsTrigger>
                </TabsList>
              </div>

              <ScrollArea className="h-0 flex-1 pb-4 px-4">
                <TabsContent value="all">
                  <div className="flex flex-col gap-2">{items.map(renderInquiryItem)}</div>
                </TabsContent>
                <TabsContent value="pending">
                  <div className="flex flex-col gap-2">{pendingInquiries.map(renderInquiryItem)}</div>
                </TabsContent>
                <TabsContent value="completed">
                  <div className="flex flex-col gap-2">{completedInquiries.map(renderInquiryItem)}</div>
                </TabsContent>
              </ScrollArea>
            </Tabs>
          </div>
        </ResizablePanel>

        <ResizableHandle withHandle />

        <ResizablePanel defaultSize={70}>
          <div className="flex h-full items-center justify-center">
            {selectedInquiry ? (
              <div className="flex h-full w-full flex-col">
                <div className="border-b p-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-semibold tracking-tight">{selectedInquiry.title}</h2>
                    <StateBadge status={selectedInquiry.status} />
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {new Date(selectedInquiry.createdAt).toLocaleString('ko-KR')}
                  </p>
                </div>

                <ScrollArea className="h-0 flex-1 px-6">
                  <div className="space-y-8 py-6">
                    <CustomerInformation inquiry={selectedInquiry} />
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

                <div className="border-t px-6 py-4">
                  <Button asChild>
                    <Link href={`/inquiry/${selectedInquiry.id}`}>
                      <SquareArrowOutUpRight />
                      상세정보
                    </Link>
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center text-muted-foreground">
                <p>왼쪽 목록에서 문의를 선택하세요.</p>
              </div>
            )}
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
