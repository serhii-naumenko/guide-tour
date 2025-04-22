import React, { useEffect, useState } from "react";
import { HighlightPosition } from "./tourInterfaces";
import { Box } from "@mui/material";

interface TourHighlightProps {
  selector: string;
  animate?: boolean;
}

const TourHighlight: React.FC<TourHighlightProps> = ({
  selector,
  animate = true,
}) => {
  const [position, setPosition] = useState<HighlightPosition | null>(null);

  useEffect(() => {
    const updatePosition = () => {
      try {
        const element = document.querySelector(selector) as HTMLElement;
        if (element) {
          const rect = element.getBoundingClientRect();
          setPosition({
            top: rect.top + window.scrollY,
            left: rect.left + window.scrollX,
            width: rect.width,
            height: rect.height,
          });
        } else {
          console.warn(`Element with selector "${selector}" not found`);
          setPosition(null);
        }
      } catch (error) {
        console.error("Error finding tour target element:", error);
        setPosition(null);
      }
    };

    updatePosition();

    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition);

    const interval = setInterval(updatePosition, 1000);

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition);
      clearInterval(interval);
    };
  }, [selector]);

  if (!position) return null;

  return (
    <Box
      className={`absolute rounded-md z-40 pointer-events-none ${
        animate ? "tour-highlight-pulse" : ""
      }`}
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
        width: `${position.width}px`,
        height: `${position.height}px`,
        boxShadow: "0 0 0 4px rgba(59, 130, 246, 0.5)",
      }}
    />
  );
};

export default TourHighlight;
