"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [loginMethod, setLoginMethod] = useState<'phone' | 'email'>('phone');
  
  // Phone state
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  
  // Email state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPhoneError("");
    
    // Validate phone: 11 digits starting with 0
    const phoneRegex = /^0\d{10}$/;
    if (!phoneRegex.test(phone)) {
      setPhoneError("Please enter a valid 11-digit phone number starting with 0.");
      return;
    }
    
    console.log("Sending OTP to:", phone);
    // Simulate navigation to verify OTP
    router.push("/auth/verify-otp");
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");
    
    let hasError = false;
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Please enter a valid email address.");
      hasError = true;
    }
    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters.");
      hasError = true;
    }
    
    if (hasError) return;

    console.log("Logging in with email:", { email, password });
  };

  const handleGoogleSignIn = () => {
    console.log("Continue with Google clicked");
  };

  return (
    <div className="animate-in fade-in zoom-in-95 duration-500">
      {/* Page Header */}
      <div className="mb-8 text-center sm:text-left">
        <h1 className="font-display text-[28px] text-afs-black leading-none">Welcome back</h1>
        <p className="text-[14px] text-afs-gray-500 mt-2">Log in to your Afrostyle account</p>
      </div>

      {/* Login Method Toggle */}
      <div className="bg-afs-gray-100 p-1 rounded-full flex items-center mb-8">
        <button
          onClick={() => setLoginMethod('phone')}
          className={`flex-1 py-2 text-[13px] font-medium rounded-full transition-all ${
            loginMethod === 'phone' 
              ? 'bg-white text-afs-black shadow-sm' 
              : 'text-afs-gray-500 hover:text-afs-black hover:bg-black/5'
          }`}
        >
          Phone number
        </button>
        <button
          onClick={() => setLoginMethod('email')}
          className={`flex-1 py-2 text-[13px] font-medium rounded-full transition-all ${
            loginMethod === 'email' 
              ? 'bg-white text-afs-black shadow-sm' 
              : 'text-afs-gray-500 hover:text-afs-black hover:bg-black/5'
          }`}
        >
          Email address
        </button>
      </div>

      {/* Phone Login Form */}
      {loginMethod === 'phone' && (
        <form onSubmit={handlePhoneSubmit} className="space-y-5 animate-in slide-in-from-left-2 duration-300">
          <Input
            label="Phone number"
            type="tel"
            placeholder="0801 234 5678"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            error={phoneError}
            maxLength={11}
            className="pl-[84px]"
            icon={
              <div className="flex items-center justify-center bg-afs-gray-100 px-2 py-0.5 rounded text-[11px] font-bold text-afs-gray-600 tracking-wider">
                +234 NG
              </div>
            }
          />

          <button 
            type="submit"
            className="w-full bg-afs-black text-white font-bold text-[14px] py-3.5 rounded-lg shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            Send OTP
          </button>
        </form>
      )}

      {/* Email Login Form */}
      {loginMethod === 'email' && (
        <form onSubmit={handleEmailSubmit} className="space-y-5 animate-in slide-in-from-right-2 duration-300">
          <Input
            label="Email address"
            type="email"
            placeholder="you@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={emailError}
          />

          <div className="space-y-2">
            <div className="relative">
              <Input
                label="Password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={passwordError}
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
            <div className="flex justify-end">
              <Link href="/auth/forgot-password" className="text-[13px] font-medium text-afs-black hover:underline mt-1">
                Forgot password?
              </Link>
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-afs-black text-white font-bold text-[14px] py-3.5 rounded-lg shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            Log in
          </button>
        </form>
      )}

      {/* Divider */}
      <div className="flex items-center gap-4 my-8">
        <div className="flex-1 h-px bg-afs-gray-100"></div>
        <span className="text-[13px] text-afs-gray-400">or</span>
        <div className="flex-1 h-px bg-afs-gray-100"></div>
      </div>

      {/* Google Sign-in */}
      <button 
        onClick={handleGoogleSignIn}
        className="w-full flex items-center justify-center gap-3 bg-white border border-afs-gray-200 text-afs-black font-medium text-[14px] py-3.5 rounded-lg hover:bg-afs-gray-50 transition-colors shadow-sm"
      >
        <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center">
          <span className="text-[14px] font-bold text-blue-600 leading-none">G</span>
        </div>
        Continue with Google
      </button>

      {/* Footer */}
      <div className="mt-8 text-center text-[14px] text-afs-gray-600 pt-6 border-t border-afs-gray-100">
        Don't have an account?{" "}
        <Link href="/auth/signup" className="text-afs-black font-bold hover:underline">
          Sign up
        </Link>
      </div>
    </div>
  );
}
