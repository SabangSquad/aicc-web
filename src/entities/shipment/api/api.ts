import { http } from '@/shared/lib/http';
import { TrackType } from '@/shared/types/order';

export const shipmentAPI = {
  getTrack: (shipment_id: number) => http.get<{ data: TrackType[] }>(`/shipments/${shipment_id}/tracks`).then(res => res.data || []),
};
