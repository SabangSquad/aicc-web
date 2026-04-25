import { http } from '@/shared/lib/http';
import { ShipmentType } from '@/shared/types/order';

export const orderAPI = {
  getShipment: (order_id: number) => http.get<{ data: ShipmentType[] }>(`/orders/${order_id}/shipments/`).then(res => res.data || []),
};
