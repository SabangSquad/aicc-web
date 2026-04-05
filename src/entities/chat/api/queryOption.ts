import { chatAPI } from './api';

const queryKeys = {
  summary: (case_id: number) => ['chatSummary', case_id] as const,
};

export const queryOptions = {
  getSummary: (case_id: number) => ({
    queryKey: queryKeys.summary(case_id),
    queryFn: () => chatAPI.getSummary(case_id),
  }),
};
