import { formatInr } from '@/utils/currency';
import { useApp } from '@/context/AppContext';

export function LeadQueue() {
  const { setCrmTab, leads, handleRoundRobinAssign } = useApp();
  return (
    <>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
          <div>
            <h2 className="font-serif text-2xl font-bold text-[#0F261E] dark:text-white">
              Inbound Lead Assignment Queue
            </h2>
            <p className="text-xs text-gray-500">
              Assign website and call inquiries to sales staff with balanced workloads.
            </p>
          </div>
          <div className="bg-emerald-50 border border-emerald-300 px-3 py-1.5 rounded-xl text-xs text-emerald-950 font-bold">
            Staff Workload: Venkat Rao (5 leads) • K. Sridhar (3 leads)
          </div>
        </div>

        <ul className="md:hidden space-y-3" aria-label="Inbound leads">
          {leads.map((lead) => (
            <li key={lead.id} className="bg-white dark:bg-[#242C27] rounded-2xl border shadow-sm p-4 space-y-3 text-xs">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <strong className="block text-sm text-[#0F261E] dark:text-white">{lead.name}</strong>
                  <span className="text-gray-500">
                    {lead.phone} • {lead.id}
                  </span>
                </div>
                <span className="font-semibold shrink-0">{formatInr(lead.budgetInr)}</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="block text-[10px] uppercase font-bold text-gray-400">Source</span>
                  {lead.source}
                  <span className="block text-gray-400">{lead.project}</span>
                </div>
                <div>
                  <span className="block text-[10px] uppercase font-bold text-gray-400">Assigned to</span>
                  <span className="font-bold text-[#1E4A3B] dark:text-emerald-400">{lead.ownerName}</span>
                  <span className="block text-gray-400">{lead.ownerRole}</span>
                </div>
              </div>
              <div className="flex flex-col min-[420px]:flex-row gap-2">
                <button
                  onClick={() => handleRoundRobinAssign(lead.id)}
                  className="flex-1 px-3 py-2.5 rounded-lg bg-emerald-700 text-white font-bold min-h-[44px]"
                >
                  Suggest Round-Robin
                </button>
                <button
                  onClick={() => setCrmTab('leads')}
                  className="flex-1 px-3 py-2.5 rounded-lg border font-bold min-h-[44px]"
                >
                  Manual Pick
                </button>
              </div>
            </li>
          ))}
        </ul>

        <div className="hidden md:block bg-white dark:bg-[#242C27] rounded-2xl border shadow-sm overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-[#F0F6F3] dark:bg-gray-800 border-b font-bold text-gray-600 uppercase">
              <tr>
                <th className="p-3">Inbound Customer</th>
                <th className="p-3">Source & Project</th>
                <th className="p-3">Budget</th>
                <th className="p-3">Current Assignment</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {leads.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50">
                  <td className="p-3">
                    <strong className="block text-sm text-[#0F261E] dark:text-white">{lead.name}</strong>
                    <span className="text-gray-500">
                      {lead.phone} • {lead.id}
                    </span>
                  </td>
                  <td className="p-3">
                    <div>{lead.source}</div>
                    <span className="text-gray-400">{lead.project}</span>
                  </td>
                  <td className="p-3 font-semibold">{formatInr(lead.budgetInr)}</td>
                  <td className="p-3">
                    <span className="font-bold text-[#1E4A3B] dark:text-emerald-400 block">{lead.ownerName}</span>
                    <span className="text-gray-400">{lead.ownerRole}</span>
                  </td>
                  <td className="p-3 text-right space-x-2">
                    <button
                      onClick={() => handleRoundRobinAssign(lead.id)}
                      className="px-3 py-1.5 rounded-lg bg-emerald-700 text-white font-bold text-xs"
                    >
                      Suggest Round-Robin
                    </button>
                    <button
                      onClick={() => {
                        setCrmTab('leads');
                      }}
                      className="px-3 py-1.5 rounded-lg border font-bold text-xs"
                    >
                      Manual Pick
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
