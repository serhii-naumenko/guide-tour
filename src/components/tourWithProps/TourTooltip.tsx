import { Dispatch, FC, SetStateAction } from "react";
import { X, ChevronRight, ChevronLeft } from "lucide-react";
import { TourStepPlacement, TourTooltipPosition } from "./tourInterfaces";
import { getArrowStyle, getTooltipStyle } from "./utils";
import { Box, Button, Typography } from "@mui/material";
import { tourSteps, tourStepsAmount } from "./tourConstants";

interface TourTooltipProps {
  currentStep: number;
  setCurrentStep: Dispatch<SetStateAction<number>>;
  setIsTourActive: Dispatch<SetStateAction<boolean>>;
  position: TourTooltipPosition;
  placement: TourStepPlacement;
}

const TourTooltip: FC<TourTooltipProps> = ({
  currentStep,
  setCurrentStep,
  setIsTourActive,
  position,
  placement,
}) => {
  const currentStepData = tourSteps[currentStep];

  const nextStep = () => {
    setCurrentStep(currentStep + 1);

    if (tourSteps[currentStep]?.onNext) {
      tourSteps[currentStep].onNext?.();
    }
  };

  const prevStep = () => {
    const prev = currentStep - 1;
    if (prev >= 0) {
      setCurrentStep(prev);
    }
  };

  const finishTour = () => {
    console.log("close");
    setCurrentStep(0);
    setIsTourActive(false);
  };

  return (
    <Box
      className="absolute z-50 w-72 bg-white rounded-lg shadow-lg animate-fadeIn"
      style={getTooltipStyle(position, placement)}
      role="dialog"
      aria-modal="true"
    >
      <Box
        className="absolute w-4 h-4 bg-white shadow-sm"
        style={getArrowStyle(placement)}
      />
      <Button
        sx={{ position: "absolute" }}
        className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition-colors"
        onClick={finishTour}
        aria-label="Close tour"
      >
        <X size={18} />
      </Button>
      <Box className="p-4">
        {currentStepData.title && (
          <Typography
            variant="h6"
            className="text-lg font-semibold text-gray-800 mb-1"
          >
            {currentStepData.title}
          </Typography>
        )}
        <Typography className="text-gray-600 mb-4">
          {currentStepData.content}
        </Typography>
        <Box className="flex items-center justify-between mt-2">
          <Box className="text-sm text-gray-500">
            {currentStep + 1} of {tourStepsAmount}
          </Box>
          <Box className="flex gap-2">
            {currentStep > 0 && (
              <Button
                className="px-4 py-2 rounded-full text-gray-600 hover:bg-gray-100 transition-colors flex items-center gap-1"
                onClick={prevStep}
                aria-label="Previous step"
              >
                <ChevronLeft size={20} />
                Prev
              </Button>
            )}
            <Button
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 hover:text-white rounded-lg transition-colors flex items-center gap-1"
              onClick={
                currentStep === tourStepsAmount - 1 ? finishTour : nextStep
              }
            >
              {currentStep === tourStepsAmount - 1 ? "Finish" : "Next"}
              {currentStep !== tourStepsAmount - 1 && (
                <ChevronRight size={20} />
              )}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default TourTooltip;
