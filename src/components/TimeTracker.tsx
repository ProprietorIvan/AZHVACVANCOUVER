import { useEffect, useRef } from "react";
import { trackTimeOnPage } from "@/utils/analytics";

interface TimeTrackerProps {
  page: string;
}

/**
 * Component to track time spent on page
 * Tracks milestones at 30s, 60s, 120s and total time when user leaves
 */
const TimeTracker: React.FC<TimeTrackerProps> = ({ page }) => {
  const startTime = useRef<number>(Date.now());
  const trackedMilestones = useRef<Set<string>>(new Set());
  const milestones = [
    { seconds: 30, name: "30s" },
    { seconds: 60, name: "60s" },
    { seconds: 120, name: "120s" },
  ];

  useEffect(() => {
    // Track milestone intervals
    const intervalIds: NodeJS.Timeout[] = [];

    milestones.forEach((milestone) => {
      const intervalId = setTimeout(() => {
        if (!trackedMilestones.current.has(milestone.name)) {
          trackedMilestones.current.add(milestone.name);
          trackTimeOnPage(milestone.seconds, page, milestone.name);
        }
      }, milestone.seconds * 1000);

      intervalIds.push(intervalId);
    });

    // Track total time when user leaves page
    const handleBeforeUnload = () => {
      const totalTime = Math.floor((Date.now() - startTime.current) / 1000);
      if (totalTime > 0) {
        trackTimeOnPage(totalTime, page);
      }
    };

    // Track when page becomes hidden (tab switch, minimize, etc.)
    const handleVisibilityChange = () => {
      if (document.hidden) {
        const totalTime = Math.floor((Date.now() - startTime.current) / 1000);
        if (totalTime > 0) {
          trackTimeOnPage(totalTime, page);
        }
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      intervalIds.forEach((id) => clearTimeout(id));
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("visibilitychange", handleVisibilityChange);

      // Final tracking on component unmount
      const totalTime = Math.floor((Date.now() - startTime.current) / 1000);
      if (totalTime > 0) {
        trackTimeOnPage(totalTime, page);
      }
    };
  }, [page]);

  return null; // This component doesn't render anything
};

export default TimeTracker;
