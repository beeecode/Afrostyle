"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";

export default function VerifyOtpPage() {
  const router = useRouter();
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  
  const [countdown, setCountdown] = useState(45);
  const [isVerifying, setIsVerifying] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [failedAttempts, setFailedAttempts] = useState(0);

  // Timer
  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => setCountdown(prev => prev - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [countdown]);

  // Handle Input Changes
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target;
    // Keep only numbers
    const cleanValue = value.replace(/\D/g, "");
    if (!cleanValue && value !== "") return; // Ignore non-numeric typing

    const newOtp = [...otp];
    // Take just the last character (handles case where user types in already filled box)
    newOtp[index] = cleanValue.slice(-1); 
    setOtp(newOtp);
    setErrorMsg("");

    // Move to next input if filled and not at the end
    if (cleanValue && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle Keyboard Navigation (Backspace & Arrows)
  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      const newOtp = [...otp];
      
      if (otp[index]) {
        // Clear current box if it has a value
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        // If empty, move focus back and clear previous box
        newOtp[index - 1] = "";
        setOtp(newOtp);
        inputRefs.current[index - 1]?.focus();
      }
      setErrorMsg("");
    } else if (e.key === "ArrowLeft" && index > 0) {
      e.preventDefault();
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < 5) {
      e.preventDefault();
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle Paste Event
  const handleOnPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").replace(/\s/g, "");
    
    // Only process if it contains digits
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = [...otp];
    const pasteCount = Math.min(6, pastedData.length);
    for (let i = 0; i < pasteCount; i++) {
        newOtp[i] = pastedData[i];
    }
    setOtp(newOtp);
    setErrorMsg("");
    
    // Auto-focus the next appropriate input
    const nextIndex = pasteCount < 6 ? pasteCount : 5;
    inputRefs.current[nextIndex]?.focus();
  };

  // Auto-submit when all 6 digits are precisely filled
  useEffect(() => {
    const isComplete = otp.every(val => val !== "");
    if (isComplete && !isVerifying && failedAttempts < 3) {
      const timer = setTimeout(() => {
        handleVerify();
      }, 300);
      return () => clearTimeout(timer);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [otp]);

  const handleVerify = () => {
    if (failedAttempts >= 3) return;
    
    setIsVerifying(true);
    setErrorMsg("");

    const code = otp.join("");
    
    setTimeout(() => {
      setIsVerifying(false);
      
      if (code === "123456") {
        // Simulated navigation - directing to customer dashboard based on scenario
        console.log("OTP verified successfully!");
        router.push("/customer/dashboard");
      } else {
        const newAttempts = failedAttempts + 1;
        setFailedAttempts(newAttempts);
        if (newAttempts >= 3) {
          setErrorMsg("Too many attempts. Request a new code.");
        } else {
          setErrorMsg("Incorrect code. Please try again.");
          // Automatically clear OTP on error to let user retry easily
          setOtp(Array(6).fill(""));
          inputRefs.current[0]?.focus();
        }
      }
    }, 1200);
  };

  const handleResend = () => {
    if (countdown === 0 && failedAttempts < 3) {
      console.log("Resending OTP...");
      setCountdown(45);
      setErrorMsg("");
      setOtp(Array(6).fill(""));
      inputRefs.current[0]?.focus();
    }
  };

  const isComplete = otp.every(val => val !== "");
  const isDisabled = failedAttempts >= 3;

  return (
    <div className="flex flex-col w-full animate-in fade-in zoom-in-95 duration-500 max-w-[360px] mx-auto pt-6">
      {/* Back Button */}
      <button 
        onClick={() => router.back()}
        className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-afs-gray-50 text-afs-gray-600 hover:text-afs-black transition-colors mb-4 -ml-2"
        aria-label="Go back"
      >
        <ArrowLeft className="w-5 h-5" />
      </button>

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="font-display text-[28px] text-afs-black leading-none mb-2">Verify your number</h1>
        <p className="text-[14px] text-afs-gray-500 leading-relaxed">
          We sent a 6-digit code to <span className="font-bold text-afs-black">+234 801 234 5678</span>
        </p>
      </div>

      {/* OTP Input Fields */}
      <div className="flex justify-between items-center gap-2 mb-2">
        {otp.map((value, index) => {
          // Dynamic styles based on states
          let inputClass = "w-[52px] h-[60px] rounded-md border text-center font-display text-[24px] outline-none transition-all ";
          
          if (isDisabled) {
             inputClass += "bg-afs-gray-50 border-afs-gray-200 text-afs-gray-400 cursor-not-allowed";
          } else if (errorMsg && errorMsg !== "Too many attempts. Request a new code.") {
             inputClass += "border-[#B91C1C] bg-[#FEE2E2] text-[#B91C1C]";
          } else if (value) {
             inputClass += "bg-afs-gray-50 border-afs-black text-afs-black";
          } else {
             inputClass += "bg-white border-afs-gray-300 text-afs-black focus:border-[2px] focus:border-afs-black";
          }

          return (
            <input
              key={`otp-${index}`}
              ref={el => { inputRefs.current[index] = el; }}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={value}
              disabled={isDisabled || isVerifying}
              onChange={(e) => handleOnChange(e, index)}
              onKeyDown={(e) => handleOnKeyDown(e, index)}
              onPaste={handleOnPaste}
              className={inputClass}
            />
          );
        })}
      </div>

      {/* Error / Warning Message */}
      <div className="h-6 flex items-start mt-1 mb-6">
        {errorMsg ? (
          <p className="text-[13px] text-[#B91C1C] font-medium animate-in slide-in-from-top-1 fade-in">
            {errorMsg}
          </p>
        ) : null}
      </div>

      {/* Verify Button */}
      <button 
        onClick={handleVerify}
        disabled={!isComplete || isDisabled || isVerifying}
        className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-lg shadow-sm font-bold text-[14px] transition-all mb-8 ${
          isComplete && !isDisabled && !isVerifying
            ? 'bg-afs-black text-white hover:scale-[1.02] active:scale-[0.98]' 
            : 'bg-afs-gray-100 text-afs-gray-400 cursor-not-allowed'
        }`}
      >
        {isVerifying ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin text-white" />
            <span>Verifying...</span>
          </>
        ) : (
          <span>Verify & Continue</span>
        )}
      </button>

      {/* Resend Code Section */}
      <div className="text-center">
        <p className="text-[13px] text-afs-gray-500 mb-1">Didn't receive a code?</p>
        {countdown > 0 ? (
          <span className="text-[13px] font-medium text-afs-gray-400">Resend in {countdown}s</span>
        ) : (
          <button 
            onClick={handleResend}
            disabled={isDisabled}
            className={`text-[13px] font-medium transition-all ${
              isDisabled 
                ? 'text-afs-gray-400 cursor-not-allowed' 
                : 'text-afs-black hover:underline cursor-pointer'
            }`}
          >
            Resend OTP
          </button>
        )}
      </div>
    </div>
  );
}
