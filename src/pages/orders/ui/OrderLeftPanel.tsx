'use client';
import { ScrollArea } from '@/shared/ui/scroll-area';
import { Input } from '@/shared/ui/input';
import { useState } from 'react';
import { OrderType } from '@/shared/types/order';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';

interface OrderLeftPanelProps {
  items: OrderType[];
  selectedOrder: OrderType | null;
  setSelectedOrder: (order: OrderType) => void;
}
export function OrderLeftPanel({ items, selectedOrder, setSelectedOrder }: OrderLeftPanelProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = items.filter(order => String(order.order_id).toLowerCase().includes(searchTerm.toLowerCase()));

  const preparingOrders = filteredItems.filter(order => order.status === '준비');
  const shippingOrders = filteredItems.filter(order => order.status === '배송');
  const completedOrders = filteredItems.filter(order => order.status === '완료');
  const returnedOrders = filteredItems.filter(order => order.status === '반품');
  const canceledOrders = filteredItems.filter(order => order.status === '취소');

  const renderOrderItem = (order: OrderType) => (
    <div
      key={order.order_id}
      onMouseEnter={() => setSelectedOrder(order)}
      className={`hover:bg-accent flex w-full cursor-pointer flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all ${
        selectedOrder?.order_id === order.order_id ? 'bg-muted' : ''
      }`}
    >
      <div className="flex w-full items-center justify-between gap-1">
        <span className="text-base font-semibold">주문 번호: {order.order_id}</span>
        <span className="bg-secondary/50 rounded-md px-2 py-1 text-xs font-medium">{order.status}</span>
      </div>
      <div className="text-muted-foreground text-xs font-medium">결제 금액: {order.total_price.toLocaleString('ko-KR')}원</div>
    </div>
  );

  const renderOrderList = (orderList: OrderType[]) => {
    if (orderList.length === 0) {
      return <div className="text-muted-foreground flex h-32 flex-col items-center justify-center text-sm">조회된 주문이 없습니다.</div>;
    }
    return <div className="flex flex-col gap-2">{orderList.map(renderOrderItem)}</div>;
  };

  return (
    <div className="flex h-full flex-col pt-3">
      <Tabs defaultValue="전체" className="flex flex-1 flex-col overflow-hidden">
        <div className="px-4 py-4">
          <Input type="search" placeholder="주문 번호로 검색..." className="mb-4" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="전체">전체</TabsTrigger>
            <TabsTrigger value="준비">준비</TabsTrigger>
            <TabsTrigger value="배송">배송</TabsTrigger>
            <TabsTrigger value="완료">완료</TabsTrigger>
            <TabsTrigger value="반품">반품</TabsTrigger>
            <TabsTrigger value="취소">취소</TabsTrigger>
          </TabsList>
        </div>

        <ScrollArea className="h-0 flex-1 px-4 pb-4">
          <div className="flex flex-col gap-2">
            <TabsContent value="전체" className="mt-0">
              {renderOrderList(filteredItems)}
            </TabsContent>
            <TabsContent value="준비" className="mt-0">
              {renderOrderList(preparingOrders)}
            </TabsContent>
            <TabsContent value="배송" className="mt-0">
              {renderOrderList(shippingOrders)}
            </TabsContent>
            <TabsContent value="완료" className="mt-0">
              {renderOrderList(completedOrders)}
            </TabsContent>
            <TabsContent value="반품" className="mt-0">
              {renderOrderList(returnedOrders)}
            </TabsContent>
            <TabsContent value="취소" className="mt-0">
              {renderOrderList(canceledOrders)}
            </TabsContent>
          </div>
        </ScrollArea>
      </Tabs>
    </div>
  );
}
