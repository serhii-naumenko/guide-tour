import React from "react";

interface TourOverlayProps {
  children: React.ReactNode;
}

const TourOverlay: React.FC<TourOverlayProps> = ({ children }) => {
  return (
    <div className="fixed inset-0 z-30 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-70 animate-fadeIn" />
      {children}
    </div>
  );
};

export default TourOverlay;
