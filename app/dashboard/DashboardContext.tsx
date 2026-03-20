"use client";

import React, { createContext, useContext, useState } from "react";

export const DashboardContext = createContext({
  activePage: 'overview',
  setActivePage: (p: string) => {}
});

export const useDashboard = () => useContext(DashboardContext);

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [activePage, setActivePage] = useState('overview');

  return (
    <DashboardContext.Provider value={{ activePage, setActivePage }}>
      {children}
    </DashboardContext.Provider>
  );
}
