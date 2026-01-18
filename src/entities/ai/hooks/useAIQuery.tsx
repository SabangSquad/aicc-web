import { useSuspenseQuery } from '@tanstack/react-query';
import { queryOptions } from '../api/queryOptions';

export function useAIAssist(caseId: number) {
  return useSuspenseQuery(queryOptions.aiAssist(caseId));
}
