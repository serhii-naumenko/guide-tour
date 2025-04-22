import { tourSteps } from "./tourConstants";
import {
  TargetPosition,
  TourStepPlacement,
  TourTooltipPosition,
} from "./tourInterfaces";

export const isElementInViewport = (el: HTMLElement) => {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

export const getTooltipPosition = (targetPosition: TargetPosition) => {
  if (!targetPosition) return { top: 0, left: 0 };

  const { top, left, width, height } = targetPosition;

  return {
    top: top + height / 2,
    left: left + width / 2,
  };
};

export const getPlacement = (
  targetPosition: TargetPosition,
  currentStep: number,
): TourStepPlacement => {
  if (!targetPosition) return TourStepPlacement.BOTTOM;

  const { left, width } = targetPosition;
  const windowWidth = window.innerWidth;

  const defaultPlacement =
    tourSteps[currentStep]?.placement || TourStepPlacement.BOTTOM;

  if (left + width / 2 > windowWidth - 300) {
    return TourStepPlacement.LEFT;
  }

  if (left - width / 2 < 300) {
    return TourStepPlacement.RIGHT;
  }

  return defaultPlacement;
};

const offset = 46; // Distance from target element

export const getTooltipStyle = (
  position: TourTooltipPosition,
  placement: TourStepPlacement,
) => {
  const { top, left } = position;

  switch (placement) {
    case TourStepPlacement.TOP:
      return {
        bottom: `calc(100% - ${top}px + ${offset}px)`,
        left: `${left}px`,
        transform: "translateX(-50%)",
      };
    case TourStepPlacement.RIGHT:
      return {
        top: `${top}px`,
        left: `${left + offset}px`,
        transform: "translateY(-50%)",
      };
    case TourStepPlacement.BOTTOM:
      return {
        top: `${top + offset}px`,
        left: `${left}px`,
        transform: "translateX(-50%)",
      };
    case TourStepPlacement.LEFT:
      return {
        top: `${top}px`,
        right: `calc(100% - ${left}px + ${offset}px)`,
        transform: "translateY(-50%)",
      };
    default:
      return {
        top: `${top + offset}px`,
        left: `${left}px`,
        transform: "translateX(-50%)",
      };
  }
};

export const getArrowStyle = (placement: TourStepPlacement) => {
  switch (placement) {
    case TourStepPlacement.TOP:
      return {
        bottom: "-8px",
        left: "50%",
        transform: "translateX(-50%) rotate(45deg)",
        borderLeft: "none",
        borderTop: "none",
      };
    case TourStepPlacement.RIGHT:
      return {
        left: "-8px",
        top: "50%",
        transform: "translateY(-50%) rotate(45deg)",
        borderRight: "none",
        borderBottom: "none",
      };
    case TourStepPlacement.BOTTOM:
      return {
        top: "-8px",
        left: "50%",
        transform: "translateX(-50%) rotate(45deg)",
        borderBottom: "none",
        borderRight: "none",
      };
    case TourStepPlacement.LEFT:
      return {
        right: "-8px",
        top: "50%",
        transform: "translateY(-50%) rotate(45deg)",
        borderLeft: "none",
        borderTop: "none",
      };
    default:
      return {
        top: "-8px",
        left: "50%",
        transform: "translateX(-50%) rotate(45deg)",
        borderBottom: "none",
        borderRight: "none",
      };
  }
};
