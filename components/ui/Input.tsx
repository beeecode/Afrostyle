import React, { InputHTMLAttributes, ReactNode, useId } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  icon?: ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", label, helperText, error, icon, disabled, id, ...props }, ref) => {
    const defaultId = useId();
    const inputId = id || defaultId;
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;

    const inputClasses = [
      "flex w-full rounded-md border text-sm transition-colors",
      "focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:bg-afs-gray-100 disabled:text-afs-gray-500",
      icon ? "pl-10 pr-3" : "px-3",
      "h-11",
      error 
        ? "border-red-500 text-red-900 focus-visible:border-red-500 focus-visible:ring-red-500" 
        : "border-afs-gray-300 text-afs-black focus-visible:border-afs-black focus-visible:ring-afs-black placeholder:text-afs-gray-500",
      className
    ].filter(Boolean).join(" ");

    return (
      <div className="w-full space-y-2">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-afs-black">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-afs-gray-500 pointer-events-none">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            className={inputClasses}
            aria-invalid={!!error}
            aria-describedby={
              [error ? errorId : undefined, helperText ? helperId : undefined].filter(Boolean).join(" ") || undefined
            }
            {...props}
          />
        </div>
        {error && (
          <p id={errorId} className="text-sm font-medium text-red-500">{error}</p>
        )}
        {!error && helperText && (
          <p id={helperId} className="text-sm text-afs-gray-500">{helperText}</p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";
