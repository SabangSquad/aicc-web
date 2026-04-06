import { http } from '@/shared/lib/http';
import { AISolutionType, StoreType } from '../types';
import { CaseType } from '@/shared/types/case';
import { OrderType } from '@/shared/types/order';
import { ManualType } from '@/shared/types/manual';
import { ReservationType } from '@/shared/types/reservation';
import { SatisfactionType } from '@/shared/types/satisfaction';
import { ProductType } from '@/shared/types/product';

export const storeAPI = {
  getStoreInfomation: (store_id: number) => http.get<StoreType>(`/stores/${store_id}`),

  getCases: (store_id: number) => http.get<{ data: CaseType[] }>(`/stores/${store_id}/cases`).then(res => res.data || []),

  getSatisfactions: (store_id: number) => http.get<{ data: SatisfactionType[] }>(`/stores/${store_id}/satisfaction`),

  getOrders: (store_id: number) => http.get<{ data: OrderType[] }>(`/stores/${store_id}/orders`),

  getReservations: (store_id: number) => http.get<{ data: ReservationType[] }>(`/stores/${store_id}/reservations`),

  getManuals: (store_id: number) => http.get<{ data: ManualType[] }>(`/stores/${store_id}/manuals`),

  getProducts: (store_id: number) => http.get<{ data: ProductType[] }>(`/stores/${store_id}/products`),

  getSolution: (store_id: number) => http.get<AISolutionType>(`/stores/${store_id}/solutions?hours=24`),

  patchStoreInformation: ({ store_id, data }: { store_id: number; data: StoreType }) => http.patch(`/stores/${store_id}`, data),
};
