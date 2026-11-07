import { TOTAL_BOOKED_LAKH, TOTAL_COLLECTED_LAKH } from '@/data';
import { ChartCard } from '@/components/ui/ChartCard';

export function CollectionGauge() {
  const pct = TOTAL_COLLECTED_LAKH / TOTAL_BOOKED_LAKH;
  const R = 52;
  const C = 2 * Math.PI * R;
  const outstanding = TOTAL_BOOKED_LAKH - TOTAL_COLLECTED_LAKH;

  return (
    <ChartCard title="Collection progress" subtitle="Cash collected against agreed sale value">
      <div className="flex flex-col sm:flex-row items-center gap-6">
        <svg
          viewBox="0 0 140 140"
          className="w-36 h-36 shrink-0 -rotate-90"
          role="img"
          aria-label={`${Math.round(pct * 100)} percent of booked value collected`}
        >
          <circle cx="70" cy="70" r={R} fill="none" stroke="#E2E8E4" strokeWidth="16" />
          <circle
            cx="70"
            cy="70"
            r={R}
            fill="none"
            stroke="#2E6B55"
            strokeWidth="16"
            strokeLinecap="round"
            strokeDasharray={`${C * pct} ${C}`}
          />
          <text
            x="70"
            y="70"
            textAnchor="middle"
            dominantBaseline="central"
            className="rotate-90 origin-center fill-[#0F261E] dark:fill-white"
            fontSize="26"
            fontWeight="700"
            style={{ transformBox: 'fill-box' }}
          >
            {Math.round(pct * 100)}%
          </text>
        </svg>
        <dl className="grid grid-cols-1 gap-3 text-xs w-full">
          <div className="flex justify-between gap-3 border-b pb-2">
            <dt className="text-gray-500">Agreed sale value</dt>
            <dd className="font-bold">₹{TOTAL_BOOKED_LAKH.toFixed(2)} L</dd>
          </div>
          <div className="flex justify-between gap-3 border-b pb-2">
            <dt className="text-gray-500">Collected</dt>
            <dd className="font-bold text-emerald-700">₹{TOTAL_COLLECTED_LAKH.toFixed(2)} L</dd>
          </div>
          <div className="flex justify-between gap-3">
            <dt className="text-gray-500">Outstanding</dt>
            <dd className="font-bold text-amber-700">₹{outstanding.toFixed(2)} L</dd>
          </div>
        </dl>
      </div>
    </ChartCard>
  );
}
