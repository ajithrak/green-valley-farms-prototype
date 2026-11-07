import type { TimelineEntry } from '@/types';

export const INITIAL_TIMELINE: Record<string, TimelineEntry[]> = {
  'LD-101': [
    {
      id: 'tl-1',
      timestamp: '01 Nov 2026, 04:30 PM IST',
      actor: 'Website Inbound',
      channel: 'Web Form',
      result: 'Submitted',
      note: 'Customer registered online requesting farm visit for 605 sq.yd unit.',
      nextAction: 'Initial contact call',
      nextFollowUpDate: '02 Nov 2026',
    },
    {
      id: 'tl-2',
      timestamp: '02 Nov 2026, 11:15 AM IST',
      actor: 'Venkat Rao',
      channel: 'Phone Call',
      result: 'Interested',
      note: 'Spoke with buyer. Explained 30-year legal opinion, sweet water, and 33ft avenue roads.',
      nextAction: 'Schedule free AC site tour',
      nextFollowUpDate: '08 Nov 2026',
    },
  ],
  'LD-102': [
    {
      id: 'tl-3',
      timestamp: '24 Oct 2026, 02:00 PM IST',
      actor: 'K. Sridhar',
      channel: 'In-person',
      result: 'Positive',
      note: 'Met at coffee shop near Jubilee Hills. Discussed Block B quarter-acre plot.',
      nextAction: 'Send layout plan on WhatsApp',
      nextFollowUpDate: '06 Nov 2026',
    },
  ],
};
