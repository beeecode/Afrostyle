"use client";

import React, { createContext, useContext, useState } from "react";

export interface CustomerDashboardContextType {
  activePage: string;
  setActivePage: (page: string) => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
}

export const CustomerDashboardContext = createContext<CustomerDashboardContextType>({
  activePage: 'overview',
  setActivePage: () => {},
  isSidebarOpen: false,
  setIsSidebarOpen: () => {},
});

export const useCustomerDashboard = () => useContext(CustomerDashboardContext);

export function CustomerDashboardProvider({ children }: { children: React.ReactNode }) {
  const [activePage, setActivePage] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <CustomerDashboardContext.Provider 
      value={{ 
        activePage, 
        setActivePage, 
        isSidebarOpen, 
        setIsSidebarOpen 
      }}
    >
      {children}
    </CustomerDashboardContext.Provider>
  );
}
