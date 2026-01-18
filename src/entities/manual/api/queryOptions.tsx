import { ManualsAPI } from './api';

const queryKeys = {
  manuals: (category: string) => ['manuals', category] as const,
};

export const queryOptions = {
  manuals: (category: string) => ({
    queryKey: queryKeys.manuals(category),
    queryFn: () => ManualsAPI.getManuals(category),
  }),
};
