import { Icon } from '@/components/ui/Icon';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { formatInr } from '@/utils/currency';
import type { PlotStatus } from '@/types';
import { useApp } from '@/context/AppContext';

export function ProjectSetup() {
  const {
    plots,
    setPlots,
    setupStep,
    setSetupStep,
    newProjectCode,
    setNewProjectCode,
    newProjectName,
    setNewProjectName,
    newProjectLocation,
    setNewProjectLocation,
    newProjectPublic,
    setNewProjectPublic,
    selectedPlotTableIds,
    setSelectedPlotTableIds,
    bulkStatusToApply,
    setBulkStatusToApply,
    addToast,
  } = useApp();
  return (
    <>
      <div className="space-y-8">
        <div className="bg-white dark:bg-[#242C27] p-4 sm:p-6 rounded-2xl border shadow-sm space-y-4">
          <div className="flex justify-between items-center border-b pb-3">
            <div>
              <span className="text-xs uppercase font-bold text-emerald-800">Admin Setup Wizard</span>
              <h2 className="font-serif text-xl font-bold text-[#0F261E] dark:text-white">
                Create Farmland Project (Step {setupStep} of 5)
              </h2>
            </div>
            <div className="flex gap-1 text-xs font-bold">
              {[1, 2, 3, 4, 5].map((s) => (
                <span
                  key={s}
                  className={`w-6 h-6 rounded-full flex items-center justify-center ${setupStep === s ? 'bg-[#1E4A3B] text-white' : 'bg-gray-100 text-gray-600'}`}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          {setupStep === 1 && (
            <div className="space-y-3 text-xs">
              <h3 className="font-bold text-sm text-[#0F261E] dark:text-white">Step 1: Project Basic Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Project Code *</label>
                  <input
                    type="text"
                    value={newProjectCode}
                    onChange={(e) => setNewProjectCode(e.target.value)}
                    className="w-full p-2.5 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Project Name *</label>
                  <input
                    type="text"
                    value={newProjectName}
                    onChange={(e) => setNewProjectName(e.target.value)}
                    className="w-full p-2.5 border rounded-lg"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block font-bold text-gray-700 mb-1">Farmland Location *</label>
                  <input
                    type="text"
                    value={newProjectLocation}
                    onChange={(e) => setNewProjectLocation(e.target.value)}
                    className="w-full p-2.5 border rounded-lg"
                  />
                </div>
              </div>
              <button
                onClick={() => setSetupStep(2)}
                className="py-2.5 px-6 bg-[#1E4A3B] text-white font-bold rounded-xl text-xs"
              >
                Next: Media & Layout →
              </button>
            </div>
          )}

          {setupStep === 2 && (
            <div className="space-y-3 text-xs">
              <h3 className="font-bold text-sm text-[#0F261E] dark:text-white">Step 2: Media & Drone Photography</h3>
              <div className="border-2 border-dashed p-6 text-center rounded-xl space-y-2">
                <Icon name="map" className="w-8 h-8 text-emerald-700 mx-auto" />
                <p className="text-gray-600 font-bold">
                  Upload High-Court Certified Title Deed & Drone Survey Map (JPG/PDF)
                </p>
                <span className="text-[11px] text-gray-400">Sample file survey_map_phase2.dwg loaded</span>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setSetupStep(1)} className="py-2 px-4 border rounded-xl font-bold">
                  Back
                </button>
                <button
                  onClick={() => setSetupStep(3)}
                  className="py-2.5 px-6 bg-[#1E4A3B] text-white font-bold rounded-xl"
                >
                  Next: Plot Units →
                </button>
              </div>
            </div>
          )}

          {setupStep === 3 && (
            <div className="space-y-3 text-xs">
              <h3 className="font-bold text-sm text-[#0F261E] dark:text-white">Step 3: Plots Import</h3>
              <p className="text-gray-600">40 Plots loaded in template layout (Blocks A to D).</p>
              <div className="flex gap-2">
                <button onClick={() => setSetupStep(2)} className="py-2 px-4 border rounded-xl font-bold">
                  Back
                </button>
                <button
                  onClick={() => setSetupStep(4)}
                  className="py-2.5 px-6 bg-[#1E4A3B] text-white font-bold rounded-xl"
                >
                  Next: Offers & Rules →
                </button>
              </div>
            </div>
          )}

          {setupStep === 4 && (
            <div className="space-y-3 text-xs">
              <h3 className="font-bold text-sm text-[#0F261E] dark:text-white">
                Step 4: Link Active Commission & Bonus Rules
              </h3>
              <div className="p-3 bg-gray-50 rounded-xl space-y-1">
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked />
                  <span>Link "Karthika Masam Special Token Bonus"</span>
                </label>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setSetupStep(3)} className="py-2 px-4 border rounded-xl font-bold">
                  Back
                </button>
                <button
                  onClick={() => setSetupStep(5)}
                  className="py-2.5 px-6 bg-[#1E4A3B] text-white font-bold rounded-xl"
                >
                  Next: Team & Visibility →
                </button>
              </div>
            </div>
          )}

          {setupStep === 5 && (
            <div className="space-y-3 text-xs">
              <h3 className="font-bold text-sm text-[#0F261E] dark:text-white">Step 5: Team Visibility</h3>
              <label className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl">
                <input
                  type="checkbox"
                  checked={newProjectPublic}
                  onChange={(e) => setNewProjectPublic(e.target.checked)}
                />
                <span>Publish to public customer website instantly</span>
              </label>
              <div className="flex gap-2 pt-2">
                <button onClick={() => setSetupStep(4)} className="py-2 px-4 border rounded-xl font-bold">
                  Back
                </button>
                <button
                  onClick={() => {
                    setSetupStep(1);
                    addToast('Project Created', `${newProjectName} successfully deployed with 40 units.`);
                  }}
                  className="py-2.5 px-6 bg-emerald-700 text-white font-bold rounded-xl"
                >
                  Finalize & Deploy Project ✓
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Plot Bulk State Editor Table */}
        <div className="bg-white dark:bg-[#242C27] p-4 sm:p-6 rounded-2xl border shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
            <div>
              <h3 className="font-serif font-bold text-base text-[#0F261E] dark:text-white">
                Farmland Units Table & Bulk State Editor
              </h3>
              <p className="text-xs text-gray-500">Edit status across multiple plots simultaneously.</p>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <select
                value={bulkStatusToApply}
                onChange={(e) => setBulkStatusToApply(e.target.value as PlotStatus)}
                className="p-2 border rounded-lg font-bold"
              >
                <option value="available">Available (Green)</option>
                <option value="pending">Reservation pending (Yellow)</option>
                <option value="booked">Booked (Blue)</option>
                <option value="sold">Sold (Red)</option>
                <option value="blocked">Blocked (Grey)</option>
              </select>
              <button
                onClick={() => {
                  if (selectedPlotTableIds.length === 0) {
                    addToast('Select Plots', 'Please tick at least one plot in the table.');
                    return;
                  }
                  setPlots((prev) =>
                    prev.map((p) => (selectedPlotTableIds.includes(p.id) ? { ...p, status: bulkStatusToApply } : p)),
                  );
                  addToast(
                    'Bulk Status Updated',
                    `Updated ${selectedPlotTableIds.length} plots to ${bulkStatusToApply}.`,
                  );
                  setSelectedPlotTableIds([]);
                }}
                className="px-4 py-2 bg-[#1E4A3B] text-white font-bold rounded-lg"
              >
                Apply Bulk Status
              </button>
            </div>
          </div>

          <div className="max-h-80 overflow-auto border rounded-xl">
            <table className="w-full min-w-[560px] text-left text-xs">
              <thead className="bg-[#F0F6F3] sticky top-0 border-b font-bold text-gray-600">
                <tr>
                  <th className="p-3 w-8">
                    <input
                      type="checkbox"
                      onChange={(e) => {
                        if (e.target.checked) setSelectedPlotTableIds(plots.map((p) => p.id));
                        else setSelectedPlotTableIds([]);
                      }}
                    />
                  </th>
                  <th className="p-3">Plot Number</th>
                  <th className="p-3">Block</th>
                  <th className="p-3">Size</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Current Status</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {plots.map((plot) => (
                  <tr key={plot.id} className="hover:bg-gray-50">
                    <td className="p-3">
                      <input
                        type="checkbox"
                        checked={selectedPlotTableIds.includes(plot.id)}
                        onChange={() => {
                          setSelectedPlotTableIds((prev) =>
                            prev.includes(plot.id) ? prev.filter((x) => x !== plot.id) : [...prev, plot.id],
                          );
                        }}
                      />
                    </td>
                    <td className="p-3 font-bold">{plot.number}</td>
                    <td className="p-3">{plot.block}</td>
                    <td className="p-3">
                      {plot.sizeSqYards} sq.yd ({plot.sizeAcres})
                    </td>
                    <td className="p-3 font-semibold">{formatInr(plot.priceInr)}</td>
                    <td className="p-3">
                      <StatusBadge type="plot" status={plot.status} size="sm" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
