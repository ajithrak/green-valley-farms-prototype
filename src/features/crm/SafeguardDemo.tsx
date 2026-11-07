import { useApp } from '@/context/AppContext';

export function SafeguardDemo() {
  const { setPlots, addToast } = useApp();
  return (
    <>
      <div className="max-w-2xl mx-auto bg-white dark:bg-[#242C27] p-8 rounded-2xl border shadow-sm space-y-6">
        <div>
          <h2 className="font-serif text-2xl font-bold text-[#0F261E] dark:text-white">
            Double-Booking Safeguard Demo
          </h2>
          <p className="text-xs text-gray-600">
            Simulates real-time concurrency collision when two agents reserve the same plot simultaneously.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => {
              setPlots((prev) => prev.map((p) => (p.number === 'A-05' ? { ...p, status: 'pending' } : p)));
              addToast(
                '⚠️ Plot Just Reserved by Colleague',
                'Plot A-05 was just reserved by Rajesh moments ago! Map refreshed.',
              );
            }}
            className="flex-1 py-3 bg-amber-600 text-white font-bold rounded-xl text-xs min-h-[48px]"
          >
            Simulate Simultaneous Lock Attempt
          </button>
          <button
            onClick={() => {
              setPlots((prev) => prev.map((p) => (p.number === 'A-05' ? { ...p, status: 'available' } : p)));
            }}
            className="py-3 px-4 border rounded-xl text-xs font-bold min-h-[48px]"
          >
            Reset
          </button>
        </div>
      </div>
    </>
  );
}
