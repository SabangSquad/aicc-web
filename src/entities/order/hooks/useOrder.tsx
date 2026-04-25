import { useSuspenseQuery } from '@tanstack/react-query';
import { queryOptions } from '../api/queryOption';

export const useShipment = (order_id: number) => {
  return useSuspenseQuery(queryOptions.getShipments(order_id));
};
