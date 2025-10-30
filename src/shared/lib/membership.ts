import { MembershipLevel } from '../types/membership';

export const membershipLabels: Record<MembershipLevel, string> = {
  bronze: '브론즈',
  silver: '실버',
  gold: '골드',
};
export const membershipColors: Record<MembershipLevel, { bg: string; text: string }> = {
  bronze: { bg: 'bg-amber-100', text: 'text-amber-800' },
  silver: { bg: 'bg-gray-200', text: 'text-gray-800' },
  gold: { bg: 'bg-yellow-200', text: 'text-yellow-800' },
};
