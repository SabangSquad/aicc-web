import { MembershipLevel } from './membership';

export type Customer = {
  customer_id: number;
  name: string;
  address: string;
  phone: string;
  email: string;
  joined_at: string;
  points: number;
  grade: MembershipLevel;
};
