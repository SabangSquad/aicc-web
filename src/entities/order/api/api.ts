import { http } from '@/shared/lib/http';
import { OrderItemType, ShipmentType } from '@/shared/types/order';

export const orderAPI = {
  getShipment: (order_id: number) => http.get<{ data: ShipmentType[] }>(`/orders/${order_id}/shipments/`).then(res => res.data || []),
  getOrderItems: (order_id: number) => http.get<{ data: OrderItemType[] }>(`/orders/${order_id}/items`).then(res => res.data || []),
};
