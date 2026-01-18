import { useSuspenseQuery } from '@tanstack/react-query';
import { queryOptions } from '../api/queryOptions';

export function useManuals(category: string) {
  return useSuspenseQuery(queryOptions.manuals(category));
}
