import { useEffect } from "react";
import { trackScrollDepth } from "@/utils/analytics";

interface ScrollTrackerProps {
  page: string;
}

/**
 * Component to track scroll depth milestones (25%, 50%, 75%, 100%)
 * Tracks when user reaches each milestone and fires analytics events
 */
const ScrollTracker: React.FC<ScrollTrackerProps> = ({ page }) => {
  useEffect(() => {
    const trackedMilestones = new Set<number>();
    const milestones = [25, 50, 75, 100];

    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollPercentage = Math.round(
        ((scrollTop + windowHeight) / documentHeight) * 100
      );

      milestones.forEach((milestone) => {
        if (
          scrollPercentage >= milestone &&
          !trackedMilestones.has(milestone)
        ) {
          trackedMilestones.add(milestone);
          trackScrollDepth(milestone, page);
        }
      });
    };

    // Throttle scroll events for performance
    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", throttledHandleScroll, { passive: true });

    // Check initial scroll position
    handleScroll();

    return () => {
      window.removeEventListener("scroll", throttledHandleScroll);
    };
  }, [page]);

  return null; // This component doesn't render anything
};

export default ScrollTracker;
