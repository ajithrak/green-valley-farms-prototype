import { LEAD_SOURCES } from '@/data';
import { ChartCard } from '@/components/ui/ChartCard';

export function LeadSourceChart() {
  const total = LEAD_SOURCES.reduce((s, x) => s + x.count, 0);
  const max = Math.max(...LEAD_SOURCES.map((s) => s.count));

  return (
    <ChartCard title="Where leads come from" subtitle={`${total} inbound inquiries by channel`}>
      <ul className="space-y-3">
        {LEAD_SOURCES.map((s) => (
          <li key={s.label} className="space-y-1">
            <div className="flex justify-between text-xs font-bold text-gray-700 dark:text-gray-200">
              <span>{s.label}</span>
              <span>
                {s.count} <span className="font-normal text-gray-500">({Math.round((s.count / total) * 100)}%)</span>
              </span>
            </div>
            <div className="h-3 rounded-full bg-gray-100 overflow-hidden" role="presentation">
              <div className="h-full rounded-full bg-[#2B6CB0]" style={{ width: `${(s.count / max) * 100}%` }} />
            </div>
          </li>
        ))}
      </ul>
    </ChartCard>
  );
}
