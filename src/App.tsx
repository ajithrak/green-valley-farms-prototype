import React, { useState, useMemo } from 'react';

// ==========================================
// 1. TYPES & DATA CONTRACTS
// ==========================================
export type PlotStatus = 'available' | 'pending' | 'booked' | 'sold' | 'blocked';
export type LeadStatus = 'New' | 'Contacted' | 'Visit Scheduled' | 'Visit Completed' | 'Negotiation' | 'Converted' | 'Lost';
export type UserRole = 'Admin' | 'Sales Person' | 'Agent' | 'Moderator';

export interface Plot {
  id: string;
  number: string;
  block: string;
  sizeSqYards: number;
  sizeAcres: string;
  facing: 'North' | 'South' | 'East' | 'West' | 'North-East';
  priceInr: number;
  status: PlotStatus;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Lead {
  id: string;
  name: string;
  phone: string;
  project: string;
  plotInterest: string;
  budgetInr: number;
  status: LeadStatus;
  source: string;
  ownerId: string;
  ownerName: string;
  ownerRole: UserRole;
  createdDate: string;
  nextFollowUpDate: string;
  isOverdue: boolean;
  leadAgeDays: number;
  consentWhatsApp: boolean;
  convertedPlot?: string;
  convertedPrice?: number;
  referredByAgentId?: string;
  assignedHistory?: Array<{ date: string; from: string; to: string; reason: string }>;
}

export interface TimelineEntry {
  id: string;
  timestamp: string;
  actor: string;
  channel: string;
  result: string;
  note: string;
  nextAction: string;
  nextFollowUpDate: string;
}

export interface SiteVisit {
  id: string;
  leadId: string;
  leadName: string;
  visitDate: string;
  visitTime: string;
  pickupLocation: string;
  status: 'Scheduled' | 'Confirmed' | 'Completed' | 'Cancelled';
  accompaniedBy: string;
  vehicleNumber: string;
  feedbackComment?: string;
  expenseAmount?: number;
  expenseProof?: string;
}

export interface HierarchyNode {
  id: string;
  name: string;
  level: number; // 1 to 15
  levelTitle: string;
  role: UserRole;
  reportsToId: string | null;
  phone: string;
  teamCount: number;
  unitsBooked: number;
  activeLeads: number;
  benefitsStatus: string;
  transferHistory: Array<{ date: string; fromRole: string; toRole: string; approver: string }>;
}

export interface OfferRule {
  id: string;
  name: string;
  project: string;
  status: 'draft' | 'scheduled' | 'active' | 'paused' | 'expired' | 'archived';
  startDate: string;
  endDate: string;
  targetDesignation: string;
  criteriaSummary: string;
  sampleBenefit: string;
  terms: string;
  version: number;
}

// ==========================================
// 2. CURRENCY & FORMATTING UTILITIES
// ==========================================
export function formatInr(amount: number): string {
  if (isNaN(amount)) return '₹0';
  const isNegative = amount < 0;
  const absAmount = Math.abs(Math.round(amount));
  const s = absAmount.toString();
  if (s.length <= 3) return (isNegative ? '-₹' : '₹') + s;
  const last3 = s.substring(s.length - 3);
  const remaining = s.substring(0, s.length - 3);
  const parts: string[] = [];
  let i = remaining.length;
  while (i > 0) {
    const start = Math.max(0, i - 2);
    parts.unshift(remaining.substring(start, i));
    i -= 2;
  }
  return (isNegative ? '-₹' : '₹') + parts.join(',') + ',' + last3;
}

// ==========================================
// 3. ACCESSIBLE SVG ICON ENGINE
// ==========================================
export const Icon: React.FC<{ name: string; className?: string }> = ({ name, className = "w-4 h-4" }) => {
  const common = { strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, fill: "none" };
  const icons: Record<string, React.ReactNode> = {
    sprout: (
      <path d="M7 20h10M12 20v-8M12 12c-3 0-6-3-6-7 4 0 7 3 7 7ZM12 12c3 0 6-3 6-7-4 0-7 3-7 7Z" stroke="currentColor" {...common} />
    ),
    shieldCheck: (
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10zM9 12l2 2 4-4" stroke="currentColor" {...common} />
    ),
    phone: (
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke="currentColor" {...common} />
    ),
    messageSquare: (
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" {...common} />
    ),
    calendar: (
      <path d="M19 4H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zM16 2v4M8 2v4M3 10h18" stroke="currentColor" {...common} />
    ),
    map: (
      <path d="M1 6v16l7-4 8 4 7-4V2l-7 4-8-4-7 4zM8 2v16M16 6v16" stroke="currentColor" {...common} />
    ),
    compass: (
      <React.Fragment>
        <path d="m16.24 7.76-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z" stroke="currentColor" {...common} />
        <circle cx="12" cy="12" r="10" stroke="currentColor" {...common} />
      </React.Fragment>
    ),
    droplets: (
      <path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.09 3 12.25c0 2.22 1.8 4.05 4 4.05z" stroke="currentColor" {...common} />
    ),
    checkCircle2: (
      <React.Fragment>
        <circle cx="12" cy="12" r="10" stroke="currentColor" {...common} />
        <path d="m9 12 2 2 4-4" stroke="currentColor" {...common} />
      </React.Fragment>
    ),
    clock: (
      <React.Fragment>
        <circle cx="12" cy="12" r="10" stroke="currentColor" {...common} />
        <polyline points="12 6 12 12 16 14" stroke="currentColor" {...common} />
      </React.Fragment>
    ),
    bookmarkCheck: (
      <React.Fragment>
        <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" stroke="currentColor" {...common} />
        <path d="m9 10 2 2 4-4" stroke="currentColor" {...common} />
      </React.Fragment>
    ),
    lock: (
      <React.Fragment>
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="currentColor" {...common} />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" {...common} />
      </React.Fragment>
    ),
    shieldAlert: (
      <React.Fragment>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" {...common} />
        <line x1="12" y1="8" x2="12" y2="12" stroke="currentColor" {...common} />
        <line x1="12" y1="16" x2="12.01" y2="16" stroke="currentColor" {...common} />
      </React.Fragment>
    ),
    users: (
      <React.Fragment>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" stroke="currentColor" {...common} />
        <circle cx="9" cy="7" r="4" stroke="currentColor" {...common} />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" {...common} />
      </React.Fragment>
    ),
    userCheck: (
      <React.Fragment>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" stroke="currentColor" {...common} />
        <circle cx="9" cy="7" r="4" stroke="currentColor" {...common} />
        <polyline points="16 11 18 13 22 9" stroke="currentColor" {...common} />
      </React.Fragment>
    ),
    bell: (
      <React.Fragment>
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="currentColor" {...common} />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="currentColor" {...common} />
      </React.Fragment>
    ),
    layers: (
      <React.Fragment>
        <polygon points="12 2 2 7 12 12 22 7 12 2" stroke="currentColor" {...common} />
        <polyline points="2 17 12 22 22 17" stroke="currentColor" {...common} />
        <polyline points="2 12 12 17 22 12" stroke="currentColor" {...common} />
      </React.Fragment>
    ),
    gitBranch: (
      <React.Fragment>
        <line x1="6" y1="3" x2="6" y2="15" stroke="currentColor" {...common} />
        <circle cx="18" cy="6" r="3" stroke="currentColor" {...common} />
        <circle cx="6" cy="18" r="3" stroke="currentColor" {...common} />
        <path d="M18 9a9 9 0 0 1-9 9" stroke="currentColor" {...common} />
      </React.Fragment>
    ),
    tag: (
      <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z M7 7h.01" stroke="currentColor" {...common} />
    ),
    folderPlus: (
      <React.Fragment>
        <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" stroke="currentColor" {...common} />
        <line x1="12" y1="10" x2="12" y2="16" stroke="currentColor" {...common} />
        <line x1="9" y1="13" x2="15" y2="13" stroke="currentColor" {...common} />
      </React.Fragment>
    ),
    pieChart: (
      <React.Fragment>
        <path d="M21.21 15.89A10 10 0 1 1 8 2.83" stroke="currentColor" {...common} />
        <path d="M22 12A10 10 0 0 0 12 2v10z" stroke="currentColor" {...common} />
      </React.Fragment>
    ),
    archive: (
      <React.Fragment>
        <polyline points="21 8 21 21 3 21 3 8" stroke="currentColor" {...common} />
        <rect x="1" y="3" width="22" height="5" stroke="currentColor" {...common} />
        <line x1="10" y1="12" x2="14" y2="12" stroke="currentColor" {...common} />
      </React.Fragment>
    ),
    creditCard: (
      <React.Fragment>
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2" stroke="currentColor" {...common} />
        <line x1="1" y1="10" x2="23" y2="10" stroke="currentColor" {...common} />
      </React.Fragment>
    ),
    fileText: (
      <React.Fragment>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" {...common} />
        <polyline points="14 2 14 8 20 8" stroke="currentColor" {...common} />
        <line x1="16" y1="13" x2="8" y2="13" stroke="currentColor" {...common} />
        <line x1="16" y1="17" x2="8" y2="17" stroke="currentColor" {...common} />
      </React.Fragment>
    ),
    sun: (
      <React.Fragment>
        <circle cx="12" cy="12" r="4" stroke="currentColor" {...common} />
        <path d="M12 2v2M12 20v2M2 12h2M20 12h2" stroke="currentColor" {...common} />
      </React.Fragment>
    ),
    moon: (
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" stroke="currentColor" {...common} />
    ),
    check: (
      <polyline points="20 6 9 17 4 12" stroke="currentColor" {...common} />
    ),
    x: (
      <React.Fragment>
        <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" {...common} />
        <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" {...common} />
      </React.Fragment>
    ),
    xCircle: (
      <React.Fragment>
        <circle cx="12" cy="12" r="10" stroke="currentColor" {...common} />
        <line x1="15" y1="9" x2="9" y2="15" stroke="currentColor" {...common} />
        <line x1="9" y1="9" x2="15" y2="15" stroke="currentColor" {...common} />
      </React.Fragment>
    ),
    barChart: (
      <React.Fragment>
        <line x1="12" y1="20" x2="12" y2="10" stroke="currentColor" {...common} />
        <line x1="18" y1="20" x2="18" y2="4" stroke="currentColor" {...common} />
        <line x1="6" y1="20" x2="6" y2="16" stroke="currentColor" {...common} />
      </React.Fragment>
    ),
    download: (
      <React.Fragment>
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="currentColor" {...common} />
        <polyline points="7 10 12 15 17 10" stroke="currentColor" {...common} />
        <line x1="12" y1="15" x2="12" y2="3" stroke="currentColor" {...common} />
      </React.Fragment>
    ),
    plus: (
      <React.Fragment>
        <line x1="12" y1="5" x2="12" y2="19" stroke="currentColor" {...common} />
        <line x1="5" y1="12" x2="19" y2="12" stroke="currentColor" {...common} />
      </React.Fragment>
    ),
    zoomIn: (
      <React.Fragment>
        <circle cx="11" cy="11" r="8" stroke="currentColor" {...common} />
        <line x1="21" y1="21" x2="16.65" y2="16.65" stroke="currentColor" {...common} />
        <line x1="11" y1="8" x2="11" y2="14" stroke="currentColor" {...common} />
        <line x1="8" y1="11" x2="14" y2="11" stroke="currentColor" {...common} />
      </React.Fragment>
    ),
    zoomOut: (
      <React.Fragment>
        <circle cx="11" cy="11" r="8" stroke="currentColor" {...common} />
        <line x1="21" y1="21" x2="16.65" y2="16.65" stroke="currentColor" {...common} />
        <line x1="8" y1="11" x2="14" y2="11" stroke="currentColor" {...common} />
      </React.Fragment>
    ),
    rotateCcw: (
      <React.Fragment>
        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" stroke="currentColor" {...common} />
        <path d="M3 3v5h5" stroke="currentColor" {...common} />
      </React.Fragment>
    )
  };
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {icons[name] || icons.check}
    </svg>
  );
};

// ==========================================
// 4. DUAL-CUE STATUS BADGE (ICON + COLOR + LABEL)
// ==========================================
export const StatusBadge: React.FC<{ type: 'plot' | 'lead'; status: string; size?: 'sm' | 'md' }> = ({ type, status, size = "md" }) => {
  const plotConfigs: Record<string, { label: string; badgeClass: string; icon: string }> = {
    available: { label: 'Available', badgeClass: 'bg-emerald-100 text-emerald-900 border-emerald-300', icon: 'checkCircle2' },
    pending: { label: 'Reservation pending', badgeClass: 'bg-amber-100 text-amber-950 border-amber-300', icon: 'clock' },
    booked: { label: 'Booked', badgeClass: 'bg-blue-100 text-blue-950 border-blue-300', icon: 'bookmarkCheck' },
    sold: { label: 'Sold', badgeClass: 'bg-red-100 text-red-950 border-red-300', icon: 'lock' },
    blocked: { label: 'Blocked', badgeClass: 'bg-gray-200 text-gray-800 border-gray-300', icon: 'shieldAlert' },
  };

  const leadConfigs: Record<string, { label: string; badgeClass: string; icon: string }> = {
    'New': { label: 'New Lead', badgeClass: 'bg-teal-100 text-teal-950 border-teal-300', icon: 'sprout' },
    'Contacted': { label: 'Contacted', badgeClass: 'bg-indigo-100 text-indigo-950 border-indigo-300', icon: 'phone' },
    'Visit Scheduled': { label: 'Visit Scheduled', badgeClass: 'bg-purple-100 text-purple-950 border-purple-300', icon: 'calendar' },
    'Visit Completed': { label: 'Visit Completed', badgeClass: 'bg-amber-100 text-amber-950 border-amber-300', icon: 'shieldCheck' },
    'Negotiation': { label: 'Negotiation', badgeClass: 'bg-blue-100 text-blue-950 border-blue-300', icon: 'barChart' },
    'Converted': { label: 'Converted', badgeClass: 'bg-emerald-100 text-emerald-950 border-emerald-300', icon: 'checkCircle2' },
    'Lost': { label: 'Lost', badgeClass: 'bg-rose-100 text-rose-950 border-rose-300', icon: 'xCircle' },
  };

  const config = type === 'plot' ? (plotConfigs[status] || plotConfigs.available) : (leadConfigs[status] || leadConfigs.New);
  const sizeClasses = size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-xs md:text-sm px-2.5 py-1';

  return (
    <span className={`inline-flex items-center font-medium rounded-full border ${config.badgeClass} ${sizeClasses}`} role="status">
      <Icon name={config.icon} className={size === 'sm' ? "w-3 h-3 mr-1" : "w-3.5 h-3.5 mr-1.5"} />
      <span>{config.label}</span>
    </span>
  );
};

// ==========================================
// 5. MOCK DATASETS (40 PLOTS, LEADS, HIERARCHY)
// ==========================================
const INITIAL_PLOTS: Plot[] = [
  // Block A: 0.125 Acre (605 sq.yd) - 10 Plots
  { id: 'p-1', number: 'A-01', block: 'Block A', sizeSqYards: 605, sizeAcres: '0.125 Acre', facing: 'East', priceInr: 1452000, status: 'available', x: 40, y: 55, width: 70, height: 110 },
  { id: 'p-2', number: 'A-02', block: 'Block A', sizeSqYards: 605, sizeAcres: '0.125 Acre', facing: 'East', priceInr: 1452000, status: 'sold', x: 120, y: 55, width: 70, height: 110 },
  { id: 'p-3', number: 'A-03', block: 'Block A', sizeSqYards: 605, sizeAcres: '0.125 Acre', facing: 'North', priceInr: 1391500, status: 'available', x: 200, y: 55, width: 70, height: 110 },
  { id: 'p-4', number: 'A-04', block: 'Block A', sizeSqYards: 605, sizeAcres: '0.125 Acre', facing: 'North', priceInr: 1391500, status: 'booked', x: 280, y: 55, width: 70, height: 110 },
  { id: 'p-5', number: 'A-05', block: 'Block A', sizeSqYards: 605, sizeAcres: '0.125 Acre', facing: 'East', priceInr: 1452000, status: 'available', x: 360, y: 55, width: 70, height: 110 },
  { id: 'p-6', number: 'A-06', block: 'Block A', sizeSqYards: 605, sizeAcres: '0.125 Acre', facing: 'West', priceInr: 1391500, status: 'pending', x: 440, y: 55, width: 70, height: 110 },
  { id: 'p-7', number: 'A-07', block: 'Block A', sizeSqYards: 605, sizeAcres: '0.125 Acre', facing: 'West', priceInr: 1391500, status: 'available', x: 520, y: 55, width: 70, height: 110 },
  { id: 'p-8', number: 'A-08', block: 'Block A', sizeSqYards: 605, sizeAcres: '0.125 Acre', facing: 'North', priceInr: 1452000, status: 'sold', x: 600, y: 55, width: 70, height: 110 },
  { id: 'p-9', number: 'A-09', block: 'Block A', sizeSqYards: 605, sizeAcres: '0.125 Acre', facing: 'North', priceInr: 1391500, status: 'available', x: 680, y: 55, width: 70, height: 110 },
  { id: 'p-10', number: 'A-10', block: 'Block A', sizeSqYards: 605, sizeAcres: '0.125 Acre', facing: 'East', priceInr: 1452000, status: 'blocked', x: 760, y: 55, width: 70, height: 110 },

  // Block B: 0.25 Acre (1,210 sq.yd) - 10 Plots
  { id: 'p-11', number: 'B-01', block: 'Block B', sizeSqYards: 1210, sizeAcres: '0.25 Acre', facing: 'East', priceInr: 2783000, status: 'available', x: 40, y: 230, width: 95, height: 135 },
  { id: 'p-12', number: 'B-02', block: 'Block B', sizeSqYards: 1210, sizeAcres: '0.25 Acre', facing: 'East', priceInr: 2783000, status: 'sold', x: 145, y: 230, width: 95, height: 135 },
  { id: 'p-13', number: 'B-03', block: 'Block B', sizeSqYards: 1210, sizeAcres: '0.25 Acre', facing: 'North', priceInr: 2904000, status: 'available', x: 250, y: 230, width: 95, height: 135 },
  { id: 'p-14', number: 'B-04', block: 'Block B', sizeSqYards: 1210, sizeAcres: '0.25 Acre', facing: 'North', priceInr: 2904000, status: 'booked', x: 355, y: 230, width: 95, height: 135 },
  { id: 'p-15', number: 'B-05', block: 'Block B', sizeSqYards: 1210, sizeAcres: '0.25 Acre', facing: 'East', priceInr: 2783000, status: 'available', x: 460, y: 230, width: 95, height: 135 },
  { id: 'p-16', number: 'B-06', block: 'Block B', sizeSqYards: 1210, sizeAcres: '0.25 Acre', facing: 'West', priceInr: 2783000, status: 'pending', x: 565, y: 230, width: 95, height: 135 },
  { id: 'p-17', number: 'B-07', block: 'Block B', sizeSqYards: 1210, sizeAcres: '0.25 Acre', facing: 'West', priceInr: 2904000, status: 'available', x: 670, y: 230, width: 95, height: 135 },
  { id: 'p-18', number: 'B-08', block: 'Block B', sizeSqYards: 1210, sizeAcres: '0.25 Acre', facing: 'North', priceInr: 2783000, status: 'sold', x: 775, y: 230, width: 75, height: 135 },
  { id: 'p-19', number: 'B-09', block: 'Block B', sizeSqYards: 1210, sizeAcres: '0.25 Acre', facing: 'South', priceInr: 2662000, status: 'available', x: 40, y: 430, width: 95, height: 135 },
  { id: 'p-20', number: 'B-10', block: 'Block B', sizeSqYards: 1210, sizeAcres: '0.25 Acre', facing: 'South', priceInr: 2662000, status: 'available', x: 145, y: 430, width: 95, height: 135 },

  // Block C: 0.375 - 0.5 Acre - 10 Plots
  { id: 'p-21', number: 'C-01', block: 'Block C', sizeSqYards: 1815, sizeAcres: '0.375 Acre', facing: 'North', priceInr: 4174500, status: 'available', x: 250, y: 430, width: 110, height: 135 },
  { id: 'p-22', number: 'C-02', block: 'Block C', sizeSqYards: 1815, sizeAcres: '0.375 Acre', facing: 'North', priceInr: 4174500, status: 'booked', x: 370, y: 430, width: 110, height: 135 },
  { id: 'p-23', number: 'C-03', block: 'Block C', sizeSqYards: 1815, sizeAcres: '0.375 Acre', facing: 'East', priceInr: 4356000, status: 'available', x: 490, y: 430, width: 110, height: 135 },
  { id: 'p-24', number: 'C-04', block: 'Block C', sizeSqYards: 1815, sizeAcres: '0.375 Acre', facing: 'East', priceInr: 4356000, status: 'available', x: 610, y: 430, width: 110, height: 135 },
  { id: 'p-25', number: 'C-05', block: 'Block C', sizeSqYards: 2420, sizeAcres: '0.50 Acre', facing: 'North-East', priceInr: 5808000, status: 'sold', x: 730, y: 430, width: 120, height: 135 },
  { id: 'p-26', number: 'C-06', block: 'Block C', sizeSqYards: 2420, sizeAcres: '0.50 Acre', facing: 'East', priceInr: 5808000, status: 'available', x: 40, y: 660, width: 95, height: 170 },
  { id: 'p-27', number: 'C-07', block: 'Block C', sizeSqYards: 2420, sizeAcres: '0.50 Acre', facing: 'North', priceInr: 5566000, status: 'pending', x: 145, y: 660, width: 95, height: 170 },
  { id: 'p-28', number: 'C-08', block: 'Block C', sizeSqYards: 1815, sizeAcres: '0.375 Acre', facing: 'North', priceInr: 4174500, status: 'available', x: 250, y: 660, width: 95, height: 170 },
  { id: 'p-29', number: 'C-09', block: 'Block C', sizeSqYards: 1815, sizeAcres: '0.375 Acre', facing: 'West', priceInr: 4174500, status: 'available', x: 355, y: 660, width: 95, height: 170 },
  { id: 'p-30', number: 'C-10', block: 'Block C', sizeSqYards: 2420, sizeAcres: '0.50 Acre', facing: 'East', priceInr: 5808000, status: 'sold', x: 460, y: 660, width: 95, height: 170 },

  // Block D: 0.5 - 1.0 Acre Lakefront - 10 Plots
  { id: 'p-31', number: 'D-01', block: 'Block D', sizeSqYards: 2420, sizeAcres: '0.50 Acre', facing: 'North-East', priceInr: 6050000, status: 'available', x: 565, y: 660, width: 95, height: 170 },
  { id: 'p-32', number: 'D-02', block: 'Block D', sizeSqYards: 2420, sizeAcres: '0.50 Acre', facing: 'North', priceInr: 5808000, status: 'booked', x: 670, y: 660, width: 95, height: 170 },
  { id: 'p-33', number: 'D-03', block: 'Block D', sizeSqYards: 4840, sizeAcres: '1.00 Acre', facing: 'East', priceInr: 11616000, status: 'available', x: 775, y: 660, width: 75, height: 170 },
  { id: 'p-34', number: 'D-04', block: 'Block D', sizeSqYards: 4840, sizeAcres: '1.00 Acre', facing: 'North-East', priceInr: 12100000, status: 'available', x: 40, y: 858, width: 70, height: 45 },
  { id: 'p-35', number: 'D-05', block: 'Block D', sizeSqYards: 2420, sizeAcres: '0.50 Acre', facing: 'North', priceInr: 5808000, status: 'sold', x: 120, y: 858, width: 70, height: 45 },
  { id: 'p-36', number: 'D-06', block: 'Block D', sizeSqYards: 2420, sizeAcres: '0.50 Acre', facing: 'North', priceInr: 5808000, status: 'available', x: 200, y: 858, width: 70, height: 45 },
  { id: 'p-37', number: 'D-07', block: 'Block D', sizeSqYards: 2420, sizeAcres: '0.50 Acre', facing: 'East', priceInr: 5808000, status: 'available', x: 280, y: 858, width: 70, height: 45 },
  { id: 'p-38', number: 'D-08', block: 'Block D', sizeSqYards: 2420, sizeAcres: '0.50 Acre', facing: 'East', priceInr: 5808000, status: 'pending', x: 360, y: 858, width: 70, height: 45 },
  { id: 'p-39', number: 'D-09', block: 'Block D', sizeSqYards: 4840, sizeAcres: '1.00 Acre', facing: 'North-East', priceInr: 12100000, status: 'booked', x: 440, y: 858, width: 70, height: 45 },
  { id: 'p-40', number: 'D-10', block: 'Block D', sizeSqYards: 4840, sizeAcres: '1.00 Acre', facing: 'North', priceInr: 11616000, status: 'available', x: 520, y: 858, width: 70, height: 45 }
];

const INITIAL_STAFF = [
  { id: 'staff-1', name: 'Rajesh Sharma', role: 'Admin' as UserRole, phone: '+91 98480 11001', commission: 0, activeLeadsCount: 2 },
  { id: 'staff-2', name: 'Venkat Rao', role: 'Sales Person' as UserRole, phone: '+91 98480 22002', commission: 87500, activeLeadsCount: 5 },
  { id: 'staff-3', name: 'K. Sridhar', role: 'Agent' as UserRole, phone: '+91 98480 33003', commission: 145000, activeLeadsCount: 3 },
  { id: 'staff-4', name: 'P. Chandrasekhar', role: 'Moderator' as UserRole, phone: '+91 98480 11003', commission: 0, activeLeadsCount: 1 }
];

const INITIAL_LEADS: Lead[] = [
  { id: 'LD-101', name: 'Ramesh Naidu', phone: '+91 98480 12345', project: 'Green Valley Farms', plotInterest: 'A-03', budgetInr: 1391500, status: 'Visit Scheduled', source: 'Website Form', ownerId: 'staff-2', ownerName: 'Venkat Rao', ownerRole: 'Sales Person', createdDate: '01 Nov 2026', nextFollowUpDate: '08 Nov 2026', isOverdue: false, leadAgeDays: 6, consentWhatsApp: true },
  { id: 'LD-102', name: 'Sunita Reddy', phone: '+91 94401 23456', project: 'Green Valley Farms', plotInterest: 'B-04', budgetInr: 2904000, status: 'Negotiation', source: 'Referred by Agent', ownerId: 'staff-3', ownerName: 'K. Sridhar', ownerRole: 'Agent', referredByAgentId: 'staff-3', createdDate: '24 Oct 2026', nextFollowUpDate: '06 Nov 2026', isOverdue: true, leadAgeDays: 14, consentWhatsApp: true },
  { id: 'LD-103', name: 'Anil Kumar Varma', phone: '+91 98850 34567', project: 'Green Valley Farms', plotInterest: 'C-01', budgetInr: 4174500, status: 'Visit Completed', source: 'Direct Call', ownerId: 'staff-2', ownerName: 'Venkat Rao', ownerRole: 'Sales Person', createdDate: '29 Oct 2026', nextFollowUpDate: '09 Nov 2026', isOverdue: false, leadAgeDays: 9, consentWhatsApp: true },
  { id: 'LD-104', name: 'Dr. Madhavi Latha', phone: '+91 91210 45678', project: 'Green Valley Farms', plotInterest: 'D-03', budgetInr: 11616000, status: 'New', source: 'Website Form', ownerId: 'staff-1', ownerName: 'Rajesh Sharma', ownerRole: 'Admin', createdDate: '06 Nov 2026', nextFollowUpDate: '07 Nov 2026', isOverdue: false, leadAgeDays: 1, consentWhatsApp: false },
  { id: 'LD-105', name: 'Praveen Goud', phone: '+91 98490 56789', project: 'Green Valley Farms', plotInterest: 'A-06', budgetInr: 1391500, status: 'Contacted', source: 'WhatsApp Inbound', ownerId: 'staff-2', ownerName: 'Venkat Rao', ownerRole: 'Sales Person', createdDate: '03 Nov 2026', nextFollowUpDate: '05 Nov 2026', isOverdue: true, leadAgeDays: 4, consentWhatsApp: true },
  { id: 'LD-106', name: 'B. Srinivasulu', phone: '+91 99890 67890', project: 'Green Valley Farms', plotInterest: 'C-05', budgetInr: 5808000, status: 'Converted', source: 'Walk-in', ownerId: 'staff-3', ownerName: 'K. Sridhar', ownerRole: 'Agent', referredByAgentId: 'staff-3', createdDate: '15 Oct 2026', nextFollowUpDate: '15 Nov 2026', isOverdue: false, leadAgeDays: 23, consentWhatsApp: true, convertedPlot: 'C-05', convertedPrice: 5808000 }
];

const INITIAL_HIERARCHY: HierarchyNode[] = [
  { id: 'h-1', name: 'Rajesh Sharma', level: 15, levelTitle: 'Level 15 — Managing Director', role: 'Admin', reportsToId: null, phone: '+91 98480 11001', teamCount: 42, unitsBooked: 38, activeLeads: 8, benefitsStatus: 'Executive Retainer & Board Seat', transferHistory: [{ date: '01 Jan 2024', fromRole: 'Zonal Head', toRole: 'Managing Director', approver: 'Shareholders Committee' }] },
  { id: 'h-2', name: 'Sujatha Murthy', level: 13, levelTitle: 'Level 13 — Zonal Director (Telangana)', role: 'Admin', reportsToId: 'h-1', phone: '+91 98480 11002', teamCount: 28, unitsBooked: 24, activeLeads: 12, benefitsStatus: 'Senior Zonal Pool', transferHistory: [{ date: '15 May 2024', fromRole: 'Regional Lead', toRole: 'Zonal Director', approver: 'Rajesh Sharma' }] },
  { id: 'h-3', name: 'P. Chandrasekhar', level: 11, levelTitle: 'Level 11 — Regional General Manager', role: 'Moderator', reportsToId: 'h-2', phone: '+91 98480 11003', teamCount: 16, unitsBooked: 15, activeLeads: 14, benefitsStatus: 'Regional Car Allowance', transferHistory: [] },
  { id: 'h-4', name: 'Venkat Rao', level: 8, levelTitle: 'Level 8 — Senior Sales Lead', role: 'Sales Person', reportsToId: 'h-3', phone: '+91 98480 22002', teamCount: 7, unitsBooked: 9, activeLeads: 6, benefitsStatus: 'Field Fuel Card & AC Vehicle', transferHistory: [{ date: '10 Feb 2025', fromRole: 'Associate', toRole: 'Senior Sales Lead', approver: 'P. Chandrasekhar' }] },
  { id: 'h-5', name: 'K. Sridhar', level: 4, levelTitle: 'Level 4 — Senior Partner Agent', role: 'Agent', reportsToId: 'h-4', phone: '+91 98480 33003', teamCount: 3, unitsBooked: 5, activeLeads: 4, benefitsStatus: 'Priority Site Visit Escort', transferHistory: [] },
  { id: 'h-6', name: 'Naveen Kumar', level: 2, levelTitle: 'Level 2 — Field Advisor Trainee', role: 'Agent', reportsToId: 'h-5', phone: '+91 98480 44004', teamCount: 0, unitsBooked: 1, activeLeads: 3, benefitsStatus: 'Trainee Kit & SIM Card', transferHistory: [] }
];

const INITIAL_OFFERS: OfferRule[] = [
  { id: 'off-1', name: 'Karthika Masam Special Token Bonus', project: 'Green Valley Farms', status: 'active', startDate: '01 Nov 2026', endDate: '30 Nov 2026', targetDesignation: 'All Sales & Partner Agents', criteriaSummary: 'Close ≥ 2 Units of 605 sq.yd within 30 days', sampleBenefit: 'Sample: ₹35,000 cash bonus + Gold coin (not approved)', terms: 'Requires clear cheque clearance within 7 days of site tour token.', version: 2 },
  { id: 'off-2', name: 'Early Bird Quarter-Acre Booster', project: 'Green Valley Farms', status: 'draft', startDate: '15 Nov 2026', endDate: '15 Dec 2026', targetDesignation: 'Level 4 to Level 10 Leads', criteriaSummary: '≥ 1 Unit of 1,210 sq.yd (Block B)', sampleBenefit: 'Sample: 1.5% incremental milestone payout (not approved)', terms: 'Draft status — Requires Managing Director approval before release.', version: 1 }
];

const INITIAL_VISITS: SiteVisit[] = [
  { id: 'vis-1', leadId: 'LD-101', leadName: 'Ramesh Naidu', visitDate: '08 Nov 2026', visitTime: '10:30 AM IST', pickupLocation: 'Gachibowli ORR Junction', status: 'Confirmed', accompaniedBy: 'Venkat Rao', vehicleNumber: 'TS 09 EZ 4410 (Innova AC)', feedbackComment: 'Customer confirmed interest in east-facing 605 sq.yd plot with sweet borewell water.' },
  { id: 'vis-2', leadId: 'LD-103', leadName: 'Anil Kumar Varma', visitDate: '04 Nov 2026', visitTime: '11:00 AM IST', pickupLocation: 'Kukatpally Y-Junction', status: 'Completed', accompaniedBy: 'Venkat Rao', vehicleNumber: 'TS 08 FA 9988 (Ertiga AC)', feedbackComment: 'Tasted sweet water from borewell #2. Extremely satisfied with soil depth and boundary pillars.' }
];

const INITIAL_TIMELINE: Record<string, TimelineEntry[]> = {
  'LD-101': [
    { id: 'tl-1', timestamp: '01 Nov 2026, 04:30 PM IST', actor: 'Website Inbound', channel: 'Web Form', result: 'Submitted', note: 'Customer registered online requesting farm visit for 605 sq.yd unit.', nextAction: 'Initial contact call', nextFollowUpDate: '02 Nov 2026' },
    { id: 'tl-2', timestamp: '02 Nov 2026, 11:15 AM IST', actor: 'Venkat Rao', channel: 'Phone Call', result: 'Interested', note: 'Spoke with buyer. Explained 30-year legal opinion, sweet water, and 33ft avenue roads.', nextAction: 'Schedule free AC site tour', nextFollowUpDate: '08 Nov 2026' }
  ],
  'LD-102': [
    { id: 'tl-3', timestamp: '24 Oct 2026, 02:00 PM IST', actor: 'K. Sridhar', channel: 'In-person', result: 'Positive', note: 'Met at coffee shop near Jubilee Hills. Discussed Block B quarter-acre plot.', nextAction: 'Send layout plan on WhatsApp', nextFollowUpDate: '06 Nov 2026' }
  ]
};

// ==========================================
// 6. MAIN APPLICATION COMPONENT
// ==========================================
export default function App() {
  const [topSection, setTopSection] = useState<'customer' | 'crm'>('customer');
  const [customerPage, setCustomerPage] = useState<'home' | 'plots' | 'enquiry' | 'reserve' | 'portal'>('home');
  const [activePlotNumber, setActivePlotNumber] = useState('A-03');
  
  // CRM Navigation State
  const [crmTab, setCrmTab] = useState<'admin_dash' | 'moderator_dash' | 'queue' | 'leads' | 'project_setup' | 'hierarchy' | 'offers' | 'agent' | 'safeguard' | 'profile' | 'p2_ledger' | 'p2_settlement' | 'p2_finance' | 'p2_cms' | 'p2_audit'>('admin_dash');
  const [currentRole, setCurrentRole] = useState<UserRole>('Admin');
  const [lang, setLang] = useState<'en' | 'te'>('en');
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [loginIdentifier, setLoginIdentifier] = useState('rajesh@greenvalleyfarms.in');
  const [loginPassword, setLoginPassword] = useState('pass123');
  const [loginError, setLoginError] = useState('');
  const [isInactiveAccount, setIsInactiveAccount] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotStep, setForgotStep] = useState(1);
  const [forgotPhone, setForgotPhone] = useState('');

  // Profile State with Masked Financials
  const [showPayoutDetails, setShowPayoutDetails] = useState(false);
  const [showConfirmUnmaskModal, setShowConfirmUnmaskModal] = useState(false);

  // Interactive Data State
  const [plots, setPlots] = useState<Plot[]>(INITIAL_PLOTS);
  const [selectedPlot, setSelectedPlot] = useState<Plot | null>(null);
  const [leads, setLeads] = useState<Lead[]>(INITIAL_LEADS);
  const [timeline, setTimeline] = useState<Record<string, TimelineEntry[]>>(INITIAL_TIMELINE);
  const [visits] = useState<SiteVisit[]>(INITIAL_VISITS);
  const [toasts, setToasts] = useState<Array<{ id: string; title: string; desc: string }>>([]);

  // Plot Pan/Zoom State
  const [plotZoom, setPlotZoom] = useState(1);

  // Hierarchy State
  const [hierarchy, setHierarchy] = useState<HierarchyNode[]>(INITIAL_HIERARCHY);
  const [selectedPerson, setSelectedPerson] = useState<HierarchyNode | null>(INITIAL_HIERARCHY[0]);
  const [hierarchySearch, setHierarchySearch] = useState('');
  const [hierarchyError, setHierarchyError] = useState('');

  // Offers State
  const [offers, setOffers] = useState<OfferRule[]>(INITIAL_OFFERS);
  const [criteriaMetric, setCriteriaMetric] = useState('Units Booked');
  const [criteriaThreshold, setCriteriaThreshold] = useState('2');
  const [simulationResult, setSimulationResult] = useState<string | null>(null);

  // Project Setup Wizard State (5 Steps)
  const [setupStep, setSetupStep] = useState(1);
  const [newProjectCode, setNewProjectCode] = useState('GVF-CHEV-02');
  const [newProjectName, setNewProjectName] = useState('Green Valley Phase 2');
  const [newProjectLocation, setNewProjectLocation] = useState('Chevella Highway, R.R. District');
  const [newProjectPublic, setNewProjectPublic] = useState(true);

  // Plot Table Bulk State Edit
  const [selectedPlotTableIds, setSelectedPlotTableIds] = useState<string[]>([]);
  const [bulkStatusToApply, setBulkStatusToApply] = useState<PlotStatus>('available');

  // Customer Portal State Simulator
  const [portalState, setPortalState] = useState<'normal' | 'skeleton' | 'empty' | 'error'>('normal');

  const addToast = (title: string, desc: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [{ id, title, desc }, ...prev]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 5000);
  };

  // Role filtered leads
  const visibleLeads = useMemo(() => {
    return leads.filter(l => {
      if (currentRole === 'Admin' || currentRole === 'Moderator') return true;
      if (currentRole === 'Sales Person') return l.ownerRole === 'Sales Person' || l.ownerId === 'staff-2';
      if (currentRole === 'Agent') return l.ownerRole === 'Agent' || l.referredByAgentId === 'staff-3';
      return true;
    });
  }, [leads, currentRole]);

  // Unassigned leads
  const unassignedLeads = useMemo(() => {
    return leads.filter(l => l.ownerRole === 'Admin' || l.status === 'New');
  }, [leads]);

  // Overdue followups
  const overdueFollowUps = useMemo(() => {
    return leads.filter(l => l.isOverdue);
  }, [leads]);

  // Authentication logic
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (isInactiveAccount) {
      setLoginError('This account is currently marked INACTIVE. Contact your system administrator to reactivate your profile.');
      return;
    }
    if (!loginIdentifier || !loginPassword) {
      setLoginError('Please enter both your phone/email and password.');
      return;
    }
    setLoginError('');
    setIsAuthenticated(true);
    addToast('Welcome back!', `Signed in as ${currentRole}. Redirecting to your assigned dashboard.`);
    if (currentRole === 'Admin') setCrmTab('admin_dash');
    else if (currentRole === 'Moderator') setCrmTab('moderator_dash');
    else if (currentRole === 'Sales Person') setCrmTab('leads');
    else setCrmTab('agent');
  };

  // Round-robin suggest algorithm
  const handleRoundRobinAssign = (leadId: string) => {
    const salesStaff = INITIAL_STAFF.filter(s => s.role === 'Sales Person' || s.role === 'Agent');
    const leastLoaded = [...salesStaff].sort((a, b) => a.activeLeadsCount - b.activeLeadsCount)[0];
    if (!leastLoaded) return;

    setLeads(prev => prev.map(l => {
      if (l.id === leadId) {
        const history = l.assignedHistory || [];
        return {
          ...l,
          ownerId: leastLoaded.id,
          ownerName: leastLoaded.name,
          ownerRole: leastLoaded.role,
          status: 'Contacted',
          assignedHistory: [
            ...history,
            { date: '07 Nov 2026, 12:15 PM IST', from: l.ownerName, to: leastLoaded.name, reason: 'Round-Robin balanced assignment' }
          ]
        };
      }
      return l;
    }));
    addToast('Assigned via Round-Robin', `Lead assigned to ${leastLoaded.name} (Current workload: ${leastLoaded.activeLeadsCount + 1} active leads).`);
  };

  // Circular reporting prevention validator
  const handleUpdateManager = (personId: string, proposedManagerId: string) => {
    setHierarchyError('');
    if (personId === proposedManagerId) {
      setHierarchyError('Validation Error: A staff member cannot report to themselves.');
      return;
    }

    let curr = hierarchy.find(h => h.id === proposedManagerId);
    while (curr && curr.reportsToId) {
      if (curr.reportsToId === personId) {
        setHierarchyError(`Validation Error: Circular reporting line detected! ${curr.name} already reports down this hierarchy line.`);
        return;
      }
      curr = hierarchy.find(h => h.id === curr?.reportsToId);
    }

    setHierarchy(prev => prev.map(h => {
      if (h.id === personId) {
        return {
          ...h,
          reportsToId: proposedManagerId,
          transferHistory: [
            ...h.transferHistory,
            { date: '07 Nov 2026', fromRole: h.levelTitle, toRole: h.levelTitle, approver: 'Admin Console' }
          ]
        };
      }
      return h;
    }));
    addToast('Reporting Line Updated', 'Team hierarchy and approval chains refreshed with no circular links.');
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-[#1A211D] text-[#E6EBE7]' : 'bg-[#FDFBF7] text-[#262A28]'} flex flex-col font-sans antialiased transition-colors`}>
      {/* Toast Notifications */}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
        {toasts.map(toast => (
          <div key={toast.id} className="pointer-events-auto p-4 rounded-xl border border-[#DCE4DE] shadow-lg flex items-start gap-3 bg-white text-[#262A28]">
            <Icon name="checkCircle2" className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div className="flex-1 text-xs">
              <strong className="block text-sm font-bold text-[#1E4A3B]">{toast.title}</strong>
              <p className="text-gray-600 leading-snug">{toast.desc}</p>
            </div>
            <button onClick={() => setToasts(prev => prev.filter(x => x.id !== toast.id))} className="text-gray-400 hover:text-gray-600 p-1">
              <Icon name="x" className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Forgot Password 3-Step Wizard Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 border shadow-xl">
            <div className="flex justify-between items-center border-b pb-3">
              <div>
                <span className="text-xs uppercase font-bold text-emerald-800">Account Recovery</span>
                <h3 className="font-serif text-xl font-bold text-[#0F261E]">Reset Password (Step {forgotStep} of 3)</h3>
              </div>
              <button onClick={() => setShowForgotModal(false)} className="text-gray-400 hover:text-gray-600">
                <Icon name="x" className="w-5 h-5" />
              </button>
            </div>

            {forgotStep === 1 && (
              <div className="space-y-3 text-xs">
                <p className="text-gray-600">Step 1: Enter your registered mobile number. We will send a 4-digit verification code.</p>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">10-Digit Mobile Number</label>
                  <input
                    type="tel"
                    placeholder="98480 11001"
                    value={forgotPhone}
                    onChange={(e) => setForgotPhone(e.target.value)}
                    className="w-full p-3 border rounded-xl text-base"
                  />
                </div>
                <button
                  onClick={() => setForgotStep(2)}
                  disabled={!forgotPhone}
                  className="w-full py-3 bg-[#1E4A3B] text-white font-bold rounded-xl text-sm min-h-[48px]"
                >
                  Send OTP Code →
                </button>
              </div>
            )}

            {forgotStep === 2 && (
              <div className="space-y-3 text-xs">
                <p className="text-gray-600">Step 2: Enter the 4-digit code sent via SMS to {forgotPhone || '+91 98480 11001'}.</p>
                <div className="flex justify-center gap-2">
                  {['4', '8', '2', '1'].map((digit, i) => (
                    <input key={i} type="text" defaultValue={digit} maxLength={1} className="w-12 h-12 text-center text-xl font-bold border rounded-xl bg-gray-50" />
                  ))}
                </div>
                <button
                  onClick={() => setForgotStep(3)}
                  className="w-full py-3 bg-[#1E4A3B] text-white font-bold rounded-xl text-sm min-h-[48px]"
                >
                  Verify Code & Continue →
                </button>
              </div>
            )}

            {forgotStep === 3 && (
              <div className="space-y-3 text-xs">
                <p className="text-gray-600">Step 3: Choose a new password for your farmland CRM account.</p>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">New Password</label>
                  <input type="password" defaultValue="farmland2026" className="w-full p-3 border rounded-xl text-base" />
                </div>
                <button
                  onClick={() => {
                    setShowForgotModal(false);
                    setForgotStep(1);
                    addToast('Password Changed', 'You can now sign in with your new password.');
                  }}
                  className="w-full py-3 bg-emerald-700 text-white font-bold rounded-xl text-sm min-h-[48px]"
                >
                  Save New Password & Sign In
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Confirmation Modal to Unmask Payout Financials */}
      {showConfirmUnmaskModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 space-y-4 border shadow-xl text-xs">
            <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-800">
              <Icon name="shieldAlert" className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#0F261E]">Confirm Display of Bank Details</h3>
            <p className="text-gray-600">
              For your account security, bank account and UPI addresses are kept hidden. Are you sure you want to reveal your full payout details on screen?
            </p>
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setShowConfirmUnmaskModal(false)}
                className="flex-1 py-2.5 border rounded-xl font-bold text-gray-700 min-h-[48px]"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowConfirmUnmaskModal(false);
                  setShowPayoutDetails(true);
                  addToast('Financial Details Unmasked', 'Displaying full verified bank IFSC and account number.');
                }}
                className="flex-1 py-2.5 bg-[#1E4A3B] text-white font-bold rounded-xl min-h-[48px]"
              >
                Yes, Show Details
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TOP NAVIGATION BAR */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#1A211D]/95 backdrop-blur border-b border-[#DCE4DE] dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">
          <button onClick={() => setTopSection('customer')} className="flex items-center space-x-3 text-left focus:outline-none">
            <div className="w-12 h-12 rounded-xl bg-[#1E4A3B] flex items-center justify-center text-white shadow-md">
              <Icon name="sprout" className="w-7 h-7 text-emerald-300" />
            </div>
            <div>
              <span className="font-serif text-2xl font-bold tracking-tight text-[#0F261E] dark:text-white block leading-tight">
                Green Valley Farms
              </span>
              <span className="text-xs text-gray-500 font-medium flex items-center gap-1">
                <Icon name="shieldCheck" className="w-3.5 h-3.5 text-[#1E4A3B] inline" />
                100% Legal Clear Title • Farmland Platform
              </span>
            </div>
          </button>

          <div className="flex items-center space-x-2 sm:space-x-3">
            <button
              onClick={() => setLang(prev => prev === 'en' ? 'te' : 'en')}
              className="px-3 py-2 rounded-lg border border-[#DCE4DE] bg-white text-xs font-bold text-gray-700 hover:bg-gray-50 min-h-[44px]"
            >
              {lang === 'en' ? 'తెలుగు' : 'English'}
            </button>

            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2.5 rounded-lg border border-[#DCE4DE] bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 min-h-[44px]"
              title="Toggle Dark Mode"
            >
              <Icon name={isDarkMode ? "sun" : "moon"} className="w-4 h-4" />
            </button>

            {topSection === 'customer' ? (
              <button
                onClick={() => setTopSection('crm')}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1E4A3B] text-white text-xs font-bold hover:bg-[#173B2F] shadow-sm min-h-[48px]"
              >
                <Icon name="userCheck" className="w-4 h-4 text-emerald-300" />
                <span>Internal Staff CRM →</span>
              </button>
            ) : (
              <button
                onClick={() => setTopSection('customer')}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border text-xs font-bold min-h-[48px]"
              >
                <Icon name="map" className="w-4 h-4 text-emerald-600" />
                <span>← Public Website</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* TOP VIEW ROUTER */}
      {topSection === 'customer' ? (
        /* CUSTOMER PUBLIC WEBSITE & PORTAL */
        <main className="flex-1">
          <div className="bg-[#F0F6F3] border-b border-[#DCE4DE] py-2 px-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between overflow-x-auto">
              <div className="flex space-x-1">
                {[
                  { id: 'home', label: lang === 'en' ? 'Home' : 'హోమ్', icon: 'sprout' },
                  { id: 'plots', label: lang === 'en' ? 'Plot Map' : 'ప్లాట్ల మ్యాప్', icon: 'map' },
                  { id: 'enquiry', label: lang === 'en' ? 'Book Visit' : 'విజిట్ బుక్ చేయండి', icon: 'calendar' },
                  { id: 'portal', label: lang === 'en' ? 'Customer Portal' : 'నా ల్యాండ్ పోర్టల్', icon: 'userCheck' },
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => setCustomerPage(item.id as any)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap min-h-[44px] ${
                      customerPage === item.id ? 'bg-[#1E4A3B] text-white shadow-sm' : 'text-gray-700 hover:bg-gray-200/60'
                    }`}
                  >
                    <Icon name={item.icon} className="w-4 h-4" />
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
              <span className="text-xs text-emerald-900 font-bold hidden sm:inline">
                Sweet Water at 120ft • Clear Titles
              </span>
            </div>
          </div>

          {customerPage === 'home' && (
            <div className="space-y-16 pb-12">
              <section className="bg-gradient-to-b from-[#DDE9E2]/60 via-[#F0F6F3]/40 to-[#FDFBF7] pt-12 pb-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-7 space-y-6 text-left">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1E4A3B] text-white text-xs font-semibold shadow-sm">
                      <Icon name="sprout" className="w-4 h-4 text-emerald-300" />
                      <span>Government Survey #142/A & #143/B Approved</span>
                    </div>
                    <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#0F261E] leading-tight">
                      {lang === 'en' 
                        ? 'Own fertile farmland. Grow trees, build memories, secure your family.' 
                        : 'సారవంతమైన వ్యవసాయ భూమిని సొంతం చేసుకోండి. చెట్లను పెంచండి, ఆనందంగా జీవించండి.'}
                    </h1>
                    <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                      Clear 30-year legal titles, sweet ground water at 120ft, 33ft plantation avenues, and full organic farm maintenance.
                    </p>
                    <div className="bg-white p-4 rounded-xl border border-[#DCE4DE] flex flex-wrap gap-6 shadow-sm">
                      <div>
                        <span className="text-xs uppercase text-gray-500 font-bold block">Prices From</span>
                        <strong className="text-2xl font-bold text-[#0F261E]">₹13,91,500</strong>
                        <span className="text-xs text-gray-500 ml-1">/ 605 sq.yd</span>
                      </div>
                      <div className="border-l pl-6">
                        <span className="text-xs uppercase text-gray-500 font-bold block">Availability</span>
                        <strong className="text-xl font-bold text-emerald-700">
                          {plots.filter(p => p.status === 'available').length} Plots Open
                        </strong>
                        <span className="text-xs text-gray-500 block">Out of 40 Total</span>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                      <button
                        onClick={() => setCustomerPage('enquiry')}
                        className="flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-[#1E4A3B] text-white text-base sm:text-lg font-bold hover:bg-[#173B2F] transition-all shadow-md min-h-[48px]"
                      >
                        <Icon name="calendar" className="w-5 h-5 text-emerald-300" />
                        <span>Book a free site visit</span>
                      </button>
                      <button
                        onClick={() => setCustomerPage('plots')}
                        className="flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-white text-[#0F261E] border-2 border-[#1E4A3B] text-base sm:text-lg font-bold hover:bg-[#F0F6F3] min-h-[48px]"
                      >
                        <Icon name="compass" className="w-5 h-5 text-[#1E4A3B]" />
                        <span>Explore Available Plots</span>
                      </button>
                    </div>
                  </div>

                  <div className="lg:col-span-5">
                    <div className="bg-white rounded-2xl p-4 border border-[#DCE4DE] shadow-md">
                      <div className="aspect-[4/3] rounded-xl overflow-hidden relative bg-[#1E4A3B]">
                        <svg viewBox="0 0 400 300" className="w-full h-full object-cover">
                          <rect width="400" height="300" fill="#2E6B55" />
                          <circle cx="340" cy="60" r="35" fill="#F6E05E" opacity="0.85" />
                          <path d="M0 160 Q100 120 200 150 T400 130 L400 300 L0 300 Z" fill="#1E4A3B" opacity="0.9" />
                          <path d="M0 200 Q200 170 400 190 L400 300 L0 300 Z" fill="#C85A32" opacity="0.4" />
                          <polygon points="170,300 230,300 210,180 190,180" fill="#E6EBE7" opacity="0.75" />
                          <circle cx="80" cy="180" r="22" fill="#2E6B55" />
                          <rect x="76" y="202" width="8" height="20" fill="#8C381B" />
                          <circle cx="280" cy="185" r="24" fill="#2E6B55" />
                          <rect x="276" y="209" width="8" height="22" fill="#8C381B" />
                        </svg>
                        <div className="absolute bottom-3 left-3 right-3 bg-white/95 px-3 py-2 rounded-lg flex items-center justify-between text-xs font-semibold text-[#0F261E]">
                          <span>Certified Mango & Teak Farmland</span>
                          <span className="text-emerald-700 font-bold">120ft Sweet Water</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* 3 Trust Points */}
              <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-10">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#1E4A3B] block mb-1">Guarantees</span>
                  <h2 className="font-serif text-3xl font-bold text-[#0F261E]">Land ownership made safe & simple</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { icon: 'shieldCheck', title: '100% Legal Clear Title', desc: 'Every acre verified by High Court advocates with 30-year search history and passbook registration.' },
                    { icon: 'compass', title: 'Spot Registration & 33ft Roads', desc: 'Instant government sub-registrar documentation with direct tar and avenue road connectivity.' },
                    { icon: 'droplets', title: 'Sweet Water & Organic Soil', desc: 'Tested sweet ground water at 120ft, red and alluvial fertile soil with drip irrigation installed.' }
                  ].map((tp, idx) => (
                    <div key={idx} className="bg-white rounded-xl p-6 border border-[#DCE4DE] shadow-sm flex flex-col justify-between">
                      <div>
                        <div className="w-12 h-12 rounded-xl bg-[#F0F6F3] flex items-center justify-center text-[#1E4A3B] mb-4">
                          <Icon name={tp.icon} className="w-6 h-6" />
                        </div>
                        <h3 className="font-serif text-xl font-bold text-[#0F261E] mb-2">{tp.title}</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">{tp.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}

          {customerPage === 'plots' && (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
              <div className="bg-[#0F261E] text-white p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <span className="text-xs uppercase tracking-wider text-emerald-400 font-bold block">Interactive Map</span>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold">40 Farmland Plots Layout</h2>
                  <p className="text-xs text-emerald-200 mt-1">Tap any plot rectangle to view size, facing, and direct transparent price.</p>
                </div>
                <div className="flex gap-4 text-xs bg-[#1E4A3B] p-3 rounded-xl border border-emerald-800">
                  <div>
                    <span className="text-emerald-300 block">Total Plots</span>
                    <strong className="text-base text-white">40</strong>
                  </div>
                  <div className="border-l border-emerald-800 pl-4">
                    <span className="text-emerald-300 block">Available</span>
                    <strong className="text-base text-emerald-300">
                      {plots.filter(p => p.status === 'available').length}
                    </strong>
                  </div>
                </div>
              </div>

              {/* Pan & Zoom Controls + SVG Layout Map */}
              <div className="bg-white rounded-2xl border-2 border-[#DCE4DE] overflow-hidden shadow-md p-4 space-y-3">
                <div className="flex justify-between items-center bg-gray-50 p-2 rounded-xl border">
                  <span className="text-xs font-bold text-gray-600 flex items-center gap-1.5">
                    <Icon name="compass" className="w-4 h-4 text-[#1E4A3B]" />
                    Interactive Map Canvas (Pan & Zoom)
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setPlotZoom(prev => Math.min(prev + 0.15, 1.6))}
                      className="p-2 border rounded-lg bg-white shadow-xs hover:bg-gray-100"
                      title="Zoom In"
                      aria-label="Zoom In"
                    >
                      <Icon name="zoomIn" className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setPlotZoom(prev => Math.max(prev - 0.15, 0.75))}
                      className="p-2 border rounded-lg bg-white shadow-xs hover:bg-gray-100"
                      title="Zoom Out"
                      aria-label="Zoom Out"
                    >
                      <Icon name="zoomOut" className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setPlotZoom(1)}
                      className="p-2 border rounded-lg bg-white shadow-xs hover:bg-gray-100"
                      title="Reset Zoom"
                      aria-label="Reset Zoom"
                    >
                      <Icon name="rotateCcw" className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs font-semibold text-gray-700" aria-label="Map legend">
                  {[['#2E6B55','● Available'],['#D69E2E','◆ Reservation pending'],['#2B6CB0','■ Booked'],['#C53030','✕ Sold'],['#718096','– Blocked']].map(([c,l])=>(
                    <span key={l} className="inline-flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm" style={{background:c}} />{l}</span>
                  ))}
                </div>
                <div className="overflow-auto max-h-[780px] border rounded-xl flex justify-start xl:justify-center">
                  <div style={{ transform: `scale(${plotZoom})`, transformOrigin: 'top center', transition: 'transform 150ms ease-out' }}>
                    <svg viewBox="0 0 860 920" className="w-[860px] h-[920px] bg-white rounded-xl shadow-inner select-none">
                      <rect x="0" y="0" width="860" height="35" fill="#D8DFDA" />
                      <text x="350" y="22" fontSize="13" fontWeight="bold" fill="#1E4A3B">33ft MAIN HIGHWAY AVENUE</text>
                      <rect x="0" y="190" width="860" height="24" fill="#E2E8E4" />
                      <text x="360" y="206" fontSize="11" fontWeight="bold" fill="#5A635E">30ft INTERNAL ROAD</text>
                      <rect x="0" y="390" width="860" height="24" fill="#E2E8E4" />
                      <text x="340" y="406" fontSize="11" fontWeight="bold" fill="#5A635E">33ft CLUBHOUSE AVENUE</text>
                      <rect x="0" y="620" width="860" height="24" fill="#E2E8E4" />
                      <text x="340" y="636" fontSize="11" fontWeight="bold" fill="#5A635E">40ft BOUNDARY BOULEVARD</text>

                      <rect x="730" y="572" width="120" height="42" rx="14" fill="#BEE3F8" stroke="#3182CE" strokeWidth="1.5" />
                      <text x="740" y="597" fontSize="10" fontWeight="bold" fill="#2B6CB0">SWEET WATER POND</text>
                      <rect x="0" y="834" width="860" height="20" fill="#E2E8E4" />
                      <text x="350" y="848" fontSize="10" fontWeight="bold" fill="#5A635E">24ft SERVICE ROAD</text>

                      {plots.map(plot => {
                        const isSelected = selectedPlot?.id === plot.id;
                        let fill = '#2E6B55';
                        if (plot.status === 'pending') fill = '#D69E2E';
                        if (plot.status === 'booked') fill = '#2B6CB0';
                        if (plot.status === 'sold') fill = '#C53030';
                        if (plot.status === 'blocked') fill = '#718096';
                        if (isSelected) fill = '#ECC94B';

                        return (
                          <g key={plot.id} onClick={() => setSelectedPlot(plot)} className="cursor-pointer">
                            <rect
                              x={plot.x}
                              y={plot.y}
                              width={plot.width}
                              height={plot.height}
                              rx="6"
                              fill={fill}
                              stroke={isSelected ? '#1A211D' : '#FFFFFF'}
                              strokeWidth={isSelected ? 3 : 1.5}
                            />
                            <text
                              x={plot.x + plot.width / 2}
                              y={plot.y + (plot.height > 80 ? 28 : 24)}
                              textAnchor="middle"
                              fontSize="13"
                              fontWeight="bold"
                              fill={isSelected ? '#1A211D' : '#FFFFFF'}
                            >
                              {plot.number}
                            </text>
                            <text
                              x={plot.x + plot.width / 2}
                              y={plot.y + (plot.height > 80 ? 46 : 42)}
                              textAnchor="middle"
                              fontSize="10"
                              fill={isSelected ? '#262A28' : '#F7FAFC'}
                            >
                              {plot.sizeAcres}
                            </text>
                            {plot.height > 60 && (
                              <text x={plot.x + plot.width / 2} y={plot.y + plot.height - 10} textAnchor="middle" fontSize="10" fontWeight="bold" fill={isSelected ? '#262A28' : '#FFFFFF'}>
                                {({available:'● Open',pending:'◆ Pending',booked:'■ Booked',sold:'✕ Sold',blocked:'– Blocked'} as Record<string,string>)[plot.status]}
                              </text>
                            )}
                            <title>{plot.number} · {plot.status}</title>
                          </g>
                        );
                      })}
                    </svg>
                  </div>
                </div>
              </div>

              {/* Selected Plot Sheet */}
              {selectedPlot && (
                <div className="fixed inset-0 z-50 bg-black/40 flex items-end sm:items-center justify-center p-0 sm:p-4">
                  <div className="bg-white w-full sm:max-w-md rounded-t-2xl sm:rounded-2xl border shadow-xl overflow-hidden">
                    <div className="p-5 border-b flex items-center justify-between bg-[#F0F6F3]">
                      <div className="flex items-center gap-3">
                        <span className="w-10 h-10 rounded-xl bg-[#1E4A3B] text-white font-serif font-bold text-lg flex items-center justify-center">
                          {selectedPlot.number}
                        </span>
                        <div>
                          <h3 className="font-serif text-xl font-bold text-[#0F261E]">Plot {selectedPlot.number}</h3>
                          <StatusBadge type="plot" status={selectedPlot.status} size="sm" />
                        </div>
                      </div>
                      <button onClick={() => setSelectedPlot(null)} className="p-2 text-gray-500 hover:text-gray-700">
                        <Icon name="x" className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="p-5 space-y-4 text-sm">
                      <div className="bg-[#DDE9E2]/60 p-4 rounded-xl border flex items-center justify-between">
                        <div>
                          <span className="text-xs uppercase font-bold text-gray-600 block">Transparent Price</span>
                          <strong className="text-2xl font-bold text-[#0F261E]">{formatInr(selectedPlot.priceInr)}</strong>
                        </div>
                        <span className="text-xs text-gray-500">All Inclusive</span>
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <span className="text-gray-500 block">Area:</span>
                          <strong className="text-sm font-bold text-gray-800">{selectedPlot.sizeSqYards} sq.yd ({selectedPlot.sizeAcres})</strong>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <span className="text-gray-500 block">Facing:</span>
                          <strong className="text-sm font-bold text-gray-800">{selectedPlot.facing} Facing</strong>
                        </div>
                      </div>
                    </div>

                    <div className="p-5 border-t bg-white flex gap-2">
                      {selectedPlot.status === 'available' ? (
                        <React.Fragment>
                          <button
                            onClick={() => {
                              const n = selectedPlot.number;
                              setSelectedPlot(null);
                              setActivePlotNumber(n);
                              setCustomerPage('reserve');
                            }}
                            className="flex-1 py-3 rounded-xl bg-[#1E4A3B] text-white font-bold text-sm min-h-[48px]"
                          >
                            Request 7-Day Hold
                          </button>
                          <button
                            onClick={() => {
                              const n = selectedPlot.number;
                              setSelectedPlot(null);
                              setActivePlotNumber(n);
                              setCustomerPage('enquiry');
                            }}
                            className="py-3 px-4 rounded-xl border font-bold text-sm min-h-[48px]"
                          >
                            Book Visit
                          </button>
                        </React.Fragment>
                      ) : (
                        <button onClick={() => setSelectedPlot(null)} className="w-full py-3 rounded-xl bg-gray-800 text-white font-bold text-sm min-h-[48px]">
                          Close
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {customerPage === 'enquiry' && (
            <div className="max-w-xl mx-auto py-12 px-4 space-y-6">
              <div className="text-center">
                <span className="text-xs font-bold uppercase tracking-wider text-[#1E4A3B] block mb-1">Free Guided Tour</span>
                <h2 className="font-serif text-3xl font-bold text-[#0F261E]">Book Your Free Farmland Visit</h2>
                <p className="text-xs text-gray-600 mt-1">Free AC car pickup from city • Soil & water testing • Farm lunch</p>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  addToast('Visit Request Submitted', 'Our farm manager Venkat Rao will call you to confirm AC cab pickup.');
                  setCustomerPage('home');
                }}
                className="bg-white p-6 rounded-2xl border border-[#DCE4DE] shadow-md space-y-4 text-sm"
              >
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Farmland Project</label>
                  <input type="text" value="Green Valley Farms (Chevella)" disabled className="w-full p-3 rounded-xl bg-gray-50 border text-gray-700 font-bold" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Your Full Name *</label>
                  <input type="text" placeholder="e.g. Ramesh Naidu" required className="w-full p-3.5 rounded-xl border text-base" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">10-Digit Mobile Number *</label>
                  <input type="tel" placeholder="98480 12345" required maxLength={10} className="w-full p-3.5 rounded-xl border text-base" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Preferred Date *</label>
                  <input type="date" defaultValue="2026-11-15" required className="w-full p-3.5 rounded-xl border text-base" />
                </div>
                <button type="submit" className="w-full py-4 rounded-xl bg-[#1E4A3B] text-white text-base font-bold hover:bg-[#173B2F] min-h-[48px]">
                  Submit Free Visit Request
                </button>
              </form>
            </div>
          )}

          {customerPage === 'reserve' && (
            <div className="max-w-2xl mx-auto py-12 px-4 space-y-6">
              <div className="text-center">
                <span className="text-xs font-bold uppercase tracking-wider text-[#1E4A3B] block mb-1">Priority Holding</span>
                <h2 className="font-serif text-3xl font-bold text-[#0F261E]">Request Plot Reservation</h2>
              </div>

              <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 flex items-start gap-3">
                <Icon name="shieldAlert" className="w-6 h-6 text-amber-700 shrink-0 mt-0.5" />
                <div className="text-xs text-amber-950">
                  <strong className="block text-sm font-bold text-amber-900">Notice: This is a REQUEST and NOT a confirmed sale</strong>
                  No money is taken online. This places a 7-day hold on Plot {activePlotNumber} so you can verify legal files before making any token payment.
                </div>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setPlots(prev => prev.map(p => p.number === activePlotNumber ? { ...p, status: 'pending' } : p));
                  addToast('7-Day Hold Placed', `Plot ${activePlotNumber} is now reserved for legal review.`);
                  setCustomerPage('portal');
                }}
                className="bg-white p-6 rounded-2xl border border-[#DCE4DE] shadow-md space-y-4 text-sm"
              >
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Selected Farmland Unit</label>
                  <input type="text" value={`Plot ${activePlotNumber} (Green Valley Farms)`} disabled className="w-full p-3 rounded-xl bg-gray-50 border font-bold" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Your Full Name *</label>
                  <input type="text" required placeholder="e.g. Ramesh Naidu" className="w-full p-3.5 rounded-xl border text-base" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">10-Digit Mobile *</label>
                  <input type="tel" required maxLength={10} placeholder="98480 12345" className="w-full p-3.5 rounded-xl border text-base" />
                </div>
                <button type="submit" className="w-full py-4 rounded-xl bg-[#1E4A3B] text-white font-bold text-base hover:bg-[#173B2F] min-h-[48px]">
                  Submit 7-Day Hold Request (No Payment)
                </button>
              </form>
            </div>
          )}

          {customerPage === 'portal' && (
            <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-6">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                <h2 className="font-serif text-3xl font-bold text-[#0F261E]">Customer Land Portal</h2>
                {/* State Demo Toggle */}
                <div className="flex items-center gap-1.5 bg-gray-100 p-1 rounded-xl text-xs font-bold">
                  <span className="text-gray-500 px-2">State Demo:</span>
                  {(['normal', 'skeleton', 'empty', 'error'] as const).map(s => (
                    <button
                      key={s}
                      onClick={() => setPortalState(s)}
                      className={`px-2.5 py-1 rounded-lg capitalize ${portalState === s ? 'bg-[#1E4A3B] text-white' : 'text-gray-600'}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {portalState === 'skeleton' && (
                <div className="bg-white p-6 rounded-2xl border space-y-4 animate-pulse">
                  <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-20 bg-gray-100 rounded-xl"></div>
                  <div className="h-20 bg-gray-100 rounded-xl"></div>
                </div>
              )}

              {portalState === 'empty' && (
                <div className="bg-white p-12 rounded-2xl border text-center space-y-3">
                  <Icon name="shieldAlert" className="w-12 h-12 text-gray-400 mx-auto" />
                  <h3 className="font-serif text-xl font-bold text-[#0F261E]">No Booking Requests Found</h3>
                  <p className="text-xs text-gray-500">You haven't requested any plots yet. Explore our 40-plot layout map.</p>
                  <button onClick={() => setCustomerPage('plots')} className="px-5 py-2.5 rounded-xl bg-[#1E4A3B] text-white font-bold text-xs">
                    Browse Plots Map
                  </button>
                </div>
              )}

              {portalState === 'error' && (
                <div className="bg-rose-50 p-8 rounded-2xl border border-rose-300 text-center space-y-3">
                  <Icon name="xCircle" className="w-12 h-12 text-rose-600 mx-auto" />
                  <h3 className="font-serif text-xl font-bold text-rose-950">Unable to Connect to Portal API</h3>
                  <p className="text-xs text-gray-600">Failed to fetch title deed records. Please retry.</p>
                  <button onClick={() => setPortalState('normal')} className="px-5 py-2 rounded-xl bg-rose-700 text-white font-bold text-xs">
                    Retry Connection
                  </button>
                </div>
              )}

              {portalState === 'normal' && (
                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-2xl border border-[#DCE4DE] shadow-sm space-y-4">
                    <h3 className="font-serif text-lg font-bold text-[#0F261E]">Active Requests Progress</h3>
                    <div className="p-4 bg-[#F0F6F3] rounded-xl border space-y-3">
                      <div className="flex justify-between items-center text-sm">
                        <strong>Plot A-03 (605 sq.yd / 0.125 Acre)</strong>
                        <span className="font-bold text-emerald-800">Visit Confirmed</span>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                        <div className="p-2 bg-emerald-100 rounded text-emerald-950 font-bold">1. Received ✓</div>
                        <div className="p-2 bg-emerald-100 rounded text-emerald-950 font-bold">2. Guide Assigned ✓</div>
                        <div className="p-2 bg-emerald-100 rounded text-emerald-950 font-bold">3. Visit Confirmed ✓</div>
                        <div className="p-2 bg-white rounded text-gray-500 border">4. 7-Day Hold</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-2xl border border-[#DCE4DE] shadow-sm space-y-4">
                    <h3 className="font-serif text-lg font-bold text-[#0F261E]">Downloadable Legal Opinions & Master Blueprints</h3>
                    <div className="divide-y text-xs">
                      {[
                        { title: '30-Year Legal Title Search Opinion', cat: 'High Court Certificate', size: '2.4 MB (PDF)' },
                        { title: 'Master Farmland Layout Plan (40 Units)', cat: 'Survey Department Approved', size: '4.8 MB (PDF)' },
                        { title: 'Ground Water & Soil Lab Test Report', cat: 'Agricultural University Certified', size: '1.2 MB (PDF)' }
                      ].map((d, idx) => (
                        <div key={idx} className="py-3 flex items-center justify-between">
                          <div>
                            <strong className="block text-sm font-bold text-[#0F261E]">{d.title}</strong>
                            <span className="text-gray-500">{d.cat} • {d.size}</span>
                          </div>
                          <button
                            onClick={() => addToast('Document Download', `Downloading ${d.title}`)}
                            className="px-3.5 py-1.5 rounded-lg border bg-white font-bold flex items-center gap-1.5"
                          >
                            <Icon name="download" className="w-3.5 h-3.5 text-[#1E4A3B]" />
                            <span>Download</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </main>
      ) : (
        /* INTERNAL CRM SYSTEM */
        <div className="flex-1 flex flex-col">
          {!isAuthenticated ? (
            /* SECTION A: LOGIN & ACCESS */
            <div className="max-w-md mx-auto my-12 p-8 bg-white dark:bg-[#242C27] rounded-2xl border shadow-lg space-y-6 w-full">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-[#1E4A3B] text-white rounded-xl mx-auto flex items-center justify-center">
                  <Icon name="lock" className="w-6 h-6 text-emerald-300" />
                </div>
                <h2 className="font-serif text-2xl font-bold text-[#0F261E] dark:text-white">Farmland CRM Staff Access</h2>
                <p className="text-xs text-gray-500">Sign in to manage plots, site tours, and field sales pipelines.</p>
              </div>

              {loginError && (
                <div className="p-3 bg-rose-50 border border-rose-300 rounded-xl text-xs text-rose-900 font-bold flex items-start gap-2">
                  <Icon name="shieldAlert" className="w-4 h-4 text-rose-700 shrink-0 mt-0.5" />
                  <span>{loginError}</span>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">Work Email or 10-Digit Mobile</label>
                  <input
                    type="text"
                    value={loginIdentifier}
                    onChange={(e) => setLoginIdentifier(e.target.value)}
                    required
                    className="w-full p-3 rounded-xl border text-sm"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">Password</label>
                  <input
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                    className="w-full p-3 rounded-xl border text-sm"
                  />
                </div>

                <div className="flex items-center justify-between text-xs">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isInactiveAccount}
                      onChange={(e) => setIsInactiveAccount(e.target.checked)}
                      className="rounded"
                    />
                    <span className="text-gray-500">Test Inactive State</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => { setShowForgotModal(true); setForgotStep(1); }}
                    className="font-bold text-[#1E4A3B] dark:text-emerald-400 hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#1E4A3B] text-white font-bold rounded-xl text-base hover:bg-[#173B2F] min-h-[48px]"
                >
                  Sign In to CRM Portal
                </button>
              </form>
            </div>
          ) : (
            /* CRM AUTHENTICATED WORKSPACE */
            <div className="flex-1 flex flex-col">
              {/* Role Switcher & Header Controls */}
              <div className="bg-white dark:bg-[#242C27] border-b border-[#DCE4DE] dark:border-gray-800">
                <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase text-gray-500 flex items-center gap-1">
                      <Icon name="users" className="w-4 h-4 text-[#1E4A3B] dark:text-emerald-400" />
                      <span>Role:</span>
                    </span>
                    <div className="inline-flex rounded-xl p-1 bg-gray-100 dark:bg-gray-800 border">
                      {(['Admin', 'Moderator', 'Sales Person', 'Agent'] as UserRole[]).map(r => (
                        <button
                          key={r}
                          onClick={() => {
                            setCurrentRole(r);
                            addToast(`Active Role: ${r}`, `Pipeline and permissions switched to ${r}.`);
                          }}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all min-h-[40px] ${
                            currentRole === r ? 'bg-white dark:bg-[#1A211D] text-[#0F261E] dark:text-emerald-300 shadow-sm' : 'text-gray-500'
                          }`}
                        >
                          {r}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCrmTab('profile')}
                      className="px-3 py-1.5 rounded-lg border text-xs font-bold flex items-center gap-1.5 bg-gray-50 dark:bg-gray-800 min-h-[40px]"
                    >
                      <Icon name="userCheck" className="w-3.5 h-3.5 text-emerald-600" />
                      <span>My Profile & Payout</span>
                    </button>
                    <button
                      onClick={() => {
                        setIsAuthenticated(false);
                        addToast('Signed Out', 'You have been safely signed out of the internal CRM.');
                      }}
                      className="px-3 py-1.5 rounded-lg border text-xs font-bold hover:bg-gray-50 dark:hover:bg-gray-800 text-rose-700 min-h-[40px]"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>

                {/* CRM Main Tab Bar */}
                <div className="max-w-7xl mx-auto px-4 flex gap-2 overflow-x-auto py-2">
                  {[
                    { id: 'admin_dash', label: 'Admin Dashboard', icon: 'pieChart', roles: ['Admin'] },
                    { id: 'moderator_dash', label: 'Moderator Desk', icon: 'shieldAlert', roles: ['Admin', 'Moderator'] },
                    { id: 'queue', label: `Lead Queue (${unassignedLeads.length})`, icon: 'layers', roles: ['Admin', 'Moderator'] },
                    { id: 'leads', label: 'Pipeline Leads', icon: 'users', roles: ['Admin', 'Moderator', 'Sales Person', 'Agent'] },
                    { id: 'project_setup', label: 'Project Setup & Plots', icon: 'folderPlus', roles: ['Admin'] },
                    { id: 'hierarchy', label: '15-Level Hierarchy', icon: 'gitBranch', roles: ['Admin', 'Moderator'] },
                    { id: 'offers', label: 'Offers & Rules', icon: 'tag', roles: ['Admin'] },
                    { id: 'agent', label: 'Agent Metrics', icon: 'barChart', roles: ['Admin', 'Sales Person', 'Agent'] },
                    { id: 'safeguard', label: 'Double-Booking Demo', icon: 'shieldCheck', roles: ['Admin', 'Sales Person', 'Agent'] },
                    { id: 'p2_ledger', label: 'Rewards Ledger', icon: 'creditCard', roles: ['Admin', 'Sales Person', 'Agent'], planned: true },
                    { id: 'p2_settlement', label: 'Settlements', icon: 'archive', roles: ['Admin'], planned: true },
                    { id: 'p2_finance', label: 'Company Finance', icon: 'barChart', roles: ['Admin'], planned: true },
                    { id: 'p2_cms', label: 'Farmland Blog CMS', icon: 'fileText', roles: ['Admin'], planned: true },
                    { id: 'p2_audit', label: 'Master Audit Log', icon: 'shieldCheck', roles: ['Admin'], planned: true },
                  ]
                    .filter(tab => tab.roles.includes(currentRole))
                    .map(tab => (
                      <button
                        key={tab.id}
                        onClick={() => setCrmTab(tab.id as any)}
                        className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap min-h-[44px] ${
                          crmTab === tab.id
                            ? 'bg-[#1E4A3B] text-white shadow-sm'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                        }`}
                      >
                        <Icon name={tab.icon} className="w-3.5 h-3.5" />
                        <span>{tab.label}</span>
                        {tab.planned && (
                          <span className="text-[10px] uppercase font-bold bg-amber-200 text-amber-900 px-1.5 py-0.5 rounded-full">
                            Planned
                          </span>
                        )}
                      </button>
                    ))}
                </div>
              </div>

              {/* CRM Tab Contents */}
              <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-6">
                {/* SECTION F: ADMIN DASHBOARD */}
                {crmTab === 'admin_dash' && (
                  <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                      <div>
                        <h2 className="font-serif text-2xl font-bold text-[#0F261E] dark:text-white">Farmland Executive Dashboard</h2>
                        <p className="text-xs text-gray-500">Live operational oversight for Green Valley Farms project portfolio.</p>
                      </div>
                      <span className="text-xs bg-emerald-100 text-emerald-950 font-bold px-3 py-1.5 rounded-full border border-emerald-300">
                        Portfolio Healthy • 40 Units Monitored
                      </span>
                    </div>

                    {/* KPI Metric Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                      <div className="bg-white dark:bg-[#242C27] p-5 rounded-2xl border shadow-sm space-y-1">
                        <span className="text-gray-500 block uppercase font-bold text-[11px]">Total Booked Value</span>
                        <strong className="text-2xl font-bold text-[#0F261E] dark:text-white block">₹4,28,45,000</strong>
                        <span className="text-gray-400 text-[11px]">Agreed sale value across booked &amp; sold units</span>
                      </div>
                      <div className="bg-white dark:bg-[#242C27] p-5 rounded-2xl border shadow-sm space-y-1">
                        <span className="text-gray-500 block uppercase font-bold text-[11px]">Realized Bank Collections</span>
                        <strong className="text-2xl font-bold text-emerald-700 block">₹1,85,50,000</strong>
                        <span className="text-emerald-800 text-[11px] font-semibold">Strictly deposited & cleared funds</span>
                      </div>
                      <div className="bg-white dark:bg-[#242C27] p-5 rounded-2xl border shadow-sm space-y-1">
                        <span className="text-gray-500 block uppercase font-bold text-[11px]">Plot Availability</span>
                        <strong className="text-2xl font-bold text-blue-700 block">
                          {plots.filter(p => p.status === 'available').length} / 40 Open
                        </strong>
                        <span className="text-gray-400 text-[11px]">5 Pending • 6 Booked • 7 Sold</span>
                      </div>
                      <div className="bg-white dark:bg-[#242C27] p-5 rounded-2xl border shadow-sm space-y-1">
                        <span className="text-gray-500 block uppercase font-bold text-[11px]">Expenses Awaiting Review</span>
                        <strong className="text-2xl font-bold text-amber-700 block">₹14,800</strong>
                        <span className="text-amber-800 text-[11px] font-semibold">3 AC cab fuel & lunch bills</span>
                      </div>
                    </div>

                    {/* Clean Donut Chart & Lead Funnel */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="bg-white dark:bg-[#242C27] p-6 rounded-2xl border shadow-sm space-y-4">
                        <h3 className="font-serif font-bold text-base text-[#0F261E] dark:text-white">Unit Inventory Breakdown</h3>
                        <div className="flex items-center gap-6">
                          <svg viewBox="0 0 100 100" className="w-36 h-36 shrink-0">
                            <circle cx="50" cy="50" r="40" fill="transparent" stroke="#2E6B55" strokeWidth="20" strokeDasharray="138 251" strokeDashoffset="0" />
                            <circle cx="50" cy="50" r="40" fill="transparent" stroke="#D69E2E" strokeWidth="20" strokeDasharray="31 251" strokeDashoffset="-138" />
                            <circle cx="50" cy="50" r="40" fill="transparent" stroke="#2B6CB0" strokeWidth="20" strokeDasharray="38 251" strokeDashoffset="-169" />
                            <circle cx="50" cy="50" r="40" fill="transparent" stroke="#C53030" strokeWidth="20" strokeDasharray="44 251" strokeDashoffset="-207" />
                          </svg>
                          <div className="space-y-1.5 text-xs">
                            <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-[#2E6B55]"></span><span>Available: 22 (55%)</span></div>
                            <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-[#D69E2E]"></span><span>Reservation Pending: 5 (12%)</span></div>
                            <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-[#2B6CB0]"></span><span>Booked: 6 (15%)</span></div>
                            <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-[#C53030]"></span><span>Sold & Registered: 7 (18%)</span></div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white dark:bg-[#242C27] p-6 rounded-2xl border shadow-sm space-y-4">
                        <h3 className="font-serif font-bold text-base text-[#0F261E] dark:text-white">Farmland Sales Funnel</h3>
                        <div className="space-y-2 text-xs">
                          {[
                            { stage: '1. Inbound Inquiries', count: 32, width: '100%' },
                            { stage: '2. Contacted & Vetted', count: 24, width: '75%' },
                            { stage: '3. AC Farm Tour Completed', count: 18, width: '56%' },
                            { stage: '4. Title Search & Hold', count: 11, width: '34%' },
                            { stage: '5. Converted & Registered', count: 6, width: '19%' }
                          ].map(f => (
                            <div key={f.stage} className="space-y-1">
                              <div className="flex justify-between font-bold">
                                <span>{f.stage}</span>
                                <span>{f.count} leads</span>
                              </div>
                              <div className="w-full h-3 rounded-full bg-gray-100 overflow-hidden">
                                <div className="h-full bg-[#1E4A3B] rounded-full" style={{ width: f.width }}></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* SECTION F: MODERATOR DASHBOARD */}
                {crmTab === 'moderator_dash' && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <h2 className="font-serif text-2xl font-bold text-[#0F261E] dark:text-white">Moderator Control Desk</h2>
                        <p className="text-xs text-gray-500">Real-time operational queues and delivery troubleshooting.</p>
                      </div>
                      <span className="px-3 py-1 bg-amber-100 text-amber-950 font-bold rounded-full text-xs">
                        Moderation Active
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
                      <div className="bg-white dark:bg-[#242C27] p-4 rounded-xl border shadow-sm">
                        <span className="text-gray-500 block">Unassigned Inbounds</span>
                        <strong className="text-2xl font-bold text-rose-700">{unassignedLeads.length}</strong>
                      </div>
                      <div className="bg-white dark:bg-[#242C27] p-4 rounded-xl border shadow-sm">
                        <span className="text-gray-500 block">Overdue Follow-Ups</span>
                        <strong className="text-2xl font-bold text-amber-700">{overdueFollowUps.length}</strong>
                      </div>
                      <div className="bg-white dark:bg-[#242C27] p-4 rounded-xl border shadow-sm">
                        <span className="text-gray-500 block">Import Discrepancies</span>
                        <strong className="text-2xl font-bold text-purple-700">1 Row</strong>
                      </div>
                      <div className="bg-white dark:bg-[#242C27] p-4 rounded-xl border shadow-sm">
                        <span className="text-gray-500 block">WhatsApp Retries Pending</span>
                        <strong className="text-2xl font-bold text-blue-700">0</strong>
                      </div>
                    </div>

                    <div className="bg-white dark:bg-[#242C27] p-6 rounded-2xl border shadow-sm space-y-4">
                      <h3 className="font-serif font-bold text-base text-[#0F261E] dark:text-white">Immediate Attention Queue</h3>
                      <div className="divide-y text-xs">
                        {overdueFollowUps.map(lead => (
                          <div key={lead.id} className="py-3 flex items-center justify-between">
                            <div>
                              <strong className="block text-sm text-[#0F261E] dark:text-white">{lead.name}</strong>
                              <span className="text-rose-700 font-bold">Follow-up overdue since {lead.nextFollowUpDate} • Owner: {lead.ownerName}</span>
                            </div>
                            <button
                              onClick={() => {
                                setCrmTab('leads');
                              }}
                              className="px-3 py-1.5 rounded-lg bg-[#1E4A3B] text-white font-bold"
                            >
                              Intervene →
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* SECTION B: ASSIGNMENT QUEUE */}
                {crmTab === 'queue' && (
                  <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                      <div>
                        <h2 className="font-serif text-2xl font-bold text-[#0F261E] dark:text-white">Inbound Lead Assignment Queue</h2>
                        <p className="text-xs text-gray-500">Assign website and call inquiries to sales staff with balanced workloads.</p>
                      </div>
                      <div className="bg-emerald-50 border border-emerald-300 px-3 py-1.5 rounded-xl text-xs text-emerald-950 font-bold">
                        Staff Workload: Venkat Rao (5 leads) • K. Sridhar (3 leads)
                      </div>
                    </div>

                    <div className="bg-white dark:bg-[#242C27] rounded-2xl border shadow-sm overflow-x-auto">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead className="bg-[#F0F6F3] dark:bg-gray-800 border-b font-bold text-gray-600 uppercase">
                          <tr>
                            <th className="p-3">Inbound Customer</th>
                            <th className="p-3">Source & Project</th>
                            <th className="p-3">Budget</th>
                            <th className="p-3">Current Assignment</th>
                            <th className="p-3 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y">
                          {leads.map(lead => (
                            <tr key={lead.id} className="hover:bg-gray-50">
                              <td className="p-3">
                                <strong className="block text-sm text-[#0F261E] dark:text-white">{lead.name}</strong>
                                <span className="text-gray-500">{lead.phone} • {lead.id}</span>
                              </td>
                              <td className="p-3">
                                <div>{lead.source}</div>
                                <span className="text-gray-400">{lead.project}</span>
                              </td>
                              <td className="p-3 font-semibold">{formatInr(lead.budgetInr)}</td>
                              <td className="p-3">
                                <span className="font-bold text-[#1E4A3B] dark:text-emerald-400 block">{lead.ownerName}</span>
                                <span className="text-gray-400">{lead.ownerRole}</span>
                              </td>
                              <td className="p-3 text-right space-x-2">
                                <button
                                  onClick={() => handleRoundRobinAssign(lead.id)}
                                  className="px-3 py-1.5 rounded-lg bg-emerald-700 text-white font-bold text-xs"
                                >
                                  Suggest Round-Robin
                                </button>
                                <button
                                  onClick={() => {
                                    setCrmTab('leads');
                                  }}
                                  className="px-3 py-1.5 rounded-lg border font-bold text-xs"
                                >
                                  Manual Pick
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* SECTION C: PROJECT SETUP & PLOT MANAGER */}
                {crmTab === 'project_setup' && (
                  <div className="space-y-8">
                    <div className="bg-white dark:bg-[#242C27] p-6 rounded-2xl border shadow-sm space-y-4">
                      <div className="flex justify-between items-center border-b pb-3">
                        <div>
                          <span className="text-xs uppercase font-bold text-emerald-800">Admin Setup Wizard</span>
                          <h2 className="font-serif text-xl font-bold text-[#0F261E] dark:text-white">
                            Create Farmland Project (Step {setupStep} of 5)
                          </h2>
                        </div>
                        <div className="flex gap-1 text-xs font-bold">
                          {[1, 2, 3, 4, 5].map(s => (
                            <span key={s} className={`w-6 h-6 rounded-full flex items-center justify-center ${setupStep === s ? 'bg-[#1E4A3B] text-white' : 'bg-gray-100 text-gray-600'}`}>
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>

                      {setupStep === 1 && (
                        <div className="space-y-3 text-xs">
                          <h3 className="font-bold text-sm text-[#0F261E] dark:text-white">Step 1: Project Basic Details</h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block font-bold text-gray-700 mb-1">Project Code *</label>
                              <input type="text" value={newProjectCode} onChange={(e) => setNewProjectCode(e.target.value)} className="w-full p-2.5 border rounded-lg" />
                            </div>
                            <div>
                              <label className="block font-bold text-gray-700 mb-1">Project Name *</label>
                              <input type="text" value={newProjectName} onChange={(e) => setNewProjectName(e.target.value)} className="w-full p-2.5 border rounded-lg" />
                            </div>
                            <div className="sm:col-span-2">
                              <label className="block font-bold text-gray-700 mb-1">Farmland Location *</label>
                              <input type="text" value={newProjectLocation} onChange={(e) => setNewProjectLocation(e.target.value)} className="w-full p-2.5 border rounded-lg" />
                            </div>
                          </div>
                          <button onClick={() => setSetupStep(2)} className="py-2.5 px-6 bg-[#1E4A3B] text-white font-bold rounded-xl text-xs">
                            Next: Media & Layout →
                          </button>
                        </div>
                      )}

                      {setupStep === 2 && (
                        <div className="space-y-3 text-xs">
                          <h3 className="font-bold text-sm text-[#0F261E] dark:text-white">Step 2: Media & Drone Photography</h3>
                          <div className="border-2 border-dashed p-6 text-center rounded-xl space-y-2">
                            <Icon name="map" className="w-8 h-8 text-emerald-700 mx-auto" />
                            <p className="text-gray-600 font-bold">Upload High-Court Certified Title Deed & Drone Survey Map (JPG/PDF)</p>
                            <span className="text-[11px] text-gray-400">Sample file survey_map_phase2.dwg loaded</span>
                          </div>
                          <div className="flex gap-2">
                            <button onClick={() => setSetupStep(1)} className="py-2 px-4 border rounded-xl font-bold">Back</button>
                            <button onClick={() => setSetupStep(3)} className="py-2.5 px-6 bg-[#1E4A3B] text-white font-bold rounded-xl">Next: Plot Units →</button>
                          </div>
                        </div>
                      )}

                      {setupStep === 3 && (
                        <div className="space-y-3 text-xs">
                          <h3 className="font-bold text-sm text-[#0F261E] dark:text-white">Step 3: Plots Import</h3>
                          <p className="text-gray-600">40 Plots loaded in template layout (Blocks A to D).</p>
                          <div className="flex gap-2">
                            <button onClick={() => setSetupStep(2)} className="py-2 px-4 border rounded-xl font-bold">Back</button>
                            <button onClick={() => setSetupStep(4)} className="py-2.5 px-6 bg-[#1E4A3B] text-white font-bold rounded-xl">Next: Offers & Rules →</button>
                          </div>
                        </div>
                      )}

                      {setupStep === 4 && (
                        <div className="space-y-3 text-xs">
                          <h3 className="font-bold text-sm text-[#0F261E] dark:text-white">Step 4: Link Active Commission & Bonus Rules</h3>
                          <div className="p-3 bg-gray-50 rounded-xl space-y-1">
                            <label className="flex items-center gap-2">
                              <input type="checkbox" defaultChecked />
                              <span>Link "Karthika Masam Special Token Bonus"</span>
                            </label>
                          </div>
                          <div className="flex gap-2">
                            <button onClick={() => setSetupStep(3)} className="py-2 px-4 border rounded-xl font-bold">Back</button>
                            <button onClick={() => setSetupStep(5)} className="py-2.5 px-6 bg-[#1E4A3B] text-white font-bold rounded-xl">Next: Team & Visibility →</button>
                          </div>
                        </div>
                      )}

                      {setupStep === 5 && (
                        <div className="space-y-3 text-xs">
                          <h3 className="font-bold text-sm text-[#0F261E] dark:text-white">Step 5: Team Visibility</h3>
                          <label className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl">
                            <input
                              type="checkbox"
                              checked={newProjectPublic}
                              onChange={(e) => setNewProjectPublic(e.target.checked)}
                            />
                            <span>Publish to public customer website instantly</span>
                          </label>
                          <div className="flex gap-2 pt-2">
                            <button onClick={() => setSetupStep(4)} className="py-2 px-4 border rounded-xl font-bold">Back</button>
                            <button
                              onClick={() => {
                                setSetupStep(1);
                                addToast('Project Created', `${newProjectName} successfully deployed with 40 units.`);
                              }}
                              className="py-2.5 px-6 bg-emerald-700 text-white font-bold rounded-xl"
                            >
                              Finalize & Deploy Project ✓
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Plot Bulk State Editor Table */}
                    <div className="bg-white dark:bg-[#242C27] p-6 rounded-2xl border shadow-sm space-y-4">
                      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                        <div>
                          <h3 className="font-serif font-bold text-base text-[#0F261E] dark:text-white">Farmland Units Table & Bulk State Editor</h3>
                          <p className="text-xs text-gray-500">Edit status across multiple plots simultaneously.</p>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                          <select
                            value={bulkStatusToApply}
                            onChange={(e) => setBulkStatusToApply(e.target.value as PlotStatus)}
                            className="p-2 border rounded-lg font-bold"
                          >
                            <option value="available">Available (Green)</option>
                            <option value="pending">Reservation pending (Yellow)</option>
                            <option value="booked">Booked (Blue)</option>
                            <option value="sold">Sold (Red)</option>
                            <option value="blocked">Blocked (Grey)</option>
                          </select>
                          <button
                            onClick={() => {
                              if (selectedPlotTableIds.length === 0) {
                                addToast('Select Plots', 'Please tick at least one plot in the table.');
                                return;
                              }
                              setPlots(prev => prev.map(p => selectedPlotTableIds.includes(p.id) ? { ...p, status: bulkStatusToApply } : p));
                              addToast('Bulk Status Updated', `Updated ${selectedPlotTableIds.length} plots to ${bulkStatusToApply}.`);
                              setSelectedPlotTableIds([]);
                            }}
                            className="px-4 py-2 bg-[#1E4A3B] text-white font-bold rounded-lg"
                          >
                            Apply Bulk Status
                          </button>
                        </div>
                      </div>

                      <div className="max-h-80 overflow-auto border rounded-xl">
                        <table className="w-full text-left text-xs">
                          <thead className="bg-[#F0F6F3] sticky top-0 border-b font-bold text-gray-600">
                            <tr>
                              <th className="p-3 w-8">
                                <input
                                  type="checkbox"
                                  onChange={(e) => {
                                    if (e.target.checked) setSelectedPlotTableIds(plots.map(p => p.id));
                                    else setSelectedPlotTableIds([]);
                                  }}
                                />
                              </th>
                              <th className="p-3">Plot Number</th>
                              <th className="p-3">Block</th>
                              <th className="p-3">Size</th>
                              <th className="p-3">Price</th>
                              <th className="p-3">Current Status</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y">
                            {plots.map(plot => (
                              <tr key={plot.id} className="hover:bg-gray-50">
                                <td className="p-3">
                                  <input
                                    type="checkbox"
                                    checked={selectedPlotTableIds.includes(plot.id)}
                                    onChange={() => {
                                      setSelectedPlotTableIds(prev => prev.includes(plot.id) ? prev.filter(x => x !== plot.id) : [...prev, plot.id]);
                                    }}
                                  />
                                </td>
                                <td className="p-3 font-bold">{plot.number}</td>
                                <td className="p-3">{plot.block}</td>
                                <td className="p-3">{plot.sizeSqYards} sq.yd ({plot.sizeAcres})</td>
                                <td className="p-3 font-semibold">{formatInr(plot.priceInr)}</td>
                                <td className="p-3"><StatusBadge type="plot" status={plot.status} size="sm" /></td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}

                {/* SECTION D: TEAM HIERARCHY (15-LEVEL TREE) */}
                {crmTab === 'hierarchy' && (
                  <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                      <div>
                        <h2 className="font-serif text-2xl font-bold text-[#0F261E] dark:text-white">Reporting Lines & 15-Level Ladder</h2>
                        <p className="text-xs text-gray-500">Configurable sales hierarchy with circular reporting line safeguards.</p>
                      </div>
                      <div className="w-64">
                        <input
                          type="text"
                          placeholder="Search staff or level..."
                          value={hierarchySearch}
                          onChange={(e) => setHierarchySearch(e.target.value)}
                          className="w-full p-2 border rounded-xl text-xs"
                        />
                      </div>
                    </div>

                    {hierarchyError && (
                      <div className="p-3 bg-rose-50 border border-rose-300 rounded-xl text-xs text-rose-900 font-bold flex items-center gap-2">
                        <Icon name="shieldAlert" className="w-4 h-4 text-rose-700 shrink-0" />
                        <span>{hierarchyError}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                      {/* Tree View */}
                      <div className="lg:col-span-7 bg-white dark:bg-[#242C27] p-6 rounded-2xl border shadow-sm space-y-3">
                        <h3 className="font-serif font-bold text-base text-[#0F261E] dark:text-white mb-2">Organization Structure</h3>
                        <div className="space-y-2 text-xs">
                          {hierarchy
                            .filter(h => h.name.toLowerCase().includes(hierarchySearch.toLowerCase()) || h.levelTitle.toLowerCase().includes(hierarchySearch.toLowerCase()))
                            .map(node => (
                              <div
                                key={node.id}
                                onClick={() => {
                                  setSelectedPerson(node);
                                  setHierarchyError('');
                                }}
                                className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                                  selectedPerson?.id === node.id ? 'bg-[#F0F6F3] border-[#1E4A3B] shadow-sm' : 'hover:bg-gray-50'
                                }`}
                              >
                                <div className="flex items-center gap-3">
                                  <span className="w-8 h-8 rounded-lg bg-[#1E4A3B] text-white font-bold flex items-center justify-center text-xs">
                                    L{node.level}
                                  </span>
                                  <div>
                                    <strong className="block text-sm text-[#0F261E] dark:text-white">{node.name}</strong>
                                    <span className="text-gray-500">{node.levelTitle}</span>
                                  </div>
                                </div>
                                <span className="text-xs text-gray-500 font-semibold">{node.teamCount} Team Members</span>
                              </div>
                            ))}
                        </div>
                      </div>

                      {/* Selected Person Profile Panel */}
                      {selectedPerson && (
                        <div className="lg:col-span-5 bg-white dark:bg-[#242C27] p-6 rounded-2xl border shadow-sm space-y-4 text-xs">
                          <div className="flex justify-between items-start border-b pb-3">
                            <div>
                              <h3 className="font-serif text-lg font-bold text-[#0F261E] dark:text-white">{selectedPerson.name}</h3>
                              <span className="text-gray-500">{selectedPerson.levelTitle}</span>
                            </div>
                            <span className="px-2.5 py-1 bg-emerald-100 text-emerald-950 font-bold rounded-full">
                              Level {selectedPerson.level}
                            </span>
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <div className="p-3 bg-gray-50 rounded-lg">
                              <span className="text-gray-500 block">Direct Team:</span>
                              <strong className="text-sm text-gray-800">{selectedPerson.teamCount} Members</strong>
                            </div>
                            <div className="p-3 bg-gray-50 rounded-lg">
                              <span className="text-gray-500 block">Units Booked:</span>
                              <strong className="text-sm text-emerald-700">{selectedPerson.unitsBooked} Plots</strong>
                            </div>
                          </div>

                          <div>
                            <span className="text-gray-500 block mb-1 font-bold">Assigned Benefits Status:</span>
                            <div className="p-2.5 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-lg font-semibold">
                              {selectedPerson.benefitsStatus}
                            </div>
                          </div>

                          {/* Reassign Manager with Circular Reporting Check */}
                          <div className="pt-2 border-t space-y-2">
                            <label className="block font-bold text-gray-700">Reassign Direct Reporting Line:</label>
                            <select
                              defaultValue={selectedPerson.reportsToId || ''}
                              onChange={(e) => handleUpdateManager(selectedPerson.id, e.target.value)}
                              className="w-full p-2 border rounded-lg font-bold"
                            >
                              <option value="">No Supervisor (Top Board)</option>
                              {hierarchy
                                .filter(h => h.id !== selectedPerson.id)
                                .map(h => (
                                  <option key={h.id} value={h.id}>{h.name} ({h.levelTitle})</option>
                                ))}
                            </select>
                            <span className="text-[11px] text-gray-400 block">System blocks any circular assignments automatically.</span>
                          </div>

                          {/* Transfer History Log */}
                          <div className="border-t pt-3 space-y-2">
                            <strong className="block text-gray-700">Transfer & Designation Audit History:</strong>
                            {selectedPerson.transferHistory.length === 0 ? (
                              <p className="text-gray-400 italic">No transfer records logged yet.</p>
                            ) : (
                              <div className="space-y-1">
                                {selectedPerson.transferHistory.map((th, idx) => (
                                  <div key={idx} className="p-2 bg-gray-50 rounded text-[11px] text-gray-600">
                                    <strong>{th.date}:</strong> {th.fromRole} → {th.toRole} (Signed by {th.approver})
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* SECTION E: CRITERIA & OFFERS ENGINE */}
                {crmTab === 'offers' && (
                  <div className="space-y-8">
                    <div className="bg-amber-50 border-2 border-amber-300 p-4 rounded-xl text-xs text-amber-950 flex items-start gap-2">
                      <Icon name="shieldAlert" className="w-5 h-5 text-amber-800 shrink-0 mt-0.5" />
                      <div>
                        <strong className="block font-bold">Important Compliance Notice: Draft rules are inactive until approved.</strong>
                        All incentive percentages, token values, and cash bonuses displayed below are SAMPLE values for prototyping and not approved business rules.
                      </div>
                    </div>

                    {/* Criteria Builder & Simulator */}
                    <div className="bg-white dark:bg-[#242C27] p-6 rounded-2xl border shadow-sm space-y-4 text-xs">
                      <h3 className="font-serif font-bold text-base text-[#0F261E] dark:text-white">Rule Criteria Builder & Simulator</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                        <div>
                          <label className="block font-bold mb-1">Qualifying Metric</label>
                          <select value={criteriaMetric} onChange={(e) => setCriteriaMetric(e.target.value)} className="w-full p-2.5 border rounded-lg font-bold">
                            <option>Units Booked</option>
                            <option>Site Visits Conducted</option>
                            <option>Total Collection Cleared (INR)</option>
                          </select>
                        </div>
                        <div>
                          <label className="block font-bold mb-1">Operator & Threshold</label>
                          <div className="flex gap-1">
                            <span className="p-2.5 bg-gray-100 border rounded-lg font-bold">≥</span>
                            <input type="text" value={criteriaThreshold} onChange={(e) => setCriteriaThreshold(e.target.value)} className="w-full p-2.5 border rounded-lg font-bold" />
                          </div>
                        </div>
                        <div>
                          <label className="block font-bold mb-1">Scope</label>
                          <select className="w-full p-2.5 border rounded-lg font-bold">
                            <option>Personal Performance</option>
                            <option>Whole Direct Team</option>
                          </select>
                        </div>
                        <div>
                          <label className="block font-bold mb-1">Time Window</label>
                          <select className="w-full p-2.5 border rounded-lg font-bold">
                            <option>30 Days (Current Month)</option>
                            <option>Quarterly (90 Days)</option>
                          </select>
                        </div>
                      </div>

                      <div className="pt-2 flex items-center justify-between">
                        <button
                          onClick={() => {
                            setSimulationResult(`Simulation Complete: 3 staff members (Venkat Rao, K. Sridhar, Rajesh Sharma) currently qualify with ≥ ${criteriaThreshold} ${criteriaMetric}.`);
                          }}
                          className="px-5 py-2.5 bg-[#1E4A3B] text-white font-bold rounded-xl text-xs min-h-[44px]"
                        >
                          Simulate: Who Would Qualify?
                        </button>
                        {simulationResult && (
                          <span className="text-emerald-800 font-bold bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-300">
                            {simulationResult}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Offers List */}
                    <div className="bg-white dark:bg-[#242C27] p-6 rounded-2xl border shadow-sm space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="font-serif font-bold text-base text-[#0F261E] dark:text-white">Configured Offers & Incentives</h3>
                        <button
                          onClick={() => {
                            const newOff: OfferRule = {
                              id: `off-${Date.now()}`,
                              name: 'Sankranti Farmland Rush Bonus',
                              project: 'Green Valley Farms',
                              status: 'draft',
                              startDate: '01 Jan 2027',
                              endDate: '20 Jan 2027',
                              targetDesignation: 'All Partners',
                              criteriaSummary: 'Close ≥ 1 Lakefront Unit',
                              sampleBenefit: 'Sample: ₹25,000 festival gift (not approved)',
                              terms: 'Draft rule pending finance head signature.',
                              version: 1
                            };
                            setOffers(prev => [newOff, ...prev]);
                            addToast('Draft Offer Created', 'Created in Draft mode. Inactive until approved.');
                          }}
                          className="px-3.5 py-1.5 rounded-lg bg-emerald-700 text-white font-bold text-xs"
                        >
                          + Create New Draft Offer
                        </button>
                      </div>

                      <div className="divide-y text-xs">
                        {offers.map(off => (
                          <div key={off.id} className="py-4 space-y-2">
                            <div className="flex justify-between items-start">
                              <div>
                                <strong className="text-sm text-[#0F261E] dark:text-white block">{off.name}</strong>
                                <span className="text-gray-500">{off.project} • {off.startDate} to {off.endDate}</span>
                              </div>
                              <span className={`px-2.5 py-0.5 rounded-full font-bold uppercase text-[10px] ${
                                off.status === 'active' ? 'bg-emerald-100 text-emerald-950 border border-emerald-300' : 'bg-gray-100 text-gray-700 border'
                              }`}>
                                {off.status} (v{off.version})
                              </span>
                            </div>
                            <p className="text-gray-600"><strong>Criteria:</strong> {off.criteriaSummary}</p>
                            <p className="text-emerald-800 font-semibold">{off.sampleBenefit}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* SECTION A: PROFILE PAGE */}
                {crmTab === 'profile' && (
                  <div className="max-w-xl mx-auto bg-white dark:bg-[#242C27] p-8 rounded-2xl border shadow-sm space-y-6 text-xs">
                    <div className="flex items-center gap-4 border-b pb-4">
                      <div className="w-16 h-16 rounded-2xl bg-[#1E4A3B] text-white flex items-center justify-center font-serif text-2xl font-bold">
                        RS
                      </div>
                      <div>
                        <h2 className="font-serif text-2xl font-bold text-[#0F261E] dark:text-white">Rajesh Sharma</h2>
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 font-bold text-[11px]">
                          Admin • Managing Director (Level 15)
                        </span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <span className="text-gray-500 block font-bold">Registered Phone:</span>
                        <span className="text-sm text-gray-800 dark:text-gray-200">+91 98480 11001</span>
                      </div>
                      <div>
                        <span className="text-gray-500 block font-bold">Work Email:</span>
                        <span className="text-sm text-gray-800 dark:text-gray-200">rajesh@greenvalleyfarms.in</span>
                      </div>
                    </div>

                    {/* Masked Bank Details */}
                    <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border space-y-3">
                      <div className="flex justify-between items-center">
                        <strong className="text-sm text-gray-800 dark:text-white font-bold">Payout & Bank Credentials</strong>
                        {!showPayoutDetails ? (
                          <button
                            onClick={() => setShowConfirmUnmaskModal(true)}
                            className="px-3 py-1 bg-[#1E4A3B] text-white font-bold rounded-lg text-xs"
                          >
                            Show Full Details
                          </button>
                        ) : (
                          <button
                            onClick={() => setShowPayoutDetails(false)}
                            className="px-3 py-1 border rounded-lg font-bold text-xs"
                          >
                            Hide
                          </button>
                        )}
                      </div>

                      <div className="space-y-1.5">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Bank Account:</span>
                          <strong className="font-mono text-sm">{showPayoutDetails ? 'HDFC Bank — 50100482199201' : 'HDFC Bank — ••••••••••4821'}</strong>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">IFSC Code:</span>
                          <strong className="font-mono text-sm">{showPayoutDetails ? 'HDFC0000240 (Banjara Hills)' : '••••••••240'}</strong>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">UPI VPA:</span>
                          <strong className="font-mono text-sm">{showPayoutDetails ? 'rajesh.sharma@okhdfcbank' : '•••••••@okhdfcbank'}</strong>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* PIPELINE LEADS LIST */}
                {crmTab === 'leads' && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h2 className="font-serif text-2xl font-bold text-[#0F261E] dark:text-white">Active Farmland Pipeline ({visibleLeads.length})</h2>
                    </div>

                    <div className="bg-white dark:bg-[#242C27] rounded-2xl border shadow-sm overflow-x-auto">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead className="bg-[#F0F6F3] dark:bg-gray-800 border-b font-bold text-gray-600 uppercase">
                          <tr>
                            <th className="p-3">Customer</th>
                            <th className="p-3">Status</th>
                            <th className="p-3">Plot Interest</th>
                            <th className="p-3">Owner</th>
                            <th className="p-3">Next Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y">
                          {visibleLeads.map(l => (
                            <tr key={l.id} className="hover:bg-gray-50">
                              <td className="p-3">
                                <strong className="block text-sm text-[#0F261E] dark:text-white font-bold">{l.name}</strong>
                                <span className="text-gray-500">{l.phone} • {l.id}</span>
                              </td>
                              <td className="p-3"><StatusBadge type="lead" status={l.status} size="sm" /></td>
                              <td className="p-3">
                                <strong className="block text-gray-800 dark:text-gray-200">Plot {l.plotInterest}</strong>
                                <span className="text-gray-500">{formatInr(l.budgetInr)}</span>
                              </td>
                              <td className="p-3">{l.ownerName}</td>
                              <td className="p-3 font-semibold text-emerald-800">{l.nextFollowUpDate}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* AGENT METRICS */}
                {crmTab === 'agent' && (
                  <div className="space-y-6">
                    <h2 className="font-serif text-2xl font-bold text-[#0F261E] dark:text-white">Field Agent Performance</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                      <div className="p-4 bg-white dark:bg-[#242C27] rounded-xl border shadow-sm">
                        <span className="text-gray-500 block">Assigned Leads</span>
                        <strong className="text-2xl font-bold text-[#0F261E] dark:text-white">{visibleLeads.length}</strong>
                      </div>
                      <div className="p-4 bg-white dark:bg-[#242C27] rounded-xl border shadow-sm">
                        <span className="text-gray-500 block">Upcoming Visits</span>
                        <strong className="text-2xl font-bold text-emerald-700">{visits.length}</strong>
                      </div>
                      <div className="p-4 bg-white dark:bg-[#242C27] rounded-xl border shadow-sm">
                        <span className="text-gray-500 block">Sample Commission</span>
                        <strong className="text-xl font-bold text-emerald-800">₹87,500</strong>
                      </div>
                    </div>
                  </div>
                )}

                {/* DOUBLE-BOOKING DEMO */}
                {crmTab === 'safeguard' && (
                  <div className="max-w-2xl mx-auto bg-white dark:bg-[#242C27] p-8 rounded-2xl border shadow-sm space-y-6">
                    <div>
                      <h2 className="font-serif text-2xl font-bold text-[#0F261E] dark:text-white">Double-Booking Safeguard Demo</h2>
                      <p className="text-xs text-gray-600">Simulates real-time concurrency collision when two agents reserve the same plot simultaneously.</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setPlots(prev => prev.map(p => p.number === 'A-05' ? { ...p, status: 'pending' } : p));
                          addToast('⚠️ Plot Just Reserved by Colleague', 'Plot A-05 was just reserved by Rajesh moments ago! Map refreshed.');
                        }}
                        className="flex-1 py-3 bg-amber-600 text-white font-bold rounded-xl text-xs min-h-[48px]"
                      >
                        Simulate Simultaneous Lock Attempt
                      </button>
                      <button
                        onClick={() => {
                          setPlots(prev => prev.map(p => p.number === 'A-05' ? { ...p, status: 'available' } : p));
                        }}
                        className="py-3 px-4 border rounded-xl text-xs font-bold min-h-[48px]"
                      >
                        Reset
                      </button>
                    </div>
                  </div>
                )}

                {/* SECTION G: PHASE 2 PLACEHOLDERS (VISIBLE EMPTY STATES) */}
                {['p2_ledger', 'p2_settlement', 'p2_finance', 'p2_cms', 'p2_audit'].includes(crmTab) && (
                  <div className="max-w-3xl mx-auto bg-white dark:bg-[#242C27] p-12 rounded-2xl border text-center space-y-4 shadow-sm">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
                      Planned Feature (Phase 2 Deployment)
                    </span>
                    <h2 className="font-serif text-2xl font-bold text-[#0F261E] dark:text-white">
                      {crmTab === 'p2_ledger' && 'Commission & Rewards Ledger'}
                      {crmTab === 'p2_settlement' && 'Settlement Batches & Sub-Registrar Stamping'}
                      {crmTab === 'p2_finance' && 'Company Financial Books & Tax Ledgers'}
                      {crmTab === 'p2_cms' && 'Farmland Blog CMS & Agricultural News'}
                      {crmTab === 'p2_audit' && 'Master Immutable Security Audit Log'}
                    </h2>
                    <p className="text-xs text-gray-500 max-w-md mx-auto">
                      This module layout is pre-configured in the platform architecture. Historical data and transactions will populate automatically upon Phase 2 rollout.
                    </p>
                    <div className="p-8 border-2 border-dashed rounded-xl bg-gray-50 dark:bg-gray-800/40 text-gray-400 text-xs">
                      No records currently pending in this ledger.
                    </div>
                  </div>
                )}
              </main>
            </div>
          )}
        </div>
      )}

      {/* FOOTER */}
      <footer className="bg-[#0F261E] text-white py-6 border-t border-emerald-950 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-xs space-y-2">
          <p className="font-semibold text-emerald-200">
            Prototype, sample data — All project names, buyer profiles, and phone numbers are fictional.
          </p>
          <p className="text-gray-400">Green Valley Farms Farmland Platform & CRM</p>
        </div>
      </footer>
    </div>
  );
}