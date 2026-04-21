export interface AuthResponse {
  readonly isAuthenticated: boolean;
  user: {
    readonly store_id: number;
    readonly customer_id: number;
    readonly email: string;
    readonly role: 'ADMIN' | 'OWNER';
  };
}
