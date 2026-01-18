import { InquiryAPI } from './api';

const queryKeys = {
  agentInquiries: (agentId: number) => ['agentInquiries', agentId] as const,
  customerInfo: (customerId: number | string) => ['customerInfo', customerId] as const,
  customerCases: (customerId: number | string) => ['customerCases', customerId] as const,
  caseMessages: (caseId: number | string) => ['caseMessages', caseId] as const,
};

export const queryOptions = {
  agentInquiries: (agentId: number) => ({
    queryKey: queryKeys.agentInquiries(agentId),
    queryFn: () => InquiryAPI.getListByAgent(agentId),
  }),
  customerInfo: (customerId: number | string) => ({
    queryKey: queryKeys.customerInfo(customerId),
    queryFn: () => InquiryAPI.getCustomer(customerId),
  }),
  customerCases: (customerId: number | string) => ({
    queryKey: queryKeys.customerCases(customerId),
    queryFn: () => InquiryAPI.getCustomerCases(customerId),
  }),
  caseMessages: (caseId: number | string) => ({
    queryKey: queryKeys.caseMessages(caseId),
    queryFn: () => InquiryAPI.getMessages(caseId),
  }),
};
