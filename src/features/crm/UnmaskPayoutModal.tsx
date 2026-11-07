import { Icon } from '@/components/ui/Icon';
import { useApp } from '@/context/AppContext';

export function UnmaskPayoutModal() {
  const { setShowPayoutDetails, showConfirmUnmaskModal, setShowConfirmUnmaskModal, addToast } = useApp();
  return (
    <>
      {showConfirmUnmaskModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 space-y-4 border shadow-xl text-xs">
            <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-800">
              <Icon name="shieldAlert" className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#0F261E]">Confirm Display of Bank Details</h3>
            <p className="text-gray-600">
              For your account security, bank account and UPI addresses are kept hidden. Are you sure you want to reveal
              your full payout details on screen?
            </p>
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setShowConfirmUnmaskModal(false)}
                className="flex-1 py-2.5 border rounded-xl font-bold text-gray-700 min-h-[48px]"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowConfirmUnmaskModal(false);
                  setShowPayoutDetails(true);
                  addToast('Financial Details Unmasked', 'Displaying full verified bank IFSC and account number.');
                }}
                className="flex-1 py-2.5 bg-[#1E4A3B] text-white font-bold rounded-xl min-h-[48px]"
              >
                Yes, Show Details
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
