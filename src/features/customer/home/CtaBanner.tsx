import { Icon } from '@/components/ui/Icon';
import { useApp } from '@/context/AppContext';

export function CtaBanner() {
  const { setCustomerPage } = useApp();
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      <div className="rounded-3xl bg-[#0F261E] text-white p-8 sm:p-12 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="max-w-xl">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-balance">See the land before you decide.</h2>
          <p className="text-emerald-100/80 mt-2 text-sm sm:text-base">
            Free guided site visits every day, 8 AM – 6 PM. Pick a slot and we will confirm it by SMS or WhatsApp.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => setCustomerPage('enquiry')}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl whitespace-nowrap bg-emerald-400 text-[#0F261E] font-bold min-h-[48px] hover:bg-emerald-300"
          >
            <Icon name="calendar" className="w-5 h-5" />
            Book a free site visit
          </button>
          <span className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-white/30 font-semibold min-h-[48px] whitespace-nowrap">
            <Icon name="phone" className="w-5 h-5" />
            +91 98480 00000 <span className="text-xs opacity-70">(sample)</span>
          </span>
        </div>
      </div>
    </section>
  );
}
