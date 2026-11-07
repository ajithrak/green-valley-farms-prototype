/** Sample portfolio analytics (fictional). Totals reconcile with the plot, lead and funnel datasets. */
export const MONTHLY_SALES = [
  { month: 'Jun', bookedLakh: 38, collectedLakh: 14, bookings: 1 },
  { month: 'Jul', bookedLakh: 30, collectedLakh: 12, bookings: 1 },
  { month: 'Aug', bookedLakh: 112, collectedLakh: 36, bookings: 3 },
  { month: 'Sep', bookedLakh: 70, collectedLakh: 30, bookings: 2 },
  { month: 'Oct', bookedLakh: 102, collectedLakh: 52, bookings: 3 },
  { month: 'Nov', bookedLakh: 76, collectedLakh: 41.5, bookings: 2 },
];

export const LEAD_SOURCES = [
  { label: 'Website form', count: 11 },
  { label: 'Agent referral', count: 8 },
  { label: 'Walk-in', count: 5 },
  { label: 'WhatsApp', count: 5 },
  { label: 'Direct call', count: 3 },
];

export const WEEKLY_VISITS = [
  { day: 'Mon', completed: 3, noShow: 1 },
  { day: 'Tue', completed: 5, noShow: 1 },
  { day: 'Wed', completed: 4, noShow: 1 },
  { day: 'Thu', completed: 7, noShow: 1 },
  { day: 'Fri', completed: 6, noShow: 1 },
  { day: 'Sat', completed: 10, noShow: 2 },
  { day: 'Sun', completed: 8, noShow: 1 },
];

export const AGENT_LEADERBOARD = [
  { name: 'Venkat Rao', role: 'Sales Person', units: 5, valueLakh: 168 },
  { name: 'Sujatha Murthy', role: 'Zonal Director', units: 2, valueLakh: 100 },
  { name: 'K. Sridhar', role: 'Agent', units: 3, valueLakh: 96 },
  { name: 'Naveen Kumar', role: 'Agent', units: 2, valueLakh: 64 },
];

export const TOTAL_BOOKED_LAKH = 428.45;
export const TOTAL_COLLECTED_LAKH = 185.5;
