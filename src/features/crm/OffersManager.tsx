import { Icon } from '@/components/ui/Icon';
import type { OfferRule } from '@/types';
import { useApp } from '@/context/AppContext';

export function OffersManager() {
  const {
    offers,
    setOffers,
    criteriaMetric,
    setCriteriaMetric,
    criteriaThreshold,
    setCriteriaThreshold,
    simulationResult,
    setSimulationResult,
    addToast,
  } = useApp();
  return (
    <>
      <div className="space-y-8">
        <div className="bg-amber-50 border-2 border-amber-300 p-4 rounded-xl text-xs text-amber-950 flex items-start gap-2">
          <Icon name="shieldAlert" className="w-5 h-5 text-amber-800 shrink-0 mt-0.5" />
          <div>
            <strong className="block font-bold">
              Important Compliance Notice: Draft rules are inactive until approved.
            </strong>
            All incentive percentages, token values, and cash bonuses displayed below are SAMPLE values for prototyping
            and not approved business rules.
          </div>
        </div>

        {/* Criteria Builder & Simulator */}
        <div className="bg-white dark:bg-[#242C27] p-6 rounded-2xl border shadow-sm space-y-4 text-xs">
          <h3 className="font-serif font-bold text-base text-[#0F261E] dark:text-white">
            Rule Criteria Builder & Simulator
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <div>
              <label className="block font-bold mb-1">Qualifying Metric</label>
              <select
                value={criteriaMetric}
                onChange={(e) => setCriteriaMetric(e.target.value)}
                className="w-full p-2.5 border rounded-lg font-bold"
              >
                <option>Units Booked</option>
                <option>Site Visits Conducted</option>
                <option>Total Collection Cleared (INR)</option>
              </select>
            </div>
            <div>
              <label className="block font-bold mb-1">Operator & Threshold</label>
              <div className="flex gap-1">
                <span className="p-2.5 bg-gray-100 border rounded-lg font-bold">≥</span>
                <input
                  type="text"
                  value={criteriaThreshold}
                  onChange={(e) => setCriteriaThreshold(e.target.value)}
                  className="w-full p-2.5 border rounded-lg font-bold"
                />
              </div>
            </div>
            <div>
              <label className="block font-bold mb-1">Scope</label>
              <select className="w-full p-2.5 border rounded-lg font-bold">
                <option>Personal Performance</option>
                <option>Whole Direct Team</option>
              </select>
            </div>
            <div>
              <label className="block font-bold mb-1">Time Window</label>
              <select className="w-full p-2.5 border rounded-lg font-bold">
                <option>30 Days (Current Month)</option>
                <option>Quarterly (90 Days)</option>
              </select>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between">
            <button
              onClick={() => {
                setSimulationResult(
                  `Simulation Complete: 3 staff members (Venkat Rao, K. Sridhar, Rajesh Sharma) currently qualify with ≥ ${criteriaThreshold} ${criteriaMetric}.`,
                );
              }}
              className="px-5 py-2.5 bg-[#1E4A3B] text-white font-bold rounded-xl text-xs min-h-[44px]"
            >
              Simulate: Who Would Qualify?
            </button>
            {simulationResult && (
              <span className="text-emerald-800 font-bold bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-300">
                {simulationResult}
              </span>
            )}
          </div>
        </div>

        {/* Offers List */}
        <div className="bg-white dark:bg-[#242C27] p-6 rounded-2xl border shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-serif font-bold text-base text-[#0F261E] dark:text-white">
              Configured Offers & Incentives
            </h3>
            <button
              onClick={() => {
                const newOff: OfferRule = {
                  id: `off-${Date.now()}`,
                  name: 'Sankranti Farmland Rush Bonus',
                  project: 'Green Valley Farms',
                  status: 'draft',
                  startDate: '01 Jan 2027',
                  endDate: '20 Jan 2027',
                  targetDesignation: 'All Partners',
                  criteriaSummary: 'Close ≥ 1 Lakefront Unit',
                  sampleBenefit: 'Sample: ₹25,000 festival gift (not approved)',
                  terms: 'Draft rule pending finance head signature.',
                  version: 1,
                };
                setOffers((prev) => [newOff, ...prev]);
                addToast('Draft Offer Created', 'Created in Draft mode. Inactive until approved.');
              }}
              className="px-3.5 py-1.5 rounded-lg bg-emerald-700 text-white font-bold text-xs"
            >
              + Create New Draft Offer
            </button>
          </div>

          <div className="divide-y text-xs">
            {offers.map((off) => (
              <div key={off.id} className="py-4 space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <strong className="text-sm text-[#0F261E] dark:text-white block">{off.name}</strong>
                    <span className="text-gray-500">
                      {off.project} • {off.startDate} to {off.endDate}
                    </span>
                  </div>
                  <span
                    className={`px-2.5 py-0.5 rounded-full font-bold uppercase text-[10px] ${
                      off.status === 'active'
                        ? 'bg-emerald-100 text-emerald-950 border border-emerald-300'
                        : 'bg-gray-100 text-gray-700 border'
                    }`}
                  >
                    {off.status} (v{off.version})
                  </span>
                </div>
                <p className="text-gray-600">
                  <strong>Criteria:</strong> {off.criteriaSummary}
                </p>
                <p className="text-emerald-800 font-semibold">{off.sampleBenefit}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
