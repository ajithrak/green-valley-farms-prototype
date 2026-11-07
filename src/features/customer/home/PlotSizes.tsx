import { useApp } from '@/context/AppContext';
import { formatInr } from '@/utils/currency';
import { SectionHeading } from './SectionHeading';

export function PlotSizes() {
  const { plots, setCustomerPage } = useApp();
  const blocks = ['Block A', 'Block B', 'Block C', 'Block D'].map((b) => {
    const list = plots.filter((p) => p.block === b);
    const open = list.filter((p) => p.status === 'available');
    const acres = Array.from(new Set(list.map((p) => p.sizeAcres)));
    return {
      b,
      total: list.length,
      open: open.length,
      acres: acres.join(' – '),
      from: Math.min(...list.map((p) => p.priceInr)),
    };
  });

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      <SectionHeading eyebrow="Plot sizes & pricing" title="Choose a block that fits your plan" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {blocks.map((x) => (
          <div key={x.b} className="bg-white rounded-2xl border border-[#DCE4DE] p-5 space-y-3">
            <h3 className="font-serif text-xl font-bold text-[#0F261E]">{x.b}</h3>
            <p className="text-sm text-gray-600">{x.acres}</p>
            <div>
              <span className="text-xs uppercase font-bold text-gray-500 block">Starting from</span>
              <strong className="text-xl text-[#1E4A3B]">{formatInr(x.from)}</strong>
            </div>
            <div className="h-2 rounded-full bg-gray-100 overflow-hidden" role="presentation">
              <div className="h-full bg-[#2E6B55]" style={{ width: `${(x.open / x.total) * 100}%` }} />
            </div>
            <p className="text-xs text-gray-600">
              {x.open} of {x.total} plots open
            </p>
          </div>
        ))}
      </div>
      <div className="text-center mt-6">
        <button
          onClick={() => setCustomerPage('plots')}
          className="px-6 py-3 rounded-xl border-2 border-[#1E4A3B] text-[#1E4A3B] font-bold text-sm min-h-[44px] hover:bg-[#F0F6F3]"
        >
          See the full plot map
        </button>
      </div>
    </section>
  );
}
