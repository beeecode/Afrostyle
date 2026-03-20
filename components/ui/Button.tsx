import React, { ButtonHTMLAttributes, ReactNode } from "react";
import { Loader2 } from "lucide-react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "destructive";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  icon?: ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "primary", size = "md", loading = false, icon, children, disabled, ...props }, ref) => {
    const baseClasses = "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-afs-black focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none rounded-md";

    const variantClasses = {
      primary: "bg-afs-black text-white hover:shadow-card",
      secondary: "bg-white border border-afs-gray-300 text-afs-black hover:bg-afs-gray-50",
      ghost: "bg-transparent text-afs-gray-500 hover:bg-afs-gray-100",
      destructive: "bg-[#B91C1C] text-white hover:shadow-card",
    };

    const sizeClasses = {
      sm: "h-9 px-3 text-sm",
      md: "h-11 px-6 text-base",
      lg: "h-14 px-8 text-lg",
    };

    const classes = [baseClasses, variantClasses[variant], sizeClasses[size], className].filter(Boolean).join(" ");

    return (
      <button ref={ref} className={classes} disabled={loading || disabled} aria-busy={loading} {...props}>
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />}
        {!loading && icon && <span className="mr-2 inline-flex" aria-hidden="true">{icon}</span>}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
