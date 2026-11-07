import { Icon } from '@/components/ui/Icon';
import { useApp } from '@/context/AppContext';

export function LoginView() {
  const {
    loginIdentifier,
    setLoginIdentifier,
    loginPassword,
    setLoginPassword,
    loginError,
    isInactiveAccount,
    setIsInactiveAccount,
    setShowForgotModal,
    setForgotStep,
    handleLogin,
  } = useApp();
  return (
    <>
      <div className="max-w-md mx-auto my-12 p-8 bg-white dark:bg-[#242C27] rounded-2xl border shadow-lg space-y-6 w-full">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-[#1E4A3B] text-white rounded-xl mx-auto flex items-center justify-center">
            <Icon name="lock" className="w-6 h-6 text-emerald-300" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-[#0F261E] dark:text-white">Farmland CRM Staff Access</h2>
          <p className="text-xs text-gray-500">Sign in to manage plots, site tours, and field sales pipelines.</p>
        </div>

        {loginError && (
          <div className="p-3 bg-rose-50 border border-rose-300 rounded-xl text-xs text-rose-900 font-bold flex items-start gap-2">
            <Icon name="shieldAlert" className="w-4 h-4 text-rose-700 shrink-0 mt-0.5" />
            <span>{loginError}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">
              Work Email or 10-Digit Mobile
            </label>
            <input
              type="text"
              value={loginIdentifier}
              onChange={(e) => setLoginIdentifier(e.target.value)}
              required
              className="w-full p-3 rounded-xl border text-sm"
            />
          </div>

          <div>
            <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">Password</label>
            <input
              type="password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              required
              className="w-full p-3 rounded-xl border text-sm"
            />
          </div>

          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={isInactiveAccount}
                onChange={(e) => setIsInactiveAccount(e.target.checked)}
                className="rounded"
              />
              <span className="text-gray-500">Test Inactive State</span>
            </label>
            <button
              type="button"
              onClick={() => {
                setShowForgotModal(true);
                setForgotStep(1);
              }}
              className="font-bold text-[#1E4A3B] dark:text-emerald-400 hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-[#1E4A3B] text-white font-bold rounded-xl text-base hover:bg-[#173B2F] min-h-[48px]"
          >
            Sign In to CRM Portal
          </button>
        </form>
      </div>
    </>
  );
}
