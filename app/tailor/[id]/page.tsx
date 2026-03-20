"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ShieldCheck, MapPin, Calendar, Star, PackageCheck, Clock, Globe, CalendarCheck, Banknote, Timer, Image as ImageIcon, ImageOff, MessageCircle, CalendarPlus, Heart } from "lucide-react";

// --- MOCK DATA ---
const MOCK_TAILOR = {
  id: '1',
  name: 'Amaka Obi Designs',
  avatar: undefined,
  bio: 'Award-winning fashion designer based in Ikeja, Lagos. Specialising in bespoke Ankara, corporate wear, and bridal collections. Over 8 years of experience dressing Lagos professionals and brides.',
  location: 'Ikeja, Lagos',
  specialties: ['Ankara', 'Corporate', 'Bridal', 'Aso-ebi'],
  rating: 4.8,
  reviewCount: 124,
  completedOrders: 340,
  startingPrice: 15000,
  turnaroundDays: 7,
  isVerified: true,
  memberSince: 'January 2022',
  responseTime: 'Usually responds within 2 hours',
  languages: ['English', 'Igbo'],
};

const MOCK_PORTFOLIO = [
  { id: 'p1', title: 'Navy Ankara Senator',    category: 'Ankara',    date: 'Feb 2026', description: 'Custom senator suit in navy Ankara print, fully lined.' },
  { id: 'p2', title: 'Ivory Bridal Gown',      category: 'Bridal',    date: 'Jan 2026', description: 'Bespoke A-line bridal gown with hand-sewn lace detail.' },
  { id: 'p3', title: 'Corporate Blazer Set',   category: 'Corporate', date: 'Jan 2026', description: 'Two-piece fitted blazer and trouser set for corporate client.' },
  { id: 'p4', title: 'Aso-ebi Matching Set',   category: 'Aso-ebi',   date: 'Dec 2025', description: 'Family matching Aso-ebi set in olive green gele fabric.' },
  { id: 'p5', title: 'Agbada Ceremonial',      category: 'Agbada',    date: 'Dec 2025', description: 'Full ceremonial Agbada with intricate embroidery on the chest.' },
  { id: 'p6', title: 'Casual Ankara Dress',    category: 'Ankara',    date: 'Nov 2025', description: 'Flared midi dress in yellow Ankara wax print.' },
];

const MOCK_REVIEWS = [
  { id: 'r1', customerName: 'Chidinma O.', rating: 5, date: 'March 2026',  order: 'Bridal gown',        comment: 'Absolutely stunning work. Amaka captured exactly what I wanted for my wedding. Every stitch was perfect and she delivered 3 days early.' },
  { id: 'r2', customerName: 'Biodun A.',   rating: 5, date: 'Feb 2026',    order: 'Senator suit',       comment: 'Best tailor in Lagos hands down. My Ankara senator fit like a glove. Will be back every season.' },
  { id: 'r3', customerName: 'Ngozi E.',    rating: 4, date: 'Feb 2026',    order: 'Corporate blazer',   comment: 'Very professional and responsive on WhatsApp. The blazer is beautiful — only one small issue with the lining that she fixed immediately.' },
  { id: 'r4', customerName: 'Emeka T.',    rating: 5, date: 'Jan 2026',    order: 'Agbada set',         comment: 'Wore this to my son\'s wedding and received compliments all night. Exceptional quality and attention to detail.' },
  { id: 'r5', customerName: 'Yetunde K.',  rating: 4, date: 'Jan 2026',    order: 'Casual Ankara dress', comment: 'Great craftsmanship. Took one extra day but the result was worth the wait. Communication was excellent throughout.' },
];

export default function TailorProfilePage() {
  const params = useParams();
  const id = params?.id as string;

  // Interactive Tabs
  const [activeTab, setActiveTab] = useState("about");
  const [activeCategory, setActiveCategory] = useState("All");
  const [isFavorite, setIsFavorite] = useState(false);

  // Derived Data
  const portfolioCategories = ["All", ...Array.from(new Set(MOCK_PORTFOLIO.map(item => item.category)))];
  const filteredPortfolio = MOCK_PORTFOLIO.filter(item => activeCategory === "All" || item.category === activeCategory);

  return (
    <div className="flex flex-col min-h-screen bg-afs-gray-50">
      <Navbar variant="white" />
      
      <main className="flex-grow pt-16">
        
        {/* Profile Header Section */}
        <section className="bg-white border-b border-afs-gray-100 pt-10 pb-8 px-6">
          <div className="max-w-[1160px] mx-auto flex flex-col md:flex-row gap-7">
            
            {/* Left - Avatar block */}
            <div className="shrink-0 flex items-start">
              <Avatar 
                src={MOCK_TAILOR.avatar} 
                fallback={MOCK_TAILOR.name.substring(0, 2).toUpperCase()} 
                size="xl" 
                className="w-20 h-20 text-3xl font-display" 
              />
            </div>

            {/* Center - Main info */}
            <div className="flex-1 flex flex-col">
              
              {/* Row 1 - Name + verified badge */}
              <div className="flex items-center gap-2 mb-2">
                <h1 className="font-display text-[28px] text-afs-black leading-tight">
                  {MOCK_TAILOR.name}
                </h1>
                {MOCK_TAILOR.isVerified && (
                  <div className="flex items-center justify-center relative group" title="Verified tailor">
                    <ShieldCheck className="w-[18px] h-[18px] text-afs-black" />
                  </div>
                )}
              </div>

              {/* Row 2 - Location + member since */}
              <div className="flex items-center gap-2 mb-3 max-w-full flex-wrap">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-afs-gray-500 shrink-0" />
                  <span className="text-[14px] text-afs-gray-500">{MOCK_TAILOR.location}</span>
                </div>
                <span className="text-afs-gray-300">&middot;</span>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-afs-gray-500 shrink-0" />
                  <span className="text-[14px] text-afs-gray-500">Member since {MOCK_TAILOR.memberSince}</span>
                </div>
              </div>

              {/* Row 3 - Rating strip */}
              <div className="flex items-center gap-2 mb-4 max-w-full flex-wrap">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-afs-black fill-current" />
                  <span className="text-[16px] font-bold text-afs-black ml-1">{MOCK_TAILOR.rating}</span>
                  <span className="text-[14px] text-afs-gray-500 ml-1">({MOCK_TAILOR.reviewCount} reviews)</span>
                </div>
                <span className="text-afs-gray-300">&middot;</span>
                <div className="flex items-center gap-1.5">
                  <PackageCheck className="w-4 h-4 text-afs-gray-700 shrink-0" />
                  <span className="text-[14px] text-afs-gray-700">{MOCK_TAILOR.completedOrders} orders completed</span>
                </div>
              </div>

              {/* Row 4 - Specialty badges */}
              <div className="flex items-center flex-wrap gap-1.5 mb-4">
                {MOCK_TAILOR.specialties.map(spec => (
                  <Badge key={spec} variant="default" className="text-[12px] font-medium">
                    {spec}
                  </Badge>
                ))}
              </div>

              {/* Row 5 - Response time */}
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-afs-gray-500 shrink-0" />
                <span className="text-[13px] text-afs-gray-500">{MOCK_TAILOR.responseTime}</span>
              </div>
              
            </div>

            {/* Right - Quick stats block (Desktop Only) */}
            <div className="hidden md:flex flex-col gap-3 shrink-0 min-w-[200px]">
              
              {/* Stat 1 */}
              <div className="bg-white border border-afs-gray-100 rounded-md p-4 text-center">
                <div className="font-display text-[24px] text-afs-black">{MOCK_TAILOR.completedOrders}</div>
                <div className="text-[12px] text-afs-gray-500 uppercase tracking-widest mt-1">Completed orders</div>
              </div>
              
              {/* Stat 2 */}
              <div className="bg-white border border-afs-gray-100 rounded-md p-4 text-center">
                <div className="font-display text-[24px] text-afs-black">{MOCK_TAILOR.rating}★</div>
                <div className="text-[12px] text-afs-gray-500 uppercase tracking-widest mt-1">Average rating</div>
              </div>

              {/* Stat 3 */}
              <div className="bg-white border border-afs-gray-100 rounded-md p-4 text-center">
                <div className="font-display text-[24px] text-afs-black">{MOCK_TAILOR.turnaroundDays} days</div>
                <div className="text-[12px] text-afs-gray-500 uppercase tracking-widest mt-1">Avg. turnaround</div>
              </div>
              
            </div>

          </div>
        </section>

        {/* Content Area Shell */}
        <div className="max-w-[1160px] mx-auto px-6 py-8 flex flex-col lg:flex-row gap-8">
          <div className="flex-1 w-full min-w-0" id="left-col">
            
            {/* Tab Navigation */}
            <div className="border-b border-afs-gray-100 flex gap-8 mb-8">
              {['About', 'Portfolio', 'Reviews'].map(tab => {
                const isActive = activeTab === tab.toLowerCase();
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab.toLowerCase())}
                    className={`pb-3 text-[15px] transition-colors relative ${
                      isActive ? 'text-afs-black font-medium' : 'text-afs-gray-500 hover:text-afs-gray-700'
                    }`}
                  >
                    {tab}
                    {isActive && (
                      <div className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-afs-black" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* About Tab Content */}
            {activeTab === 'about' && (
              <div className="space-y-12 animate-in fade-in duration-500">
                
                {/* Section 1 - Bio */}
                <div>
                  <h3 className="text-[12px] uppercase text-afs-gray-500 tracking-widest font-semibold mb-4">About</h3>
                  <p className="text-[16px] text-afs-gray-700 leading-[1.8]">
                    {MOCK_TAILOR.bio}
                  </p>
                </div>

                {/* Section 2 - Specialties */}
                <div>
                  <h3 className="text-[12px] uppercase text-afs-gray-500 tracking-widest font-semibold mb-4">Specialises in</h3>
                  <div className="flex flex-wrap gap-3">
                    {MOCK_TAILOR.specialties.map(spec => (
                      <Badge key={spec} variant="default" className="px-[14px] py-[8px] text-[13px] font-medium border-none">
                        {spec}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Section 3 - Details grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Location */}
                  <div className="bg-white border border-afs-gray-100 rounded-md p-4 flex gap-3">
                    <MapPin className="w-4 h-4 text-afs-gray-500 shrink-0 mt-0.5" />
                    <div className="flex flex-col gap-1">
                      <span className="text-[13px] text-afs-gray-500 leading-none">Location</span>
                      <span className="text-[14px] text-afs-black font-medium leading-tight">{MOCK_TAILOR.location}</span>
                    </div>
                  </div>

                  {/* Response time */}
                  <div className="bg-white border border-afs-gray-100 rounded-md p-4 flex gap-3">
                    <Clock className="w-4 h-4 text-afs-gray-500 shrink-0 mt-0.5" />
                    <div className="flex flex-col gap-1">
                      <span className="text-[13px] text-afs-gray-500 leading-none">Response time</span>
                      <span className="text-[14px] text-afs-black font-medium leading-tight">{MOCK_TAILOR.responseTime}</span>
                    </div>
                  </div>

                  {/* Languages */}
                  <div className="bg-white border border-afs-gray-100 rounded-md p-4 flex gap-3">
                    <Globe className="w-4 h-4 text-afs-gray-500 shrink-0 mt-0.5" />
                    <div className="flex flex-col gap-1">
                      <span className="text-[13px] text-afs-gray-500 leading-none">Languages</span>
                      <span className="text-[14px] text-afs-black font-medium leading-tight">{MOCK_TAILOR.languages.join(', ')}</span>
                    </div>
                  </div>

                  {/* Member since */}
                  <div className="bg-white border border-afs-gray-100 rounded-md p-4 flex gap-3">
                    <CalendarCheck className="w-4 h-4 text-afs-gray-500 shrink-0 mt-0.5" />
                    <div className="flex flex-col gap-1">
                      <span className="text-[13px] text-afs-gray-500 leading-none">Member since</span>
                      <span className="text-[14px] text-afs-black font-medium leading-tight">{MOCK_TAILOR.memberSince}</span>
                    </div>
                  </div>

                  {/* Starting price */}
                  <div className="bg-white border border-afs-gray-100 rounded-md p-4 flex gap-3">
                    <Banknote className="w-4 h-4 text-afs-gray-500 shrink-0 mt-0.5" />
                    <div className="flex flex-col gap-1">
                      <span className="text-[13px] text-afs-gray-500 leading-none">Starting price</span>
                      <span className="text-[14px] text-afs-black font-medium leading-tight">From ₦{MOCK_TAILOR.startingPrice.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Turnaround time */}
                  <div className="bg-white border border-afs-gray-100 rounded-md p-4 flex gap-3">
                    <Timer className="w-4 h-4 text-afs-gray-500 shrink-0 mt-0.5" />
                    <div className="flex flex-col gap-1">
                      <span className="text-[13px] text-afs-gray-500 leading-none">Turnaround time</span>
                      <span className="text-[14px] text-afs-black font-medium leading-tight">{MOCK_TAILOR.turnaroundDays} days avg.</span>
                    </div>
                  </div>
                  
                </div>

                {/* Section 4 - Design timestamp note */}
                <div className="bg-afs-gray-50 border border-afs-gray-300 rounded-md p-4 flex gap-3 items-start">
                  <ShieldCheck className="w-4 h-4 text-afs-gray-500 shrink-0 mt-0.5" />
                  <p className="text-[13px] text-afs-gray-500 leading-relaxed font-medium">
                    All portfolio designs by this tailor are timestamped and verified by Afrostyle. Original work is protected.
                  </p>
                </div>

              </div>
            )}

            {/* Portfolio Tab Content */}
            {activeTab === 'portfolio' && (
              <div className="space-y-6 animate-in fade-in duration-500">
                {/* Filter Row */}
                <div className="flex gap-2 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                  {portfolioCategories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-4 py-1.5 rounded-full text-[13px] font-medium whitespace-nowrap transition-colors ${
                        activeCategory === cat 
                          ? 'bg-afs-black text-white' 
                          : 'bg-afs-gray-100 text-afs-gray-700 hover:bg-afs-gray-200'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Portfolio Grid */}
                {filteredPortfolio.length === 0 ? (
                  <div className="py-20 flex flex-col items-center justify-center text-center border border-afs-gray-100 bg-white rounded-xl">
                    <ImageOff className="w-12 h-12 text-afs-gray-300 mb-4" />
                    <p className="text-[15px] font-medium text-afs-black">No designs in this category yet</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredPortfolio.map(item => (
                      <div 
                        key={item.id} 
                        className="bg-white rounded-lg shadow-card border border-afs-gray-100 overflow-hidden hover:-translate-y-0.5 hover:shadow-md transition-all duration-300 flex flex-col"
                      >
                        {/* Top Image Area */}
                        <div className="h-[200px] bg-afs-gray-100 relative flex flex-col items-center justify-center shrink-0">
                          <ImageIcon className="w-8 h-8 text-afs-gray-300 mb-2" />
                          <span className="text-[12px] text-afs-gray-400 font-medium">Design photo</span>
                          <div className="absolute top-3 right-3">
                            <Badge variant="default" className="text-[10px] py-0.5 px-2 bg-white text-afs-black border-afs-gray-100 shadow-sm font-medium">
                              {item.category}
                            </Badge>
                          </div>
                        </div>

                        {/* Bottom Info Area */}
                        <div className="p-4 flex-1 flex flex-col">
                          <div className="flex justify-between items-start mb-2 gap-2">
                            <h4 className="text-[15px] font-medium text-afs-black leading-tight line-clamp-1">{item.title}</h4>
                            <span className="text-[12px] text-afs-gray-500 whitespace-nowrap shrink-0">{item.date}</span>
                          </div>
                          <p className="text-[13px] text-afs-gray-700 line-clamp-2 leading-relaxed">
                            {item.description}
                          </p>
                        </div>

                        {/* Bottom verification strip */}
                        <div className="bg-afs-gray-50 border-t border-afs-gray-100 px-4 py-2.5 flex items-center gap-1.5 shrink-0 mt-auto">
                          <ShieldCheck className="w-3.5 h-3.5 text-afs-gray-500 shrink-0" />
                          <span className="text-[11px] text-afs-gray-500 font-medium truncate">Verified original &middot; {item.date}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Reviews Tab Content */}
            {activeTab === 'reviews' && (
              <div className="animate-in fade-in duration-500">
                
                {/* Reviews Summary Bar */}
                <div className="flex flex-col md:flex-row gap-8 items-start md:items-center bg-white border border-afs-gray-100 rounded-lg p-6 mb-8">
                  <div className="flex flex-col items-center md:items-start shrink-0 min-w-[140px]">
                    <div className="flex items-baseline gap-1 mb-1">
                      <span className="font-display text-[48px] text-afs-black leading-none">{MOCK_TAILOR.rating}</span>
                      <span className="text-[13px] text-afs-gray-500">out of 5</span>
                    </div>
                    <div className="flex items-center gap-0.5 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < Math.floor(MOCK_TAILOR.rating) ? 'fill-current text-afs-black' : 'text-afs-gray-300 fill-transparent'}`} />
                      ))}
                    </div>
                    <span className="text-[13px] text-afs-gray-500">Based on {MOCK_TAILOR.reviewCount} reviews</span>
                  </div>

                  <div className="h-full w-px bg-afs-gray-100 hidden md:block self-stretch" />

                  <div className="flex-1 w-full flex flex-col gap-2">
                    {[
                      { stars: 5, pct: 78 },
                      { stars: 4, pct: 16 },
                      { stars: 3, pct: 4 },
                      { stars: 2, pct: 1 },
                      { stars: 1, pct: 1 }
                    ].map(row => (
                      <div key={row.stars} className="flex items-center gap-3">
                        <span className="text-[13px] font-medium text-afs-black w-4 shrink-0">{row.stars}★</span>
                        <div className="flex-1 h-1.5 bg-afs-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-afs-black rounded-full" style={{ width: `${row.pct}%` }} />
                        </div>
                        <span className="text-[12px] font-medium text-afs-gray-500 w-8 text-right shrink-0">{row.pct}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Review Cards */}
                <div className="flex flex-col">
                  {MOCK_REVIEWS.map(review => (
                    <div key={review.id} className="bg-white border-b border-afs-gray-100 py-5 last:border-b-0">
                      
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-3">
                          <Avatar fallback={review.customerName.substring(0, 2).toUpperCase()} size="sm" />
                          <span className="text-[14px] font-medium text-afs-black">{review.customerName}</span>
                        </div>
                        <span className="text-[13px] text-afs-gray-500">{review.date}</span>
                      </div>

                      <div className="flex items-center gap-3 mb-3">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-3.5 h-3.5 ${i < review.rating ? 'fill-current text-afs-black' : 'text-afs-gray-300 fill-transparent'}`} />
                          ))}
                        </div>
                        <Badge variant="default" className="text-[10px] py-0.5 px-2 font-medium">
                          {review.order}
                        </Badge>
                      </div>

                      <p className="text-[15px] text-afs-gray-700 leading-[1.7] mb-3">
                        {review.comment}
                      </p>

                      <div className="flex items-center gap-1.5">
                        <PackageCheck className="w-3 h-3 text-afs-gray-500" />
                        <span className="text-[11px] text-afs-gray-500 font-medium">Verified order</span>
                      </div>

                    </div>
                  ))}
                </div>

              </div>
            )}

          </div>

          <div className="w-full lg:w-[320px] shrink-0" id="right-col">
            <div className="sticky top-[88px] bg-white border border-afs-gray-300 rounded-xl shadow-float p-6 flex flex-col">
              
              <div className="mb-4">
                <span className="text-[12px] text-afs-gray-500 uppercase tracking-widest block mb-1">Starting from</span>
                <span className="font-display text-[32px] text-afs-black leading-none block mb-1">
                  ₦{MOCK_TAILOR.startingPrice.toLocaleString()}
                </span>
                <span className="text-[11px] text-afs-gray-500">Final price depends on style complexity</span>
              </div>

              <div className="h-px bg-afs-gray-100 my-4" />

              <div className="flex flex-col gap-3 mb-6">
                <div className="flex items-center gap-2">
                  <Timer className="w-[14px] h-[14px] text-afs-gray-500 shrink-0" />
                  <span className="text-[14px] text-afs-gray-700">Turnaround: ~{MOCK_TAILOR.turnaroundDays} days</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-[14px] h-[14px] text-afs-gray-500 shrink-0" />
                  <span className="text-[14px] text-afs-gray-700">{MOCK_TAILOR.responseTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-[14px] h-[14px] text-afs-gray-500 shrink-0" />
                  <span className="text-[14px] text-afs-gray-700">{MOCK_TAILOR.location}</span>
                </div>
              </div>

              <div className="h-px bg-afs-gray-100 mb-6" />

              <div className="flex flex-col gap-3 mb-4">
                <Button 
                  variant="primary"
                  size="lg" 
                  className="w-full text-base font-medium"
                  onClick={() => console.log('booking requested')}
                >
                  <CalendarPlus className="w-4 h-4 mr-2" />
                  Request a Booking
                </Button>
                <Button 
                  variant="ghost" 
                  size="lg" 
                  className="w-full text-base text-afs-black hover:bg-afs-gray-50 font-medium"
                  onClick={() => console.log('message tailor')}
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Message tailor
                </Button>
              </div>

              <div className="flex justify-center mb-6">
                <button 
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="flex items-center gap-1.5 text-[13px] text-afs-gray-500 hover:text-afs-black transition-colors"
                >
                  <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'fill-current text-afs-black' : ''}`} />
                  {isFavorite ? 'Saved to favourites' : 'Save to favourites'}
                </button>
              </div>

              <div className="bg-afs-gray-50 rounded-md p-3 flex gap-2 items-start">
                <ShieldCheck className="w-[14px] h-[14px] text-afs-gray-500 shrink-0 mt-0.5" />
                <p className="text-[12px] text-afs-gray-500 leading-relaxed font-medium">
                  Secure payments via Paystack. Deposit held until order is confirmed.
                </p>
              </div>

            </div>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
