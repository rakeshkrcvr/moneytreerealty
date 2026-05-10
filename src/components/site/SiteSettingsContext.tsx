import React, { createContext, useContext } from 'react';

const SiteSettingsContext = createContext<any>(null);

export function SiteSettingsProvider({ settings, children }: { settings: any, children: React.ReactNode }) {
  return (
    <SiteSettingsContext.Provider value={settings}>
      {children}
    </SiteSettingsContext.Provider>
  );
}

export function useSiteSettings() {
  const context = useContext(SiteSettingsContext);
  return context || {};
}
