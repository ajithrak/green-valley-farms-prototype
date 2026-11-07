import type { CustomerPage } from '@/types';
import { Icon } from '@/components/ui/Icon';
import { useApp } from '@/context/AppContext';

export function CustomerNav() {
  const { customerPage, setCustomerPage, lang } = useApp();
  return (
    <>
      <div className="bg-[#F0F6F3] border-b border-[#DCE4DE] py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between overflow-x-auto">
          <div className="flex space-x-1">
            {[
              { id: 'home', label: lang === 'en' ? 'Home' : 'హోమ్', icon: 'sprout' },
              { id: 'plots', label: lang === 'en' ? 'Plot Map' : 'ప్లాట్ల మ్యాప్', icon: 'map' },
              { id: 'enquiry', label: lang === 'en' ? 'Book Visit' : 'విజిట్ బుక్ చేయండి', icon: 'calendar' },
              { id: 'portal', label: lang === 'en' ? 'Customer Portal' : 'నా ల్యాండ్ పోర్టల్', icon: 'userCheck' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setCustomerPage(item.id as CustomerPage)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap min-h-[44px] ${
                  customerPage === item.id ? 'bg-[#1E4A3B] text-white shadow-sm' : 'text-gray-700 hover:bg-gray-200/60'
                }`}
              >
                <Icon name={item.icon} className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            ))}
          </div>
          <span className="text-xs text-emerald-900 font-bold hidden sm:inline">
            Sweet Water at 120ft • Clear Titles
          </span>
        </div>
      </div>
    </>
  );
}
