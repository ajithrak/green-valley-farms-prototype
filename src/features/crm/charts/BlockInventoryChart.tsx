import { ChartCard } from '@/components/ui/ChartCard';
import { useApp } from '@/context/AppContext';
import type { PlotStatus } from '@/types';

const SEGMENTS: { key: PlotStatus; label: string; color: string }[] = [
  { key: 'available', label: 'Available', color: '#2E6B55' },
  { key: 'pending', label: 'Pending', color: '#D69E2E' },
  { key: 'booked', label: 'Booked', color: '#2B6CB0' },
  { key: 'sold', label: 'Sold', color: '#C53030' },
  { key: 'blocked', label: 'Blocked', color: '#718096' },
];

export function BlockInventoryChart() {
  const { plots } = useApp();
  const blocks = ['Block A', 'Block B', 'Block C', 'Block D'];

  return (
    <ChartCard title="Sell-through by block" subtitle="Plots per status in each block">
      <ul className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-600 dark:text-gray-300">
        {SEGMENTS.map((s) => (
          <li key={s.key} className="inline-flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm" style={{ background: s.color }} />
            {s.label}
          </li>
        ))}
      </ul>
      <div className="space-y-3">
        {blocks.map((block) => {
          const inBlock = plots.filter((p) => p.block === block);
          const sold = inBlock.filter((p) => p.status === 'sold' || p.status === 'booked').length;
          return (
            <div key={block} className="space-y-1">
              <div className="flex justify-between text-xs font-bold text-gray-700 dark:text-gray-200">
                <span>{block}</span>
                <span className="font-semibold text-gray-500">
                  {sold}/{inBlock.length} sold or booked
                </span>
              </div>
              <div
                className="flex h-5 w-full rounded-md overflow-hidden bg-gray-100"
                role="img"
                aria-label={`${block}: ${SEGMENTS.map((s) => `${inBlock.filter((p) => p.status === s.key).length} ${s.label}`).join(', ')}`}
              >
                {SEGMENTS.map((s) => {
                  const n = inBlock.filter((p) => p.status === s.key).length;
                  return n ? (
                    <div
                      key={s.key}
                      style={{ width: `${(n / inBlock.length) * 100}%`, background: s.color }}
                      className="flex items-center justify-center text-[10px] font-bold text-white"
                      title={`${s.label}: ${n}`}
                    >
                      {n}
                    </div>
                  ) : null;
                })}
              </div>
            </div>
          );
        })}
      </div>
    </ChartCard>
  );
}
