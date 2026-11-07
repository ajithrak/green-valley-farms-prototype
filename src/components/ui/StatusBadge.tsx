import React from 'react';
import { Icon } from './Icon';

export const StatusBadge: React.FC<{ type: 'plot' | 'lead'; status: string; size?: 'sm' | 'md' }> = ({
  type,
  status,
  size = 'md',
}) => {
  const plotConfigs: Record<string, { label: string; badgeClass: string; icon: string }> = {
    available: {
      label: 'Available',
      badgeClass: 'bg-emerald-100 text-emerald-900 border-emerald-300',
      icon: 'checkCircle2',
    },
    pending: {
      label: 'Reservation pending',
      badgeClass: 'bg-amber-100 text-amber-950 border-amber-300',
      icon: 'clock',
    },
    booked: { label: 'Booked', badgeClass: 'bg-blue-100 text-blue-950 border-blue-300', icon: 'bookmarkCheck' },
    sold: { label: 'Sold', badgeClass: 'bg-red-100 text-red-950 border-red-300', icon: 'lock' },
    blocked: { label: 'Blocked', badgeClass: 'bg-gray-200 text-gray-800 border-gray-300', icon: 'shieldAlert' },
  };

  const leadConfigs: Record<string, { label: string; badgeClass: string; icon: string }> = {
    New: { label: 'New Lead', badgeClass: 'bg-teal-100 text-teal-950 border-teal-300', icon: 'sprout' },
    Contacted: { label: 'Contacted', badgeClass: 'bg-indigo-100 text-indigo-950 border-indigo-300', icon: 'phone' },
    'Visit Scheduled': {
      label: 'Visit Scheduled',
      badgeClass: 'bg-purple-100 text-purple-950 border-purple-300',
      icon: 'calendar',
    },
    'Visit Completed': {
      label: 'Visit Completed',
      badgeClass: 'bg-amber-100 text-amber-950 border-amber-300',
      icon: 'shieldCheck',
    },
    Negotiation: { label: 'Negotiation', badgeClass: 'bg-blue-100 text-blue-950 border-blue-300', icon: 'barChart' },
    Converted: {
      label: 'Converted',
      badgeClass: 'bg-emerald-100 text-emerald-950 border-emerald-300',
      icon: 'checkCircle2',
    },
    Lost: { label: 'Lost', badgeClass: 'bg-rose-100 text-rose-950 border-rose-300', icon: 'xCircle' },
  };

  const config =
    type === 'plot' ? plotConfigs[status] || plotConfigs.available : leadConfigs[status] || leadConfigs.New;
  const sizeClasses = size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-xs md:text-sm px-2.5 py-1';

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full border ${config.badgeClass} ${sizeClasses}`}
      role="status"
    >
      <Icon name={config.icon} className={size === 'sm' ? 'w-3 h-3 mr-1' : 'w-3.5 h-3.5 mr-1.5'} />
      <span>{config.label}</span>
    </span>
  );
};
