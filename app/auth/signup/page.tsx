"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { ShoppingBag, Scissors, Eye, EyeOff, Check, ArrowRight } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();

  // Role Selection
  const [role, setRole] = useState<'customer' | 'tailor'>('customer');

  // Form State
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  // UI State
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Derived Validation State
  const isNameValid = fullName.trim().length >= 2;
  const isPhoneValid = /^0\d{10}$/.test(phone);
  const isPasswordValid = password.length >= 8;
  const doPasswordsMatch = password === confirmPassword && confirmPassword.length > 0;
  
  const isFormValid = isNameValid && isPhoneValid && isPasswordValid && doPasswordsMatch && termsAccepted;

  // Password Strength Logic
  const getPasswordStrength = () => {
    if (password.length === 0) return { label: "", color: "bg-afs-gray-200", width: "0%" };
    if (password.length < 4) return { label: "Weak", color: "bg-[#B91C1C]", width: "33%" };
    
    // Check for mixed characters (at least one letter and one number)
    const hasMixed = /[A-Za-z]/.test(password) && /\d/.test(password) && /[^A-Za-z0-9]/.test(password);
    const hasLetterNum = /[A-Za-z]/.test(password) && /\d/.test(password);
    
    if (password.length >= 8 && (hasMixed || hasLetterNum)) {
      return { label: "Strong", color: "bg-green-600", width: "100%" };
    }
    
    return { label: "Fair", color: "bg-[#D48B28]", width: "66%" };
  };

  const strength = getPasswordStrength();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    console.log("Creating customer account:", {
      fullName,
      phone,
      email,
      password,
      role
    });

    // Navigate to OTP verification
    router.push("/auth/verify-otp");
  };

  return (
    <div className="animate-in fade-in zoom-in-95 duration-500 max-w-[420px] mx-auto pb-12">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="font-display text-[28px] text-afs-black leading-none mb-2">Create your account</h1>
        <p className="text-[14px] text-afs-gray-500">Join Afrostyle and find your perfect tailor</p>
      </div>

      {/* Role Selector */}
      <div className="mb-8 animate-in slide-in-from-bottom-2 duration-300">
        <span className="text-[13px] font-bold text-afs-gray-400 uppercase tracking-widest block mb-4">I want to:</span>
        <div className="grid grid-cols-2 gap-4">
          {/* Customer Card */}
          <div 
            onClick={() => setRole('customer')}
            className={`flex flex-col items-center justify-center text-center p-5 rounded-lg border-2 cursor-pointer transition-all ${
              role === 'customer' 
                ? 'bg-afs-gray-50 border-afs-black' 
                : 'bg-white border-afs-gray-200 hover:border-afs-gray-300'
            }`}
          >
            <ShoppingBag className={`w-6 h-6 mb-3 ${role === 'customer' ? 'text-afs-black' : 'text-afs-gray-400'}`} />
            <span className={`text-[15px] font-medium mb-1 ${role === 'customer' ? 'text-afs-black' : 'text-afs-gray-600'}`}>
              Find a Tailor
            </span>
            <span className="text-[12px] text-afs-gray-500 leading-tight">
              Book and track custom outfits
            </span>
          </div>

          {/* Tailor Card */}
          <div 
            onClick={() => setRole('tailor')}
            className={`flex flex-col items-center justify-center text-center p-5 rounded-lg border-2 cursor-pointer transition-all ${
              role === 'tailor' 
                ? 'bg-afs-gray-50 border-afs-black' 
                : 'bg-white border-afs-gray-200 hover:border-afs-gray-300'
            }`}
          >
            <Scissors className={`w-6 h-6 mb-3 ${role === 'tailor' ? 'text-afs-black' : 'text-afs-gray-400'}`} />
            <span className={`text-[15px] font-medium mb-1 ${role === 'tailor' ? 'text-afs-black' : 'text-afs-gray-600'}`}>
              I'm a Tailor
            </span>
            <span className="text-[12px] text-afs-gray-500 leading-tight">
              Manage orders and grow my business
            </span>
          </div>
        </div>
      </div>

      {/* Conditional Rendering based on Role */}
      {role === 'tailor' ? (
        <div className="bg-white border border-afs-gray-200 rounded-lg p-6 shadow-sm animate-in fade-in slide-in-from-right-4">
          <p className="text-[14px] text-afs-gray-600 mb-6 leading-relaxed">
            Tailor onboarding requires additional verification steps including portfolio upload and business details.
          </p>
          <Link 
            href="/auth/tailor-onboarding"
            className="w-full flex items-center justify-center gap-2 bg-afs-black text-white font-bold text-[14px] py-3.5 rounded-lg shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            Continue to Tailor Onboarding
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        /* Customer Form */
        <form onSubmit={handleSubmit} className="space-y-5 animate-in fade-in slide-in-from-left-4 duration-300">
          <Input
            label="Full name"
            type="text"
            placeholder="Chidinma Obi"
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

          {/* Password Field */}
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
            
            {/* Password Strength Indicator */}
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

          {/* Confirm Password Field */}
          <div className="relative">
            <Input
              label="Confirm password"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={confirmPassword.length > 0 && !doPasswordsMatch ? "Passwords do not match." : ""}
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

          {/* Terms Checkbox */}
          <div className="flex items-start gap-3 pt-2">
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
            </p>
          </div>

          <button 
            type="submit"
            disabled={!isFormValid}
            className={`w-full font-bold text-[14px] py-3.5 rounded-lg transition-all shadow-md mt-4 ${
              isFormValid 
                ? 'bg-afs-black text-white hover:scale-[1.02] active:scale-[0.98] cursor-pointer' 
                : 'bg-afs-gray-100 text-afs-gray-400 cursor-not-allowed shadow-none'
            }`}
          >
            Create Account
          </button>
        </form>
      )}

      {/* Footer */}
      <div className="mt-8 text-center text-[14px] text-afs-gray-600 pt-6 border-t border-afs-gray-100">
        Already have an account?{" "}
        <Link href="/auth/login" className="text-afs-black font-bold hover:underline">
          Log in
        </Link>
      </div>
    </div>
  );
}
