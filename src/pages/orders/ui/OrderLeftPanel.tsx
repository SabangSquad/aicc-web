'use client';
import { ScrollArea } from '@/shared/ui/scroll-area';
import { Input } from '@/shared/ui/input';
import { useState } from 'react';
import { OrderType } from '@/shared/types/order';

interface OrderLeftPanelProps {
  items: OrderType[];
  selectedOrder: OrderType | null;
  setSelectedOrder: (order: OrderType) => void;
}

export function OrderLeftPanel({ items, selectedOrder, setSelectedOrder }: OrderLeftPanelProps) {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="flex h-full flex-col pt-3">
      <div className="px-4 py-4">
        <Input type="search" placeholder="주문 번호로 검색..." className="mb-4" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
      </div>

      <ScrollArea className="h-0 flex-1 px-4 pb-4">
        <div className="flex flex-col gap-2">
          {items.map(order => (
            <div
              key={order.order_id}
              // 핵심: Hover 시 상태 업데이트
              onMouseEnter={() => setSelectedOrder(order)}
              className={`hover:bg-accent flex w-full cursor-pointer flex-col items-start gap-1 rounded-lg border p-3 text-left text-sm transition-all ${
                selectedOrder?.order_id === order.order_id ? 'bg-muted border-primary' : ''
              }`}
            >
              <div className="flex w-full items-center justify-between gap-1">
                <span className="font-semibold">주문 번호: {order.order_id}</span>
                <span className="rounded-md bg-gray-100 px-2 py-1 text-xs">{order.status}</span>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
