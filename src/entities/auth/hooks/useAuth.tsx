import { useSuspenseQuery } from '@tanstack/react-query';
import { queryOptions } from '../api/queryOption';

export const useAuth = () => {
  return useSuspenseQuery({
    ...queryOptions.getAuth(),
  });
};
