"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { ArrowLeft, CheckCircle2, Eye, EyeOff } from "lucide-react";

export default function ForgotPasswordPage() {
  const router = useRouter();
  
  // Steps: 1 (phone), 2 (reset code + new password), 3 (success)
  const [resetStep, setResetStep] = useState<1 | 2 | 3>(1);

  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Validation
  const isPhoneValid = /^0\d{10}$/.test(phone);
  const isCodeValid = code.length === 6 && /^\d+$/.test(code);
  const isPasswordValid = password.length >= 8;
  const doPasswordsMatch = password === confirmPassword && confirmPassword.length > 0;
  
  const isStep2Valid = isCodeValid && isPasswordValid && doPasswordsMatch;

  const handleSendCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isPhoneValid) return;
    
    console.log("Sending reset code to:", phone);
    setResetStep(2);
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isStep2Valid) return;
    
    console.log("Resetting password with code:", code);
    setResetStep(3);
  };

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

  return (
    <div className="animate-in fade-in zoom-in-95 duration-500 max-w-[420px] mx-auto pb-12 w-full pt-4">
      {/* Back Button */}
      {resetStep !== 3 && (
        <Link 
          href="/auth/login"
          className="inline-flex items-center gap-2 text-[14px] font-medium text-afs-gray-600 hover:text-afs-black transition-colors mb-8 -ml-2 p-2 rounded-md hover:bg-afs-gray-50"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to login
        </Link>
      )}

      {/* SUCCESS STATE (Step 3) */}
      {resetStep === 3 ? (
        <div className="text-center py-12 animate-in zoom-in slide-in-from-bottom-4 duration-500">
          <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto mb-6" strokeWidth={2.5} />
          <h1 className="font-display text-[28px] text-afs-black leading-none mb-3">Password reset successfully</h1>
          <p className="text-[14px] text-afs-gray-500 mb-8 max-w-[280px] mx-auto">
            Log in with your new password to access your account.
          </p>
          <Link 
            href="/auth/login"
            className="w-full inline-flex flex-1 items-center justify-center bg-afs-black text-white font-bold text-[14px] py-3.5 rounded-lg shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            Go to login
          </Link>
        </div>
      ) : (
        <>
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="font-display text-[28px] text-afs-black leading-none mb-2">Reset your password</h1>
            <p className="text-[14px] text-afs-gray-500 pr-4">
              {resetStep === 1 
                ? "Enter your phone number and we'll send you a reset code" 
                : "Create a new password for your account"}
            </p>
          </div>

          {/* STEP 1 FORM */}
          {resetStep === 1 && (
            <form onSubmit={handleSendCode} className="space-y-6 animate-in slide-in-from-right-2 duration-300">
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

              <button 
                type="submit"
                disabled={!isPhoneValid}
                className={`w-full font-bold text-[14px] py-3.5 rounded-lg transition-all shadow-md ${
                  isPhoneValid 
                    ? 'bg-afs-black text-white hover:scale-[1.02] active:scale-[0.98]' 
                    : 'bg-afs-gray-100 text-afs-gray-400 cursor-not-allowed shadow-none'
                }`}
              >
                Send reset code
              </button>
            </form>
          )}

          {/* STEP 2 FORM */}
          {resetStep === 2 && (
            <form onSubmit={handleResetPassword} className="space-y-5 animate-in slide-in-from-right-4 duration-300">
              
              {/* Success Notice */}
              <div className="bg-afs-gray-50 rounded-md p-3 flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                <span className="text-[13px] text-afs-gray-600 font-medium tracking-wide">
                  Code sent to <span className="text-afs-black font-bold">+234 {phone.slice(1)}</span>
                </span>
              </div>

              <Input
                label="Reset code"
                type="text"
                placeholder="Enter 6-digit code"
                inputMode="numeric"
                maxLength={6}
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
              />

              {/* Password Field */}
              <div className="space-y-2">
                <div className="relative">
                  <Input
                    label="New password"
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

              {/* Confirm Password Field */}
              <div className="relative">
                <Input
                  label="Confirm new password"
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

              <button 
                type="submit"
                disabled={!isStep2Valid}
                className={`w-full font-bold text-[14px] py-3.5 rounded-lg transition-all shadow-md mt-4 ${
                  isStep2Valid 
                    ? 'bg-afs-black text-white hover:scale-[1.02] active:scale-[0.98]' 
                    : 'bg-afs-gray-100 text-afs-gray-400 cursor-not-allowed shadow-none'
                }`}
              >
                Reset password
              </button>
            </form>
          )}
        </>
      )}
    </div>
  );
}
