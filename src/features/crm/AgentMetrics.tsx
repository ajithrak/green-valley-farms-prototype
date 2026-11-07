import { useApp } from '@/context/AppContext';

export function AgentMetrics() {
  const { visibleLeads, visits } = useApp();
  return (
    <>
      <div className="space-y-6">
        <h2 className="font-serif text-2xl font-bold text-[#0F261E] dark:text-white">Field Agent Performance</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 bg-white dark:bg-[#242C27] rounded-xl border shadow-sm">
            <span className="text-gray-500 block">Assigned Leads</span>
            <strong className="text-2xl font-bold text-[#0F261E] dark:text-white">{visibleLeads.length}</strong>
          </div>
          <div className="p-4 bg-white dark:bg-[#242C27] rounded-xl border shadow-sm">
            <span className="text-gray-500 block">Upcoming Visits</span>
            <strong className="text-2xl font-bold text-emerald-700">{visits.length}</strong>
          </div>
          <div className="p-4 bg-white dark:bg-[#242C27] rounded-xl border shadow-sm">
            <span className="text-gray-500 block">Sample Commission</span>
            <strong className="text-xl font-bold text-emerald-800">₹87,500</strong>
          </div>
        </div>
      </div>
    </>
  );
}
