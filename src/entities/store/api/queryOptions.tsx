import { storeAPI } from './api';

export const queryKeys = {
  storeInfomation: (store_id: number) => ['storeInfomation', store_id],
  cases: (store_id: number) => ['cases', store_id],
  satisfactions: (store_id: number) => ['satisfactions', store_id],
  reservations: () => ['reservations'],
  products: () => ['products'],
  solution: (store_id: number) => ['solution', store_id],
  manuals: () => ['manuals'],
  orders: () => ['orders'],
};

export const queryOptions = {
  getStoreInfomation: (store_id: number) => ({
    queryKey: queryKeys.storeInfomation(store_id),
    queryFn: () => storeAPI.getStoreInfomation(store_id),
  }),
  getCases: (store_id: number) => ({
    queryKey: queryKeys.cases(store_id),
    queryFn: () => storeAPI.getCases(store_id),
  }),
  getSatisfactions: (store_id: number) => ({
    queryKey: queryKeys.satisfactions(store_id),
    queryFn: () => storeAPI.getSatisfactions(store_id),
  }),
  getReservations: (store_id: number) => ({
    queryKey: queryKeys.reservations(),
    queryFn: () => storeAPI.getReservations(store_id),
  }),
  getProducts: (store_id: number) => ({
    queryKey: queryKeys.products(),
    queryFn: () => storeAPI.getProducts(store_id),
  }),
  getSolution: (store_id: number) => ({
    queryKey: queryKeys.solution(store_id),
    queryFn: () => storeAPI.getSolution(store_id),
  }),
  getManuals: (store_id: number) => ({
    queryKey: queryKeys.manuals(),
    queryFn: () => storeAPI.getManuals(store_id),
  }),
  getOrders: (store_id: number) => ({
    queryKey: queryKeys.orders(),
    queryFn: () => storeAPI.getOrders(store_id),
  }),
};
