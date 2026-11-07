import { StatusBadge } from '@/components/ui/StatusBadge';
import { formatInr } from '@/utils/currency';
import { useApp } from '@/context/AppContext';

export function PipelineLeads() {
  const { visibleLeads } = useApp();
  return (
    <>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="font-serif text-2xl font-bold text-[#0F261E] dark:text-white">
            Active Farmland Pipeline ({visibleLeads.length})
          </h2>
        </div>

        <ul className="md:hidden space-y-3" aria-label="Pipeline leads">
          {visibleLeads.map((l) => (
            <li key={l.id} className="bg-white dark:bg-[#242C27] rounded-2xl border shadow-sm p-4 space-y-3 text-xs">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <strong className="block text-sm text-[#0F261E] dark:text-white">{l.name}</strong>
                  <span className="text-gray-500">
                    {l.phone} • {l.id}
                  </span>
                </div>
                <StatusBadge type="lead" status={l.status} size="sm" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="block text-[10px] uppercase font-bold text-gray-400">Plot interest</span>
                  <strong className="text-gray-800 dark:text-gray-200">Plot {l.plotInterest}</strong>
                  <span className="block text-gray-500">{formatInr(l.budgetInr)}</span>
                </div>
                <div>
                  <span className="block text-[10px] uppercase font-bold text-gray-400">Owner</span>
                  {l.ownerName}
                </div>
              </div>
              <div className="flex items-center justify-between border-t pt-2">
                <span className="text-[10px] uppercase font-bold text-gray-400">Next action</span>
                <span className="font-semibold text-emerald-800">{l.nextFollowUpDate}</span>
              </div>
            </li>
          ))}
        </ul>

        <div className="hidden md:block bg-white dark:bg-[#242C27] rounded-2xl border shadow-sm overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-[#F0F6F3] dark:bg-gray-800 border-b font-bold text-gray-600 uppercase">
              <tr>
                <th className="p-3">Customer</th>
                <th className="p-3">Status</th>
                <th className="p-3">Plot Interest</th>
                <th className="p-3">Owner</th>
                <th className="p-3">Next Action</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {visibleLeads.map((l) => (
                <tr key={l.id} className="hover:bg-gray-50">
                  <td className="p-3">
                    <strong className="block text-sm text-[#0F261E] dark:text-white font-bold">{l.name}</strong>
                    <span className="text-gray-500">
                      {l.phone} • {l.id}
                    </span>
                  </td>
                  <td className="p-3">
                    <StatusBadge type="lead" status={l.status} size="sm" />
                  </td>
                  <td className="p-3">
                    <strong className="block text-gray-800 dark:text-gray-200">Plot {l.plotInterest}</strong>
                    <span className="text-gray-500">{formatInr(l.budgetInr)}</span>
                  </td>
                  <td className="p-3">{l.ownerName}</td>
                  <td className="p-3 font-semibold text-emerald-800">{l.nextFollowUpDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
