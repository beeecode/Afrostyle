"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { 
  Check, 
  Scissors, 
  Camera, 
  ImagePlus, 
  Image as ImageIcon, 
  X, 
  ShieldCheck, 
  Eye, 
  EyeOff,
  ChevronDown
} from "lucide-react";

const STEPS = ["Account", "Profile", "Specialties", "Portfolio", "Done"];
const SPECIALTIES_LIST = [
  "Ankara & Prints",
  "Agbada & Senator",
  "Bridal & Wedding",
  "Corporate & Office",
  "Aso-ebi Matching",
  "Casual & Everyday",
  "Alterations",
  "Children's Clothing"
];

const CITIES = ["Lagos", "Abuja", "Port Harcourt", "Ibadan", "Kano", "Enugu", "Other"];
const TURNAROUND_TIMES = ["1–3 days", "3–5 days", "1 week", "2 weeks", "2+ weeks"];

export default function TailorOnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);

  // --- FORM STATE ---
  
  // Step 1: Account
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Step 2: Profile
  const [businessName, setBusinessName] = useState("");
  const [city, setCity] = useState("Lagos");
  const [area, setArea] = useState("");
  const [bio, setBio] = useState("");

  // Step 3: Specialties & Pricing
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  const [startingPrice, setStartingPrice] = useState("");
  const [turnaroundTime, setTurnaroundTime] = useState("1 week");
  const [specialtyError, setSpecialtyError] = useState(false);

  // Step 4: Portfolio
  // We'll simulate uploads by keeping an array of dummy IDs.
  type PhotoItem = { id: string; title: string };
  const [photos, setPhotos] = useState<PhotoItem[]>([]);

  // --- VALIDATION AND HELPERS ---

  // Password Strength Logic
  const getPasswordStrength = () => {
    if (password.length === 0) return { label: "", color: "bg-afs-gray-200", width: "0%" };
    if (password.length < 4) return { label: "Weak", color: "bg-[#B91C1C]", width: "33%" };
    
    const hasMixed = /[A-Za-z]/.test(password) && /\d/.test(password) && /[^A-Za-z0-9]/.test(password);
    const hasLetterNum = /[A-Za-z]/.test(password) && /\d/.test(password);
    
    if (password.length >= 8 && (hasMixed || hasLetterNum)) {
      return { label: "Strong", color: "bg-green-600", width: "100%" };
    }
    return { label: "Fair", color: "bg-[#D48B28]", width: "66%" };
  };

  const strength = getPasswordStrength();
  
  const isStep1Valid = fullName.trim().length >= 2 && /^0\d{10}$/.test(phone) && password.length >= 8 && password === confirmPassword && termsAccepted;
  const isStep2Valid = businessName.trim().length >= 2 && area.trim().length >= 2;
  const isStep3Valid = selectedSpecialties.length >= 1 && startingPrice !== "";
  const isStep4Valid = photos.length >= 2;

  // --- HANDLERS ---

  const nextStep = () => {
    if (currentStep === 3 && selectedSpecialties.length === 0) {
      setSpecialtyError(true);
      return;
    }
    if (currentStep < 5) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const toggleSpecialty = (specialty: string) => {
    setSpecialtyError(false);
    setSelectedSpecialties(prev => 
      prev.includes(specialty)
        ? prev.filter(s => s !== specialty)
        : [...prev, specialty]
    );
  };

  const handlePhotoUpload = () => {
    console.log("Upload photo clicked");
    if (photos.length < 6) {
      const newPhotoId = `photo-${Date.now()}`;
      setPhotos([...photos, { id: newPhotoId, title: "" }]);
    }
  };

  const removePhoto = (id: string) => {
    setPhotos(photos.filter(p => p.id !== id));
  };

  const updatePhotoTitle = (id: string, title: string) => {
    setPhotos(photos.map(p => p.id === id ? { ...p, title } : p));
  };

  // --- RENDER STEPS ---

  const renderStepIndicator = () => {
    if (currentStep === 5) return null; // Don't show indicator on final success screen

    return (
      <div className="mb-10 animate-in fade-in duration-500">
        <div className="flex items-center justify-between relative max-w-[400px] mx-auto z-10">
          {/* Connecting lines */}
          <div className="absolute top-[12px] left-0 right-0 h-[2px] -z-10 flex">
            {STEPS.slice(0, -1).map((_, i) => (
              <div key={i} className="flex-1 flex items-center">
                <div className={`h-[2px] w-full ${i < currentStep - 1 ? 'bg-afs-black' : 'bg-afs-gray-200 border-t border-dashed border-afs-gray-300'}`} />
              </div>
            ))}
          </div>

          {/* Step dots */}
          {STEPS.slice(0, -1).map((stepLabel, i) => {
            const stepNum = i + 1;
            const isCompleted = stepNum < currentStep;
            const isCurrent = stepNum === currentStep;
            // Up to step 4 shown in tracker, 5 is done.
            
            return (
              <div key={i} className="flex flex-col items-center gap-2 relative bg-white px-2">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                  isCompleted ? 'bg-afs-black text-white' : 
                  isCurrent ? 'bg-afs-black border-4 border-afs-gray-100 box-content' : 
                  'bg-afs-gray-200'
                }`}>
                  {isCompleted && <Check className="w-3.5 h-3.5" strokeWidth={3} />}
                  {isCurrent && <div className="w-2 h-2 bg-white rounded-full" />}
                </div>
                <span className={`text-[11px] uppercase tracking-wider ${
                  isCompleted || isCurrent ? 'text-afs-black font-bold' : 'text-afs-gray-400 font-medium'
                }`}>
                  {stepLabel}
                </span>
              </div>
            );
          })}
        </div>
        <p className="text-center text-[13px] text-afs-gray-500 mt-6 tracking-wide">
          Step {currentStep} of {STEPS.length - 1}
        </p>
      </div>
    );
  };

  return (
    <div className="pt-2 pb-12 w-full animate-in fade-in zoom-in-95 duration-500 max-w-[640px] mx-auto px-4 md:px-0">
      
      {currentStep < 5 && (
        <div className="mb-10 text-center">
          <h1 className="font-display text-[28px] text-afs-black leading-none mb-2">Tailor Onboarding</h1>
          <p className="text-[14px] text-afs-gray-500">Set up your profile to start accepting orders</p>
        </div>
      )}

      {renderStepIndicator()}

      <div className="max-w-[480px] mx-auto">
        {/* STEP 1: ACCOUNT DETAILS */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
            <Input
              label="Full name"
              type="text"
              placeholder="Amaka Obi"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />

            <Input
              label="Phone number"
              type="tel"
              placeholder="0801 234 5678"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              maxLength={11}
              className="pl-[84px]"
              icon={
                <div className="flex items-center justify-center bg-afs-gray-100 px-2 py-0.5 rounded text-[11px] font-bold text-afs-gray-600 tracking-wider">
                  +234 NG
                </div>
              }
            />

            <Input
              label="Email address (optional)"
              type="email"
              placeholder="you@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="space-y-2">
              <div className="relative">
                <Input
                  label="Create password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute right-3 top-[34px] text-afs-gray-400 hover:text-afs-black transition-colors bg-transparent border-none p-1"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              
              {password.length > 0 && (
                <div className="animate-in fade-in slide-in-from-top-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[12px] text-afs-gray-500 font-medium">Password strength</span>
                    <span className={`text-[12px] font-bold ${
                      strength.label === 'Weak' ? 'text-[#B91C1C]' : 
                      strength.label === 'Fair' ? 'text-[#D48B28]' : 'text-green-600'
                    }`}>
                      {strength.label}
                    </span>
                  </div>
                  <div className="w-full h-1 bg-afs-gray-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-300 ${strength.color}`}
                      style={{ width: strength.width }}
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="relative">
              <Input
                label="Confirm password"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                error={confirmPassword.length > 0 && password !== confirmPassword ? "Passwords do not match." : ""}
              />
              <button
                type="button"
                className="absolute right-3 top-[34px] text-afs-gray-400 hover:text-afs-black transition-colors bg-transparent border-none p-1"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                tabIndex={-1}
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            <div className="flex items-start gap-3 pt-2 mb-8">
              <button
                type="button"
                onClick={() => setTermsAccepted(!termsAccepted)}
                className={`mt-0.5 shrink-0 w-5 h-5 rounded flex items-center justify-center border transition-colors ${
                  termsAccepted 
                    ? 'bg-afs-black border-afs-black text-white' 
                    : 'bg-white border-afs-gray-300 text-transparent hover:border-afs-gray-400'
                }`}
              >
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </button>
              <p className="text-[13px] text-afs-gray-600 leading-relaxed">
                I agree to Afrostyle's{" "}
                <Link href="/terms" className="text-afs-black font-medium underline underline-offset-2 hover:opacity-70">
                  Terms of Service
                </Link>
                {" "}and{" "}
                <Link href="/privacy" className="text-afs-black font-medium underline underline-offset-2 hover:opacity-70">
                  Privacy Policy
                </Link>
                . I understand that I am signing up as a Tailor.
              </p>
            </div>

            <button 
              onClick={nextStep}
              disabled={!isStep1Valid}
              className={`w-full font-bold text-[14px] py-3.5 rounded-lg transition-all shadow-md ${
                isStep1Valid 
                  ? 'bg-afs-black text-white hover:scale-[1.02] active:scale-[0.98]' 
                  : 'bg-afs-gray-100 text-afs-gray-400 cursor-not-allowed shadow-none'
              }`}
            >
              Continue &rarr;
            </button>
            
            <div className="mt-8 text-center text-[14px] text-afs-gray-600 pt-6 border-t border-afs-gray-100">
              Already have an account?{" "}
              <Link href="/auth/login" className="text-afs-black font-bold hover:underline">
                Log in
              </Link>
            </div>
          </div>
        )}

        {/* STEP 2: PROFILE */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
            
            <div className="flex flex-col items-center justify-center mb-8">
              <button 
                onClick={() => console.log('Photo upload clicked')}
                className="w-[100px] h-[100px] bg-afs-gray-50 border-2 border-dashed border-afs-gray-200 rounded-full flex flex-col items-center justify-center text-afs-gray-400 hover:text-afs-black hover:border-afs-black hover:bg-afs-gray-100 transition-colors group cursor-pointer mb-3"
              >
                <Camera className="w-6 h-6 mb-1 group-hover:scale-110 transition-transform" />
              </button>
              <span className="text-[12px] font-bold text-afs-gray-500 uppercase tracking-widest">
                Upload Photo
              </span>
            </div>

            <Input
              label="Business / studio name"
              type="text"
              placeholder="Amaka Obi Designs"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
            />

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-[14px] font-medium text-afs-black">City</label>
                <div className="relative">
                  <select 
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full h-11 bg-white border border-afs-gray-300 rounded-md px-3 text-[14px] text-afs-black appearance-none outline-none focus:border-afs-black focus:ring-1 focus:ring-afs-black transition-colors"
                  >
                    {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-afs-gray-400 pointer-events-none" />
                </div>
              </div>
              <Input
                label="Specific area"
                type="text"
                placeholder="e.g. Ikeja, Surulere"
                value={area}
                onChange={(e) => setArea(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-[14px] font-medium text-afs-black">Bio / About you</label>
                <span className={`text-[12px] ${bio.length === 300 ? 'text-[#B91C1C] font-bold' : 'text-afs-gray-400'}`}>
                  {bio.length}/300
                </span>
              </div>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value.substring(0, 300))}
                placeholder="Tell customers about your experience, style, and what makes you unique..."
                className="w-full h-[120px] bg-white border border-afs-gray-300 rounded-md p-3 text-[14px] text-afs-black outline-none focus:border-afs-black focus:ring-1 focus:ring-afs-black transition-colors resize-none"
              />
            </div>

            <div className="flex gap-4 pt-4">
              <button 
                onClick={prevStep}
                className="px-6 py-3.5 font-bold text-[14px] text-afs-gray-600 hover:bg-afs-gray-50 rounded-lg transition-colors border border-transparent hover:border-afs-gray-200"
              >
                &larr; Back
              </button>
              <button 
                onClick={nextStep}
                disabled={!isStep2Valid}
                className={`flex-1 font-bold text-[14px] py-3.5 rounded-lg transition-all shadow-md ${
                  isStep2Valid 
                    ? 'bg-afs-black text-white hover:scale-[1.02] active:scale-[0.98]' 
                    : 'bg-afs-gray-100 text-afs-gray-400 cursor-not-allowed shadow-none'
                }`}
              >
                Continue &rarr;
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: SPECIALTIES & PRICING */}
        {currentStep === 3 && (
          <div className="space-y-8 animate-in slide-in-from-right-4 duration-300 w-full max-w-[640px] md:w-[640px] md:-ml-[80px]">
            <div>
              <label className="block text-[14px] font-medium text-afs-black mb-4">
                What do you specialise in? <span className="text-afs-gray-500 font-normal">(Select all that apply)</span>
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {SPECIALTIES_LIST.map((specialty) => {
                  const isSelected = selectedSpecialties.includes(specialty);
                  return (
                    <div 
                      key={specialty}
                      onClick={() => toggleSpecialty(specialty)}
                      className={`relative flex flex-col items-center justify-center text-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        isSelected 
                          ? 'bg-afs-gray-50 border-afs-black' 
                          : 'bg-white border-afs-gray-200 hover:border-afs-gray-300 hover:bg-afs-gray-50/50'
                      }`}
                    >
                      {isSelected && (
                        <div className="absolute top-2 right-2 bg-afs-black text-white rounded-full p-0.5 animate-in zoom-in-50">
                          <Check className="w-3 h-3" strokeWidth={3} />
                        </div>
                      )}
                      <Scissors className={`w-5 h-5 mb-2 ${isSelected ? 'text-afs-black' : 'text-afs-gray-400'}`} />
                      <span className={`text-[12px] leading-tight font-medium ${isSelected ? 'text-afs-black' : 'text-afs-gray-600'}`}>
                        {specialty}
                      </span>
                    </div>
                  );
                })}
              </div>
              {specialtyError && (
                <p className="text-[13px] text-[#B91C1C] font-medium mt-3 animate-in fade-in">
                  Please select at least one specialty.
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-afs-gray-50 p-6 rounded-xl border border-afs-gray-100">
              <div className="space-y-2">
                <label className="block text-[14px] font-medium text-afs-black">Starting price (₦)</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[14px] font-medium text-afs-gray-500">₦</span>
                  <input
                    type="number"
                    value={startingPrice}
                    onChange={(e) => setStartingPrice(e.target.value)}
                    placeholder="15000"
                    className="w-full h-11 pl-8 bg-white border border-afs-gray-300 rounded-md pr-3 text-[14px] text-afs-black outline-none focus:border-afs-black focus:ring-1 focus:ring-afs-black transition-colors"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-[14px] font-medium text-afs-black">Average turnaround time</label>
                <div className="relative">
                  <select 
                    value={turnaroundTime}
                    onChange={(e) => setTurnaroundTime(e.target.value)}
                    className="w-full h-11 bg-white border border-afs-gray-300 rounded-md px-3 text-[14px] text-afs-black appearance-none outline-none focus:border-afs-black focus:ring-1 focus:ring-afs-black transition-colors"
                  >
                    {TURNAROUND_TIMES.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-afs-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-4 px-4 md:px-0">
              <button 
                onClick={prevStep}
                className="px-6 py-3.5 font-bold text-[14px] text-afs-gray-600 hover:bg-afs-gray-50 rounded-lg transition-colors border border-transparent hover:border-afs-gray-200"
              >
                &larr; Back
              </button>
              <button 
                onClick={nextStep}
                disabled={!isStep3Valid}
                className={`flex-1 font-bold text-[14px] py-3.5 rounded-lg transition-all shadow-md ${
                  isStep3Valid 
                    ? 'bg-afs-black text-white hover:scale-[1.02] active:scale-[0.98]' 
                    : 'bg-afs-gray-100 text-afs-gray-400 cursor-not-allowed shadow-none'
                }`}
              >
                Continue &rarr;
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: PORTFOLIO */}
        {currentStep === 4 && (
          <div className="space-y-8 animate-in slide-in-from-right-4 duration-300 w-full max-w-[560px] md:w-[560px] md:-ml-[40px]">
            <div>
              <label className="block text-[16px] font-bold text-afs-black mb-1">
                Upload your best work <span className="text-[#B91C1C]">*</span>
              </label>
              <p className="text-[13px] text-afs-gray-500 mb-6 leading-relaxed">
                Show customers what you can do. Minimum 2 photos required. All uploads are automatically timestamped.
              </p>

              {/* Upload Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                {photos.map((photo) => (
                  <div key={photo.id} className="aspect-[4/5] bg-afs-gray-200 rounded-lg relative overflow-hidden flex items-center justify-center animate-in zoom-in-95 group">
                    <ImageIcon className="w-8 h-8 text-afs-gray-400" />
                    <button 
                      onClick={() => removePhoto(photo.id)}
                      className="absolute top-2 right-2 w-6 h-6 bg-white/80 rounded-full flex items-center justify-center text-afs-black hover:bg-white transition-colors"
                      title="Remove photo"
                    >
                      <X className="w-3 h-3" strokeWidth={3} />
                    </button>
                  </div>
                ))}
                
                {photos.length < 6 && (
                  <button 
                    onClick={handlePhotoUpload}
                    className="aspect-[4/5] bg-afs-gray-50 border-2 border-dashed border-afs-gray-300 rounded-lg flex flex-col items-center justify-center gap-2 text-afs-gray-500 hover:text-afs-black hover:border-afs-black hover:bg-afs-gray-100 transition-colors cursor-pointer group"
                  >
                    <ImagePlus className="w-6 h-6 group-hover:scale-110 transition-transform" />
                    <span className="text-[12px] font-medium">Add photo</span>
                  </button>
                )}
                
                {/* Empty placeholders to maintain grid shape if empty */}
                {photos.length === 0 && (
                  <div className="hidden md:block aspect-[4/5] bg-afs-gray-50/50 border border-dashed border-afs-gray-200 rounded-lg" />
                )}
                {photos.length === 0 && (
                  <div className="hidden md:block aspect-[4/5] bg-afs-gray-50/50 border border-dashed border-afs-gray-200 rounded-lg" />
                )}
              </div>

              {/* Title Inputs for Uploaded Photos */}
              {photos.length > 0 && (
                <div className="bg-afs-gray-50 p-5 rounded-xl border border-afs-gray-100 space-y-4 mb-8 animate-in fade-in slide-in-from-bottom-2">
                  <h4 className="text-[14px] font-bold text-afs-black mb-2">Adding details</h4>
                  {photos.map((photo, j) => (
                    <div key={photo.id} className="flex items-center gap-3">
                      <div className="w-8 h-8 shrink-0 bg-white border border-afs-gray-200 rounded flex items-center justify-center text-[10px] font-bold text-afs-gray-500">
                        #{j + 1}
                      </div>
                      <input
                        type="text"
                        value={photo.title}
                        onChange={(e) => updatePhotoTitle(photo.id, e.target.value)}
                        placeholder="e.g. Navy Ankara Senator Suit"
                        className="w-full h-10 bg-white border border-afs-gray-300 rounded-md px-3 text-[13px] text-afs-black outline-none focus:border-afs-black focus:ring-1 focus:ring-afs-black transition-colors"
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Timestamp Notice */}
              <div className="bg-[#EAF2ED] border border-[#BDE0CB] rounded-lg p-4 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-green-700 shrink-0 mt-0.5" />
                <p className="text-[12px] text-green-800 leading-relaxed font-medium">
                  Each photo will be cryptographically timestamped when you complete signup. This securely protects your original designs and intellectual property.
                </p>
              </div>
            </div>

            <div className="flex gap-4 pt-4 px-4 md:px-0">
              <button 
                onClick={prevStep}
                className="px-6 py-3.5 font-bold text-[14px] text-afs-gray-600 hover:bg-afs-gray-50 rounded-lg transition-colors border border-transparent hover:border-afs-gray-200"
              >
                &larr; Back
              </button>
              <button 
                onClick={() => {
                  console.log("Submitting tailored onboarding payload...");
                  nextStep(); // Move to completion
                }}
                disabled={!isStep4Valid}
                className={`flex-1 font-bold text-[14px] py-3.5 rounded-lg transition-all shadow-md ${
                  isStep4Valid 
                    ? 'bg-afs-black text-white hover:scale-[1.02] active:scale-[0.98]' 
                    : 'bg-afs-gray-100 text-afs-gray-400 cursor-not-allowed shadow-none'
                }`}
              >
                Complete Setup &rarr;
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: DONE / SUCCESS SCREEN */}
        {currentStep === 5 && (
          <div className="text-center py-10 animate-in zoom-in-95 duration-700 w-full max-w-[420px] mx-auto">
            <div className="w-[72px] h-[72px] bg-afs-black rounded-full mx-auto flex items-center justify-center mb-6 shadow-xl animate-in zoom-in spin-in-12 duration-500 delay-100">
              <Check className="w-8 h-8 text-white" strokeWidth={3} />
            </div>
            
            <h1 className="font-display text-[32px] text-afs-black mb-4 leading-none">You're all set!</h1>
            
            <p className="text-[16px] text-afs-gray-500 leading-relaxed mx-auto mb-10">
              Your tailor profile is being reviewed by our team. You'll receive an SMS once verified — usually within 24 hours.
            </p>

            <div className="bg-afs-gray-50 border border-afs-gray-100 rounded-xl p-6 mb-10 text-left space-y-4 shadow-sm">
              <h4 className="text-[11px] font-bold uppercase tracking-widest text-afs-gray-400 mb-2">What happens next</h4>
              
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 bg-green-100 text-green-700 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3" strokeWidth={3} />
                </div>
                <p className="text-[14px] text-afs-black font-medium">Your profile is now live on Afrostyle</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 bg-green-100 text-green-700 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3" strokeWidth={3} />
                </div>
                <p className="text-[14px] text-afs-black font-medium">Customers can discover and book you</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 bg-green-100 text-green-700 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3" strokeWidth={3} />
                </div>
                <p className="text-[14px] text-afs-black font-medium">You'll get SMS notifications for new bookings</p>
              </div>
            </div>

            <div className="space-y-3">
              <Link 
                href="/dashboard"
                className="w-full flex items-center justify-center py-3.5 bg-afs-black text-white rounded-lg font-bold text-[14px] shadow-lg hover:scale-[1.02] transition-all"
              >
                Go to my dashboard
              </Link>
              <Link 
                href="/tailor/1"
                className="w-full flex items-center justify-center py-3.5 bg-transparent text-afs-black border border-afs-gray-200 hover:bg-afs-gray-50 rounded-lg font-bold text-[14px] transition-colors"
              >
                Preview my profile
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
