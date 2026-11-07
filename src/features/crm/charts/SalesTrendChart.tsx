import { MONTHLY_SALES } from '@/data';
import { ChartCard } from '@/components/ui/ChartCard';

const W = 800;
const H = 260;
const PAD = { top: 16, right: 12, bottom: 44, left: 40 };
const MAX = 120;
const TICKS = [0, 30, 60, 90, 120];

export function SalesTrendChart() {
  const innerW = W - PAD.left - PAD.right;
  const innerH = H - PAD.top - PAD.bottom;
  const band = innerW / MONTHLY_SALES.length;
  const barW = Math.min(34, band / 3);
  const y = (v: number) => PAD.top + innerH - (v / MAX) * innerH;
  const total = MONTHLY_SALES.reduce((s, m) => s + m.bookedLakh, 0);

  return (
    <ChartCard title="Sales & Collections — last 6 months" subtitle="Booked value vs. cash collected (₹ lakh)">
      <div className="flex flex-wrap gap-4 text-xs text-gray-600 dark:text-gray-300">
        <span className="inline-flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm bg-[#1E4A3B]" /> Booked value
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm bg-[#D69E2E]" /> Collected
        </span>
      </div>
      <div className="overflow-x-auto">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full min-w-[520px] h-auto text-gray-600 dark:text-gray-300"
          role="img"
          aria-label={`Grouped bar chart of booked and collected value by month. Total booked ${total.toFixed(0)} lakh.`}
        >
          {TICKS.map((t) => (
            <g key={t}>
              <line x1={PAD.left} x2={W - PAD.right} y1={y(t)} y2={y(t)} stroke="currentColor" opacity="0.15" />
              <text x={PAD.left - 6} y={y(t) + 4} textAnchor="end" fontSize="11" fill="currentColor">
                {t}
              </text>
            </g>
          ))}
          {MONTHLY_SALES.map((m, i) => {
            const cx = PAD.left + band * i + band / 2;
            return (
              <g key={m.month}>
                <rect
                  x={cx - barW - 2}
                  y={y(m.bookedLakh)}
                  width={barW}
                  height={y(0) - y(m.bookedLakh)}
                  rx="4"
                  fill="#1E4A3B"
                >
                  <title>{`${m.month}: booked ₹${m.bookedLakh} lakh (${m.bookings} units)`}</title>
                </rect>
                <rect
                  x={cx + 2}
                  y={y(m.collectedLakh)}
                  width={barW}
                  height={y(0) - y(m.collectedLakh)}
                  rx="4"
                  fill="#D69E2E"
                >
                  <title>{`${m.month}: collected ₹${m.collectedLakh} lakh`}</title>
                </rect>
                <text
                  x={cx - barW / 2 - 2}
                  y={y(m.bookedLakh) - 4}
                  textAnchor="middle"
                  fontSize="10"
                  fill="currentColor"
                >
                  {m.bookedLakh}
                </text>
                <text x={cx} y={H - 24} textAnchor="middle" fontSize="12" fontWeight="600" fill="currentColor">
                  {m.month}
                </text>
                <text x={cx} y={H - 9} textAnchor="middle" fontSize="10" fill="currentColor" opacity="0.7">
                  {m.bookings} {m.bookings === 1 ? 'unit' : 'units'}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </ChartCard>
  );
}
