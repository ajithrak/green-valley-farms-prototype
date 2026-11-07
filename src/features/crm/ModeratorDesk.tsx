import { useApp } from '@/context/AppContext';

export function ModeratorDesk() {
  const { setCrmTab, unassignedLeads, overdueFollowUps } = useApp();
  return (
    <>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="font-serif text-2xl font-bold text-[#0F261E] dark:text-white">Moderator Control Desk</h2>
            <p className="text-xs text-gray-500">Real-time operational queues and delivery troubleshooting.</p>
          </div>
          <span className="px-3 py-1 bg-amber-100 text-amber-950 font-bold rounded-full text-xs">
            Moderation Active
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
          <div className="bg-white dark:bg-[#242C27] p-4 rounded-xl border shadow-sm">
            <span className="text-gray-500 block">Unassigned Inbounds</span>
            <strong className="text-2xl font-bold text-rose-700">{unassignedLeads.length}</strong>
          </div>
          <div className="bg-white dark:bg-[#242C27] p-4 rounded-xl border shadow-sm">
            <span className="text-gray-500 block">Overdue Follow-Ups</span>
            <strong className="text-2xl font-bold text-amber-700">{overdueFollowUps.length}</strong>
          </div>
          <div className="bg-white dark:bg-[#242C27] p-4 rounded-xl border shadow-sm">
            <span className="text-gray-500 block">Import Discrepancies</span>
            <strong className="text-2xl font-bold text-purple-700">1 Row</strong>
          </div>
          <div className="bg-white dark:bg-[#242C27] p-4 rounded-xl border shadow-sm">
            <span className="text-gray-500 block">WhatsApp Retries Pending</span>
            <strong className="text-2xl font-bold text-blue-700">0</strong>
          </div>
        </div>

        <div className="bg-white dark:bg-[#242C27] p-6 rounded-2xl border shadow-sm space-y-4">
          <h3 className="font-serif font-bold text-base text-[#0F261E] dark:text-white">Immediate Attention Queue</h3>
          <div className="divide-y text-xs">
            {overdueFollowUps.map((lead) => (
              <div key={lead.id} className="py-3 flex items-center justify-between">
                <div>
                  <strong className="block text-sm text-[#0F261E] dark:text-white">{lead.name}</strong>
                  <span className="text-rose-700 font-bold">
                    Follow-up overdue since {lead.nextFollowUpDate} • Owner: {lead.ownerName}
                  </span>
                </div>
                <button
                  onClick={() => {
                    setCrmTab('leads');
                  }}
                  className="px-3 py-1.5 rounded-lg bg-[#1E4A3B] text-white font-bold"
                >
                  Intervene →
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
