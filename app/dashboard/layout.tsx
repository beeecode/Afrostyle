"use client";

import React, { useState, createContext } from "react";
import Link from "next/link";
import { 
  LayoutDashboard, 
  ClipboardList, 
  Wallet, 
  Ruler, 
  ImagePlus, 
  Star, 
  Settings, 
  ExternalLink, 
  LogOut,
  Bell,
  Menu,
  X
} from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";

const NAV_LINKS = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'orders', label: 'Orders', icon: ClipboardList },
  { id: 'earnings', label: 'Earnings', icon: Wallet },
  { id: 'measurements', label: 'Measurements', icon: Ruler },
  { id: 'portfolio', label: 'Portfolio', icon: ImagePlus },
  { id: 'reviews', label: 'Reviews', icon: Star },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export const DashboardContext = createContext({
  activePage: 'overview',
  setActivePage: (p: string) => {}
});

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [activePage, setActivePage] = useState('overview');
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const pageTitle = NAV_LINKS.find(link => link.id === activePage)?.label || "Overview";

  return (
    <DashboardContext.Provider value={{ activePage, setActivePage }}>
      <div className="flex min-h-screen bg-afs-gray-50 relative overflow-x-hidden">
        
        {/* Mobile Sidebar Overlay */}
        {isMobileOpen && (
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-all duration-300 opacity-100"
            onClick={() => setIsMobileOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside className={`w-[240px] h-screen fixed lg:sticky top-0 left-0 bg-afs-black px-4 py-6 flex flex-col shrink-0 z-50 transform transition-transform duration-300 ease-in-out ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
          
          {/* Top — Logo and Close button */}
          <div className="mb-8 px-3 flex items-start justify-between">
            <div>
              <Link href="/" className="text-[20px] text-white flex items-center mb-1 hover:opacity-90 transition-opacity">
                <span className="font-display font-bold">Afro</span>
                <span className="font-display">style</span>
              </Link>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[13px] text-afs-gray-500">Amaka Obi Designs</span>
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full shrink-0" />
              </div>
            </div>
            {/* Mobile close toggle */}
            <button 
              className="lg:hidden p-1.5 -mr-1.5 text-white/50 hover:text-white rounded-md transition-colors hover:bg-white/10" 
              onClick={() => setIsMobileOpen(false)}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation links */}
          <nav className="flex flex-col gap-1 flex-1 overflow-y-auto">
            {NAV_LINKS.map((link) => {
              const isActive = activePage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => {
                    setActivePage(link.id);
                    setIsMobileOpen(false); // Auto close sidebar on mobile click
                  }}
                  className={`w-full text-left rounded-md px-3 py-2.5 flex items-center gap-2.5 transition-all duration-150 ${
                    isActive 
                      ? 'bg-[rgba(255,255,255,0.12)] text-white' 
                      : 'bg-transparent text-afs-gray-500 hover:bg-[rgba(255,255,255,0.07)]'
                  }`}
                >
                  <link.icon className="w-[18px] h-[18px] shrink-0" />
                  <span className="text-[14px] font-medium">{link.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Bottom of sidebar */}
          <div className="pt-4 mt-4 border-t border-afs-gray-700 flex flex-col gap-1 shrink-0 px-3">
            <Link 
              href="/tailor/1"
              className="flex items-center gap-2.5 text-[13px] text-afs-gray-500 hover:text-white transition-colors py-2"
            >
              <ExternalLink className="w-4 h-4 shrink-0" />
              View my profile
            </Link>
            <button className="flex items-center gap-2.5 text-[13px] text-afs-gray-500 hover:text-white transition-colors py-2 text-left w-full">
              <LogOut className="w-4 h-4 shrink-0" />
              Log out
            </button>
          </div>

        </aside>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          
          {/* DashboardTopbar */}
          <header className="h-[64px] bg-white border-b border-afs-gray-100 px-4 sm:px-8 flex items-center justify-between shrink-0 sticky top-0 z-30 w-full">
            
            {/* Left: Mobile Menu Trigger & Page title */}
            <div className="flex items-center gap-4">
              <button 
                className="lg:hidden p-2 -ml-2 text-afs-gray-600 hover:text-afs-black hover:bg-afs-gray-50 rounded-md transition-colors flex shrink-0"
                onClick={() => setIsMobileOpen(true)}
              >
                <Menu className="w-5 h-5" />
              </button>
              <h2 className="font-display text-[20px] text-afs-black capitalize">{pageTitle}</h2>
            </div>

            {/* Right: Actions */}
            <div className="flex flex-row items-center gap-4">
              <button className="relative p-2 text-afs-gray-500 hover:text-afs-black transition-colors rounded-full hover:bg-afs-gray-50 shrink-0">
                <Bell className="w-[18px] h-[18px]" />
                <span className="absolute top-1.5 right-1.5 w-3.5 h-3.5 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center border border-white leading-none">
                  3
                </span>
              </button>
              
              <div className="flex items-center gap-2 pl-4 border-l border-afs-gray-100">
                <Avatar fallback="AO" size="sm" />
                <span className="text-[14px] text-afs-gray-700 hidden sm:block font-medium">Amaka Obi</span>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 p-4 sm:p-8 overflow-x-hidden">
            {children}
          </main>

        </div>

      </div>
    </DashboardContext.Provider>
  );
}
