import { useSuspenseQuery } from '@tanstack/react-query';
import { queryOptions } from '../api/queryOptions';

export function useAgentInquiries(agentId: number) {
  return useSuspenseQuery(queryOptions.agentInquiries(agentId));
}

export function useCustomerInfo(customerId: number | string) {
  return useSuspenseQuery(queryOptions.customerInfo(customerId));
}

export function useCustomerCase(customerId: number | string) {
  return useSuspenseQuery(queryOptions.customerCases(customerId));
}

export function useCaseMessages(caseId: number | string) {
  return useSuspenseQuery(queryOptions.caseMessages(caseId));
}
