import React, { useEffect, useState } from "react";
import { useTour } from "./TourContextBolt";
import TourOverlay from "./TourOverlayBolt";
import TourHighlight from "./TourHighlightBolt";
import TourTooltip from "./TourTooltipBolt";

interface TargetPosition {
  top: number;
  left: number;
  width: number;
  height: number;
  element: HTMLElement;
}

const Tour: React.FC = () => {
  const { steps, currentStep, isOpen, endTour, nextStep, prevStep } = useTour();

  const [targetPosition, setTargetPosition] = useState<TargetPosition | null>(
    null,
  );

  // Update target position when the current step changes
  useEffect(() => {
    if (!isOpen) return;

    const updateTargetPosition = () => {
      try {
        const currentTargetSelector = steps[currentStep]?.target;
        if (!currentTargetSelector) return;

        const element = document.querySelector(
          currentTargetSelector,
        ) as HTMLElement;
        if (!element) {
          console.warn(`Target element not found: ${currentTargetSelector}`);
          return;
        }

        const rect = element.getBoundingClientRect();
        setTargetPosition({
          top: rect.top + window.scrollY,
          left: rect.left + window.scrollX,
          width: rect.width,
          height: rect.height,
          element,
        });

        // Scroll element into view if needed
        if (!isElementInViewport(element)) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }
      } catch (error) {
        console.error("Error updating target position:", error);
      }
    };

    // Check if element is in viewport
    const isElementInViewport = (el: HTMLElement) => {
      const rect = el.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <=
          (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <=
          (window.innerWidth || document.documentElement.clientWidth)
      );
    };

    updateTargetPosition();

    // Also update on resize and scroll
    window.addEventListener("resize", updateTargetPosition);
    window.addEventListener("scroll", updateTargetPosition);

    // Setup an interval to handle dynamic DOM changes
    const positionInterval = setInterval(updateTargetPosition, 500);

    return () => {
      window.removeEventListener("resize", updateTargetPosition);
      window.removeEventListener("scroll", updateTargetPosition);
      clearInterval(positionInterval);
    };
  }, [currentStep, isOpen, steps]);

  // Determine the tooltip position
  const getTooltipPosition = () => {
    if (!targetPosition) return { top: 0, left: 0 };

    const { top, left, width, height } = targetPosition;

    return {
      top: top + height / 2,
      left: left + width / 2,
    };
  };

  // Determine the best placement for the tooltip
  const getPlacement = (): "top" | "right" | "bottom" | "left" => {
    if (!targetPosition) return "bottom";

    const { left, width } = targetPosition;
    const windowWidth = window.innerWidth;

    // Default placement from step config
    const defaultPlacement = steps[currentStep]?.placement || "bottom";

    // Check if we're close to the right edge
    if (left + width / 2 > windowWidth - 300) {
      return "left";
    }

    // Check if we're close to the left edge
    if (left - width / 2 < 300) {
      return "right";
    }

    return defaultPlacement;
  };

  if (!isOpen || steps.length === 0) return null;

  const currentStepData = steps[currentStep];

  return (
    <TourOverlay>
      {/* Highlight the target element */}
      <TourHighlight selector={currentStepData.target} />

      {/* Show tooltip */}
      {targetPosition && (
        <TourTooltip
          title={currentStepData.title}
          content={currentStepData.content}
          step={currentStep}
          totalSteps={steps.length}
          onNext={nextStep}
          onPrev={prevStep}
          onClose={endTour}
          position={getTooltipPosition()}
          placement={getPlacement()}
        />
      )}
    </TourOverlay>
  );
};

export default Tour;
