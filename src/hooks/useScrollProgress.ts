import { useState, useEffect, useRef } from "react";

/**
 * Hook pour gérer le scroll progress avec smooth easing
 */
export function useScrollProgress(
  initialProgress: number = -1,
  projectsLength: number
) {
  const [scrollProgress, setScrollProgress] = useState(initialProgress);
  const targetScrollRef = useRef(initialProgress);

  // Smooth scroll avec easing
  useEffect(() => {
    let animationFrameId: number;

    const smoothScroll = () => {
      setScrollProgress((prev) => {
        const diff = targetScrollRef.current - prev;
        if (Math.abs(diff) < 0.001) {
          return targetScrollRef.current;
        }
        return prev + diff * 0.08;
      });
      animationFrameId = requestAnimationFrame(smoothScroll);
    };

    smoothScroll();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  // Gestion du scroll wheel et touch
  useEffect(() => {
    let isScrolling = false;
    let scrollTimeout: NodeJS.Timeout;
    let touchStartY = 0;
    let touchEndY = 0;
    let accumulatedDelta = 0;
    const deltaThreshold = 20;
    let lastScrollTime = 0;
    const scrollCooldown = 1000;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      const now = Date.now();
      if (isScrolling || now - lastScrollTime < scrollCooldown) {
        return;
      }

      accumulatedDelta += e.deltaY;

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        accumulatedDelta = 0;
      }, 150);

      if (Math.abs(accumulatedDelta) >= deltaThreshold) {
        const currentPlanet = Math.round(targetScrollRef.current);
        const direction = accumulatedDelta > 0 ? 1 : -1;
        const targetPlanet = Math.max(
          -1,
          Math.min(projectsLength - 1, currentPlanet + direction)
        );

        if (targetPlanet !== currentPlanet) {
          isScrolling = true;
          lastScrollTime = now;
          targetScrollRef.current = targetPlanet;
          accumulatedDelta = 0;

          setTimeout(() => {
            isScrolling = false;
          }, 800);
        }
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      touchEndY = e.touches[0].clientY;
    };

    const handleTouchEnd = () => {
      if (isScrolling) return;

      const swipeDistance = touchStartY - touchEndY;
      const minSwipeDistance = 50;

      if (Math.abs(swipeDistance) > minSwipeDistance) {
        const currentPlanet = Math.round(targetScrollRef.current);
        const direction = swipeDistance > 0 ? 1 : -1;
        const targetPlanet = Math.max(
          -1,
          Math.min(projectsLength - 1, currentPlanet + direction)
        );

        if (targetPlanet !== currentPlanet) {
          isScrolling = true;
          targetScrollRef.current = targetPlanet;

          clearTimeout(scrollTimeout);
          scrollTimeout = setTimeout(() => {
            isScrolling = false;
          }, 800);
        }
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      clearTimeout(scrollTimeout);
    };
  }, [projectsLength]);

  const navigateTo = (index: number) => {
    targetScrollRef.current = index;
  };

  return { scrollProgress, navigateTo };
}
