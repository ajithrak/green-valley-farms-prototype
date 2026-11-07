import { useApp } from '@/context/AppContext';

export function EnquiryPage() {
  const { setCustomerPage, addToast } = useApp();
  return (
    <>
      <div className="max-w-xl mx-auto py-12 px-4 space-y-6">
        <div className="text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-[#1E4A3B] block mb-1">Free Guided Tour</span>
          <h2 className="font-serif text-3xl font-bold text-[#0F261E]">Book Your Free Farmland Visit</h2>
          <p className="text-xs text-gray-600 mt-1">Free AC car pickup from city • Soil & water testing • Farm lunch</p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            addToast('Visit Request Submitted', 'Our farm manager Venkat Rao will call you to confirm AC cab pickup.');
            setCustomerPage('home');
          }}
          className="bg-white p-6 rounded-2xl border border-[#DCE4DE] shadow-md space-y-4 text-sm"
        >
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Farmland Project</label>
            <input
              type="text"
              value="Green Valley Farms (Chevella)"
              disabled
              className="w-full p-3 rounded-xl bg-gray-50 border text-gray-700 font-bold"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Your Full Name *</label>
            <input
              type="text"
              placeholder="e.g. Ramesh Naidu"
              required
              className="w-full p-3.5 rounded-xl border text-base"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">10-Digit Mobile Number *</label>
            <input
              type="tel"
              placeholder="98480 12345"
              required
              maxLength={10}
              className="w-full p-3.5 rounded-xl border text-base"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Preferred Date *</label>
            <input
              type="date"
              defaultValue="2026-11-15"
              required
              className="w-full p-3.5 rounded-xl border text-base"
            />
          </div>
          <button
            type="submit"
            className="w-full py-4 rounded-xl bg-[#1E4A3B] text-white text-base font-bold hover:bg-[#173B2F] min-h-[48px]"
          >
            Submit Free Visit Request
          </button>
        </form>
      </div>
    </>
  );
}
