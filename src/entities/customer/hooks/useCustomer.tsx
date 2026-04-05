import { useSuspenseQuery } from '@tanstack/react-query';
import { queryOptions } from '../api/queryOptions';

export const useCustomerInfo = (customerId: number) => {
  return useSuspenseQuery(queryOptions.getCustomerInfo(customerId));
};
export const useCustomerPastInquiries = (customerId: number) => {
  return useSuspenseQuery(queryOptions.getPastInquiries(customerId));
};
