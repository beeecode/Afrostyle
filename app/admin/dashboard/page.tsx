"use client";

import React from "react";
import { 
  TrendingUp, 
  Wallet, 
  Users, 
  ClipboardList, 
  AlertTriangle, 
  ShieldCheck, 
  ChevronRight,
  ArrowRight,
  Download, 
  Search as SearchIcon, 
  Eye, 
  MoreVertical,
  Scale,
  CheckCircle,
  XCircle,
  Divide,
  MessageSquare,
  Image as ImageIcon,
  PieChart,
  BarChart3
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { useAdminDashboard } from "./AdminDashboardContext";

// --- MOCK DATA ---
const PLATFORM_STATS = {
  totalTailors:      2847,
  activeTailors:     1203,
  totalCustomers:    18492,
  totalOrders:       34201,
  activeOrders:      892,
  totalGMV:          512840000,  // in kobo — display as ₦512.8M
  monthlyGMV:         48320000,
  platformCommission:  19328000,  // 4% of GMV
  pendingDisputes:    3,
  pendingVerifications: 7,
};

const RECENT_SIGNUPS = [
  { id: 'u1', name: 'Folake Adeyemi',  role: 'tailor',    location: 'Lagos',   joinDate: 'Mar 21, 2026', verified: false },
  { id: 'u2', name: 'Emeka Okafor',    role: 'customer',  location: 'Abuja',   joinDate: 'Mar 21, 2026', verified: true  },
  { id: 'u3', name: 'Amara Eze',       role: 'tailor',    location: 'PH',      joinDate: 'Mar 20, 2026', verified: false },
  { id: 'u4', name: 'Bola Adewale',    role: 'customer',  location: 'Ibadan',  joinDate: 'Mar 20, 2026', verified: true  },
];

const RECENT_DISPUTES = [
  { id: 'd1', customer: 'Ngozi Eze',     tailor: 'Kunle Threads',      item: 'Senator suit',  amount: 35000, raisedDate: 'Mar 19, 2026', status: 'open'       },
  { id: 'd2', customer: 'Biodun Ade',    tailor: 'Zara Couture NG',    item: 'Evening gown',  amount: 48000, raisedDate: 'Mar 17, 2026', status: 'open'       },
  { id: 'd3', customer: 'Chukwu Obi',    tailor: 'House of Chukwu',    item: 'Agbada set',    amount: 62000, raisedDate: 'Mar 15, 2026', status: 'reviewing'  },
];

const ALL_USERS = [
  { id: 'u1', name: 'Amaka Obi',       email: 'amaka@email.com',  role: 'tailor',   location: 'Lagos',  joinDate: 'Jan 2022', status: 'active',    verified: true,  orders: 340, totalValue: 4200000 },
  { id: 'u2', name: 'Kunle Adeyemi',   email: 'kunle@email.com',  role: 'tailor',   location: 'Lagos',  joinDate: 'Mar 2023', status: 'active',    verified: true,  orders: 189, totalValue: 2800000 },
  { id: 'u3', name: 'Chidinma Obi',    email: 'chi@email.com',    role: 'customer', location: 'Lagos',  joinDate: 'Feb 2024', status: 'active',    verified: true,  orders: 6,   totalValue: 198000  },
  { id: 'u4', name: 'Folake Bello',    email: 'folake@email.com', role: 'tailor',   location: 'Ibadan', joinDate: 'Mar 2026', status: 'active',    verified: false, orders: 0,   totalValue: 0       },
  { id: 'u5', name: 'Emeka Tunde',     email: 'emeka@email.com',  role: 'customer', location: 'Abuja',  joinDate: 'Jun 2024', status: 'suspended', verified: true,  orders: 2,   totalValue: 45000   },
  { id: 'u6', name: 'Zara Designs',    email: 'zara@email.com',   role: 'tailor',   location: 'Lagos',  joinDate: 'Aug 2023', status: 'active',    verified: true,  orders: 412, totalValue: 8900000 },
];

const ALL_DISPUTES = [
  {
    id: 'd1',
    orderId: 'o-384729',
    customer:     { name: 'Ngozi Eze',    avatar: undefined },
    tailor:       { name: 'Kunle Threads', avatar: undefined },
    item:         'Senator suit',
    totalAmount:  35000,
    escrowAmount: 17500,
    reason:       'Wrong measurements',
    description:  'The senator suit was delivered 3 sizes too large. I sent my measurements clearly and they were ignored. The outfit is unwearable.',
    raisedDate:   'Mar 19, 2026',
    status:       'open',
    evidence:     ['photo1.jpg', 'photo2.jpg'],
  },
  {
    id: 'd2',
    orderId: 'o-384102',
    customer:     { name: 'Biodun Ade',   avatar: undefined },
    tailor:       { name: 'Zara Couture', avatar: undefined },
    item:         'Evening gown',
    totalAmount:  48000,
    escrowAmount: 24000,
    reason:       'Item not as described',
    description:  'The gown I received is completely different from the style photo I provided. Wrong fabric, wrong colour, wrong cut.',
    raisedDate:   'Mar 17, 2026',
    status:       'open',
    evidence:     ['photo1.jpg'],
  },
  {
    id: 'd3',
    orderId: 'o-371845',
    customer:     { name: 'Chukwu Obi',   avatar: undefined },
    tailor:       { name: 'House of Chukwu', avatar: undefined },
    item:         'Agbada set',
    totalAmount:  62000,
    escrowAmount: 31000,
    reason:       'Poor quality',
    description:  'The stitching is coming apart after one wear. The embroidery is uneven and looks nothing like the sample shown.',
    raisedDate:   'Mar 15, 2026',
    status:       'reviewing',
    evidence:     ['photo1.jpg', 'photo2.jpg', 'photo3.jpg'],
  },
];

const GMV_DATA = [
  { month: 'Oct', value: 28.4 },
  { month: 'Nov', value: 31.2 },
  { month: 'Dec', value: 44.8 },
  { month: 'Jan', value: 38.1 },
  { month: 'Feb', value: 41.2 },
  { month: 'Mar', value: 48.3 },
];

const GMV_BY_CITY = [
  { city: 'Lagos', value: 31.2 },
  { city: 'Abuja', value: 8.4 },
  { city: 'Port Harcourt', value: 5.1 },
  { city: 'Ibadan', value: 2.8 },
  { city: 'Kano', value: 1.6 },
  { city: 'Enugu', value: 0.9 },
];

const COMMISSION_HISTORY = [
  { month: 'Mar 2026', orders: '1,204', gmv: '₦48.3M', commission: '₦1.93M', status: 'current' },
  { month: 'Feb 2026', orders: '1,031', gmv: '₦41.2M', commission: '₦1.65M', status: 'settled' },
  { month: 'Jan 2026', orders: '953',   gmv: '₦38.1M', commission: '₦1.52M', status: 'settled' },
  { month: 'Dec 2025', orders: '1,117', gmv: '₦44.8M', commission: '₦1.79M', status: 'settled' },
  { month: 'Nov 2025', orders: '780',   gmv: '₦31.2M', commission: '₦1.25M', status: 'settled' },
  { month: 'Oct 2025', orders: '709',   gmv: '₦28.4M', commission: '₦1.14M', status: 'settled' },
];

const PENDING_VERIFICATIONS = [
  { id: 'v1', name: 'Folake Bello',   location: 'Ibadan',  joinDate: 'Mar 20, 2026', specialties: ['Bridal', 'Ankara'],  portfolioCount: 4, ordersOnPlatform: 0 },
  { id: 'v2', name: 'Amara Nwosu',    location: 'Enugu',   joinDate: 'Mar 18, 2026', specialties: ['Corporate'],         portfolioCount: 2, ordersOnPlatform: 1 },
  { id: 'v3', name: 'Segun Tailors',  location: 'Lagos',   joinDate: 'Mar 15, 2026', specialties: ['Agbada', 'Senator'], portfolioCount: 8, ordersOnPlatform: 3 },
];

// --- COMPONENTS ---

// Overview Tab Component
function OverviewTab() {
  const { setActivePage } = useAdminDashboard();

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* 1. Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1: Total GMV */}
        <div className="bg-white border border-afs-gray-100 rounded-lg p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3 text-afs-gray-600">
             <span className="text-[13px] font-medium">Total platform GMV</span>
             <TrendingUp className="w-5 h-5 text-green-600" />
          </div>
          <h2 className="font-display text-[32px] text-afs-black leading-none mb-2">₦512.8M</h2>
          <div className="flex items-center gap-1.5 mt-auto">
            <span className="text-[12px] font-medium text-green-600">Trending Up</span>
            <span className="text-[12px] text-afs-gray-500">₦48.3M this month</span>
          </div>
        </div>

        {/* Card 2: Commission */}
        <div className="bg-white border border-afs-gray-100 rounded-lg p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3 text-afs-gray-600">
             <span className="text-[13px] font-medium">Commission earned (4%)</span>
             <Wallet className="w-5 h-5" />
          </div>
          <h2 className="font-display text-[32px] text-afs-black leading-none mb-2">₦19.3M</h2>
          <div className="mt-auto">
            <span className="text-[12px] text-afs-gray-500">₦1.93M this month</span>
          </div>
        </div>

        {/* Card 3: Total Users */}
        <div className="bg-white border border-afs-gray-100 rounded-lg p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3 text-afs-gray-600">
             <span className="text-[13px] font-medium">Registered users</span>
             <Users className="w-5 h-5" />
          </div>
          <h2 className="font-display text-[32px] text-afs-black leading-none mb-2">21,339</h2>
          <div className="mt-auto">
            <span className="text-[12px] text-afs-gray-500">2,847 tailors · 18,492 customers</span>
          </div>
        </div>

        {/* Card 4: Active Orders */}
        <div className="bg-white border border-afs-gray-100 rounded-lg p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3 text-afs-gray-600">
             <span className="text-[13px] font-medium">Orders in progress</span>
             <ClipboardList className="w-5 h-5" />
          </div>
          <h2 className="font-display text-[32px] text-afs-black leading-none mb-2">892</h2>
          <div className="mt-auto">
            <span className="text-[12px] text-afs-gray-500">34,201 total completed</span>
          </div>
        </div>
      </div>

      {/* 2. Alert Banners */}
      <div className="space-y-3">
        {PLATFORM_STATS.pendingDisputes > 0 && (
          <div className="flex items-center justify-between bg-white border-l-4 border-[#B91C1C] rounded-md p-4 shadow-sm border-r border-t border-b border-afs-gray-100">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-4 h-4 text-[#B91C1C]" />
              <span className="text-[14px] font-medium text-afs-black">{PLATFORM_STATS.pendingDisputes} open disputes require your review</span>
            </div>
            <button 
              onClick={() => setActivePage('disputes')}
              className="text-[13px] font-bold text-[#B91C1C] hover:underline"
            >
              Review disputes →
            </button>
          </div>
        )}
        {PLATFORM_STATS.pendingVerifications > 0 && (
          <div className="flex items-center justify-between bg-white border-l-4 border-[#D48B28] rounded-md p-4 shadow-sm border-r border-t border-b border-afs-gray-100">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-4 h-4 text-[#D48B28]" />
              <span className="text-[14px] font-medium text-afs-black">{PLATFORM_STATS.pendingVerifications} tailors are awaiting verification</span>
            </div>
            <button 
              onClick={() => setActivePage('verifications')}
              className="text-[13px] font-bold text-[#D48B28] hover:underline"
            >
              Review verifications →
            </button>
          </div>
        )}
      </div>

      {/* 3. Monthly GMV Chart */}
      <div className="bg-white border border-afs-gray-100 rounded-lg p-6 shadow-sm">
        <div className="mb-8">
          <h3 className="text-[16px] font-medium text-afs-black">Monthly GMV</h3>
          <p className="text-[13px] text-afs-gray-500">Last 6 months</p>
        </div>
        
        <div className="flex items-end justify-between h-[200px] gap-4 px-4">
          {GMV_DATA.map((item, i) => {
            const height = (item.value / 50) * 100;
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-3 group">
                <div className="relative w-full flex items-end justify-center h-full">
                  <div 
                    className="w-full max-w-[60px] bg-afs-black rounded-sm transition-all duration-500 hover:bg-[#B91C1C]"
                    style={{ height: `${height}%` }}
                  />
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-afs-black text-white text-[11px] px-1.5 py-0.5 rounded pointer-events-none">
                    ₦{item.value}M
                  </div>
                </div>
                <span className="text-[12px] font-medium text-afs-gray-500">{item.month}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Activity Logs (Two Columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Signups */}
        <div className="bg-white border border-afs-gray-100 rounded-lg shadow-sm overflow-hidden text-[14px]">
          <div className="px-6 py-4 border-b border-afs-gray-100 flex items-center justify-between">
            <h3 className="font-medium text-afs-black">Recent signups</h3>
            <button className="text-[13px] text-afs-gray-600 hover:text-afs-black font-medium flex items-center gap-1 group">
              View all <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          <div className="divide-y divide-afs-gray-50">
            {RECENT_SIGNUPS.map((user) => (
              <div key={user.id} className="px-6 py-4 flex items-center justify-between hover:bg-afs-gray-50/50 transition-colors">
                <div className="flex items-center gap-3">
                  <Avatar fallback={user.name.split(' ').map(n => n[0]).join('')} size="sm" />
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-afs-black">{user.name}</span>
                      <Badge variant={user.role === 'tailor' ? 'info' : 'default'} className="text-[10px] h-4 uppercase">{user.role}</Badge>
                    </div>
                    <span className="text-[12px] text-afs-gray-500">{user.location}</span>
                  </div>
                </div>
                <div className="flex flex-col mb-auto items-end gap-2">
                  <span className="text-[13px] text-afs-gray-500">{user.joinDate}</span>
                  {user.role === 'tailor' && !user.verified && (
                    <div className="flex items-center gap-2">
                      <Badge variant="warning" className="text-[10px] h-4">Needs verification</Badge>
                      <button className="text-[11px] font-bold text-amber-700 hover:underline">Verify →</button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Open Disputes */}
        <div className="bg-white border border-afs-gray-100 rounded-lg shadow-sm overflow-hidden text-[14px]">
          <div className="px-6 py-4 border-b border-afs-gray-100 flex items-center justify-between">
            <h3 className="font-medium text-afs-black">Open disputes</h3>
            <button className="text-[13px] text-afs-gray-600 hover:text-afs-black font-medium flex items-center gap-1 group">
              View all <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          <div className="divide-y divide-afs-gray-50">
            {RECENT_DISPUTES.map((dispute) => (
              <div key={dispute.id} className="px-6 py-4 flex items-center justify-between hover:bg-afs-gray-50/50 transition-colors">
                <div className="flex flex-col gap-1">
                  <span className="font-medium text-afs-black">{dispute.customer} vs {dispute.tailor}</span>
                  <span className="text-[13px] text-afs-gray-500">{dispute.item} · ₦{dispute.amount.toLocaleString()}</span>
                </div>
                <div className="flex flex-col mb-auto items-end gap-2 text-right">
                  <div className="flex items-center gap-3">
                    <span className="text-[12px] text-afs-gray-400">{dispute.raisedDate}</span>
                    <Badge variant={dispute.status === 'open' ? 'danger' : 'warning'} className="text-[10px] h-4 uppercase">{dispute.status}</Badge>
                  </div>
                  <button className="text-[12px] font-bold text-afs-black hover:underline">Review →</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// User Profile Actions Row
function UserActionsRow({ user }: { user: any }) {
  const [showDropdown, setShowDropdown] = React.useState(false);

  const handleAction = (action: string) => {
    console.log(`Action: ${action} for User: ${user.id}`);
    setShowDropdown(false);
  };

  return (
    <div className="flex items-center justify-end gap-1 relative">
      <button 
        onClick={() => console.log('View profile:', user.id)}
        className="p-1.5 text-afs-gray-400 hover:text-afs-black hover:bg-afs-gray-100 rounded-md transition-colors"
        title="View profile"
      >
        <Eye className="w-4 h-4" />
      </button>

      {user.role === 'tailor' && !user.verified && (
        <button 
          onClick={() => console.log('Verify tailor:', user.id)}
          className="p-1.5 text-amber-600 hover:bg-amber-50 rounded-md transition-colors"
          title="Verify tailor"
        >
          <ShieldCheck className="w-4 h-4" />
        </button>
      )}

      {user.status === 'suspended' && (
        <button 
          onClick={() => handleAction('unsuspend')}
          className="p-1.5 text-green-600 hover:bg-green-50 rounded-md transition-colors text-[12px] font-bold"
        >
          Unsuspend
        </button>
      )}

      <div className="relative">
        <button 
          onClick={() => setShowDropdown(!showDropdown)}
          className={`p-1.5 text-afs-gray-400 hover:text-afs-black hover:bg-afs-gray-100 rounded-md transition-colors ${showDropdown ? 'bg-afs-gray-100 text-afs-black' : ''}`}
        >
          <MoreVertical className="w-4 h-4" />
        </button>

        {showDropdown && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setShowDropdown(false)} />
            <div className="absolute right-0 top-full mt-1 w-[180px] bg-white border border-afs-gray-100 rounded-md shadow-lg py-1 z-50 animate-in fade-in zoom-in-95 duration-100">
              <button onClick={() => handleAction('suspend')} className="w-full text-left px-4 py-2.5 text-[14px] text-[#B91C1C] hover:bg-afs-gray-50 transition-colors">Suspend account</button>
              <button onClick={() => handleAction('ban')} className="w-full text-left px-4 py-2.5 text-[14px] text-[#B91C1C] hover:bg-afs-gray-50 transition-colors">Ban account</button>
              <div className="h-px bg-afs-gray-100 my-1" />
              <button onClick={() => handleAction('warn')} className="w-full text-left px-4 py-2 text-[14px] text-afs-gray-700 hover:bg-afs-gray-50 transition-colors">Send warning email</button>
              <button onClick={() => handleAction('reset')} className="w-full text-left px-4 py-2 text-[14px] text-afs-gray-700 hover:bg-afs-gray-50 transition-colors">Reset password</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// Users Directory Section
function UsersSection() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-baseline gap-3">
          <h1 className="font-display text-[24px] text-afs-black">Users</h1>
          <span className="text-[16px] text-afs-gray-400">(21,339)</span>
        </div>
        <button className="flex items-center gap-2 px-3 py-2 text-afs-gray-600 hover:text-afs-black transition-colors rounded-md text-[13px] font-medium group">
          <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
          Export
        </button>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 pb-2">
        <div className="flex flex-wrap items-center gap-6">
          {/* Role Filter */}
          <div className="flex items-center gap-2">
            <span className="text-[12px] font-bold text-afs-gray-400 uppercase tracking-widest">Role</span>
            <div className="flex bg-afs-gray-100 p-0.5 rounded-md">
              <button className="px-3 py-1 bg-white text-afs-black font-medium text-[13px] rounded-sm shadow-sm">All</button>
              <button className="px-3 py-1 text-afs-gray-500 hover:text-afs-black text-[13px] transition-colors">Tailors</button>
              <button className="px-3 py-1 text-afs-gray-500 hover:text-afs-black text-[13px] transition-colors">Customers</button>
            </div>
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <span className="text-[12px] font-bold text-afs-gray-400 uppercase tracking-widest">Status</span>
            <div className="flex bg-afs-gray-100 p-0.5 rounded-md">
              <button className="px-3 py-1 bg-white text-afs-black font-medium text-[13px] rounded-sm shadow-sm">All</button>
              <button className="px-3 py-1 text-afs-gray-500 hover:text-afs-black text-[13px] transition-colors">Active</button>
              <button className="px-3 py-1 text-afs-gray-500 hover:text-afs-black text-[13px] transition-colors">Suspended</button>
              <button className="px-3 py-1 text-afs-gray-500 hover:text-afs-black text-[13px] transition-colors">Banned</button>
            </div>
          </div>

          {/* Verified Filter */}
          <div className="flex items-center gap-2">
            <span className="text-[12px] font-bold text-afs-gray-400 uppercase tracking-widest">Verified</span>
            <div className="flex bg-afs-gray-100 p-0.5 rounded-md">
              <button className="px-3 py-1 bg-white text-afs-black font-medium text-[13px] rounded-sm shadow-sm">All</button>
              <button className="px-3 py-1 text-afs-gray-500 hover:text-afs-black text-[13px] transition-colors">Verified</button>
              <button className="px-3 py-1 text-afs-gray-500 hover:text-afs-black text-[13px] transition-colors">Unverified</button>
            </div>
          </div>
        </div>

        <div className="relative w-full xl:w-[240px]">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-afs-gray-400" />
          <input 
            type="text" 
            placeholder="Search by name or email" 
            className="w-full bg-white border border-afs-gray-100 rounded-md pl-10 pr-4 py-2 text-[13px] outline-none focus:ring-2 focus:ring-afs-black/5 transition-all"
          />
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white border border-afs-gray-100 rounded-lg shadow-sm overflow-hidden overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="bg-afs-gray-50/50 border-b border-afs-gray-100">
              <th className="px-6 py-4 text-[11px] font-bold text-afs-gray-400 uppercase tracking-widest">User</th>
              <th className="px-6 py-4 text-[11px] font-bold text-afs-gray-400 uppercase tracking-widest">Role</th>
              <th className="px-6 py-4 text-[11px] font-bold text-afs-gray-400 uppercase tracking-widest">Location</th>
              <th className="px-6 py-4 text-[11px] font-bold text-afs-gray-400 uppercase tracking-widest">Joined</th>
              <th className="px-6 py-4 text-[11px] font-bold text-afs-gray-400 uppercase tracking-widest">Orders</th>
              <th className="px-6 py-4 text-[11px] font-bold text-afs-gray-400 uppercase tracking-widest">Status</th>
              <th className="px-6 py-4 text-[11px] font-bold text-afs-gray-400 uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-afs-gray-50">
            {ALL_USERS.map((user) => (
              <tr key={user.id} className={`group hover:bg-afs-gray-50/50 transition-colors ${user.status === 'suspended' ? 'bg-afs-gray-50' : ''}`}>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <Avatar fallback={user.name.split(' ').map(n => n[0]).join('')} size="sm" />
                    <div className="flex flex-col">
                      <span className={`text-[14px] font-medium ${user.status === 'suspended' ? 'text-afs-gray-400' : 'text-afs-black'}`}>{user.name}</span>
                      <span className="text-[12px] text-afs-gray-500">{user.email}</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <Badge variant={user.role === 'tailor' ? 'info' : 'default'} className="uppercase text-[10px] tracking-wider">{user.role}</Badge>
                </td>
                <td className="px-6 py-4 text-[14px] text-afs-gray-700">{user.location}</td>
                <td className="px-6 py-4 text-[13px] text-afs-gray-500">{user.joinDate}</td>
                <td className="px-6 py-4 text-[14px] text-afs-black font-medium">{user.orders}</td>
                <td className="px-6 py-4">
                  <Badge 
                    variant={user.status === 'active' ? 'success' : user.status === 'suspended' ? 'warning' : 'danger'}
                    className="capitalize"
                  >
                    {user.status}
                  </Badge>
                </td>
                <td className="px-6 py-4 text-right">
                  <UserActionsRow user={user} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// --- DISPUTES SECTION ---

function DisputesSection() {
  const [selectedId, setSelectedId] = React.useState<string | null>(null);
  const selectedDispute = ALL_DISPUTES.find(d => d.id === selectedId);

  return (
    <div className="flex flex-col xl:flex-row h-[calc(100vh-160px)] -m-8 animate-in fade-in duration-500">
      {/* Left Panel: Dispute List */}
      <div className="w-full xl:w-[360px] border-r border-afs-gray-100 bg-white flex flex-col h-full">
        <div className="p-6 border-b border-afs-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-[18px] font-medium text-afs-black">Disputes</h2>
            <Badge variant="danger" className="rounded-full px-1.5 min-w-[20px] justify-center">{ALL_DISPUTES.length}</Badge>
          </div>
        </div>
        
        <div className="p-4 border-b border-afs-gray-100">
          <div className="flex bg-afs-gray-50 p-1 rounded-md overflow-x-auto no-scrollbar">
            <button className="whitespace-nowrap px-3 py-1.5 bg-white text-afs-black font-medium text-[12px] rounded-sm shadow-sm">All</button>
            <button className="whitespace-nowrap px-3 py-1.5 text-afs-gray-500 hover:text-afs-black text-[12px] transition-colors">Open</button>
            <button className="whitespace-nowrap px-3 py-1.5 text-afs-gray-500 hover:text-afs-black text-[12px] transition-colors">Reviewing</button>
            <button className="whitespace-nowrap px-3 py-1.5 text-afs-gray-500 hover:text-afs-black text-[12px] transition-colors">Resolved</button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-afs-gray-50">
          {ALL_DISPUTES.map((dispute) => (
            <div 
              key={dispute.id}
              onClick={() => setSelectedId(dispute.id)}
              className={`p-4 cursor-pointer transition-all border-l-2 ${selectedId === dispute.id ? 'bg-afs-gray-50 border-afs-black' : 'hover:bg-afs-gray-50/50 border-transparent'}`}
            >
              <div className="font-medium text-[14px] text-afs-black mb-1">
                {dispute.customer.name} vs {dispute.tailor.name}
              </div>
              <div className="text-[13px] text-afs-gray-500 mb-3">
                {dispute.item} · ₦{dispute.totalAmount.toLocaleString()}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[12px] text-afs-gray-400">{dispute.raisedDate}</span>
                <Badge 
                  variant={dispute.status === 'open' ? 'danger' : dispute.status === 'reviewing' ? 'warning' : 'success'}
                  className="capitalize text-[10px]"
                >
                  {dispute.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel: Dispute Detail */}
      <div className="flex-1 bg-afs-gray-50/50 overflow-y-auto min-w-0">
        {!selectedDispute ? (
          <div className="h-full flex flex-col items-center justify-center text-afs-gray-400 animate-in fade-in zoom-in-95 duration-300">
            <Scale className="w-12 h-12 mb-4 text-afs-gray-200" />
            <p className="text-[15px]">Select a dispute to review</p>
          </div>
        ) : (
          <div className="p-8 max-w-5xl mx-auto animate-in slide-in-from-right-4 duration-300">
            {/* Detail Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="font-display text-[24px] text-afs-black mb-1">Dispute #{selectedDispute.id}</h1>
                <p className="text-[13px] text-afs-gray-500">Raised on {selectedDispute.raisedDate}</p>
              </div>
              <Badge 
                variant={selectedDispute.status === 'open' ? 'danger' : selectedDispute.status === 'reviewing' ? 'warning' : 'success'}
                className="capitalize px-4 py-1 text-[13px]"
              >
                {selectedDispute.status}
              </Badge>
            </div>

            {/* Order Info Bar */}
            <div className="bg-white border border-afs-gray-100 rounded-lg p-6 shadow-sm mb-8 grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <span className="text-[12px] text-afs-gray-500 block mb-1">Order ID</span>
                <span className="text-[14px] font-medium text-afs-black">{selectedDispute.orderId}</span>
              </div>
              <div>
                <span className="text-[12px] text-afs-gray-500 block mb-1">Item</span>
                <span className="text-[14px] font-medium text-afs-black">{selectedDispute.item}</span>
              </div>
              <div>
                <span className="text-[12px] text-afs-gray-500 block mb-1">Total Value</span>
                <span className="text-[14px] font-medium text-afs-black">₦{selectedDispute.totalAmount.toLocaleString()}</span>
              </div>
              <div>
                <span className="text-[12px] text-afs-gray-500 block mb-1">In Escrow</span>
                <span className="text-[14px] font-bold text-[#B91C1C]">₦{selectedDispute.escrowAmount.toLocaleString()}</span>
              </div>
            </div>

            {/* Party Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {/* Customer Side */}
              <div className="bg-white border border-afs-gray-100 rounded-lg p-6 shadow-sm flex flex-col">
                <span className="text-[11px] font-bold text-afs-gray-400 uppercase tracking-widest mb-4">Customer</span>
                <div className="flex items-center gap-4 mb-6">
                  <Avatar fallback={selectedDispute.customer.name.split(' ').map(n=>n[0]).join('')} size="md" />
                  <div>
                    <h3 className="text-[16px] font-medium text-afs-black">{selectedDispute.customer.name}</h3>
                    <p className="text-[13px] text-afs-gray-500">Opened this dispute</p>
                  </div>
                </div>
                
                <div className="mb-4">
                  <Badge variant="danger" className="mb-3 text-[11px]">{selectedDispute.reason}</Badge>
                  <p className="text-[14px] leading-relaxed text-afs-gray-700">{selectedDispute.description}</p>
                </div>

                <div className="mt-auto pt-6 border-t border-afs-gray-50">
                   <div className="flex flex-wrap gap-2 mb-3">
                     {selectedDispute.evidence.map((_, i) => (
                       <div key={i} className="w-20 h-20 bg-afs-gray-50 border border-afs-gray-100 rounded-md flex items-center justify-center">
                         <ImageIcon className="w-5 h-5 text-afs-gray-300" />
                       </div>
                     ))}
                   </div>
                   <span className="text-[12px] text-afs-gray-500">{selectedDispute.evidence.length} photos submitted</span>
                </div>
              </div>

              {/* Tailor Side */}
              <div className="bg-white border border-afs-gray-100 rounded-lg p-6 shadow-sm flex flex-col">
                <span className="text-[11px] font-bold text-afs-gray-400 uppercase tracking-widest mb-4">Tailor</span>
                <div className="flex items-center gap-4 mb-6">
                  <Avatar fallback={selectedDispute.tailor.name.split(' ').map(n=>n[0]).join('')} size="md" />
                  <div>
                    <h3 className="text-[16px] font-medium text-afs-black">{selectedDispute.tailor.name}</h3>
                    <p className="text-[13px] text-afs-gray-500">Responding party</p>
                  </div>
                </div>
                
                <div className="bg-afs-gray-50 rounded-md p-4 flex-1 mb-6 flex items-center justify-center border border-dashed border-afs-gray-200">
                  <p className="text-[13px] text-afs-gray-400 italic">No response submitted yet</p>
                </div>

                <button className="flex items-center justify-center gap-2 w-full py-2.5 rounded-md border border-afs-gray-100 text-[13px] font-medium text-afs-gray-600 hover:bg-afs-gray-50 hover:text-afs-black transition-all">
                  <MessageSquare className="w-4 h-4" />
                  Request response from tailor
                </button>
              </div>
            </div>

            {/* Admin Decision Panel */}
            <AdminResolutionPanel dispute={selectedDispute} />
          </div>
        )}
      </div>
    </div>
  );
}

// --- FINANCIALS SECTION ---

function FinancialsSection() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* 1. Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white border border-afs-gray-100 rounded-lg p-5 shadow-sm">
          <span className="text-[12px] font-bold text-afs-gray-400 uppercase tracking-widest block mb-1">Total GMV</span>
          <h2 className="font-display text-[28px] text-afs-black">₦512.8M</h2>
        </div>
        <div className="bg-white border border-afs-gray-100 rounded-lg p-5 shadow-sm">
          <span className="text-[12px] font-bold text-afs-gray-400 uppercase tracking-widest block mb-1">Commission (4%)</span>
          <h2 className="font-display text-[28px] text-afs-black">₦19.3M</h2>
        </div>
        <div className="bg-white border border-afs-gray-100 rounded-lg p-5 shadow-sm">
          <span className="text-[12px] font-bold text-afs-gray-400 uppercase tracking-widest block mb-1">In Escrow</span>
          <h2 className="font-display text-[28px] text-afs-black">₦8.4M</h2>
        </div>
        <div className="bg-white border border-afs-gray-100 rounded-lg p-5 shadow-sm">
          <span className="text-[12px] font-bold text-afs-gray-400 uppercase tracking-widest block mb-1">Disputed</span>
          <h2 className="font-display text-[28px] text-[#B91C1C]">₦145k</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 2. GMV by City */}
        <div className="bg-white border border-afs-gray-100 rounded-lg p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-8">
            <PieChart className="w-5 h-5 text-afs-gray-400" />
            <h3 className="text-[16px] font-medium text-afs-black">GMV by City</h3>
          </div>
          <div className="space-y-5">
            {GMV_BY_CITY.map((item, i) => {
              const width = (item.value / 35) * 100;
              return (
                <div key={i} className="space-y-1.5">
                  <div className="flex items-center justify-between text-[13px]">
                    <span className="font-medium text-afs-black">{item.city}</span>
                    <span className="text-afs-gray-500">₦{item.value}M</span>
                  </div>
                  <div className="h-2 w-full bg-afs-gray-50 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-afs-black rounded-full transition-all duration-1000"
                      style={{ width: `${width}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. Monthly Commission History */}
        <div className="bg-white border border-afs-gray-100 rounded-lg shadow-sm overflow-hidden flex flex-col">
          <div className="px-6 py-4 border-b border-afs-gray-100 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-afs-gray-400" />
            <h3 className="text-[16px] font-medium text-afs-black">Commission Breakdown</h3>
          </div>
          <div className="flex-1 overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-afs-gray-50/50 border-b border-afs-gray-100">
                  <th className="px-6 py-3 text-[11px] font-bold text-afs-gray-400 uppercase tracking-widest">Month</th>
                  <th className="px-6 py-3 text-[11px] font-bold text-afs-gray-400 uppercase tracking-widest">GMV</th>
                  <th className="px-6 py-3 text-[11px] font-bold text-afs-gray-400 uppercase tracking-widest">Comm.</th>
                  <th className="px-6 py-3 text-[11px] font-bold text-afs-gray-400 uppercase tracking-widest">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-afs-gray-50">
                {COMMISSION_HISTORY.map((row, i) => (
                  <tr key={i} className="hover:bg-afs-gray-50/30 transition-colors">
                    <td className="px-6 py-4 text-[13px] font-medium text-afs-black">{row.month}</td>
                    <td className="px-6 py-4 text-[13px] text-afs-black">{row.gmv}</td>
                    <td className="px-6 py-4 text-[13px] font-bold text-afs-black">{row.commission}</td>
                    <td className="px-6 py-4">
                      <Badge variant={row.status === 'current' ? 'warning' : 'success'} className="capitalize text-[10px]">
                        {row.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- VERIFICATIONS SECTION ---

function VerificationsSection() {
  const [verifyingId, setVerifyingId] = React.useState<string | null>(null);

  const handleVerify = (id: string) => {
    setVerifyingId(id);
    console.log('Verifying tailor:', id);
    // In a real app, this would refresh the list after the animation
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="font-display text-[24px] text-afs-black">Tailor Verifications</h1>
          <Badge variant="warning" className="bg-amber-100 text-amber-700 hover:bg-amber-100 border-amber-200 rounded-full px-2.5">7 pending</Badge>
        </div>
      </div>

      {/* Explainer */}
      <div className="bg-afs-gray-50 border border-afs-gray-100 rounded-lg p-5 flex items-start gap-4 shadow-inner">
        <div className="p-2 bg-white rounded-md border border-afs-gray-100 shadow-sm">
          <ShieldCheck className="w-5 h-5 text-green-600" />
        </div>
        <div>
          <p className="text-[14px] text-afs-gray-700 leading-relaxed font-medium">
            Verified tailors appear higher in search results and display a verification badge on their profile.
          </p>
          <p className="text-[13px] text-afs-gray-500 mt-1">Review their portfolio and platform performance before approving.</p>
        </div>
      </div>

      {/* Verification Cards */}
      <div className="space-y-6">
        {PENDING_VERIFICATIONS.map((tailor) => (
          <div 
            key={tailor.id}
            className={`bg-white border border-afs-gray-100 rounded-xl p-6 shadow-sm transition-all duration-700 relative overflow-hidden ${verifyingId === tailor.id ? 'opacity-0 scale-95 -translate-y-4 pointer-events-none' : ''}`}
          >
            {verifyingId === tailor.id && (
              <div className="absolute inset-0 bg-green-50/90 z-10 flex flex-col items-center justify-center animate-in fade-in duration-300">
                <div className="bg-white p-3 rounded-full shadow-lg text-green-600 mb-2">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <span className="font-bold text-green-700">Verified Successfully</span>
              </div>
            )}

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-6">
              <div className="flex items-center gap-4">
                <Avatar fallback={tailor.name.split(' ').map(n=>n[0]).join('')} size="md" />
                <div>
                  <h3 className="text-[17px] font-bold text-afs-black">{tailor.name}</h3>
                  <div className="flex items-center gap-2 text-[13px] text-afs-gray-500 mt-0.5">
                    <span>{tailor.location}</span>
                    <span className="text-afs-gray-300">·</span>
                    <span>Joined {tailor.joinDate}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {tailor.specialties.map((s, i) => (
                  <Badge key={i} variant="default" className="text-[11px] bg-afs-gray-50 border-afs-gray-100 text-afs-gray-600 lowercase">{s}</Badge>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6 mb-8 py-4 border-y border-afs-gray-50">
              <div className="flex flex-col gap-0.5">
                <span className="text-[20px] font-display text-afs-black">{tailor.portfolioCount}</span>
                <span className="text-[11px] uppercase font-bold text-afs-gray-400 tracking-wider">Portfolio Items</span>
              </div>
              <div className="flex flex-col gap-0.5 border-x border-afs-gray-50 px-6">
                <span className="text-[20px] font-display text-afs-black">{tailor.ordersOnPlatform}</span>
                <span className="text-[11px] uppercase font-bold text-afs-gray-400 tracking-wider">Orders on Platform</span>
              </div>
              <div className="flex flex-col gap-0.5 pl-6">
                <span className="text-[20px] font-display text-afs-black">2</span>
                <span className="text-[11px] uppercase font-bold text-afs-gray-400 tracking-wider">Days Pending</span>
              </div>
            </div>

            <div className="flex items-end justify-between gap-6">
              <div className="space-y-3">
                <span className="text-[11px] font-bold text-afs-gray-400 uppercase tracking-widest">Portfolio Preview</span>
                <div className="flex gap-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-16 h-16 bg-afs-gray-50 border border-afs-gray-100 rounded flex items-center justify-center group hover:bg-white transition-colors cursor-zoom-in">
                      <ImageIcon className="w-4 h-4 text-afs-gray-300 group-hover:text-afs-gray-400" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button 
                  onClick={() => console.log('Reject tailor:', tailor.id)}
                  className="flex items-center gap-2 px-4 py-2 text-[#B91C1C] hover:bg-red-50 rounded-md text-[13px] font-bold transition-all"
                >
                  <XCircle className="w-4 h-4" />
                  Reject
                </button>
                <button 
                  onClick={() => handleVerify(tailor.id)}
                  className="flex items-center gap-2 px-6 py-2.5 bg-afs-black text-white rounded-md text-[13px] font-bold shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <ShieldCheck className="w-4 h-4" />
                  Verify Tailor
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AdminResolutionPanel({ dispute }: { dispute: any }) {
  const [decision, setDecision] = React.useState<string | null>(null);
  const [tailorAmount, setTailorAmount] = React.useState<number>(0);
  const [customerAmount, setCustomerAmount] = React.useState<number>(0);
  const [note, setNote] = React.useState("");
  const totalEscrow = dispute.escrowAmount;

  const handleSplitChange = (val: number, party: 'tailor' | 'customer') => {
    if (party === 'tailor') {
      setTailorAmount(val);
      setCustomerAmount(totalEscrow - val);
    } else {
      setCustomerAmount(val);
      setTailorAmount(totalEscrow - val);
    }
  };

  const isInvalidSplit = decision === 'split' && (tailorAmount + customerAmount !== totalEscrow);
  const isEnabled = decision && note.length > 5 && !isInvalidSplit;

  return (
    <div className="bg-white border-t-2 border-afs-black rounded-b-lg shadow-xl p-8 sticky bottom-0 z-10 -mx-4 sm:mx-0">
      <div className="flex items-center gap-2 mb-2">
        <Scale className="w-5 h-5 text-afs-black" />
        <h3 className="text-[18px] font-medium text-afs-black">Admin Decision</h3>
      </div>
      <p className="text-[14px] text-afs-gray-500 italic mb-8">
        ₦{totalEscrow.toLocaleString()} currently held in escrow — your decision determines where it goes
      </p>

      <div className="space-y-4 mb-8">
        {/* Option A: Release to Tailor */}
        <div 
          onClick={() => setDecision('tailor')}
          className={`cursor-pointer group border rounded-lg p-5 transition-all ${decision === 'tailor' ? 'bg-afs-black text-white border-afs-black' : 'bg-afs-gray-50 border-afs-gray-100 hover:bg-white'}`}
        >
          <div className="flex items-start gap-4">
            <CheckCircle className={`w-6 h-6 shrink-0 mt-0.5 ${decision === 'tailor' ? 'text-white' : 'text-green-600'}`} />
            <div>
              <span className={`text-[15px] font-bold block mb-1 ${decision === 'tailor' ? 'text-white' : 'text-afs-black'}`}>Release full payment to tailor</span>
              <p className={`text-[13px] ${decision === 'tailor' ? 'text-afs-gray-300' : 'text-afs-gray-500'}`}>
                Tailor receives ₦{totalEscrow.toLocaleString()}. Customer's claim is rejected.
              </p>
            </div>
          </div>
        </div>

        {/* Option B: Refund to Customer */}
        <div 
          onClick={() => setDecision('customer')}
          className={`cursor-pointer group border rounded-lg p-5 transition-all ${decision === 'customer' ? 'bg-afs-black text-white border-afs-black' : 'bg-afs-gray-50 border-afs-gray-100 hover:bg-white'}`}
        >
          <div className="flex items-start gap-4">
            <XCircle className={`w-6 h-6 shrink-0 mt-0.5 ${decision === 'customer' ? 'text-white' : 'text-[#B91C1C]'}`} />
            <div>
              <span className={`text-[15px] font-bold block mb-1 ${decision === 'customer' ? 'text-white' : 'text-afs-black'}`}>Refund full amount to customer</span>
              <p className={`text-[13px] ${decision === 'customer' ? 'text-afs-gray-300' : 'text-afs-gray-500'}`}>
                Customer receives ₦{totalEscrow.toLocaleString()} back. Tailor receives nothing for this order.
              </p>
            </div>
          </div>
        </div>

        {/* Option C: Split Payment */}
        <div 
          onClick={() => {
            setDecision('split');
            if (tailorAmount === 0 && customerAmount === 0) {
              setTailorAmount(totalEscrow / 2);
              setCustomerAmount(totalEscrow / 2);
            }
          }}
          className={`cursor-pointer group border rounded-lg p-5 transition-all ${decision === 'split' ? 'bg-afs-black text-white border-afs-black' : 'bg-afs-gray-50 border-afs-gray-100 hover:bg-white'}`}
        >
          <div className="flex items-start gap-4">
            <Divide className={`w-6 h-6 shrink-0 mt-0.5 ${decision === 'split' ? 'text-white' : 'text-afs-gray-400'}`} />
            <div className="flex-1">
              <span className={`text-[15px] font-bold block mb-1 ${decision === 'split' ? 'text-white' : 'text-afs-black'}`}>Split payment</span>
              <p className={`text-[13px] ${decision === 'split' ? 'text-afs-gray-300' : 'text-afs-gray-500'}`}>
                Specify how to split the ₦{totalEscrow.toLocaleString()} between both parties
              </p>
              
              {decision === 'split' && (
                <div className="mt-4 pt-4 border-t border-afs-gray-700 flex flex-col sm:flex-row gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="flex-1">
                    <label className="text-[11px] uppercase font-bold text-afs-gray-400 block mb-1.5">To Tailor</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-afs-gray-400">₦</span>
                      <input 
                        type="number"
                        value={tailorAmount}
                        onChange={(e) => handleSplitChange(Number(e.target.value), 'tailor')}
                        className="w-full bg-afs-gray-800 border-none rounded p-2 pl-7 text-[14px] text-white outline-none focus:ring-1 focus:ring-white/20"
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <label className="text-[11px] uppercase font-bold text-afs-gray-400 block mb-1.5">To Customer</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-afs-gray-400">₦</span>
                      <input 
                        type="number"
                        value={customerAmount}
                        onChange={(e) => handleSplitChange(Number(e.target.value), 'customer')}
                        className="w-full bg-afs-gray-800 border-none rounded p-2 pl-7 text-[14px] text-white outline-none focus:ring-1 focus:ring-white/20"
                      />
                    </div>
                  </div>
                </div>
              )}
              {isInvalidSplit && (
                <p className="mt-2 text-[11px] text-red-400 font-bold">Total must equal ₦{totalEscrow.toLocaleString()}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Note Area */}
      <div className="mb-8">
        <label className="text-[13px] font-medium text-afs-black block mb-2">Decision note (required)</label>
        <textarea 
          placeholder="Explain your reasoning — this will be visible to both parties..."
          className="w-full bg-afs-gray-50 border border-afs-gray-100 rounded-lg p-4 text-[14px] outline-none focus:border-afs-black transition-colors min-h-[100px]"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </div>

      <button 
        disabled={!isEnabled}
        onClick={() => {
          console.log(`Resolution for ${dispute.id}:`, { decision, tailorAmount, customerAmount, note });
          alert('Decision submitted successfully. Funds have been released.');
        }}
        className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-[16px] transition-all shadow-lg ${isEnabled ? 'bg-afs-black text-white hover:scale-[1.01] active:scale-[0.99] cursor-pointer' : 'bg-afs-gray-100 text-afs-gray-400 cursor-not-allowed'}`}
      >
        <Scale className="w-5 h-5" />
        Submit Decision & Release Funds
      </button>
    </div>
  );
}

// Main Admin Dashboard Page
export default function AdminDashboardPage() {
  const { activePage } = useAdminDashboard();

  if (activePage === 'overview') return <OverviewTab />;
  if (activePage === 'users') return <UsersSection />;
  if (activePage === 'disputes') return <DisputesSection />;
  if (activePage === 'financials') return <FinancialsSection />;
  if (activePage === 'verifications') return <VerificationsSection />;

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] border-2 border-dashed border-afs-gray-100 rounded-2xl text-afs-gray-400 italic">
      <h3 className="text-[18px] font-medium mb-1 capitalize">{activePage} Section</h3>
      <p className="text-[14px]">This section is under construction.</p>
    </div>
  );
}
