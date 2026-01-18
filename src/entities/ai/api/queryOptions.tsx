import { AiAPI } from './api';

const queryKeys = {
  aiAssist: () => ['aiAssist'] as const,
};
export const queryOptions = {
  aiAssist: (caseId: number) => ({
    queryKey: [...queryKeys.aiAssist(), caseId],
    queryFn: () => AiAPI.getListByAgent(caseId),
  }),
};
