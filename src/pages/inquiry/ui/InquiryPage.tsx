'use client';
import { Suspense, useMemo, useState } from 'react';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/shared/ui/resizable';

import { LeftPanel } from './LeftPanel';
import { RightPanel } from './RightPanel';
import { RightPanelSkeleton } from './Skeleton';
import { CaseType } from '@/shared/types/case';
import { useCases } from '@/entities/store';

export function InquiryPage() {
  const { data } = useCases(1);

  const items = useMemo(() => {
    if (!data) return [];

    return [...data].sort((a, b) => {
      if (a.status === '대기' && b.status !== '대기') return -1;
      if (a.status !== '대기' && b.status === '대기') return 1;
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });
  }, [data]);

  const [selectedInquiry, setSelectedInquiry] = useState<CaseType | null>(null);

  return (
    <div className="-my-12 h-screen w-full overflow-hidden">
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
