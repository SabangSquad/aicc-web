'use client';
import { useState } from 'react';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/shared/ui/resizable';
import { InquiryType } from '@/shared/types/inquiry';

import { LeftPanel } from './LeftPanel';
import { RightPanel } from './RightPanel';

export function InquiryPage({ items }: { items: InquiryType[] }) {
  const [selectedInquiry, setSelectedInquiry] = useState<InquiryType | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="w-full h-screen overflow-hidden">
      <ResizablePanelGroup direction="horizontal" className="min-h-[800px]">
        <ResizablePanel defaultSize={30} minSize={25}>
          <LeftPanel
            items={items}
            selectedInquiry={selectedInquiry}
            setSelectedInquiry={setSelectedInquiry}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </ResizablePanel>

        <ResizableHandle withHandle />

        <ResizablePanel defaultSize={70}>
          <RightPanel selectedInquiry={selectedInquiry} />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
