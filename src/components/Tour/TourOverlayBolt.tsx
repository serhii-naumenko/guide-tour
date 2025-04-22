import React from 'react';

interface TourOverlayProps {
  children: React.ReactNode;
}

const TourOverlay: React.FC<TourOverlayProps> = ({ children }) => {
  return (
    <div className="fixed inset-0 z-30 overflow-hidden">
      {/* Dark backdrop */}
      <div className="absolute inset-0 bg-black bg-opacity-70 animate-fadeIn" />
      
      {/* Content (highlighted element and tooltip) */}
      {children}
    </div>
  );
};

export default TourOverlay;