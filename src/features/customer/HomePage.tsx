import { Icon } from '@/components/ui/Icon';
import { Amenities } from './home/Amenities';
import { CtaBanner } from './home/CtaBanner';
import { Faq } from './home/Faq';
import { FeaturedPlots } from './home/FeaturedPlots';
import { HowItWorks } from './home/HowItWorks';
import { Location } from './home/Location';
import { PlotSizes } from './home/PlotSizes';
import { StatsStrip } from './home/StatsStrip';
import { useApp } from '@/context/AppContext';

export function HomePage() {
  const { setCustomerPage, lang, plots } = useApp();
  return (
    <>
      <div className="space-y-16 pb-12">
        <section className="bg-gradient-to-b from-[#DDE9E2]/60 via-[#F0F6F3]/40 to-[#FDFBF7] pt-12 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1E4A3B] text-white text-xs font-semibold shadow-sm">
                <Icon name="sprout" className="w-4 h-4 text-emerald-300" />
                <span>Government Survey #142/A & #143/B Approved</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#0F261E] leading-tight">
                {lang === 'en'
                  ? 'Own fertile farmland. Grow trees, build memories, secure your family.'
                  : 'సారవంతమైన వ్యవసాయ భూమిని సొంతం చేసుకోండి. చెట్లను పెంచండి, ఆనందంగా జీవించండి.'}
              </h1>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                Clear 30-year legal titles, sweet ground water at 120ft, 33ft plantation avenues, and full organic farm
                maintenance.
              </p>
              <div className="bg-white p-4 rounded-xl border border-[#DCE4DE] flex flex-wrap gap-6 shadow-sm">
                <div>
                  <span className="text-xs uppercase text-gray-500 font-bold block">Prices From</span>
                  <strong className="text-2xl font-bold text-[#0F261E]">₹13,91,500</strong>
                  <span className="text-xs text-gray-500 ml-1">/ 605 sq.yd</span>
                </div>
                <div className="border-l pl-6">
                  <span className="text-xs uppercase text-gray-500 font-bold block">Availability</span>
                  <strong className="text-xl font-bold text-emerald-700">
                    {plots.filter((p) => p.status === 'available').length} Plots Open
                  </strong>
                  <span className="text-xs text-gray-500 block">Out of {plots.length} Total</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={() => setCustomerPage('enquiry')}
                  className="flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-[#1E4A3B] text-white text-base sm:text-lg font-bold hover:bg-[#173B2F] transition-all shadow-md min-h-[48px]"
                >
                  <Icon name="calendar" className="w-5 h-5 text-emerald-300" />
                  <span>Book a free site visit</span>
                </button>
                <button
                  onClick={() => setCustomerPage('plots')}
                  className="flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-white text-[#0F261E] border-2 border-[#1E4A3B] text-base sm:text-lg font-bold hover:bg-[#F0F6F3] min-h-[48px]"
                >
                  <Icon name="compass" className="w-5 h-5 text-[#1E4A3B]" />
                  <span>Explore Available Plots</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-white rounded-2xl p-4 border border-[#DCE4DE] shadow-md">
                <div className="aspect-[4/3] rounded-xl overflow-hidden relative bg-[#1E4A3B]">
                  <svg viewBox="0 0 400 300" className="w-full h-full object-cover">
                    <rect width="400" height="300" fill="#2E6B55" />
                    <circle cx="340" cy="60" r="35" fill="#F6E05E" opacity="0.85" />
                    <path d="M0 160 Q100 120 200 150 T400 130 L400 300 L0 300 Z" fill="#1E4A3B" opacity="0.9" />
                    <path d="M0 200 Q200 170 400 190 L400 300 L0 300 Z" fill="#C85A32" opacity="0.4" />
                    <polygon points="170,300 230,300 210,180 190,180" fill="#E6EBE7" opacity="0.75" />
                    <circle cx="80" cy="180" r="22" fill="#2E6B55" />
                    <rect x="76" y="202" width="8" height="20" fill="#8C381B" />
                    <circle cx="280" cy="185" r="24" fill="#2E6B55" />
                    <rect x="276" y="209" width="8" height="22" fill="#8C381B" />
                  </svg>
                  <div className="absolute bottom-3 left-3 right-3 bg-white/95 px-3 py-2 rounded-lg flex items-center justify-between text-xs font-semibold text-[#0F261E]">
                    <span>Certified Mango & Teak Farmland</span>
                    <span className="text-emerald-700 font-bold">120ft Sweet Water</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3 Trust Points */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-[#1E4A3B] block mb-1">Guarantees</span>
            <h2 className="font-serif text-3xl font-bold text-[#0F261E]">Land ownership made safe & simple</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: 'shieldCheck',
                title: '100% Legal Clear Title',
                desc: 'Every acre verified by High Court advocates with 30-year search history and passbook registration.',
              },
              {
                icon: 'compass',
                title: 'Spot Registration & 33ft Roads',
                desc: 'Instant government sub-registrar documentation with direct tar and avenue road connectivity.',
              },
              {
                icon: 'droplets',
                title: 'Sweet Water & Organic Soil',
                desc: 'Tested sweet ground water at 120ft, red and alluvial fertile soil with drip irrigation installed.',
              },
            ].map((tp, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl p-6 border border-[#DCE4DE] shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#F0F6F3] flex items-center justify-center text-[#1E4A3B] mb-4">
                    <Icon name={tp.icon} className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#0F261E] mb-2">{tp.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{tp.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <StatsStrip />
        <FeaturedPlots />
        <Amenities />
        <HowItWorks />
        <PlotSizes />
        <Location />
        <Faq />
        <CtaBanner />
      </div>
    </>
  );
}
