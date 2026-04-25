import { orderAPI } from './api';
export const queryKeys = {
  shipments: (order_id: number) => ['shipments', order_id],
};

export const queryOptions = {
  getShipments: (order_id: number) => ({
    queryKey: queryKeys.shipments(order_id),
    queryFn: () => orderAPI.getShipment(order_id),
  }),
};
