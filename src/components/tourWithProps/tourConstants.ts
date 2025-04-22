import { TourStep, TourStepPlacement } from "./tourInterfaces";

export const tourSteps: TourStep[] = [
  {
    target: "#dashboard-button",
    title: "Dashboard",
    content: "View your dashboard with key metrics and insights.",
    placement: TourStepPlacement.BOTTOM,
  },
  {
    target: "#profile-button",
    title: "Your Profile",
    content: "Access your profile settings and preferences here.",
    placement: TourStepPlacement.BOTTOM,
  },
  {
    target: "#notifications-button",
    title: "Notifications",
    content: "Check your recent notifications and updates.",
    placement: TourStepPlacement.BOTTOM,
  },
  {
    target: "#settings-button",
    title: "Settings",
    content: "Configure your application settings and preferences.",
    placement: TourStepPlacement.LEFT,
  },
];

export const tourStepsAmount = tourSteps.length;
