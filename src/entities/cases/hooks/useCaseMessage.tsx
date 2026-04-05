import { useSuspenseQuery } from '@tanstack/react-query';
import { queryOptions } from '../api/queryOptions';

export const useCaseMessage = (caseId: number) => {
  return useSuspenseQuery(queryOptions.getMessages(caseId));
};
