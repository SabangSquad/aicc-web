import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { queryOptions, queryKeys } from '../api/queryOptions';
import { storeAPI } from '../api/api';

export function useAISolution(store_id: number) {
  return useSuspenseQuery(queryOptions.getSolution(store_id));
}

export function useStoreInformation(store_id: number) {
  return useSuspenseQuery(queryOptions.getStoreInfomation(store_id));
}

export function useManuals(store_id: number) {
  return useSuspenseQuery(queryOptions.getManuals(store_id));
}

export function useCases(store_id: number) {
  return useSuspenseQuery(queryOptions.getCases(store_id));
}

export function useReservations(store_id: number) {
  return useSuspenseQuery(queryOptions.getReservations(store_id));
}

export function useSatisfactions(store_id: number) {
  return useSuspenseQuery(queryOptions.getSatisfactions(store_id));
}

export function useProducts(store_id: number) {
  return useSuspenseQuery(queryOptions.getProducts(store_id));
}

export function useOrders(store_id: number) {
  return useSuspenseQuery(queryOptions.getOrders(store_id));
}

export function useStoreAction(store_id: number) {
  const queryClient = useQueryClient();

  const invalidateQuery = (store_id: number) => {
    queryClient.invalidateQueries({ queryKey: queryKeys.storeInfomation(store_id) });
  };

  const editMutation = useMutation({
    mutationFn: storeAPI.patchStoreInformation,
    onSuccess: () => invalidateQuery(store_id),
  });

  return { editMutation };
}

export function useManualsAction() {
  const queryClient = useQueryClient();

  const invalidateQuery = () => {
    queryClient.invalidateQueries({ queryKey: queryKeys.manuals() });
  };

  const addMutation = useMutation({
    mutationFn: storeAPI.postManuals,
    onSuccess: () => invalidateQuery(),
  });

  const editMutation = useMutation({
    mutationFn: storeAPI.patchManuals,
    onSuccess: () => invalidateQuery(),
  });

  return { addMutation, editMutation };
}

export function useProductsAction() {
  const queryClient = useQueryClient();

  const invalidateQuery = () => {
    queryClient.invalidateQueries({ queryKey: queryKeys.products() });
  };

  const addMutation = useMutation({
    mutationFn: storeAPI.postProducts,
    onSuccess: () => invalidateQuery(),
  });

  return { addMutation };
}
