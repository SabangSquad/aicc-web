import { useSuspenseQuery } from '@tanstack/react-query';
import { queryOptions } from '../api/queryOption';

export const useAuth = () => {
  return useSuspenseQuery({
    ...queryOptions.getAuth(),
    select: data => ({
      ...data,
      user: {
        ...data.user,
        store_id: data.user?.store_id ?? 2, // 일단 기본값
        customer_id: data.user?.customer_id ?? 2,
      },
    }),
  });
};
