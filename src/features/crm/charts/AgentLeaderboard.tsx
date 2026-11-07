import { AGENT_LEADERBOARD } from '@/data';
import { ChartCard } from '@/components/ui/ChartCard';

export function AgentLeaderboard() {
  const max = Math.max(...AGENT_LEADERBOARD.map((a) => a.valueLakh));

  return (
    <ChartCard title="Top performers" subtitle="Units booked and sale value (₹ lakh), current project">
      <ol className="space-y-3">
        {AGENT_LEADERBOARD.map((a, i) => (
          <li key={a.name} className="flex items-center gap-3">
            <span className="w-8 h-8 shrink-0 rounded-full bg-[#1E4A3B] text-white text-xs font-bold flex items-center justify-center">
              {i + 1}
            </span>
            <div className="flex-1 min-w-0 space-y-1">
              <div className="flex justify-between gap-2 text-xs">
                <span className="font-bold truncate text-gray-800 dark:text-gray-100">
                  {a.name} <span className="font-normal text-gray-500">• {a.role}</span>
                </span>
                <span className="font-semibold shrink-0">
                  {a.units} units • ₹{a.valueLakh} L
                </span>
              </div>
              <div className="h-2.5 rounded-full bg-gray-100 overflow-hidden" role="presentation">
                <div className="h-full rounded-full bg-[#D69E2E]" style={{ width: `${(a.valueLakh / max) * 100}%` }} />
              </div>
            </div>
          </li>
        ))}
      </ol>
    </ChartCard>
  );
}
