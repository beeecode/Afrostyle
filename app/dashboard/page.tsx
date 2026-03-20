"use client";

import React, { useState, useContext } from "react";
import Link from "next/link";
import { 
  ClipboardList, Wallet, PackageCheck, Star, AlertTriangle, AlertCircle, 
  Plus, Ruler, ImagePlus, ChevronRight, X, Upload, TrendingUp, Clock, Search
} from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { OrderStageTracker } from "@/components/features/OrderStageTracker";
import { DashboardContext } from "./layout";

// --- MOCK DATA ---

const OVERVIEW_STATS = {
  activeOrders: 8,
  pendingBalance: 145000,
  completedThisMonth: 12,
  avgRating: 4.8,
}

const RECENT_ORDERS = [
  { id: 'o1', customer: 'Chidinma Obi',   item: 'Bridal gown',        dueDate: 'Mar 22, 2026', stage: 'stitching',  amount: 85000,  depositPaid: true  },
  { id: 'o2', customer: 'Biodun Adeyemi', item: 'Senator suit',        dueDate: 'Mar 20, 2026', stage: 'finishing',  amount: 35000,  depositPaid: true  },
  { id: 'o3', customer: 'Ngozi Eze',      item: 'Corporate blazer',    dueDate: 'Mar 25, 2026', stage: 'cutting',    amount: 28000,  depositPaid: true  },
  { id: 'o4', customer: 'Emeka Tunde',    item: 'Agbada set',          dueDate: 'Mar 28, 2026', stage: 'measuring',  amount: 55000,  depositPaid: false },
  { id: 'o5', customer: 'Yetunde Kola',   item: 'Casual Ankara dress', dueDate: 'Apr 2, 2026',  stage: 'booked',     amount: 18000,  depositPaid: false },
  { id: 'o6', customer: 'Funke Bello',    item: 'Aso-ebi set',      dueDate: 'Apr 5, 2026', stage: 'delivered', amount: 42000, depositPaid: true  },
  { id: 'o7', customer: 'Chukwu Okafor',  item: 'Children\'s wear', dueDate: 'Apr 8, 2026', stage: 'booked',    amount: 12000, depositPaid: false },
  { id: 'o8', customer: 'Amara Nwosu',    item: 'Evening gown',      dueDate: 'Apr 10, 2026', stage: 'cutting',   amount: 65000, depositPaid: true  },
]

const EARNINGS_DATA = {
  totalEarned:    485000,
  thisMonth:      145000,
  lastMonth:      112000,
  pendingPayout:   87000,
  transactions: [
    { id: 't1', customer: 'Chidinma Obi',   item: 'Bridal gown',     type: 'deposit', amount: 42500, date: 'Mar 15, 2026', status: 'paid' },
    { id: 't2', customer: 'Biodun Adeyemi', item: 'Senator suit',     type: 'balance', amount: 35000, date: 'Mar 14, 2026', status: 'paid' },
    { id: 't3', customer: 'Ngozi Eze',      item: 'Corporate blazer', type: 'deposit', amount: 14000, date: 'Mar 12, 2026', status: 'paid' },
    { id: 't4', customer: 'Emeka Tunde',    item: 'Agbada set',       type: 'deposit', amount: 27500, date: 'Mar 10, 2026', status: 'pending' },
    { id: 't5', customer: 'Yetunde Kola',   item: 'Ankara dress',     type: 'balance', amount: 18000, date: 'Mar 8,  2026', status: 'paid' },
  ]
}

const MOCK_CUSTOMERS = [
  { id: 'c1', name: 'Chidinma Obi',   lastUpdated: 'Mar 15, 2026', orderCount: 3 },
  { id: 'c2', name: 'Biodun Adeyemi', lastUpdated: 'Feb 20, 2026', orderCount: 2 },
  { id: 'c3', name: 'Ngozi Eze',      lastUpdated: 'Feb 10, 2026', orderCount: 1 },
  { id: 'c4', name: 'Emeka Tunde',    lastUpdated: 'Jan 5,  2026', orderCount: 4 },
]

const MOCK_MEASUREMENTS: Record<string, any> = {
  c1: { chest: 38, bust: 36, shoulder: 15, armlength: 24, waist: 30, hip: 40, backlength: 16, frontlength: 18, inseam: 29, thigh: 22, knee: 16, calf: 14, wrist: 6, neck: 15, notes: 'Prefers slightly loose fit on torso. Has broader shoulders.' }
}

// --- COMPONENTS ---

function OverviewTab() {
  const isUrgent = (dateStr: string) => ['Mar 20, 2026', 'Mar 22, 2026'].includes(dateStr);
  const overviewOrders = RECENT_ORDERS.slice(0, 5);

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-8 animate-in fade-in duration-500 pb-20">
      
      {/* Header Area */}
      <div>
        <h1 className="font-display text-[32px] text-afs-black leading-tight mb-2">Overview</h1>
        <p className="text-[15px] text-afs-gray-700">Welcome back, Amaka. Here&apos;s a quick glance at your business.</p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        
        {/* Card 1 — Active orders */}
        <div className="bg-white border border-afs-gray-100 rounded-lg p-5 flex flex-col">
          <div className="w-10 h-10 rounded-md bg-afs-gray-50 flex items-center justify-center mb-4">
            <ClipboardList className="w-[18px] h-[18px] text-afs-black" />
          </div>
          <span className="font-display text-[36px] text-afs-black leading-none mb-1">{OVERVIEW_STATS.activeOrders}</span>
          <span className="text-[14px] text-afs-black font-medium mb-1">Active orders</span>
          <span className="text-[12px] text-afs-gray-500">2 due this week</span>
        </div>

        {/* Card 2 — Pending balance */}
        <div className="bg-white border border-afs-gray-100 rounded-lg p-5 flex flex-col">
          <div className="w-10 h-10 rounded-md bg-afs-gray-50 flex items-center justify-center mb-4">
            <Wallet className="w-[18px] h-[18px] text-afs-black" />
          </div>
          <span className="font-display text-[36px] text-afs-black leading-none mb-1">₦{OVERVIEW_STATS.pendingBalance.toLocaleString()}</span>
          <span className="text-[14px] text-afs-black font-medium mb-1">Pending balance</span>
          <span className="text-[12px] text-afs-gray-500">Across 5 orders</span>
        </div>

        {/* Card 3 — Completed this month */}
        <div className="bg-white border border-afs-gray-100 rounded-lg p-5 flex flex-col">
          <div className="w-10 h-10 rounded-md bg-afs-gray-50 flex items-center justify-center mb-4">
            <PackageCheck className="w-[18px] h-[18px] text-afs-black" />
          </div>
          <span className="font-display text-[36px] text-afs-black leading-none mb-1">{OVERVIEW_STATS.completedThisMonth}</span>
          <span className="text-[14px] text-afs-black font-medium mb-1">Completed in March</span>
          <span className="text-[12px] text-[#166534] font-medium">+3 from last month</span>
        </div>

        {/* Card 4 — Average rating */}
        <div className="bg-white border border-afs-gray-100 rounded-lg p-5 flex flex-col">
          <div className="w-10 h-10 rounded-md bg-afs-gray-50 flex items-center justify-center mb-4">
            <Star className="w-[18px] h-[18px] text-afs-black" />
          </div>
          <span className="font-display text-[36px] text-afs-black leading-none mb-1">{OVERVIEW_STATS.avgRating}★</span>
          <span className="text-[14px] text-afs-black font-medium mb-1">Average rating</span>
          <span className="text-[12px] text-afs-gray-500">Based on 124 reviews</span>
        </div>

      </div>

      {/* Urgent orders alert */}
      <div className="bg-afs-gray-50 border-l-[3px] border-l-afs-black rounded-r-md px-4 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <AlertTriangle className="w-4 h-4 text-afs-black shrink-0" />
          <span className="text-[14px] text-afs-black font-medium">2 orders are due within 3 days — check your order list</span>
        </div>
        <button className="text-[13px] text-afs-gray-500 hover:text-afs-black transition-colors font-medium shrink-0 ml-4">
          View orders
        </button>
      </div>

      {/* Recent orders table */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[16px] text-afs-black font-medium">Recent orders</h3>
          <button className="text-[13px] text-afs-gray-500 hover:text-afs-black transition-colors font-medium flex items-center gap-1">
            View all &rarr;
          </button>
        </div>

        {/* Table Container */}
        <div className="bg-white border border-afs-gray-100 rounded-lg shadow-card overflow-hidden">
          
          {/* Mobile View (Cards) */}
          <div className="md:hidden flex flex-col divide-y divide-afs-gray-100">
            {overviewOrders.map(order => (
              <div key={order.id} className="p-4 flex flex-col gap-3">
                <div className="flex justify-between items-start">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[14px] font-medium text-afs-black">{order.customer}</span>
                    <span className="text-[13px] text-afs-gray-500">{order.item}</span>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-[14px] font-medium text-afs-black">₦{order.amount.toLocaleString()}</span>
                    <Badge variant={order.depositPaid ? "success" : "warning"} className="text-[10px] px-2 py-0.5 border-none">
                      {order.depositPaid ? "Paid" : "Pending"}
                    </Badge>
                  </div>
                </div>
                
                <div className="h-px bg-afs-gray-50 my-1" />
                
                <div className="flex justify-between items-center bg-afs-gray-50 rounded-md p-2">
                  <div className="w-[140px] shrink-0">
                    <OrderStageTracker stage={order.stage as any} compact={true} />
                  </div>
                  <div className={`text-[12px] font-medium flex items-center gap-1.5 ${isUrgent(order.dueDate) ? 'text-red-500' : 'text-afs-gray-500'} text-right`}>
                    {isUrgent(order.dueDate) && <AlertCircle className="w-[14px] h-[14px] shrink-0" />}
                    {order.dueDate.replace(/, 2026/,'')}
                  </div>
                </div>
                
              </div>
            ))}
          </div>

          {/* Desktop View (Table) */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-afs-gray-50 border-b border-afs-gray-100 text-[12px] uppercase text-afs-gray-500 font-semibold tracking-wider">
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Item</th>
                  <th className="px-6 py-4">Due date</th>
                  <th className="px-6 py-4">Stage</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4 text-right">Deposit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-afs-gray-100">
                {overviewOrders.map(order => (
                  <tr key={order.id} className="hover:bg-afs-gray-50/50 transition-colors">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <Avatar fallback={order.customer.split(' ').map(n => n[0]).join('')} size="sm" />
                        <span className="text-[14px] font-medium text-afs-black whitespace-nowrap">{order.customer}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className="text-[14px] text-afs-gray-700 whitespace-nowrap">{order.item}</span>
                    </td>
                    <td className="px-6 py-5">
                      <div className={`flex items-center gap-1.5 text-[13px] font-medium whitespace-nowrap ${isUrgent(order.dueDate) ? 'text-red-500' : 'text-afs-gray-500'}`}>
                        {isUrgent(order.dueDate) && <AlertCircle className="w-3.5 h-3.5" />}
                        {order.dueDate}
                      </div>
                    </td>
                    <td className="px-6 py-5 w-[180px]">
                      <OrderStageTracker stage={order.stage as any} compact={true} />
                    </td>
                    <td className="px-6 py-5">
                      <div className="text-[14px] font-medium text-afs-black whitespace-nowrap">
                        ₦{order.amount.toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <Badge variant={order.depositPaid ? "success" : "warning"} className="text-[11px] align-middle font-medium px-2 py-0.5 border-none">
                        {order.depositPaid ? "Paid" : "Pending"}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>

      {/* Quick actions row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Action 1 */}
        <div className="bg-white border border-afs-gray-100 rounded-lg p-5 flex flex-col items-center hover:shadow-sm transition-shadow">
          <Button 
            className="w-full text-[14px] font-medium bg-afs-black text-white hover:bg-afs-black/90 py-6 shrink-0" 
            onClick={() => console.log('New order')}
          >
            <Plus className="w-[18px] h-[18px] mr-2" />
            New order
          </Button>
        </div>
        
        {/* Action 2 */}
        <div className="bg-white border border-afs-gray-100 rounded-lg p-5 flex flex-col items-center hover:shadow-sm transition-shadow">
          <Button 
            variant="secondary"
            className="w-full text-[14px] font-medium py-6 shrink-0" 
            onClick={() => console.log('Record measurements')}
          >
            <Ruler className="w-[18px] h-[18px] mr-2 text-afs-gray-500" />
            Record measurements
          </Button>
        </div>
        
        {/* Action 3 */}
        <div className="bg-white border border-afs-gray-100 rounded-lg p-5 flex flex-col items-center hover:shadow-sm transition-shadow">
          <Button 
            variant="secondary"
            className="w-full text-[14px] font-medium py-6 shrink-0" 
            onClick={() => console.log('Upload to portfolio')}
          >
            <ImagePlus className="w-[18px] h-[18px] mr-2 text-afs-gray-500" />
            Upload to portfolio
          </Button>
        </div>
        
      </div>

    </div>
  );
}

function OrdersTab() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Grouping logic based on prompt
  const TABS = [
    { id: 'All', label: 'All' },
    { id: 'Booked', label: 'Booked' },
    { id: 'In Progress', label: 'In Progress' },
    { id: 'Ready', label: 'Ready' },
    { id: 'Delivered', label: 'Delivered' },
  ];

  const getFilteredOrders = (filterId: string) => {
    return RECENT_ORDERS.filter(o => {
      if (filterId === 'All') return true;
      if (filterId === 'Booked') return o.stage === 'booked';
      if (filterId === 'In Progress') return ['measuring', 'cutting', 'stitching', 'finishing'].includes(o.stage);
      if (filterId === 'Ready') return o.stage === 'ready';
      if (filterId === 'Delivered') return o.stage === 'delivered';
      return true;
    });
  };

  const filteredOrders = getFilteredOrders(activeFilter);

  const isUrgent = (dateStr: string) => ['Mar 20, 2026', 'Mar 22, 2026'].includes(dateStr);
  const isOverdue = (dateStr: string) => false; // Expand dynamically if needed

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-6 animate-in fade-in duration-500 pb-20">
      
      {/* Header */}
      <div className="flex justify-between items-center bg-white p-6 rounded-xl border border-afs-gray-100 shadow-sm">
        <h1 className="font-display text-[24px] text-afs-black leading-none mt-1">All Orders</h1>
        <Button 
          onClick={() => setIsModalOpen(true)}
          className="bg-afs-black text-white hover:bg-afs-black/90 font-medium"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Order
        </Button>
      </div>

      {/* Filter Tabs & Sort Box */}
      <div className="flex flex-col md:flex-row pb-2 justify-between items-start md:items-center gap-4">
        
        {/* Scrollable Pills */}
        <div className="flex gap-2 overflow-x-auto w-full md:w-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {TABS.map(tab => {
            const count = getFilteredOrders(tab.id).length;
            const isActive = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-[13px] font-medium whitespace-nowrap transition-colors ${
                  isActive 
                    ? 'bg-afs-black text-white' 
                    : 'bg-white border border-afs-gray-200 text-afs-gray-700 hover:bg-afs-gray-50'
                }`}
              >
                <span>{tab.label}</span>
                <span className={`px-1.5 py-0.5 rounded-sm text-[11px] leading-none block ${
                  isActive ? 'bg-white/20 text-white' : 'bg-afs-gray-100 text-afs-gray-500'
                }`}>
                  {count}
                </span>
              </button>
            )
          })}
        </div>

        {/* Sort box mock */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[13px] text-afs-gray-500 font-medium">Sort by:</span>
          <select className="bg-white border border-afs-gray-200 rounded-md text-[13px] text-afs-gray-700 px-3 py-1.5 outline-none focus:border-afs-black transition-colors">
            <option>Due date</option>
            <option>Date created</option>
            <option>Customer name</option>
            <option>Amount</option>
          </select>
        </div>
      </div>

      {/* Orders List Stack */}
      <div className="flex flex-col gap-4">
        {filteredOrders.length === 0 ? (
          <div className="p-12 bg-white rounded-xl border border-afs-gray-100 text-center flex flex-col items-center">
             <ClipboardList className="w-8 h-8 text-afs-gray-300 mb-3" />
             <p className="text-afs-gray-500 text-[14px]">No orders found for this stage.</p>
          </div>
        ) : (
          filteredOrders.map(order => (
            <div 
              key={order.id} 
              className="bg-white border border-afs-gray-100 rounded-lg p-5 flex flex-col gap-5 hover:shadow-card transition-shadow"
            >
              
              {/* Top Row */}
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <Avatar fallback={order.customer.split(' ').map(n=>n[0]).join('')} size="sm" />
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[15px] font-medium text-afs-black">{order.customer}</span>
                    <span className="text-[13px] text-afs-gray-500">{order.item}</span>
                  </div>
                </div>

                <div className={`text-[13px] font-medium flex items-center gap-1.5 ${isUrgent(order.dueDate) ? 'text-amber-600' : isOverdue(order.dueDate) ? 'text-red-600' : 'text-afs-gray-500'}`}>
                   {(isUrgent(order.dueDate) || isOverdue(order.dueDate)) && <AlertCircle className="w-3.5 h-3.5" />}
                   Due {order.dueDate}
                </div>
              </div>

              {/* Middle Row: Full Stage Tracker */}
              <div className="w-full">
                <OrderStageTracker stage={order.stage as any} compact={false} />
              </div>

              {/* Bottom Row */}
              <div className="flex justify-between items-center border-t border-afs-gray-50 pt-4">
                <div className="flex items-center gap-3">
                  <span className="text-[15px] font-medium text-afs-black">₦{order.amount.toLocaleString()}</span>
                  <Badge variant={order.depositPaid ? "success" : "warning"} className="text-[11px] font-medium px-2 py-0.5 border-none">
                    {order.depositPaid ? "Paid" : "Pending"}
                  </Badge>
                </div>

                <div className="flex items-center gap-2">
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    className="text-[12px] h-8"
                    onClick={() => console.log('Update stage clicked')}
                  >
                    Update stage
                  </Button>
                  <button 
                    onClick={() => console.log('Navigate to order details')}
                    className="w-8 h-8 border border-afs-gray-200 rounded-md flex items-center justify-center text-afs-gray-500 hover:text-afs-black hover:border-afs-gray-400 transition-colors bg-white"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>
          ))
        )}
      </div>

      {/* New Order Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in transition-all" 
            onClick={() => setIsModalOpen(false)} 
          />
          <div className="bg-white rounded-xl shadow-deep w-full max-w-[480px] relative z-10 flex flex-col p-6 animate-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-display text-[20px] text-afs-black mt-1">New Order</h2>
              <button 
                className="text-afs-gray-500 hover:text-afs-black p-1 hover:bg-afs-gray-50 rounded-md transition-colors"
                onClick={() => setIsModalOpen(false)}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form className="flex flex-col gap-4" onSubmit={(e) => {
              e.preventDefault();
              console.log('Form data submitted');
              setIsModalOpen(false);
            }}>
              
              <Input 
                label="Customer name" 
                placeholder="e.g. Chidinma Obi" 
                id="customer"
                required
              />

              <Input 
                label="Item / style description" 
                placeholder="e.g. Bridal gown" 
                id="item"
                required
              />

              <Input 
                label="Due date" 
                type="date"
                id="dueDate"
                required
              />

              <div className="grid grid-cols-2 gap-4">
                <Input 
                  label="Deposit amount (₦)" 
                  type="number"
                  placeholder="0.00"
                  id="depositAmount"
                />
                <Input 
                  label="Total amount (₦)" 
                  type="number"
                  placeholder="0.00"
                  id="totalAmount"
                  required
                />
              </div>

              {/* Upload block */}
              <div className="mt-2 text-left">
                 <span className="block text-[13px] text-afs-gray-700 font-medium mb-1.5">Style reference</span>
                 <button 
                   type="button"
                   className="w-full h-[100px] bg-afs-gray-50 border border-dashed border-afs-gray-300 rounded-lg flex flex-col items-center justify-center gap-2 hover:bg-afs-gray-100 hover:border-afs-gray-400 transition-colors"
                 >
                   <Upload className="w-5 h-5 text-afs-gray-400" />
                   <span className="text-[13px] text-afs-gray-500">Upload style photo</span>
                 </button>
              </div>

              {/* Modal Footer */}
              <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-afs-gray-100">
                <Button 
                  type="button" 
                  variant="ghost" 
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="bg-afs-black text-white hover:bg-afs-black/90 font-medium"
                >
                  Create Order
                </Button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  )
}

function EarningsTab() {
  const chartHeight = 160;
  const maxVal = 145000;
  const chartData = [
    { month: 'Oct', val: 68000, label: '68k' },
    { month: 'Nov', val: 72000, label: '72k' },
    { month: 'Dec', val: 95000, label: '95k' },
    { month: 'Jan', val: 88000, label: '88k' },
    { month: 'Feb', val: 112000, label: '112k' },
    { month: 'Mar', val: 145000, label: '145k' },
  ];

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-8 animate-in fade-in duration-500 pb-20">
      
      {/* Header */}
      <div>
        <h1 className="font-display text-[32px] text-afs-black leading-tight mb-2">Earnings</h1>
        <p className="text-[15px] text-afs-gray-700">Track your income and pending payments.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Card 1 */}
        <div className="bg-white border border-afs-gray-100 rounded-lg p-6 flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <span className="text-[14px] text-afs-gray-500 font-medium">Total earned all time</span>
            <div className="w-8 h-8 rounded-md bg-green-50 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-green-600" />
            </div>
          </div>
          <span className="font-display text-[36px] text-afs-black leading-none mb-1">
            ₦{EARNINGS_DATA.totalEarned.toLocaleString()}
          </span>
        </div>

        {/* Card 2 */}
        <div className="bg-white border border-afs-gray-100 rounded-lg p-6 flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <span className="text-[14px] text-afs-gray-500 font-medium">Earned in March 2026</span>
          </div>
          <span className="font-display text-[36px] text-afs-black leading-none mb-2">
            ₦{EARNINGS_DATA.thisMonth.toLocaleString()}
          </span>
          <div className="flex items-center gap-1.5 text-green-600">
            <TrendingUp className="w-3.5 h-3.5" />
            <span className="text-[12px] font-medium">+29% vs last month</span>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white border border-afs-gray-100 rounded-lg p-6 flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <span className="text-[14px] text-afs-gray-500 font-medium">Awaiting customer payment</span>
            <div className="w-8 h-8 rounded-md bg-amber-50 flex items-center justify-center">
              <Clock className="w-4 h-4 text-amber-600" />
            </div>
          </div>
          <span className="font-display text-[36px] text-afs-black leading-none mb-1">
            ₦{EARNINGS_DATA.pendingPayout.toLocaleString()}
          </span>
        </div>

      </div>

      {/* Chart & Table Matrix */}
      <div className="flex flex-col gap-8">
        
        {/* Monthly Chart */}
        <div className="bg-white border border-afs-gray-100 rounded-lg p-6">
          <h3 className="text-[16px] text-afs-black font-medium mb-8">Monthly earnings</h3>
          
          <div className="flex items-end justify-between gap-2 h-[160px] border-b border-afs-gray-100 pb-2 px-2">
            {chartData.map(item => {
              const h = (item.val / maxVal) * chartHeight;
              return (
                <div key={item.month} className="flex flex-col items-center group relative w-full max-w-[60px]">
                  {/* Tooltip */}
                  <div className="absolute -top-10 bg-afs-black text-white text-[11px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none">
                    ₦{item.val.toLocaleString()}
                  </div>
                  
                  {/* Amount Label */}
                  <span className="text-[11px] text-afs-gray-700 mb-2">{item.label}</span>
                  
                  {/* Bar */}
                  <div 
                    className="w-full bg-afs-black rounded-t-sm transition-colors duration-200 group-hover:bg-afs-gray-700" 
                    style={{ height: `${Math.max(h, 4)}px` }} 
                  />
                </div>
              )
            })}
          </div>
          <div className="flex justify-between px-2 pt-3">
            {chartData.map(item => (
              <div key={item.month} className="w-full max-w-[60px] text-center text-[11px] text-afs-gray-500">
                {item.month}
              </div>
            ))}
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-white border border-afs-gray-100 rounded-lg overflow-hidden flex flex-col">
          <div className="p-6 border-b border-afs-gray-100 flex items-center justify-between">
            <h3 className="text-[16px] text-afs-black font-medium">Transaction history</h3>
            <select className="bg-white border border-afs-gray-200 rounded-md text-[13px] text-afs-gray-700 px-3 py-1.5 outline-none focus:border-afs-black transition-colors">
              <option>Mar 2026</option>
              <option>Feb 2026</option>
              <option>Jan 2026</option>
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white border-b border-afs-gray-100 text-[12px] uppercase text-afs-gray-500 font-semibold tracking-wider">
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Item</th>
                  <th className="px-6 py-4">Type</th>
                  <th className="px-6 py-4 text-right">Amount</th>
                  <th className="px-6 py-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody>
                {EARNINGS_DATA.transactions.map((t, idx) => (
                  <tr key={t.id} className={idx % 2 === 0 ? "bg-white" : "bg-afs-gray-50/50"}>
                    <td className="px-6 py-4 whitespace-nowrap text-[13px] text-afs-gray-500 font-medium">{t.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-[14px] font-medium text-afs-black">{t.customer}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-[14px] text-afs-gray-700">{t.item}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant={t.type === 'deposit' ? 'default' : 'info'} className="text-[11px] font-medium px-2 py-0.5 capitalize border-none">
                        {t.type}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-[14px] font-medium text-afs-black">
                      ₦{t.amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <Badge variant={t.status === 'paid' ? 'success' : 'warning'} className="text-[11px] font-medium px-2 py-0.5 capitalize border-none">
                        {t.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-white p-5 border-t border-afs-gray-100 flex items-center justify-between text-[13px]">
            <span className="text-afs-gray-500">Showing {EARNINGS_DATA.transactions.length} transactions</span>
            <span className="font-medium text-afs-black flex items-center gap-1.5">
              Total: 
              <span className="text-[14px]">₦137,000</span>
            </span>
          </div>
        </div>

      </div>

    </div>
  )
}

// --- MAIN EXPORT CONTROLLER ---

function MeasurementsTab() {
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Record<string, any>>({});

  const filteredCustomers = MOCK_CUSTOMERS.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedCustomer = MOCK_CUSTOMERS.find(c => c.id === selectedCustomerId);
  const existingMeasurements = selectedCustomerId ? MOCK_MEASUREMENTS[selectedCustomerId] : null;

  const handleSelectCustomer = (id: string) => {
    setSelectedCustomerId(id);
    setIsEditing(false);
    setFormData(MOCK_MEASUREMENTS[id] || {});
  };

  const startEditing = () => {
    if (!existingMeasurements) {
       setFormData({});
    } else {
       setFormData({ ...existingMeasurements });
    }
    setIsEditing(true);
  };

  const handleInputChange = (field: string, val: string) => {
    setFormData(prev => ({...prev, [field]: val}));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Saved measurements for', selectedCustomerId, formData);
    setIsEditing(false);
  };

  return (
    <div className="max-w-6xl mx-auto flex flex-col h-[calc(100vh-100px)] animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="shrink-0 mb-6">
        <h1 className="font-display text-[32px] text-afs-black leading-tight mb-2">Measurements</h1>
        <p className="text-[15px] text-afs-gray-700">Manage client sizes and fitting preferences.</p>
      </div>

      {/* Main Two-Panel Layout */}
      <div className="flex flex-col md:flex-row gap-6 flex-1 min-h-0">
        
        {/* Left Panel - Customer List */}
        <div className="w-full md:w-[320px] bg-white border border-afs-gray-100 rounded-xl flex flex-col overflow-hidden shrink-0 shadow-sm h-full max-h-[600px]">
          
          <div className="p-4 border-b border-afs-gray-100 shrink-0 bg-afs-gray-50/50">
            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-[16px] font-medium text-afs-black">Customers</h2>
              <Badge variant="default" className="text-[11px] px-2 py-0.5 bg-afs-gray-200 text-afs-black border-none">
                {MOCK_CUSTOMERS.length}
              </Badge>
            </div>
            <div className="relative">
              <Search className="w-4 h-4 text-afs-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search customer"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-white border border-afs-gray-200 rounded-md text-[13px] text-afs-black outline-none focus:border-afs-black transition-colors"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto min-h-0">
            {filteredCustomers.map(customer => {
              const isActive = selectedCustomerId === customer.id;
              return (
                <button
                  key={customer.id}
                  onClick={() => handleSelectCustomer(customer.id)}
                  className={`w-full flex items-center gap-3 p-4 text-left transition-colors border-b border-afs-gray-50 last:border-b-0 ${
                    isActive 
                      ? 'bg-afs-gray-50 border-l-2 border-l-afs-black pl-[14px]' 
                      : 'bg-white hover:bg-afs-gray-50 border-l-2 border-l-transparent'
                  }`}
                >
                  <Avatar fallback={customer.name.split(' ').map(n=>n[0]).join('')} size="sm" />
                  <div className="flex flex-col min-w-0">
                    <span className="text-[14px] font-medium text-afs-black truncate">{customer.name}</span>
                    <span className="text-[12px] text-afs-gray-500 truncate">Last updated {customer.lastUpdated}</span>
                  </div>
                </button>
              )
            })}
          </div>

          <div className="p-3 border-t border-afs-gray-100 shrink-0">
            <Button variant="ghost" className="w-full text-[13px] font-medium text-afs-black hover:bg-afs-gray-50" onClick={() => console.log('Add customer clicked')}>
              <Plus className="w-4 h-4 mr-2" />
              Add new customer
            </Button>
          </div>

        </div>

        {/* Right Panel - Form */}
        <div className="flex-1 bg-white border border-afs-gray-100 rounded-xl overflow-hidden shadow-sm flex flex-col h-full max-h-[600px]">
          {!selectedCustomer ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-white">
              <div className="w-16 h-16 rounded-full bg-afs-gray-50 flex items-center justify-center mb-4">
                <Ruler className="w-8 h-8 text-afs-gray-300 transform -rotate-45" />
              </div>
              <p className="text-[15px] font-medium text-afs-gray-500 max-w-[240px] leading-relaxed">
                Select a customer from the list to view or edit their measurements
              </p>
            </div>
          ) : (
            <div className="flex flex-col h-full">
              
              <div className="p-6 border-b border-afs-gray-100 flex justify-between items-start shrink-0">
                <div className="flex flex-col">
                  <h2 className="font-display text-[24px] text-afs-black mb-1">{selectedCustomer.name}</h2>
                  <span className="text-[13px] text-afs-gray-500">
                    {existingMeasurements ? `Last updated ${selectedCustomer.lastUpdated}` : "No measurements recorded yet"}
                  </span>
                </div>
                {!isEditing && existingMeasurements && (
                  <Button variant="secondary" size="sm" onClick={startEditing}>
                    Edit measurements
                  </Button>
                )}
              </div>

              {!existingMeasurements && !isEditing ? (
                <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                  <Ruler className="w-8 h-8 text-afs-gray-300 mb-4 transform -rotate-45" />
                  <p className="text-[14px] text-afs-gray-500 mb-6 font-medium">No sizing data found for this customer.</p>
                  <Button className="bg-afs-black text-white hover:bg-afs-black/90 px-6" onClick={startEditing}>
                    <Plus className="w-4 h-4 mr-2" />
                    Record measurements
                  </Button>
                </div>
              ) : (
                <form className="flex-1 overflow-y-auto p-6" onSubmit={handleSave}>
                  <div className="max-w-3xl space-y-10">
                    
                    {/* Upper Body */}
                    <section>
                      <h3 className="text-[12px] uppercase text-afs-gray-500 tracking-widest font-semibold mb-5 border-b border-afs-gray-100 pb-2">Upper Body</h3>
                      <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                        {['Chest', 'Bust', 'Shoulder width', 'Arm length', 'Wrist', 'Neck'].map(lbl => {
                          const f = lbl.replace(' width','').replace(' length','length').toLowerCase();
                          return (
                            <div key={f} className="flex flex-col">
                              <label className="text-[12px] text-afs-gray-700 font-medium mb-1.5">{lbl} (in)</label>
                              <input 
                                type="number" 
                                readOnly={!isEditing}
                                value={formData[f] || ''}
                                onChange={e => handleInputChange(f, e.target.value)}
                                className={`w-full px-3 py-2 text-[14px] rounded-md outline-none transition-colors border ${
                                  !isEditing 
                                    ? 'bg-afs-gray-50 border-transparent text-afs-black cursor-default' 
                                    : 'bg-white border-afs-gray-300 text-afs-black focus:border-afs-black'
                                }`}
                              />
                            </div>
                          )
                        })}
                      </div>
                    </section>

                    {/* Torso */}
                    <section>
                      <h3 className="text-[12px] uppercase text-afs-gray-500 tracking-widest font-semibold mb-5 border-b border-afs-gray-100 pb-2">Torso</h3>
                      <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                        {['Waist', 'Hip', 'Back length', 'Front length'].map(lbl => {
                          const f = lbl.replace(' length','length').toLowerCase();
                          return (
                            <div key={f} className="flex flex-col">
                              <label className="text-[12px] text-afs-gray-700 font-medium mb-1.5">{lbl} (in)</label>
                              <input 
                                type="number" 
                                readOnly={!isEditing}
                                value={formData[f] || ''}
                                onChange={e => handleInputChange(f, e.target.value)}
                                className={`w-full px-3 py-2 text-[14px] rounded-md outline-none transition-colors border ${
                                  !isEditing 
                                    ? 'bg-afs-gray-50 border-transparent text-afs-black cursor-default' 
                                    : 'bg-white border-afs-gray-300 text-afs-black focus:border-afs-black'
                                }`}
                              />
                            </div>
                          )
                        })}
                      </div>
                    </section>
                    
                    {/* Lower Body */}
                    <section>
                      <h3 className="text-[12px] uppercase text-afs-gray-500 tracking-widest font-semibold mb-5 border-b border-afs-gray-100 pb-2">Lower Body</h3>
                      <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                        {['Inseam', 'Thigh', 'Knee', 'Calf'].map(lbl => {
                          const f = lbl.toLowerCase();
                          return (
                            <div key={f} className="flex flex-col">
                              <label className="text-[12px] text-afs-gray-700 font-medium mb-1.5">{lbl} (in)</label>
                              <input 
                                type="number" 
                                readOnly={!isEditing}
                                value={formData[f] || ''}
                                onChange={e => handleInputChange(f, e.target.value)}
                                className={`w-full px-3 py-2 text-[14px] rounded-md outline-none transition-colors border ${
                                  !isEditing 
                                    ? 'bg-afs-gray-50 border-transparent text-afs-black cursor-default' 
                                    : 'bg-white border-afs-gray-300 text-afs-black focus:border-afs-black'
                                }`}
                              />
                            </div>
                          )
                        })}
                      </div>
                    </section>

                    {/* Notes */}
                    <section>
                      <h3 className="text-[12px] uppercase text-afs-gray-500 tracking-widest font-semibold mb-5 border-b border-afs-gray-100 pb-2">Notes</h3>
                      <textarea
                        readOnly={!isEditing}
                        value={formData.notes || ''}
                        onChange={e => handleInputChange('notes', e.target.value)}
                        placeholder="Body shape notes, fitting preferences, past issues..."
                        className={`w-full h-32 px-4 py-3 text-[14px] rounded-md outline-none transition-colors border resize-none ${
                                  !isEditing 
                                    ? 'bg-afs-gray-50 border-transparent text-afs-black cursor-default' 
                                    : 'bg-white border-afs-gray-300 text-afs-black focus:border-afs-black'
                                }`}
                      />
                    </section>

                  </div>

                  {/* Actions Footer */}
                  {isEditing && (
                    <div className="mt-8 pt-6 border-t border-afs-gray-100 flex justify-end gap-3 sticky bottom-[-24px] bg-white z-10 py-6">
                      <Button type="button" variant="ghost" className="px-5 font-medium" onClick={() => {
                        setIsEditing(false);
                      }}>
                        Cancel
                      </Button>
                      <Button type="submit" className="bg-afs-black text-white hover:bg-afs-black/90 px-6 font-medium">
                        Save changes
                      </Button>
                    </div>
                  )}

                </form>
              )}

            </div>
          )}
        </div>

      </div>

    </div>
  )
}

export default function DashboardPage() {
  const { activePage } = useContext(DashboardContext);

  if (activePage === 'overview') return <OverviewTab />;
  if (activePage === 'orders') return <OrdersTab />;
  if (activePage === 'earnings') return <EarningsTab />;
  if (activePage === 'measurements') return <MeasurementsTab />;
  
  return (
    <div className="flex items-center justify-center h-full p-8 text-afs-gray-500 italic max-w-6xl mx-auto rounded-xl border border-afs-gray-100 bg-white shadow-sm">
      The &apos;{activePage}&apos; dashboard panel is currently under construction. Please use Overview, Orders, Earnings, or Measurements.
    </div>
  );
}
