import { http } from '@/shared/lib/http';
import { AuthResponse } from '../types';

export const authAPI = {
  getAuth: () => http.get<AuthResponse>('/auth/status'),
};
