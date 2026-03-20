import React, { HTMLAttributes } from "react";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "flat";
  padding?: "none" | "sm" | "md" | "lg";
  hover?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className = "", variant = "default", padding = "md", hover = false, ...props }, ref) => {
    const baseClasses = "rounded-xl overflow-hidden";
    
    const variantClasses = {
      default: "bg-white border border-afs-gray-300",
      flat: "bg-afs-gray-50 border-0",
    };

    const paddingClasses = {
      none: "p-0",
      sm: "p-4",
      md: "p-6",
      lg: "p-8",
    };

    const hoverClasses = hover ? "hover:shadow-float hover:-translate-y-1 transition-all duration-200 cursor-pointer" : "";

    const classes = [
      baseClasses,
      variantClasses[variant],
      paddingClasses[padding],
      hoverClasses,
      className
    ].filter(Boolean).join(" ");

    return <div ref={ref} className={classes} {...props} />;
  }
);
Card.displayName = "Card";
