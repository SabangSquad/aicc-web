import { MembershipLevel } from '../types/membership';

export const membershipLabels: Record<MembershipLevel, string> = {
  BRONZE: '브론즈',
  SILVER: '실버',
  GOLD: '골드',
  VVIP: 'VVIP',
  VIP: 'VIP',
};
export const membershipColors: Record<MembershipLevel, { bg: string; text: string }> = {
  BRONZE: { bg: 'bg-amber-100', text: 'text-amber-800' },
  SILVER: { bg: 'bg-gray-200', text: 'text-gray-800' },
  GOLD: { bg: 'bg-yellow-200', text: 'text-yellow-800' },
  VVIP: { bg: 'bg-purple-200', text: 'text-purple-800' },
  VIP: { bg: 'bg-red-200', text: 'text-red-800' },
};
