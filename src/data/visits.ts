import type { SiteVisit } from '@/types';

export const INITIAL_VISITS: SiteVisit[] = [
  {
    id: 'vis-1',
    leadId: 'LD-101',
    leadName: 'Ramesh Naidu',
    visitDate: '08 Nov 2026',
    visitTime: '10:30 AM IST',
    pickupLocation: 'Gachibowli ORR Junction',
    status: 'Confirmed',
    accompaniedBy: 'Venkat Rao',
    vehicleNumber: 'TS 09 EZ 4410 (Innova AC)',
    feedbackComment: 'Customer confirmed interest in east-facing 605 sq.yd plot with sweet borewell water.',
  },
  {
    id: 'vis-2',
    leadId: 'LD-103',
    leadName: 'Anil Kumar Varma',
    visitDate: '04 Nov 2026',
    visitTime: '11:00 AM IST',
    pickupLocation: 'Kukatpally Y-Junction',
    status: 'Completed',
    accompaniedBy: 'Venkat Rao',
    vehicleNumber: 'TS 08 FA 9988 (Ertiga AC)',
    feedbackComment: 'Tasted sweet water from borewell #2. Extremely satisfied with soil depth and boundary pillars.',
  },
];
