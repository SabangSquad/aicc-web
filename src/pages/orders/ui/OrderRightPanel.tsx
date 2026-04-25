'use client';
import { ScrollArea } from '@/shared/ui/scroll-area';
import { motion } from 'motion/react';
import { OrderType } from '@/shared/types/order';
import { ShipmentItem } from '@/features/shipments';
import { CustomerInformation } from '@/features/cases';

export function OrderRightPanel({ selectedOrder }: { selectedOrder: OrderType | null }) {
  if (!selectedOrder) {
    return (
      <div className="bg-muted/10 flex h-full items-center justify-center">
        <motion.div
          className="flex flex-col items-center gap-4 text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="space-y-1">
            <h3 className="text-lg font-medium tracking-tight">선택된 주문이 없습니다</h3>
            <p className="text-muted-foreground text-sm">
              왼쪽 목록에서 주문에 마우스를 올리면
              <br />
              배송 정보와 상세 내역을 확인할 수 있습니다.
            </p>
          </div>
        </motion.div>
      </div>
    );
  }
  return (
    <div className="flex h-full items-center justify-center">
      <div className="flex h-full w-full flex-col">
        <div className="border-b p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold tracking-tight">주문 번호: {selectedOrder.order_id}</h2>
            <div className="flex items-center gap-2">
              <span className="rounded-md bg-gray-100 px-3 py-1 text-sm font-medium">{selectedOrder.status}</span>
            </div>
          </div>
        </div>

        <ScrollArea className="h-0 flex-1 px-6">
          <motion.div
            className="space-y-8 py-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            key={selectedOrder.order_id}
          >
            {selectedOrder.customer_id && <CustomerInformation customerId={selectedOrder.customer_id} />}
            <ShipmentItem order_id={selectedOrder.order_id} />
          </motion.div>
        </ScrollArea>
      </div>
    </div>
  );
}
