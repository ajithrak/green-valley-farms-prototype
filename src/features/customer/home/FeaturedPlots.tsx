import { StatusBadge } from '@/components/ui/StatusBadge';
import { useApp } from '@/context/AppContext';
import { formatInr } from '@/utils/currency';
import { SectionHeading } from './SectionHeading';

export function FeaturedPlots() {
  const { plots, setCustomerPage, setSelectedPlot } = useApp();
  const featured = plots
    .filter((p) => p.status === 'available')
    .sort((a, b) => a.priceInr - b.priceInr)
    .filter((_, i) => i % 5 === 0)
    .slice(0, 4);

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      <SectionHeading
        eyebrow="Available now"
        title="Plots ready for your visit"
        subtitle="A sample from each size band. Prices are transparent and shown per plot."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {featured.map((p) => (
          <article
            key={p.id}
            className="bg-white rounded-2xl border border-[#DCE4DE] shadow-sm p-5 flex flex-col gap-3"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-xl font-bold text-[#0F261E]">Plot {p.number}</h3>
              <StatusBadge type="plot" status={p.status} size="sm" />
            </div>
            <dl className="text-sm text-gray-600 space-y-1">
              <div className="flex justify-between">
                <dt>Size</dt>
                <dd className="font-semibold text-gray-800">{p.sizeAcres}</dd>
              </div>
              <div className="flex justify-between">
                <dt>Area</dt>
                <dd className="font-semibold text-gray-800">{p.sizeSqYards} sq.yd</dd>
              </div>
              <div className="flex justify-between">
                <dt>Facing</dt>
                <dd className="font-semibold text-gray-800">{p.facing}</dd>
              </div>
            </dl>
            <strong className="text-2xl text-[#0F261E] mt-auto">{formatInr(p.priceInr)}</strong>
            <button
              onClick={() => {
                setSelectedPlot(p);
                setCustomerPage('plots');
              }}
              className="w-full py-3 rounded-xl bg-[#1E4A3B] text-white text-sm font-bold min-h-[44px] hover:bg-[#173B2F]"
            >
              View on map
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
