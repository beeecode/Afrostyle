"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Bell } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';

export interface NavbarProps {
  variant?: 'transparent' | 'white';
  userType?: 'guest' | 'customer' | 'tailor';
}

export const Navbar: React.FC<NavbarProps> = ({ variant = 'white', userType = 'guest' }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop || 0;
      setIsScrolled(scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Trigger on mount
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isWhite = variant === 'white' || isScrolled || isMobileMenuOpen;

  const headerClasses = `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
    isWhite ? 'bg-white shadow-md border-b border-afs-gray-200' : 'bg-transparent'
  }`;

  return (
    <header className={headerClasses}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo (Always Black per instructions) */}
          <Link href="/" className="flex items-baseline shrink-0 text-afs-black">
            <span className="font-display font-bold text-2xl tracking-wide">Afro</span>
            <span className="font-display font-normal text-2xl tracking-wide">style</span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex space-x-8">
            <Link 
              href="/search" 
              className="text-sm font-medium text-afs-gray-700 hover:text-afs-black transition-colors"
            >
              Find a Tailor
            </Link>
            <Link 
              href="/how-it-works" 
              className="text-sm font-medium text-afs-gray-700 hover:text-afs-black transition-colors"
            >
              How it Works
            </Link>
            <Link 
              href="/for-tailors" 
              className="text-sm font-medium text-afs-gray-700 hover:text-afs-black transition-colors"
            >
              For Tailors
            </Link>
          </nav>

          {/* Desktop Right Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {userType === 'guest' && (
              <>
                <Button variant="ghost">
                  Log in
                </Button>
                <Button variant="primary">Get Started</Button>
              </>
            )}
            {userType === 'customer' && (
              <>
                <button 
                  className="p-2 rounded-full text-afs-gray-700 hover:bg-afs-gray-100 transition-colors"
                  aria-label="Notifications"
                >
                  <Bell className="w-5 h-5" />
                </button>
                <Avatar fallback="CU" size="sm" />
              </>
            )}
            {userType === 'tailor' && (
              <>
                <Link 
                  href="/dashboard" 
                  className="text-sm font-medium text-afs-gray-700 hover:text-afs-black mr-2 transition-colors"
                >
                  Dashboard
                </Link>
                <Avatar fallback="TA" size="sm" />
              </>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 -mr-2 rounded-md text-afs-black hover:bg-afs-gray-50 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Slide-down Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-afs-gray-100 shadow-lg absolute top-16 left-0 w-full animate-in slide-in-from-top-2">
          <div className="px-4 py-4 space-y-1">
            <Link href="/search" className="block px-3 py-3 rounded-md text-base font-medium text-afs-gray-700 hover:text-afs-black hover:bg-afs-gray-50">
              Find a Tailor
            </Link>
            <Link href="/how-it-works" className="block px-3 py-3 rounded-md text-base font-medium text-afs-gray-700 hover:text-afs-black hover:bg-afs-gray-50">
              How it Works
            </Link>
            <Link href="/for-tailors" className="block px-3 py-3 rounded-md text-base font-medium text-afs-gray-700 hover:text-afs-black hover:bg-afs-gray-50">
              For Tailors
            </Link>
            
            <div className="mt-6 pt-6 border-t border-afs-gray-100">
              {userType === 'guest' ? (
                <div className="flex flex-col space-y-3 px-3">
                  <Button variant="secondary" className="w-full justify-center">Log in</Button>
                  <Button variant="primary" className="w-full justify-center">Get Started</Button>
                </div>
              ) : userType === 'customer' ? (
                <div className="flex items-center justify-between px-3 py-2">
                  <div className="flex items-center space-x-3">
                    <Avatar fallback="CU" size="md" />
                    <span className="font-medium text-afs-black">My Profile</span>
                  </div>
                  <button className="p-2 text-afs-gray-700 hover:bg-afs-gray-50 rounded-full">
                    <Bell className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <div className="flex flex-col space-y-4 px-3">
                  <div className="flex items-center space-x-3 py-2">
                    <Avatar fallback="TA" size="md" />
                    <span className="font-medium text-afs-black">Tailor Name</span>
                  </div>
                  <Link href="/dashboard" className="block w-full">
                    <Button variant="secondary" className="w-full justify-center">Dashboard</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
