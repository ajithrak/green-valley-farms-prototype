import { useApp } from '@/context/AppContext';

const INVENTORY = [
  { key: 'available', label: 'Available', color: '#2E6B55' },
  { key: 'pending', label: 'Reservation Pending', color: '#D69E2E' },
  { key: 'booked', label: 'Booked', color: '#2B6CB0' },
  { key: 'sold', label: 'Sold & Registered', color: '#C53030' },
  { key: 'blocked', label: 'Blocked', color: '#718096' },
] as const;

export function AdminDashboard() {
  const { plots } = useApp();
  return (
    <>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
          <div>
            <h2 className="font-serif text-2xl font-bold text-[#0F261E] dark:text-white">
              Farmland Executive Dashboard
            </h2>
            <p className="text-xs text-gray-500">
              Live operational oversight for Green Valley Farms project portfolio.
            </p>
          </div>
          <span className="text-xs bg-emerald-100 text-emerald-950 font-bold px-3 py-1.5 rounded-full border border-emerald-300">
            Portfolio Healthy • {plots.length} Units Monitored
          </span>
        </div>

        {/* KPI Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="bg-white dark:bg-[#242C27] p-5 rounded-2xl border shadow-sm space-y-1">
            <span className="text-gray-500 block uppercase font-bold text-[11px]">Total Booked Value</span>
            <strong className="text-2xl font-bold text-[#0F261E] dark:text-white block">₹4,28,45,000</strong>
            <span className="text-gray-400 text-[11px]">Agreed sale value across booked &amp; sold units</span>
          </div>
          <div className="bg-white dark:bg-[#242C27] p-5 rounded-2xl border shadow-sm space-y-1">
            <span className="text-gray-500 block uppercase font-bold text-[11px]">Realized Bank Collections</span>
            <strong className="text-2xl font-bold text-emerald-700 block">₹1,85,50,000</strong>
            <span className="text-emerald-800 text-[11px] font-semibold">Strictly deposited & cleared funds</span>
          </div>
          <div className="bg-white dark:bg-[#242C27] p-5 rounded-2xl border shadow-sm space-y-1">
            <span className="text-gray-500 block uppercase font-bold text-[11px]">Plot Availability</span>
            <strong className="text-2xl font-bold text-blue-700 block">
              {plots.filter((p) => p.status === 'available').length} / {plots.length} Open
            </strong>
            <span className="text-gray-400 text-[11px]">
              {plots.filter((p) => p.status === 'pending').length} Pending •{' '}
              {plots.filter((p) => p.status === 'booked').length} Booked •{' '}
              {plots.filter((p) => p.status === 'sold').length} Sold
            </span>
          </div>
          <div className="bg-white dark:bg-[#242C27] p-5 rounded-2xl border shadow-sm space-y-1">
            <span className="text-gray-500 block uppercase font-bold text-[11px]">Expenses Awaiting Review</span>
            <strong className="text-2xl font-bold text-amber-700 block">₹14,800</strong>
            <span className="text-amber-800 text-[11px] font-semibold">3 AC cab fuel & lunch bills</span>
          </div>
        </div>

        {/* Clean Donut Chart & Lead Funnel */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-[#242C27] p-6 rounded-2xl border shadow-sm space-y-4">
            <h3 className="font-serif font-bold text-base text-[#0F261E] dark:text-white">Unit Inventory Breakdown</h3>
            <div className="flex flex-col sm:flex-row sm:items-center gap-6">
              <svg
                viewBox="0 0 100 100"
                className="w-36 h-36 shrink-0 -rotate-90"
                role="img"
                aria-label="Plot inventory donut chart"
              >
                {(() => {
                  const C = 2 * Math.PI * 40;
                  let offset = 0;
                  return INVENTORY.map((seg) => {
                    const len = (plots.filter((p) => p.status === seg.key).length / plots.length) * C;
                    const el = (
                      <circle
                        key={seg.key}
                        cx="50"
                        cy="50"
                        r="40"
                        fill="transparent"
                        stroke={seg.color}
                        strokeWidth="20"
                        strokeDasharray={`${len} ${C - len}`}
                        strokeDashoffset={-offset}
                      />
                    );
                    offset += len;
                    return el;
                  });
                })()}
              </svg>
              <ul className="space-y-1.5 text-xs">
                {INVENTORY.map((seg) => {
                  const n = plots.filter((p) => p.status === seg.key).length;
                  return (
                    <li key={seg.key} className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full" style={{ background: seg.color }} />
                      <span>
                        {seg.label}: {n} ({Math.round((n / plots.length) * 100)}%)
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <div className="bg-white dark:bg-[#242C27] p-6 rounded-2xl border shadow-sm space-y-4">
            <h3 className="font-serif font-bold text-base text-[#0F261E] dark:text-white">Farmland Sales Funnel</h3>
            <div className="space-y-2 text-xs">
              {[
                { stage: '1. Inbound Inquiries', count: 32, width: '100%' },
                { stage: '2. Contacted & Vetted', count: 24, width: '75%' },
                { stage: '3. AC Farm Tour Completed', count: 18, width: '56%' },
                { stage: '4. Title Search & Hold', count: 11, width: '34%' },
                { stage: '5. Converted & Registered', count: 6, width: '19%' },
              ].map((f) => (
                <div key={f.stage} className="space-y-1">
                  <div className="flex justify-between font-bold">
                    <span>{f.stage}</span>
                    <span>{f.count} leads</span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-gray-100 overflow-hidden">
                    <div className="h-full bg-[#1E4A3B] rounded-full" style={{ width: f.width }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
