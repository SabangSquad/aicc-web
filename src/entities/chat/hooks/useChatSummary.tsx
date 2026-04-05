import { useSuspenseQuery } from '@tanstack/react-query';
import { queryOptions } from '../api/queryOption';

export const useChatSummary = (case_id: number) => {
  return useSuspenseQuery(queryOptions.getSummary(case_id));
};
