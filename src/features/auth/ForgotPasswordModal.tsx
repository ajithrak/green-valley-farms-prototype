import { Icon } from '@/components/ui/Icon';
import { useApp } from '@/context/AppContext';

export function ForgotPasswordModal() {
  const { showForgotModal, setShowForgotModal, forgotStep, setForgotStep, forgotPhone, setForgotPhone, addToast } =
    useApp();
  return (
    <>
      {showForgotModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 border shadow-xl">
            <div className="flex justify-between items-center border-b pb-3">
              <div>
                <span className="text-xs uppercase font-bold text-emerald-800">Account Recovery</span>
                <h3 className="font-serif text-xl font-bold text-[#0F261E]">Reset Password (Step {forgotStep} of 3)</h3>
              </div>
              <button onClick={() => setShowForgotModal(false)} className="text-gray-400 hover:text-gray-600">
                <Icon name="x" className="w-5 h-5" />
              </button>
            </div>

            {forgotStep === 1 && (
              <div className="space-y-3 text-xs">
                <p className="text-gray-600">
                  Step 1: Enter your registered mobile number. We will send a 4-digit verification code.
                </p>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">10-Digit Mobile Number</label>
                  <input
                    type="tel"
                    placeholder="98480 11001"
                    value={forgotPhone}
                    onChange={(e) => setForgotPhone(e.target.value)}
                    className="w-full p-3 border rounded-xl text-base"
                  />
                </div>
                <button
                  onClick={() => setForgotStep(2)}
                  disabled={!forgotPhone}
                  className="w-full py-3 bg-[#1E4A3B] text-white font-bold rounded-xl text-sm min-h-[48px]"
                >
                  Send OTP Code →
                </button>
              </div>
            )}

            {forgotStep === 2 && (
              <div className="space-y-3 text-xs">
                <p className="text-gray-600">
                  Step 2: Enter the 4-digit code sent via SMS to {forgotPhone || '+91 98480 11001'}.
                </p>
                <div className="flex justify-center gap-2">
                  {['4', '8', '2', '1'].map((digit, i) => (
                    <input
                      key={i}
                      type="text"
                      defaultValue={digit}
                      maxLength={1}
                      className="w-12 h-12 text-center text-xl font-bold border rounded-xl bg-gray-50"
                    />
                  ))}
                </div>
                <button
                  onClick={() => setForgotStep(3)}
                  className="w-full py-3 bg-[#1E4A3B] text-white font-bold rounded-xl text-sm min-h-[48px]"
                >
                  Verify Code & Continue →
                </button>
              </div>
            )}

            {forgotStep === 3 && (
              <div className="space-y-3 text-xs">
                <p className="text-gray-600">Step 3: Choose a new password for your farmland CRM account.</p>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">New Password</label>
                  <input
                    type="password"
                    defaultValue="farmland2026"
                    className="w-full p-3 border rounded-xl text-base"
                  />
                </div>
                <button
                  onClick={() => {
                    setShowForgotModal(false);
                    setForgotStep(1);
                    addToast('Password Changed', 'You can now sign in with your new password.');
                  }}
                  className="w-full py-3 bg-emerald-700 text-white font-bold rounded-xl text-sm min-h-[48px]"
                >
                  Save New Password & Sign In
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
