import { shipmentAPI } from './api';
export const queryKeys = {
  tracks: (shipment_id: number) => ['tracks', shipment_id],
};

export const queryOptions = {
  getTracks: (shipment_id: number) => ({
    queryKey: queryKeys.tracks(shipment_id),
    queryFn: () => shipmentAPI.getTrack(shipment_id),
  }),
};
