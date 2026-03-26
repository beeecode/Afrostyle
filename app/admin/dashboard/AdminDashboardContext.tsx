"use client";

import React, { createContext, useContext, useState } from "react";

export interface AdminDashboardContextType {
  activePage: string;
  setActivePage: (page: string) => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
}

export const AdminDashboardContext = createContext<AdminDashboardContextType>({
  activePage: 'overview',
  setActivePage: () => {},
  isSidebarOpen: false,
  setIsSidebarOpen: () => {},
});

export const useAdminDashboard = () => useContext(AdminDashboardContext);

export function AdminDashboardProvider({ children }: { children: React.ReactNode }) {
  const [activePage, setActivePage] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <AdminDashboardContext.Provider 
      value={{ 
        activePage, 
        setActivePage, 
        isSidebarOpen, 
        setIsSidebarOpen 
      }}
    >
      {children}
    </AdminDashboardContext.Provider>
  );
}
