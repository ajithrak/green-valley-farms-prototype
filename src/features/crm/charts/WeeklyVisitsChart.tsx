import { WEEKLY_VISITS } from '@/data';
import { ChartCard } from '@/components/ui/ChartCard';

const W = 420;
const H = 220;
const PAD = { top: 12, right: 8, bottom: 28, left: 28 };

export function WeeklyVisitsChart() {
  const innerW = W - PAD.left - PAD.right;
  const innerH = H - PAD.top - PAD.bottom;
  const band = innerW / WEEKLY_VISITS.length;
  const barW = Math.min(30, band * 0.6);
  const max = 12;
  const y = (v: number) => PAD.top + innerH - (v / max) * innerH;
  const completed = WEEKLY_VISITS.reduce((s, d) => s + d.completed, 0);
  const noShow = WEEKLY_VISITS.reduce((s, d) => s + d.noShow, 0);

  return (
    <ChartCard title="Site visits this week" subtitle={`${completed} completed • ${noShow} no-shows`}>
      <div className="flex gap-4 text-xs text-gray-600 dark:text-gray-300">
        <span className="inline-flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm bg-[#2E6B55]" /> Completed
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm bg-[#C53030]" /> No-show
        </span>
      </div>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full h-auto text-gray-600 dark:text-gray-300"
        role="img"
        aria-label={`Stacked bar chart of site visits per day. ${completed} completed, ${noShow} no-shows.`}
      >
        {[0, 4, 8, 12].map((t) => (
          <g key={t}>
            <line x1={PAD.left} x2={W - PAD.right} y1={y(t)} y2={y(t)} stroke="currentColor" opacity="0.15" />
            <text x={PAD.left - 6} y={y(t) + 4} textAnchor="end" fontSize="10" fill="currentColor">
              {t}
            </text>
          </g>
        ))}
        {WEEKLY_VISITS.map((d, i) => {
          const x = PAD.left + band * i + (band - barW) / 2;
          return (
            <g key={d.day}>
              <rect x={x} y={y(d.completed)} width={barW} height={y(0) - y(d.completed)} fill="#2E6B55">
                <title>{`${d.day}: ${d.completed} completed`}</title>
              </rect>
              <rect
                x={x}
                y={y(d.completed + d.noShow)}
                width={barW}
                height={y(d.completed) - y(d.completed + d.noShow)}
                rx="3"
                fill="#C53030"
              >
                <title>{`${d.day}: ${d.noShow} no-show`}</title>
              </rect>
              <text x={x + barW / 2} y={H - 10} textAnchor="middle" fontSize="11" fill="currentColor">
                {d.day}
              </text>
            </g>
          );
        })}
      </svg>
    </ChartCard>
  );
}
