import { customerAPI } from './api';

export const queryKeys = {
  customerInfo: (customer_id: number) => ['customer', customer_id],
  pastInquiries: (customer_id: number) => ['customer', customer_id, 'cases'],
};

export const queryOptions = {
  getCustomerInfo: (customer_id: number) => ({
    queryKey: queryKeys.customerInfo(customer_id),
    queryFn: () => customerAPI.getCustomerInfo(customer_id),
  }),
  getPastInquiries: (customer_id: number) => ({
    queryKey: queryKeys.pastInquiries(customer_id),
    queryFn: () => customerAPI.getPastInquiries(customer_id),
  }),
};
