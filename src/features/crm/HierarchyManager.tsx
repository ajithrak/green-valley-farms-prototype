import { Icon } from '@/components/ui/Icon';
import { useApp } from '@/context/AppContext';

export function HierarchyManager() {
  const {
    hierarchy,
    selectedPerson,
    setSelectedPerson,
    hierarchySearch,
    setHierarchySearch,
    hierarchyError,
    setHierarchyError,
    handleUpdateManager,
  } = useApp();
  return (
    <>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
          <div>
            <h2 className="font-serif text-2xl font-bold text-[#0F261E] dark:text-white">
              Reporting Lines & 15-Level Ladder
            </h2>
            <p className="text-xs text-gray-500">
              Configurable sales hierarchy with circular reporting line safeguards.
            </p>
          </div>
          <div className="w-64">
            <input
              type="text"
              placeholder="Search staff or level..."
              value={hierarchySearch}
              onChange={(e) => setHierarchySearch(e.target.value)}
              className="w-full p-2 border rounded-xl text-xs"
            />
          </div>
        </div>

        {hierarchyError && (
          <div className="p-3 bg-rose-50 border border-rose-300 rounded-xl text-xs text-rose-900 font-bold flex items-center gap-2">
            <Icon name="shieldAlert" className="w-4 h-4 text-rose-700 shrink-0" />
            <span>{hierarchyError}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Tree View */}
          <div className="lg:col-span-7 bg-white dark:bg-[#242C27] p-6 rounded-2xl border shadow-sm space-y-3">
            <h3 className="font-serif font-bold text-base text-[#0F261E] dark:text-white mb-2">
              Organization Structure
            </h3>
            <div className="space-y-2 text-xs">
              {hierarchy
                .filter(
                  (h) =>
                    h.name.toLowerCase().includes(hierarchySearch.toLowerCase()) ||
                    h.levelTitle.toLowerCase().includes(hierarchySearch.toLowerCase()),
                )
                .map((node) => (
                  <div
                    key={node.id}
                    onClick={() => {
                      setSelectedPerson(node);
                      setHierarchyError('');
                    }}
                    className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                      selectedPerson?.id === node.id ? 'bg-[#F0F6F3] border-[#1E4A3B] shadow-sm' : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-lg bg-[#1E4A3B] text-white font-bold flex items-center justify-center text-xs">
                        L{node.level}
                      </span>
                      <div>
                        <strong className="block text-sm text-[#0F261E] dark:text-white">{node.name}</strong>
                        <span className="text-gray-500">{node.levelTitle}</span>
                      </div>
                    </div>
                    <span className="text-xs text-gray-500 font-semibold">{node.teamCount} Team Members</span>
                  </div>
                ))}
            </div>
          </div>

          {/* Selected Person Profile Panel */}
          {selectedPerson && (
            <div className="lg:col-span-5 bg-white dark:bg-[#242C27] p-6 rounded-2xl border shadow-sm space-y-4 text-xs">
              <div className="flex justify-between items-start border-b pb-3">
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#0F261E] dark:text-white">{selectedPerson.name}</h3>
                  <span className="text-gray-500">{selectedPerson.levelTitle}</span>
                </div>
                <span className="px-2.5 py-1 bg-emerald-100 text-emerald-950 font-bold rounded-full">
                  Level {selectedPerson.level}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-500 block">Direct Team:</span>
                  <strong className="text-sm text-gray-800">{selectedPerson.teamCount} Members</strong>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-500 block">Units Booked:</span>
                  <strong className="text-sm text-emerald-700">{selectedPerson.unitsBooked} Plots</strong>
                </div>
              </div>

              <div>
                <span className="text-gray-500 block mb-1 font-bold">Assigned Benefits Status:</span>
                <div className="p-2.5 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-lg font-semibold">
                  {selectedPerson.benefitsStatus}
                </div>
              </div>

              {/* Reassign Manager with Circular Reporting Check */}
              <div className="pt-2 border-t space-y-2">
                <label className="block font-bold text-gray-700">Reassign Direct Reporting Line:</label>
                <select
                  defaultValue={selectedPerson.reportsToId || ''}
                  onChange={(e) => handleUpdateManager(selectedPerson.id, e.target.value)}
                  className="w-full p-2 border rounded-lg font-bold"
                >
                  <option value="">No Supervisor (Top Board)</option>
                  {hierarchy
                    .filter((h) => h.id !== selectedPerson.id)
                    .map((h) => (
                      <option key={h.id} value={h.id}>
                        {h.name} ({h.levelTitle})
                      </option>
                    ))}
                </select>
                <span className="text-[11px] text-gray-400 block">
                  System blocks any circular assignments automatically.
                </span>
              </div>

              {/* Transfer History Log */}
              <div className="border-t pt-3 space-y-2">
                <strong className="block text-gray-700">Transfer & Designation Audit History:</strong>
                {selectedPerson.transferHistory.length === 0 ? (
                  <p className="text-gray-400 italic">No transfer records logged yet.</p>
                ) : (
                  <div className="space-y-1">
                    {selectedPerson.transferHistory.map((th, idx) => (
                      <div key={idx} className="p-2 bg-gray-50 rounded text-[11px] text-gray-600">
                        <strong>{th.date}:</strong> {th.fromRole} → {th.toRole} (Signed by {th.approver})
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
