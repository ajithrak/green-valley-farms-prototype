import { useApp } from '@/context/AppContext';

export function PlannedModule() {
  const { crmTab } = useApp();
  return (
    <>
      <div className="max-w-3xl mx-auto bg-white dark:bg-[#242C27] p-12 rounded-2xl border text-center space-y-4 shadow-sm">
        <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
          Planned Feature (Phase 2 Deployment)
        </span>
        <h2 className="font-serif text-2xl font-bold text-[#0F261E] dark:text-white">
          {crmTab === 'p2_ledger' && 'Commission & Rewards Ledger'}
          {crmTab === 'p2_settlement' && 'Settlement Batches & Sub-Registrar Stamping'}
          {crmTab === 'p2_finance' && 'Company Financial Books & Tax Ledgers'}
          {crmTab === 'p2_cms' && 'Farmland Blog CMS & Agricultural News'}
          {crmTab === 'p2_audit' && 'Master Immutable Security Audit Log'}
        </h2>
        <p className="text-xs text-gray-500 max-w-md mx-auto">
          This module layout is pre-configured in the platform architecture. Historical data and transactions will
          populate automatically upon Phase 2 rollout.
        </p>
        <div className="p-8 border-2 border-dashed rounded-xl bg-gray-50 dark:bg-gray-800/40 text-gray-400 text-xs">
          No records currently pending in this ledger.
        </div>
      </div>
    </>
  );
}
