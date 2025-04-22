import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import TourOverlay from "./TourOverlay";
import TourHighlight from "./TourHighlight";
import TourTooltip from "./TourTooltip";
import { TargetPosition } from "./tourInterfaces";
import { getPlacement, getTooltipPosition, isElementInViewport } from "./utils";
import { tourSteps } from "./tourConstants";

type TourProps = {
  isTourActive: boolean;
  setIsTourActive: Dispatch<SetStateAction<boolean>>;
};

const Tour: FC<TourProps> = ({ isTourActive, setIsTourActive }) => {
  const [currentStep, setCurrentStep] = useState<number>(0);

  const [targetPosition, setTargetPosition] = useState<TargetPosition | null>(
    null,
  );

  useEffect(() => {
    const updateTargetPosition = () => {
      try {
        const currentTargetSelector = tourSteps[currentStep]?.target;
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
  }, [currentStep]);

  const currentStepData = tourSteps[currentStep];

  if (!isTourActive) return null;

  return (
    <TourOverlay>
      <TourHighlight selector={currentStepData.target} />
      {targetPosition && (
        <TourTooltip
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          setIsTourActive={setIsTourActive}
          position={getTooltipPosition(targetPosition)}
          placement={getPlacement(targetPosition, currentStep)}
        />
      )}
    </TourOverlay>
  );
};

export default Tour;
