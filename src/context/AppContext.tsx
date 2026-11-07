import React, { createContext, useContext } from 'react';
import { useAppStore, type AppStore } from '@/hooks/useAppStore';

const AppContext = createContext<AppStore | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const store = useAppStore();
  return <AppContext.Provider value={store}>{children}</AppContext.Provider>;
}

export function useApp(): AppStore {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside <AppProvider>');
  return ctx;
}
