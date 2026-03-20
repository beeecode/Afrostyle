"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { OrderStageTracker } from "@/components/features/OrderStageTracker";
import { TailorCard } from "@/components/features/TailorCard";
import { Search, CalendarCheck, PackageCheck, Palette, Crown, Heart, Briefcase, Users, Shirt, Scissors, Baby } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-afs-gray-50">
      <Navbar variant="transparent" />

      <main className="flex-grow">
        {/* --- HERO SECTION --- */}
        <section
          className="relative min-h-screen flex items-center pt-28 pb-16 overflow-hidden bg-afs-white"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #F0F0F0 1px, transparent 0)`,
            backgroundSize: "24px 24px",
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center">
              {/* Left Column: Text */}
              <div className="flex flex-col items-start max-w-2xl">
                <Badge
                  variant="default"
                  className="mb-6 px-3 py-1.5 text-sm border border-afs-gray-300 font-medium"
                >
                  Nigeria's #1 Tailoring Platform
                </Badge>

                <h1 className="font-display font-medium text-[36px] md:text-[56px] leading-[1.05] text-afs-black mb-6 tracking-tight">
                  Your style,
                  <br />
                  crafted by the
                  <br />
                  <i className="italic">best</i> tailors.
                </h1>

                <p className="text-base text-afs-gray-500 max-w-[420px] mb-8 leading-relaxed">
                  Discover skilled tailors near you. Book, pay, and track your
                  order — all in one place.
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-10">
                  <Link href="/discover" className="w-full sm:w-auto">
                    <Button
                      variant="primary"
                      size="lg"
                      className="w-full sm:w-auto text-base h-12 px-8"
                    >
                      Find a Tailor
                    </Button>
                  </Link>
                  <Link href="/onboard" className="w-full sm:w-auto">
                    <Button
                      variant="ghost"
                      size="lg"
                      className="w-full sm:w-auto text-base h-12 px-8"
                    >
                      Are you a tailor? Join free
                    </Button>
                  </Link>
                </div>

                {/* Social Proof Strip */}
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-3">
                    <Avatar
                      fallback="TA"
                      size="sm"
                      className="border-2 border-white bg-afs-gray-300 text-white"
                    />
                    <Avatar
                      fallback="BC"
                      size="sm"
                      className="border-2 border-white bg-afs-gray-500 text-white"
                    />
                    <Avatar
                      fallback="KX"
                      size="sm"
                      className="border-2 border-white bg-afs-black text-white"
                    />
                  </div>
                  <span className="text-sm font-medium text-afs-gray-700">
                    2,400+ tailors across Nigeria
                  </span>
                </div>
              </div>

              {/* Right Column: Visual Mockup */}
              <div className="relative w-full max-w-md mx-auto lg:ml-auto mt-12 lg:mt-0">
                <div className="relative w-full h-[380px] lg:h-[420px] animate-float-slow">
                  {/* Background Card (Partially Visible) */}
                  <div
                    className="absolute top-16 left-6 right-[-2rem] bg-white rounded-xl shadow-float p-5 opacity-70 border border-afs-gray-100 transition-transform"
                    style={{ transform: "translateY(12px) rotate(-3deg)" }}
                  >
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex items-center gap-3">
                        <Avatar fallback="JD" size="md" />
                        <div>
                          <p className="font-semibold text-afs-black text-sm">
                            John Doe Stitches
                          </p>
                          <p className="text-xs text-afs-gray-500">
                            Agbada Set
                          </p>
                        </div>
                      </div>
                      <Badge variant="warning">Measuring</Badge>
                    </div>
                    <div className="py-2">
                      <OrderStageTracker currentStage="measuring" compact={true} />
                    </div>
                  </div>

                  {/* Foreground Card */}
                  <div className="absolute top-0 left-0 right-0 bg-white shadow-deep rounded-xl p-5 border border-afs-gray-100 z-10 transform origin-bottom-left">
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center gap-3">
                        <Avatar fallback="AD" size="md" />
                        <span className="font-semibold text-afs-black font-display text-xl tracking-wide">
                          Amaka Designs
                        </span>
                      </div>
                      <Badge variant="success">Ready for pickup</Badge>
                    </div>

                    <div className="mb-8">
                      <OrderStageTracker currentStage="ready" compact={true} />
                    </div>

                    <div className="pt-5 border-t border-afs-gray-100 flex items-center justify-between">
                      <span className="text-sm font-medium text-afs-gray-700">
                        Ankara Senator Suit
                      </span>
                      <span className="text-lg font-bold text-afs-black">
                        ₦45,000
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-afs-white to-transparent pointer-events-none" />
        </section>

        {/* --- HOW IT WORKS SECTION --- */}
        <section className="py-24 bg-afs-gray-50 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Header */}
            <div className="text-center mb-16">
              <span className="block text-[12px] font-semibold tracking-[0.15em] uppercase text-afs-gray-500 mb-3">
                Simple process
              </span>
              <h2 className="font-display text-[36px] text-afs-black">
                From search to stitch, in minutes
              </h2>
            </div>

            {/* Steps Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative items-stretch">
              {/* Step 1 */}
              <div className="relative group flex flex-col bg-white border border-afs-gray-300 border-t-[3px] border-t-afs-black rounded-lg p-7 hover:shadow-float hover:-translate-y-0.5 transition-all duration-300 w-full">
                <div className="absolute top-4 right-4 font-display text-[48px] text-afs-gray-100 select-none leading-none">
                  01
                </div>
                <Search className="w-6 h-6 text-black mb-6 relative z-10" />
                <h3 className="text-[18px] font-bold text-afs-black mb-3 relative z-10">Find your tailor</h3>
                <p className="text-[14px] text-afs-gray-500 leading-relaxed relative z-10">
                  Search by city, style, and budget. Browse real portfolios and verified reviews.
                </p>
                {/* Arrow Connector */}
                <div className="hidden md:flex absolute top-1/2 -right-8 transform -translate-y-1/2 text-afs-gray-300 z-20 w-8 justify-center translate-x-1">
                   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" className="text-afs-gray-300">
                     <path d="M4 12h14m-5-5 5 5-5 5" />
                   </svg>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative group flex flex-col bg-white border border-afs-gray-300 border-t-[3px] border-t-afs-black rounded-lg p-7 hover:shadow-float hover:-translate-y-0.5 transition-all duration-300 w-full">
                <div className="absolute top-4 right-4 font-display text-[48px] text-afs-gray-100 select-none leading-none">
                  02
                </div>
                <CalendarCheck className="w-6 h-6 text-black mb-6 relative z-10" />
                <h3 className="text-[18px] font-bold text-afs-black mb-3 relative z-10">Book & pay securely</h3>
                <p className="text-[14px] text-afs-gray-500 leading-relaxed relative z-10">
                  Send a booking request and pay your deposit online. No cash, no confusion.
                </p>
                {/* Arrow Connector */}
                <div className="hidden md:flex absolute top-1/2 -right-8 transform -translate-y-1/2 text-afs-gray-300 z-20 w-8 justify-center translate-x-1">
                   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" className="text-afs-gray-300">
                     <path d="M4 12h14m-5-5 5 5-5 5" />
                   </svg>
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative group flex flex-col bg-white border border-afs-gray-300 border-t-[3px] border-t-afs-black rounded-lg p-7 hover:shadow-float hover:-translate-y-0.5 transition-all duration-300 w-full">
                <div className="absolute top-4 right-4 font-display text-[48px] text-afs-gray-100 select-none leading-none">
                  03
                </div>
                <PackageCheck className="w-6 h-6 text-black mb-6 relative z-10" />
                <h3 className="text-[18px] font-bold text-afs-black mb-3 relative z-10">Track every stage</h3>
                <p className="text-[14px] text-afs-gray-500 leading-relaxed relative z-10">
                  Watch your order move from measuring to delivery. Get WhatsApp updates automatically.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* --- FEATURED TAILORS SECTION --- */}
        <section className="py-24 bg-afs-white relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="flex flex-row items-center justify-between mb-12">
              <h2 className="font-display text-[32px] text-afs-black">Top tailors in Lagos</h2>
              <Link href="/discover">
                <Button variant="ghost" className="text-afs-gray-700 hover:text-afs-black">
                  View all tailors →
                </Button>
              </Link>
            </div>

            {/* Tailor Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <TailorCard
                name="Amaka Obi Designs"
                location="Ikeja, Lagos"
                specialties={["Ankara", "Corporate", "Bridal"]}
                rating={4.8}
                reviewCount={124}
                startingPrice={15000}
                turnaroundDays={7}
                isVerified={true}
                onBook={() => console.log('book clicked')}
              />
              <TailorCard
                name="Kunle Threads"
                location="Surulere, Lagos"
                specialties={["Agbada", "Senator", "Traditional"]}
                rating={4.6}
                reviewCount={89}
                startingPrice={20000}
                turnaroundDays={10}
                isVerified={true}
                onBook={() => console.log('book clicked')}
              />
              <TailorCard
                name="Zara Couture NG"
                location="Lekki, Lagos"
                specialties={["Bridal", "Evening wear", "Alterations"]}
                rating={4.9}
                reviewCount={203}
                startingPrice={35000}
                turnaroundDays={14}
                isVerified={false}
                onBook={() => console.log('book clicked')}
              />
            </div>

            {/* Footer Text */}
            <p className="text-[14px] text-afs-gray-500 text-center mt-12">
              Showing top-rated tailors in Lagos · Filter by your city on the discover page
            </p>
          </div>
        </section>

        {/* --- BROWSE BY SPECIALTY SECTION --- */}
        <section className="py-24 bg-afs-gray-50 border-t border-afs-gray-100 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-[32px] text-afs-black text-center mb-12">
              Whatever the occasion, we've got a tailor
            </h2>

            <div className="flex gap-4 overflow-x-auto pb-6 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {[
                { name: "Ankara & Prints", slug: "ankara", icon: Palette },
                { name: "Agbada & Senator", slug: "agbada", icon: Crown },
                { name: "Bridal & Wedding", slug: "bridal", icon: Heart },
                { name: "Corporate & Office", slug: "corporate", icon: Briefcase },
                { name: "Aso-ebi Matching", slug: "aso-ebi", icon: Users },
                { name: "Casual & Everyday", slug: "casual", icon: Shirt },
                { name: "Alterations", slug: "alterations", icon: Scissors },
                { name: "Children's Clothing", slug: "children", icon: Baby },
              ].map((category) => (
                <Link
                  key={category.slug}
                  href={`/discover?specialty=${category.slug}`}
                  className="flex-shrink-0 snap-start group"
                >
                  <div className="w-[160px] h-[120px] bg-white border border-afs-gray-300 rounded-lg flex flex-col items-center justify-center transition-all duration-200 group-hover:bg-afs-black group-hover:border-afs-black cursor-pointer">
                    <category.icon className="w-8 h-8 mb-3 text-afs-black group-hover:text-white transition-colors duration-200" />
                    <span className="text-[14px] font-medium text-afs-black text-center px-2 group-hover:text-white transition-colors duration-200">
                      {category.name}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* --- STATS BAR SECTION --- */}
        <section className="bg-afs-black text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 md:gap-x-0 md:divide-x divide-afs-gray-700">
              {/* Stat 1 */}
              <div className="flex flex-col items-center justify-center text-center px-4">
                <div className="font-display text-[40px] text-white leading-none mb-3">2,400+</div>
                <div className="text-[13px] text-afs-gray-500 uppercase tracking-widest font-medium">Tailors registered</div>
              </div>
              {/* Stat 2 */}
              <div className="flex flex-col items-center justify-center text-center px-4">
                <div className="font-display text-[40px] text-white leading-none mb-3">18,000+</div>
                <div className="text-[13px] text-afs-gray-500 uppercase tracking-widest font-medium">Orders completed</div>
              </div>
              {/* Stat 3 */}
              <div className="flex flex-col items-center justify-center text-center px-4">
                <div className="font-display text-[40px] text-white leading-none mb-3">36</div>
                <div className="text-[13px] text-afs-gray-500 uppercase tracking-widest font-medium">Cities in Nigeria</div>
              </div>
              {/* Stat 4 */}
              <div className="flex flex-col items-center justify-center text-center px-4">
                <div className="font-display text-[40px] text-white leading-none mb-3">4.8★</div>
                <div className="text-[13px] text-afs-gray-500 uppercase tracking-widest font-medium">Average tailor rating</div>
              </div>
            </div>
          </div>
        </section>

        {/* --- FINAL CTA SECTION --- */}
        <section className="py-20 bg-afs-white">
          <div className="max-w-[560px] mx-auto px-4 sm:px-6 flex flex-col items-center text-center">
            <Badge variant="default" className="mb-6 px-3 py-1 text-sm border border-afs-gray-300 font-medium">
              Get started today
            </Badge>
            
            <h2 className="font-display text-[40px] text-afs-black leading-tight mb-4 tracking-tight">
              Ready to wear what<br />you actually want?
            </h2>
            
            <p className="text-[16px] text-afs-gray-500 mb-10 leading-relaxed max-w-sm">
              Join thousands of Nigerians who've stopped settling for off-the-rack.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-8">
              <Link href="/discover" className="w-full sm:w-auto">
                <Button variant="primary" size="lg" className="w-full sm:w-auto text-base h-12 px-8">
                  Find a Tailor
                </Button>
              </Link>
              <Link href="/onboard" className="w-full sm:w-auto">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto text-base h-12 px-8">
                  Join as a Tailor
                </Button>
              </Link>
            </div>
            
            <p className="text-[12px] text-afs-gray-500 font-medium">
              Free to use for customers &middot; No commission on first order for tailors
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
