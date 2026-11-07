import type { OfferRule } from '@/types';

export const INITIAL_OFFERS: OfferRule[] = [
  {
    id: 'off-1',
    name: 'Karthika Masam Special Token Bonus',
    project: 'Green Valley Farms',
    status: 'active',
    startDate: '01 Nov 2026',
    endDate: '30 Nov 2026',
    targetDesignation: 'All Sales & Partner Agents',
    criteriaSummary: 'Close ≥ 2 Units of 605 sq.yd within 30 days',
    sampleBenefit: 'Sample: ₹35,000 cash bonus + Gold coin (not approved)',
    terms: 'Requires clear cheque clearance within 7 days of site tour token.',
    version: 2,
  },
  {
    id: 'off-2',
    name: 'Early Bird Quarter-Acre Booster',
    project: 'Green Valley Farms',
    status: 'draft',
    startDate: '15 Nov 2026',
    endDate: '15 Dec 2026',
    targetDesignation: 'Level 4 to Level 10 Leads',
    criteriaSummary: '≥ 1 Unit of 1,210 sq.yd (Block B)',
    sampleBenefit: 'Sample: 1.5% incremental milestone payout (not approved)',
    terms: 'Draft status — Requires Managing Director approval before release.',
    version: 1,
  },
];
