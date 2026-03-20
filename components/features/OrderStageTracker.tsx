import React from 'react';
import { Check } from 'lucide-react';

export interface OrderStageTrackerProps {
  currentStage: 'booked' | 'measuring' | 'cutting' | 'stitching' | 'finishing' | 'ready' | 'delivered';
  compact?: boolean;
}

const STAGES = [
  'booked',
  'measuring',
  'cutting',
  'stitching',
  'finishing',
  'ready',
  'delivered'
] as const;

const STAGE_LABELS: Record<typeof STAGES[number], string> = {
  booked: 'Booked',
  measuring: 'Measuring',
  cutting: 'Cutting',
  stitching: 'Stitching',
  finishing: 'Finishing',
  ready: 'Ready',
  delivered: 'Delivered',
};

export const OrderStageTracker: React.FC<OrderStageTrackerProps> = ({ currentStage, compact = false }) => {
  const currentIndex = STAGES.indexOf(currentStage);

  const MobileView = () => (
    <div className="flex sm:hidden items-center justify-between p-4 bg-afs-gray-50 rounded-lg border border-afs-gray-300">
      <div className="flex flex-col">
        <span className="text-xs font-medium text-afs-gray-500 uppercase tracking-wider">
          Step {currentIndex + 1} of {STAGES.length}
        </span>
        <span className="text-sm font-semibold text-afs-black mt-1">
          {STAGE_LABELS[currentStage]}
        </span>
      </div>
      <div className="relative flex h-8 w-8 items-center justify-center">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-afs-black opacity-20"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-afs-black"></span>
      </div>
    </div>
  );

  const DesktopView = () => (
    <div className={`hidden sm:flex ${compact ? 'gap-4 items-center' : 'w-full justify-between items-start'} relative`}>
      {STAGES.map((stage, index) => {
        const isCompleted = index < currentIndex;
        const isCurrent = index === currentIndex;
        const isUpcoming = index > currentIndex;
        const isLast = index === STAGES.length - 1;

        return (
          <div key={stage} className={`relative flex items-center ${compact ? '' : 'flex-1 flex-col'}`}>
            {!isLast && !compact && (
              <div 
                className={`absolute top-4 left-1/2 w-full h-0 border-b-2 -translate-y-1/2 z-0 ${
                  isCompleted ? 'border-solid border-afs-black' : 'border-dashed border-afs-gray-300'
                }`}
              />
            )}
            
            {compact && index > 0 && (
              <div 
                className={`absolute top-1/2 -left-4 w-4 h-0 border-b-2 -translate-y-1/2 z-0 ${
                  index <= currentIndex ? 'border-solid border-afs-black' : 'border-dashed border-afs-gray-300'
                }`}
              />
            )}

            <div className="relative z-10 flex h-8 items-center justify-center bg-afs-white ring-4 ring-white rounded-full">
              {isCompleted && (
                <div className="w-6 h-6 rounded-full bg-afs-black flex items-center justify-center">
                  <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
                </div>
              )}
              
              {isCurrent && (
                <div className="relative flex items-center justify-center w-8 h-8">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-afs-black opacity-20 animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]" />
                  <div className="w-6 h-6 rounded-full bg-afs-black flex items-center justify-center relative z-10">
                    <div className="w-2 h-2 rounded-full bg-white" />
                  </div>
                </div>
              )}

              {isUpcoming && (
                <div className="w-6 h-6 rounded-full border-2 border-afs-gray-300 bg-white" />
              )}
            </div>

            {!compact && (
              <span 
                className={`mt-2 text-xs text-center w-full whitespace-nowrap ${
                  isUpcoming ? 'text-afs-gray-500 font-medium' : 'text-afs-black'
                } ${isCurrent ? 'font-bold' : ''}`}
              >
                {STAGE_LABELS[stage]}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="w-full" role="region" aria-label="Order progress tracker">
      <MobileView />
      <DesktopView />
    </div>
  );
};
