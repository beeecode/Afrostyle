import React from 'react';
import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="bg-afs-black text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Col 1: Logo & Description */}
          <div className="md:col-span-2">
            <Link href="/" className="inline-flex items-baseline mb-4 text-white">
              <span className="font-display font-bold text-2xl tracking-wide">Afro</span>
              <span className="font-display font-normal text-2xl tracking-wide">style</span>
            </Link>
            <p className="text-afs-gray-300 text-sm max-w-sm">
              Nigeria's fashion & tailoring platform
            </p>
          </div>

          {/* Col 2: Primary Links */}
          <div className="flex flex-col space-y-3">
            <Link href="/search" className="text-sm text-afs-gray-300 hover:text-white transition-colors w-fit">
              Find a Tailor
            </Link>
            <Link href="/for-tailors" className="text-sm text-afs-gray-300 hover:text-white transition-colors w-fit">
              For Tailors
            </Link>
            <Link href="/how-it-works" className="text-sm text-afs-gray-300 hover:text-white transition-colors w-fit">
              How it Works
            </Link>
            <Link href="/pricing" className="text-sm text-afs-gray-300 hover:text-white transition-colors w-fit">
              Pricing
            </Link>
          </div>

          {/* Col 3: Secondary Links */}
          <div className="flex flex-col space-y-3">
            <Link href="/about" className="text-sm text-afs-gray-300 hover:text-white transition-colors w-fit">
              About
            </Link>
            <Link href="/contact" className="text-sm text-afs-gray-300 hover:text-white transition-colors w-fit">
              Contact
            </Link>
            <Link href="/privacy" className="text-sm text-afs-gray-300 hover:text-white transition-colors w-fit">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm text-afs-gray-300 hover:text-white transition-colors w-fit">
              Terms
            </Link>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-afs-gray-700 text-center">
          <p className="text-sm text-afs-gray-500">
            © {new Date().getFullYear()} Afrostyle. Made in Nigeria.
          </p>
        </div>
      </div>
    </footer>
  );
};
