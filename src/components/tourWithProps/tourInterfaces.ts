export interface TourStep {
  target: string;
  content: string;
  title?: string;
  placement?: TourStepPlacement;
  onNext?: () => void;
}

export enum TourStepPlacement {
  TOP = "top",
  RIGHT = "right",
  BOTTOM = "bottom",
  LEFT = "left",
}

export interface TargetPosition {
  top: number;
  left: number;
  width: number;
  height: number;
  element: HTMLElement;
}

export interface HighlightPosition {
  top: number;
  left: number;
  width: number;
  height: number;
}

export interface TourTooltipPosition {
  top: number;
  left: number;
}
