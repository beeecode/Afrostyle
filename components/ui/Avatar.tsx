"use client";

import React, { useState } from "react";

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  fallback: string;
  size?: "sm" | "md" | "lg" | "xl";
  alt?: string;
}

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className = "", src, fallback, size = "md", alt = "Avatar", ...props }, ref) => {
    const [imageError, setImageError] = useState(false);

    const sizeClasses = {
      sm: "w-8 h-8 text-xs",
      md: "w-10 h-10 text-sm",
      lg: "w-14 h-14 text-base",
      xl: "w-20 h-20 text-lg",
    };

    const baseClasses = "relative inline-flex items-center justify-center rounded-full overflow-hidden bg-afs-gray-100 text-afs-gray-700 font-medium shrink-0";

    const classes = [baseClasses, sizeClasses[size], className].filter(Boolean).join(" ");

    const showFallback = !src || imageError;

    return (
      <div ref={ref} className={classes} {...props}>
        {showFallback ? (
          <span aria-hidden="true" className="uppercase tracking-wider">
            {fallback.slice(0, 2)}
          </span>
        ) : (
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
          />
        )}
      </div>
    );
  }
);
Avatar.displayName = "Avatar";
