import { authAPI } from './api';

const queryKeys = {
  auth: ['auth'],
};

export const queryOptions = {
  getAuth: () => ({
    queryKey: queryKeys.auth,
    queryFn: () => authAPI.getAuth(),
  }),
};
