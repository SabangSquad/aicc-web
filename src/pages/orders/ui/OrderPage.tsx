'use client';
import { Suspense, useMemo, useState } from 'react';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/shared/ui/resizable';
import { useAuth } from '@/entities/auth';
import { useOrders } from '@/entities/store';

import { OrderLeftPanel } from './OrderLeftPanel';
import { OrderRightPanel } from './OrderRightPanel';
import { OrderType } from '@/shared/types/order';

export function OrderPage() {
  const { data: authData } = useAuth();
  const { data: orders } = useOrders(authData.user.store_id);
  const [selectedOrder, setSelectedOrder] = useState<OrderType | null>(null);

  return (
    <div className="-my-12 h-screen w-full overflow-hidden">
      <ResizablePanelGroup direction="horizontal" className="min-h-[800px]">
        {/* 왼쪽 패널 (주문 리스트) */}
        <ResizablePanel defaultSize={30} minSize={25}>
          <OrderLeftPanel items={orders} selectedOrder={selectedOrder} setSelectedOrder={setSelectedOrder} />
        </ResizablePanel>

        <ResizableHandle withHandle />

        {/* 오른쪽 패널 (상세 정보 및 배송 API) */}
        <ResizablePanel defaultSize={70}>
          <Suspense fallback={<div className="flex h-full items-center justify-center">불러오는 중...</div>}>
            <OrderRightPanel selectedOrder={selectedOrder} />
          </Suspense>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
