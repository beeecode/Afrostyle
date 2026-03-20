"use client";

import React from "react";
import { Star, StarHalf, ShieldCheck, MapPin, Clock } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export interface TailorCardProps {
  name: string;
  avatar?: string;
  location: string;
  specialties: string[];
  rating: number;
  reviewCount: number;
  startingPrice: number;
  turnaroundDays: number;
  isVerified?: boolean;
  onBook?: () => void;
}

export const TailorCard: React.FC<TailorCardProps> = ({
  name,
  avatar,
  location,
  specialties,
  rating,
  reviewCount,
  startingPrice,
  turnaroundDays,
  isVerified,
  onBook,
}) => {
  // Generate initials fallback (up to 2 characters)
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star
          key={`full-${i}`}
          className="w-4 h-4 fill-afs-black text-afs-black"
        />
      );
    }
    if (hasHalfStar) {
      stars.push(
        <StarHalf
          key="half"
          className="w-4 h-4 fill-afs-black text-afs-black"
        />
      );
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} className="w-4 h-4 text-afs-gray-300" />
      );
    }

    return <div className="flex items-center space-x-0.5">{stars}</div>;
  };

  return (
    <Card padding="md" hover className="relative flex flex-col h-full bg-white">
      {/* Full card clickable overlay */}
      <a
        href="#"
        className="absolute inset-0 z-0"
        aria-label={`View ${name}'s profile`}
      />

      {/* Header section */}
      <div className="flex items-start gap-4 mb-4 relative z-10">
        <Avatar
          src={avatar}
          fallback={getInitials(name)}
          size="lg"
        />
        <div className="flex-1">
          <div className="flex items-center gap-1.5">
            <h3 className="text-lg font-display font-semibold text-afs-black line-clamp-1">
              {name}
            </h3>
            {isVerified && (
              <ShieldCheck className="w-4 h-4 text-white fill-afs-black shrink-0" />
            )}
          </div>
          <div className="flex items-center gap-1 text-afs-gray-500 text-sm mt-0.5">
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            <span className="line-clamp-1">{location}</span>
          </div>
          <div className="flex items-center gap-2 mt-1">
            {renderStars(rating)}
            <span className="text-sm font-medium text-afs-gray-500">
              ({reviewCount})
            </span>
          </div>
        </div>
      </div>

      {/* Specialties section */}
      <div className="mb-6 relative z-10 hidden sm:block">
        <div className="flex flex-wrap gap-2">
          {specialties.slice(0, 3).map((specialty) => (
            <Badge key={specialty} variant="default">
              {specialty}
            </Badge>
          ))}
          {specialties.length > 3 && (
            <Badge variant="default">+{specialties.length - 3}</Badge>
          )}
        </div>
      </div>
      
      {/* Mobile specialties (condensed) */}
      <div className="mb-4 relative z-10 sm:hidden">
         <span className="text-sm text-afs-gray-700 line-clamp-1">
           {specialties.join(", ")}
         </span>
      </div>

      {/* Footer section (Pricing and Booking) */}
      <div className="mt-auto pt-4 border-t border-afs-gray-100 flex items-center justify-between relative z-10">
        <div className="flex flex-col">
          <span className="text-xs font-medium text-afs-gray-500 mb-0.5 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {turnaroundDays} Days
          </span>
          <span className="text-afs-black font-semibold tracking-tight">
            From ₦{startingPrice.toLocaleString("en-US")}
          </span>
        </div>
        <Button
          variant="primary"
          size="sm"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onBook?.();
          }}
        >
          Book Now
        </Button>
      </div>
    </Card>
  );
};
