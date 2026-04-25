'use client';
import { useShipment } from '@/entities/order';

export const ShipmentItem = ({ order_id }: { order_id: number }) => {
  const { data } = useShipment(order_id);

  if (data.length === 0) {
    return <div className="text-muted-foreground p-4 text-sm">조회된 배송 정보가 없습니다.</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-semibold tracking-tight">배송 상세 정보 ({data.length}건)</h3>

      <div className="flex flex-col gap-3">
        {data.map(shipment => (
          <div key={shipment.shipment_id} className="hover:bg-muted/50 flex flex-col gap-3 rounded-lg border p-4 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-primary font-bold">{shipment.carrier}</span>
              <span className="bg-secondary rounded-md px-2.5 py-1 font-mono text-xs font-medium">{shipment.tracking_no}</span>
            </div>

            <div className="bg-muted/30 grid grid-cols-2 gap-4 rounded-md p-3 text-sm">
              <div className="flex flex-col gap-1">
                <span className="text-muted-foreground text-xs font-medium">발송 기한 (Promised)</span>
                <span className="font-medium">
                  {new Date(shipment.promised_at).toLocaleString('ko-KR', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-muted-foreground text-xs font-medium">배송 완료일 (Delivered)</span>
                <span className="font-medium">
                  {shipment.delivered_at
                    ? new Date(shipment.delivered_at).toLocaleString('ko-KR', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                      })
                    : '-'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
