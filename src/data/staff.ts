import type { UserRole } from '@/types';

export const INITIAL_STAFF = [
  {
    id: 'staff-1',
    name: 'Rajesh Sharma',
    role: 'Admin' as UserRole,
    phone: '+91 98480 11001',
    commission: 0,
    activeLeadsCount: 2,
  },
  {
    id: 'staff-2',
    name: 'Venkat Rao',
    role: 'Sales Person' as UserRole,
    phone: '+91 98480 22002',
    commission: 87500,
    activeLeadsCount: 5,
  },
  {
    id: 'staff-3',
    name: 'K. Sridhar',
    role: 'Agent' as UserRole,
    phone: '+91 98480 33003',
    commission: 145000,
    activeLeadsCount: 3,
  },
  {
    id: 'staff-4',
    name: 'P. Chandrasekhar',
    role: 'Moderator' as UserRole,
    phone: '+91 98480 11003',
    commission: 0,
    activeLeadsCount: 1,
  },
];
