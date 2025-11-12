'use client';

import Link from 'next/link';
import { ScrollArea } from '@/shared/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';
import { Input } from '@/shared/ui/input';
import { StateBadge } from '@/entities/inquiry/ui/StateBadge';
import { InquiryType } from '@/shared/types/inquiry';

export function LeftPanel({
  items,
  selectedInquiry,
  setSelectedInquiry,
  searchTerm,
  setSearchTerm,
}: {
  items: InquiryType[];
  selectedInquiry: InquiryType | null;
  setSelectedInquiry: (inquiry: InquiryType) => void;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}) {
  const filteredItems = items.filter(inquiry => inquiry.title.toLowerCase().includes(searchTerm.toLowerCase()));

  const pendingInquiries = filteredItems.filter(inquiry => inquiry.status === '대기');
  const ongoingInquiries = filteredItems.filter(inquiry => inquiry.status === '상담');
  const completedInquiries = filteredItems.filter(inquiry => inquiry.status === '종료');

  const renderInquiryItem = (inquiry: InquiryType) => (
    <Link
      key={inquiry.case_id}
      href={`/inquiry/${inquiry.case_id}`}
      onMouseEnter={() => setSelectedInquiry(inquiry)}
      className={`flex w-full flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent ${
        selectedInquiry?.case_id === inquiry.case_id && 'bg-muted'
      }`}
    >
      <div className="flex items-center justify-between w-full">
        <span className="font-semibold">{inquiry.title}</span>
        <StateBadge status={inquiry.status} />
      </div>

      <div className="text-xs font-medium">{inquiry.category}</div>
      <div className="text-xs line-clamp-2 text-muted-foreground">{inquiry.content}</div>
      <div className="text-xs text-muted-foreground">{new Date(inquiry.created_at).toLocaleString('ko-KR')}</div>
    </Link>
  );

  return (
    <div className="flex flex-col h-full">
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
            <TabsTrigger value="종료">종료</TabsTrigger>
          </TabsList>
        </div>

        <ScrollArea className="flex-1 h-0 px-4 pb-4">
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
  );
}
