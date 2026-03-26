"use client";

import React from "react";
import { Star } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex font-sans">
      {/* Left panel (desktop only) */}
      <div className="hidden lg:flex flex-col justify-center bg-afs-black w-[45%] p-[60px] relative">
        <div className="max-w-[420px] mx-auto w-full">
          {/* Logo */}
          <div className="mb-4">
            <span className="font-display font-bold text-[32px] text-white tracking-wide">Afro</span>
            <span className="font-display font-normal text-[32px] text-white tracking-wide">style</span>
          </div>

          {/* Tagline */}
          <h2 className="font-display italic text-[22px] text-afs-gray-400">
            Your style, crafted by the best tailors.
          </h2>

          {/* Testimonial Card */}
          <div className="bg-white rounded-xl p-6 shadow-2xl max-w-[320px] mt-12">
            <div className="flex gap-1 mb-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-4 h-4 text-[#D48B28]" fill="currentColor" />
              ))}
            </div>
            <p className="text-[14px] text-afs-gray-700 leading-[1.7] mb-6">
              "I found my tailor in minutes. My Ankara blazer was ready before the wedding. Absolute magic."
            </p>
            <div className="flex items-center gap-3">
              <Avatar fallback="CO" size="sm" />
              <div className="flex flex-col">
                <span className="text-[13px] font-medium text-afs-black">Chidinma O.</span>
                <span className="text-[12px] text-afs-gray-500">Lagos, Nigeria</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Text */}
        <div className="absolute bottom-8 left-[60px] text-[12px] text-afs-gray-600">
          © 2026 Afrostyle
        </div>
      </div>

      {/* Right panel (form content) */}
      <div className="flex-1 bg-afs-gray-50 lg:bg-white flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-[420px]">
          {children}
        </div>
      </div>
    </div>
  );
}
