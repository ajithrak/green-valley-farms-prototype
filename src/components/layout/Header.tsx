import { Icon } from '@/components/ui/Icon';
import { useApp } from '@/context/AppContext';

const iconBtn =
  'inline-flex items-center justify-center rounded-lg border border-[#DCE4DE] dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 min-h-[44px] min-w-[44px] hover:bg-gray-50 dark:hover:bg-gray-700';

export function Header() {
  const { topSection, setTopSection, lang, setLang, isDarkMode, setIsDarkMode } = useApp();
  const inCustomer = topSection === 'customer';

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#1A211D]/95 backdrop-blur border-b border-[#DCE4DE] dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-2 min-h-[64px] sm:min-h-[80px]">
        <button
          onClick={() => setTopSection('customer')}
          aria-label="Green Valley Farms – go to public website"
          className="flex items-center gap-2 sm:gap-3 text-left min-w-0"
        >
          <span className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#1E4A3B] flex items-center justify-center text-white shadow-md">
            <Icon name="sprout" className="w-6 h-6 sm:w-7 sm:h-7 text-emerald-300" />
          </span>
          <span className="min-w-0">
            <span className="font-serif text-base min-[400px]:text-lg sm:text-2xl font-bold tracking-tight text-[#0F261E] dark:text-white block leading-tight truncate">
              Green Valley Farms
            </span>
            <span className="hidden md:flex text-xs text-gray-500 font-medium items-center gap-1">
              <Icon name="shieldCheck" className="w-3.5 h-3.5 text-[#1E4A3B] inline" />
              100% Legal Clear Title • Farmland Platform
            </span>
          </span>
        </button>

        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          <button
            onClick={() => setLang((prev) => (prev === 'en' ? 'te' : 'en'))}
            aria-label={lang === 'en' ? 'Switch to Telugu' : 'Switch to English'}
            className={`${iconBtn} px-2.5 sm:px-3 text-xs font-bold`}
          >
            {lang === 'en' ? 'తెలుగు' : 'English'}
          </button>

          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            aria-label="Toggle dark mode"
            title="Toggle dark mode"
            className={iconBtn}
          >
            <Icon name={isDarkMode ? 'sun' : 'moon'} className="w-4 h-4" />
          </button>

          <button
            onClick={() => setTopSection(inCustomer ? 'crm' : 'customer')}
            aria-label={inCustomer ? 'Open internal staff CRM' : 'Back to public website'}
            className={`inline-flex items-center justify-center gap-2 px-3 sm:px-4 rounded-xl text-xs font-bold min-h-[44px] min-w-[44px] shadow-sm ${
              inCustomer
                ? 'bg-[#1E4A3B] text-white hover:bg-[#173B2F]'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border hover:bg-gray-200'
            }`}
          >
            <Icon name={inCustomer ? 'userCheck' : 'map'} className="w-4 h-4 text-emerald-300 sm:text-current" />
            <span className="hidden sm:inline">{inCustomer ? 'Internal Staff CRM →' : '← Public Website'}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
