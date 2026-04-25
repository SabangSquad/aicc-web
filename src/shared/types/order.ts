export interface OrderType {
  readonly order_id: number;
  readonly customer_id: number | null;
  readonly store_id: number;
  readonly order_at: string;
  readonly total_price: number;
  status: '준비' | '배송' | '완료' | '반품' | '취소';
}

export interface ShipmentType {
  readonly shipment_id: number;
  readonly order_id: number;
  readonly store_id: number;
  readonly tracking_no: string;
  readonly promised_at: string;
  readonly delivered_at: string | null;
  carrier: string;
}

export interface OrderItemType {
  readonly item_id: number;
  readonly order_id: number;
  readonly product_id: number;
  quantity: number;
  total_price: number;
}

export interface TrackType {
  readonly track_id: number;
  readonly shipment_id: number;
  readonly event_at: string;
  readonly event_type: string;
  readonly location: string;
}
