import { useSuspenseQuery } from '@tanstack/react-query';
import { queryOptions } from '../api/queryOption';

export function useShipmentTracks(shipment_id: number) {
  return useSuspenseQuery(queryOptions.getTracks(shipment_id));
}
