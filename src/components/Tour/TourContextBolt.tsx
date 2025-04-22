import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface TourStep {
  target: string; // CSS selector for the target element
  content: string; // Content to display in the tooltip
  title?: string; // Optional title for the tooltip
  placement?: 'top' | 'right' | 'bottom' | 'left'; // Tooltip placement
  onNext?: () => void; // Optional callback when user moves to the next step
}

interface TourContextType {
  steps: TourStep[];
  currentStep: number;
  isOpen: boolean;
  startTour: (steps: TourStep[]) => void;
  endTour: () => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  setTourCompleted: (completed: boolean) => void;
  isTourCompleted: boolean;
}

const TourContext = createContext<TourContextType | undefined>(undefined);

export const TOUR_COMPLETED_KEY = 'tour-completed';

interface TourProviderProps {
  children: ReactNode;
}

export const TourProvider: React.FC<TourProviderProps> = ({ children }) => {
  const [steps, setSteps] = useState<TourStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isTourCompleted, setIsTourCompleted] = useState(() => {
    // Check if the tour has been completed before
    const completed = localStorage.getItem(TOUR_COMPLETED_KEY);
    return completed === 'true';
  });

  // Save tour completion status to localStorage
  const setTourCompleted = (completed: boolean) => {
    localStorage.setItem(TOUR_COMPLETED_KEY, completed.toString());
    setIsTourCompleted(completed);
  };

  const startTour = (tourSteps: TourStep[]) => {
    setSteps(tourSteps);
    setCurrentStep(0);
    setIsOpen(true);
  };

  const endTour = () => {
    setIsOpen(false);
    // Optional: mark tour as completed when user ends it
    // setTourCompleted(true);
  };

  const nextStep = () => {
    const next = currentStep + 1;
    
    // Execute step's onNext callback if it exists
    if (steps[currentStep]?.onNext) {
      steps[currentStep].onNext?.();
    }

    if (next < steps.length) {
      setCurrentStep(next);
    } else {
      // Tour completed
      endTour();
      setTourCompleted(true);
    }
  };

  const prevStep = () => {
    const prev = currentStep - 1;
    if (prev >= 0) {
      setCurrentStep(prev);
    }
  };

  const goToStep = (step: number) => {
    if (step >= 0 && step < steps.length) {
      setCurrentStep(step);
    }
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'Escape':
          endTour();
          break;
        case 'ArrowRight':
        case 'Enter':
          nextStep();
          break;
        case 'ArrowLeft':
          prevStep();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentStep]);

  const value = {
    steps,
    currentStep,
    isOpen,
    startTour,
    endTour,
    nextStep,
    prevStep,
    goToStep,
    setTourCompleted,
    isTourCompleted,
  };

  return <TourContext.Provider value={value}>{children}</TourContext.Provider>;
};

export const useTour = (): TourContextType => {
  const context = useContext(TourContext);
  if (context === undefined) {
    throw new Error('useTour must be used within a TourProvider');
  }
  return context;
};