'use client';
import { Suspense, useState } from 'react';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/shared/ui/resizable';
import { InquiryType } from '@/shared/types/inquiry';

import { LeftPanel } from './LeftPanel';
import { RightPanel } from './RightPanel';
import { RightPanelSkeleton } from './Skeleton';

export function InquiryPage({ items }: { items: InquiryType[] }) {
  const [selectedInquiry, setSelectedInquiry] = useState<InquiryType | null>(null);

  return (
    <div className="w-full h-screen overflow-hidden">
      <ResizablePanelGroup direction="horizontal" className="min-h-[800px]">
        <ResizablePanel defaultSize={30} minSize={25}>
          <LeftPanel items={items} selectedInquiry={selectedInquiry} setSelectedInquiry={setSelectedInquiry} />
        </ResizablePanel>

        <ResizableHandle withHandle />

        <ResizablePanel defaultSize={70}>
          <Suspense fallback={<RightPanelSkeleton />}>
            <RightPanel selectedInquiry={selectedInquiry} />
          </Suspense>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
