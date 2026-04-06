import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { queryOptions, queryKeys } from '../api/queryOptions';
import { storeAPI } from '../api/api';

export function useAISolution(store_id: number) {
  return useSuspenseQuery(queryOptions.getSolution(store_id));
}

export function useStoreInformation(store_id: number) {
  return useSuspenseQuery(queryOptions.getStoreInfomation(store_id));
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
