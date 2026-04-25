import { orderAPI } from './api';

export const queryKeys = {
  shipments: (order_id: number) => ['shipments', order_id],
  orderItems: (order_id: number) => ['orderItems', order_id],
};

export const queryOptions = {
  getShipments: (order_id: number) => ({
    queryKey: queryKeys.shipments(order_id),
    queryFn: () => orderAPI.getShipment(order_id),
  }),
  getOrderItems: (order_id: number) => ({
    queryKey: queryKeys.orderItems(order_id),
    queryFn: () => orderAPI.getOrderItems(order_id),
  }),
};
