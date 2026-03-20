"use client";

import React, { useState, useRef, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { TailorCard } from "@/components/features/TailorCard";
import { MapPin, Scissors, Search, SlidersHorizontal, Star, Check, LayoutGrid, List, X, Filter, SearchX, ChevronDown } from "lucide-react";

// --- MOCK DATA ---
const MOCK_TAILORS = [
  { id: '1', name: 'Amaka Obi Designs',    location: 'Ikeja, Lagos',      specialties: ['Ankara', 'Corporate', 'Bridal'],      rating: 4.8, reviewCount: 124, startingPrice: 15000, turnaroundDays: 7,  isVerified: true  },
  { id: '2', name: 'Kunle Threads',         location: 'Surulere, Lagos',   specialties: ['Agbada', 'Senator', 'Traditional'],   rating: 4.6, reviewCount: 89,  startingPrice: 20000, turnaroundDays: 10, isVerified: true  },
  { id: '3', name: 'Zara Couture NG',       location: 'Lekki, Lagos',      specialties: ['Bridal', 'Evening wear'],              rating: 4.9, reviewCount: 203, startingPrice: 35000, turnaroundDays: 14, isVerified: false },
  { id: '4', name: 'Dapper by Emeka',       location: 'Victoria Island, Lagos', specialties: ['Corporate', 'Senator'],          rating: 4.7, reviewCount: 67,  startingPrice: 25000, turnaroundDays: 5,  isVerified: true  },
  { id: '5', name: 'Titi Stitches',         location: 'Yaba, Lagos',       specialties: ['Ankara', 'Casual', 'Alterations'],    rating: 4.4, reviewCount: 51,  startingPrice: 8000,  turnaroundDays: 4,  isVerified: false },
  { id: '6', name: 'House of Chukwu',       location: 'Abuja',             specialties: ['Agbada', 'Bridal', 'Aso-ebi'],        rating: 4.9, reviewCount: 312, startingPrice: 40000, turnaroundDays: 10, isVerified: true  },
  { id: '7', name: 'Naija Needle Co.',      location: 'Port Harcourt',     specialties: ['Casual', 'Corporate'],                rating: 4.3, reviewCount: 38,  startingPrice: 10000, turnaroundDays: 6,  isVerified: false },
  { id: '8', name: 'Folake Premium Stitch', location: 'Ibadan',            specialties: ['Bridal', 'Ankara', "Children's Clothing"],    rating: 4.7, reviewCount: 95,  startingPrice: 18000, turnaroundDays: 8,  isVerified: true  },
  { id: '9', name: 'Lagos Loom Studio',     location: 'Ikoyi, Lagos',      specialties: ['Corporate', 'Evening wear', 'Bridal'],rating: 4.8, reviewCount: 156, startingPrice: 50000, turnaroundDays: 12, isVerified: true  },
];

const POPULAR_CITIES = ["Lagos", "Abuja", "Port Harcourt", "Ibadan", "Kano", "Enugu"];
const SPECIALTY_OPTIONS = ["All", "Ankara", "Agbada", "Senator", "Bridal", "Corporate", "Aso-ebi", "Alterations", "Children's"];
const SIDEBAR_SPECIALTIES = ["Ankara & Prints", "Agbada & Senator", "Bridal & Wedding", "Corporate & Office", "Aso-ebi Matching", "Alterations", "Children's Clothing"];
const PRICE_OPTIONS = ["Any price", "Under ₦10,000", "₦10k–₦25k", "₦25k–₦50k", "₦50k+"];
const RATING_OPTIONS = ["Any rating", "4.5+ stars", "4.0+ stars", "3.5+ stars"];
const SORT_OPTIONS = ["Relevance", "Highest rated", "Most reviews", "Price: low to high", "Price: high to low"];

export default function DiscoverPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState<string[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState("");
  const [budgetLimit, setBudgetLimit] = useState<number>(100000);
  const [selectedRating, setSelectedRating] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [openFilter, setOpenFilter] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // New States
  const [isLoading, setIsLoading] = useState(false);
  const [sortBy, setSortBy] = useState("Relevance");

  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setOpenFilter(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const hasActiveFilters = 
    selectedCity !== "" || 
    selectedSpecialty.length > 0 || 
    selectedPriceRange !== "" || 
    budgetLimit !== 100000 || 
    (selectedRating !== "" && selectedRating !== "Any rating") || 
    verifiedOnly || 
    searchQuery !== "";

  const clearFilters = () => {
    setSelectedCity("");
    setSelectedSpecialty([]);
    setSelectedPriceRange("");
    setBudgetLimit(100000);
    setSelectedRating("");
    setVerifiedOnly(false);
    setSearchQuery("");
  };

  const handleSearch = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 800); // Simulate network request
  };

  // --- FILTER LOGIC ---
  const filteredTailors = MOCK_TAILORS.filter(tailor => {
    // Search text match
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchName = tailor.name.toLowerCase().includes(query);
      const matchSpec = tailor.specialties.some(s => s.toLowerCase().includes(query));
      if (!matchName && !matchSpec) return false;
    }
    // Location match
    if (selectedCity && !tailor.location.toLowerCase().includes(selectedCity.toLowerCase())) return false;
    // Specialty match
    if (selectedSpecialty.length > 0) {
      const hasMatch = selectedSpecialty.some(filterSpec => {
        // Simple heuristic to match words
        const baseWord = filterSpec.split(' ')[0].replace("'s", "");
        return tailor.specialties.some(ts => ts.includes(baseWord));
      });
      if (!hasMatch) return false;
    }
    // Price range dropdown match
    if (selectedPriceRange === "Under ₦10,000" && tailor.startingPrice >= 10000) return false;
    if (selectedPriceRange === "₦10k–₦25k" && (tailor.startingPrice < 10000 || tailor.startingPrice > 25000)) return false;
    if (selectedPriceRange === "₦25k–₦50k" && (tailor.startingPrice < 25000 || tailor.startingPrice > 50000)) return false;
    if (selectedPriceRange === "₦50k+" && tailor.startingPrice < 50000) return false;
    // Budget slider match
    if (budgetLimit < 100000 && tailor.startingPrice > budgetLimit) return false;
    // Rating match
    if (selectedRating === "4.5+ stars" && tailor.rating < 4.5) return false;
    if (selectedRating === "4.0+ stars" && tailor.rating < 4.0) return false;
    if (selectedRating === "3.5+ stars" && tailor.rating < 3.5) return false;
    // Verified match
    if (verifiedOnly && !tailor.isVerified) return false;

    return true;
  }).sort((a, b) => {
    if (sortBy === "Highest rated") return b.rating - a.rating;
    if (sortBy === "Most reviews") return b.reviewCount - a.reviewCount;
    if (sortBy === "Price: low to high") return a.startingPrice - b.startingPrice;
    if (sortBy === "Price: high to low") return b.startingPrice - a.startingPrice;
    return 0; // Relevance
  });

  return (
    <div className="flex flex-col min-h-screen bg-afs-gray-50 pb-20 lg:pb-0">
      <Navbar variant="white" />
      
      {/* Dynamic CSS for UI specific behaviors */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 1.5s infinite linear;
        }
      `}} />

      <main className="flex-grow pt-16">
        {/* Search Header Section */}
        <section className="bg-afs-black pt-12 pb-10 px-4 sm:px-6">
          <div className="max-w-[680px] mx-auto text-center flex flex-col items-center">
            <h1 className="font-display text-[36px] text-white mb-2 leading-tight">
              Find your perfect tailor
            </h1>
            <p className="text-[14px] text-afs-gray-500 mb-8">
              Search across 2,400+ verified tailors in Nigeria
            </p>

            {/* Search Bar Container */}
            <div className="w-full bg-white rounded-xl shadow-float p-[6px] flex flex-col sm:flex-row items-stretch sm:items-center sm:divide-x divide-y sm:divide-y-0 divide-afs-gray-300 gap-y-2 sm:gap-y-0 mb-6 relative z-10">
              
              {/* Location Input */}
              <div className="flex-1 flex items-center px-4 h-12 border-b-0">
                <MapPin className="w-4 h-4 text-afs-gray-500 shrink-0 mr-3" />
                <input 
                  type="text"
                  placeholder="City or area"
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full h-full bg-transparent border-none outline-none text-afs-black placeholder:text-afs-gray-500 text-sm"
                />
              </div>

              {/* Specialty Input */}
              <div className="flex-[1.5] flex items-center px-4 h-12">
                <Scissors className="w-4 h-4 text-afs-gray-500 shrink-0 mr-3" />
                <input 
                  type="text"
                  placeholder="e.g. Ankara, Bridal, Agbada"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-full bg-transparent border-none outline-none text-afs-black placeholder:text-afs-gray-500 text-sm"
                />
              </div>

              {/* Search Button */}
              <div className="sm:pl-[6px] w-full sm:w-auto mt-1 sm:mt-0">
                <Button 
                  variant="primary" 
                  onClick={handleSearch}
                  className="w-full sm:w-auto h-12 px-8 rounded-lg font-medium shadow-none hover:shadow-none flex items-center justify-center gap-2"
                >
                  <Search className="w-4 h-4" />
                  Search
                </Button>
              </div>
            </div>

            {/* Quick Filter Pills */}
            <div className="flex gap-3 overflow-x-auto w-full max-w-full pb-2 snap-x [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] justify-start sm:justify-center">
              {POPULAR_CITIES.map((city) => (
                <button
                  key={city}
                  onClick={() => setSelectedCity(city)}
                  className={`flex-shrink-0 snap-start px-4 py-1.5 rounded-full text-sm font-medium transition-colors border whitespace-nowrap ${
                    selectedCity === city
                      ? 'bg-afs-black text-white border-afs-black'
                      : 'bg-white text-afs-gray-700 border-afs-gray-300 hover:border-afs-gray-500'
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>

          </div>
        </section>
        
        {/* Filter Bar */}
        <div className="sticky top-0 z-40 bg-afs-white border-b border-afs-gray-100 px-6 py-3">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            
            {/* Left side filters */}
            <div className="flex flex-row gap-2 items-center flex-wrap" ref={filterRef}>
              
              {/* Mobile Sidebar Toggle */}
              <Button 
                variant="secondary" 
                size="sm" 
                className="lg:hidden"
                onClick={() => setIsSidebarOpen(true)}
              >
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                Filters
              </Button>
              
              {/* Specialty */}
              <div className="relative">
                <Button variant="secondary" size="sm" onClick={() => setOpenFilter(openFilter === 'specialty' ? null : 'specialty')}>
                  <SlidersHorizontal className="w-4 h-4 mr-2" />
                  Specialty
                </Button>
                {openFilter === 'specialty' && (
                  <div className="absolute top-12 left-0 mt-2 bg-white shadow-float rounded-md z-50 min-w-[200px] py-1 border border-afs-gray-100">
                    {SPECIALTY_OPTIONS.map(opt => (
                      <button 
                        key={opt}
                        onClick={() => {
                          if (opt === 'All') setSelectedSpecialty([]);
                          else {
                            if (selectedSpecialty.includes(opt)) setSelectedSpecialty(selectedSpecialty.filter(s => s !== opt));
                            else setSelectedSpecialty([...selectedSpecialty, opt]);
                          }
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-afs-black hover:bg-afs-gray-50 flex justify-between items-center"
                      >
                        {opt}
                        {(selectedSpecialty.includes(opt) || (opt === 'All' && selectedSpecialty.length === 0)) && <Check className="w-4 h-4 text-afs-black" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Price range */}
              <div className="relative">
                <Button variant="secondary" size="sm" onClick={() => setOpenFilter(openFilter === 'price' ? null : 'price')}>
                  Price range
                </Button>
                {openFilter === 'price' && (
                  <div className="absolute top-12 left-0 mt-2 bg-white shadow-float rounded-md z-50 min-w-[200px] py-1 border border-afs-gray-100">
                    {PRICE_OPTIONS.map(opt => (
                      <button 
                        key={opt}
                        onClick={() => { setSelectedPriceRange(opt === 'Any price' ? '' : opt); setOpenFilter(null); }}
                        className="w-full text-left px-4 py-2 text-sm text-afs-black hover:bg-afs-gray-50 flex justify-between items-center"
                      >
                        {opt}
                        {(selectedPriceRange === opt || (opt === 'Any price' && !selectedPriceRange)) && <Check className="w-4 h-4 text-afs-black" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Rating */}
              <div className="relative">
                <Button variant="secondary" size="sm" onClick={() => setOpenFilter(openFilter === 'rating' ? null : 'rating')}>
                  <Star className="w-4 h-4 mr-2" />
                  Rating
                </Button>
                {openFilter === 'rating' && (
                  <div className="absolute top-12 left-0 mt-2 bg-white shadow-float rounded-md z-50 min-w-[200px] py-1 border border-afs-gray-100">
                    {RATING_OPTIONS.map(opt => (
                      <button 
                        key={opt}
                        onClick={() => { setSelectedRating(opt === 'Any rating' ? '' : opt); setOpenFilter(null); }}
                        className="w-full text-left px-4 py-2 text-sm text-afs-black hover:bg-afs-gray-50 flex justify-between items-center"
                      >
                        {opt}
                        {(selectedRating === opt || (opt === 'Any rating' && !selectedRating)) && <Check className="w-4 h-4 text-afs-black" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Verified Toggle */}
              <div className="flex items-center gap-2 ml-2 sm:border-l border-afs-gray-300 sm:pl-4 h-8">
                <button 
                  onClick={() => setVerifiedOnly(!verifiedOnly)}
                  className={`relative w-9 h-5 rounded-full transition-colors duration-200 ease-in-out flex-shrink-0 ${verifiedOnly ? 'bg-afs-black' : 'bg-afs-gray-300'}`}
                >
                  <span className={`absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full transition-transform duration-200 ease-in-out ${verifiedOnly ? 'translate-x-4' : 'translate-x-0'}`} />
                </button>
                <span className="text-[14px] text-afs-gray-700 whitespace-nowrap">Verified only</span>
              </div>
            </div>

            {/* Right side results info */}
            <div className="flex items-center justify-between w-full md:w-auto gap-4 pt-3 md:pt-0 border-t border-afs-gray-100 md:border-t-0 mt-2 md:mt-0">
              <span className="text-[14px] text-afs-gray-700 font-medium">{filteredTailors.length} tailors found</span>
              <div className="flex items-center gap-1 bg-afs-gray-50 border border-afs-gray-300 rounded-md p-0.5">
                <button 
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-sm transition-colors ${viewMode === 'grid' ? 'bg-afs-black text-white' : 'bg-afs-gray-100 text-afs-gray-500 hover:text-afs-black'}`}
                  aria-label="Grid view"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-sm transition-colors ${viewMode === 'list' ? 'bg-afs-black text-white' : 'bg-afs-gray-100 text-afs-gray-500 hover:text-afs-black'}`}
                  aria-label="List view"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
            
          </div>
        </div>

        {/* Main Content Layout Shell */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-row gap-8 items-start relative">
          
          {/* Mobile Drawer Overlay */}
          {isSidebarOpen && (
            <div 
              className="fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity"
              onClick={() => setIsSidebarOpen(false)}
            />
          )}

          {/* Sidebar - Desktop Only or Mobile Dropdown */}
          <aside className={`fixed inset-x-0 bottom-0 z-50 bg-white rounded-t-2xl transition-transform duration-300 ease-in-out transform ${isSidebarOpen ? 'translate-y-0' : 'translate-y-full'} lg:sticky lg:top-[120px] lg:flex lg:-translate-y-0 lg:w-[280px] lg:shrink-0 lg:rounded-none lg:z-auto overflow-hidden flex flex-col max-h-[85vh] lg:max-h-[calc(100vh-140px)] self-start`}>
            
            {/* Mobile close button & drag handle */}
            <div className="lg:hidden flex flex-col items-center pt-3 pb-4 border-b border-afs-gray-100 px-6 bg-white sticky top-0 z-10 shrink-0">
              <div className="w-12 h-1.5 bg-afs-gray-300 rounded-full mb-4" />
              <div className="w-full flex justify-between items-center">
                <span className="font-display text-2xl text-afs-black">Filters</span>
                <button onClick={() => setIsSidebarOpen(false)} className="p-2 bg-afs-gray-50 rounded-full hover:bg-afs-gray-100">
                   <X className="w-5 h-5 text-afs-black" />
                </button>
              </div>
            </div>

            {/* Sidebar content */}
            <div className="p-6 lg:p-0 overflow-y-auto flex-1 space-y-8">
              
              {/* Section 1 - Location */}
              <div>
                <h3 className="text-[12px] uppercase text-afs-gray-500 tracking-wider font-semibold mb-4">Location</h3>
                <Input 
                  placeholder="Search by city or area" 
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                />
                <div className="mt-4 space-y-3">
                  {POPULAR_CITIES.slice(0, 5).map(city => (
                    <label key={city} className="flex items-center gap-3 cursor-pointer group">
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${selectedCity === city ? 'border-afs-black' : 'border-afs-gray-300 group-hover:border-afs-gray-500'}`}>
                        {selectedCity === city && <div className="w-2.5 h-2.5 bg-afs-black rounded-full" />}
                      </div>
                      <span className="text-sm text-afs-gray-700 group-hover:text-afs-black transition-colors">{city}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Section 2 - Specialty */}
              <div>
                <h3 className="text-[12px] uppercase text-afs-gray-500 tracking-wider font-semibold mb-4">Specialty</h3>
                <div className="space-y-3 mb-3">
                  {SIDEBAR_SPECIALTIES.map(spec => (
                    <label key={spec} className="flex items-center gap-3 cursor-pointer group">
                      <div className={`w-4 h-4 rounded-sm border flex items-center justify-center transition-colors ${selectedSpecialty.includes(spec) ? 'bg-afs-black border-afs-black' : 'border-afs-gray-300 bg-white group-hover:border-afs-gray-500'}`}>
                        {selectedSpecialty.includes(spec) && <Check className="w-3 h-3 text-white" />}
                      </div>
                      <span className="text-sm text-afs-gray-700 group-hover:text-afs-black transition-colors">{spec}</span>
                    </label>
                  ))}
                </div>
                <button 
                  className="text-[12px] text-afs-gray-500 hover:text-afs-black font-medium transition-colors"
                  onClick={() => console.log('Show more specialties clicked')}
                >
                  Show more +
                </button>
              </div>

              {/* Section 3 - Budget */}
              <div>
                <h3 className="text-[12px] uppercase text-afs-gray-500 tracking-wider font-semibold mb-4">Budget (per outfit)</h3>
                <div className="relative pt-2 pb-4">
                  <input 
                    type="range" 
                    min="0" 
                    max="100000" 
                    step="5000"
                    value={budgetLimit}
                    onChange={(e) => setBudgetLimit(Number(e.target.value))}
                    className="w-full h-1.5 bg-afs-gray-300 rounded-lg appearance-none cursor-pointer outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#0A0A0A] [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow"
                    style={{
                      background: `linear-gradient(to right, #0A0A0A ${(budgetLimit / 100000) * 100}%, #C2C2C2 ${(budgetLimit / 100000) * 100}%)`
                    }}
                  />
                </div>
                <div className="text-sm text-afs-black font-medium">
                  Up to ₦{budgetLimit.toLocaleString()}
                </div>
              </div>

              {/* Section 4 - Rating */}
              <div>
                <h3 className="text-[12px] uppercase text-afs-gray-500 tracking-wider font-semibold mb-4">Minimum rating</h3>
                <div className="space-y-4">
                  {[
                    { label: "5 stars only", val: "5.0", stars: 5 },
                    { label: "4+ stars", val: "4.0", stars: 4 },
                    { label: "3+ stars", val: "3.0", stars: 3 },
                    { label: "Any rating", val: "", stars: 0 }
                  ].map((rate, idx) => (
                    <label key={idx} className="flex items-center justify-between cursor-pointer group">
                      <div className="flex items-center gap-1">
                        {rate.stars > 0 ? (
                          <>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className={`w-4 h-4 ${i < rate.stars ? 'fill-current text-afs-black' : 'text-afs-gray-300 fill-transparent'}`} />
                              ))}
                            </div>
                            <span className="text-sm text-afs-gray-700 group-hover:text-afs-black ml-2 transition-colors">{rate.label}</span>
                          </>
                        ) : (
                          <span className="text-sm text-afs-gray-700 group-hover:text-afs-black transition-colors">{rate.label}</span>
                        )}
                      </div>
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${selectedRating === rate.val ? 'border-afs-black' : 'border-afs-gray-300 group-hover:border-afs-gray-500'}`}>
                        {selectedRating === rate.val && <div className="w-2.5 h-2.5 bg-afs-black rounded-full" />}
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Section 5 - Clear filters */}
              {hasActiveFilters && (
                <div className="pt-4 border-t border-afs-gray-100">
                  <Button variant="ghost" className="w-full text-afs-gray-500 hover:text-afs-black" onClick={clearFilters}>
                    Clear all filters
                  </Button>
                </div>
              )}

            </div>
          </aside>

          {/* Results Grid - Main Area */}
          <div className="flex-1 w-full min-w-0">
            {/* Sort Bar */}
            <div className="flex justify-end mb-6 relative z-30">
              <div className="flex items-center gap-3 relative">
                <span className="text-[12px] text-afs-gray-500 uppercase tracking-wider font-semibold">Sort by:</span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="bg-transparent border-none p-0 h-auto hover:bg-transparent text-afs-black font-medium flex items-center"
                  onClick={() => setOpenFilter(openFilter === 'sort' ? null : 'sort')}
                >
                  {sortBy}
                  <ChevronDown className="w-4 h-4 ml-1 text-afs-gray-500" />
                </Button>
                {openFilter === 'sort' && (
                  <div className="absolute top-full right-0 mt-2 bg-white shadow-float rounded-md z-50 min-w-[200px] py-1 border border-afs-gray-100">
                    {SORT_OPTIONS.map(opt => (
                      <button 
                        key={opt}
                        onClick={() => { setSortBy(opt); setOpenFilter(null); }}
                        className="w-full text-left px-4 py-2 text-sm text-afs-black hover:bg-afs-gray-50 flex justify-between items-center"
                      >
                        {opt}
                        {sortBy === opt && <Check className="w-4 h-4 text-afs-black" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Loading / Empty / Results Content */}
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white rounded-lg shadow-card h-[360px] w-full border border-afs-gray-100 overflow-hidden relative p-4 flex flex-col">
                    <div className="w-16 h-16 bg-afs-gray-100 rounded-full mb-4 shrink-0 overflow-hidden relative">
                       <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer" />
                    </div>
                    <div className="w-3/4 h-5 bg-afs-gray-100 rounded mb-2 overflow-hidden relative">
                       <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer" />
                    </div>
                    <div className="w-1/2 h-4 bg-afs-gray-100 rounded mb-6 overflow-hidden relative">
                       <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer" />
                    </div>
                    <div className="flex gap-2 mb-auto">
                       <div className="w-16 h-6 bg-afs-gray-100 rounded overflow-hidden relative"><div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer" /></div>
                       <div className="w-20 h-6 bg-afs-gray-100 rounded overflow-hidden relative"><div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer" /></div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-afs-gray-50 flex justify-between">
                       <div className="w-24 h-6 bg-afs-gray-100 rounded overflow-hidden relative"><div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer" /></div>
                       <div className="w-16 h-6 bg-afs-gray-100 rounded overflow-hidden relative"><div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer" /></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredTailors.length === 0 ? (
              <div className="py-20 px-4 flex flex-col items-center justify-center text-center bg-white rounded-xl border border-afs-gray-100">
                <SearchX className="w-12 h-12 text-afs-gray-300 mb-4" />
                <h3 className="font-display text-[24px] text-afs-black mb-2">No tailors found</h3>
                <p className="text-sm text-afs-gray-500 mb-6">Try adjusting your filters or searching a different city</p>
                <Button variant="ghost" onClick={clearFilters}>Clear all filters</Button>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredTailors.map((tailor, i) => (
                  <div 
                    key={tailor.id} 
                    className="animate-in fade-in slide-in-from-bottom-4 duration-500"
                    style={{ animationDelay: `${i * 60}ms`, animationFillMode: 'both' }}
                  >
                    <TailorCard
                      name={tailor.name}
                      location={tailor.location}
                      specialties={tailor.specialties}
                      rating={tailor.rating}
                      reviewCount={tailor.reviewCount}
                      startingPrice={tailor.startingPrice}
                      turnaroundDays={tailor.turnaroundDays}
                      isVerified={tailor.isVerified}
                      onBook={() => console.log('book', tailor.id)}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col border border-afs-gray-100 rounded-xl overflow-hidden shadow-sm">
                {filteredTailors.map((tailor, i) => (
                  <div 
                    key={tailor.id} 
                    className="flex flex-col sm:flex-row sm:items-center bg-white border-b border-afs-gray-100 last:border-b-0 p-4 gap-5 hover:bg-afs-gray-50 transition-colors animate-in fade-in slide-in-from-bottom-4 duration-500"
                    style={{ animationDelay: `${i * 60}ms`, animationFillMode: 'both' }}
                  >
                    <div className="flex items-center justify-center shrink-0">
                      <Avatar fallback={tailor.name.substring(0, 2).toUpperCase()} size="lg" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="font-bold text-afs-black text-base truncate">{tailor.name}</span>
                        {tailor.isVerified && <Badge variant="success" className="h-[18px] px-1.5 text-[10px] uppercase font-bold tracking-wider">Verified</Badge>}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-afs-gray-500 mb-2.5 shrink-0 whitespace-nowrap overflow-hidden text-ellipsis">
                        <MapPin className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">{tailor.location}</span>
                        <span className="mx-1 shrink-0">&middot;</span>
                        <Star className="w-3.5 h-3.5 fill-current text-afs-black shrink-0" />
                        <span className="text-afs-black font-medium shrink-0">{tailor.rating}</span>
                        <span className="shrink-0">({tailor.reviewCount})</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {tailor.specialties.map(spec => (
                          <Badge key={spec} variant="default" className="text-[11px] py-0.5 px-2 bg-afs-gray-100 text-afs-gray-700 h-auto">{spec}</Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex sm:flex-col items-center sm:items-end justify-between mt-2 sm:mt-0 pt-4 sm:pt-0 border-t sm:border-t-0 border-afs-gray-100 shrink-0 min-w-[140px]">
                      <div className="text-sm text-afs-gray-500 sm:mb-3">
                        From <span className="font-bold text-afs-black text-[18px] ml-1">₦{tailor.startingPrice.toLocaleString()}</span>
                      </div>
                      <Button variant="primary" size="sm" className="px-6 shadow-sm" onClick={() => console.log('book', tailor.id)}>Book Now</Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </main>

      {/* Mobile Floating Filters Button */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 lg:hidden">
        <Button 
          variant="primary" 
          className="shadow-deep rounded-full px-6 h-12 flex items-center justify-center gap-2"
          onClick={() => setIsSidebarOpen(true)}
        >
          <Filter className="w-4 h-4" />
          Filters
        </Button>
      </div>

      <Footer />
    </div>
  );
}
