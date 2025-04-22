import React from 'react';
import { X, ChevronRight, ChevronLeft } from 'lucide-react';

interface TourTooltipProps {
  title?: string;
  content: string;
  step: number;
  totalSteps: number;
  onNext: () => void;
  onPrev: () => void;
  onClose: () => void;
  position: {
    top: number;
    left: number;
  };
  placement: 'top' | 'right' | 'bottom' | 'left';
}

const TourTooltip: React.FC<TourTooltipProps> = ({
  title,
  content,
  step,
  totalSteps,
  onNext,
  onPrev,
  onClose,
  position,
  placement,
}) => {
  const getTooltipStyle = () => {
    const { top, left } = position;
    const offset = 16; // Distance from target element

    switch (placement) {
      case 'top':
        return {
          bottom: `calc(100% - ${top}px + ${offset}px)`,
          left: `${left}px`,
          transform: 'translateX(-50%)',
        };
      case 'right':
        return {
          top: `${top}px`,
          left: `${left + offset}px`,
          transform: 'translateY(-50%)',
        };
      case 'bottom':
        return {
          top: `${top + offset}px`,
          left: `${left}px`,
          transform: 'translateX(-50%)',
        };
      case 'left':
        return {
          top: `${top}px`,
          right: `calc(100% - ${left}px + ${offset}px)`,
          transform: 'translateY(-50%)',
        };
      default:
        return {
          top: `${top + offset}px`,
          left: `${left}px`,
          transform: 'translateX(-50%)',
        };
    }
  };

  const getArrowStyle = () => {
    switch (placement) {
      case 'top':
        return {
          bottom: '-8px',
          left: '50%',
          transform: 'translateX(-50%) rotate(45deg)',
          borderLeft: 'none',
          borderTop: 'none',
        };
      case 'right':
        return {
          left: '-8px',
          top: '50%',
          transform: 'translateY(-50%) rotate(45deg)',
          borderRight: 'none',
          borderBottom: 'none',
        };
      case 'bottom':
        return {
          top: '-8px',
          left: '50%',
          transform: 'translateX(-50%) rotate(45deg)',
          borderBottom: 'none',
          borderRight: 'none',
        };
      case 'left':
        return {
          right: '-8px',
          top: '50%',
          transform: 'translateY(-50%) rotate(45deg)',
          borderLeft: 'none',
          borderTop: 'none',
        };
      default:
        return {
          top: '-8px',
          left: '50%',
          transform: 'translateX(-50%) rotate(45deg)',
          borderBottom: 'none',
          borderRight: 'none',
        };
    }
  };

  return (
    <div
      className="absolute z-50 w-72 bg-white rounded-lg shadow-lg animate-fadeIn"
      style={getTooltipStyle()}
      role="dialog"
      aria-modal="true"
    >
      {/* Arrow */}
      <div
        className="absolute w-4 h-4 bg-white shadow-sm"
        style={getArrowStyle()}
      />

      {/* Close button */}
      <button
        className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition-colors"
        onClick={onClose}
        aria-label="Close tour"
      >
        <X size={18} />
      </button>

      {/* Content */}
      <div className="p-4">
        {title && <h3 className="text-lg font-semibold text-gray-800 mb-1">{title}</h3>}
        <p className="text-gray-600 mb-4">{content}</p>

        {/* Controls */}
        <div className="flex items-center justify-between mt-2">
          <div className="text-sm text-gray-500">
            {step + 1} of {totalSteps}
          </div>
          <div className="flex gap-2">
            {step > 0 && (
              <button
                className="p-2 rounded-full text-gray-600 hover:bg-gray-100 transition-colors"
                onClick={onPrev}
                aria-label="Previous step"
              >
                <ChevronLeft size={20} />
              </button>
            )}
            <button
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-1"
              onClick={onNext}
            >
              {step === totalSteps - 1 ? 'Finish' : 'Next'}
              {step !== totalSteps - 1 && <ChevronRight size={16} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourTooltip;