export type PlotStatus = 'available' | 'pending' | 'booked' | 'sold' | 'blocked';
export type LeadStatus =
  | 'New'
  | 'Contacted'
  | 'Visit Scheduled'
  | 'Visit Completed'
  | 'Negotiation'
  | 'Converted'
  | 'Lost';
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

export type CustomerPage = 'home' | 'plots' | 'enquiry' | 'reserve' | 'portal';
export type CrmTab =
  | 'admin_dash'
  | 'moderator_dash'
  | 'queue'
  | 'leads'
  | 'project_setup'
  | 'hierarchy'
  | 'offers'
  | 'agent'
  | 'safeguard'
  | 'profile'
  | 'p2_ledger'
  | 'p2_settlement'
  | 'p2_finance'
  | 'p2_cms'
  | 'p2_audit';
