"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { 
  ShoppingBag, 
  Wallet, 
  Heart, 
  PackageCheck, 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  ExternalLink,
  ChevronRight,
  Star,
  Calendar,
  ShieldCheck,
  ShieldAlert,
  MessageSquare,
  X,
  Plus,
  AlertCircle,
  ChevronDown,
  Upload,
  Settings
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { TailorCard } from "@/components/features/TailorCard";
import { OrderStageTracker } from "@/components/features/OrderStageTracker";
import { useCustomerDashboard } from "./CustomerDashboardContext";

// --- MOCK DATA ---
const CUSTOMER_MOCK = {
  name: 'Chidinma Obi',
  totalOrders: 6,
  activeOrders: 2,
  totalSpent: 198000,
  savedTailors: 4,
}

const ORDERS_MOCK = [
  {
    id: 'o1',
    tailor: 'Amaka Obi Designs',
    item: 'Bridal gown',
    stage: 'stitching',
    date: 'Mar 10, 2026',
    dueDate: 'Mar 22, 2026',
    totalAmount: 85000,
    depositPaid: 42500,
    balanceDue: 42500,
    escrowStatus: 'held',       // 'held' | 'released' | 'disputed'
    readyForConfirm: false,
    daysUntilAutoRelease: null,
    reviewed: false,
  },
  {
    id: 'o2',
    tailor: 'Kunle Threads',
    item: 'Senator suit',
    stage: 'ready',
    date: 'Mar 05, 2026',
    dueDate: 'Mar 20, 2026',
    totalAmount: 35000,
    depositPaid: 17500,
    balanceDue: 17500,
    escrowStatus: 'held',
    readyForConfirm: true,
    daysUntilAutoRelease: 5,
    reviewed: false,
  },
  {
    id: 'o3',
    tailor: 'Zara Couture NG',
    item: 'Evening gown',
    stage: 'delivered',
    date: 'Jan 15, 2026',
    dueDate: 'Feb 10, 2026',
    totalAmount: 48000,
    depositPaid: 24000,
    balanceDue: 24000,
    escrowStatus: 'released',
    readyForConfirm: false,
    daysUntilAutoRelease: null,
    completedDate: 'Feb 10, 2026',
    reviewed: true,
  },
  {
    id: 'o4',
    tailor: 'Amaka Obi Designs',
    item: 'Ankara dress',
    stage: 'delivered',
    date: 'Dec 20, 2025',
    dueDate: 'Jan 05, 2026',
    totalAmount: 22000,
    depositPaid: 11000,
    balanceDue: 11000,
    escrowStatus: 'released',
    readyForConfirm: false,
    daysUntilAutoRelease: null,
    completedDate: 'Jan 5, 2026',
    reviewed: false,
  },
  {
    id: 'o5',
    tailor: 'Classic Cuts',
    item: 'Agbada set',
    stage: 'ready',
    date: 'Feb 28, 2026',
    dueDate: 'Mar 15, 2026',
    totalAmount: 65000,
    depositPaid: 32500,
    balanceDue: 32500,
    escrowStatus: 'disputed',
    readyForConfirm: true,
    daysUntilAutoRelease: null,
    reviewed: false,
  }
];

const PAYMENT_HISTORY = [
  { id: 'p1', type: 'deposit', item: 'Bridal gown',   tailor: 'Amaka Obi Designs', amount: 42500, date: 'Mar 10, 2026', status: 'held_escrow',  ref: 'PSK-384729' },
  { id: 'p2', type: 'deposit', item: 'Senator suit',  tailor: 'Kunle Threads',      amount: 17500, date: 'Mar 8,  2026', status: 'held_escrow',  ref: 'PSK-384102' },
  { id: 'p3', type: 'full',    item: 'Evening gown',  tailor: 'Zara Couture NG',    amount: 48000, date: 'Feb 10, 2026', status: 'released',     ref: 'PSK-371845' },
  { id: 'p4', type: 'deposit', item: 'Ankara dress',  tailor: 'Amaka Obi Designs',  amount: 11000, date: 'Jan 4,  2026', status: 'released',     ref: 'PSK-358291' },
  {
    id: 'p5', type: 'balance', item: 'Ankara dress',  tailor: 'Amaka Obi Designs',  amount: 11000, date: 'Jan 5,  2026', status: 'released',     ref: 'PSK-358302' },
];

const SAVED_TAILORS_MOCK = [
  { id: '1', name: 'Amaka Obi Designs', location: 'Ikeja, Lagos',     specialties: ['Ankara', 'Bridal'],     rating: 4.8, reviewCount: 124, startingPrice: 15000, turnaroundDays: 7,  isVerified: true  },
  { id: '2', name: 'Kunle Threads',      location: 'Surulere, Lagos',  specialties: ['Agbada', 'Senator'],    rating: 4.6, reviewCount: 89,  startingPrice: 20000, turnaroundDays: 10, isVerified: true  },
  { id: '6', name: 'House of Chukwu',    location: 'Abuja',            specialties: ['Agbada', 'Bridal'],     rating: 4.9, reviewCount: 312, startingPrice: 40000, turnaroundDays: 10, isVerified: true  },
  { id: '8', name: 'Folake Premium',     location: 'Ibadan',           specialties: ['Bridal', 'Ankara'],     rating: 4.7, reviewCount: 95,  startingPrice: 18000, turnaroundDays: 8,  isVerified: true  },
];

const MY_REVIEWS_MOCK = [
  { id: 'r1', tailor: 'Zara Couture NG',   item: 'Evening gown',  date: 'Feb 10, 2026', rating: 5, comment: 'Absolutely stunning work. Will definitely be back.' },
];

const PENDING_REVIEWS_MOCK = [
  { id: 'pr1', tailor: 'Amaka Obi Designs', item: 'Ankara dress', completedDate: 'Jan 5, 2026' },
];

// --- COMPONENTS ---

// 1. Dispute Modal
function DisputeModal({ order, onClose, onSubmit }: { order: any, onClose: () => void, onSubmit: (data: any) => void }) {
  const [reason, setReason] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ reason, description });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-deep w-full max-w-[520px] overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between px-6 py-4 border-b border-afs-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
            </div>
            <h2 className="font-display text-[20px] text-afs-black">Raise a Dispute</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-afs-gray-100 rounded-full transition-colors text-afs-gray-400">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="bg-afs-gray-50 rounded-lg p-4 mb-6 border border-afs-gray-100">
            <div className="text-[13px] text-afs-gray-600 font-medium">
              Order: <span className="text-afs-black">{order.item}</span> &middot; 
              Tailor: <span className="text-afs-black">{order.tailor}</span> &middot; 
              Amount: <span className="text-afs-black font-semibold">₦{order.balanceDue.toLocaleString()}</span>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="text-[13px] font-bold text-afs-gray-700 mb-2 uppercase tracking-wide">How it works</h4>
            <ol className="space-y-2 text-[13px] text-afs-gray-600 list-decimal pl-4">
              <li>You describe the issue in detail below.</li>
              <li>Afrostyle admin reviews your claim within 48 hours.</li>
              <li>Admin may contact both parties for more information.</li>
              <li>Admin makes a final decision on payment release.</li>
            </ol>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-[13px] font-medium text-afs-gray-700">Reason for dispute</label>
              <div className="relative">
                <select 
                  className="w-full h-11 px-4 bg-white border border-afs-gray-200 rounded-lg text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-afs-black/5"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  required
                >
                  <option value="">Select a reason</option>
                  <option value="item-not-described">Item not as described</option>
                  <option value="wrong-measurements">Wrong measurements</option>
                  <option value="poor-quality">Poor quality</option>
                  <option value="not-delivered">Item not delivered</option>
                  <option value="other">Other</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-afs-gray-400 pointer-events-none" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[13px] font-medium text-afs-gray-700">Describe the issue</label>
              <textarea 
                className="w-full px-4 py-3 bg-white border border-afs-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-afs-black/5 min-h-[120px]"
                placeholder="Please provide as much detail as possible..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[13px] font-medium text-afs-gray-700">Photo evidence (optional)</label>
              <div className="border-2 border-dashed border-afs-gray-200 rounded-lg h-[80px] flex flex-col items-center justify-center gap-1 hover:bg-afs-gray-50 transition-colors cursor-pointer group">
                <Upload className="w-5 h-5 text-afs-gray-400 group-hover:text-afs-black" />
                <span className="text-[12px] text-afs-gray-500 group-hover:text-afs-black">Upload photos</span>
              </div>
            </div>

            <div className="bg-red-50 rounded-lg p-3 flex gap-2 border border-red-100">
              <AlertCircle className="w-4 h-4 text-red-700 shrink-0 mt-0.5" />
              <p className="text-[12px] text-red-800 leading-tight">
                False disputes may result in account suspension. Please ensure your claim is valid.
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <Button type="button" variant="ghost" className="flex-1" onClick={onClose}>Cancel</Button>
              <Button type="submit" className="flex-1 bg-[#B91C1C] hover:bg-[#991B1B] text-white">
                <AlertTriangle className="w-4 h-4 mr-2" />
                Submit Dispute
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// 2. Review Modal
function ReviewModal({ item, onClose, onSubmit }: { item: any, onClose: () => void, onSubmit: (data: any) => void }) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");

  const ratingLabels: Record<number, string> = {
    1: "Poor",
    2: "Fair",
    3: "Good",
    4: "Very good",
    5: "Excellent"
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) return;
    onSubmit({ rating, comment });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-deep w-full max-w-[500px] overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between px-6 py-4 border-b border-afs-gray-100">
          <h2 className="font-display text-[20px] text-afs-black">Review {item.tailor}</h2>
          <button onClick={onClose} className="p-2 hover:bg-afs-gray-100 rounded-full transition-colors text-afs-gray-400">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="text-[13px] text-afs-gray-500 mb-8">
            For: <span className="text-afs-black font-medium">{item.item}</span> &middot; Completed {item.completedDate}
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col items-center gap-8">
            <div className="flex flex-col items-center gap-3">
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setRating(star)}
                    className="p-1 transition-transform active:scale-90"
                  >
                    <Star 
                      className={`w-10 h-10 transition-colors ${
                        star <= (hoverRating || rating) 
                          ? 'fill-[#D48B28] text-[#D48B28]' 
                          : 'text-afs-gray-200'
                      }`} 
                    />
                  </button>
                ))}
              </div>
              <span className={`text-sm font-medium ${rating > 0 ? 'text-afs-black' : 'text-afs-gray-400'}`}>
                {rating > 0 ? ratingLabels[rating] : "Select a rating"}
              </span>
            </div>

            <div className="w-full space-y-1.5">
              <label className="text-[13px] font-medium text-afs-gray-700">Your review</label>
              <textarea 
                className="w-full px-4 py-3 bg-white border border-afs-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-afs-black/5 min-h-[120px]"
                placeholder="Share your experience with this tailor..."
                maxLength={500}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
              />
              <div className="flex justify-end">
                <span className="text-[11px] text-afs-gray-400">{comment.length} / 500</span>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full pt-2">
              <Button type="button" variant="ghost" className="flex-1" onClick={onClose}>Cancel</Button>
              <Button type="submit" disabled={rating === 0} className="flex-1 bg-afs-black text-white hover:bg-afs-black/90 disabled:opacity-50">
                Submit Review
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// 2. Saved Tailors Tab Content
function SavedTailorsTab() {
  const [savedTailors, setSavedTailors] = useState(SAVED_TAILORS_MOCK);

  const handleUnsave = (id: string) => {
    setSavedTailors(prev => prev.filter(t => t.id !== id));
    console.log('Unsaved tailor:', id);
  };

  return (
    <div className="flex flex-col gap-6 animate-in slide-in-from-bottom-2 duration-400">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-baseline gap-2">
          <h2 className="font-display text-[24px] text-afs-black leading-none">Saved Tailors</h2>
          <span className="text-[16px] text-afs-gray-400 font-medium">({savedTailors.length})</span>
        </div>
      </div>

      {savedTailors.length === 0 ? (
        <div className="bg-white border border-afs-gray-100 rounded-xl p-16 text-center flex flex-col items-center gap-4 shadow-sm">
          <div className="w-16 h-16 rounded-full bg-afs-gray-50 flex items-center justify-center">
            <Heart className="w-8 h-8 text-afs-gray-200" />
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="font-display text-[20px] text-afs-black">No saved tailors yet</h3>
            <p className="text-afs-gray-500 text-sm">Explore and save tailors to see them here.</p>
          </div>
          <Link href="/discover" className="mt-2">
            <Button className="bg-afs-black text-white px-8">Browse tailors</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {savedTailors.map(tailor => (
            <div key={tailor.id} className="relative group">
              <TailorCard {...tailor} onBook={() => console.log('Booking', tailor.name)} />
              <button 
                onClick={() => handleUnsave(tailor.id)}
                className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center text-red-500 hover:scale-110 transition-transform border border-afs-gray-100"
                title="Remove from saved"
              >
                <Heart className="w-4 h-4 fill-current" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// 3. Reviews Tab Content
function ReviewsTab() {
  const [pendingReviews, setPendingReviews] = useState(PENDING_REVIEWS_MOCK);
  const [myReviews, setMyReviews] = useState(MY_REVIEWS_MOCK);
  const [reviewItem, setReviewItem] = useState<any | null>(null);

  const handleReviewSubmit = (data: { rating: number, comment: string }) => {
    if (!reviewItem) return;
    
    const newReview = {
      id: `r${Date.now()}`,
      tailor: reviewItem.tailor,
      item: reviewItem.item,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      ...data
    };

    setMyReviews([newReview, ...myReviews]);
    setPendingReviews(prev => prev.filter(p => p.id !== reviewItem.id));
    setReviewItem(null);
    console.log('Review submitted:', newReview);
  };

  return (
    <div className="flex flex-col gap-10 animate-in slide-in-from-bottom-2 duration-400 pb-12">
      
      {/* Pending Reviews */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <h3 className="text-[17px] font-semibold text-afs-black">Awaiting your review</h3>
          {pendingReviews.length > 0 && (
            <Badge variant="warning" className="bg-amber-50 text-amber-700 border-none px-2.5 py-0.5 text-[11px] font-bold">
              {pendingReviews.length} PENDING
            </Badge>
          )}
        </div>

        {pendingReviews.length === 0 ? (
          <p className="text-sm text-afs-gray-400 italic">No pending reviews at the moment.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {pendingReviews.map(p => (
              <div key={p.id} className="bg-white border border-afs-gray-100 rounded-xl p-5 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
                <div className="flex items-center gap-4">
                  <Avatar fallback={p.tailor} className="bg-afs-gray-50 border border-afs-gray-100" />
                  <div className="flex flex-col">
                    <span className="text-[15px] font-semibold text-afs-black">{p.tailor}</span>
                    <span className="text-[13px] text-afs-gray-500">{p.item} &middot; Completed {p.completedDate}</span>
                  </div>
                </div>
                <Button 
                  onClick={() => setReviewItem(p)}
                  className="w-full sm:w-auto bg-white border border-afs-gray-200 text-afs-black hover:bg-afs-gray-50 px-6 h-10 shadow-sm"
                >
                  <Star className="w-4 h-4 mr-2 fill-amber-400 text-amber-400" />
                  Leave a Review
                </Button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Existing Reviews */}
      <section>
        <h3 className="text-[16px] font-medium text-afs-black mb-6">Reviews you've written</h3>
        
        <div className="flex flex-col gap-6">
          {myReviews.length === 0 ? (
            <div className="bg-afs-gray-50/50 border border-dashed border-afs-gray-200 rounded-xl p-12 text-center text-afs-gray-400">
              You haven't written any reviews yet.
            </div>
          ) : (
            myReviews.map(r => (
              <div key={r.id} className="bg-white border border-afs-gray-100 rounded-xl p-6 shadow-sm hover:shadow-card transition-all relative group">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <Avatar fallback={r.tailor} size="sm" className="bg-afs-gray-50" />
                    <div className="flex flex-col">
                      <span className="text-[14px] font-bold text-afs-black leading-tight">{r.tailor}</span>
                      <span className="text-[12px] text-afs-gray-500">{r.item} &middot; {r.date}</span>
                    </div>
                  </div>
                  <button onClick={() => console.log('Edit review', r.id)} className="p-1.5 text-afs-gray-400 hover:text-afs-black opacity-0 group-hover:opacity-100 transition-opacity">
                    <Settings className="w-4 h-4" /> {/* Replacing Edit2 with Settings or Pencil if available, user said Edit2 but pencil is standard */}
                  </button>
                </div>

                <div className="flex items-center gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className={`w-3.5 h-3.5 ${s <= r.rating ? 'fill-afs-black text-afs-black' : 'text-afs-gray-200'}`} />
                  ))}
                </div>

                <p className="text-[15px] text-afs-gray-700 leading-relaxed italic">
                  "{r.comment}"
                </p>
              </div>
            ))
          )}
        </div>
      </section>

      {reviewItem && (
        <ReviewModal 
          item={reviewItem} 
          onClose={() => setReviewItem(null)} 
          onSubmit={handleReviewSubmit} 
        />
      )}
    </div>
  );
}

// 4. Payments Tab Content
function PaymentsTab() {
  const stats = {
    totalSpent: 198000,
    inEscrow: 60000,
    released: 138000,
  };

  return (
    <div className="flex flex-col gap-8 animate-in slide-in-from-bottom-2 duration-400">
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-afs-gray-100 rounded-lg p-5 flex flex-col shadow-card">
          <span className="text-[13px] text-afs-gray-500 mb-2">Total spent</span>
          <span className="font-display text-[28px] text-afs-black leading-none mb-1">₦{stats.totalSpent.toLocaleString()}</span>
          <span className="text-[12px] text-afs-gray-400">All time total</span>
        </div>
        <div className="bg-white border border-afs-gray-100 rounded-lg p-5 flex flex-col shadow-card">
          <div className="flex justify-between items-start mb-2">
            <span className="text-[13px] text-afs-gray-500">In escrow</span>
            <Badge variant="info" className="bg-blue-50 text-blue-600 border-none text-[10px] py-0 px-2 font-bold uppercase tracking-wider">Protected</Badge>
          </div>
          <span className="font-display text-[28px] text-afs-black leading-none mb-1">₦{stats.inEscrow.toLocaleString()}</span>
          <span className="text-[12px] text-afs-gray-400">Currently held</span>
        </div>
        <div className="bg-white border border-afs-gray-100 rounded-lg p-5 flex flex-col shadow-card">
          <span className="text-[13px] text-afs-gray-500 mb-2">Released</span>
          <span className="font-display text-[28px] text-afs-black leading-none mb-1">₦{stats.released.toLocaleString()}</span>
          <span className="text-[12px] text-afs-gray-400">Paid to tailors</span>
        </div>
      </div>

      {/* Escrow Explainer Box */}
      <div className="bg-afs-gray-50 border border-afs-gray-200 rounded-xl p-6 flex flex-col md:flex-row gap-6 md:items-start shadow-sm">
        <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm">
          <ShieldCheck className="w-6 h-6 text-afs-black" />
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="text-[15px] font-semibold text-afs-black">How escrow protects you</h3>
          <ul className="space-y-3">
            {[
              "Your deposit is held securely — the tailor never receives it until you confirm",
              "If there's a problem, raise a dispute and admin will review within 48 hours",
              "If you don't respond within 7 days of pickup, payment auto-releases to the tailor"
            ].map((text, i) => (
              <li key={i} className="flex gap-3 text-[13px] text-afs-gray-600 leading-snug">
                <CheckCircle className="w-4 h-4 text-afs-black shrink-0 mt-0.5" />
                <span>{text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Payment History Table */}
      <section>
        <div className="flex items-center justify-between mb-4 px-1">
          <h3 className="text-[16px] font-medium text-afs-black">Payment history</h3>
          <Button variant="ghost" size="sm" className="text-afs-gray-500 hover:text-afs-black text-[13px]">
            <Plus className="w-4 h-4 mr-2 rotate-45" /> {/* Using Plus rotated as a dummy download/export icon or could use Lucide Download */}
            <span className="hidden sm:inline">Export</span>
          </Button>
        </div>

        <div className="bg-white border border-afs-gray-100 rounded-xl overflow-x-auto shadow-sm">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-afs-gray-100 bg-afs-gray-50/50">
                <th className="px-6 py-4 text-[12px] font-bold text-afs-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-[12px] font-bold text-afs-gray-500 uppercase tracking-wider">Item</th>
                <th className="px-6 py-4 text-[12px] font-bold text-afs-gray-500 uppercase tracking-wider">Tailor</th>
                <th className="px-6 py-4 text-[12px] font-bold text-afs-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-4 text-[12px] font-bold text-afs-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-4 text-[12px] font-bold text-afs-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-[12px] font-bold text-afs-gray-500 uppercase tracking-wider text-right">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-afs-gray-50">
              {PAYMENT_HISTORY.map((p) => (
                <tr key={p.id} className="hover:bg-afs-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col">
                      <span className="text-[13px] font-medium text-afs-black">{p.date}</span>
                      <span className="text-[11px] text-afs-gray-400">Ref: {p.ref}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[13px] text-afs-gray-600">{p.item}</td>
                  <td className="px-6 py-4 text-[13px] text-afs-black font-medium">{p.tailor}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {p.type === 'deposit' && <Badge variant="default" className="bg-afs-gray-100 text-afs-gray-700 border-none text-[10px] font-bold uppercase tracking-wider">Deposit</Badge>}
                    {p.type === 'balance' && <Badge variant="info" className="bg-blue-50 text-blue-700 border-none text-[10px] font-bold uppercase tracking-wider">Balance</Badge>}
                    {p.type === 'full' && <Badge variant="success" className="bg-green-50 text-green-700 border-none text-[10px] font-bold uppercase tracking-wider">Full payment</Badge>}
                  </td>
                  <td className="px-6 py-4 text-[13px] font-bold text-afs-black">₦{p.amount.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {p.status === 'held_escrow' && <Badge variant="warning" className="bg-amber-50 text-amber-700 border-none text-[10px] font-bold uppercase tracking-wider">In escrow</Badge>}
                    {p.status === 'released' && <Badge variant="success" className="bg-green-50 text-green-700 border-none text-[10px] font-bold uppercase tracking-wider">Released</Badge>}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => console.log('download receipt', p.ref)}
                      className="p-2 text-afs-gray-400 hover:text-afs-black hover:bg-white rounded-md transition-all shadow-sm border border-transparent hover:border-afs-gray-100"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="mt-8 pt-12 border-t border-afs-gray-100">
        <h3 className="text-[18px] font-display text-center text-afs-black mb-8">How payments work</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { step: 1, title: 'Pay deposit', text: '50% upfront, held safely in escrow' },
            { step: 2, title: 'Tailor works', text: 'Track your order at every stage' },
            { step: 3, title: 'Confirm & release', text: 'Approve the work to release full payment' }
          ].map((s) => (
            <div key={s.step} className="bg-white border border-afs-gray-100 rounded-xl p-6 flex flex-col items-center text-center shadow-sm">
              <div className="w-10 h-10 rounded-full bg-afs-black text-white flex items-center justify-center font-bold text-sm mb-4">
                {s.step}
              </div>
              <h4 className="text-[15px] font-bold text-afs-black mb-1">{s.title}</h4>
              <p className="text-[13px] text-afs-gray-500">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}

// 3. Orders Tab Content
function OrdersTab() {
  const [filter, setFilter] = useState('all');
  const [confirmingRelease, setConfirmingRelease] = useState<string | null>(null);
  const [disputeOrder, setDisputeOrder] = useState<any | null>(null);

  const filteredOrders = useMemo(() => {
    switch (filter) {
      case 'active': return ORDERS_MOCK.filter(o => o.stage !== 'delivered' && o.escrowStatus !== 'disputed');
      case 'ready': return ORDERS_MOCK.filter(o => o.readyForConfirm && o.escrowStatus === 'held');
      case 'completed': return ORDERS_MOCK.filter(o => o.stage === 'delivered');
      case 'disputed': return ORDERS_MOCK.filter(o => o.escrowStatus === 'disputed');
      default: return ORDERS_MOCK;
    }
  }, [filter]);

  const counts = {
    all: ORDERS_MOCK.length,
    active: ORDERS_MOCK.filter(o => o.stage !== 'delivered' && o.escrowStatus !== 'disputed').length,
    ready: ORDERS_MOCK.filter(o => o.readyForConfirm && o.escrowStatus === 'held').length,
    completed: ORDERS_MOCK.filter(o => o.stage === 'delivered').length,
    disputed: ORDERS_MOCK.filter(o => o.escrowStatus === 'disputed').length,
  };

  const handleConfirmRelease = (orderId: string) => {
    console.log('Payment released for order:', orderId);
    setConfirmingRelease(null);
  };

  const handleDisputeSubmit = (data: any) => {
    console.log('Dispute submitted for', disputeOrder?.id, ':', data);
    setDisputeOrder(null);
  };

  return (
    <div className="flex flex-col gap-6 animate-in slide-in-from-bottom-2 duration-400">
      
      {/* Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {[
          { id: 'all', label: 'All' },
          { id: 'active', label: 'Active' },
          { id: 'ready', label: 'Ready to Confirm' },
          { id: 'completed', label: 'Completed' },
          { id: 'disputed', label: 'Disputed' }
        ].map((p) => (
          <button
            key={p.id}
            onClick={() => setFilter(p.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all whitespace-nowrap ${
              filter === p.id 
                ? 'bg-afs-black border-afs-black text-white' 
                : 'bg-white border-afs-gray-200 text-afs-gray-600 hover:border-afs-gray-400'
            }`}
          >
            <span className="text-sm font-medium">{p.label}</span>
            <span className={`text-[11px] px-1.5 py-0.5 rounded-full ${
              filter === p.id ? 'bg-white/20 text-white' : 'bg-afs-gray-100 text-afs-gray-500'
            }`}>
              {(counts as any)[p.id]}
            </span>
          </button>
        ))}
      </div>

      {/* Orders List */}
      <div className="flex flex-col gap-6">
        {filteredOrders.length === 0 ? (
          <div className="bg-white border border-afs-gray-100 rounded-xl p-12 text-center flex flex-col items-center gap-3">
            <ShoppingBag className="w-12 h-12 text-afs-gray-200" />
            <p className="text-afs-gray-500">No orders found matching this filter.</p>
          </div>
        ) : (
          filteredOrders.map(order => (
            <div key={order.id} className="bg-white border border-afs-gray-100 rounded-xl shadow-card flex flex-col overflow-hidden">
              
              {/* Header Strip */}
              <div className="bg-afs-gray-50 px-6 py-4 flex items-center justify-between border-b border-afs-gray-100">
                <div className="flex items-center gap-3">
                  <Avatar fallback={order.tailor} size="sm" className="bg-white border border-afs-gray-200" />
                  <div className="flex flex-col">
                    <span className="text-[14px] font-semibold text-afs-black leading-tight">{order.tailor}</span>
                    <span className="text-[12px] text-afs-gray-500">{order.item}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-[12px] text-afs-gray-500 font-medium">Ordered {order.date}</span>
                  {order.stage === 'booked' && <Badge variant="default" className="bg-afs-gray-200 text-afs-gray-700 border-none uppercase text-[10px] py-0.5 font-bold">Booked</Badge>}
                  {(['measuring', 'cutting', 'stitching', 'finishing'].includes(order.stage)) && <Badge variant="info" className="bg-blue-100 text-blue-700 border-none uppercase text-[10px] py-0.5 font-bold">In progress</Badge>}
                  {order.stage === 'ready' && <Badge variant="warning" className="bg-amber-100 text-amber-700 border-none uppercase text-[10px] py-0.5 font-bold">Ready</Badge>}
                  {order.stage === 'delivered' && <Badge variant="success" className="bg-green-100 text-green-700 border-none uppercase text-[10px] py-0.5 font-bold">Completed</Badge>}
                </div>
              </div>

              {/* Body */}
              <div className="p-6 flex flex-col gap-8">
                <OrderStageTracker currentStage={order.stage as any} compact={false} />
                
                <div className="flex flex-wrap items-center justify-between gap-6">
                  <div className="flex items-center gap-2 text-[14px]">
                    <Calendar className={`w-4 h-4 ${new Date(order.dueDate) < new Date() && order.stage !== 'delivered' ? 'text-red-500' : 'text-afs-gray-400'}`} />
                    <span className={new Date(order.dueDate) < new Date() && order.stage !== 'delivered' ? 'text-red-600 font-medium' : 'text-afs-gray-700'}>
                      Due {order.dueDate} {new Date(order.dueDate) < new Date() && order.stage !== 'delivered' ? '(Overdue)' : ''}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-8 border-l border-afs-gray-100 pl-8">
                    <div className="flex flex-col">
                      <span className="text-[11px] text-afs-gray-500 uppercase tracking-wider mb-0.5">Total</span>
                      <span className="text-[15px] font-bold text-afs-black">₦{order.totalAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[11px] text-afs-gray-500 uppercase tracking-wider mb-0.5">Deposit paid</span>
                      <span className="text-[15px] font-bold text-afs-black">₦{order.depositPaid.toLocaleString()}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[11px] text-afs-gray-500 uppercase tracking-wider mb-0.5">Balance due</span>
                      <span className="text-[15px] font-bold text-afs-black">₦{order.balanceDue.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Escrow Box */}
                <div className={`rounded-xl p-4 border flex flex-col gap-2 ${
                  order.escrowStatus === 'disputed' 
                    ? 'bg-red-50 border-red-100' 
                    : order.escrowStatus === 'released'
                      ? 'bg-green-50 border-green-100'
                      : order.readyForConfirm 
                        ? 'bg-amber-50 border-amber-100' 
                        : 'bg-afs-gray-50 border-afs-gray-100'
                }`}>
                  <div className="flex items-center gap-2">
                    {order.escrowStatus === 'disputed' ? (
                      <ShieldAlert className="w-4 h-4 text-red-600" />
                    ) : (
                      <ShieldCheck className={`w-4 h-4 ${order.escrowStatus === 'released' ? 'text-green-600' : 'text-afs-gray-500'}`} />
                    )}
                    <span className={`text-[13px] font-medium ${
                      order.escrowStatus === 'disputed' ? 'text-red-800' : 
                      order.escrowStatus === 'released' ? 'text-green-800' : 
                      order.readyForConfirm ? 'text-amber-800' : 'text-afs-gray-700'
                    }`}>
                      {order.escrowStatus === 'held' && !order.readyForConfirm && `₦${order.balanceDue.toLocaleString()} is held securely in escrow until your order is confirmed.`}
                      {order.readyForConfirm && order.escrowStatus === 'held' && `Your tailor has marked this order ready. Please confirm to release payment.`}
                      {order.escrowStatus === 'released' && `Payment released to tailor. Order complete.`}
                      {order.escrowStatus === 'disputed' && `This order is under dispute review by Afrostyle admin.`}
                    </span>
                  </div>
                  {order.daysUntilAutoRelease && order.escrowStatus === 'held' && (
                    <div className="flex items-center gap-1.5 text-[12px] text-afs-gray-500 pl-6">
                      <Clock className="w-3.5 h-3.5" />
                      Auto-releases in {order.daysUntilAutoRelease} days if no action taken
                    </div>
                  )}
                </div>
              </div>

              {/* Footer Strip */}
              <div className="bg-afs-gray-50 px-6 py-4 border-t border-afs-gray-100 flex items-center justify-end gap-3">
                {order.readyForConfirm && order.escrowStatus === 'held' && (
                  <>
                    {confirmingRelease === order.id ? (
                      <div className="flex items-center gap-2 pr-2 animate-in slide-in-from-right-2">
                        <span className="text-[13px] font-medium text-afs-black mr-2">Release ₦{order.balanceDue.toLocaleString()}?</span>
                        <Button size="sm" className="bg-afs-black text-white px-5" onClick={() => handleConfirmRelease(order.id)}>Confirm</Button>
                        <Button size="sm" variant="ghost" onClick={() => setConfirmingRelease(null)}>Cancel</Button>
                      </div>
                    ) : (
                      <>
                        <Button variant="ghost" className="text-[13px] text-afs-gray-500 hover:text-red-600" onClick={() => setDisputeOrder(order)}>
                          <AlertTriangle className="w-4 h-4 mr-2" />
                          Raise a Dispute
                        </Button>
                        <Button className="bg-afs-black text-white px-6 h-10" onClick={() => setConfirmingRelease(order.id)}>
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Confirm Receipt
                        </Button>
                      </>
                    )}
                  </>
                )}
                {order.stage === 'delivered' && !order.reviewed && (
                  <Link href={`/customer/dashboard/review/${order.id}`}>
                    <Button variant="secondary" className="bg-white border-afs-gray-200 text-afs-black hover:bg-afs-gray-50 px-6 h-10">
                      <Star className="w-4 h-4 mr-2 fill-amber-400 text-amber-400" />
                      Leave a Review
                    </Button>
                  </Link>
                )}
                {(!order.readyForConfirm || (order.readyForConfirm && order.escrowStatus === 'disputed') || order.escrowStatus === 'released') && (
                  <Button variant="ghost" className="text-[13px] text-afs-gray-600 hover:text-afs-black">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Message tailor
                  </Button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {disputeOrder && (
        <DisputeModal 
          order={disputeOrder} 
          onClose={() => setDisputeOrder(null)} 
          onSubmit={handleDisputeSubmit} 
        />
      )}
    </div>
  );
}

// 3. Overview Tab Content
function OverviewTab() {
  const [confirmingRelease, setConfirmingRelease] = useState<string | null>(null);

  const handleConfirmRelease = (orderId: string) => {
    console.log('Payment released for order:', orderId);
    setConfirmingRelease(null);
  };

  const activeOrders = useMemo(() => ORDERS_MOCK.filter(o => o.stage !== 'delivered' && o.escrowStatus !== 'disputed'), []);
  const pastOrders = useMemo(() => ORDERS_MOCK.filter(o => o.stage === 'delivered'), []);
  const actionRequiredOrder = useMemo(() => ORDERS_MOCK.find(o => o.readyForConfirm && o.escrowStatus === 'held'), []);

  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-500">
      
      {/* Welcome Banner */}
      <section className="bg-afs-black rounded-xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-deep">
        <div className="text-center md:text-left">
          <h2 className="font-display text-[22px] md:text-[28px] text-white mb-1">
            Welcome back, {CUSTOMER_MOCK.name.split(' ')[0]}
          </h2>
          <p className="text-[14px] text-afs-gray-400">
            You have {activeOrders.length} active orders
          </p>
        </div>
        <Link href="/discover">
          <Button variant="secondary" className="bg-white text-afs-black hover:bg-afs-gray-100 font-medium px-8 h-12">
            Find a Tailor
          </Button>
        </Link>
      </section>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-afs-gray-100 rounded-lg p-5 flex flex-col shadow-card">
          <div className="w-10 h-10 rounded-md bg-afs-gray-50 flex items-center justify-center mb-4">
            <ShoppingBag className="w-5 h-5 text-afs-black" />
          </div>
          <span className="font-display text-[28px] text-afs-black leading-none mb-1">{activeOrders.length}</span>
          <span className="text-[13px] text-afs-gray-500">Active orders</span>
        </div>
        <div className="bg-white border border-afs-gray-100 rounded-lg p-5 flex flex-col shadow-card">
          <div className="w-10 h-10 rounded-md bg-afs-gray-50 flex items-center justify-center mb-4">
            <Wallet className="w-5 h-5 text-afs-black" />
          </div>
          <span className="font-display text-[28px] text-afs-black leading-none mb-1">₦{CUSTOMER_MOCK.totalSpent.toLocaleString()}</span>
          <span className="text-[13px] text-afs-gray-500">Total spent</span>
        </div>
        <div className="bg-white border border-afs-gray-100 rounded-lg p-5 flex flex-col shadow-card">
          <div className="w-10 h-10 rounded-md bg-afs-gray-50 flex items-center justify-center mb-4">
            <Heart className="w-5 h-5 text-afs-black" />
          </div>
          <span className="font-display text-[28px] text-afs-black leading-none mb-1">{CUSTOMER_MOCK.savedTailors}</span>
          <span className="text-[13px] text-afs-gray-500">Saved tailors</span>
        </div>
      </div>

      {/* Action Required Section */}
      {actionRequiredOrder && (
        <section className="bg-white border-l-[4px] border-l-afs-black rounded-r-md shadow-card p-5 animate-in slide-in-from-left duration-300">
          <div className="flex items-center gap-2 mb-4">
            <PackageCheck className="w-[18px] h-[18px] text-afs-gray-500" />
            <span className="text-[13px] uppercase font-bold tracking-wider text-afs-gray-500">Action required</span>
          </div>
          <h3 className="font-display text-[18px] text-afs-black mb-3">
            Your {actionRequiredOrder.item} from {actionRequiredOrder.tailor} is ready for pickup
          </h3>
          <p className="text-[14px] text-afs-gray-600 mb-2">
            ₦{actionRequiredOrder.balanceDue.toLocaleString()} is held in escrow. Confirm receipt to release payment to your tailor, or raise a dispute.
          </p>
          <div className="flex items-center gap-1.5 text-[13px] text-afs-gray-500 mb-6">
            <Clock className="w-3.5 h-3.5" />
            Auto-releases in {actionRequiredOrder.daysUntilAutoRelease} days if no action taken
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3">
            {confirmingRelease === actionRequiredOrder.id ? (
              <div className="flex items-center gap-3 bg-afs-gray-50 p-2 rounded-md border border-afs-gray-200 animate-in zoom-in-95">
                <span className="text-sm font-medium text-afs-black px-2">Are you sure? This will release ₦{actionRequiredOrder.balanceDue.toLocaleString()} to the tailor.</span>
                <Button size="sm" onClick={() => handleConfirmRelease(actionRequiredOrder.id)} className="bg-afs-black text-white px-4">Confirm</Button>
                <Button size="sm" variant="ghost" onClick={() => setConfirmingRelease(null)}>Cancel</Button>
              </div>
            ) : (
              <>
                <Button className="bg-afs-black text-white hover:bg-afs-black/90 px-6" onClick={() => setConfirmingRelease(actionRequiredOrder.id)}>
                  <CheckCircle className="w-4 h-4 mr-2" />Confirm & Release Payment
                </Button>
                <Button variant="ghost" className="text-afs-gray-600 hover:text-red-600 transition-colors" onClick={() => console.log('Raise dispute from banner')}>
                  <AlertTriangle className="w-4 h-4 mr-2" />Raise a Dispute
                </Button>
              </>
            )}
          </div>
        </section>
      )}

      {/* Active Orders Section */}
      <section>
        <div className="flex items-center justify-between mb-4 px-1">
          <h3 className="text-[16px] font-medium text-afs-black">Active orders</h3>
        </div>
        <div className="flex flex-col gap-4">
          {activeOrders.map(order => (
            <div key={order.id} className="bg-white border border-afs-gray-100 rounded-lg p-5 flex flex-col gap-6 shadow-sm hover:shadow-card transition-shadow">
              <div className="flex justify-between items-start">
                <div className="flex flex-col gap-0.5">
                  <span className="text-base font-medium text-afs-black">{order.tailor}</span>
                  <span className="text-sm text-afs-gray-500">{order.item}</span>
                </div>
                <div className="text-[13px] text-afs-gray-500 font-medium whitespace-nowrap">Due {order.dueDate}</div>
              </div>
              <div className="py-2"><OrderStageTracker currentStage={order.stage as any} compact={false} /></div>
              <div className="flex justify-between items-center pt-2">
                <div className="flex items-center gap-2">
                  {order.readyForConfirm ? (
                    <Badge variant="warning" className="px-2 py-0.5 text-[11px] font-medium border-none bg-amber-100 text-amber-700">Awaiting your confirmation</Badge>
                  ) : (
                    <Badge variant="info" className="px-2 py-0.5 text-[11px] font-medium border-none bg-blue-50 text-blue-600">₦{order.balanceDue.toLocaleString()} in escrow</Badge>
                  )}
                </div>
                <Button variant="ghost" size="sm" className="text-afs-gray-500 hover:text-afs-black flex items-center gap-1">
                  View order <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Past Orders Section */}
      <section>
        <div className="flex items-center justify-between mb-4 px-1">
          <h3 className="text-[16px] font-medium text-afs-black">Past orders</h3>
          <Link href="/customer/dashboard/orders" className="text-[13px] text-afs-gray-500 hover:text-afs-black transition-colors font-medium">View all &rarr;</Link>
        </div>
        <div className="bg-white border border-afs-gray-100 rounded-lg overflow-hidden shadow-sm">
          <div className="flex flex-col divide-y divide-afs-gray-50">
            {pastOrders.map(order => (
              <div key={order.id} className="p-4 flex items-center justify-between hover:bg-afs-gray-50 transition-colors">
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm font-medium text-afs-black">{order.tailor}</span>
                  <div className="flex items-center gap-2 text-[12px] text-afs-gray-500">
                    <span>{order.item}</span><span>&middot;</span><span>Completed {order.completedDate}</span>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <span className="text-sm font-medium text-afs-black">₦{order.totalAmount.toLocaleString()}</span>
                  {order.reviewed ? (
                    <Badge variant="success" className="bg-green-100 text-green-700 border-none px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">Reviewed</Badge>
                  ) : (
                    <Badge variant="warning" className="bg-amber-100 text-amber-700 border-none px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">Leave a review</Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default function CustomerDashboardPage() {
  const { activePage } = useCustomerDashboard();

  return (
    <div className="max-w-5xl mx-auto pb-12">
      {activePage === 'overview' && <OverviewTab />}
      {activePage === 'orders' && <OrdersTab />}
      {activePage === 'payments' && <PaymentsTab />}
      {activePage === 'saved' && <SavedTailorsTab />}
      {activePage === 'reviews' && <ReviewsTab />}
      
      {/* Fallback for other tabs */}
      {!['overview', 'orders', 'payments', 'saved', 'reviews'].includes(activePage) && (
        <div className="bg-white border border-afs-gray-100 rounded-xl p-12 text-center animate-in fade-in duration-500">
          <h2 className="font-display text-24px text-afs-black mb-2 uppercase tracking-wide">
            {activePage} coming soon
          </h2>
          <p className="text-afs-gray-500 text-sm">We're building this section for you.</p>
        </div>
      )}
    </div>
  );
}
