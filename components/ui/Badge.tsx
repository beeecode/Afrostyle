import React, { HTMLAttributes } from "react";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "success" | "warning" | "danger" | "info";
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className = "", variant = "default", ...props }, ref) => {
    const baseClasses = "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium";

    const variantClasses = {
      default: "bg-afs-gray-100 text-afs-gray-700",
      success: "bg-[#DCFCE7] text-[#166534]",
      warning: "bg-[#FEF3C7] text-[#92400E]",
      danger: "bg-[#FEE2E2] text-[#991B1B]",
      info: "bg-[#DBEAFE] text-[#1E40AF]",
    };

    const classes = [baseClasses, variantClasses[variant], className].filter(Boolean).join(" ");

    return <span ref={ref} className={classes} {...props} />;
  }
);
Badge.displayName = "Badge";
