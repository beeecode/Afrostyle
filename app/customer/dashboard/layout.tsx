"use client";

import React from "react";
import Link from "next/link";
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Wallet, 
  Heart, 
  Star, 
  Settings, 
  Search, 
  LogOut, 
  Bell, 
  Menu, 
  X 
} from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { CustomerDashboardProvider, useCustomerDashboard } from "./CustomerDashboardContext";

const NAV_LINKS = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'orders', label: 'My Orders', icon: ShoppingBag },
  { id: 'payments', label: 'Payments', icon: Wallet },
  { id: 'saved', label: 'Saved Tailors', icon: Heart },
  { id: 'reviews', label: 'My Reviews', icon: Star },
  { id: 'settings', label: 'Settings', icon: Settings },
];

function CustomerSidebar() {
  const { activePage, setActivePage, isSidebarOpen, setIsSidebarOpen } = useCustomerDashboard();

  return (
    <>
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-[220px] bg-white border-r border-afs-gray-100 p-6 flex flex-col transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        
        {/* Logo & User Info */}
        <div className="mb-8 px-4">
          <Link href="/" className="flex items-baseline text-afs-black mb-4 shrink-0">
            <span className="font-display font-bold text-2xl tracking-wide">Afro</span>
            <span className="font-display font-normal text-2xl tracking-wide">style</span>
          </Link>
          <div className="flex flex-col">
            <span className="text-[13px] font-medium text-afs-gray-700">Chidinma Obi</span>
            <span className="text-[11px] text-afs-gray-500 uppercase tracking-wider">Customer</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 flex flex-col gap-1">
          {NAV_LINKS.map((link) => {
            const isActive = activePage === link.id;
            return (
              <button
                key={link.id}
                onClick={() => {
                  setActivePage(link.id);
                  setIsSidebarOpen(false);
                }}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-md transition-all duration-150 ${
                  isActive 
                    ? 'bg-afs-gray-100 text-afs-black font-medium' 
                    : 'text-afs-gray-600 hover:bg-afs-gray-50'
                }`}
              >
                <link.icon className={`w-[18px] h-[18px] ${isActive ? 'text-afs-black' : 'text-afs-gray-600'}`} />
                <span className="text-[14px]">{link.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="mt-auto pt-4 border-t border-afs-gray-100 flex flex-col gap-1">
          <Link 
            href="/discover"
            className="flex items-center gap-3 px-3 py-2.5 text-afs-gray-500 hover:text-afs-black transition-colors rounded-md"
          >
            <Search className="w-[18px] h-[18px]" />
            <span className="text-[14px]">Browse tailors</span>
          </Link>
          <button className="flex items-center gap-3 px-3 py-2.5 text-afs-gray-500 hover:text-afs-black transition-colors rounded-md text-left">
            <LogOut className="w-[18px] h-[18px]" />
            <span className="text-[14px]">Log out</span>
          </button>
        </div>
      </aside>
    </>
  );
}

function CustomerTopbar() {
  const { activePage, setIsSidebarOpen } = useCustomerDashboard();
  const pageTitle = NAV_LINKS.find(link => link.id === activePage)?.label || "Overview";

  return (
    <header className="h-[60px] bg-white border-b border-afs-gray-100 px-6 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <button 
          className="lg:hidden p-2 -ml-2 text-afs-gray-600 hover:text-afs-black transition-colors"
          onClick={() => setIsSidebarOpen(true)}
        >
          <Menu className="w-5 h-5" />
        </button>
        <h1 className="text-[16px] font-medium text-afs-black">{pageTitle}</h1>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 text-afs-gray-500 hover:text-afs-black transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white leading-none">
            2
          </span>
        </button>
        <div className="flex items-center gap-2 pl-4 border-l border-afs-gray-100">
          <Avatar fallback="CO" size="sm" />
          <span className="text-[14px] text-afs-gray-700 font-medium hidden md:block">Chidinma</span>
        </div>
      </div>
    </header>
  );
}

function DashboardLayoutContent({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-afs-gray-50">
      <CustomerSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <CustomerTopbar />
        <main className="flex-1 p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function CustomerDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <CustomerDashboardProvider>
      <DashboardLayoutContent>
        {children}
      </DashboardLayoutContent>
    </CustomerDashboardProvider>
  );
}
