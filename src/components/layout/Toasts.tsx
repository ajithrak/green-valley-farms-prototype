import { Icon } from '@/components/ui/Icon';
import { useApp } from '@/context/AppContext';

export function Toasts() {
  const { toasts, setToasts } = useApp();
  return (
    <>
      <div className="fixed top-4 inset-x-4 sm:inset-x-auto sm:right-4 z-50 flex flex-col gap-2 sm:max-w-sm sm:w-full pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="pointer-events-auto p-4 rounded-xl border border-[#DCE4DE] shadow-lg flex items-start gap-3 bg-white text-[#262A28]"
          >
            <Icon name="checkCircle2" className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div className="flex-1 text-xs">
              <strong className="block text-sm font-bold text-[#1E4A3B]">{toast.title}</strong>
              <p className="text-gray-600 leading-snug">{toast.desc}</p>
            </div>
            <button
              onClick={() => setToasts((prev) => prev.filter((x) => x.id !== toast.id))}
              className="text-gray-400 hover:text-gray-600 p-1"
            >
              <Icon name="x" className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
