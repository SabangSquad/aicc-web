import { casesAPI } from './api';

const queryKeys = {
  cases: (case_id: number) => ['cases', case_id],
  satisfactions: (case_id: number) => ['satisfactions', case_id],
  messages: (case_id: number) => ['messages', case_id],
};

export const queryOptions = {
  getSatisfactions: (case_id: number) => ({
    queryKey: queryKeys.satisfactions(case_id),
    queryFn: () => casesAPI.getSatisfactions(case_id),
  }),
  getMessages: (case_id: number) => ({
    queryKey: queryKeys.messages(case_id),
    queryFn: () => casesAPI.getMessages(case_id),
  }),
  getCase: (case_id: number) => ({
    queryKey: queryKeys.cases(case_id),
    queryFn: () => casesAPI.getCase(case_id),
  }),
};
