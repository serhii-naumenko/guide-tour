import { useState } from "react";
// import { useTour } from "./components/Tour";
import DemoContent from "./components/tourWithProps/DemoContent";
function App() {
  // const { startTour, isTourCompleted } = useTour();
  const [isTourActive, setIsTourActive] = useState(false);

  // Start tour if not completed before
  // useEffect(() => {
  // In a real app, you might want to start the tour automatically
  // only for new users or if the tour has never been completed
  // if (!isTourCompleted) {
  // This is commented out to let the user manually start the tour
  // startTour(tourSteps);
  // }
  // }, [isTourCompleted]);

  const handleStartTour = () => {
    // startTour(tourSteps);
    setIsTourActive(true);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <DemoContent
        isTourActive={isTourActive}
        setIsTourActive={setIsTourActive}
      />
      {!isTourActive && (
        <div className="fixed bottom-6 right-6">
          <button
            type="button"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-colors"
            onClick={handleStartTour}
          >
            Start Demo Tour
          </button>
        </div>
      )}
    </div>
  );
}

export default App;

// const tourSteps = [
//   {
//     target: "#dashboard-button",
//     title: "Dashboard",
//     content: "View your dashboard with key metrics and insights.",
//     placement: "bottom" as const,
//   },
//   {
//     target: "#profile-button",
//     title: "Your Profile",
//     content: "Access your profile settings and preferences here.",
//     placement: "bottom" as const,
//   },
//   {
//     target: "#notifications-button",
//     title: "Notifications",
//     content: "Check your recent notifications and updates.",
//     placement: "bottom" as const,
//   },
//   {
//     target: "#settings-button",
//     title: "Settings",
//     content: "Configure your application settings and preferences.",
//     placement: "left" as const,
//   },
// ];
