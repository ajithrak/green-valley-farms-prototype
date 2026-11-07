import { useApp } from '@/context/AppContext';
import { Footer } from './Footer';
import { Header } from './Header';
import { Toasts } from './Toasts';
import { ForgotPasswordModal } from '@/features/auth/ForgotPasswordModal';
import { CustomerNav } from '@/features/customer/CustomerNav';
import { EnquiryPage } from '@/features/customer/EnquiryPage';
import { HomePage } from '@/features/customer/HomePage';
import { PlotMapPage } from '@/features/customer/PlotMapPage';
import { PortalPage } from '@/features/customer/PortalPage';
import { ReservePage } from '@/features/customer/ReservePage';
import { CrmWorkspace } from '@/features/crm/CrmWorkspace';
import { LoginView } from '@/features/crm/LoginView';
import { UnmaskPayoutModal } from '@/features/crm/UnmaskPayoutModal';

export function AppShell() {
  const { isDarkMode, topSection, customerPage, isAuthenticated } = useApp();

  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? 'dark bg-[#1A211D] text-[#E6EBE7]' : 'bg-[#FDFBF7] text-[#262A28]'
      } flex flex-col font-sans antialiased transition-colors`}
    >
      <Toasts />
      <ForgotPasswordModal />
      <UnmaskPayoutModal />
      <Header />

      {topSection === 'customer' ? (
        <main className="flex-1">
          <CustomerNav />
          {customerPage === 'home' && <HomePage />}
          {customerPage === 'plots' && <PlotMapPage />}
          {customerPage === 'enquiry' && <EnquiryPage />}
          {customerPage === 'reserve' && <ReservePage />}
          {customerPage === 'portal' && <PortalPage />}
        </main>
      ) : (
        <div className="flex-1 flex flex-col">{isAuthenticated ? <CrmWorkspace /> : <LoginView />}</div>
      )}

      <Footer />
    </div>
  );
}
