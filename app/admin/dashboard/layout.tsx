"use client";

import React from "react";
import Link from "next/link";
import { 
  LayoutDashboard, 
  Users, 
  ClipboardList, 
  AlertTriangle, 
  Wallet, 
  ShieldCheck, 
  Star, 
  Settings,
  ExternalLink,
  LogOut,
  Bell,
  Menu,
  X
} from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { AdminDashboardProvider, useAdminDashboard } from "./AdminDashboardContext";

const NAV_LINKS = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'users', label: 'Users', icon: Users },
  { id: 'orders', label: 'All Orders', icon: ClipboardList },
  { id: 'disputes', label: 'Disputes', icon: AlertTriangle, badge: 3 },
  { id: 'financials', label: 'Financials', icon: Wallet },
  { id: 'verifications', label: 'Verifications', icon: ShieldCheck },
  { id: 'featured', label: 'Featured Listings', icon: Star },
  { id: 'settings', label: 'Settings', icon: Settings },
];

function AdminSidebar() {
  const { activePage, setActivePage, isSidebarOpen, setIsSidebarOpen } = useAdminDashboard();

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
      <aside className={`fixed inset-y-0 left-0 z-50 w-[240px] bg-afs-black p-6 flex flex-col transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        
        {/* Logo & Admin Badge */}
        <div className="mb-10 px-4">
          <Link href="/" className="flex items-baseline text-white mb-2 shrink-0">
            <span className="font-display font-bold text-2xl tracking-wide">Afro</span>
            <span className="font-display font-normal text-2xl tracking-wide">style</span>
          </Link>
          <div className="inline-flex items-center px-2 py-0.5 bg-[#B91C1C] text-white text-[11px] font-medium rounded-sm">
            Admin Panel
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
                className={`flex items-center justify-between px-3 py-2.5 rounded-md transition-all duration-150 group relative ${
                  isActive 
                    ? 'bg-white/10 text-white font-medium' 
                    : 'text-white/70 hover:bg-white/[0.07] hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <link.icon className={`w-[18px] h-[18px] ${isActive ? 'text-white' : 'text-white/70 group-hover:text-white'}`} />
                  <span className="text-[14px]">{link.label}</span>
                </div>
                
                {link.id === 'disputes' && link.badge && (
                  <span className="w-[18px] h-[18px] bg-[#B91C1C] text-white text-[11px] font-bold rounded-full flex items-center justify-center">
                    {link.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="mt-auto pt-4 border-t border-afs-gray-700 flex flex-col gap-1">
          <Link 
            href="/"
            className="flex items-center gap-3 px-3 py-2.5 text-white/70 hover:text-white transition-colors rounded-md"
          >
            <ExternalLink className="w-[18px] h-[18px]" />
            <span className="text-[14px]">View platform</span>
          </Link>
          <button className="flex items-center gap-3 px-3 py-2.5 text-white/70 hover:text-white transition-colors rounded-md text-left">
            <LogOut className="w-[18px] h-[18px]" />
            <span className="text-[14px]">Log out</span>
          </button>
        </div>
      </aside>
    </>
  );
}

function AdminTopbar() {
  const { activePage, setIsSidebarOpen } = useAdminDashboard();
  const pageTitle = NAV_LINKS.find(link => link.id === activePage)?.label || "Overview";

  return (
    <header className="h-[64px] bg-white border-b border-afs-gray-100 px-8 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <button 
          className="lg:hidden p-2 -ml-2 text-afs-gray-600 hover:text-afs-black transition-colors"
          onClick={() => setIsSidebarOpen(true)}
        >
          <Menu className="w-5 h-5" />
        </button>
        <h1 className="font-display text-[20px] text-afs-black">{pageTitle}</h1>
      </div>

      <div className="flex items-center gap-6">
        {/* Status Pill */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-afs-gray-50 rounded-full border border-afs-gray-100">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-[13px] text-afs-gray-600 font-medium">All systems operational</span>
        </div>

        <button className="relative p-2 text-afs-gray-500 hover:text-afs-black transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-[#B91C1C] text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white leading-none">
            5
          </span>
        </button>
        
        <div className="flex items-center gap-3 pl-6 border-l border-afs-gray-100">
          <div className="text-right hidden sm:block">
            <p className="text-[13px] font-medium text-afs-black leading-none mb-1">Super Admin</p>
            <p className="text-[11px] text-afs-gray-500 leading-none">Management Access</p>
          </div>
          <Avatar fallback="SA" size="sm" />
        </div>
      </div>
    </header>
  );
}

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-afs-gray-50 font-sans">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminTopbar />
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminDashboardProvider>
      <AdminLayoutContent>
        {children}
      </AdminLayoutContent>
    </AdminDashboardProvider>
  );
}
