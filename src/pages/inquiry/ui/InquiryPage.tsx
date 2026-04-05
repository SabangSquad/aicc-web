'use client';
import { Suspense, useState } from 'react';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/shared/ui/resizable';

import { LeftPanel } from './LeftPanel';
import { RightPanel } from './RightPanel';
import { RightPanelSkeleton } from './Skeleton';
import { CaseType } from '@/shared/types/case';

export function InquiryPage({ items }: { items: CaseType[] }) {
  const [selectedInquiry, setSelectedInquiry] = useState<CaseType | null>(null);

  return (
    <div className="-mx-10 -my-12 h-screen w-full overflow-hidden">
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
