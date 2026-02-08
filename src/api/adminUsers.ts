import { apiGet } from './client';
import { AdminViewUser } from '../types/adminView';

export const getAdminUsers = async (): Promise<AdminViewUser[]> => {
  return apiGet<AdminViewUser[]>('/api/admin/users');
};
