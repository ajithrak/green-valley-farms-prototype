import { Icon } from '@/components/ui/Icon';
import { useApp } from '@/context/AppContext';

export function PortalPage() {
  const { setCustomerPage, portalState, setPortalState, addToast } = useApp();
  return (
    <>
      <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
          <h2 className="font-serif text-3xl font-bold text-[#0F261E]">Customer Land Portal</h2>
          {/* State Demo Toggle */}
          <div className="flex flex-wrap items-center gap-1.5 bg-gray-100 p-1 rounded-xl text-xs font-bold">
            <span className="text-gray-500 px-2">State Demo:</span>
            {(['normal', 'skeleton', 'empty', 'error'] as const).map((s) => (
              <button
                key={s}
                onClick={() => setPortalState(s)}
                className={`px-2.5 py-1 rounded-lg capitalize ${portalState === s ? 'bg-[#1E4A3B] text-white' : 'text-gray-600'}`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {portalState === 'skeleton' && (
          <div className="bg-white p-6 rounded-2xl border space-y-4 animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-1/4"></div>
            <div className="h-20 bg-gray-100 rounded-xl"></div>
            <div className="h-20 bg-gray-100 rounded-xl"></div>
          </div>
        )}

        {portalState === 'empty' && (
          <div className="bg-white p-12 rounded-2xl border text-center space-y-3">
            <Icon name="shieldAlert" className="w-12 h-12 text-gray-400 mx-auto" />
            <h3 className="font-serif text-xl font-bold text-[#0F261E]">No Booking Requests Found</h3>
            <p className="text-xs text-gray-500">
              You haven't requested any plots yet. Explore our 40-plot layout map.
            </p>
            <button
              onClick={() => setCustomerPage('plots')}
              className="px-5 py-2.5 rounded-xl bg-[#1E4A3B] text-white font-bold text-xs"
            >
              Browse Plots Map
            </button>
          </div>
        )}

        {portalState === 'error' && (
          <div className="bg-rose-50 p-8 rounded-2xl border border-rose-300 text-center space-y-3">
            <Icon name="xCircle" className="w-12 h-12 text-rose-600 mx-auto" />
            <h3 className="font-serif text-xl font-bold text-rose-950">Unable to Connect to Portal API</h3>
            <p className="text-xs text-gray-600">Failed to fetch title deed records. Please retry.</p>
            <button
              onClick={() => setPortalState('normal')}
              className="px-5 py-2 rounded-xl bg-rose-700 text-white font-bold text-xs"
            >
              Retry Connection
            </button>
          </div>
        )}

        {portalState === 'normal' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-[#DCE4DE] shadow-sm space-y-4">
              <h3 className="font-serif text-lg font-bold text-[#0F261E]">Active Requests Progress</h3>
              <div className="p-4 bg-[#F0F6F3] rounded-xl border space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <strong>Plot A-03 (605 sq.yd / 0.125 Acre)</strong>
                  <span className="font-bold text-emerald-800">Visit Confirmed</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  <div className="p-2 bg-emerald-100 rounded text-emerald-950 font-bold">1. Received ✓</div>
                  <div className="p-2 bg-emerald-100 rounded text-emerald-950 font-bold">2. Guide Assigned ✓</div>
                  <div className="p-2 bg-emerald-100 rounded text-emerald-950 font-bold">3. Visit Confirmed ✓</div>
                  <div className="p-2 bg-white rounded text-gray-500 border">4. 7-Day Hold</div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#DCE4DE] shadow-sm space-y-4">
              <h3 className="font-serif text-lg font-bold text-[#0F261E]">
                Downloadable Legal Opinions & Master Blueprints
              </h3>
              <div className="divide-y text-xs">
                {[
                  { title: '30-Year Legal Title Search Opinion', cat: 'High Court Certificate', size: '2.4 MB (PDF)' },
                  {
                    title: 'Master Farmland Layout Plan (40 Units)',
                    cat: 'Survey Department Approved',
                    size: '4.8 MB (PDF)',
                  },
                  {
                    title: 'Ground Water & Soil Lab Test Report',
                    cat: 'Agricultural University Certified',
                    size: '1.2 MB (PDF)',
                  },
                ].map((d, idx) => (
                  <div key={idx} className="py-3 flex items-center justify-between">
                    <div>
                      <strong className="block text-sm font-bold text-[#0F261E]">{d.title}</strong>
                      <span className="text-gray-500">
                        {d.cat} • {d.size}
                      </span>
                    </div>
                    <button
                      onClick={() => addToast('Document Download', `Downloading ${d.title}`)}
                      className="px-3.5 py-1.5 rounded-lg border bg-white font-bold flex items-center gap-1.5"
                    >
                      <Icon name="download" className="w-3.5 h-3.5 text-[#1E4A3B]" />
                      <span>Download</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
