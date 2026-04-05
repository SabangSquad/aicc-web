import { useSuspenseQuery } from '@tanstack/react-query';
import { queryOptions } from '../api/queryOptions';

export const useCaseSatisfaction = (caseId: number) => {
  return useSuspenseQuery(queryOptions.getSatisfactions(caseId));
};
