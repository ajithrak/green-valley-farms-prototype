import { useApp } from '@/context/AppContext';

export function ProfilePayout() {
  const { showPayoutDetails, setShowPayoutDetails, setShowConfirmUnmaskModal } = useApp();
  return (
    <>
      <div className="max-w-xl mx-auto bg-white dark:bg-[#242C27] p-8 rounded-2xl border shadow-sm space-y-6 text-xs">
        <div className="flex items-center gap-4 border-b pb-4">
          <div className="w-16 h-16 rounded-2xl bg-[#1E4A3B] text-white flex items-center justify-center font-serif text-2xl font-bold">
            RS
          </div>
          <div>
            <h2 className="font-serif text-2xl font-bold text-[#0F261E] dark:text-white">Rajesh Sharma</h2>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 font-bold text-[11px]">
              Admin • Managing Director (Level 15)
            </span>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <span className="text-gray-500 block font-bold">Registered Phone:</span>
            <span className="text-sm text-gray-800 dark:text-gray-200">+91 98480 11001</span>
          </div>
          <div>
            <span className="text-gray-500 block font-bold">Work Email:</span>
            <span className="text-sm text-gray-800 dark:text-gray-200">rajesh@greenvalleyfarms.in</span>
          </div>
        </div>

        {/* Masked Bank Details */}
        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border space-y-3">
          <div className="flex justify-between items-center">
            <strong className="text-sm text-gray-800 dark:text-white font-bold">Payout & Bank Credentials</strong>
            {!showPayoutDetails ? (
              <button
                onClick={() => setShowConfirmUnmaskModal(true)}
                className="px-3 py-1 bg-[#1E4A3B] text-white font-bold rounded-lg text-xs"
              >
                Show Full Details
              </button>
            ) : (
              <button
                onClick={() => setShowPayoutDetails(false)}
                className="px-3 py-1 border rounded-lg font-bold text-xs"
              >
                Hide
              </button>
            )}
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between">
              <span className="text-gray-500">Bank Account:</span>
              <strong className="font-mono text-sm">
                {showPayoutDetails ? 'HDFC Bank — 50100482199201' : 'HDFC Bank — ••••••••••4821'}
              </strong>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">IFSC Code:</span>
              <strong className="font-mono text-sm">
                {showPayoutDetails ? 'HDFC0000240 (Banjara Hills)' : '••••••••240'}
              </strong>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">UPI VPA:</span>
              <strong className="font-mono text-sm">
                {showPayoutDetails ? 'rajesh.sharma@okhdfcbank' : '•••••••@okhdfcbank'}
              </strong>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
