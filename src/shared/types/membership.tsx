export type MembershipLevel = '브론즈' | '실버' | '골드';

// Membership level colors
export const membershipColors: Record<MembershipLevel, { bg: string; text: string }> = {
  브론즈: { bg: 'bg-amber-100', text: 'text-amber-800' },
  실버: { bg: 'bg-gray-200', text: 'text-gray-800' },
  골드: { bg: 'bg-yellow-200', text: 'text-yellow-800' },
};
