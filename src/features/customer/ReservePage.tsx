import { Icon } from '@/components/ui/Icon';
import { useApp } from '@/context/AppContext';

export function ReservePage() {
  const { setCustomerPage, activePlotNumber, setPlots, addToast } = useApp();
  return (
    <>
      <div className="max-w-2xl mx-auto py-12 px-4 space-y-6">
        <div className="text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-[#1E4A3B] block mb-1">Priority Holding</span>
          <h2 className="font-serif text-3xl font-bold text-[#0F261E]">Request Plot Reservation</h2>
        </div>

        <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 flex items-start gap-3">
          <Icon name="shieldAlert" className="w-6 h-6 text-amber-700 shrink-0 mt-0.5" />
          <div className="text-xs text-amber-950">
            <strong className="block text-sm font-bold text-amber-900">
              Notice: This is a REQUEST and NOT a confirmed sale
            </strong>
            No money is taken online. This places a 7-day hold on Plot {activePlotNumber} so you can verify legal files
            before making any token payment.
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setPlots((prev) => prev.map((p) => (p.number === activePlotNumber ? { ...p, status: 'pending' } : p)));
            addToast('7-Day Hold Placed', `Plot ${activePlotNumber} is now reserved for legal review.`);
            setCustomerPage('portal');
          }}
          className="bg-white p-6 rounded-2xl border border-[#DCE4DE] shadow-md space-y-4 text-sm"
        >
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Selected Farmland Unit</label>
            <input
              type="text"
              value={`Plot ${activePlotNumber} (Green Valley Farms)`}
              disabled
              className="w-full p-3 rounded-xl bg-gray-50 border font-bold"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Your Full Name *</label>
            <input
              type="text"
              required
              placeholder="e.g. Ramesh Naidu"
              className="w-full p-3.5 rounded-xl border text-base"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">10-Digit Mobile *</label>
            <input
              type="tel"
              required
              maxLength={10}
              placeholder="98480 12345"
              className="w-full p-3.5 rounded-xl border text-base"
            />
          </div>
          <button
            type="submit"
            className="w-full py-4 rounded-xl bg-[#1E4A3B] text-white font-bold text-base hover:bg-[#173B2F] min-h-[48px]"
          >
            Submit 7-Day Hold Request (No Payment)
          </button>
        </form>
      </div>
    </>
  );
}
