import type { CrmTab } from '@/types';
import { Icon } from '@/components/ui/Icon';
import type { UserRole } from '@/types';
import { AdminDashboard } from './AdminDashboard';
import { ModeratorDesk } from './ModeratorDesk';
import { LeadQueue } from './LeadQueue';
import { ProjectSetup } from './ProjectSetup';
import { HierarchyManager } from './HierarchyManager';
import { OffersManager } from './OffersManager';
import { ProfilePayout } from './ProfilePayout';
import { PipelineLeads } from './PipelineLeads';
import { AgentMetrics } from './AgentMetrics';
import { SafeguardDemo } from './SafeguardDemo';
import { PlannedModule } from './PlannedModule';
import { useApp } from '@/context/AppContext';

const PLANNED_TABS: CrmTab[] = ['p2_ledger', 'p2_settlement', 'p2_finance', 'p2_cms', 'p2_audit'];

export function CrmWorkspace() {
  const { crmTab, setCrmTab, currentRole, setCurrentRole, setIsAuthenticated, addToast, unassignedLeads } = useApp();
  return (
    <>
      <div className="flex-1 flex flex-col">
        {/* Role Switcher & Header Controls */}
        <div className="bg-white dark:bg-[#242C27] border-b border-[#DCE4DE] dark:border-gray-800">
          <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
              <span className="text-xs font-bold uppercase text-gray-500 flex items-center gap-1">
                <Icon name="users" className="w-4 h-4 text-[#1E4A3B] dark:text-emerald-400" />
                <span>Role:</span>
              </span>
              <div className="inline-flex flex-wrap gap-1 rounded-xl p-1 bg-gray-100 dark:bg-gray-800 border max-w-full">
                {(['Admin', 'Moderator', 'Sales Person', 'Agent'] as UserRole[]).map((r) => (
                  <button
                    key={r}
                    onClick={() => {
                      setCurrentRole(r);
                      addToast(`Active Role: ${r}`, `Pipeline and permissions switched to ${r}.`);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all min-h-[40px] ${
                      currentRole === r
                        ? 'bg-white dark:bg-[#1A211D] text-[#0F261E] dark:text-emerald-300 shadow-sm'
                        : 'text-gray-500'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
              <button
                onClick={() => setCrmTab('profile')}
                className="px-3 py-1.5 rounded-lg border text-xs font-bold flex items-center gap-1.5 bg-gray-50 dark:bg-gray-800 min-h-[40px]"
              >
                <Icon name="userCheck" className="w-3.5 h-3.5 text-emerald-600" />
                <span>My Profile & Payout</span>
              </button>
              <button
                onClick={() => {
                  setIsAuthenticated(false);
                  addToast('Signed Out', 'You have been safely signed out of the internal CRM.');
                }}
                className="px-3 py-1.5 rounded-lg border text-xs font-bold hover:bg-gray-50 dark:hover:bg-gray-800 text-rose-700 min-h-[40px]"
              >
                Sign Out
              </button>
            </div>
          </div>

          {/* CRM Main Tab Bar */}
          <div className="max-w-7xl mx-auto px-4 flex gap-2 overflow-x-auto py-2">
            {[
              { id: 'admin_dash', label: 'Admin Dashboard', icon: 'pieChart', roles: ['Admin'] },
              { id: 'moderator_dash', label: 'Moderator Desk', icon: 'shieldAlert', roles: ['Admin', 'Moderator'] },
              {
                id: 'queue',
                label: `Lead Queue (${unassignedLeads.length})`,
                icon: 'layers',
                roles: ['Admin', 'Moderator'],
              },
              {
                id: 'leads',
                label: 'Pipeline Leads',
                icon: 'users',
                roles: ['Admin', 'Moderator', 'Sales Person', 'Agent'],
              },
              { id: 'project_setup', label: 'Project Setup & Plots', icon: 'folderPlus', roles: ['Admin'] },
              { id: 'hierarchy', label: '15-Level Hierarchy', icon: 'gitBranch', roles: ['Admin', 'Moderator'] },
              { id: 'offers', label: 'Offers & Rules', icon: 'tag', roles: ['Admin'] },
              { id: 'agent', label: 'Agent Metrics', icon: 'barChart', roles: ['Admin', 'Sales Person', 'Agent'] },
              {
                id: 'safeguard',
                label: 'Double-Booking Demo',
                icon: 'shieldCheck',
                roles: ['Admin', 'Sales Person', 'Agent'],
              },
              {
                id: 'p2_ledger',
                label: 'Rewards Ledger',
                icon: 'creditCard',
                roles: ['Admin', 'Sales Person', 'Agent'],
                planned: true,
              },
              { id: 'p2_settlement', label: 'Settlements', icon: 'archive', roles: ['Admin'], planned: true },
              { id: 'p2_finance', label: 'Company Finance', icon: 'barChart', roles: ['Admin'], planned: true },
              { id: 'p2_cms', label: 'Farmland Blog CMS', icon: 'fileText', roles: ['Admin'], planned: true },
              { id: 'p2_audit', label: 'Master Audit Log', icon: 'shieldCheck', roles: ['Admin'], planned: true },
            ]
              .filter((tab) => tab.roles.includes(currentRole))
              .map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setCrmTab(tab.id as CrmTab)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap min-h-[44px] ${
                    crmTab === tab.id
                      ? 'bg-[#1E4A3B] text-white shadow-sm'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <Icon name={tab.icon} className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                  {tab.planned && (
                    <span className="text-[10px] uppercase font-bold bg-amber-200 text-amber-900 px-1.5 py-0.5 rounded-full">
                      Planned
                    </span>
                  )}
                </button>
              ))}
          </div>
        </div>

        {/* CRM Tab Contents */}
        <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-6">
          {/* SECTION F: ADMIN DASHBOARD */}
          {crmTab === 'admin_dash' && <AdminDashboard />}

          {/* SECTION F: MODERATOR DASHBOARD */}
          {crmTab === 'moderator_dash' && <ModeratorDesk />}

          {/* SECTION B: ASSIGNMENT QUEUE */}
          {crmTab === 'queue' && <LeadQueue />}

          {/* SECTION C: PROJECT SETUP & PLOT MANAGER */}
          {crmTab === 'project_setup' && <ProjectSetup />}

          {/* SECTION D: TEAM HIERARCHY (15-LEVEL TREE) */}
          {crmTab === 'hierarchy' && <HierarchyManager />}

          {/* SECTION E: CRITERIA & OFFERS ENGINE */}
          {crmTab === 'offers' && <OffersManager />}

          {/* SECTION A: PROFILE PAGE */}
          {crmTab === 'profile' && <ProfilePayout />}

          {/* PIPELINE LEADS LIST */}
          {crmTab === 'leads' && <PipelineLeads />}

          {/* AGENT METRICS */}
          {crmTab === 'agent' && <AgentMetrics />}

          {/* DOUBLE-BOOKING DEMO */}
          {crmTab === 'safeguard' && <SafeguardDemo />}

          {/* SECTION G: PHASE 2 PLACEHOLDERS (VISIBLE EMPTY STATES) */}
          {PLANNED_TABS.includes(crmTab) && <PlannedModule />}
        </main>
      </div>
    </>
  );
}
