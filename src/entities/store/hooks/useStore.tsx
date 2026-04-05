import { useSuspenseQuery } from '@tanstack/react-query';
import { queryOptions } from '../api/queryOptions';

export function useAISolution(store_id: number) {
  return useSuspenseQuery(queryOptions.getSolution(store_id));
}
